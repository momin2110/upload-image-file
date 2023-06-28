const express = require('express');
const multer = require('multer');
const app = express();
const port = 4000;


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
app.post('/register', upload.single("image"), (req, res)=>{
    res.status(200).send('Image is uploaded')
})
app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
})




