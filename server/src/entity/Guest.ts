import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GuestDTO } from "../../../models";
import { GuestFeedback } from "./GuestFeedback";
import { Booking } from "./Booking";
import { Bill } from "./Bill";

@Entity()
export class Guest implements GuestDTO {

    @PrimaryGeneratedColumn()
    guestId: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    phoneNo: number;

    @Column({ unique: true })
    email: string;

    @Column()
    gender: string;

    @Column()
    country: string;

    @Column()
    postCode: number;

    @Column()
    city: string;

    @Column()
    address: string;

    @OneToMany(() => Booking, (booking) => booking.guest)
    bookings: Booking[];

    @OneToMany(() => Bill, (bill) => bill.guest)
    bills: Bill[];

    @OneToMany(() => GuestFeedback, (guestFeedback) => guestFeedback.guest)
    guestFeedbacks: GuestFeedback[];
}