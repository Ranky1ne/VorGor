import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const dataPrinting = async (request, response) => {
    const { orderId } = request.body;
   const result =  await query(connection,
        "SELECT * FROM newForm WHERE id = ?",
        [orderId]
        )
        let data = JSON.stringify(result)
   response.end(data);

    }