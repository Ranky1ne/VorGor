import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const addCar = async (request, response) => {
    const { carId, carNumber, carVolume} = request.body;
    
    try {
        const result = await query(
          connection,
          'SELECT  `Заказчик`, `Перевозчик` FROM `cars` WHERE `Объем, м3` = 0 AND `orderId` = ?',
          [carId])
        await query(connection, 
            'INSERT INTO cars (`Заказчик`, `Перевозчик`,`Номер машины`, `Объем, м3`, `orderId`) VALUES (?, ?, ?, ?, ?)',
            [result[0]['Заказчик'], result[0][`Перевозчик`], carNumber, carVolume, carId])
      } catch (error) {
        console.log(error)
      }
      response.redirect(`/carList?carList=${carId}`)
}