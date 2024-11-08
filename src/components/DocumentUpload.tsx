import React from 'react';
import { Upload, X } from 'lucide-react';
import { Document } from '../types';

interface DocumentUploadProps {
  documents: Document[];
  onDocumentsChange: (docs: Document[]) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ documents, onDocumentsChange }) => {
  const handleFileUpload = (type: Document['type']) => {
    // In a real app, this would handle file upload to a server
    // For demo, we'll simulate with URLs
    const mockUrls = {
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
      biodata: 'https://example.com/sample-biodata.pdf',
      other: 'https://example.com/sample-document.pdf'
    };

    const newDoc: Document = {
      type,
      url: mockUrls[type],
      name: `Sample ${type} ${documents.length + 1}`
    };

    onDocumentsChange([...documents, newDoc]);
  };

  const removeDocument = (index: number) => {
    const newDocs = [...documents];
    newDocs.splice(index, 1);
    onDocumentsChange(newDocs);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleFileUpload('photo')}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add Photo
        </button>
        <button
          type="button"
          onClick={() => handleFileUpload('biodata')}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add Biodata
        </button>
        <button
          type="button"
          onClick={() => handleFileUpload('other')}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add Other Document
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-md">
            <div className="flex items-center">
              {doc.type === 'photo' && (
                <img src={doc.url} alt={doc.name} className="w-10 h-10 rounded-full object-cover mr-3" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500 capitalize">{doc.type}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeDocument(index)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUpload;