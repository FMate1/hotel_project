import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ServiceDTO } from "../../../models";
import { Hotel } from "./Hotel";
import { Bill } from "./Bill";

@Entity()
export class Service implements ServiceDTO {

    @PrimaryGeneratedColumn()
    serviceId: number;

    @Column()
    serviceName: string;

    @Column()
    price: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.services, { eager: true })
    hotel: Hotel;

    @ManyToMany(() => Bill)
    @JoinTable()
    bills: Bill[]
}