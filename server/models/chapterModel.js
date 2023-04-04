const mongoose = require("mongoose");
const { Schema } = mongoose;

const dialogSchema = new Schema({
  option: String,
});

const actionSchema = new Schema({
  observe: Boolean,
  interact: Boolean,
  fight: Boolean,
});

const planSchema = new Schema({
  followObject: String,
  timeToStop: Number,
  camera: {
    mode: String,
    pos: [Number],
    zoom: Number,
  },
  path: {
    animIndex: Number,
    pos: [[Number]],
    speed: Number,
  },
});

const sceneSchema = new Schema({
  Talks: {
    talk: dialogSchema,
  },
  Actions: {
    BaseballBat: actionSchema,
    VitrineMagasin: actionSchema,
    Car: actionSchema,
  },
  Dialogs: [String],
  Plan: [planSchema],
  Camera: [
    {
      mode: String,
      pos: [Number],
      zoom: Number,
    },
  ],
  Paths: [
    {
      animIndex: Number,
      pos: [Number],
      speed: Number,
    },
  ],
});

const chapterSchema = new Schema({
  Chapter: {
    Scene: sceneSchema,
  },
  number: Number,
});

module.exports = mongoose.model("Chapter", chapterSchema);
