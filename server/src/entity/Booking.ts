import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingDTO } from "../../../models";
import { Room } from "./Room";
import { Guest } from "./Guest";

@Entity()
export class Booking implements BookingDTO {

    @PrimaryGeneratedColumn()
    bookingId: number;

    @Column({ type: 'date' })
    bookingDate: string;

    @Column({ type: 'date' })
    checkInDate: string;

    @Column({ type: 'date' })
    checkOutDate: string;

    @Column()
    numAdults: number;

    @Column()
    numChildren: number;

    @ManyToOne(() => Guest, (guest) => guest.bookings, { eager: true })
    guest: Guest;

    @ManyToMany(() => Room)
    @JoinTable()
    rooms: Room[]
}