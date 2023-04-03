require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("open", () => {
  console.log("Database Connected");
});

const app = express();
app.use(cors());
app.use(express.json());

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
const secretKey = generateSecretKey();

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/authenticate", async (req, res) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    return res.status(404).send("L'utilisateur n'existe pas");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send("Mot de passe invalide");
  }

  const options = { expiresIn: "1h" };
  const token = jwt.sign({ userId: user._id }, secretKey, options);
  res.send({ token });
});

app.get("/protected-resource", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).send("Token expired");
    }
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(401).send("Unauthorized");
  }
});

app.post("/users", async (req, res) => {
  try {
    let saltRounds = 10;
    let { email, username, password } = req.body;
    password = bcrypt.hashSync(password, saltRounds);
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        return res.status(400).json({ message: "Username already exists" });
      }
    }

    const user = new User({ email, username, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5050, () => {
  console.log(`Server Started at ${5050}`);
});
