import React, { useEffect } from "react";
import ProductBox from "../common/ProductBox";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { getSelfDevelop } from "../../../../api";
import { useRecoilState } from "recoil";
import { userState } from "../../../../atom";

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  const { isLoading, data: selfDevelop } = useQuery({
    queryKey: ["selfDevelop"],
    queryFn: getSelfDevelop,
  });
  return (
    <>
      <Helmet>
        <title>Project02</title>
      </Helmet>
      <ProductBox data={selfDevelop?.data.items} />
    </>
  );
};

export default Home;
