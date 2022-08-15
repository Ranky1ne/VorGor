import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const deleteCar = async (request, response) => {
    if (request.session.loggedin && request.session.username == 'admin') {
        const { carId,carOrderId } = request.body;
    await query(connection,
    'DELETE FROM cars WHERE `id` = ? ',
    [carId])
    if (carOrderId === 'undefined') {
        response.redirect('/home')
    } else {
        response.redirect(`/carList?carList=${carOrderId}`)
    }
    } else if(request.session.loggedin ){
        // Not logged in
        response.redirect('/home');
      } else {
        response.redirect('/')
      }
}