const express = require('express')
const router = express.Router()
const path = require('path')
// at /notes endpoint, when a get req is sent
// res with the file notes.html
router.get('/notes', (req, res) => {
    // .. is the same as "cd .." and then we navigate
    // into the public folder and to notes.html
    res.sendFile(path.join(__dirname,'../public/notes.html'))
})
// this handles any other endpoint
// it's important that this is last becuase js reads top to bottom
// if this were above any other get req, we would always
// return to home - index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

// allows server.js to acces the router middlware
// and the router middleware has the routes attached
module.exports = router