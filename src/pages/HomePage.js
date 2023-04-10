import React, { useState } from "react";

import Header from "../components/header/Header";
import { NavigationBar } from "../components/navBar/NavigationBar";
import Posts from "../components/Posts";
import ErrorPage from "./ErrorPage";
function HomePage() {
  const [search, handleSearchInput] = useState();
  console.log(search);
  return (
    <div>
      {localStorage.getItem("token") ? (
        <div>
          {" "}
          <NavigationBar handleSearchInput={handleSearchInput} />
          <Header />
          <Posts searchString={search} />
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}

export default HomePage;
