import React, { useEffect } from "react";
import ProductBox from "./Product/ProductBox";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import {
  getEssay,
  getHistory,
  getNovel,
  getSelfDevelop,
} from "../../../../api";

const Home = () => {
  const { data: selfDevelop } = useQuery({
    queryKey: ["selfDevelop"],
    queryFn: getSelfDevelop,
  });
  const { data: novel } = useQuery({
    queryKey: ["novel"],
    queryFn: getNovel,
  });
  const { data: essay } = useQuery({
    queryKey: ["essay"],
    queryFn: getEssay,
  });
  const { data: history } = useQuery({
    queryKey: ["history"],
    queryFn: getHistory,
  });
  return (
    <>
      <Helmet>
        <title>Project02</title>
      </Helmet>
      <ProductBox data={selfDevelop?.data.items} title="자기개발" />
      <ProductBox data={novel?.data.items} title="소설" />
      <ProductBox data={essay?.data.items} title="문학" />
      <ProductBox data={history?.data.items} title="역사" />
    </>
  );
};

export default Home;
