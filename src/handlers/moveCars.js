import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const moveCars = async (request, response) => {
    const { carId } = request.body;
    await query(connection,
        'UPDATE cars SET `onObject` = 0 WHERE id = ?',
        [carId])
    response.end()
}