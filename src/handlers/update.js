import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const update = async (request, response) => {
  const {changerId, changeCustomer, changeCarrier, changeVolume, changeRawMaterial, changeAdress} = request.body;
  //Отрефактори по примеру newForm.js
  // const body = request.body;
  // let dott = body.changerId;
  // let customer = body.changeCustomer;
  // carrier = body.changeCarrier;
  // volume = body.changeVolume;
  // rawMaterial = body.changeRawMaterial;
  // etc = body.changeEtc;
  

  try {
    await query(
      connection,
      "UPDATE newForm SET `Заказчик` = ?, `Перевозчик` = ?, `Объем` = ?, `Сырье` = ?, `Адрес` = ? WHERE id = ?",
      [changeCustomer, changeCarrier, changeVolume, changeRawMaterial, changeAdress, changerId]
    );
  } catch (error) {
    console.log(error);
  }

  response.redirect("/home");
};
