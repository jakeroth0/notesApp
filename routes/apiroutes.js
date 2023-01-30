const express = require('express')
const router = express.Router()
const path = require('path')
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
    console.log('get notes')
    console.log(db)
    // res is an var tied to an object in express
    // this object has a function (which would be considered
    // a method) "json" that handles json files
    res.status(200).json(db)
})


router.post('/notes', (req, res) => {
    console.log(`${req.method} request recieved`)

    const { title, text } = req.body;

    if (title && text ) {
        const newNote = {
            title,
            text,
        };
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNote = JSON.parse(data);
                parsedNote.push(newNote);
                
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNote, null, 2),
                    (writeErr) =>
                    writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!')
                )
            }
        })

        const response = {
          status: 'success',
          body: newNote,  
        }

        console.log(response);
        res.status(201).json(db);
        console.log("getting db")
        console.log(db);
    } else {
        res.status(500).json('Error in posting note');
    }
 });

module.exports = router