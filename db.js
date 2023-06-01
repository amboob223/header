const POOL= require("pg").Pool;

const pool = new POOL({
    user:"postgres",
    port:5432,
    host:"localhost",
    password:"8896",
    database:"whereu"
});

module.exports = pool; 