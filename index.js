require("dotenv").config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
const port = 4000;

const URL_all = process.env.URL || "mongodb://127.0.0.1:27017/usersImg";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required'],
    },
    image : {
        type : String,
        required : [true, 'Users image is required'],
    },
});

const usersImg = mongoose.model("usersImg", userSchema);

//uploadfile 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const fName = Date.now() + "-" + file.originalname;
      cb(null, fName)
    }
  })
  
  const upload = multer({ storage: storage })

//code end

app.get('/', (req, res)=>{
    res.status(200).send(`<h1>Welcome to the Server</h1>`)
})
app.get('/register', (req, res)=>{
    res.status(200).sendFile(__dirname + '/index.html')
})
app.post('/register', upload.single("image"), async (req, res)=>{
    try {
        const user = new usersImg({
            name : req.body.name,
            image : req.file.filename,
        });
        await user.save();
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send({message : error.message})
    }
})

const connectDb = async () =>{
    try {
        await mongoose.connect(URL_all);
        console.log(`Mongo is connected...`);
    } catch (error) {
        console.log(`Mongo connection error`);
        console.log(error.message);
        process.exit(1);
    }
}
app.listen(port, async ()=>{
    console.log(`server is running at http://localhost:${port}`);
    await connectDb()
})




 