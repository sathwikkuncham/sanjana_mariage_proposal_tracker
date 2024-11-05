export type Source = 'WhatsApp' | 'Phone' | 'Broker' | 'Relative';
export type Status = 'Pending' | 'Accepted' | 'Rejected' | 'On Hold';

export interface SocialMedia {
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

export interface ParentDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
}

export interface BrokerDetails {
  name: string;
  contactNumber: string;
  agency?: string;
  commission?: string;
}

export interface Document {
  type: 'photo' | 'biodata' | 'other';
  url: string;
  name: string;
}

export interface Proposal {
  id: string;
  name: string;
  email: string;
  age: string;
  occupation: string;
  location: string;
  source: Source;
  status: Status;
  notes: string;
  expectations: string;
  familyBackground: string;
  education: string;
  contactInfo: string;
  alternateContact?: string;
  brokerDetails?: BrokerDetails;
  parentDetails: ParentDetails;
  socialMedia?: SocialMedia;
  documents: Document[];
}