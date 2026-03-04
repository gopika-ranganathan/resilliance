import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import MapPicker from '../components/MapPicker';
import { Heart, Clock, Phone, MapPin, Package } from 'lucide-react';

const FoodCenters = () => {
    const [centers, setCenters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { user } = useContext(AuthContext);

    // Form State
    const [organizationName, setOrganizationName] = useState('');
    const [foodType, setFoodType] = useState('');
    const [distributionTime, setDistributionTime] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetchFoodCenters();
    }, []);

    const fetchFoodCenters = async () => {
        try {
            const response = await api.get('/food-centers');
            setCenters(response.data);
        } catch (error) {
            console.error("Error fetching food centers", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location.lat) return alert('Please select a location on the map');

        try {
            await api.post('/food-centers', {
                organizationName,
                foodType,
                distributionTime,
                contact,
                imageUrl: imageUrl || 'https://images.unsplash.com/photo-1593113565694-c70043f114c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                latitude: location.lat,
                longitude: location.lng
            });
            setShowForm(false);
            fetchFoodCenters();
            // Reset
            setOrganizationName(''); setFoodType(''); setDistributionTime(''); setContact('');
        } catch (error) {
            console.error("Error adding food center", error);
            alert('Failed to submit food center');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <Heart className="h-8 w-8 mr-3 text-amber-500" />
                        Food & Supplies
                    </h1>
                    <p className="mt-2 text-gray-600">Location of free food and essential supply distributions.</p>
                </div>

                {user ? (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors"
                    >
                        {showForm ? 'Cancel' : 'Add Food Center'}
                    </button>
                ) : (
                    <p className="text-sm text-gray-500 italic">Log in to add a center</p>
                )}
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-amber-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Register Distribution Center</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                                    <input type="text" required value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 border" placeholder="E.g., Red Cross Local Branch" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type of Resources (Meals, Water, Blankets)</label>
                                    <input type="text" required value={foodType} onChange={(e) => setFoodType(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 border" placeholder="Hot meals and bottled water" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Distribution Time</label>
                                    <input type="text" required value={distributionTime} onChange={(e) => setDistributionTime(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 border" placeholder="E.g., 10:00 AM - 2:00 PM Daily" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                        <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 border" placeholder="+1..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 border" placeholder="https://" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                                <p className="text-xs text-gray-500 mb-2">Click on the map to pin the distribution location.</p>
                                <MapPicker location={location} setLocation={setLocation} />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors">
                                Save Center
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {centers.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Heart className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No centers listed</h3>
                    <p className="mt-1 text-sm text-gray-500">Currently there are no active food or supply centers.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {centers.map((center) => (
                        <div key={center.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48">
                                <img src={center.imageUrl} alt={center.organizationName} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{center.organizationName}</h3>

                                <div className="mt-4 space-y-3">
                                    <div className="flex items-start text-sm text-gray-600">
                                        <Package className="h-5 w-5 mr-3 text-amber-500 flex-shrink-0 mt-0.5" />
                                        <span><span className="font-semibold">Supplies:</span> {center.foodType}</span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="h-5 w-5 mr-3 text-amber-500" />
                                        <span><span className="font-semibold">Hours:</span> {center.distributionTime}</span>
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="h-5 w-5 mr-3 text-amber-500" />
                                        {center.contact}
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600 pb-2 border-b border-gray-100">
                                        <MapPin className="h-5 w-5 mr-3 text-amber-500" />
                                        <span className="truncate">{center.latitude?.toFixed(4)}, {center.longitude?.toFixed(4)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FoodCenters;
