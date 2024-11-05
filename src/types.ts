export type Source = 'WhatsApp' | 'Phone' | 'Broker' | 'Relative';
export type Status = 'Pending' | 'Accepted' | 'Rejected' | 'On Hold';

export type Nakshatra = 
  'Ashwini' | 'Bharani' | 'Krittika' | 'Rohini' | 'Mrigashira' | 'Ardra' | 'Punarvasu' | 'Pushya' | 'Ashlesha' |
  'Magha' | 'Purva Phalguni' | 'Uttara Phalguni' | 'Hasta' | 'Chitra' | 'Swati' | 'Vishakha' | 'Anuradha' | 'Jyeshtha' |
  'Moola' | 'Purva Ashadha' | 'Uttara Ashadha' | 'Shravana' | 'Dhanishta' | 'Shatabhisha' | 'Purva Bhadrapada' | 'Uttara Bhadrapada' | 'Revati';

export type Rashi = 
  'Mesha' | 'Vrishabha' | 'Mithuna' | 'Kataka' | 'Simha' | 'Kanya' | 'Thula' | 'Vrischika' | 'Dhanush' | 'Makara' | 'Kumbha' | 'Meena';

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
  comments?: string;
  sourceContactName?: string;
  sourceContactNumber?: string;
  nakshatra?: Nakshatra;
  rashi?: Rashi;
  income?: string;
  siblings?: string;
  familyName?: string;
  kundliChart?: string;
  dobWithTime?: string;
}