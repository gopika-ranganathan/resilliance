import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Home, Heart, HelpCircle, ShieldAlert, Phone } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white min-h-[500px] flex items-center justify-center px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                    <img src="https://images.unsplash.com/photo-1595861171833-281b3ceccac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Resilience Background" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary-500">Resilience</span> – Disaster Support Platform
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-medium">
                        Helping communities stay safe during natural disasters by providing real-time information about shelters, food resources, volunteers, and rescue services.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/disasters" className="bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                            View Disaster Updates
                        </Link>
                        <Link to="/shelters" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1">
                            Find Shelters
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Access / Features Section */}
            <section className="py-20 bg-gray-50 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How We Can Help</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <Link to="/disasters" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                            <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                                <Activity className="h-8 w-8 text-primary-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Disaster Reports</h3>
                            <p className="text-gray-600">Get real-time updates on affected areas, view severity levels, and stay informed on ongoing natural disasters.</p>
                        </Link>

                        <Link to="/shelters" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                            <div className="bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                                <Home className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Shelter Finder</h3>
                            <p className="text-gray-600">Locate safe shelters nearby during emergencies, complete with capacity limits and contact information.</p>
                        </Link>

                        <Link to="/food-centers" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                            <div className="bg-amber-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors">
                                <Heart className="h-8 w-8 text-amber-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Food Centers</h3>
                            <p className="text-gray-600">Find active food and supply distribution centers. Check what's available and when to pick it up.</p>
                        </Link>

                        <Link to="/volunteer" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                            <div className="bg-purple-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                                <HelpCircle className="h-8 w-8 text-purple-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Volunteer Support</h3>
                            <p className="text-gray-600">Offer your help to those in need. Join local organizations for rescue support, medical, or distribution assistance.</p>
                        </Link>

                        <Link to="/animal-rescue" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                            <div className="bg-rose-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-rose-600 transition-colors">
                                <ShieldAlert className="h-8 w-8 text-rose-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Animal Rescue</h3>
                            <p className="text-gray-600">Don't leave pets behind. Find registered animal rescue organizations and report abandoned animals.</p>
                        </Link>

                        <Link to="/emergency" className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 bg-gradient-to-br from-red-50 to-white">
                            <div className="bg-red-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                                <Phone className="h-8 w-8 text-red-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-red-900 mb-3">Emergency Helpline</h3>
                            <p className="text-gray-700 font-medium">Immediate access to national emergency contacts: Ambulance, Police, Fire, and Disaster Management.</p>
                        </Link>

                    </div>
                </div>
            </section>

            {/* Emergency Contacts Banner */}
            <section className="bg-danger-600 text-white py-12 px-4 shadow-inner">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold flex items-center mb-2"><Phone className="mr-3 h-6 w-6" /> Local Emergency Contacts</h2>
                        <p className="text-red-100">Keep these numbers saved. Immediate response is critical during disasters.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-6">
                        <div className="bg-danger-500 bg-opacity-50 p-4 rounded-lg text-center backdrop-blur-sm shadow-sm border border-danger-500">
                            <div className="font-bold text-2xl">911</div>
                            <div className="text-sm font-medium uppercase tracking-wider text-red-100">Police / Fire</div>
                        </div>
                        <div className="bg-danger-500 bg-opacity-50 p-4 rounded-lg text-center backdrop-blur-sm shadow-sm border border-danger-500">
                            <div className="font-bold text-2xl">911</div>
                            <div className="text-sm font-medium uppercase tracking-wider text-red-100">Ambulance</div>
                        </div>
                        <div className="bg-danger-500 bg-opacity-50 p-4 rounded-lg text-center backdrop-blur-sm shadow-sm border border-danger-500">
                            <div className="font-bold text-2xl">1078</div>
                            <div className="text-sm font-medium uppercase tracking-wider text-red-100">Disaster Mgmt</div>
                        </div>
                        <div className="bg-danger-500 bg-opacity-50 p-4 rounded-lg text-center backdrop-blur-sm shadow-sm border border-danger-500">
                            <div className="font-bold text-2xl">1-800</div>
                            <div className="text-sm font-medium uppercase tracking-wider text-red-100">Animal Rescue</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
