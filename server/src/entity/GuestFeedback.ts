import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GuestFeedbackDTO } from "../../../models";
import { Hotel } from "./Hotel";
import { User } from "./User";

@Entity()
export class GuestFeedback implements GuestFeedbackDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    opinion: string;

    @ManyToOne(() => User, (user) => user.guestFeedbacks, { eager: true })
    user: User;

    @ManyToOne(() => Hotel, (hotel) => hotel.guestFeedbacks, { eager: true })
    hotel: Hotel;
}   