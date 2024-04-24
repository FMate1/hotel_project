import { AppDataSource } from "../data-source";
import { Booking } from "../entity/Booking";
import { Controller } from "./base.controller";

export class BookingController extends Controller {
    repository = AppDataSource.getRepository(Booking);

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);

            entity.id = null;

            const roomType = entity.room.type;
            const checkInDate = entity.checkInDate;
            const checkOutDate = entity.checkOutDate;

            const query = `
                SELECT COUNT(*) AS cnt
                FROM booking
                JOIN room ON booking.roomId = room.id
                WHERE room.type = ? AND (
                    (checkInDate >= ? AND checkInDate <= ?) OR
                    (checkOutDate >= ? AND checkOutDate <= ?) OR
                    (checkInDate <= ? AND checkOutDate >= ?)
                );
            `;

            const sqlResult = await AppDataSource.manager.query(query, [
                roomType,
                checkInDate,
                checkOutDate,
                checkInDate,
                checkOutDate,
                checkInDate,
                checkOutDate
            ]);

            const bookingCount = parseInt(sqlResult[0]["cnt"], 10);

            if (bookingCount > 4) {
                return res.status(400).json({ message: "Unable to save, there are too many reservations for this room type in this date range." });
            } else {
                const result = await this.repository.save(entity);
                
                res.json(result);
            }
        } catch (err) {
            this.handleError(res, err);
        }
    };
}