import express from 'express';
import { RoleController } from './controller/role.controller';
import { HotelController } from './controller/hotel.controller';
import { EmployeeController } from './controller/employee.controller';
import { UserController } from './controller/user.controller';
import { checkUser } from './protect-routes';
import { BillController } from './controller/bill.controller';
import { BookingController } from './controller/booking.controller';
import { GuestController } from './controller/guest.controller';
import { GuestFeedBackController } from './controller/guestFeedback.controller';
import { RoomController } from './controller/room.controller';
import { ServiceController } from './controller/service.controller';


/*

checkUser nem mindenhova kell, át kell majd nézni

*/



export function getRoutes() {
    const router = express.Router();

    const roleController = new RoleController();

    router.get('/roles', roleController.getAll);
    router.get('/roles/:id', roleController.getOne);
    router.post('/roles', checkUser, roleController.create);
    router.put('/roles', checkUser, roleController.update);
    router.delete('/roles/:id', checkUser, roleController.delete);
    router.put('/roles', checkUser, roleController.activateLocationStatus);
    router.put('/roles', checkUser, roleController.deactivateLocationStatus);

    const hotelController = new HotelController();

    router.get('/hotels', hotelController.getAll);
    router.get('/hotels/:id', hotelController.getOne);
    router.post('/hotels', checkUser, hotelController.create);
    router.put('/hotels', checkUser, hotelController.update);
    router.delete('/hotels/:id', checkUser, hotelController.delete);

    const employeeController = new EmployeeController();

    router.get('/employees', employeeController.getAll);
    router.get('/employees/:id', employeeController.getOne);
    router.post('/employees', checkUser, employeeController.create);
    router.put('/employees', checkUser, employeeController.update);
    router.delete('/employees/:id', checkUser, employeeController.delete);

    const billController = new BillController();

    router.get('/bills', billController.getAll);
    router.get('/bills/:id', billController.getOne);
    router.post('/bills', checkUser, billController.create);
    router.put('/bills', checkUser, billController.update);
    router.delete('/bills/:id', checkUser, billController.delete);

    const bookingController = new BookingController();

    router.get('/bookings', bookingController.getAll);
    router.get('/bookings/:id', bookingController.getOne);
    router.post('/bookings', checkUser, bookingController.create);
    router.put('/bookings', checkUser, bookingController.update);
    router.delete('/bookings/:id', checkUser, bookingController.delete);

    const guestController = new GuestController();

    router.get('/guests', guestController.getAll);
    router.get('/guests/:id', guestController.getOne);
    router.post('/guests', checkUser, guestController.create);
    router.put('/guests', checkUser, guestController.update);
    router.delete('/guests/:id', checkUser, guestController.delete);

    const guestFeedbackController = new GuestFeedBackController();

    router.get('/guestFeedbacks', guestFeedbackController.getAll);
    router.get('/guestFeedbacks/:id', guestFeedbackController.getOne);
    router.post('/guestFeedbacks', checkUser, guestFeedbackController.create);
    router.put('/guestFeedbacks', checkUser, guestFeedbackController.update);
    router.delete('/guestFeedbacks/:id', checkUser, guestFeedbackController.delete);

    const roomController = new RoomController();

    router.get('/rooms', roomController.getAll);
    router.get('/rooms/:id', roomController.getOne);
    router.post('/rooms', checkUser, roomController.create);
    router.put('/rooms', checkUser, roomController.update);
    router.delete('/rooms/:id', checkUser, roomController.delete);

    const serviceController = new ServiceController();

    router.get('/services', serviceController.getAll);
    router.get('/services/:id', serviceController.getOne);
    router.post('/services', checkUser, serviceController.create);
    router.put('/services', checkUser, serviceController.update);
    router.delete('/services/:id', checkUser, serviceController.delete);

    const userController = new UserController();

    router.post('/users', userController.create);
    router.post('/users/login', userController.login);

    return router;
}
