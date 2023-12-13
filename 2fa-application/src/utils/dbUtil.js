const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

export const dbInstance = new JsonDB(
  new Config("myDataBase", true, false, "/")
);
