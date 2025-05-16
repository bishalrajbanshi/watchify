import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./public/temp");
    },
    filename: function(req,file,cb){
        const suffix = Date.now();
        cb(null,`${suffix}-${file.originalname}`);
        console.log("original file name",file.originalname);   
    }
})

 const upload = multer({
    storage,
    limits: { fileSize: 30 * 1024 * 1024 }
})

export default upload;