import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GuestFeedbackDTO } from "../../../models";
import { Guest } from "./Guest";
import { Hotel } from "./Hotel";

@Entity()
export class GuestFeedback implements GuestFeedbackDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    opinion: string;

    @ManyToOne(() => Guest, (guest) => guest.guestFeedbacks, { eager: true })
    guest: Guest;

    @ManyToOne(() => Hotel, (hotel) => hotel.guestFeedbacks, { eager: true })
    hotel: Hotel;
}   