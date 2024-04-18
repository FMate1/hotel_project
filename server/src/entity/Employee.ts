import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmployeeDTO } from "../../../models";
import { Hotel } from "./Hotel";
import { Role } from "./Role";

@Entity()
export class Employee implements EmployeeDTO {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column({ type: 'date' })
    dateOfBirth: string;

    @Column({ unique: true })
    taxNumber: string;

    @Column({ unique: true })
    TAJ: string;

    @Column({ unique: true })
    phoneNo: string;

    @Column({ unique: true })
    email: string;

    @Column()
    salary: number;

    @ManyToOne(() => Hotel, (hotel) => hotel.employees, { eager: true })
    hotel: Hotel;

    @ManyToOne(() => Role, (role) => role.employees, { eager: true })
    role: Role;
}