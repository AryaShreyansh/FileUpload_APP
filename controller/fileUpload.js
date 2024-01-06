const File= require('../models/File');
const cloudinary = require('cloudinary').v2;

// create the handler function for the localFile upload

exports.localFileUpload= async (req, res)=>{
    try{
        //fetch the files
        const file = req.files.file;
        //console.log("Files aa gyi hai->", file);

        //fetch out the extension from the file name
        const ext= file.name.split('.')[1];
        //console.log(ext);


        //define the path where we want to store the file on our server
        let path = __dirname+"/files/"+ Date.now()+"."+ ext ;
       
        // use the move mothod on the path
        file.mv(path, (err)=>{
            if(err)
            console.log(err);
        }); 

        res.json({
            success:true,
            message: "local file uploaded successfully"
        })
    }   
    catch(err){
        console.log(err);
    }
}

//create a handler for the file upload on the cloudinary
async function uploadToCloudinary(file, folder, quality){
    const options = {folder}

    if(quality){
        options.quality= quality;
    }
    options.resource_type = 'auto';
   return  await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res)=>{
        try{
         // fetch the data from the body
            const {name, tags, email} = req.body;
            const file = req.files.imageFile;
            

            //validation based on the supported types
            const supportedTypes = ['jpg', 'jpeg', 'png'];
            const extension = file.name.split('.')[1];

            if(!(supportedTypes.includes(extension))){
                res.status(400).json({
                    msg: " file type is not supported",
                })
            }

            // file format is valid then upload on the cloudinary
            const response = await uploadToCloudinary(file, 'Codehelp');
           // console.log(response);

            //save entru in database
            const fileData = await File.create({
                name, 
                tags,
                email,
                imageUrl:response.secure_url,
            })

            res.json({
                success: true,
                imageUrl: response.secure_url,
                msg: 'image successfully uploaded',
            })
        }catch(err){
            console.error(err);
            res.status(400).json({
                success:false,
                msg:'Something went wrong',
            })
        }

   
}

exports.videoUpload = async (req, res)=>{
    try{
        const {name , tags, email}= req.body;
        const file = req.files.videoFile;

        // validations
        const supportedTypes = ['mp4', 'mov'];
        const extension = file.name.split('.')[1].toLowerCase();

        if(!(supportedTypes.includes(extension))){
            res.status(400).json({
                msg: " file type is not supported",
            })
        }

        const response = await uploadToCloudinary(file, 'Codehelp');

            const fileData = await File.create({
                name, 
                tags,
                email,
                imageUrl:response.secure_url,
            })

            res.json({
                success: true,
                imageUrl: response.secure_url,
                msg: 'video successfully uploaded',
            })

    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            msg:"something went wrong",
        })
    }
    
}

exports.imageSizeReducer = async (req, res)=>{
    try{
         // fetch the data from the body
            const {name, tags, email} = req.body;
            const file = req.files.imageFile;
            console.log(file);

            //validation based on the supported types
            const supportedTypes = ['jpg', 'jpeg', 'png'];
            const extension = file.name.split('.')[1];

            if(!(supportedTypes.includes(extension))){
                res.status(400).json({
                    msg: " file type is not supported",
                })
            }

            // file format is valid then upload on the cloudinary
            const response = await uploadToCloudinary(file, 'Codehelp', 30);
           // console.log(response);

            //save entru in database
            const fileData = await File.create({
                name, 
                tags,
                email,
                imageUrl:response.secure_url,
            })

            res.json({
                success: true,
                imageUrl: response.secure_url,
                msg: 'image successfully uploaded',
            })
        }catch(err){
            console.error(err);
            res.status(400).json({
                success:false,
                msg:'Something went wrong',
            })
        }
}




