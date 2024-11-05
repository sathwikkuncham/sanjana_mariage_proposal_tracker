import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Proposal, Source, Status, SocialMedia, ParentDetails, BrokerDetails } from '../types';
import DocumentUpload from './DocumentUpload';
import SocialMediaLinks from './SocialMediaLinks';

interface ProposalFormProps {
  onClose: () => void;
  onSubmit: (proposal: Proposal) => void;
  proposal?: Proposal | null;
}

const ProposalForm: React.FC<ProposalFormProps> = ({ onClose, onSubmit, proposal }) => {
  const [formData, setFormData] = useState<Partial<Proposal>>({
    name: '',
    email: '',
    age: '',
    occupation: '',
    location: '',
    source: 'WhatsApp',
    status: 'Pending',
    notes: '',
    expectations: '',
    familyBackground: '',
    education: '',
    contactInfo: '',
    alternateContact: '',
    parentDetails: {
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: ''
    },
    brokerDetails: {
      name: '',
      contactNumber: '',
      agency: '',
      commission: ''
    },
    socialMedia: {},
    documents: [],
    comments: '',
    sourceContactName: '',
    sourceContactNumber: '',
    nakshatra: '',
    rashi: '',
    income: '',
    siblings: '',
    familyName: '',
    kundliChart: '',
    dobWithTime: ''
  });

  useEffect(() => {
    if (proposal) {
      setFormData(proposal);
    }
  }, [proposal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: proposal?.id || Date.now().toString(),
      ...formData as Proposal
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      parentDetails: {
        ...prev.parentDetails as ParentDetails,
        [name]: value
      }
    }));
  };

  const handleBrokerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      brokerDetails: {
        ...prev.brokerDetails as BrokerDetails,
        [name]: value
      }
    }));
  };

  const handleSocialMediaChange = (values: SocialMedia) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: values
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto my-8">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {proposal ? 'Edit Proposal' : 'Add New Proposal'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Primary Contact</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Alternate Contact</label>
                  <input
                    type="text"
                    name="alternateContact"
                    value={formData.alternateContact}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Source Contact Name</label>
                  <input
                    type="text"
                    name="sourceContactName"
                    value={formData.sourceContactName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Source Contact Number</label>
                  <input
                    type="text"
                    name="sourceContactNumber"
                    value={formData.sourceContactNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nakshatra</label>
                  <input
                    type="text"
                    name="nakshatra"
                    value={formData.nakshatra}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rashi</label>
                  <input
                    type="text"
                    name="rashi"
                    value={formData.rashi}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Income</label>
                  <input
                    type="text"
                    name="income"
                    value={formData.income}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Siblings</label>
                  <input
                    type="text"
                    name="siblings"
                    value={formData.siblings}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Family Name</label>
                  <input
                    type="text"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kundli Chart URL</label>
                  <input
                    type="url"
                    name="kundliChart"
                    value={formData.kundliChart}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth with Time</label>
                  <input
                    type="datetime-local"
                    name="dobWithTime"
                    value={formData.dobWithTime}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Parent Details */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Parent Details</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.parentDetails?.fatherName}
                    onChange={handleParentDetailsChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
                  <input
                    type="text"
                    name="fatherOccupation"
                    value={formData.parentDetails?.fatherOccupation}
                    onChange={handleParentDetailsChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.parentDetails?.motherName}
                    onChange={handleParentDetailsChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
                  <input
                    type="text"
                    name="motherOccupation"
                    value={formData.parentDetails?.motherOccupation}
                    onChange={handleParentDetailsChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Broker Details */}
            {formData.source === 'Broker' && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Broker Details</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Broker Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.brokerDetails?.name}
                      onChange={handleBrokerDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Broker Contact</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.brokerDetails?.contactNumber}
                      onChange={handleBrokerDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Agency</label>
                    <input
                      type="text"
                      name="agency"
                      value={formData.brokerDetails?.agency}
                      onChange={handleBrokerDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Commission</label>
                    <input
                      type="text"
                      name="commission"
                      value={formData.brokerDetails?.commission}
                      onChange={handleBrokerDetailsChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Links */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Social Media Profiles</h4>
              <SocialMediaLinks
                socialMedia={formData.socialMedia || {}}
                onChange={handleSocialMediaChange}
              />
            </div>

            {/* Documents */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Documents & Photos</h4>
              <DocumentUpload
                documents={formData.documents || []}
                onDocumentsChange={(docs) => setFormData(prev => ({ ...prev, documents: docs }))}
              />
            </div>

            {/* Comments */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Comments</h4>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Additional Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Family Background</label>
                  <textarea
                    name="familyBackground"
                    value={formData.familyBackground}
                    onChange={handleChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Expectations</label>
                  <textarea
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleChange}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {proposal ? 'Update' : 'Add'} Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProposalForm;