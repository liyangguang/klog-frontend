require('dotenv').config()
const express = require('express');
const multer = require('multer');
const azureStorage = require('azure-storage');
const getStream = require('into-stream');

// Const variables
const FIELD_NAME_IN_THE_UI = 'image';
const STORAGE_URL = 'https://klogresourcediag159.blob.core.windows.net';
const CONTAINER_NAME = 'profile-photos';

// Init
const router = express.Router();
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({storage: inMemoryStorage}).single(FIELD_NAME_IN_THE_UI);
const blobService = azureStorage.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);

const handleError = (err, res) => {
  res.status(500);
  res.json({error: err})
};

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};

const getOption = (type) => ({
  contentSettings: {
    contentType: type,
  },
});

router.post('/', uploadStrategy, (req, res) => {
  const blobName = getBlobName(req.file.originalname);
  const stream = getStream(req.file.buffer);
  const streamLength = req.file.buffer.length;

  blobService.createBlockBlobFromStream(CONTAINER_NAME, blobName, stream, streamLength, getOption(req.file.mimetype), (err, result) => {
    if (err) {
      handleError(err);
      return;
    }

    res.json({path: `${STORAGE_URL}/${CONTAINER_NAME}/${result.name}`})
  });
});

module.exports = router;
