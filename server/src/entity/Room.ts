import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomDTO } from "../../../models";
import { Hotel } from "./Hotel";

@Entity()
export class Room implements RoomDTO {

    @PrimaryGeneratedColumn()
    roomId: number;

    @Column({ unique: true })
    roomNumber: number;

    @Column()
    type: string;

    @Column()
    numBeds: number;

    @Column()
    isAvailable: boolean;

    @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { eager: true })
    hotel: Hotel;
}