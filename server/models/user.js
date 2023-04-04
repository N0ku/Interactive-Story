const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  scores: [
    {
      chapter: String,
      answers: [
        {
          choice_answer: String,
          id_question: Number,
          impact: Number,
          actions: {
            [String]: [
              {
                observe: Boolean,
                interact: Boolean,
                fight: Boolean,
              },
            ],
          },
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
