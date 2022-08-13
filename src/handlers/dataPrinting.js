import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const dataPrinting = async (request, response) => {
    const { carId, orderId, volume, numberTTN } = request.body;
    const result =  await query(connection,
        "SELECT * FROM newForm WHERE id = ?",
        [orderId]
        )
        const volumeChange = result[0]['Объем'] - volume;
        console.log(carId, volumeChange)
        await query(connection,
            "UPDATE `newForm` SET `Объем`= ? WHERE `id`= ?",
            [volumeChange,orderId]
        );
        await query(connection,
            "UPDATE `newForm` SET `НомерТТН`= ? WHERE `id`= 531",
            [(numberTTN+1)]
        );
        const car = await query(connection,
            "SELECT * FROM `cars` WHERE `id`= ?",
            [carId]
        );
        console.log(car)
        await query(connection,
            "INSERT INTO `journal`( `Номер ТТН`, `Заказчик`, `Перевозчик`, `Объем`, `Марка машины`, `Номер машины`, `Сырье`) VALUES (? ,? ,? ,? ,? ,? ,? )",
            [numberTTN,car[0][`Заказчик`], car[0][`Перевозчик`], car[0][`Объем, м3`], car[0][`Марка машины`], car[0][`Номер машины`], car[0][`Сырье`],]
        )
        response.end()
}