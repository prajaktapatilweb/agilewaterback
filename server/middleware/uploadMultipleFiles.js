// This middleware usefule to upload and transfer the image and pdf file to server. Only condition is fieldname is 'file1' . This fieldname is used in multer upload function and also defined at the time of uploading data from frontend to backend. use upload.array

// If used upload.field then it can used to upload multiple files With field name can be mentioned in the position.
// const logger = require('../services/Logger')

const util = require("util");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, path.join(`${__dirname}/../../upload`));
    callback(null, 'public');
  },
  filename: (req, file, callback) => {
    // console.log('Mutter')
    const match = ["image/png", "image/jpeg", , "image/jpg", "image/webp", "application/pdf"];
    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg or pdf files.`;
      return callback(message, null);
    }
    console.log('Inside Mutter',file)
    var filename = `/userFileUploads/${req.user.gid}-${Date.now()}-${file.originalname}`;
    const FileFieldname = file.fieldname;
    // req.uploadedFilLocation = { [FileFieldname]: filename }
    req.body[FileFieldname] = filename
    callback(null, filename);
  }
});
const multipleUpload = async (req, res, next) => {
  try {
    // console.log('In file upload 1')

    // var uploadFiles = multer({ storage: storage }).array('file1', 3);
    // var uploadFiles = multer({ storage: storage }).fields([{ name: 'file1', maxCount: 3 }, { name: 'file2', maxCount: 3 }]);
    // var uploadFiles = multer({ storage: storage }).fields([{ name: 'Avatar', maxCount: 2 }, { name: 'ImgFileData', maxCount: 2 },{ name: 'FilePAN', maxCount: 2 }, { name: 'FileAadhar', maxCount: 2 }, { name: 'FileCV', maxCount: 3 }, { name: 'FileDegree', maxCount: 5 }]);
    var uploadFiles = multer({ storage: storage }).fields([ { name: 'Avatar', maxCount: 2 },{ name: 'ImgFileData', maxCount: 2 }]);
    // var uploadFiles = multer({ storage: storage }).fields([{ name: 'FilePhoto', maxCount: 3 }]);

    var uploadFilesMiddleware = util.promisify(uploadFiles);
    // console.log('In file upload 2')

    await uploadFilesMiddleware(req, res)
    // console.log('In file upload 3')
    if (req.files.length <= 0) {
      return res.send({ Result: 'You must select at least 1 file' });
    }
    // return res.send(`Files has been uploaded.`);
    console.log('Before Next', req.files)
    await next();
  } catch (error) {
    console.log(error);
    // logger.error(`Catch Block - File Upload Failed${error}`, { by: req.user.gid, for: [0], info: {} })
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};
module.exports = {
  multipleUpload: multipleUpload
};