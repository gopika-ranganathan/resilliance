import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShieldAlert, Heart, Home, Phone, HelpCircle, Activity } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Disaster Updates', path: '/disasters', icon: Activity },
        { name: 'Shelters', path: '/shelters', icon: Home },
        { name: 'Food Centers', path: '/food-centers', icon: Heart },
        { name: 'Volunteer', path: '/volunteer', icon: HelpCircle },
        { name: 'Animal Rescue', path: '/animal-rescue', icon: ShieldAlert },
        { name: 'Emergency Contacts', path: '/emergency', icon: Phone },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
                            <ShieldAlert className="h-8 w-8 text-danger-600" />
                            <span className="font-sans font-bold text-xl text-gray-900 tracking-tight">Resilience</span>
                        </Link>
                        <div className="hidden md:ml-6 md:flex md:space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium px-3 py-2 transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="-mr-2 flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-600 hover:text-primary-600 hover:bg-gray-50 flex items-center px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                <link.icon className="h-4 w-4 mr-2" />
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {user ? (
                            <div className="px-4 space-y-2">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-sm font-medium text-gray-500 hover:text-gray-800 w-full text-left">Logout</button>
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-2 px-4">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center w-full px-4 py-2 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center w-full px-4 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
