import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const deleteCar = async (request, response) => {
    const { carId,carOrderId } = request.body;
    await query(connection,
    'DELETE FROM cars WHERE `id` = ? ',
    [carId])
    if (carOrderId === 'undefined') {
        response.redirect('/home')
    } else {
        response.redirect(`/carList?carList=${carOrderId}`)
    }
}