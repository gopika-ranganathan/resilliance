import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import MapPicker from '../components/MapPicker';
import ImageUploadButton from '../components/ImageUploadButton';
import PostActions from '../components/PostActions';
import { ShieldAlert, Phone, MapPin, AlertCircle } from 'lucide-react';

const AnimalRescue = () => {
    const [reports, setReports] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { user } = useContext(AuthContext);
    const [editingReport, setEditingReport] = useState(null);

    const [animalType, setAnimalType] = useState('Dog');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    useEffect(() => { fetchReports(); }, []);

    const fetchReports = async () => {
        try {
            const response = await api.get('/animal-rescue');
            setReports(response.data);
        } catch (error) { console.error("Error fetching animal rescues", error); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location.lat) return alert('Please select a location on the map');
        try {
            await api.post('/animal-rescue', {
                animalType, description, contact,
                imageUrl: uploadedImageUrl || 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                latitude: location.lat, longitude: location.lng
            });
            setShowForm(false); fetchReports();
            setAnimalType('Dog'); setDescription(''); setContact(''); setUploadedImageUrl('');
        } catch (error) { alert('Failed to submit report'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this animal rescue report?')) return;
        try { await api.delete(`/animal-rescue/${id}`); fetchReports(); }
        catch (e) { alert(e.response?.data || 'Delete failed'); }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/animal-rescue/${editingReport.id}`, editingReport);
            setEditingReport(null); fetchReports();
        } catch (e) { alert(e.response?.data || 'Update failed'); }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {editingReport && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Animal Rescue Report</h2>
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <select className="w-full border rounded-md px-3 py-2" value={editingReport.animalType || ''} onChange={e => setEditingReport({ ...editingReport, animalType: e.target.value })}>
                                <option>Dog</option><option>Cat</option><option>Livestock</option><option>Wildlife</option><option>Other</option>
                            </select>
                            <input required className="w-full border rounded-md px-3 py-2" placeholder="Contact" value={editingReport.contact || ''} onChange={e => setEditingReport({ ...editingReport, contact: e.target.value })} />
                            <textarea required rows={3} className="w-full border rounded-md px-3 py-2" placeholder="Description" value={editingReport.description || ''} onChange={e => setEditingReport({ ...editingReport, description: e.target.value })} />
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-md font-medium">Save Changes</button>
                                <button type="button" onClick={() => setEditingReport(null)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md font-medium">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <ShieldAlert className="h-8 w-8 mr-3 text-rose-600" />
                        Animal Rescue Reports
                    </h1>
                    <p className="mt-2 text-gray-600">Report abandoned animals or view registered rescue organizations.</p>
                </div>
                {user ? (
                    <button onClick={() => setShowForm(!showForm)} className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {showForm ? 'Cancel Form' : 'Report Animal in Need'}
                    </button>
                ) : (
                    <p className="text-sm text-gray-500 italic">Log in to report an animal</p>
                )}
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-rose-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Report Animal in Need</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Animal Type</label>
                                        <select value={animalType} onChange={(e) => setAnimalType(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 px-3 py-2 border">
                                            <option>Dog</option><option>Cat</option><option>Livestock</option><option>Wildlife</option><option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Contact</label>
                                        <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 px-3 py-2 border" placeholder="Phone number" />
                                    </div>
                                </div>
                                <ImageUploadButton onUpload={(url) => setUploadedImageUrl(url)} accentColor="rose" />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description of Situation</label>
                                    <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 px-3 py-2 border" placeholder="Injured dog trapped on roof..." />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                                <p className="text-xs text-gray-500 mb-2">Pinpoint where the animal was seen.</p>
                                <MapPicker location={location} setLocation={setLocation} />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors">Submit Report</button>
                        </div>
                    </form>
                </div>
            )}

            {reports.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <ShieldAlert className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No animal rescue reports</h3>
                    <p className="mt-1 text-sm text-gray-500">Currently there are no reported animals in need of rescue.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow relative">
                            <PostActions user={user} postUser={report.user} onEdit={() => setEditingReport({ ...report })} onDelete={() => handleDelete(report.id)} />
                            <div className="h-48 relative">
                                <img src={report.imageUrl} alt={report.animalType} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                    {report.animalType}
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-800 text-sm mb-4 h-[60px] line-clamp-3 font-medium bg-rose-50 p-2 rounded-md border border-rose-100">{report.description}</p>
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="h-5 w-5 mr-3 text-rose-500" />
                                        <span className="font-semibold text-gray-900">Reporter:</span> <span className="ml-1">{report.contact}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-5 w-5 mr-3 text-rose-500" />
                                        <span className="truncate">{report.latitude?.toFixed(4)}, {report.longitude?.toFixed(4)}</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <button className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-4 py-2 rounded-md font-medium transition-colors text-sm w-full">Coordinate Rescue</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnimalRescue;
