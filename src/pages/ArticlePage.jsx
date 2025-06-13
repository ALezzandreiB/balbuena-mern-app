import React from "react";
import { useParams } from "react-router-dom"; 
import "@fontsource/poppins";
import articles from "../article-content.js"; 

function ArticlePage() {
  const { name } = useParams(); 
  const article = articles.find(article => article.name === name); 

  return (
    <>
      <h1>{article.title}</h1>
      <h2>{article.name}</h2>
      <img src={article.image} alt={article.title} style={{ maxWidth: '100%', height: 'auto' }} />
      {article.content.map((p, index) => (
        <p key={index}>{p}</p>
      ))}
    </>
  );
}

export default ArticlePage;
