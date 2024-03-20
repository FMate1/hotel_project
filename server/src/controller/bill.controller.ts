import { AppDataSource } from "../data-source";
import { Bill } from "../entity/Bill";
import { Controller } from "./base.controller";

export class BillController extends Controller {
    repository = AppDataSource.getRepository(Bill);
}