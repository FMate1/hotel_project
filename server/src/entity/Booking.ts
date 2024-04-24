import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingDTO } from "../../../models";
import { Room } from "./Room";
import { User } from "./User";

@Entity()
export class Booking implements BookingDTO {

    @PrimaryGeneratedColumn()
    id: number;

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

    @ManyToOne(() => User, (user) => user.bookings, { eager: true })
    user: User;

    @ManyToOne(() => Room, (room) => room.bookings, { eager: true })
    room: Room;

}