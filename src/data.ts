import { Proposal } from './types';

export const initialProposals: Proposal[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    age: '28',
    occupation: 'Software Engineer',
    location: 'San Francisco',
    source: 'WhatsApp',
    status: 'Pending',
    notes: 'Interested in someone with similar professional background',
    expectations: 'Looking for a well-educated partner with strong family values',
    familyBackground: 'Parents are both doctors, one younger sister',
    education: 'Masters in Computer Science from Stanford',
    contactInfo: '+1 (555) 123-4567',
    alternateContact: '+1 (555) 123-4568',
    parentDetails: {
      fatherName: 'Robert Johnson',
      fatherOccupation: 'Cardiologist',
      motherName: 'Emily Johnson',
      motherOccupation: 'Pediatrician'
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarah-johnson',
      instagram: 'https://instagram.com/sarahj'
    },
    documents: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
        name: 'Profile Photo'
      },
      {
        type: 'biodata',
        url: 'https://example.com/biodata.pdf',
        name: 'Detailed Biodata'
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    age: '32',
    occupation: 'Investment Banker',
    location: 'New York',
    source: 'Broker',
    status: 'On Hold',
    notes: 'Very busy schedule, prefers weekend meetings',
    expectations: 'Seeking someone who understands work-life balance in finance',
    familyBackground: 'Business family background, eldest of three siblings',
    education: 'MBA from Columbia Business School',
    contactInfo: '+1 (555) 987-6543',
    alternateContact: '+1 (555) 987-6544',
    brokerDetails: {
      name: 'John Smith',
      contactNumber: '+1 (555) 999-8888',
      agency: 'Elite Matchmaking',
      commission: '2%'
    },
    parentDetails: {
      fatherName: 'David Chen',
      fatherOccupation: 'Business Owner',
      motherName: 'Lisa Chen',
      motherOccupation: 'Real Estate Agent'
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/in/michael-chen',
      instagram: 'https://instagram.com/michaelc'
    },
    documents: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        name: 'Profile Photo'
      }
    ]
  },
  {
    id: '3',
    name: 'Priya Patel',
    email: 'priya.p@example.com',
    age: '27',
    occupation: 'Medical Resident',
    location: 'Chicago',
    source: 'Relative',
    status: 'Pending',
    notes: 'Traditional family values, modern outlook',
    expectations: 'Looking for someone understanding of medical career demands',
    familyBackground: 'Father is a businessman, mother is a teacher',
    education: 'MD from Northwestern University',
    contactInfo: '+1 (555) 246-8135',
    parentDetails: {
      fatherName: 'Raj Patel',
      fatherOccupation: 'Business Owner',
      motherName: 'Meera Patel',
      motherOccupation: 'High School Teacher'
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/in/priya-patel',
      instagram: 'https://instagram.com/priyap'
    },
    documents: [
      {
        type: 'photo',
        url: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=800&q=80',
        name: 'Profile Photo'
      }
    ]
  }
];