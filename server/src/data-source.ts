import "reflect-metadata"
import { DataSource } from "typeorm"
import { Role } from "./entity/Role"
import { Hotel } from "./entity/Hotel"
import { Employee } from "./entity/Employee"
import { User } from "./entity/User"
import { Bill } from "./entity/Bill"
import { Guest } from "./entity/Guest"
import { GuestFeedback } from "./entity/GuestFeedback"
import { Room } from "./entity/Room"
import { Service } from "./entity/Service"
import { Booking } from "./entity/Booking"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "hotel_project",
    synchronize: true,
    logging: true,
    entities: [Role, Hotel, Employee, User, Bill, Guest, GuestFeedback, Room, Service, Booking],
    migrations: [],
    subscribers: [],
})
