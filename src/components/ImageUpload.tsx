import React, { useCallback, useState } from 'react';
import { Upload, X, Image } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageDataUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG or PNG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageUpload(result);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setPreview(null);
    onImageUpload('');
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
            dragActive
              ? 'border-green-500 bg-green-500/10'
              : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-300 font-medium mb-2">
            Drag and drop your photo here
          </p>
          <p className="text-gray-500 text-sm mb-4">or</p>
          <label className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-xl cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-base">
            <Upload className="w-4 h-4 mr-2" />
            Choose Photo
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileSelect}
            />
          </label>
          <p className="text-gray-500 text-sm mt-4">JPEG or PNG • Max 10MB</p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-56 object-cover rounded-xl border border-gray-700 shadow-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
            <button
              onClick={clearImage}
              className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-200 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;