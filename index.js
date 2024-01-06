const express= require('express');
const app= express();

app.use(express.json());

//middleware for file upload
const fileupload= require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//routes mounting
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);



//connect to database
const dbConnect= require('./config/database');
dbConnect();

//connect to cloudinary
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

app.listen(4000, ()=>{
    console.log("server has been created at 3000 port address");
})