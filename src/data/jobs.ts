export type WorkType = "Remote" | "On-site" | "Hybrid";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
export type JobStatus = "Draft" | "Active" | "Paused" | "Closed";
export type ApplicantStatus = "New" | "Reviewing" | "Interview" | "Offer" | "Hired" | "Rejected";
export type FitLevel = "Strong" | "Good" | "Weak" | "No";
export type ExperienceLevel = "Senior" | "Mid" | "Junior" | "Entry";
export type Recommendation = "Hire" | "Maybe" | "Pass";

export interface Job {
  id: string;
  title: string;
  department: string;
  venture: string;
  workType: WorkType;
  location: string;
  employmentType: EmploymentType;
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  salaryRange: string;
  status: JobStatus;
  isPublic: boolean;
  createdAt: string;
  createdBy: string;
  viewCount: number;
  shareLink: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  fit: FitLevel;
  experience: ExperienceLevel;
  recommendation: Recommendation;
  notes: string;
  createdAt: string;
}

export interface ActivityEntry {
  id: string;
  actorName: string;
  action: string;
  timestamp: string;
}

export interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  location: string;
  jobId: string;
  cvUrl: string;
  coverNote: string;
  status: ApplicantStatus;
  reviews: Review[];
  activity: ActivityEntry[];
  appliedAt: string;
  lastUpdatedAt: string;
  isRead: boolean;
}

export const JOBS_SEED: Job[] = [
  { id: "job-1", title: "Investment Analyst", department: "Strategy", venture: "Wasla Ventures", workType: "Remote", location: "Cairo, Egypt", employmentType: "Part-time", aboutRole: "Support the Wasla Ventures team in analyzing potential investments, conducting market research, and building financial models.", responsibilities: ["Conduct market and competitor research", "Build financial models and valuation analysis", "Support due diligence on potential investments", "Prepare investor-facing materials"], requirements: ["Bachelor's degree in Finance, Economics, or related field", "Strong Excel and financial modeling skills", "Excellent analytical thinking"], niceToHave: ["Prior experience at a VC or PE firm", "CFA candidate or holder"], salaryRange: "15K-25K EGP", status: "Active", isPublic: true, createdAt: "2026-03-15", createdBy: "Bassel El Aroussy", viewCount: 342, shareLink: "https://waslaventures.com/careers/investment-analyst" },
  { id: "job-2", title: "Web Designer", department: "Design", venture: "Wasla Solutions", workType: "On-site", location: "Sheikh Zayed, Giza", employmentType: "Full-time", aboutRole: "Design beautiful, functional web experiences for Wasla Solutions clients across multiple industries.", responsibilities: ["Design client websites in Figma and Framer", "Collaborate with developers on handoff", "Maintain brand consistency across projects"], requirements: ["2+ years of web design experience", "Expert in Figma", "Strong portfolio of shipped work"], niceToHave: ["Framer experience", "Motion design skills"], salaryRange: "25K-40K EGP", status: "Active", isPublic: true, createdAt: "2026-02-15", createdBy: "Usef El Shazly", viewCount: 187, shareLink: "https://waslaventures.com/careers/web-designer" },
  { id: "job-3", title: "Content Creator & Social Media Lead", department: "Marketing", venture: "Wasla Solutions", workType: "On-site", location: "Sheikh Zayed, Giza", employmentType: "Full-time", aboutRole: "Own Wasla Solutions' content strategy and social presence across LinkedIn, Instagram, and other channels.", responsibilities: ["Create content calendars and execute posting", "Produce video and written content", "Grow organic following and engagement", "Support client content work"], requirements: ["Proven track record growing a brand on social media", "Strong copywriting skills in English and Arabic", "Comfortable on camera"], niceToHave: ["Editing skills in Premiere or CapCut", "Prior agency experience"], salaryRange: "20K-35K EGP", status: "Active", isPublic: true, createdAt: "2026-02-15", createdBy: "Hussein Shahbender", viewCount: 421, shareLink: "https://waslaventures.com/careers/content-creator" },
  { id: "job-4", title: "Video Editor", department: "Design", venture: "Wasla Solutions", workType: "On-site", location: "Sheikh Zayed, Giza", employmentType: "Full-time", aboutRole: "Edit compelling video content for Wasla Solutions and Wasla Ventures.", responsibilities: ["Edit short and long-form video", "Color grading and sound design", "Motion graphics"], requirements: ["2+ years editing experience", "Premiere Pro and After Effects expert"], niceToHave: ["DaVinci Resolve experience"], salaryRange: "18K-30K EGP", status: "Active", isPublic: true, createdAt: "2026-02-15", createdBy: "Saif Nosair", viewCount: 156, shareLink: "https://waslaventures.com/careers/video-editor" },
  { id: "job-5", title: "Account Manager", department: "Growth", venture: "Wasla Solutions", workType: "On-site", location: "Sheikh Zayed, Giza", employmentType: "Full-time", aboutRole: "Manage client relationships end-to-end for Wasla Solutions.", responsibilities: ["Lead client accounts from kickoff to delivery", "Identify upsell and retention opportunities", "Run client meetings and status updates"], requirements: ["3+ years in client-facing roles", "Strong communication in English and Arabic"], niceToHave: ["Digital agency background"], salaryRange: "25K-40K EGP", status: "Active", isPublic: true, createdAt: "2026-02-15", createdBy: "Bassel El Aroussy", viewCount: 298, shareLink: "https://waslaventures.com/careers/account-manager" },
  { id: "job-6", title: "Client Lead", department: "Growth", venture: "Wasla Solutions", workType: "Hybrid", location: "Sheikh Zayed, Giza", employmentType: "Full-time", aboutRole: "Senior-level client leadership role.", responsibilities: ["Own strategic client relationships", "Drive retention and expansion", "Mentor account managers"], requirements: ["5+ years agency or consulting experience"], niceToHave: [], salaryRange: "40K-60K EGP", status: "Active", isPublic: true, createdAt: "2026-02-15", createdBy: "Bassel El Aroussy", viewCount: 203, shareLink: "https://waslaventures.com/careers/client-lead" },
  { id: "job-7", title: "Senior Backend Developer", department: "Engineering", venture: "Wasla Solutions", workType: "Hybrid", location: "Sheikh Zayed, Giza", employmentType: "Full-time", aboutRole: "Build and scale the backend systems powering Wasla Solutions' client platforms.", responsibilities: ["Design and build APIs", "Scale infrastructure for growing client platforms", "Lead code reviews"], requirements: ["4+ years backend experience", "Node.js or Python expert", "Strong database design skills"], niceToHave: ["AWS or GCP experience", "Prior startup experience"], salaryRange: "50K-80K EGP", status: "Active", isPublic: true, createdAt: "2026-04-01", createdBy: "Moaz El Sawy", viewCount: 89, shareLink: "https://waslaventures.com/careers/senior-backend-developer" },
  { id: "job-8", title: "UI/UX Designer", department: "Design", venture: "Wasla Solutions", workType: "On-site", location: "Sheikh Zayed, Giza", employmentType: "Full-time", aboutRole: "Design intuitive user experiences for Wasla's product portfolio.", responsibilities: ["Own the UX process end-to-end", "Prototype and test flows", "Maintain design system"], requirements: ["3+ years UI/UX experience", "Expert in Figma"], niceToHave: ["Prior experience shipping production products"], salaryRange: "30K-50K EGP", status: "Active", isPublic: true, createdAt: "2026-02-15", createdBy: "Usef El Shazly", viewCount: 267, shareLink: "https://waslaventures.com/careers/ui-ux-designer" },
];

