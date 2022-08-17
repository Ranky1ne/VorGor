import { createConnection } from "mysql";

export const connection = createConnection({
  host: "db",
  user: "root",
  password: "3113",
  database: "nodelogin",
});
