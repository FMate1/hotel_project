import { AppDataSource } from "../data-source";
import { Booking } from "../entity/Booking";
import { Controller } from "./base.controller";

export class BookingController extends Controller {
    repository = AppDataSource.getRepository(Booking);

    //create felülírás
    /*
    create = async (req, res) => {
        try {
            // Az entitás létrehozása a kérés adataiból
            const entity = this.repository.create(req.body as object);
            entity.id = null;

            // Az aktuális dátum mentése a bookingDate változóba
            entity.bookingDate = new Date().toISOString().split('T')[0];

            // Ellenőrizzük a foglalás időtartamát
            const checkInDate = new Date(entity.checkInDate);           // ide majd lehet kell ez: .toISOString().split('T')[0]
            const checkOutDate = new Date(entity.checkOutDate);

            // Számoljuk ki a foglalás időtartamát napokban
            const durationInMillis = checkOutDate.getTime() - checkInDate.getTime();
            const durationInDays = durationInMillis / (1000 * 60 * 60 * 24);

            // Ha a foglalás időtartama meghaladja a 14 napot, hibaüzenet visszaadása
            if (durationInDays > 14) {
                return res.status(400).json({ error: 'The booking duration cannot exceed 14 days' });
            }

            // Foglalások ellenőrzése az adott időszakra és szobatípusra
            let totalBookingsCount = 0;

            // Végigmegyünk az összes szobán, ami ehhez a foglaláshoz tartozik
            for (const room of entity.rooms) {
                const bookingsCount = await this.repository.count({
                    where: {
                        roomId: room.id,
                        checkInDate: { $lte: entity.checkOutDate },
                        checkOutDate: { $gte: entity.checkInDate }
                    }
                });
                totalBookingsCount += bookingsCount;
            }

            // Ha az összes foglalások száma meghaladja a 4-et, hibaüzenet visszaadása
            if (totalBookingsCount > 4) {
                return res.status(400).json({ error: 'Too many bookings in the given period for the specified room type' });
            }

            // Az entitás mentése, ha minden feltétel teljesül
            const result = await this.repository.save(entity);

            // A mentés eredményének visszaküldése
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };
    */
}