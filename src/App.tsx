import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProfileList from './components/Profile/ProfileList';
import ProfileDetail from './components/Profile/ProfileDetail';
import MapView from './components/Map/MapView';
import Dashboard from './components/Admin/Dashboard';
import './styles/modern.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<ProfileList />} />
                        <Route path="/profile/:id" element={<ProfileDetail />} />
                        <Route path="/map" element={<MapView />} />
                        <Route path="/admin" element={<Dashboard />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
};

export default App;