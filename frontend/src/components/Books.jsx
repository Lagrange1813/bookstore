import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import bookService from "../services/book";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("title");

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await bookService.getAllBooks();
      console.log(books);
      setBooks(books);
    };
    fetchBooks();
  }, []);

  // 处理搜索输入字段变化的函数
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const search = () => {
    const fetch = async () => {
      if (query === "") {
        const books = await bookService.getAllBooks();
        setBooks(books);
        return;
      }

      switch (type) {
        case "id": {
          const books = await bookService.getBooksByID(query);
          setBooks(books);
          break;
        }
        case "title": {
          const books = await bookService.getBooksByTitle(query);
          setBooks(books);
          break;
        }
        case "publisher": {
          const books = await bookService.getBooksByPublisher(query);
          setBooks(books);
          break;
        }
        case "keywords": {
          const books = await bookService.getBooksByKeywords(query);
          setBooks(books);
          break;
        }
        case "authors": {
          const books = await bookService.getBooksByAuthors(query);
          setBooks(books);
          break;
        }
        default:
          break;
      }
    };

    fetch();
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search for books"
          value={query}
          onChange={handleSearch} // 输入变化时更新状态
        />
        <button type="button" onClick={search}>
          Search
        </button>
      </div>
      <CheckBox type={type} setType={setType} />
      <BooksList books={books} />
    </>
  );
};

const CheckBox = ({ type, setType }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="id"
          checked={type === "id"}
          onChange={() => setType("id")}
        />
        ID
      </label>
      <label>
        <input
          type="radio"
          value="title"
          checked={type === "title"}
          onChange={() => setType("title")}
        />
        Book Title
      </label>
      <label>
        <input
          type="radio"
          value="publisher"
          checked={type === "publisher"}
          onChange={() => setType("publisher")}
        />
        Publisher
      </label>
      <label>
        <input
          type="radio"
          value="keywords"
          checked={type === "keywords"}
          onChange={() => setType("keywords")}
        />
        Keywords
      </label>
      <label>
        <input
          type="radio"
          value="authors"
          checked={type === "authors"}
          onChange={() => setType("authors")}
        />
        Authors
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
};

const BooksList = ({ books }) => {
  return (
    <>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.BookID}>{book.Title}</li>
        ))}
      </ul>
    </>
  );
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Books;
