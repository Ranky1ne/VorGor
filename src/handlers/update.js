import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const update = async (request, response) => {
  const {changerId, changeCustomer, changeCarrier, changeVolume, changeRawMaterial, changeAdress, printId} = request.body;


  try {
    await query(
      connection,
      "UPDATE newForm SET `Заказчик` = ?, `Перевозчик` = ?, `Объем` = ?, `Сырье` = ?, `Адрес` = ? , `printId` = ?  WHERE id = ?",
      [changeCustomer, changeCarrier, changeVolume, changeRawMaterial, changeAdress, printId, changerId]
    );
  } catch (error) {
    console.log(error);
  }

  response.redirect("/home");
};
