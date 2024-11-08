import React from 'react';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { SocialMedia } from '../types';

interface SocialMediaLinksProps {
  socialMedia: SocialMedia;
  onChange: (values: SocialMedia) => void;
}

const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({ socialMedia, onChange }) => {
  const handleChange = (platform: keyof SocialMedia) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...socialMedia, [platform]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Linkedin className="w-5 h-5 text-blue-600" />
        <input
          type="url"
          placeholder="LinkedIn Profile URL"
          value={socialMedia.linkedin || ''}
          onChange={handleChange('linkedin')}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Instagram className="w-5 h-5 text-pink-600" />
        <input
          type="url"
          placeholder="Instagram Profile URL"
          value={socialMedia.instagram || ''}
          onChange={handleChange('instagram')}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Facebook className="w-5 h-5 text-blue-600" />
        <input
          type="url"
          placeholder="Facebook Profile URL"
          value={socialMedia.facebook || ''}
          onChange={handleChange('facebook')}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default SocialMediaLinks;