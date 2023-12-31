import { useState, useEffect } from "react";
import { Input, Button, Radio, List, Card } from "antd";
import PropTypes from "prop-types";

import booksService from "../services/books";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("title");

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await booksService.getAllBooks();
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
        const books = await booksService.getAllBooks();
        setBooks(books);
        return;
      }

      switch (type) {
        case "id": {
          const books = await booksService.getBooksByID(query);
          setBooks(books);
          break;
        }
        case "title": {
          const books = await booksService.getBooksByTitle(query);
          setBooks(books);
          break;
        }
        case "publisher": {
          const books = await booksService.getBooksByPublisher(query);
          setBooks(books);
          break;
        }
        case "keywords": {
          const books = await booksService.getBooksByKeywords(query);
          setBooks(books);
          break;
        }
        case "authors": {
          const books = await booksService.getBooksByAuthors(query);
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
    <div className="m-4">
      <Card title="Search Books" className="max-w-2xl mx-auto bg-white">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search for books"
            value={query}
            onChange={handleSearch} // 输入变化时更新状态
          />
          <Button type="primary" className="bg-blue-500 hover:bg-blue-700 text-white" onClick={search}>
            Search
          </Button>
        </div>
        <CheckBox type={type} setType={setType} />
      </Card>
      <BooksList books={books} />
    </div>
  );
};

const CheckBox = ({ type, setType }) => {
  return (
    <Radio.Group
      value={type}
      onChange={(e) => setType(e.target.value)}
      className="mb-4"
    >
      <Radio value="id">ID</Radio>
      <Radio value="title">Book Title</Radio>
      <Radio value="publisher">Publisher</Radio>
      <Radio value="keywords">Keywords</Radio>
      <Radio value="authors">Authors</Radio>
    </Radio.Group>
  );
};

CheckBox.propTypes = {
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
};

const BooksList = ({ books }) => {
  return (
    <List
      bordered
      dataSource={books}
      renderItem={(book) => (
        <List.Item key={book.BookID}>{book.Title}</List.Item>
      )}
      className="max-w-2xl mx-auto mt-4"
    />
  );
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Books;
