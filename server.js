const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

const notesRouter = require('./routes/notes')

app.use('/notes', notesRouter)

app.listen(3000)