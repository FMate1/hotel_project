import { AppDataSource } from "../data-source";
import { Room } from "../entity/Room";
import { Controller } from "./base.controller";

export class RoomController extends Controller {
    repository = AppDataSource.getRepository(Room);
}