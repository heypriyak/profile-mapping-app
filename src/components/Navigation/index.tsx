import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Profiles</Link></li>
                <li><Link to="/map">Map</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;