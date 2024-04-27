const express = require('express')
const cors= require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000


//middleware
app.use(cors())



app.get('/',(req,res)=>{
    res.send('Server is working');
})

app.listen(port,()=>{
    console.log('Server is working')
})
