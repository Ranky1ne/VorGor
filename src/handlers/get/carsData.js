import { query } from "../../repository/query.js";
import { connection } from "../../repository/connection.js";

export const carsData = async (request, response) => {
   const result = await query(connection, 'SELECT * FROM cars ORDER BY `cars`.`Data` ASC');
   let data = JSON.stringify(result);
   
   response.end(data);
}
