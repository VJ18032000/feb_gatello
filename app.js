const express = require('express')
const mongoose = require('mongoose')
const url = ""

const app = express()
const bodyParser=require('body-parser')

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
con.on('open', () => {
    console.log('database connection....')
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

const AuthRoute = require('./routes/user')
const PostRoute=require('./routes/post')
const CommentRoute=require('./routes/comment')
const StatusRoute=require('./routes/status')
const LikeRoute=require('./routes/like')
const UnRegister=require('./routes/unRegister')


app.use('/', AuthRoute)
app.use('/', PostRoute)
app.use('/',CommentRoute)
app.use('/',StatusRoute)
app.use('/',LikeRoute)
app.use('/',UnRegister)

app.listen(4000, () => console.log('server connection...4000'))
