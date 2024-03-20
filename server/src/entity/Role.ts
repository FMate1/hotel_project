import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleDTO } from '../../../models';
import { Employee } from './Employee';

@Entity()
export class Role implements RoleDTO {

    @PrimaryGeneratedColumn()
    roleId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Employee, (employee) => employee.employeeId)
    employees: Employee[];

}