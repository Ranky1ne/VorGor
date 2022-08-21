import { createConnection } from "mysql";

export const connection = createConnection({
  host: "db",
  user: "root",
  password: "",
  database: "nodelogin",
});
