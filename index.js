var express = require('express');
var cors = require('cors');
require('dotenv').config();
/**
 * install and use NPM multer package 
 * reference: https://www.npmjs.com/package/multer
 */
const multer = require('multer');
const upload = multer();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'),(req, res) => {
  // console.log("req.file: ", JSON.stringify(req.file));
  const fileName = req.file.originalname;
  const fileType = req.file.mimetype;
  const fileSizeBytes = new Number(req.file.size);
  res.json({name: fileName, type: fileType, size: fileSizeBytes});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
