import multer from "multer";

const storage = multer.diskStorage({
    destination: 'public/uploads',

    filename:  (req, file, cb)=> {
      const uniqueSuffix = Date.now()
     
     let ext=file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length,
     );
     
      cb(null, uniqueSuffix +ext);
    },
  });
  const upload = multer({ storage: storage })
  export default upload;
  