import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDTO } from "../../../models";
import { Booking } from "./Booking";
import { Bill } from "./Bill";
import { GuestFeedback } from "./GuestFeedback";

@Entity()
export class User implements UserDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;

    @Column()
    isAdmin: boolean;

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];

    @OneToMany(() => Bill, (bill) => bill.user)
    bills: Bill[];

    @OneToMany(() => GuestFeedback, (guestFeedback) => guestFeedback.user)
    guestFeedbacks: GuestFeedback[];
    
}
