import { AppDataSource } from "../data-source";
import { Employee } from "../entity/Employee";
import { Controller } from "./base.controller";

export class EmployeeController extends Controller {
    repository = AppDataSource.getRepository(Employee);
}