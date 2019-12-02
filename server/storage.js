const express = require('express');
const router = express.Router();
require('dotenv').config()

const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({storage: inMemoryStorage}).single('image');

const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);

const getStream = require('into-stream');

const STORAGE_URL = 'https://klogresourcediag159.blob.core.windows.net';
const CONTAINER_NAME = 'profile-photos';

const handleError = (err, res) => {
  res.status(500);
  res.json({error: err})
};

const getBlobName = originalName => {
  const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};

router.post('/', uploadStrategy, (req, res) => {
  const blobName = getBlobName(req.file.originalname);
  const stream = getStream(req.file.buffer);
  const streamLength = req.file.buffer.length;

  blobService.createBlockBlobFromStream(CONTAINER_NAME, blobName, stream, streamLength, (err, result) => {
    if (err) {
      handleError(err);
      return;
    }

    res.json({path: `${STORAGE_URL}/${CONTAINER_NAME}/${result.name}`})
  });
});

module.exports = router;
