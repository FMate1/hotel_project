import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomDTO } from "../../../models";
import { Hotel } from "./Hotel";
import { Booking } from "./Booking";

@Entity()
export class Room implements RoomDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    roomNumber: number;

    @Column()
    type: string;

    @Column()
    numBeds: number;

    @Column()
    price: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { eager: true })
    hotel: Hotel;

    @OneToMany(() => Booking, (booking) => booking.room)
    bookings: Booking[];
}