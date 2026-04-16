import { useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, UserCircle, Briefcase, Users, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INVESTOR_SEED, CAP_TABLE_SEED, ADVISOR_BOARD_SEED, PARTNER_SEED } from "@/data/network";
import type { Investor, CapTableEntry, AdvisorBoard, Partner } from "@/data/network";

const statusColors: Record<string, string> = {
  Confirmed: "hsl(160,80%,40%)", Pending: "hsl(36,90%,53%)", Committed: "hsl(220,95%,47%)",
};
const typeColors: Record<string, string> = {
  Founder: "hsl(220,95%,47%)", "Co-founder": "hsl(168,100%,42%)", "Core Team": "hsl(160,80%,40%)",
  Advisory: "hsl(250,60%,60%)", "F&F Investor": "hsl(36,90%,53%)", Strategic: "hsl(330,80%,60%)", Institutional: "hsl(350,75%,50%)",
};

const CAP_TABLE_ENTITIES = Object.keys(CAP_TABLE_SEED);

const Network = () => {
  const [tab, setTab] = useState<"investors" | "advisors" | "partners">("investors");
  const [investors, setInvestors] = useState<Investor[]>(INVESTOR_SEED);
  const [advisorBoard, setAdvisorBoard] = useState<AdvisorBoard[]>(ADVISOR_BOARD_SEED);
  const [partners, setPartners] = useState<Partner[]>(PARTNER_SEED);
  const [capTable, setCapTable] = useState<Record<string, CapTableEntry[]>>(CAP_TABLE_SEED);
  const [showCapTable, setShowCapTable] = useState(false);
  const [capEntity, setCapEntity] = useState("Wasla Ventures");

  // Investor modal
  const [investorModal, setInvestorModal] = useState(false);
  const [editInvIdx, setEditInvIdx] = useState<number | null>(null);
  const emptyInvestor: Investor = { name: "", type: "F&F Investor", entity: "Wasla Ventures", equity: "", capitalCommitted: "", capitalPaid: "", equityType: "Direct Equity", vesting: "N/A", status: "Pending", email: "", phone: "", specialty: "", notes: "" };
  const [invForm, setInvForm] = useState<Investor>(emptyInvestor);

  // Advisor modal
  const [advModal, setAdvModal] = useState(false);
  const [editAdvIdx, setEditAdvIdx] = useState<number | null>(null);
  const emptyAdvisor: AdvisorBoard = { name: "", role: "", entity: "Wasla Ventures", terms: "", email: "", phone: "", specialty: "", notes: "" };
  const [advForm, setAdvForm] = useState<AdvisorBoard>(emptyAdvisor);

  // Partner modal
  const [partnerModal, setPartnerModal] = useState(false);
  const [editPartIdx, setEditPartIdx] = useState<number | null>(null);
  const emptyPartner: Partner = { name: "", type: "", relationship: "", contact: "", email: "", phone: "", notes: "" };
  const [partForm, setPartForm] = useState<Partner>(emptyPartner);

  const [pendingDelete, setPendingDelete] = useState<{ type: string; idx: number; name: string } | null>(null);

  function saveInvestor() {
    if (!invForm.name.trim()) return;
    if (editInvIdx !== null) { setInvestors(prev => prev.map((inv, i) => i === editInvIdx ? invForm : inv)); }
    else { setInvestors(prev => [...prev, invForm]); }
    setInvestorModal(false);
  }

  function saveAdvisorBoard() {
    if (!advForm.name.trim()) return;
    if (editAdvIdx !== null) { setAdvisorBoard(prev => prev.map((a, i) => i === editAdvIdx ? advForm : a)); }
    else { setAdvisorBoard(prev => [...prev, advForm]); }
    setAdvModal(false);
  }

  function savePartner() {
    if (!partForm.name.trim()) return;
    if (editPartIdx !== null) { setPartners(prev => prev.map((p, i) => i === editPartIdx ? partForm : p)); }
    else { setPartners(prev => [...prev, partForm]); }
    setPartnerModal(false);
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    if (pendingDelete.type === "investor") setInvestors(prev => prev.filter((_, i) => i !== pendingDelete.idx));
    else if (pendingDelete.type === "advisor") setAdvisorBoard(prev => prev.filter((_, i) => i !== pendingDelete.idx));
    else if (pendingDelete.type === "partner") setPartners(prev => prev.filter((_, i) => i !== pendingDelete.idx));
    setPendingDelete(null);
  }

  const tabs = [{ id: "investors" as const, l: "Investors", icon: UserCircle }, { id: "advisors" as const, l: "Advisors & Board", icon: Briefcase }, { id: "partners" as const, l: "Partners", icon: Users }];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Network</h1>
        <p className="text-xs text-muted-foreground mt-1">Investor relations, advisors, board, and strategic partners</p>
      </div>

      <div className="flex gap-0 border-b border-border">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-[11px] font-medium transition-colors border-b-2 ${tab === t.id ? "text-secondary border-secondary" : "text-muted-foreground border-transparent hover:text-foreground"}`}>
            {t.l}
          </button>
        ))}
      </div>

      {/* INVESTORS */}
      {tab === "investors" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">{investors.length} investors and stakeholders</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={() => setShowCapTable(!showCapTable)}>
                <Eye className="w-3 h-3" /> {showCapTable ? "Hide" : "View"} Cap Table
              </Button>
              <Button size="sm" className="h-7 text-[10px] gap-1" onClick={() => { setInvForm(emptyInvestor); setEditInvIdx(null); setInvestorModal(true); }}>
                <Plus className="w-3 h-3" /> Add Investor
              </Button>
            </div>
          </div>

          {showCapTable && (
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-semibold text-foreground">Cap Table</div>
                <Select value={capEntity} onValueChange={setCapEntity}>
                  <SelectTrigger className="w-[200px] h-7 text-[10px]"><SelectValue /></SelectTrigger>
                  <SelectContent>{CAP_TABLE_ENTITIES.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead><tr className="border-b border-border">
                    {["Shareholder", "Ownership", "Type", "Capital Paid", "Notes"].map(h => (
                      <th key={h} className="text-left p-2 font-semibold text-muted-foreground/50 text-[9px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {(capTable[capEntity] || []).map((row, i) => (
                      <tr key={i} className="border-b border-border/30">
                        <td className="p-2 font-semibold text-foreground">{row.shareholder}</td>
                        <td className="p-2 font-bold" style={{ color: "hsl(220,95%,47%)" }}>{row.ownership}</td>
                        <td className="p-2"><span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${typeColors[row.type] || "hsl(220,15%,38%)"}22`, color: typeColors[row.type] || "hsl(220,15%,38%)" }}>{row.type}</span></td>
                        <td className="p-2 text-muted-foreground">{row.capitalPaid || "-"}</td>
                        <td className="p-2 text-muted-foreground">{row.notes || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {investors.map((inv, i) => {
              const tc = typeColors[inv.type] || "hsl(220,15%,38%)";
              const sc = statusColors[inv.status] || "hsl(220,15%,38%)";
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-4 group relative">
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setInvForm({ ...inv }); setEditInvIdx(i); setInvestorModal(true); }} className="w-5 h-5 rounded flex items-center justify-center bg-muted hover:bg-accent transition-colors">
                      <Pencil className="w-2.5 h-2.5 text-muted-foreground" />
                    </button>
                    <button onClick={() => setPendingDelete({ type: "investor", idx: i, name: inv.name })} className="w-5 h-5 rounded flex items-center justify-center bg-muted hover:bg-destructive/20 transition-colors">
                      <X className="w-2.5 h-2.5 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[13px] font-bold text-foreground">{inv.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${tc}22`, color: tc }}>{inv.type}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${sc}22`, color: sc }}>{inv.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div><span className="text-muted-foreground/50">Entity:</span> <span className="text-muted-foreground">{inv.entity}</span></div>
                    <div><span className="text-muted-foreground/50">Equity:</span> <span className="text-foreground font-semibold">{inv.equity}</span></div>
                    <div><span className="text-muted-foreground/50">Committed:</span> <span className="text-muted-foreground">{inv.capitalCommitted}</span></div>
                    <div><span className="text-muted-foreground/50">Paid:</span> <span className="text-muted-foreground">{inv.capitalPaid}</span></div>
                  </div>
                  {inv.specialty && <div className="text-[10px] text-muted-foreground/70 mt-2">{inv.specialty}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ADVISORS & BOARD */}
      {tab === "advisors" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">{advisorBoard.length} advisors and board members</p>
            <Button size="sm" className="h-7 text-[10px] gap-1" onClick={() => { setAdvForm(emptyAdvisor); setEditAdvIdx(null); setAdvModal(true); }}>
              <Plus className="w-3 h-3" /> Add Advisor
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {advisorBoard.map((a, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 group relative">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setAdvForm({ ...a }); setEditAdvIdx(i); setAdvModal(true); }} className="w-5 h-5 rounded flex items-center justify-center bg-muted hover:bg-accent transition-colors"><Pencil className="w-2.5 h-2.5 text-muted-foreground" /></button>
                  <button onClick={() => setPendingDelete({ type: "advisor", idx: i, name: a.name })} className="w-5 h-5 rounded flex items-center justify-center bg-muted hover:bg-destructive/20 transition-colors"><X className="w-2.5 h-2.5 text-muted-foreground" /></button>
                </div>
                <div className="text-[13px] font-bold text-foreground mb-0.5">{a.name}</div>
                <div className="text-[10px] font-semibold mb-1.5" style={{ color: "hsl(220,95%,47%)" }}>{a.role}</div>
                <div className="text-[10px] text-muted-foreground mb-1">{a.entity}</div>
                <div className="text-[10px] text-muted-foreground/70">{a.terms}</div>
                {a.specialty && <div className="text-[10px] text-muted-foreground/50 mt-1">{a.specialty}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PARTNERS */}
      {tab === "partners" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">{partners.length} strategic partners</p>
            <Button size="sm" className="h-7 text-[10px] gap-1" onClick={() => { setPartForm(emptyPartner); setEditPartIdx(null); setPartnerModal(true); }}>
              <Plus className="w-3 h-3" /> Add Partner
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {partners.map((p, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 group relative">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setPartForm({ ...p }); setEditPartIdx(i); setPartnerModal(true); }} className="w-5 h-5 rounded flex items-center justify-center bg-muted hover:bg-accent transition-colors"><Pencil className="w-2.5 h-2.5 text-muted-foreground" /></button>
                  <button onClick={() => setPendingDelete({ type: "partner", idx: i, name: p.name })} className="w-5 h-5 rounded flex items-center justify-center bg-muted hover:bg-destructive/20 transition-colors"><X className="w-2.5 h-2.5 text-muted-foreground" /></button>
                </div>
                <div className="text-[13px] font-bold text-foreground mb-0.5">{p.name}</div>
                <div className="text-[10px] font-semibold mb-1" style={{ color: "hsl(168,100%,42%)" }}>{p.type}</div>
                <div className="text-[10px] text-muted-foreground mb-1">{p.relationship}</div>
                <div className="text-[10px] text-muted-foreground/50">Contact: {p.contact || "-"}</div>
                {p.notes && <div className="text-[10px] text-muted-foreground/70 mt-1">{p.notes}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Investor Modal */}
      <Dialog open={investorModal} onOpenChange={setInvestorModal}>
        <DialogContent className="sm:max-w-[560px] bg-card border-border max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editInvIdx !== null ? "Edit Investor" : "Add Investor"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Name *</label><Input value={invForm.name} onChange={e => setInvForm({ ...invForm, name: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Type</label><Input value={invForm.type} onChange={e => setInvForm({ ...invForm, type: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Entity</label><Input value={invForm.entity} onChange={e => setInvForm({ ...invForm, entity: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Equity %</label><Input value={invForm.equity} onChange={e => setInvForm({ ...invForm, equity: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Capital Committed</label><Input value={invForm.capitalCommitted} onChange={e => setInvForm({ ...invForm, capitalCommitted: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Capital Paid</label><Input value={invForm.capitalPaid} onChange={e => setInvForm({ ...invForm, capitalPaid: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Equity Type</label><Input value={invForm.equityType} onChange={e => setInvForm({ ...invForm, equityType: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Status</label><Input value={invForm.status} onChange={e => setInvForm({ ...invForm, status: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Email</label><Input value={invForm.email} onChange={e => setInvForm({ ...invForm, email: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Phone</label><Input value={invForm.phone} onChange={e => setInvForm({ ...invForm, phone: e.target.value })} className="h-8 text-xs" /></div>
          </div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Specialty</label><Input value={invForm.specialty} onChange={e => setInvForm({ ...invForm, specialty: e.target.value })} className="h-8 text-xs" /></div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Notes</label><Textarea value={invForm.notes} onChange={e => setInvForm({ ...invForm, notes: e.target.value })} className="text-xs min-h-[50px]" /></div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setInvestorModal(false)} className="text-xs h-8">Cancel</Button>
            <Button onClick={saveInvestor} disabled={!invForm.name.trim()} className="text-xs h-8">{editInvIdx !== null ? "Save" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Advisor Modal */}
      <Dialog open={advModal} onOpenChange={setAdvModal}>
        <DialogContent className="sm:max-w-[480px] bg-card border-border">
          <DialogHeader><DialogTitle>{editAdvIdx !== null ? "Edit Advisor" : "Add Advisor"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Name *</label><Input value={advForm.name} onChange={e => setAdvForm({ ...advForm, name: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Role</label><Input value={advForm.role} onChange={e => setAdvForm({ ...advForm, role: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Entity</label><Input value={advForm.entity} onChange={e => setAdvForm({ ...advForm, entity: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Terms</label><Input value={advForm.terms} onChange={e => setAdvForm({ ...advForm, terms: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Specialty</label><Input value={advForm.specialty} onChange={e => setAdvForm({ ...advForm, specialty: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Email</label><Input value={advForm.email} onChange={e => setAdvForm({ ...advForm, email: e.target.value })} className="h-8 text-xs" /></div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setAdvModal(false)} className="text-xs h-8">Cancel</Button>
            <Button onClick={saveAdvisorBoard} disabled={!advForm.name.trim()} className="text-xs h-8">{editAdvIdx !== null ? "Save" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Partner Modal */}
      <Dialog open={partnerModal} onOpenChange={setPartnerModal}>
        <DialogContent className="sm:max-w-[480px] bg-card border-border">
          <DialogHeader><DialogTitle>{editPartIdx !== null ? "Edit Partner" : "Add Partner"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Name *</label><Input value={partForm.name} onChange={e => setPartForm({ ...partForm, name: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Type</label><Input value={partForm.type} onChange={e => setPartForm({ ...partForm, type: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Contact</label><Input value={partForm.contact} onChange={e => setPartForm({ ...partForm, contact: e.target.value })} className="h-8 text-xs" /></div>
            <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Email</label><Input value={partForm.email} onChange={e => setPartForm({ ...partForm, email: e.target.value })} className="h-8 text-xs" /></div>
          </div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Relationship</label><Input value={partForm.relationship} onChange={e => setPartForm({ ...partForm, relationship: e.target.value })} className="h-8 text-xs" /></div>
          <div className="space-y-1"><label className="text-[10px] text-muted-foreground font-medium">Notes</label><Textarea value={partForm.notes} onChange={e => setPartForm({ ...partForm, notes: e.target.value })} className="text-xs min-h-[50px]" /></div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setPartnerModal(false)} className="text-xs h-8">Cancel</Button>
            <Button onClick={savePartner} disabled={!partForm.name.trim()} className="text-xs h-8">{editPartIdx !== null ? "Save" : "Add"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!pendingDelete} onOpenChange={() => setPendingDelete(null)}>
        <DialogContent className="sm:max-w-[380px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Remove Entry</DialogTitle>
            <DialogDescription>Remove <strong>{pendingDelete?.name}</strong>?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingDelete(null)} className="text-xs h-8">Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} className="text-xs h-8">Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Network;
