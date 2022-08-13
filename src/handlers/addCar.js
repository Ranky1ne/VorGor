import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const addCar = async (request, response) => {
    const { carId, carNumber, carVolume, carMark} = request.body;
    
    try {
        const result = await query(
          connection,
          'SELECT  `Заказчик`, `Перевозчик`, `Сырье` FROM `cars` WHERE `Объем, м3` = 0 AND `orderId` = ?',
          [carId])
        
        await query(connection, 
            'INSERT INTO cars (`Заказчик`, `Перевозчик`,`Марка машины`,`Номер машины`, `Объем, м3`, `orderId`, `Сырье`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [result[0]['Заказчик'], result[0][`Перевозчик`], carMark, carNumber, carVolume, carId, result[0]['Сырье'] ])
      } catch (error) {
        console.log(error)
      }
      response.redirect(`/carList?carList=${carId}`)
}
