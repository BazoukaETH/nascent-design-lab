export interface IncomeEntry {
  date: string;
  client: string;
  venture: string;
  service: string;
  amount: number;
  status: string;
}

export interface ExpenseEntry {
  date: string;
  cat: string;
  venture: string;
  desc: string;
  vendor: string;
  amount: number;
  bassel: string;
}

export const INCOME_DATA: IncomeEntry[] = [
  { date: "2025-09-01", client: "SMG Automotive", venture: "Wasla Solutions", service: "Framer Website", amount: 300000, status: "Paid" },
  { date: "2025-10-01", client: "PICO Engineering", venture: "Wasla Solutions", service: "Framer Website", amount: 200000, status: "50% Paid" },
  { date: "2025-10-15", client: "Sports Alliance", venture: "Wasla Solutions", service: "Framer Website", amount: 25000, status: "Pending" },
  { date: "2025-11-01", client: "ECMF", venture: "Wasla Solutions", service: "Subscriptions", amount: 120000, status: "Paid" },
  { date: "2025-11-25", client: "Ekhdem", venture: "Wasla Solutions", service: "App Development", amount: 150000, status: "Paid" },
  { date: "2026-01-15", client: "Hiba Abdo", venture: "Wasla Solutions", service: "Web Development", amount: 90000, status: "Pending" },
  { date: "2026-01-26", client: "ECMF", venture: "Wasla Solutions", service: "Subscriptions", amount: 145000, status: "Paid" },
  { date: "2026-02-10", client: "MW Fashion", venture: "Wasla Solutions", service: "Web Development", amount: 75000, status: "Pending" },
  { date: "2026-02-14", client: "Test Client", venture: "Wasla Education", service: "Course", amount: 20000, status: "Paid" },
];

export const EXPENSE_DATA: ExpenseEntry[] = [
  { date: "2025-07-30", cat: "Salaries", venture: "Wasla Solutions", desc: "July Salary", vendor: "Usef Shazly", amount: 60000, bassel: "Yes" },
  { date: "2025-08-30", cat: "Salaries", venture: "Wasla Solutions", desc: "August Salary", vendor: "Usef Shazly", amount: 60000, bassel: "Yes" },
  { date: "2025-09-30", cat: "Salaries", venture: "Wasla Solutions", desc: "September Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2025-09-30", cat: "Salaries", venture: "Wasla Solutions", desc: "September Salary", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2025-09-30", cat: "Salaries", venture: "Wasla Solutions", desc: "September Salary", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2025-10-30", cat: "Salaries", venture: "Wasla Solutions", desc: "October Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2025-10-30", cat: "Salaries", venture: "Wasla Solutions", desc: "October Salary", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2025-10-30", cat: "Salaries", venture: "Wasla Solutions", desc: "October Salary", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2025-10-30", cat: "Freelancers", venture: "Wasla Solutions", desc: "Website Translation", vendor: "Merna Wagih", amount: 8000, bassel: "Yes" },
  { date: "2025-11-30", cat: "Salaries", venture: "Wasla Solutions", desc: "November Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2025-11-30", cat: "Salaries", venture: "Wasla Solutions", desc: "November Salary", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2025-11-30", cat: "Salaries", venture: "Wasla Solutions", desc: "November Salary", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2025-11-30", cat: "Hardware", venture: "Wasla Solutions", desc: "MacBook Air M1", vendor: "Tradeline", amount: 30000, bassel: "Yes" },
  { date: "2025-12-30", cat: "Salaries", venture: "Wasla Solutions", desc: "December Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2025-12-30", cat: "Salaries", venture: "Wasla Solutions", desc: "December Salary", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2025-12-30", cat: "Salaries", venture: "Wasla Solutions", desc: "December Salary", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2025-12-30", cat: "Freelancers", venture: "Wasla Solutions", desc: "Website Assistance", vendor: "Mohamed Yazan", amount: 10000, bassel: "Yes" },
  { date: "2026-01-10", cat: "Subscriptions", venture: "Wasla Solutions", desc: "Figma Fees", vendor: "Moaz Sawy", amount: 6000, bassel: "Yes" },
  { date: "2026-01-27", cat: "Salaries", venture: "Wasla Solutions", desc: "January Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2026-01-27", cat: "Salaries", venture: "Wasla Solutions", desc: "January Fees", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2026-01-27", cat: "Salaries", venture: "Wasla Solutions", desc: "January Fees", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2026-01-28", cat: "Fees", venture: "Wasla Ventures", desc: "Legal Accountant Fees", vendor: "Wael Khalil", amount: 22000, bassel: "Yes" },
  { date: "2026-02-03", cat: "Subscriptions", venture: "Wasla Solutions", desc: "ECMF Emails Dec/Jan", vendor: "Google Domains", amount: 30000, bassel: "Yes" },
  { date: "2026-02-08", cat: "Subscriptions", venture: "Wasla Solutions", desc: "Figma / Framer", vendor: "Moaz Sawy", amount: 6850, bassel: "Yes" },
  { date: "2026-02-10", cat: "Subscriptions", venture: "Wasla Ventures", desc: "Wasla Ventures Domain", vendor: "Moaz Sawy", amount: 1000, bassel: "No" },
];

