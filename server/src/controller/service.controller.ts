import { AppDataSource } from "../data-source";
import { Service } from "../entity/Service";
import { Controller } from "./base.controller";

export class ServiceController extends Controller {
    repository = AppDataSource.getRepository(Service);
}