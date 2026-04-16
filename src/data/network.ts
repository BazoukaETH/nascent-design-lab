export interface Investor {
  name: string;
  type: string;
  entity: string;
  equity: string;
  capitalCommitted: string;
  capitalPaid: string;
  equityType: string;
  vesting: string;
  status: string;
  email: string;
  phone: string;
  specialty: string;
  notes: string;
}

export interface CapTableEntry {
  shareholder: string;
  ownership: string;
  type: string;
  capitalPaid: string;
  notes: string;
}

export interface AdvisorBoard {
  name: string;
  role: string;
  entity: string;
  terms: string;
  email: string;
  phone: string;
  specialty: string;
  notes: string;
}

export interface Partner {
  name: string;
  type: string;
  relationship: string;
  contact: string;
  email: string;
  phone: string;
  notes: string;
}

export const INVESTOR_SEED: Investor[] = [
  { name: "Bassel El Aroussy", type: "Founder", entity: "Wasla Ventures", equity: "55%", capitalCommitted: "1,000,000 EGP", capitalPaid: "1,000,000 EGP", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "Managing Principal. Strategy, business development, capital markets.", notes: "" },
  { name: "Hussein Shahbender", type: "Co-founder", entity: "Wasla Ventures", equity: "15%", capitalCommitted: "500,000 EGP", capitalPaid: "500,000 EGP", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "Marketing, branding, consumer ventures.", notes: "" },
  { name: "Usef El Shazly", type: "Co-founder", entity: "Wasla Ventures", equity: "10%", capitalCommitted: "0", capitalPaid: "0", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "Design, digital strategy, product.", notes: "" },
  { name: "Moaz El Sawy", type: "Core Team", entity: "Wasla Ventures", equity: "2%", capitalCommitted: "0", capitalPaid: "0", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "Full-stack development, iOS, Android.", notes: "" },
  { name: "Ali El Amir", type: "Core Team", entity: "Wasla Ventures", equity: "2%", capitalCommitted: "0", capitalPaid: "0", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "Creative direction, graphic design, branding.", notes: "" },
  { name: "Mr. Yasser Hashem", type: "Advisory", entity: "Wasla Ventures", equity: "2%", capitalCommitted: "0", capitalPaid: "0", equityType: "Advisory Grant", vesting: "3-year legal services agreement", status: "Confirmed", email: "", phone: "", specialty: "Top tech lawyer in Egypt. Legal advisor and board member.", notes: "2% equity for 3 years of legal services from his firm." },
  { name: "Aly Gohar", type: "F&F Investor", entity: "Wasla Ventures", equity: "1%", capitalCommitted: "300,000 EGP", capitalPaid: "300,000 EGP", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "", notes: "" },
  { name: "Hassan Gohar", type: "F&F Investor", entity: "Wasla Ventures", equity: "1%", capitalCommitted: "300,000 EGP", capitalPaid: "300,000 EGP", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "", notes: "" },
  { name: "Kareem Hashem", type: "F&F Investor", entity: "Wasla Ventures", equity: "1%", capitalCommitted: "300,000 EGP", capitalPaid: "300,000 EGP", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "", notes: "" },
  { name: "Maurice Ghattas", type: "F&F Investor", entity: "Wasla Ventures", equity: "1%", capitalCommitted: "300,000 EGP", capitalPaid: "300,000 EGP", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "", notes: "" },
  { name: "Aly Serafy", type: "F&F Investor", entity: "Wasla Ventures", equity: "1%", capitalCommitted: "300,000 EGP", capitalPaid: "300,000 EGP", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "", notes: "" },
  { name: "Hassan Salama", type: "F&F Investor", entity: "Wasla Ventures", equity: "1%", capitalCommitted: "300,000 EGP", capitalPaid: "300,000 EGP", equityType: "Direct Equity", vesting: "N/A", status: "Confirmed", email: "", phone: "", specialty: "", notes: "" },
  { name: "Hemy", type: "F&F Investor", entity: "Wasla Ventures", equity: "0.5%", capitalCommitted: "150,000 EGP", capitalPaid: "0", equityType: "Direct Equity", vesting: "N/A", status: "Pending", email: "", phone: "", specialty: "", notes: "Allocation and commitment pending finalization." },
];