export const LOANS_TO_WASLA = 218850;

export interface SalaryEntry {
  name: string;
  role: string;
  dept: string;
  monthlySalary: number;
  equity: string;
  venture: string;
  initials: string;
  color: string;
}

export const SALARY_DATA_SEED: SalaryEntry[] = [
  { name: "Bassel El Aroussy", role: "Principal", dept: "Leadership", monthlySalary: 0, equity: "55% (WV)", venture: "Wasla Ventures", initials: "BA", color: "hsl(220,95%,47%)" },
  { name: "Usef El Shazly", role: "Digital Lead", dept: "Product & Design", monthlySalary: 60000, equity: "10% (WV) / 35% (Edu)", venture: "Wasla Solutions", initials: "UE", color: "hsl(168,100%,42%)" },
  { name: "Hussein Shahbender", role: "Marketing Lead", dept: "Growth", monthlySalary: 0, equity: "15% (WV)", venture: "Wasla Ventures", initials: "HS", color: "hsl(250,60%,60%)" },
  { name: "Moaz El Sawy", role: "Development Lead", dept: "Engineering", monthlySalary: 30000, equity: "2% (WV) / 2.5% (Sol+Edu)", venture: "Wasla Solutions", initials: "ME", color: "hsl(160,80%,40%)" },
  { name: "Ali El Amir", role: "Creative Lead", dept: "Design", monthlySalary: 0, equity: "2% (WV)", venture: "Wasla Ventures", initials: "AE", color: "hsl(36,90%,53%)" },
  { name: "Mohab Metwali", role: "Engineering & AI Lead", dept: "Engineering", monthlySalary: 0, equity: "1% (direct)", venture: "Wasla Labs", initials: "MM", color: "hsl(330,80%,60%)" },
  { name: "Mohamed Hagry", role: "Product Designer", dept: "Design", monthlySalary: 20000, equity: "—", venture: "Wasla Solutions", initials: "MH", color: "hsl(174,72%,46%)" },
  { name: "Saif Nosair", role: "Visual & Motion Designer", dept: "Design", monthlySalary: 0, equity: "—", venture: "Wasla Solutions", initials: "SN", color: "hsl(24,94%,53%)" },
];

export const CLIENT_PIPELINE = [
  { stage: "Lead", deals: 2, value: 800000, color: "hsl(220,15%,38%)" },
  { stage: "Discovery", deals: 1, value: 400000, color: "hsl(220,95%,47%)" },
  { stage: "Proposal", deals: 2, value: 2180000, color: "hsl(36,90%,53%)" },
  { stage: "Won", deals: 3, value: 660000, color: "hsl(160,80%,40%)" },
];

export const TEAM_DATA = [
  { name: "Bassel El Aroussy", role: "Principal", dept: "Leadership", initials: "BA", color: "hsl(220,95%,47%)" },
  { name: "Usef El Shazly", role: "Digital Lead", dept: "Product & Design", initials: "UE", color: "hsl(168,100%,42%)" },
  { name: "Hussein Shahbender", role: "Marketing Lead", dept: "Growth", initials: "HS", color: "hsl(250,60%,60%)" },
  { name: "Moaz El Sawy", role: "Development Lead", dept: "Engineering", initials: "ME", color: "hsl(160,80%,40%)" },
  { name: "Ali El Amir", role: "Creative Lead", dept: "Design", initials: "AE", color: "hsl(36,90%,53%)" },
  { name: "Mohab Metwali", role: "Engineering & AI Lead", dept: "Engineering", initials: "MM", color: "hsl(330,80%,60%)" },
  { name: "Mohamed Hagry", role: "Product Designer", dept: "Design", initials: "MH", color: "hsl(174,72%,46%)" },
  { name: "Saif Nosair", role: "Visual & Motion Designer", dept: "Design", initials: "SN", color: "hsl(24,94%,53%)" },
];

export const fmtCurrency = (n: number) => {
  if (!n) return "0";
  const a = Math.abs(n);
  if (a >= 1000000) return (n / 1000000).toFixed(2) + "M";
  if (a >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
};
