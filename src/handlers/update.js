export const update = async (request, response) => {
  //Отрефактори по примеру newForm.js
  const body = request.body;
  let dott = body.changerId;
  let customer = body.changeCustomer;
  carrier = body.changeCarrier;
  volume = body.changeVolume;
  rawMaterial = body.changeRawMaterial;
  etc = body.changeEtc;
  const query = (connection, query, args) => {
    return new Promise((resolve, reject) => {
      connection.query(query, args, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  };

  try {
    await query(
      connection,
      "UPDATE newForm SET `Заказчик` = ?, `Перевозчик` = ?, `Объем` = ?, `Сырье` = ?, `и тд.` = ? WHERE id = ?",
      [customer, carrier, volume, rawMaterial, etc, dott]
    );
  } catch (error) {
    console.log(error);
  }

  response.redirect("/home");
};
