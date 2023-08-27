import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(book);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Add New Book</h1>
      <form action="#" method="post" enctype="multipart/form-data">
        <div className="form-group mt-2">
          <label htmlFor="title">Title:</label>
          <input
            className="form-control row"
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            className="form-control row"
            id="description"
            name="description"
            rows="4"
            cols="50"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="cover">Cover Image:</label>
          <input
            className="form-control row"
            type="text"
            id="cover"
            name="cover"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group my-2">
          <label htmlFor="price">Price:</label>
          <input
            className="form-control row"
            type="text"
            id="price"
            name="price"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" onClick={handleClick}>
          Add
        </button>
        <button className="btn btn-dark ms-2">
          <Link className="text-light text-decoration-none" to={"/"}>
            Cancel
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Add;
