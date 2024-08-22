const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()

require('dotenv').config()
const port = process.env.PORT || 5000

const storage = multer.diskStorage({
    destination: (req:any, file:any, cb:any) => {
        cb(null, path.join(__dirname,'..','uploads'))
    },

    filename: (req:any, file:any, cb:any) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.post('/upload', upload.single('file'), (req:any,res:any) => {
    if(!req.file){
        return res.status(400).send("Error!")
    }
    
    res.json(
        req.file
    )
})

app.listen(port, () => {
    console.log(`Server is listening at port ${port} ...`);
    
})