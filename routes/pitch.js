const express = require('express');
const multer = require('multer');
const FileType = require('file-type');
const fs = require('fs');
const uuid = require('uuid');

const Router = express();
const { Pitch } = require('../models/Pitch');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!req.body.id) {
      cb(new Error('no id'), '');
      return;
    }
    if (!fs.existsSync(`uploads/pitches/${req.body.id}`)) {
      fs.mkdirSync(`uploads/pitches/${req.body.id}`);
    }
    cb(null, `uploads/pitches/${req.body.id}`);
  },
  filename: (req, file, cb) => {
    cb(null, `pitch-${uuid.v4()}.${file.mimetype.split('/')[1]}`);
  },
});

const limits = { fileSize: 8388608 }; // 8 Mb

const upload = multer({ storage, limits }).array('image', 12);

const isImage = (ext) => ext === 'png' || ext === 'jpg' || ext === 'jpeg';

Router.post('/Add-pitch', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.sendStatus(400);
      return;
    }
    try {
      let isInvalid = false;
      const exts = await Promise.all(req.files.map((file) => FileType.fromFile(file.path)));

      req.files.forEach((file, index) => {
        if (!isImage(exts[index].ext)) {
          fs.unlinkSync(file.path);
          isInvalid = true;
        }
      });

      if (isInvalid === true) {
        res.sendStatus(400).json('Invalid file');
        return;
      }
      const {
        name, adresse, phone1, phone2, email, capacite, prix,
      } = req.body;

      const newpitch = new Pitch({
        name,
        adresse,
        phone1,
        phone2,
        email,
        capacite,
        prix,
      });

      newpitch.save()
        .then(() => res.sendStatus(200))
        .catch(() => {
          req.files.forEach((file) => {
            fs.unlinkSync(file.path);
          });
          res.sendStatus(400);
        });
    } catch (error) {
      res.sendStatus(500).json('internal error');
      throw new Error('internal error');
    }
  });
});

Router.get('/pitchs', (req, res) => {
  Pitch.find()
    .then((Pitchs) => res.send(Pitchs))
    .catch((err) => console.log(err));
});

Router.get('/getOnePitch/:_id', (req, res) => {
  const { _id } = req.params;
  Pitch.findOne({ _id })
    .then((Pitchs) => res.send(Pitchs))
    .catch((err) => console.log(err));
});

Router.delete('/delete-pitch/:_id', (req, res) => {
  const { _id } = req.params;
  Pitch.findOneAndDelete({ _id })
    .then((Pitchs) => res.send('Pitch deleted', Pitchs))
    .catch((err) => console.log(err));
});

Router.put('/edit-pitch/:_id', (req, res) => {
  const { _id } = req.params;
  const {
    name, adresse, phone1, phone2, email, capacite, prix, image,
  } = req.body;
  Pitch.findOneAndUpdate({ _id }, {
    $set: {
      name, adresse, phone1, phone2, email, capacite, prix, image,
    },
  })
    .then((Pitchs) => res.send('pitch modified', Pitchs))
    .catch((err) => console.log(err));
});

module.exports = Router;
