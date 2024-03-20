import { AppDataSource } from "../data-source";
import { GuestFeedback } from "../entity/GuestFeedback";
import { Controller } from "./base.controller";

export class GuestFeedBackController extends Controller {
    repository = AppDataSource.getRepository(GuestFeedback);
}