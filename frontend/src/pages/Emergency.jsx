import React from 'react';
import { Phone, ShieldAlert, HeartPulse, Shield, FileText } from 'lucide-react';

const Emergency = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                    <Phone className="h-10 w-10 mr-4 text-red-600 animate-pulse" />
                    Emergency Contacts
                </h1>
                <p className="mt-4 text-xl text-gray-600">
                    If you are in immediate danger, call your local emergency services immediately.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Urgent Numbers */}
                <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-md border border-red-100 p-8">
                    <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center border-b border-red-200 pb-2">
                        <HeartPulse className="mr-2 text-red-600" /> Immediate Assistance
                    </h2>
                    <ul className="space-y-6">
                        <li className="flex justify-between items-center">
                            <div>
                                <span className="block font-bold text-gray-900 text-lg">Ambulance</span>
                                <span className="text-sm text-gray-500">Medical emergencies</span>
                            </div>
                            <a href="tel:108" className="text-2xl font-black text-red-600 bg-red-100 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">108</a>
                        </li>
                        <li className="flex justify-between items-center">
                            <div>
                                <span className="block font-bold text-gray-900 text-lg">Police</span>
                                <span className="text-sm text-gray-500">Security & Life threats</span>
                            </div>
                            <a href="tel:100" className="text-2xl font-black text-red-600 bg-red-100 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">100</a>
                        </li>
                        <li className="flex justify-between items-center">
                            <div>
                                <span className="block font-bold text-gray-900 text-lg">Fire Department</span>
                                <span className="text-sm text-gray-500">Fires & Rescues</span>
                            </div>
                            <a href="tel:101" className="text-2xl font-black text-red-600 bg-red-100 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">101</a>
                        </li>
                    </ul>
                </div>

                {/* Specialized Agencies */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center border-b border-gray-200 pb-2">
                        <Shield className="mr-2 text-primary-600" /> Specialized Agencies
                    </h2>
                    <ul className="space-y-6">
                        <li className="flex justify-between items-center">
                            <div>
                                <span className="block font-bold text-gray-900 text-lg">Disaster Mgmt</span>
                                <span className="text-sm text-gray-500">National Relief</span>
                            </div>
                            <a href="tel:1078" className="text-2xl font-black text-primary-600 bg-primary-100 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors">1078</a>
                        </li>
                        <li className="flex justify-between items-center">
                            <div>
                                <span className="block font-bold text-gray-900 text-lg">Coast Guard</span>
                                <span className="text-sm text-gray-500">Maritime emergencies</span>
                            </div>
                            <a href="tel:1-800-424-8802" className="text-xl md:text-2xl font-black text-primary-600 bg-primary-100 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors">1-800</a>
                        </li>
                        <li className="flex justify-between items-center">
                            <div>
                                <span className="block font-bold text-gray-900 text-lg">Animal Rescue</span>
                                <span className="text-sm text-gray-500">Pet & Wildlife</span>
                            </div>
                            <a href="tel:555-0199" className="text-2xl font-black text-primary-600 bg-primary-100 px-4 py-2 rounded-lg hover:bg-primary-200 transition-colors">555-0199</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl mt-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center border-b border-gray-700 pb-4">
                    <FileText className="mr-3 text-primary-400" />
                    General Disaster Safety Instructions
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                        <h3 className="text-lg font-bold text-primary-400 mb-2">During an Earthquake</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                            <li>Drop, Cover, and Hold On.</li>
                            <li>Stay away from glass, windows, and heavy furniture.</li>
                            <li>If outdoors, move away from buildings and streetlights.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-blue-400 mb-2">During a Flood</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                            <li>Move immediately to higher ground.</li>
                            <li>Do not walk or drive through moving water.</li>
                            <li>Turn off utilities at the main switches if instructed.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-orange-400 mb-2">During a Wildfire</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                            <li>Evacuate immediately if instructed to do so.</li>
                            <li>Close all windows and doors to prevent draft.</li>
                            <li>Turn on outside lights to make your house visible in smoke.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-400 mb-2">Preparation</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-300">
                            <li>Keep an emergency kit ready (water, food, flashlight).</li>
                            <li>Have a family emergency communication plan.</li>
                            <li>Stay tuned to local alerts and radio.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Emergency;