export const APPLICANTS_SEED: Applicant[] = [
  { id: "app-1", firstName: "Zeiad", lastName: "Basem", email: "zyadbassem9090@gmail.com", phone: "+20 100 000 0001", linkedin: "https://linkedin.com/in/zeiadbasem", portfolio: "", location: "Cairo, Egypt", jobId: "job-7", cvUrl: "#", coverNote: "Experienced backend developer looking for a new challenge at a growing startup.", status: "New", reviews: [], activity: [{ id: "act-1", actorName: "System", action: "applied via public link", timestamp: "2026-04-21 14:32" }], appliedAt: "2026-04-21", lastUpdatedAt: "2026-04-21", isRead: false },
  { id: "app-2", firstName: "b", lastName: "b", email: "b@gmail.com", phone: "", linkedin: "", portfolio: "", location: "", jobId: "job-1", cvUrl: "#", coverNote: "", status: "New", reviews: [], activity: [{ id: "act-2", actorName: "System", action: "applied via public link", timestamp: "2026-03-03 09:12" }], appliedAt: "2026-03-03", lastUpdatedAt: "2026-03-03", isRead: false },
  { id: "app-3", firstName: "Moaz", lastName: "Elsawy", email: "moaz@waslasolutions.com", phone: "+20 100 000 0003", linkedin: "https://linkedin.com/in/moazelsawy", portfolio: "https://moazelsawy.dev", location: "Cairo, Egypt", jobId: "job-1", cvUrl: "#", coverNote: "Interested in expanding my involvement into the investment side of Wasla.", status: "New", reviews: [], activity: [{ id: "act-3", actorName: "System", action: "applied via public link", timestamp: "2026-02-28 11:45" }], appliedAt: "2026-02-28", lastUpdatedAt: "2026-02-28", isRead: false },
  { id: "app-4", firstName: "Ezzeldeen", lastName: "Ali", email: "ezz500549@gmail.com", phone: "+20 100 000 0004", linkedin: "", portfolio: "", location: "Alexandria, Egypt", jobId: "job-7", cvUrl: "#", coverNote: "Junior developer interested in the role.", status: "New", reviews: [{ id: "rev-1", reviewerId: "u1", reviewerName: "Bassel El Aroussy", rating: 2, fit: "Weak", experience: "Junior", recommendation: "Pass", notes: "Not enough experience for a senior role. Could be worth considering for a junior position later.", createdAt: "2026-02-22 16:20" }], activity: [{ id: "act-4", actorName: "System", action: "applied via public link", timestamp: "2026-02-21 10:30" }, { id: "act-5", actorName: "Bassel El Aroussy", action: "added review (2 stars)", timestamp: "2026-02-22 16:20" }], appliedAt: "2026-02-21", lastUpdatedAt: "2026-02-22", isRead: true },
];

export const JOB_DEPARTMENTS = ["Engineering", "Design", "Marketing", "Growth", "Strategy", "Operations", "Leadership", "Finance", "Legal"];
export const VENTURES_FOR_JOBS = ["Wasla Ventures", "Wasla Solutions", "Wasla Education", "Wasla Tourism", "Wasla Space", "Wasla Labs", "Wasla Bank"];
export const WORK_TYPES: WorkType[] = ["Remote", "On-site", "Hybrid"];
export const EMPLOYMENT_TYPES: EmploymentType[] = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
export const APPLICANT_STATUSES: ApplicantStatus[] = ["New", "Reviewing", "Interview", "Offer", "Hired", "Rejected"];
export const FIT_LEVELS: FitLevel[] = ["Strong", "Good", "Weak", "No"];
export const EXPERIENCE_LEVELS: ExperienceLevel[] = ["Senior", "Mid", "Junior", "Entry"];
export const RECOMMENDATIONS: Recommendation[] = ["Hire", "Maybe", "Pass"];
