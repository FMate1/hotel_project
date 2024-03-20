export interface RoleDTO {
    roleId: number;
    title: string;
    description: string;
}

export interface EmployeeDTO {
    employeeId: number;
    name: string;
    gender: string;
    dateOfBirth: string;
    taxNumber: number;
    TAJ: number;
    phoneNo: number;
    email: string;
    salary: number;
    hotel: null | HotelDTO;
    role: null | RoleDTO;
}

export interface HotelDTO {
    hotelId: number;
    hotelName: string;
    address: string;
    postcode: number;
    city: string;
    country: string;
    numRooms: number;
    phoneNo: number;
}

export interface ServiceDTO {
    serviceId: number;
    serviceName: string;
    price: number;
    hotel: null | HotelDTO;
}

export interface GuestDTO {
    guestId: number;
    firstName: string;
    lastName: string;
    phoneNo: number;
    email: string;
    gender: string;
    country: string;
    postCode: number;
    city: string;
    address: string;
}

export interface GuestFeedbackDTO {
    feedbackId: number;
    opinion: string;
    guest: null | GuestDTO;
    hotel: null | HotelDTO;
}

export interface RoomDTO {
    roomId: number;
    roomNumber: number;
    type: string;
    numBeds: number;
    isAvailable: boolean;
    hotel: null | HotelDTO;
}

export interface BillDTO {
    billId: number;
    paymentDate: string;
    paymentMethod: string;
    booking: null | BookingDTO;
    guest: null | GuestDTO;
}

export interface BookingDTO {
    bookingId: number;
    bookingDate: string;
    checkInDate: string;
    checkOutDate: string;
    numAdults: number;
    numChildren: number;
    guest: null | GuestDTO;
}

export interface UserDTO {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface AccessTokenDTO {
    accessToken: string;
}
