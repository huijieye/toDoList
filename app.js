const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect("mongodb://root:"+process.env.MONGODB_PASSWORD+"@cluster-shard-00-00-prx3s.mongodb.net:27017,cluster-shard-00-01-prx3s.mongodb.net:27017,cluster-shard-00-02-prx3s.mongodb.net:27017/test?ssl=true&replicaSet=Cluster-shard-0&authSource=admin")

const userRoute = require('./api/route/users')
const taskRoute = require('./api/route/tasks')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    next()
})

app.set('views','./api/views')

app.use('/',userRoute)
app.use('/task', taskRoute)

module.exports = app