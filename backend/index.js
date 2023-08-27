import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(8000, () => {
  console.log("connected to backend,hello sam");
});

// connection configurations
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "book_shop",
});
db.connect();

// Retrieve all books
app.get("/books", function (req, res) {
  db.query("SELECT * FROM books", function (error, results, fields) {
    if (error) throw res.json(err);
    return res.json(results);
  });
});

// Create book
app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books(`title`, `description`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book created successfully");
  });
});

//  Delete book
app.delete("/books/:id", function (req, res) {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been deleted successfully.");
  });
});

//  Update book with id
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `description`= ?,`price` = ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been updated successfully");
  });
});
