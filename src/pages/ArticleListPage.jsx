// src/pages/ArticleListPage.jsx

import React from "react";
import "@fontsource/poppins";
import articles from "../article-content";
import ArticleList from "../components/ArticleList";

function ArticleListPage() {
  return (
    <div
      style={{
        backgroundColor: "#f4f5b7",
        padding: "150px",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#9B4DFF", marginBottom: "40px" }}>Articles About Olivia Rodrigo</h1>
      <ArticleList articles={articles} />
    </div>
  );
}

export default ArticleListPage;
