import { useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSalaries } from "@/contexts/SalaryContext";
import { HIRING_SEED, HIRING_STATUSES, HIRING_PRIORITIES, type HiringRole } from "@/data/hiring";

interface TeamMember {
  name: string; role: string; dept: string; initials: string; color: string; equity: string; skills: string[]; bio: string; focus: string;
}

interface Advisor {
  name: string; role: string; note: string;
}

const TEAM_SEED: TeamMember[] = [
  { name: "Bassel El Aroussy", role: "Principal", dept: "Leadership", initials: "BA", color: "hsl(220,95%,47%)", equity: "55% (WV)", skills: ["Strategy", "Business Dev", "Capital Markets", "Partnerships"], bio: "Managing Principal & founder. Former securities broker managing trading platforms serving thousands. Leads all strategic decisions, partnerships, and business development.", focus: "Investor relations, business development, strategy, operations oversight" },
  { name: "Usef El Shazly", role: "Digital Lead", dept: "Product & Design", initials: "UE", color: "hsl(168,100%,42%)", equity: "10% (WV) / 35% (Edu)", skills: ["UI/UX", "Digital Strategy", "Design Systems", "Product"], bio: "Managing Partner & Head of Design. Digital wizard with deep command of design, development, and modern tools.", focus: "Product design, Wasla Education lead, client UX delivery" },
  { name: "Hussein Shahbender", role: "Marketing Lead", dept: "Growth", initials: "HS", color: "hsl(250,60%,60%)", equity: "15% (WV)", skills: ["Branding", "Performance Marketing", "Content", "Growth"], bio: "Co-founder & Marketing Lead. Young entrepreneur with proven track record building consumer ventures.", focus: "Brand, marketing strategy, content, client growth campaigns" },
  { name: "Moaz El Sawy", role: "Development Lead", dept: "Engineering", initials: "ME", color: "hsl(160,80%,40%)", equity: "2% (WV) / 2.5% (Sol+Edu)", skills: ["iOS", "Android", "Full-Stack", "React Native"], bio: "Senior Software Developer. Highly skilled in iOS and Android. Emerging senior full-stack developer.", focus: "Mobile development, full-stack delivery, architecture decisions" },
  { name: "Ali El Amir", role: "Creative Lead", dept: "Design", initials: "AE", color: "hsl(36,90%,53%)", equity: "2% (WV)", skills: ["Graphic Design", "Creative Direction", "Branding", "Motion"], bio: "Creative Lead & Creative Director at Paperwork Studio. Exceptional designer with world-class creative direction.", focus: "Visual identity, creative direction, brand assets, Paperwork collaboration" },
  { name: "Mohab Metwali", role: "Engineering & AI Lead", dept: "Engineering", initials: "MM", color: "hsl(330,80%,60%)", equity: "1% (direct)", skills: ["AI/ML", "Blockchain", "Data Science", "C++", "System Architecture"], bio: "Senior engineer with deep expertise in AI, machine learning, data science, and blockchain.", focus: "AI integrations, advanced engineering, Wasla Labs lead, R&D" },
  { name: "Mohamed Hagry", role: "Product Designer", dept: "Design", initials: "MH", color: "hsl(174,72%,46%)", equity: "-", skills: ["Product Design", "Figma", "User Research", "Prototyping"], bio: "Digital product designer focused on intuitive, user-centered interfaces.", focus: "Product UI design, design system maintenance, user flows" },
  { name: "Saif Nosair", role: "Visual & Motion Designer", dept: "Design", initials: "SN", color: "hsl(24,94%,53%)", equity: "-", skills: ["Motion Design", "After Effects", "Brand Identity", "Video"], bio: "Talented visual and motion designer bringing brands to life through compelling graphics.", focus: "Motion graphics, brand videos, social content, visual campaigns" },
];

const ADVISORS_SEED: Advisor[] = [
  { name: "Mr. Yasser Hashem", role: "Legal Advisor", note: "Top tech lawyer in Egypt. 2% equity for 3 years of legal services." },
  { name: "Board-level Tech Advisors", role: "Technical Board", note: "Two senior developers acting at board level with strong external credibility." },
  { name: "Strategic Business Board", role: "Business Board", note: "Three high-profile businessmen/investors providing strategic direction and network access." },
];

const DEPTS = ["Leadership", "Product & Design", "Engineering", "Growth", "Design"];
const DEPT_COLORS = ["hsl(220,95%,47%)", "hsl(168,100%,42%)", "hsl(160,80%,40%)", "hsl(250,60%,60%)", "hsl(36,90%,53%)", "hsl(330,80%,60%)", "hsl(174,72%,46%)", "hsl(24,94%,53%)"];

