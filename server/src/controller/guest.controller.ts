import { AppDataSource } from "../data-source";
import { Guest } from "../entity/Guest";
import { Controller } from "./base.controller";

export class GuestController extends Controller {
    repository = AppDataSource.getRepository(Guest);
}