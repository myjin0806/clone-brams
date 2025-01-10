import React from 'react';
import { Link } from 'react-router-dom';

const Title = ({ title, subtitle, showLink = false, linkTo = "" }) => {
  return (
    <div className="title-container">
      <h2>{title}</h2>
      {subtitle && (
        <p>{subtitle}</p>
      )}
      {showLink && (
        <Link to={linkTo} className="view-more-link">
          VIEW MORE
        </Link>
      )}
    </div>
  );
};

export default Title