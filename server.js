//import app
const app = require('./blogApp');

//import swagger function
const swaggerDocs = require("./swagger")

//import config module
const CONFIG = require('./config/config');

//import database connection function
const connectToDB = require('./db/db');

//invoke connecToDB function
connectToDB();

//initiate swagger


app.listen(CONFIG.PORT, () => {
    console.log(`Server is running on http://localhost:${CONFIG.PORT}`)
})
swaggerDocs(app, CONFIG.PORT)