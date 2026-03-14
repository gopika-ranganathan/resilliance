import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import MapPicker from '../components/MapPicker';
import ImageUploadButton from '../components/ImageUploadButton';
import PostActions from '../components/PostActions';
import { Heart, Clock, Phone, MapPin, Package } from 'lucide-react';

const FoodCenters = () => {
    const [centers, setCenters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { user } = useContext(AuthContext);
    const [editingCenter, setEditingCenter] = useState(null);

    const [organizationName, setOrganizationName] = useState('');
    const [foodType, setFoodType] = useState('');
    const [distributionTime, setDistributionTime] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [availabilityType, setAvailabilityType] = useState('TIME_BASED');
    const [stockQuantity, setStockQuantity] = useState('');

    useEffect(() => { fetchFoodCenters(); }, []);

    const fetchFoodCenters = async () => {
        try {
            const response = await api.get('/food-centers');
            setCenters(response.data);
        } catch (error) { console.error("Error fetching food centers", error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location.lat) return alert('Please select a location on the map');
        try {
            await api.post('/food-centers', {
                organizationName, foodType, distributionTime, contact,
                imageUrl: uploadedImageUrl || 'https://images.unsplash.com/photo-1593113565694-c70043f114c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                availabilityType,
                stockQuantity: availabilityType === 'STOCK_BASED' ? parseInt(stockQuantity) : null,
                latitude: location.lat, longitude: location.lng
            });
            setShowForm(false); fetchFoodCenters();
            setOrganizationName(''); setFoodType(''); setDistributionTime(''); setContact(''); setUploadedImageUrl(''); setStockQuantity(''); setAvailabilityType('TIME_BASED');
        } catch (error) { alert('Failed to submit food center'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this food center?')) return;
        try { await api.delete(`/food-centers/${id}`); fetchFoodCenters(); }
        catch (e) { alert(e.response?.data || 'Delete failed'); }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/food-centers/${editingCenter.id}`, editingCenter);
            setEditingCenter(null); fetchFoodCenters();
        } catch (e) { alert(e.response?.data || 'Update failed'); }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {editingCenter && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Food Center</h2>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input required className="w-full border rounded-md px-3 py-2" placeholder="Organization Name" value={editingCenter.organizationName || ''} onChange={e => setEditingCenter({ ...editingCenter, organizationName: e.target.value })} />
                            <input required className="w-full border rounded-md px-3 py-2" placeholder="Food/Resource Type" value={editingCenter.foodType || ''} onChange={e => setEditingCenter({ ...editingCenter, foodType: e.target.value })} />
                            <input className="w-full border rounded-md px-3 py-2" placeholder="Distribution Hours (if time-based)" value={editingCenter.distributionTime || ''} onChange={e => setEditingCenter({ ...editingCenter, distributionTime: e.target.value })} />
                            <input required className="w-full border rounded-md px-3 py-2" placeholder="Contact" value={editingCenter.contact || ''} onChange={e => setEditingCenter({ ...editingCenter, contact: e.target.value })} />
                            {editingCenter.availabilityType === 'STOCK_BASED' && (
                                <input type="number" className="w-full border rounded-md px-3 py-2" placeholder="Stock Quantity" value={editingCenter.stockQuantity || ''} onChange={e => setEditingCenter({ ...editingCenter, stockQuantity: parseInt(e.target.value) })} />
                            )}
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md font-medium">Save Changes</button>
                                <button type="button" onClick={() => setEditingCenter(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md font-medium">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <Heart className="h-8 w-8 mr-3 text-amber-500" />
                        Food &amp; Supplies
                    </h1>
                    <p className="mt-2 text-gray-600">Location of free food and essential supply distributions.</p>
                </div>
                {user ? (
                    <button onClick={() => setShowForm(!showForm)} className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors">
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
                                    <input type="text" required value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 px-3 py-2 border" placeholder="E.g., Red Cross Local Branch" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type of Resources</label>
                                    <input type="text" required value={foodType} onChange={(e) => setFoodType(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 px-3 py-2 border" placeholder="Hot meals and bottled water" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Availability Mode</label>
                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setAvailabilityType('TIME_BASED')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium border transition-colors ${availabilityType === 'TIME_BASED' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>🕐 By Time</button>
                                        <button type="button" onClick={() => setAvailabilityType('STOCK_BASED')} className={`flex-1 py-2 px-4 rounded-md text-sm font-medium border transition-colors ${availabilityType === 'STOCK_BASED' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}>📦 By Stock</button>
                                    </div>
                                </div>
                                {availabilityType === 'TIME_BASED' ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Distribution Hours</label>
                                        <input type="text" required value={distributionTime} onChange={(e) => setDistributionTime(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 px-3 py-2 border" placeholder="E.g., 10:00 AM - 2:00 PM Daily" />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock (units / meals)</label>
                                        <input type="number" required min="0" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 px-3 py-2 border" placeholder="E.g., 150" />
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                        <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 px-3 py-2 border" placeholder="Phone number" />
                                    </div>
                                    <div>
                                        <ImageUploadButton onUpload={(url) => setUploadedImageUrl(url)} accentColor="amber" />
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
                            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors">Save Center</button>
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
                        <div key={center.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow relative">
                            <PostActions user={user} postUser={center.user} onEdit={() => setEditingCenter({ ...center })} onDelete={() => handleDelete(center.id)} />
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
                                    {center.availabilityType === 'STOCK_BASED' ? (
                                        <div className="flex items-center text-sm">
                                            <div className="flex-1">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-semibold text-gray-700">Stock Available</span>
                                                    <span className="font-bold text-amber-600">{center.stockQuantity} units</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className={`h-2 rounded-full ${center.stockQuantity > 100 ? 'bg-green-500' : center.stockQuantity > 20 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min(center.stockQuantity, 200) / 2}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock className="h-5 w-5 mr-3 text-amber-500" />
                                            <span><span className="font-semibold">Hours:</span> {center.distributionTime}</span>
                                        </div>
                                    )}
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
