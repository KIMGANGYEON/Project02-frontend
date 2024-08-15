import axios from "axios";

export const getSelfDevelop = async () => {
  const response = await axios.get("v1/search/book.json", {
    params: { query: "자기계발", display: 20, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response;
};

export const getNovel = async () => {
  const response = await axios.get("v1/search/book.json", {
    params: { query: "소설", display: 20, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response;
};
export const getEssay = async () => {
  const response = await axios.get("v1/search/book.json", {
    params: { query: "수필", display: 20, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response;
};
export const getHistory = async () => {
  const response = await axios.get("/v1/search/book.json", {
    params: { query: "역사", display: 20, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response;
};

export const getBookDetail = async (id: string | undefined) => {
  const response = await axios.get("/v1/search/book.json", {
    params: { query: id },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response.data.items[0];
};
