import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const orderData = async (request, response) => {
    const { changeOrder } = request.body;
   const result = await query(connection,
     'SELECT * FROM newForm WHERE id = ?',
   [changeOrder]);
   let data = JSON.stringify(result)
   response.end(data);
}
