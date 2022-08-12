import { query } from "../../repository/query.js";
import { connection } from "../../repository/connection.js";

export const homeData = async (request, response) => {
   const result = await query(connection, 'SELECT * FROM newForm');
   let data = JSON.stringify(result)
   response.end(data);
}
