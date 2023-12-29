import axios from "axios";

const baseUrl = '/api/books'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllBooks = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBooksByID = async (id) => {
  const response = await axios.get(`${baseUrl}/id/${id}`);
  return response.data;
}

const getBooksByTitle = async (title) => {
  const response = await axios.get(`${baseUrl}/title/${title}`);
  return response.data;
}

const getBooksByPublisher = async (publisher) => {
  const response = await axios.get(`${baseUrl}/publisher/${publisher}`);
  return response.data;
}

const getBooksByKeywords = async (keywords) => {
  const response = await axios.get(`${baseUrl}/keywords/${keywords}`);
  return response.data;
}

const bookService = { setToken, getAllBooks, getBooksByID, getBooksByTitle, getBooksByPublisher, getBooksByKeywords };

export default bookService;
