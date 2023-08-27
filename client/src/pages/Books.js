import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const cardStyle = {
    width: "20rem",
    height: "550px",
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://127.0.0.1:8000/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="books row">
        <h2>Sam Book Store</h2>
        <button className="btn btn-primary mb-2">
          <Link
            to="/add"
            className="text-light"
            style={{ textDecoration: "none" }}
          >
            Add Book
          </Link>
        </button>
        {books.map((book) => (
          <div
            className="book card col-md-3 mx-2"
            style={cardStyle}
            key={book.id}
          >
            {book.cover && (
              <img
                className="img-fluid mt-2 w-70 h-50"
                src={book.cover}
                alt=""
              />
            )}
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p className="card-text">
                {isExpanded ? book.description : book.description.slice(0, 50)}
                <span
                  style={{ display: isExpanded ? "none" : "inline" }}
                  onClick={toggleDescription}
                  className="read-more-link text-primary"
                >
                  ...Read More
                </span>
              </p>
              <p>$34.00</p>
              <button
                className="delete btn btn-danger me-2"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
              <button className="update btn btn-warning">
                <Link
                  to={`/update/${book.id}`}
                  className="text-light text-decoration-none"
                >
                  Update
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
