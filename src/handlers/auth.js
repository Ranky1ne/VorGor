import { query } from "../repository/query.js";
import { connection } from "../repository/connection.js";

export const auth = async (request, response) => {
  const { username, password } = request.body;

  // Используй функцию query.js из src/repository/query.js
  // Переделай функцию в асинхронную
  if (username && password) {
    const result = await query( connection,
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password])
      
        if (result.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/home");
        } else {
          response.redirect("/");
        }
        response.end();
      } else {
    response.send("Please enter Username and Password!");
  }
};
