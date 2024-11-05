import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Filter, ArrowUpDown, Heart, Phone, MessageCircle, Users,
  Check, X, PauseCircle, Edit2, ChevronLeft, ChevronRight
} from 'lucide-react';
import ProposalForm from './components/ProposalForm';
import { Proposal, Status, Source } from './types';
import { initialProposals } from './data';

function App() {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as Status[],
    source: [] as Source[],
    minAge: '',
    maxAge: '',
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Proposal;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const proposalsPerPage = 5;

  const filterProposals = (proposals: Proposal[]) => {
    return proposals.filter(proposal => {
      const matchesSearch = 
        proposal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.occupation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filters.status.length === 0 || filters.status.includes(proposal.status);
      const matchesSource = filters.source.length === 0 || filters.source.includes(proposal.source);
      const matchesAge = (
        (!filters.minAge || parseInt(proposal.age) >= parseInt(filters.minAge)) &&
        (!filters.maxAge || parseInt(proposal.age) <= parseInt(filters.maxAge))
      );

      return matchesSearch && matchesStatus && matchesSource && matchesAge;
    });
  };

  const sortProposals = (proposals: Proposal[]) => {
    if (!sortConfig) return proposals;

    return [...proposals].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (sortConfig && a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const filteredAndSortedProposals = sortProposals(filterProposals(proposals));

  const indexOfLastProposal = currentPage * proposalsPerPage;
  const indexOfFirstProposal = indexOfLastProposal - proposalsPerPage;
  const currentProposals = filteredAndSortedProposals.slice(indexOfFirstProposal, indexOfLastProposal);

  const totalPages = Math.ceil(filteredAndSortedProposals.length / proposalsPerPage);

  const handleStatusChange = (id: string, status: Status) => {
    setProposals(proposals.map(p => 
      p.id === id ? { ...p, status } : p
    ));
  };

  const addProposal = (proposal: Proposal) => {
    setProposals([...proposals, proposal]);
    setShowForm(false);
  };

  const updateProposal = (updatedProposal: Proposal) => {
    setProposals(proposals.map(p => 
      p.id === updatedProposal.id ? updatedProposal : p
    ));
    setEditingProposal(null);
    setShowForm(false);
  };

  const getSourceIcon = (source: Source) => {
    switch (source) {
      case 'WhatsApp': return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'Phone': return <Phone className="w-4 h-4 text-blue-500" />;
      case 'Broker': return <Users className="w-4 h-4 text-purple-500" />;
      default: return <Heart className="w-4 h-4 text-pink-500" />;
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (key: keyof Proposal) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Sanjana Marriage Proposal Tracker</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Proposal
                </button>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="mt-4 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search proposals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                    showFilters ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="p-4 bg-gray-50 rounded-md space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="space-y-2">
                        {(['Pending', 'Accepted', 'Rejected', 'On Hold'] as Status[]).map((status) => (
                          <label key={status} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.status.includes(status)}
                              onChange={(e) => {
                                setFilters(prev => ({
                                  ...prev,
                                  status: e.target.checked
                                    ? [...prev.status, status]
                                    : prev.status.filter(s => s !== status)
                                }));
                              }}
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                      <div className="space-y-2">
                        {(['WhatsApp', 'Phone', 'Broker', 'Relative'] as Source[]).map((source) => (
                          <label key={source} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={filters.source.includes(source)}
                              onChange={(e) => {
                                setFilters(prev => ({
                                  ...prev,
                                  source: e.target.checked
                                    ? [...prev.source, source]
                                    : prev.source.filter(s => s !== source)
                                }));
                              }}
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">{source}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minAge}
                          onChange={(e) => setFilters(prev => ({ ...prev, minAge: e.target.value }))}
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxAge}
                          onChange={(e) => setFilters(prev => ({ ...prev, maxAge: e.target.value }))}
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    { key: 'name', label: 'Name' },
                    { key: 'source', label: 'Source' },
                    { key: 'status', label: 'Status' },
                    { key: 'age', label: 'Age' },
                    { key: 'occupation', label: 'Occupation' },
                    { key: 'location', label: 'Location' },
                    { key: 'comments', label: 'Comments' } // Add Comments column
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort(key as keyof Proposal)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{label}</span>
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-medium">
                            {proposal.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{proposal.name}</div>
                          <div className="text-sm text-gray-500">{proposal.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getSourceIcon(proposal.source)}
                        <span className="ml-2 text-sm text-gray-900">{proposal.source}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposal.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposal.occupation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposal.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{proposal.comments}</td> {/* Add Comments data */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleStatusChange(proposal.id, 'Accepted')}
                          className="text-green-600 hover:text-green-900"
                          title="Accept"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(proposal.id, 'Rejected')}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleStatusChange(proposal.id, 'On Hold')}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Put On Hold"
                        >
                          <PauseCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProposal(proposal);
                            setShowForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Proposal Modal */}
      {showForm && (
        <ProposalForm
          onClose={() => {
            setShowForm(false);
            setEditingProposal(null);
          }}
          onSubmit={editingProposal ? updateProposal : addProposal}
          proposal={editingProposal}
        />
      )}
    </div>
  );
}

export default App;