import { AppDataSource } from "../data-source";
import { Role } from "../entity/Role";
import { Controller } from "./base.controller";

export class RoleController extends Controller {
    repository = AppDataSource.getRepository(Role);
}