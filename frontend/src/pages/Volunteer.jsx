import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import MapPicker from '../components/MapPicker';
import ImageUploadButton from '../components/ImageUploadButton';
import PostActions from '../components/PostActions';
import { HelpCircle, Users, Phone, MapPin, Briefcase } from 'lucide-react';

const Volunteer = () => {
    const [requests, setRequests] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { user } = useContext(AuthContext);
    const [editingRequest, setEditingRequest] = useState(null);

    const [organizationName, setOrganizationName] = useState('');
    const [helpType, setHelpType] = useState('Rescue support');
    const [volunteersNeeded, setVolunteersNeeded] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    useEffect(() => { fetchRequests(); }, []);

    const fetchRequests = async () => {
        try {
            const response = await api.get('/volunteer-requests');
            setRequests(response.data);
        } catch (error) { console.error("Error fetching volunteer requests", error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location.lat) return alert('Please select a location on the map');
        try {
            await api.post('/volunteer-requests', {
                organizationName, helpType, volunteersNeeded: parseInt(volunteersNeeded), contact,
                imageUrl: uploadedImageUrl || 'https://images.unsplash.com/photo-1593113565694-c70043f114c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                latitude: location.lat, longitude: location.lng
            });
            setShowForm(false); fetchRequests();
            setOrganizationName(''); setVolunteersNeeded(''); setContact(''); setUploadedImageUrl('');
        } catch (error) { alert('Failed to submit request'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this volunteer request?')) return;
        try { await api.delete(`/volunteer-requests/${id}`); fetchRequests(); }
        catch (e) { alert(e.response?.data || 'Delete failed'); }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/volunteer-requests/${editingRequest.id}`, editingRequest);
            setEditingRequest(null); fetchRequests();
        } catch (e) { alert(e.response?.data || 'Update failed'); }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {editingRequest && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Volunteer Request</h2>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input required className="w-full border rounded-md px-3 py-2" placeholder="Organization Name" value={editingRequest.organizationName || ''} onChange={e => setEditingRequest({ ...editingRequest, organizationName: e.target.value })} />
                            <select className="w-full border rounded-md px-3 py-2" value={editingRequest.helpType || ''} onChange={e => setEditingRequest({ ...editingRequest, helpType: e.target.value })}>
                                <option>Rescue support</option>
                                <option>Food distribution</option>
                                <option>Medical assistance</option>
                                <option>Shelter support</option>
                                <option>Debris cleanup</option>
                            </select>
                            <input required type="number" className="w-full border rounded-md px-3 py-2" placeholder="Volunteers Needed" value={editingRequest.volunteersNeeded || ''} onChange={e => setEditingRequest({ ...editingRequest, volunteersNeeded: e.target.value })} />
                            <input required className="w-full border rounded-md px-3 py-2" placeholder="Contact" value={editingRequest.contact || ''} onChange={e => setEditingRequest({ ...editingRequest, contact: e.target.value })} />
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium">Save Changes</button>
                                <button type="button" onClick={() => setEditingRequest(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md font-medium">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <HelpCircle className="h-8 w-8 mr-3 text-purple-600" />
                        Volunteer Opportunities
                    </h1>
                    <p className="mt-2 text-gray-600">Find organizations that need your help right now.</p>
                </div>
                {user ? (
                    <button onClick={() => setShowForm(!showForm)} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors">
                        {showForm ? 'Cancel' : 'Request Volunteers'}
                    </button>
                ) : (
                    <p className="text-sm text-gray-500 italic">Log in to request volunteers</p>
                )}
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-purple-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Post a Volunteer Request</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                                    <input type="text" required value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 px-3 py-2 border" placeholder="Local Relief Agency" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of Help</label>
                                        <select value={helpType} onChange={(e) => setHelpType(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 px-3 py-2 border">
                                            <option>Rescue support</option>
                                            <option>Food distribution</option>
                                            <option>Medical assistance</option>
                                            <option>Shelter support</option>
                                            <option>Debris cleanup</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Volunteers Needed</label>
                                        <input type="number" required min="1" value={volunteersNeeded} onChange={(e) => setVolunteersNeeded(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 px-3 py-2 border" placeholder="e.g., 20" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                                    <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 px-3 py-2 border" placeholder="Phone or Email" />
                                </div>
                                <ImageUploadButton onUpload={(url) => setUploadedImageUrl(url)} accentColor="purple" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Location <span className="text-red-500">*</span></label>
                                <p className="text-xs text-gray-500 mb-2">Map the designated meeting point.</p>
                                <MapPicker location={location} setLocation={setLocation} />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t">
                            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors">Post Request</button>
                        </div>
                    </form>
                </div>
            )}

            {requests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <HelpCircle className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No volunteer requests</h3>
                    <p className="mt-1 text-sm text-gray-500">Currently there are no organizations requesting volunteers.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((request) => (
                        <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow relative">
                            <PostActions user={user} postUser={request.user} onEdit={() => setEditingRequest({ ...request })} onDelete={() => handleDelete(request.id)} />
                            <div className="h-48 relative">
                                <img src={request.imageUrl} alt={request.organizationName} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Needs {request.volunteersNeeded} Volunteers
                                </div>
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm flex items-center">
                                    <Briefcase className="w-3 h-3 mr-1 text-purple-600" /> {request.helpType}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 truncate">{request.organizationName}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Users className="h-5 w-5 mr-3 text-purple-500" />
                                        <span>Looking for <span className="font-semibold text-gray-900">{request.volunteersNeeded}</span> people</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="h-5 w-5 mr-3 text-purple-500" />
                                        {request.contact}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-5 w-5 mr-3 text-purple-500" />
                                        <span className="truncate">{request.latitude?.toFixed(4)}, {request.longitude?.toFixed(4)}</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <button className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 rounded-md font-medium transition-colors">Contact Organization</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Volunteer;
