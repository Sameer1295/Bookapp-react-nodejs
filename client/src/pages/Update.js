import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    cover: "",
    price: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

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
      await axios.put("http://127.0.0.1:8000/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Update Book</h1>
      <form action="#" method="post" enctype="multipart/form-data">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description:</label>
        <br />
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
          onChange={handleChange}
          required
        ></textarea>
        <br />
        <br />

        <label htmlFor="cover">Cover Image:</label>
        <input
          type="text"
          id="cover"
          name="cover"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          name="price"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button onClick={handleClick}>Update</button>
      </form>
    </div>
  );
};

export default Update;
