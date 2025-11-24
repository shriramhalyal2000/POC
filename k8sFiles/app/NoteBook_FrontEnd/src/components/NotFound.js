import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
            <h1 className="display-1 text-primary">404</h1>
            <p className="lead">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary mt-3">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;