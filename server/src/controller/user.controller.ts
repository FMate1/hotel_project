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
                select: [ 'id', 'password', 'isAdmin' ]
            });
    
            if (!user) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }
    
            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatches) {
                return this.handleError(res, null, 401, 'Incorrect email or password.');
            }
    
            const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'mySecretKey', { expiresIn: '2w' });
            res.json({ accessToken: token, isAdmin: user.isAdmin });
        } catch (err) {
            this.handleError(res, err);
        }
    };

    toggleActiveStatus = async (req, res) => {
        try {
            const userToToggleActiveStatus = await this.repository.findOneBy({
                id: req.params.id
            });
    
            if (!userToToggleActiveStatus) {
                return this.handleError(res, null, 404, 'User not found.');
            }

            if (userToToggleActiveStatus.isActive === true) {
                userToToggleActiveStatus.isActive = false;
            } else {
                userToToggleActiveStatus.isActive = true;
            }

            await this.repository.save(userToToggleActiveStatus);
    
            res.status(200).send('User active status toggled.');
        } catch (err) {
            this.handleError(res, err);
        }
    };

    toggleAdminStatus = async (req, res) => {
        try {
            const userToToggleAdminStatus = await this.repository.findOneBy({
                id: req.params.id
            });
    
            if (!userToToggleAdminStatus) {
                return this.handleError(res, null, 404, 'User not found.');
            }

            if (userToToggleAdminStatus.isAdmin === true) {
                userToToggleAdminStatus.isAdmin = false;
            } else {
                userToToggleAdminStatus.isAdmin = true;
            }

            await this.repository.save(userToToggleAdminStatus);
    
            res.status(200).send('User admin status toggled.');
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getLoggedInUserEmail = async (req, res) => {
        try {
            const id = req.auth.id;
            const entity = await this.repository.findOneBy({ id: id });
            if (!entity) {
                return this.handleError(res, null, 404, 'Not found.');
            }

            const email = entity.email;

            res.json(email);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getGuests = async (req, res) => {
        try {
            const guests = await this.repository.find({ where: { isAdmin: false } });
            res.json(guests);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving guests' });
        }
    };

}