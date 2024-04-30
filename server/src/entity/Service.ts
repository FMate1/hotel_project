import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceDTO } from "../../../models";
import { Hotel } from "./Hotel";

@Entity()
export class Service implements ServiceDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    serviceName: string;

    @Column()
    price: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.services, { eager: true })
    hotel: Hotel;

}