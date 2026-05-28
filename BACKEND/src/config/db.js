import mysql from "mysql2/promise";
import { env } from "./env.js";

export const pool = mysql.createPool({
  ...env.db,
  waitForConnections: true,
  connectionLimit: 20, // limité a 20 personnes sur le site en même temps
});