export const CAP_TABLE_SEED: Record<string, CapTableEntry[]> = {
  "Wasla Ventures": [
    { shareholder: "Bassel El Aroussy", ownership: "55%", type: "Founder", capitalPaid: "1,000,000 EGP", notes: "" },
    { shareholder: "Hussein Shahbender", ownership: "15%", type: "Co-founder", capitalPaid: "500,000 EGP", notes: "" },
    { shareholder: "Usef El Shazly", ownership: "10%", type: "Co-founder", capitalPaid: "0", notes: "" },
    { shareholder: "Moaz El Sawy", ownership: "2%", type: "Core Team", capitalPaid: "0", notes: "" },
    { shareholder: "Ali El Amir", ownership: "2%", type: "Core Team", capitalPaid: "0", notes: "" },
    { shareholder: "Mr. Yasser Hashem", ownership: "2%", type: "Advisory", capitalPaid: "0", notes: "3-year legal services" },
    { shareholder: "Aly Gohar", ownership: "1%", type: "F&F Investor", capitalPaid: "300,000 EGP", notes: "" },
    { shareholder: "Hassan Gohar", ownership: "1%", type: "F&F Investor", capitalPaid: "300,000 EGP", notes: "" },
    { shareholder: "Kareem Hashem", ownership: "1%", type: "F&F Investor", capitalPaid: "300,000 EGP", notes: "" },
    { shareholder: "Maurice Ghattas", ownership: "1%", type: "F&F Investor", capitalPaid: "300,000 EGP", notes: "" },
    { shareholder: "Aly Serafy", ownership: "1%", type: "F&F Investor", capitalPaid: "300,000 EGP", notes: "" },
    { shareholder: "Hassan Salama", ownership: "1%", type: "F&F Investor", capitalPaid: "300,000 EGP", notes: "" },
    { shareholder: "Hemy", ownership: "0.5%", type: "F&F Investor", capitalPaid: "0", notes: "Pending" },
    { shareholder: "Pending Team Allocation", ownership: "3.5%", type: "Reserved", capitalPaid: "0", notes: "" },
    { shareholder: "Reserve", ownership: "1.5%", type: "Reserved", capitalPaid: "0", notes: "" },
    { shareholder: "ESOP Pool", ownership: "2.5%", type: "Reserved", capitalPaid: "0", notes: "" },
  ],
  "Wasla Solutions": [
    { shareholder: "Wasla Ventures", ownership: "90%", type: "Parent", capitalPaid: "", notes: "" },
    { shareholder: "Moaz El Sawy", ownership: "2.5%", type: "Core Team", capitalPaid: "0", notes: "" },
    { shareholder: "Usef El Shazly", ownership: "2.5%", type: "Core Team", capitalPaid: "0", notes: "" },
    { shareholder: "ESOP Pool", ownership: "5%", type: "Reserved", capitalPaid: "0", notes: "" },
  ],
  "Wasla Education": [
    { shareholder: "Wasla Ventures", ownership: "60%", type: "Parent", capitalPaid: "", notes: "" },
    { shareholder: "Usef El Shazly", ownership: "35%", type: "Co-founder", capitalPaid: "0", notes: "" },
    { shareholder: "Moaz El Sawy", ownership: "2.5%", type: "Core Team", capitalPaid: "0", notes: "" },
    { shareholder: "ESOP Pool", ownership: "2.5%", type: "Reserved", capitalPaid: "0", notes: "" },
  ],
  "Wasla Tourism": [
    { shareholder: "Wasla Ventures", ownership: "97.5%", type: "Parent", capitalPaid: "", notes: "" },
    { shareholder: "ESOP Pool", ownership: "2.5%", type: "Reserved", capitalPaid: "0", notes: "" },
  ],
  "Wasla Bank": [
    { shareholder: "Wasla Ventures", ownership: "97.5%", type: "Parent", capitalPaid: "", notes: "" },
    { shareholder: "ESOP Pool", ownership: "2.5%", type: "Reserved", capitalPaid: "0", notes: "" },
  ],
  "Wasla Space": [
    { shareholder: "Wasla Ventures", ownership: "95%", type: "Parent", capitalPaid: "", notes: "" },
    { shareholder: "ESOP Pool", ownership: "5%", type: "Reserved", capitalPaid: "0", notes: "" },
  ],
  "Wasla Labs": [
    { shareholder: "Wasla Ventures", ownership: "95%", type: "Parent", capitalPaid: "", notes: "" },
    { shareholder: "ESOP Pool", ownership: "5%", type: "Reserved", capitalPaid: "0", notes: "" },
  ],
};

export const ADVISOR_BOARD_SEED: AdvisorBoard[] = [
  { name: "Mr. Yasser Hashem", role: "Legal Advisor & Board Member", entity: "Wasla Ventures", terms: "2% equity for 3 years of legal services", email: "", phone: "", specialty: "Top tech lawyer in Egypt", notes: "" },
  { name: "Board-level Tech Advisors", role: "Technical Board", entity: "Wasla Ventures", terms: "Two senior developers at board level", email: "", phone: "", specialty: "Strong external technical credibility", notes: "" },
  { name: "Strategic Business Board", role: "Business Board", entity: "Wasla Ventures", terms: "Three high-profile businessmen/investors", email: "", phone: "", specialty: "Strategic direction and network access", notes: "" },
];

export const PARTNER_SEED: Partner[] = [
  { name: "Paperwork Studio", type: "Sister Agency", relationship: "25% stake, creative collaboration", contact: "Ali El Amir", email: "", phone: "", notes: "Creative and branding agency. Close collaboration on all major projects." },
];
