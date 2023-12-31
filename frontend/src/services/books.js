import { defaultAxios } from "./apiService";

const baseUrl = "/books";

const getAllBooks = async () => {
  const response = await defaultAxios.get(`${baseUrl}`);
  return response.data;
};

const getBooksByID = async (id) => {
  const response = await defaultAxios.get(`${baseUrl}/id/${id}`);
  return response.data;
};

const getBooksByTitle = async (title) => {
  const response = await defaultAxios.get(`${baseUrl}/title/${title}`);
  return response.data;
};

const getBooksByPublisher = async (publisher) => {
  const response = await defaultAxios.get(`${baseUrl}/publisher/${publisher}`);
  return response.data;
};

const getBooksByKeywords = async (keywords) => {
  const response = await defaultAxios.get(`${baseUrl}/keywords/${keywords}`);
  return response.data;
};

const getBooksByAuthors = async (authors) => {
  const response = await defaultAxios.get(`${baseUrl}/authors/${authors}`);
  return response.data;
};

const booksService = {
  getAllBooks,
  getBooksByID,
  getBooksByTitle,
  getBooksByPublisher,
  getBooksByKeywords,
  getBooksByAuthors,
};

export default booksService;
