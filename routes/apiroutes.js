const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/notes', (req, res) => {
    // res.send('figuring this out')
    res.sendFile(path.join(__dirname,'/public/notes.html'))
    console.log('notes')
    console.log(__dirname,'/public/notes.html')
})

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    console.log((__dirname, '../public/index.html'));
  });

module.exports = router