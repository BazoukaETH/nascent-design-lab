import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "Founder" | "Team" | "Investor" | "External";
export type UserStatus = "Active" | "Invited" | "Suspended";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  twoFA: boolean;
  status: UserStatus;
  lastActive: string;
  invited: string;
}

const SEED_USERS: AppUser[] = [
  { id: "u1", name: "Bassel El Aroussy", email: "bassel@waslaventures.com", role: "Founder", twoFA: true, status: "Active", lastActive: "Today", invited: "" },
  { id: "u2", name: "Moaz El Sawy", email: "", role: "Founder", twoFA: false, status: "Active", lastActive: "Today", invited: "" },
  { id: "u3", name: "Youssef El Shazly", email: "", role: "Team", twoFA: false, status: "Active", lastActive: "", invited: "" },
  { id: "u4", name: "Hussein Shahbender", email: "", role: "Team", twoFA: false, status: "Active", lastActive: "", invited: "" },
  { id: "u5", name: "Mohamed El Hagry", email: "", role: "Team", twoFA: false, status: "Active", lastActive: "", invited: "" },
  { id: "u6", name: "Ali Amir", email: "", role: "Team", twoFA: false, status: "Active", lastActive: "", invited: "" },
  { id: "u7", name: "Saif Nosair", email: "", role: "Team", twoFA: false, status: "Active", lastActive: "", invited: "" },
  { id: "u8", name: "Ahmed Nehad", email: "", role: "Team", twoFA: false, status: "Active", lastActive: "", invited: "" },
];

interface UserContextValue {
  users: AppUser[];
  currentUserId: string;
  currentUser: AppUser;
  setCurrentUserId: (id: string) => void;
  addUser: (u: Omit<AppUser, "id">) => void;
  updateUser: (id: string, patch: Partial<AppUser>) => void;
  removeUser: (id: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<AppUser[]>(SEED_USERS);
  const [currentUserId, setCurrentUserId] = useState<string>("u1");

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const addUser: UserContextValue["addUser"] = (u) =>
    setUsers(prev => [...prev, { ...u, id: `u${Date.now()}` }]);

  const updateUser: UserContextValue["updateUser"] = (id, patch) =>
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...patch } : u)));

  const removeUser: UserContextValue["removeUser"] = (id) =>
    setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <UserContext.Provider value={{ users, currentUserId, currentUser, setCurrentUserId, addUser, updateUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUsers must be used within UserProvider");
  return ctx;
};

// Permissions matrix
export type AccessLevel = "Full" | "Read" | "ComingSoon" | "No";

export const PERMISSION_MATRIX: { section: string; page: string; access: Record<UserRole, AccessLevel> }[] = [
  { section: "Corporate Portal", page: "Overview", access: { Founder: "Full", Team: "Read", Investor: "Read", External: "Read" } },
  { section: "Corporate Portal", page: "Ecosystem", access: { Founder: "Full", Team: "Read", Investor: "Read", External: "Read" } },
  { section: "Corporate Portal", page: "Direction", access: { Founder: "Full", Team: "Read", Investor: "Read", External: "Read" } },
  { section: "Corporate Portal", page: "Updates", access: { Founder: "Full", Team: "Read", Investor: "Read", External: "Read" } },
  { section: "Corporate Portal", page: "Documents (portal)", access: { Founder: "Full", Team: "Read", Investor: "Read", External: "Read" } },
  { section: "Corporate Portal", page: "Corporate Admin", access: { Founder: "Full", Team: "No", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Command Center", access: { Founder: "Full", Team: "ComingSoon", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Ventures", access: { Founder: "Full", Team: "ComingSoon", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Pipeline", access: { Founder: "Full", Team: "ComingSoon", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Finance", access: { Founder: "Full", Team: "No", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Team", access: { Founder: "Full", Team: "ComingSoon", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Network", access: { Founder: "Full", Team: "No", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Market Intel", access: { Founder: "Full", Team: "ComingSoon", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Initiatives", access: { Founder: "Full", Team: "No", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "AI Agents", access: { Founder: "Full", Team: "No", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Documents (internal)", access: { Founder: "Full", Team: "No", Investor: "No", External: "No" } },
  { section: "Founder Dashboard", page: "Settings", access: { Founder: "Full", Team: "No", Investor: "No", External: "No" } },
];

export const ROLE_META: Record<UserRole, { description: string; color: string; bg: string }> = {
  Founder:  { description: "Full dashboard + corporate portal admin",        color: "hsl(220,95%,47%)", bg: "hsl(220,95%,47%,0.12)" },
  Team:     { description: "Corporate portal + restricted dashboard (soon)", color: "hsl(160,80%,40%)", bg: "hsl(160,80%,40%,0.12)" },
  Investor: { description: "Corporate portal + investor dashboard (soon)",   color: "hsl(250,60%,60%)", bg: "hsl(250,60%,60%,0.12)" },
  External: { description: "Corporate portal only",                          color: "hsl(215,20%,55%)", bg: "hsl(220,15%,38%,0.15)" },
};
