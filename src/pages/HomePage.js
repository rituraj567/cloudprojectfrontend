import React, { useEffect, useState } from "react";
import NavBar from "../common/NavBar";
import axios from "axios";
import Posts from "../components/Posts";
function HomePage() {
  

  return (
    <div>
      <NavBar />
      
      <Posts/>
    </div>
  );
}

export default HomePage;
