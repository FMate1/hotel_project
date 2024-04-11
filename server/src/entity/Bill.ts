import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BillDTO } from "../../../models";
import { Booking } from "./Booking";
import { Guest } from "./Guest";

@Entity()
export class Bill implements BillDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date'})
    paymentDate: string;

    @Column()
    paymentMethod: string;

    @ManyToOne(() => Guest, (guest) => guest.bills, { eager: true })
    guest: Guest;

    @OneToOne(() => Booking)
    @JoinColumn()
    booking: Booking
}