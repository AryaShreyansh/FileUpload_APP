const mongoose= require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,

    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String, 
    },
    email:{
        type:String,
    }


});

//post middleware
fileSchema.post('save', async function(doc){
    try{
        // create the transporter
        const transporter = nodemailer.createTransport(
            {
                host: 'smtp.gmail.com',
                secure:true,
                auth:{
                    user: "shreyansharya1@gmail.com",
                    pass: ""
                },
            }
        )

        // send mail
        let info = await transporter.sendMail({
            from:`FileUpload APP by Shreyansh`,
            to: doc.email,
            subject:" New file uploaded on cloudinary",            
            html:`<h2>Hello jii</h2><p>File uploaded</p> View here: <a href ="${doc.imageUrl}">${doc.imageUrl}`,
        })

        console.log("INFO", info);

    }catch(err){
        console.log(err);
        

    }

})

const File = mongoose.model("File", fileSchema);
module.exports= File;