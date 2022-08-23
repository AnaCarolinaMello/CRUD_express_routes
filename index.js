
const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
const route = require('./routes/route')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.js')

app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/',route)

app.listen(port, err =>{
    console.log(`http://localhost:${port}`)
})