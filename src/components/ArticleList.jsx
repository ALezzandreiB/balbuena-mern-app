// src/components/ArticleList.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function ArticleList({ articles }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
      {articles.map(article => (
        <Link
          key={article.name}
          to={`/articles/${article.name}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            border: '4px solid #9B4DFF',
            borderRadius: '10px',
            padding: '10px',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          <h3 style={{ color: '#9B4DFF', margin: '10px 0 5px' }}>{article.title}</h3>
          <p style={{ color: '#000', fontSize: '16px' }}>{article.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default ArticleList;
