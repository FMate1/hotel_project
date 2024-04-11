import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleDTO } from '../../../models';
import { Employee } from './Employee';

@Entity()
export class Role implements RoleDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Employee, (employee) => employee.id)
    employees: Employee[];

}