const Team = () => {
  const [tab, setTab] = useState<"team" | "hiring">("team");
  const [team, setTeam] = useState<TeamMember[]>(TEAM_SEED);
  const [advisors, setAdvisors] = useState<Advisor[]>(ADVISORS_SEED);
  const [selected, setSelected] = useState<number | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", role: "", dept: "Engineering", skills: "", bio: "", focus: "", equity: "-" });
  const [addAdvisorModal, setAddAdvisorModal] = useState(false);
  const [editAdvisorIdx, setEditAdvisorIdx] = useState<number | null>(null);
  const [advisorForm, setAdvisorForm] = useState({ name: "", role: "", note: "" });
  const { addSalaryEntry } = useSalaries();

  // Hiring state
  const [hiringRoles, setHiringRoles] = useState<HiringRole[]>(HIRING_SEED);
  const [hiringModal, setHiringModal] = useState(false);
  const [editHiringIdx, setEditHiringIdx] = useState<number | null>(null);
  const [hiringForm, setHiringForm] = useState<HiringRole>({ title: "", venture: "Wasla Solutions", department: "Engineering", priority: "Medium", status: "Open", notes: "" });
  const [pendingDeleteHiring, setPendingDeleteHiring] = useState<{ idx: number; name: string } | null>(null);

  function resetForm() { setForm({ name: "", role: "", dept: "Engineering", skills: "", bio: "", focus: "", equity: "-" }); }
  function openEditMember(i: number) {
    const p = team[i];
    setForm({ name: p.name, role: p.role, dept: p.dept, skills: p.skills.join(", "), bio: p.bio, focus: p.focus, equity: p.equity });
    setEditIdx(i); setAddModal(true);
  }
  function saveMember() {
    if (!form.name.trim()) return;
    const initials = form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    const skills = form.skills.split(",").map(s => s.trim()).filter(Boolean);
    if (editIdx !== null) {
      setTeam(prev => prev.map((p, i) => i === editIdx ? { ...p, name: form.name, role: form.role, dept: form.dept, initials, equity: form.equity, skills, bio: form.bio, focus: form.focus } : p));
    } else {
      const color = DEPT_COLORS[team.length % DEPT_COLORS.length];
      setTeam(prev => [...prev, { name: form.name, role: form.role, dept: form.dept, initials, color, equity: form.equity, skills, bio: form.bio, focus: form.focus }]);
      addSalaryEntry({ name: form.name, role: form.role, dept: form.dept, monthlySalary: 0, equity: "-", venture: "Pending" });
    }
    resetForm(); setEditIdx(null); setAddModal(false);
  }
  function removeMember(i: number) { setTeam(prev => prev.filter((_, idx) => idx !== i)); if (selected === i) setSelected(null); }
  function resetAdvisorForm() { setAdvisorForm({ name: "", role: "", note: "" }); }
  function openEditAdvisor(i: number) { const a = advisors[i]; setAdvisorForm({ name: a.name, role: a.role, note: a.note }); setEditAdvisorIdx(i); setAddAdvisorModal(true); }
  function saveAdvisor() {
    if (!advisorForm.name.trim()) return;
    if (editAdvisorIdx !== null) { setAdvisors(prev => prev.map((a, i) => i === editAdvisorIdx ? { ...advisorForm } : a)); }
    else { setAdvisors(prev => [...prev, { ...advisorForm }]); }
    resetAdvisorForm(); setEditAdvisorIdx(null); setAddAdvisorModal(false);
  }
  function removeAdvisor(i: number) { setAdvisors(prev => prev.filter((_, idx) => idx !== i)); }

  function openAddHiring() { setHiringForm({ title: "", venture: "Wasla Solutions", department: "Engineering", priority: "Medium", status: "Open", notes: "" }); setEditHiringIdx(null); setHiringModal(true); }
  function openEditHiring(i: number) { setHiringForm({ ...hiringRoles[i] }); setEditHiringIdx(i); setHiringModal(true); }
  function saveHiring() {
    if (!hiringForm.title.trim()) return;
    if (editHiringIdx !== null) { setHiringRoles(prev => prev.map((r, i) => i === editHiringIdx ? hiringForm : r)); }
    else { setHiringRoles(prev => [...prev, hiringForm]); }
    setHiringModal(false);
  }

  const tabs = [{ id: "team" as const, l: "Current Team" }, { id: "hiring" as const, l: "Hiring" }];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Team</h1>
          <p className="text-xs text-muted-foreground mt-1">{team.length} people across Leadership, Engineering, Design & Growth</p>
        </div>
        {tab === "team" && (
          <Button size="sm" className="h-8 text-xs gap-1.5" onClick={() => { resetForm(); setEditIdx(null); setAddModal(true); }}>
            <Plus className="w-3.5 h-3.5" /> Add Member
          </Button>
        )}
        {tab === "hiring" && (
          <Button size="sm" className="h-8 text-xs gap-1.5" onClick={openAddHiring}>
            <Plus className="w-3.5 h-3.5" /> Add Role
          </Button>
        )}
      </div>

      <div className="flex gap-0 border-b border-border">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-[11px] font-medium transition-colors border-b-2 ${tab === t.id ? "text-secondary border-secondary" : "text-muted-foreground border-transparent hover:text-foreground"}`}>
            {t.l}
          </button>
        ))}
      </div>

      {tab === "team" && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {team.map((p, i) => (
              <div key={i} onClick={() => setSelected(selected === i ? null : i)}
                className="bg-card rounded-xl p-4 cursor-pointer transition-all duration-200 group relative"
                style={{ border: `1px solid ${selected === i ? p.color : 'hsl(220,25%,16%)'}` }}>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={e => { e.stopPropagation(); openEditMember(i); }} className="w-6 h-6 rounded-md flex items-center justify-center bg-muted hover:bg-accent transition-colors">
                    <Pencil className="w-3 h-3 text-muted-foreground" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); removeMember(i); }} className="w-6 h-6 rounded-md flex items-center justify-center bg-muted hover:bg-destructive/20 transition-colors">
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: `${p.color}22`, border: `2px solid ${p.color}66`, color: p.color }}>{p.initials}</div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{p.name}</div>
                    <div className="text-[10px] font-semibold" style={{ color: p.color }}>{p.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] bg-muted px-2 py-0.5 rounded text-muted-foreground">{p.dept}</span>
                  {p.equity !== "-" && (
                    <span className="text-[9px] px-2 py-0.5 rounded" style={{ background: "hsl(220,95%,47%,0.12)", color: "hsl(220,95%,47%)" }}>Equity: {p.equity}</span>
                  )}
                </div>
                {selected === i && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{p.bio}</p>
                    <div>
                      <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold mb-1">Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {p.skills.map((s, si) => (
                          <span key={si} className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${p.color}18`, color: p.color }}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold mb-1">Current Focus</div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{p.focus}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Advisory Section */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-foreground mb-0.5">Advisory & Board Support</div>
                <div className="text-[10px] text-muted-foreground/50">Key relationships backing Wasla Ventures</div>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={() => { resetAdvisorForm(); setEditAdvisorIdx(null); setAddAdvisorModal(true); }}>
                <Plus className="w-3 h-3" /> Add Advisor
              </Button>
            </div>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {advisors.map((a, i) => (
                <div key={i} className="bg-muted rounded-lg p-3 group relative">
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditAdvisor(i)} className="w-5 h-5 rounded flex items-center justify-center bg-card hover:bg-accent transition-colors">
                      <Pencil className="w-2.5 h-2.5 text-muted-foreground" />
                    </button>
                    <button onClick={() => removeAdvisor(i)} className="w-5 h-5 rounded flex items-center justify-center bg-card hover:bg-destructive/20 transition-colors">
                      <X className="w-2.5 h-2.5 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="text-[11px] font-semibold text-foreground mb-0.5">{a.name}</div>
                  <div className="text-[9px] font-semibold mb-1.5" style={{ color: "hsl(220,95%,47%)" }}>{a.role}</div>
                  <div className="text-[10px] text-muted-foreground leading-relaxed">{a.note}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "hiring" && (
        <div className="space-y-3">
          {hiringRoles.map((role, i) => {
            const prioColor = role.priority === "High" ? "hsl(350,75%,50%)" : role.priority === "Medium" ? "hsl(36,90%,53%)" : "hsl(220,15%,38%)";
            const statusColor = role.status === "Filled" ? "hsl(160,80%,40%)" : role.status === "Interviewing" || role.status === "Offer" ? "hsl(250,60%,60%)" : "hsl(220,95%,47%)";
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-bold text-foreground">{role.title}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${prioColor}22`, color: prioColor }}>{role.priority}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${statusColor}22`, color: statusColor }}>{role.status}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">{role.venture} - {role.department}</div>
                    {role.notes && <div className="text-[10px] text-muted-foreground/70 mt-1">{role.notes}</div>}
                  </div>
                  <div className="flex gap-1.5">
                    <Button variant="outline" size="sm" className="h-6 text-[9px] px-2" onClick={() => openEditHiring(i)}>
                      <Pencil className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="h-6 text-[9px] px-2 border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => setPendingDeleteHiring({ idx: i, name: role.title })}>
                      <Trash2 className="w-3 h-3 mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          {hiringRoles.length === 0 && (
            <div className="border border-dashed border-border rounded-xl p-8 text-center">
              <p className="text-[11px] text-muted-foreground/50">No open roles. Click "Add Role" to create one.</p>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Member Dialog */}
      <Dialog open={addModal} onOpenChange={v => { if (!v) { setEditIdx(null); resetForm(); } setAddModal(v); }}>
        <DialogContent className="sm:max-w-[480px] bg-card border-border">
          <DialogHeader><DialogTitle>{editIdx !== null ? "Edit Team Member" : "Add Team Member"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Full Name *</label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Doe" className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Role</label><Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. Frontend Developer" className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Department</label>
              <Select value={form.dept} onValueChange={v => setForm({ ...form, dept: v })}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent>{DEPTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Equity</label><Input value={form.equity} onChange={e => setForm({ ...form, equity: e.target.value })} placeholder="e.g. 2% (WV)" className="h-8 text-xs" /></div>
          </div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Skills (comma-separated)</label><Input value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} placeholder="e.g. React, TypeScript" className="h-8 text-xs" /></div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Bio</label><Input value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Short bio..." className="h-8 text-xs" /></div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Current Focus</label><Input value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })} placeholder="What they're working on..." className="h-8 text-xs" /></div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => { setAddModal(false); setEditIdx(null); resetForm(); }} className="text-xs h-8">Cancel</Button>
            <Button onClick={saveMember} disabled={!form.name.trim()} className="text-xs h-8">{editIdx !== null ? "Save Changes" : "Add Member"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Advisor Dialog */}
      <Dialog open={addAdvisorModal} onOpenChange={v => { if (!v) { setEditAdvisorIdx(null); resetAdvisorForm(); } setAddAdvisorModal(v); }}>
        <DialogContent className="sm:max-w-[420px] bg-card border-border">
          <DialogHeader><DialogTitle>{editAdvisorIdx !== null ? "Edit Advisor" : "Add Advisor"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Name *</label><Input value={advisorForm.name} onChange={e => setAdvisorForm({ ...advisorForm, name: e.target.value })} placeholder="e.g. Jane Smith" className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Role</label><Input value={advisorForm.role} onChange={e => setAdvisorForm({ ...advisorForm, role: e.target.value })} placeholder="e.g. Financial Advisor" className="h-8 text-xs" /></div>
          </div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Note</label><Input value={advisorForm.note} onChange={e => setAdvisorForm({ ...advisorForm, note: e.target.value })} placeholder="Key details..." className="h-8 text-xs" /></div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => { setAddAdvisorModal(false); setEditAdvisorIdx(null); resetAdvisorForm(); }} className="text-xs h-8">Cancel</Button>
            <Button onClick={saveAdvisor} disabled={!advisorForm.name.trim()} className="text-xs h-8">{editAdvisorIdx !== null ? "Save Changes" : "Add Advisor"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hiring Dialog */}
      <Dialog open={hiringModal} onOpenChange={setHiringModal}>
        <DialogContent className="sm:max-w-[480px] bg-card border-border">
          <DialogHeader><DialogTitle>{editHiringIdx !== null ? "Edit Role" : "Add Open Role"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Role Title *</label><Input value={hiringForm.title} onChange={e => setHiringForm({ ...hiringForm, title: e.target.value })} placeholder="e.g. Senior Backend Developer" className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Venture</label><Input value={hiringForm.venture} onChange={e => setHiringForm({ ...hiringForm, venture: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Department</label>
              <Select value={hiringForm.department} onValueChange={v => setHiringForm({ ...hiringForm, department: v })}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent>{DEPTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Priority</label>
              <Select value={hiringForm.priority} onValueChange={v => setHiringForm({ ...hiringForm, priority: v })}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent>{HIRING_PRIORITIES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-1 col-span-2"><label className="text-[10px] text-muted-foreground font-medium">Status</label>
              <Select value={hiringForm.status} onValueChange={v => setHiringForm({ ...hiringForm, status: v })}><SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger><SelectContent>{HIRING_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
            </div>
          </div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Notes</label><Textarea value={hiringForm.notes} onChange={e => setHiringForm({ ...hiringForm, notes: e.target.value })} className="text-xs min-h-[60px]" /></div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setHiringModal(false)} className="text-xs h-8">Cancel</Button>
            <Button onClick={saveHiring} disabled={!hiringForm.title.trim()} className="text-xs h-8">{editHiringIdx !== null ? "Save" : "Add Role"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Hiring Confirmation */}
      <Dialog open={!!pendingDeleteHiring} onOpenChange={() => setPendingDeleteHiring(null)}>
        <DialogContent className="sm:max-w-[380px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Remove Role</DialogTitle>
            <DialogDescription>Remove <strong>{pendingDeleteHiring?.name}</strong> from open roles?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingDeleteHiring(null)} className="text-xs h-8">Cancel</Button>
            <Button variant="destructive" onClick={() => { if (pendingDeleteHiring) { setHiringRoles(prev => prev.filter((_, i) => i !== pendingDeleteHiring.idx)); setPendingDeleteHiring(null); } }} className="text-xs h-8">Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Team;
