// this gives us access to express
const express = require('express')
// assigns notesRouter to the router middleware
// so that we have access to the routes within our html script
// notes.js
const notesRouter = require('./routes/notes')
// similar to the notes router, this gives us access
// to api routes through the router middleware
const apiRouter = require('./routes/apiroutes')

// assigns the express function as an ap
const app = express()
// server host OR port 3000
const PORT = process.env.PORT || 3000;

// middleware function that parses incoming JSON req
// and puts parsed data in req.body
app.use(express.json());
// above and below are needed for POST and PUT req
// below recognizes incoming req objects as strings or arrays
// below can also handle html post form
app.use(express.urlencoded({ extended: true }))
// makes it possible to access static files
// via html
app.use(express.static('public'))
// for any req with /api use apiRouter
app.use('/api', apiRouter)
// for any req with / use notesRouter
app.use('/', notesRouter)
// tells user that listening for actions on whatever
// PORT is set to
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
