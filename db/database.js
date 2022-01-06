require("dotenv").config();

module.exports = {
  db: `${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};
