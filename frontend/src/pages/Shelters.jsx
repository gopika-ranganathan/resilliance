import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import MapPicker from '../components/MapPicker';
import { Home, Users, Phone, MapPin } from 'lucide-react';

const Shelters = () => {
    const [shelters, setShelters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { user } = useContext(AuthContext);

    // Form State
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [availableBeds, setAvailableBeds] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetchShelters();
    }, []);

    const fetchShelters = async () => {
        try {
            const response = await api.get('/shelters');
            setShelters(response.data);
        } catch (error) {
            console.error("Error fetching shelters", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location.lat) return alert('Please select a location on the map');

        try {
            await api.post('/shelters', {
                name,
                capacity: parseInt(capacity),
                availableBeds: parseInt(availableBeds),
                contact,
                imageUrl: imageUrl || 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                latitude: location.lat,
                longitude: location.lng
            });
            setShowForm(false);
            fetchShelters();
            // Reset
            setName(''); setCapacity(''); setAvailableBeds(''); setContact('');
        } catch (error) {
            console.error("Error adding shelter", error);
            alert('Failed to submit shelter');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <Home className="h-8 w-8 mr-3 text-emerald-600" />
                        Shelter Availability
                    </h1>
                    <p className="mt-2 text-gray-600">Find safe shelters equipped to help during emergencies.</p>
                </div>

                {user ? (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors"
                    >
                        {showForm ? 'Cancel' : 'Add Shelter'}
                    </button>
                ) : (
                    <p className="text-sm text-gray-500 italic">Log in to add a shelter</p>
                )}
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-emerald-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Register a Shelter</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Shelter Name</label>
                                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border" placeholder="E.g., Central High School Gym" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Capacity</label>
                                        <input type="number" required min="1" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border" placeholder="e.g., 500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Available Beds</label>
                                        <input type="number" required min="0" value={availableBeds} onChange={(e) => setAvailableBeds(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border" placeholder="e.g., 120" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                    <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border" placeholder="+1..." />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border" placeholder="https://example.com/image.jpg" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                                <p className="text-xs text-gray-500 mb-2">Click on the map to pin the shelter location.</p>
                                <MapPicker location={location} setLocation={setLocation} />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors">
                                Save Shelter
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {shelters.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Home className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No shelters registered</h3>
                    <p className="mt-1 text-sm text-gray-500">Currently there are no active shelters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shelters.map((shelter) => (
                        <div key={shelter.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 relative">
                                <img src={shelter.imageUrl} alt={shelter.name} className="w-full h-full object-cover" />
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white ${shelter.availableBeds > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                                    {shelter.availableBeds > 0 ? 'Available' : 'Full'}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 truncate">{shelter.name}</h3>

                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="h-5 w-5 mr-3 text-emerald-500" />
                                        <span className="font-medium">{shelter.availableBeds}</span> <span className="mx-1 text-gray-400">/</span> {shelter.capacity} beds available
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="h-5 w-5 mr-3 text-emerald-500" />
                                        {shelter.contact}
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-5 w-5 mr-3 text-emerald-500" />
                                        <span className="truncate">{shelter.latitude?.toFixed(4)}, {shelter.longitude?.toFixed(4)}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <button className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 rounded-md font-medium transition-colors">
                                        Get Directions
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shelters;
