import React, { useState, useEffect, useContext, useRef } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import MapPicker from '../components/MapPicker';
import { Activity, MapPin, Clock, AlertTriangle, Camera } from 'lucide-react';

const Disasters = () => {
    const [disasters, setDisasters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { user } = useContext(AuthContext);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [disasterType, setDisasterType] = useState('Flood');
    const [severity, setSeverity] = useState('High');
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [imageUrl, setImageUrl] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchDisasters();
    }, []);

    const fetchDisasters = async () => {
        try {
            const response = await api.get('/disasters');
            setDisasters(response.data);
        } catch (error) {
            console.error("Error fetching disasters", error);
        }
    };

    const handleCaptureStart = () => {
        fileInputRef.current?.click();
    };

    const handlePhotoCaptured = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Preview the image locally
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);
        setIsCapturing(true);

        // Geotag: Get precise location and time
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setLocation({ lat, lng });

                    const timestamp = new Date().toLocaleString();
                    setDescription((prev) =>
                        prev ? `${prev}\n\n[Captured at: ${timestamp}]\n[Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}]`
                            : `[Captured at: ${timestamp}]\n[Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}] `
                    );
                    setIsCapturing(false);
                },
                (error) => {
                    alert("Unable to retrieve your location from the camera request. Please allow location permissions.");
                    setIsCapturing(false);
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
            setIsCapturing(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!location.lat) return alert('Please select a location on the map or use the Geography Camera');

        try {
            await api.post('/disasters', {
                title,
                description,
                disasterType,
                severity,
                imageUrl: imageUrl || 'https://images.unsplash.com/photo-1547683905-f30e1e15e566?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                latitude: location.lat,
                longitude: location.lng
            });
            setShowForm(false);
            fetchDisasters();
            // Reset form
            setTitle(''); setDescription(''); setPreviewImage(null); setLocation({ lat: null, lng: null });
        } catch (error) {
            console.error("Error creating disaster report", error);
            alert('Failed to submit report');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <Activity className="h-8 w-8 mr-3 text-red-600" />
                        Disaster Updates
                    </h1>
                    <p className="mt-2 text-gray-600">Real-time reports of ongoing natural disasters.</p>
                </div>

                {user ? (
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors"
                    >
                        {showForm ? 'Cancel Report' : 'Report Disaster'}
                    </button>
                ) : (
                    <p className="text-sm text-gray-500 italic">Log in to report a disaster</p>
                )}
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-red-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2 flex items-center justify-between">
                        Submit Disaster Report
                        <button
                            type="button"
                            onClick={handleCaptureStart}
                            className={`flex items-center text-sm px-4 py-2 rounded-md font-medium text-white transition-colors ${isCapturing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            <Camera className="w-4 h-4 mr-2" />
                            {isCapturing ? 'Getting Location...' : 'Geography Camera'}
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handlePhotoCaptured}
                        />
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {previewImage && (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Captured Evidence</label>
                                        <div className="relative h-48 rounded-md overflow-hidden border border-gray-300">
                                            <img src={previewImage} alt="Captured preview" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2 border" placeholder="E.g., Severe Flooding in Downtown" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                        <select value={disasterType} onChange={(e) => setDisasterType(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2 border">
                                            <option>Flood</option>
                                            <option>Earthquake</option>
                                            <option>Wildfire</option>
                                            <option>Cyclone</option>
                                            <option>Landslide</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                                        <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2 border">
                                            <option value="Critical">Critical</option>
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 mt-2 flex justify-between">
                                        Optional Image Link
                                        <span className="text-xs text-gray-400 font-normal">Use if not capturing photo</span>
                                    </label>
                                    <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2 border" placeholder="https://example.com/image.jpg" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (Stamps)</label>
                                    <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 px-3 py-2 border" placeholder="Describe the situation..."></textarea>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                                <p className="text-xs text-gray-500 mb-2">Click on the map to pin the exact location, or use Geography Camera.</p>
                                <MapPicker location={location} setLocation={setLocation} />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium shadow-sm transition-colors">
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {disasters.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Activity className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No active disasters</h3>
                    <p className="mt-1 text-sm text-gray-500">No disaster reports have been filed yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {disasters.map((disaster) => (
                        <div key={disaster.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-48">
                                <img src={disaster.imageUrl} alt={disaster.title} className="w-full h-full object-cover" />
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white ${disaster.severity === 'Critical' ? 'bg-red-600' :
                                    disaster.severity === 'High' ? 'bg-orange-500' :
                                        disaster.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}>
                                    {disaster.severity}
                                </div>
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                                    {disaster.disasterType}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{disaster.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4 h-[60px] whitespace-pre-wrap">{disaster.description}</p>

                                <div className="flex items-center text-sm text-gray-500 mb-2">
                                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-red-500" />
                                    <span className="truncate">{disaster.latitude?.toFixed(4)}, {disaster.longitude?.toFixed(4)}</span>
                                </div>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center text-xs text-gray-400">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {new Date(disaster.createdAt).toLocaleDateString()}
                                    </div>
                                    <a
                                        href={`https://www.google.com/maps?q=${disaster.latitude},${disaster.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                                    >
                                        View Map <AlertTriangle className="h-4 w-4 ml-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Disasters;
