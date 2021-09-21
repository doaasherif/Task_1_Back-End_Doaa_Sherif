const express = require('express')
const bodyParser = require('body-parser')
const logger = require('jlogger')

const {index, create, details} = require('./controller/doctors.js')
const {login} = require('./controller/auth.js')

const app = express()

app.use(bodyParser.json())


function checkUserAuth(req, res, next){
    if(req.headers['authorization'] != "12345"){
        return res.json({message:"no access"})
    }
    next()
}

app.post('/auth', login)
app.get('/doctors', checkUserAuth, index)
app.post('/doctors', create)
app.get('/doctors/:id', details)


app.listen(8000, ()=>{
    logger.info('Server running on port 8000')
})