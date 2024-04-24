import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BillDTO } from "../../../models";
import { Booking } from "./Booking";
import { User } from "./User";

@Entity()
export class Bill implements BillDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date'})
    paymentDate: string;

    @Column()
    paymentMethod: string;

    @ManyToOne(() => User, (user) => user.bills, { eager: true })
    user: User;

    @OneToOne(() => Booking)
    @JoinColumn()
    booking: Booking
}