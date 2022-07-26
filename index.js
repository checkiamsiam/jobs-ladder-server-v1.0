// imports
const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const userRouter = require('./routes/userRouter/userRouter');



// middle ware
app.use(express.json())
app.use(cors())


// routers
app.use('/users' , userRouter)


app.get('/', (req, res) => {
  res.send("Welcome to the job's ladder backside")
})

app.listen(port)