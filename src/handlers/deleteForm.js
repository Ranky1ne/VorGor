import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const deleteForm = async (request, response) => {
    const {deleteOrder} = request.body;
    try {
    await query(connection,
    'DELETE FROM `cars` WHERE `cars`.`orderId` = ?',
    [deleteOrder])
    await query(connection,
    'DELETE FROM newForm WHERE `newForm`.`id` = ?',
    [deleteOrder])

  
    } catch (error){
        console.error();
    }
    response.redirect('/home')
}