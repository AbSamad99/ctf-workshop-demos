const express = require("express");
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const PORT = 80;

app.set("view engine", "hbs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const secretKey = "superdupersecert";

let pool;
const initialiseDB = async () => {
  try {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    await pool.query("drop table if exists users");
    await pool.query(`
              create table users (
                id serial primary key,
                name varchar(255) not null,
                username varchar(255) not null,
                password varchar(255) not null,
                account_type integer not null
              )
            `);

    const insertQuery = `
            insert into users (name, username, password, account_type) values
            ('Administrator','admin', 'cookie', 1),
            ('John','johnny', 'password123', 2)
          `;
    await pool.query(insertQuery);

    console.log("Database setup complete.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const jwtToken = token.split(" ")[1];

    if (jwtToken) {
      jwt.verify(jwtToken, secretKey, (err, decoded) => {
        if (!err) {
          req.user = decoded;
          next();
        }
      });
    }
  }
  return res.status(401).redirect("/");
};

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const queryResult = await pool.query(
      `select * from users where username='${username}' and password='${password}'`
    );

    if (queryResult && queryResult.rowCount) {
      const user = queryResult.rows[0];
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          account_type: user.account_type,
        },
        secretKey,
        { expiresIn: "30m" }
      );
      return res.status(200).json({ token });
    }
  }

  return res.status(400).json({ message: "Invalid Request" });
});

app.get("/hidden", (req, res) => {
  res.render("hidden");
});

app.post("/validate-token", verifyToken, (req, res) => {
  if (req.user.account_type == 1)
    res.status(200).json({ message: "flag{here-it-is}" });
  else res.status(200).json({ message: "Flag only available to admins." });
});

app.listen(PORT, () => {
  setTimeout(async () => {
    await initialiseDB();
    console.log("Api running on port 80");
  }, 5000);
});
