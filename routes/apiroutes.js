const express = require('express')
const router = express.Router()
const path = require('path')
// randomUUID() generates a unique value
const { randomUUID } = require('crypto')
// fs is file server and allows node.js
// to work with the file system on your computer
const fs = require('fs')
// sets db.json to a variable
let db = require('../db/db.json')
// all routes within this file happen at
// the endpoint following /api (See the server.js)
// We're getting the db.json and responding with it
router.get('/notes', (req, res) => {
    console.log(`${req.method} request recieved`)
    let notes = JSON.parse(fs.readFileSync('./db/db.json'))
    // res is an var tied to an object in express
    // this object has a function (which would be considered
    // a method) "json" that handles json files
    res.status(200).json(notes)
    console.log('notes aquired')
})
// POST allows us to add an object to our database
router.post('/notes', (req, res) => {
    console.log(`${req.method} request recieved`)

    const { id, title, text } = req.body;

    const newNote = {
        // randomUUID() generates a unique value
        id: randomUUID(),
        title,
        text,
    };
// this sets notes to our db
    let notes = JSON.parse(fs.readFileSync('./db/db.json'))
    // push adds the newNote that was created to our db
    notes.push(newNote);
// this takes the updated db and saves/writes over the old db
    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
    // response sends us a json version of our notes
    res.json(notes);
    console.log('note created')
});
// this route allows for a note to be deleted
// we us :id as a query parameter to locate the id
// (which was set in a POST) and to pass it into the function
router.delete('/notes/:id', (req, res) => {
    console.log(`${req.method} request recieved`)
// the object is deconstructed and we set id = to the 
// :id from the query parameter
   const { id } = req.params;
// this stages our db array of objects
   let notes = JSON.parse(fs.readFileSync('./db/db.json'));
// this uses the filter method
// this takes notes and returns objects in notes
// with id's that do not equal the id from our req.params. 
// notes is then redefined as an array of objects
// with objects that have id's which do not match the id from req.params
   notes = notes.filter(notes => notes.id !== id)
// once notes is redefined, we overwrite the db file
// with an updated db
   fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
   res.json(notes);
   console.log('note deleted')
})

module.exports = router