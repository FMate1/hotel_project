import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookingDTO, EmployeeDTO, RoomDTO, UserDTO } from 'models';
import { BookingService } from '../services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';
import { UserService } from '../services/user.service';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  bookings: BookingDTO[] = [];
  guests: UserDTO[] = [];
  employees: EmployeeDTO[] = [];
  bookingsCount: number = 0;
  empCount: number = 0;
  dRoomBookingCnt: number = 0;
  tRoomBookingCnt: number = 0;
  fRoomBookingCnt: number = 0;
  guestsAvgAge: number = 0;
  mostBookedRoomType: string = '';
  avgStay: number = 0;
  avgEmpAge: number = 0;
  avgEmpSalary: number = 0;
  femaleEmpCount: number = 0;
  maleEmpCount: number = 0;
  PdfFileName: string = '';
  XlsFileName: string = '';
  JsonFileName: string = '';
  @ViewChild('contentToConvert', { static: false }) contentToConvert!: ElementRef;

  constructor(
    private toastrService: ToastrService,
    private bookingService: BookingService,
    private employeeService: EmployeeService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.empCount = this.employees.length;
        this.countEmpByGender();
        this.avgEmpAge = this.calculateAvgEmpAge();
        this.avgEmpSalary = this.calculateAvgEmpSalary();
      },
      error: (err) => {
        this.toastrService.error('Az alkalmazottak betöltése nem sikerült.', 'Hiba');
      }
    });

    this.bookingService.getAll().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.bookingsCount = bookings.length;
        this.countBookingsByRoomType();
        this.avgStay = this.calculateAvgStay();
        this.mostBookedRoomType = this.calculateMostBookedRoomType(this.dRoomBookingCnt, this.tRoomBookingCnt, this.fRoomBookingCnt);
      },
      error: (err) => {
        this.toastrService.error('A foglalások betöltése nem sikerült.', 'Hiba');
      }
    });

    this.userService.getGuests().subscribe(
      (guests: UserDTO[]) => {
        this.guests = guests;
        this.guestsAvgAge = this.calculateAvgGuestAge();
      },
      (error) => {
        this.toastrService.error('A vendégek betöltése nem sikerült.', 'Hiba');
      }
    );

  }

  countEmpByGender() {
    for (let index = 0; index < this.employees.length; index++) {
      const emp = this.employees[index];
      if (emp.gender === 'female') {
        this.femaleEmpCount++;
      } else {
        this.maleEmpCount++;
      }
    }
  }

  countBookingsByRoomType() {
    for (let index = 0; index < this.bookings.length; index++) {
      const booking = this.bookings[index];
      switch (booking.room?.type) {
        case 'Double':
          this.dRoomBookingCnt++;
          break;
        case 'Twin':
          this.tRoomBookingCnt++;
          break;
        case 'Family':
          this.fRoomBookingCnt++;
          break;
        default:
          break;
      }
    }
  }

  calculateMostBookedRoomType(dRoomCnt: number, tRoomCnt: number, fRoomCnt: number): string {
    if (dRoomCnt === tRoomCnt && tRoomCnt === fRoomCnt) {
      return 'Mindhárom szobát ugyan annyiszor foglalták le.';
    }

    if (dRoomCnt === tRoomCnt || dRoomCnt === fRoomCnt || tRoomCnt === fRoomCnt) {
      if (dRoomCnt === tRoomCnt) {
        return 'Franciaágyas és kétágyas szoba';
      } else if (dRoomCnt === fRoomCnt) {
        return 'Franciaágyas és családi szoba';
      } else {
        return 'Kétágyas és családi szoba';
      }
    }

    const max = Math.max(dRoomCnt, tRoomCnt, fRoomCnt);
    if (max === dRoomCnt) {
      return 'Franciaágyas szoba';
    } else if (max === tRoomCnt) {
      return 'Kétágyas szoba';
    } else {
      return 'Családi szoba';
    }
  }

  calculateAge(birthDate: string): number {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();

    if (today.getMonth() < birthDateObj.getMonth() ||
      (today.getMonth() === birthDateObj.getMonth() && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  }

  calculateAvgGuestAge(): number {
    let sum = 0;
    const numOfGuests = this.guests.length;
    for (let index = 0; index < this.guests.length; index++) {
      const guest = this.guests[index];
      sum += this.calculateAge(guest.dateOfBirth);
    }
    return Math.round(sum / numOfGuests);
  }

  calculateAvgEmpAge(): number {
    let sum = 0;
    const numOfEmps = this.employees.length;
    for (let index = 0; index < this.employees.length; index++) {
      const emp = this.employees[index];
      sum += this.calculateAge(emp.dateOfBirth);
    }
    return Math.round(sum / numOfEmps);
  }

  calculateAvgEmpSalary(): number {
    let sum = 0;
    const numOfEmps = this.employees.length;
    for (let index = 0; index < this.employees.length; index++) {
      const emp = this.employees[index];
      sum += emp.salary;
    }
    return Math.round(sum / numOfEmps);
  }

  calculateNightsBetweenDates(checkInDate: string, checkOutDate: string): number {
    const startDateObj = new Date(checkInDate);
    const endDateObj = new Date(checkOutDate);

    const differenceInTime = endDateObj.getTime() - startDateObj.getTime();
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

    return Math.floor(differenceInDays);
  }

  calculateAvgStay(): number {
    let sum = 0;
    const numOfBookings = this.bookings.length;
    for (let index = 0; index < this.bookings.length; index++) {
      const booking = this.bookings[index];
      sum += this.calculateNightsBetweenDates(booking.checkInDate, booking.checkOutDate);
    }
    return Math.round(sum / numOfBookings);
  }

  convertToPDF() {
    var data = document.getElementById('contentToConvert');
    if (data) {
      html2canvas(data).then(canvas => {
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4');
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save(`${this.PdfFileName}.pdf`);
      });
    } else {
      this.toastrService.error('Az elem nem található az oldalon!');
    }
  }

  exportToXLSX() {
    var data = document.getElementById('contentToConvert');
    if (data) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Statisztika');
      XLSX.writeFile(wb, `${this.XlsFileName}.xlsx`);

    } else {
      this.toastrService.error('Az elem nem található az oldalon!');
    }
  }

  exportToJSON() {
    const jsonData = JSON.stringify(this.bookings);   // bookings helyett lehet más kell
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.JsonFileName}.json`;
    document.body.appendChild(a);

    a.click();

    window.URL.revokeObjectURL(url);
  }

}
