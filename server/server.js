require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const User = require("./models/user");
const Chapter = require("./models/chapterModel");
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

// Route pour ajouter un nouveau score pour un utilisateur
app.post("/users/:username/scores", (req, res) => {
  const username = req.params.username;
  const newScore = req.body;

  User.updateOne({ username: username }, { $push: { scores: newScore } })
    .then(() => {
      res.status(200).json({ message: "Score ajouté avec succès" });
    })
    .catch((error) => {
      res.status(400).json({ error: "Erreur lors de l'ajout du score" });
    });
});

// Route pour récupérer tous les scores d'un utilisateur
app.get("/users/:username/scores", (req, res) => {
  const username = req.params.username;

  User.findOne({ username: username })
    .then((user) => {
      res.status(200).json(user.scores);
    })
    .catch((error) => {
      res
        .status(400)
        .json({ error: "Erreur lors de la récupération des scores" });
    });
});

app.get("/chapter/:number", async (req, res) => {
  try {
    const chapter = await Chapter.findOne({ number: req.params.number });
    if (!chapter) {
      return res.status(404).send("Chapitre non trouvé");
    }
    res.json(chapter);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

app.post("/chapter", async (req, res) => {
  try {
    const chapterData = req.body;

    // Créer une nouvelle instance de modèle Chapter en utilisant les données envoyées dans la requête
    const newChapter = new Chapter(chapterData);
    console.log(newChapter);
    // Enregistrer le nouveau chapitre dans la base de données
    await newChapter.save();

    // Retourner le nouveau chapitre avec le code HTTP 201 (Created)
    res.status(201).json(newChapter);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

app.listen(5050, () => {
  console.log(`Server Started at ${5050}`);
});
