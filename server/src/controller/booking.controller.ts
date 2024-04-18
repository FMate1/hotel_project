import { AppDataSource } from "../data-source";
import { Booking } from "../entity/Booking";
import { Controller } from "./base.controller";

export class BookingController extends Controller {
    repository = AppDataSource.getRepository(Booking);

    //felülírás create
}