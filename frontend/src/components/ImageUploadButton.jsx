import React, { useRef, useState } from 'react';
import { Camera, Upload } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = 'dyakbfume';
const CLOUDINARY_UPLOAD_PRESET = 'resilience_preset';

const ImageUploadButton = ({ onUpload, accentColor = 'blue' }) => {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const colorMap = {
        blue: 'bg-blue-600 hover:bg-blue-700',
        emerald: 'bg-emerald-600 hover:bg-emerald-700',
        amber: 'bg-amber-500 hover:bg-amber-600',
        purple: 'bg-purple-600 hover:bg-purple-700',
        rose: 'bg-rose-600 hover:bg-rose-700',
        red: 'bg-red-600 hover:bg-red-700',
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.secure_url) {
                onUpload(data.secure_url);
            } else {
                alert('Upload failed. Please try again.');
                setPreview(null);
            }
        } catch (err) {
            alert('Upload error. Please check your connection and try again.');
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const btnClass = colorMap[accentColor] || colorMap['blue'];

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo Upload
            </label>
            <div className="flex gap-3 flex-wrap">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className={`flex items-center text-sm px-4 py-2 rounded-md font-medium text-white transition-colors ${uploading ? 'bg-gray-400 cursor-not-allowed' : btnClass}`}
                >
                    <Camera className="w-4 h-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Take / Choose Photo'}
                </button>
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
            {preview && (
                <div className="mt-3">
                    <img src={preview} alt="Preview" className="h-36 w-full object-cover rounded-md border border-gray-300" />
                    {uploading && <p className="text-xs text-gray-500 mt-1 animate-pulse">Uploading to cloud...</p>}
                    {!uploading && <p className="text-xs text-green-600 mt-1 flex items-center"><Upload className="w-3 h-3 mr-1" /> Photo uploaded successfully!</p>}
                </div>
            )}
        </div>
    );
};

export default ImageUploadButton;
