import axios from "axios";

export const getSelfDevelop = async () => {
  const response = await axios.get("v1/search/book.json", {
    params: { query: "자기개발", display: 20, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response;
};
