import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start max-w-sm">
                        <div className="flex items-center text-primary-400 mb-4">
                            <ShieldAlert className="h-8 w-8 mr-2" />
                            <span className="font-bold text-xl tracking-tight text-white">Resilience</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            A community-driven disaster response system providing reliable information for shelters, food, volunteers, and rescue services.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-sm">
                        <div>
                            <h4 className="font-semibold text-gray-100 mb-4 tracking-wider uppercase">Resources</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="/disasters" className="hover:text-primary-400 transition-colors">Alerts</a></li>
                                <li><a href="/shelters" className="hover:text-primary-400 transition-colors">Shelters</a></li>
                                <li><a href="/emergency" className="hover:text-primary-400 transition-colors">Contacts</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-100 mb-4 tracking-wider uppercase">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="/volunteer" className="hover:text-primary-400 transition-colors">Volunteer</a></li>
                                <li><a href="/food-centers" className="hover:text-primary-400 transition-colors">Donate Food</a></li>
                                <li><a href="/animal-rescue" className="hover:text-primary-400 transition-colors">Animal Rescue</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Resilience. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Built for community safety and support.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
