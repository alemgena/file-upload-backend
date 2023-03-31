const express = require("express");
const {
  file_upload,
  
} = require("../controller");
const route = express.Router();
route.post(
  "",file_upload.fileUpload
 
);
route.get(
    "",file_upload.listFiles
   
  );
  route.delete(
    "/:id",file_upload.deleteFile
   
  );
module.exports = route;