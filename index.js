const path = require('path')
const express = require('express')
const app = express()


console.log('Welcome to Node')

// serve up the static files
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))