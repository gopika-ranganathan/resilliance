import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Disasters from './pages/Disasters';
import Shelters from './pages/Shelters';
import FoodCenters from './pages/FoodCenters';
import Volunteer from './pages/Volunteer';
import AnimalRescue from './pages/AnimalRescue';
import Emergency from './pages/Emergency';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const MainRoute = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/disasters" element={<Disasters />} />
                    <Route path="/shelters" element={<Shelters />} />
                    <Route path="/food-centers" element={<FoodCenters />} />
                    <Route path="/volunteer" element={<Volunteer />} />
                    <Route path="/animal-rescue" element={<AnimalRescue />} />
                    <Route path="/emergency" element={<Emergency />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default MainRoute;
