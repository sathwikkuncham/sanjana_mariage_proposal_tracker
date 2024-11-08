import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, Plus, Filter, ArrowUpDown, Heart, Phone, MessageCircle, Users,
  Check, X, PauseCircle, Edit2, Download, Clock
} from 'lucide-react';
import ProposalForm from './components/ProposalForm';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import { Proposal, Status, Source } from './types';
import { initialProposals } from './data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const { isDark, setIsDark } = useTheme();
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
  const observer = useRef<IntersectionObserver | null>(null);
  const [expandedProposalId, setExpandedProposalId] = useState<string | null>(null);

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
  const currentProposals = filteredAndSortedProposals.slice(0, indexOfLastProposal);

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
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Accepted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const handleSort = (key: keyof Proposal) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const lastProposalElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  const exportProposalAsCard = (proposal: Proposal) => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.setTextColor(40);
    pdf.text(`Proposal Details`, 10, 10);
    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text(`Name: ${proposal.name}`, 10, 20);
    pdf.text(`Email: ${proposal.email}`, 10, 30);
    pdf.text(`Age: ${proposal.age}`, 10, 40);
    pdf.text(`Occupation: ${proposal.occupation}`, 10, 50);
    pdf.text(`Location: ${proposal.location}`, 10, 60);
    pdf.text(`Source: ${proposal.source}`, 10, 70);
    pdf.text(`Status: ${proposal.status}`, 10, 80);
    pdf.text(`Notes: ${proposal.notes}`, 10, 90);
    pdf.text(`Expectations: ${proposal.expectations}`, 10, 100);
    pdf.text(`Family Background: ${proposal.familyBackground}`, 10, 110);
    pdf.text(`Education: ${proposal.education}`, 10, 120);
    pdf.text(`Contact Info: ${proposal.contactInfo}`, 10, 130);
    if (proposal.alternateContact) {
      pdf.text(`Alternate Contact: ${proposal.alternateContact}`, 10, 140);
    }
    if (proposal.sourceContactName) {
      pdf.text(`Source Contact Name: ${proposal.sourceContactName}`, 10, 150);
    }
    if (proposal.sourceContactNumber) {
      pdf.text(`Source Contact Number: ${proposal.sourceContactNumber}`, 10, 160);
    }
    pdf.text(`Parent Details:`, 10, 170);
    pdf.text(`  Father's Name: ${proposal.parentDetails.fatherName}`, 10, 180);
    pdf.text(`  Father's Occupation: ${proposal.parentDetails.fatherOccupation}`, 10, 190);
    pdf.text(`  Mother's Name: ${proposal.parentDetails.motherName}`, 10, 200);
    pdf.text(`  Mother's Occupation: ${proposal.parentDetails.motherOccupation}`, 10, 210);
    if (proposal.brokerDetails) {
      pdf.text(`Broker Details:`, 10, 220);
      pdf.text(`  Name: ${proposal.brokerDetails.name}`, 10, 230);
      pdf.text(`  Contact Number: ${proposal.brokerDetails.contactNumber}`, 10, 240);
      if (proposal.brokerDetails.agency) {
        pdf.text(`  Agency: ${proposal.brokerDetails.agency}`, 10, 250);
      }
      if (proposal.brokerDetails.commission) {
        pdf.text(`  Commission: ${proposal.brokerDetails.commission}`, 10, 260);
      }
    }
    pdf.text(`Social Media:`, 10, 270);
    if (proposal.socialMedia?.linkedin) {
      pdf.text(`  LinkedIn: ${proposal.socialMedia.linkedin}`, 10, 280);
    }
    if (proposal.socialMedia?.instagram) {
      pdf.text(`  Instagram: ${proposal.socialMedia.instagram}`, 10, 290);
    }
    if (proposal.socialMedia?.facebook) {
      pdf.text(`  Facebook: ${proposal.socialMedia.facebook}`, 10, 300);
    }
    pdf.text(`Documents:`, 10, 310);
    proposal.documents.forEach((doc, index) => {
      pdf.text(`  ${doc.type}: ${doc.name} (${doc.url})`, 10, 320 + index * 10);
    });
    if (proposal.comments) {
      pdf.text(`Comments: ${proposal.comments}`, 10, 330 + proposal.documents.length * 10);
    }
    pdf.save(`${proposal.name}_proposal.pdf`);
  };

  const exportAllProposalsAsPDF = () => {
    const pdf = new jsPDF();
    filteredAndSortedProposals.forEach((proposal, index) => {
      if (index > 0) pdf.addPage();
      pdf.setFontSize(16);
      pdf.setTextColor(40);
      pdf.text(`Proposal Details`, 10, 10);
      pdf.setFontSize(12);
      pdf.setTextColor(0);
      pdf.text(`Name: ${proposal.name}`, 10, 20);
      pdf.text(`Email: ${proposal.email}`, 10, 30);
      pdf.text(`Age: ${proposal.age}`, 10, 40);
      pdf.text(`Occupation: ${proposal.occupation}`, 10, 50);
      pdf.text(`Location: ${proposal.location}`, 10, 60);
      pdf.text(`Source: ${proposal.source}`, 10, 70);
      pdf.text(`Status: ${proposal.status}`, 10, 80);
      pdf.text(`Notes: ${proposal.notes}`, 10, 90);
      pdf.text(`Expectations: ${proposal.expectations}`, 10, 100);
      pdf.text(`Family Background: ${proposal.familyBackground}`, 10, 110);
      pdf.text(`Education: ${proposal.education}`, 10, 120);
      pdf.text(`Contact Info: ${proposal.contactInfo}`, 10, 130);
      if (proposal.alternateContact) {
        pdf.text(`Alternate Contact: ${proposal.alternateContact}`, 10, 140);
      }
      if (proposal.sourceContactName) {
        pdf.text(`Source Contact Name: ${proposal.sourceContactName}`, 10, 150);
      }
      if (proposal.sourceContactNumber) {
        pdf.text(`Source Contact Number: ${proposal.sourceContactNumber}`, 10, 160);
      }
      pdf.text(`Parent Details:`, 10, 170);
      pdf.text(`  Father's Name: ${proposal.parentDetails.fatherName}`, 10, 180);
      pdf.text(`  Father's Occupation: ${proposal.parentDetails.fatherOccupation}`, 10, 190);
      pdf.text(`  Mother's Name: ${proposal.parentDetails.motherName}`, 10, 200);
      pdf.text(`  Mother's Occupation: ${proposal.parentDetails.motherOccupation}`, 10, 210);
      if (proposal.brokerDetails) {
        pdf.text(`Broker Details:`, 10, 220);
        pdf.text(`  Name: ${proposal.brokerDetails.name}`, 10, 230);
        pdf.text(`  Contact Number: ${proposal.brokerDetails.contactNumber}`, 10, 240);
        if (proposal.brokerDetails.agency) {
          pdf.text(`  Agency: ${proposal.brokerDetails.agency}`, 10, 250);
        }
        if (proposal.brokerDetails.commission) {
          pdf.text(`  Commission: ${proposal.brokerDetails.commission}`, 10, 260);
        }
      }
      pdf.text(`Social Media:`, 10, 270);
      if (proposal.socialMedia?.linkedin) {
        pdf.text(`  LinkedIn: ${proposal.socialMedia.linkedin}`, 10, 280);
      }
      if (proposal.socialMedia?.instagram) {
        pdf.text(`  Instagram: ${proposal.socialMedia.instagram}`, 10, 290);
      }
      if (proposal.socialMedia?.facebook) {
        pdf.text(`  Facebook: ${proposal.socialMedia.facebook}`, 10, 300);
      }
      pdf.text(`Documents:`, 10, 310);
      proposal.documents.forEach((doc, docIndex) => {
        pdf.text(`  ${doc.type}: ${doc.name} (${doc.url})`, 10, 320 + docIndex * 10);
      });
      if (proposal.comments) {
        pdf.text(`Comments: ${proposal.comments}`, 10, 330 + proposal.documents.length * 10);
      }
    });
    pdf.save('proposals.pdf');
  };

  const toggleExpandProposal = (id: string) => {
    setExpandedProposalId(expandedProposalId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center justify-between w-full md:w-auto">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Sanjana Marriage Proposal Tracker
                </h1>
                <div className="md:hidden">
                  <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="hidden md:block">
                  <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Proposal
                </button>
                <button
                  onClick={exportAllProposalsAsPDF}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export All as PDF
                </button>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="mt-4 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search proposals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${
                    showFilters 
                      ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-200' 
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Status</label>
                      <div className="space-y-2">
                        {(['Accepted', 'Rejected', 'On Hold', 'In Progress'] as Status[]).map((status) => (
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
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{status}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Source</label>
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
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{source}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Age Range</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.minAge}
                          onChange={(e) => setFilters(prev => ({ ...prev, minAge: e.target.value }))}
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <span className="text-gray-500 dark:text-gray-400">to</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.maxAge}
                          onChange={(e) => setFilters(prev => ({ ...prev, maxAge: e.target.value }))}
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {currentProposals.map((proposal, index) => (
              <div
                key={proposal.id}
                id={`proposal-card-${proposal.id}`}
                ref={index === currentProposals.length - 1 ? lastProposalElementRef : null}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                onClick={() => toggleExpandProposal(proposal.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-medium">
                      {proposal.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{proposal.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-bold">Nakshatra:</span> {proposal.nakshatra}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-bold">Rashi:</span> {proposal.rashi}
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {getSourceIcon(proposal.source)}
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">{proposal.source}</span>
                </div>
                <div className="mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                    {proposal.status}
                  </span>
                </div>
                <div className="text-sm text-gray-900 dark:text-white mb-2">
                  <span className="font-bold">Date of Birth:</span> {proposal.dobWithTime}
                </div>
                <div className="text-sm text-gray-900 dark:text-white mb-2">
                  <span className="font-bold">Age:</span> {proposal.age}
                </div>
                <div className="text-sm text-gray-900 dark:text-white mb-2">
                  <span className="font-bold">Occupation:</span> {proposal.occupation}
                </div>
                <div className="text-sm text-gray-900 dark:text-white mb-2">
                  <span className="font-bold">Location:</span> {proposal.location}
                </div>
                {expandedProposalId === proposal.id && (
                  <>
                    <div className="text-sm text-gray-900 dark:text-white mb-2">
                      <span className="font-bold">Income:</span> {proposal.income}
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white mb-2">
                      <span className="font-bold">Siblings:</span> {proposal.siblings}
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white mb-2">
                      <span className="font-bold">Source Contact:</span> {proposal.sourceContactName} ({proposal.sourceContactNumber})
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white mb-2">
                      <span className="font-bold">Comments:</span> {proposal.comments}
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(proposal.id, 'Accepted');
                        }}
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                        title="Accept"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(proposal.id, 'Rejected');
                        }}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        title="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(proposal.id, 'On Hold');
                        }}
                        className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300"
                        title="Put On Hold"
                      >
                        <PauseCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(proposal.id, 'In Progress');
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        title="In Progress"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingProposal(proposal);
                          setShowForm(true);
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportProposalAsCard(proposal);
                        }}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                        title="Export as PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
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