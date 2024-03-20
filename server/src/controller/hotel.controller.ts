import { AppDataSource } from "../data-source";
import { Hotel } from "../entity/Hotel";
import { Controller } from "./base.controller";

export class HotelController extends Controller {
    repository = AppDataSource.getRepository(Hotel);
}