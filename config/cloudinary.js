const cloudinary= require('cloudinary');

exports.cloudinaryConnect = ()=>{
    try{
        cloudinary.config({
            cloud_name: "ducfvxm4n",
            api_key : 746126476615971,
            api_secret: "q1W2jJ4gqXBSNQteEzvAnLN2kW4",
        })
    }
    catch(error){
        console.log(error);
    }
}