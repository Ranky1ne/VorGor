import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const newForm = async (request, response) => {
  // Было
  //   const body = request.body;
  //   let customer = body.customer;
  //   carrier = body.carrier;
  //   volume = body.volume;
  //   rawMaterial = body.rawMaterial;
  //   etc = body.etc;
  //   let dott;

  // Cтало
  const { customer, carrier, volume, rawMaterial, etc } = request.body;

  // По поводу let dott;
  // Если не собираешься переназначать переменную таким образом:
  // dott = 1;
  // То нет смысла ее заводить
  // Дальше по коду ты ее переназначаешь но смысла в этом нет
  // Используй вместо dott - es.insertId.

  //Нет смысла дублировать функцию query из src/repository/query.js
  //Просто импортируй ее


  try {
    let dott = await query(
      connection,
      "INSERT INTO `nodelogin`.`newForm` ( `Заказчик`, `Перевозчик`, `Объем`, `Сырье`, `и тд.`) VALUES (?, ?, ?, ?, ?); ",
      [customer, carrier, volume, rawMaterial, etc]
    );
  
    await query(
      connection,
      "INSERT INTO cars (`Заказчик`, `Перевозчик`, `orderId`) VALUES (?, ?, ?)",
      [customer, carrier, dott.insertId]
    )
    
    } catch (error) {
      console.log(error)
    }

  response.redirect("/home");
};
