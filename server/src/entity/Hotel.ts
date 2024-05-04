import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { HotelDTO } from "../../../models"
import { Employee } from "./Employee";
import { Service } from "./Service";
import { Room } from "./Room";

@Entity()
export class Hotel implements HotelDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hotelName: string;

    @Column()
    address: string;

    @Column()
    postcode: number;

    @Column()
    city: string;

    @OneToMany(() => Employee, (employee) => employee.hotel)
    employees: Employee[];

    @OneToMany(() => Service, (service) => service.hotel)
    services: Service[];

    @OneToMany(() => Room, (room) => room.hotel)
    rooms: Room[];

}
