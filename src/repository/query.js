// Сюда вынеси функцию query

export const query = async (connect, query, args) => {
    return new Promise((resolve, reject) => {
        connect.query(query, args, (err, res) => {
          if (err) reject  (err);
         resolve(res)
          });
      });
};
