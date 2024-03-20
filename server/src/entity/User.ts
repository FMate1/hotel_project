import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserDTO } from "../../../models";

@Entity()
export class User implements UserDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
    
}
