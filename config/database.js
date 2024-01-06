const mongoose = require('mongoose');

const url = "mongodb+srv://shreyansharya123:arya12345@cluster0.3jsswkd.mongodb.net/uploadDB";
const dbConnect = ()=>{
    mongoose.connect(url)
    .then(()=>console.log("db connection successful"))
    .catch((err)=>{
        console.log(err);
        console.log("Db connection failed");
        process.exit(1);
    })
}
 
module.exports= dbConnect; 