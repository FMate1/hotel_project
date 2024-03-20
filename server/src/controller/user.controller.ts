import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Controller } from "./base.controller";
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export class UserController extends Controller {
    repository = AppDataSource.getRepository(User);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            entity.id = null;

            entity.password = await bcrypt.hash(entity.password, 12);

            const result = await this.repository.save(entity);
            delete result.password;
            
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    login = async (req, res) => {
        try {
            const user = await this.repository.findOne({
                where: { email: req.body.email },
                select: [ 'id', 'password' ]
            });
    
            if (!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }
    
            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }
    
            const token = jwt.sign({ id: user.id }, 'mySecretKey', { expiresIn: '2w' });
            res.json({ accessToken: token });
        } catch (err) {
            this.handleError(res, err);
        }
    };
}