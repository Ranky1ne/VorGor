import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const moveCars = async (request, response) => {
    const { carId } = request.body;
    const data=new Date();
    await query(connection,
        'UPDATE cars SET `onObject` = 0,`Data` = ? WHERE id = ?',
        [data, carId])
    response.end()
}