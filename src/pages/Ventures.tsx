import { useState } from "react";
import { VENTURES_DATA, PORTFOLIO_DATA, VENTURE_PIPELINE_SEED, STAGE_OPTS, STAGE_COLORS, DEAL_COLORS } from "@/data/ventures";
import type { VenturePipelineDeal } from "@/data/ventures";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

const StageBadge = ({ stage, color }: { stage: string; color: string }) => (
  <span
    className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase"
    style={{ background: `${color}22`, color }}
  >
    {stage}
  </span>
);

const Ventures = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [vpDeals, setVpDeals] = useState<VenturePipelineDeal[]>(VENTURE_PIPELINE_SEED);
  const [addModal, setAddModal] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const emptyForm: VenturePipelineDeal = {
    name: "", stage: "Sourcing", type: "", sector: "", size: "TBD", stake: "TBD",
    valuation: "TBD", source: "", notes: "", thesis: "", owner: "Bassel El Aroussy",
    updated: "", color: "hsl(220, 95%, 47%)",
  };
  const [form, setForm] = useState<VenturePipelineDeal>(emptyForm);

  function openAdd() { setForm(emptyForm); setEditIdx(null); setAddModal(true); }
  function openEdit(i: number) { setForm({ ...vpDeals[i] }); setEditIdx(i); setAddModal(true); }
  function saveForm() {
    const today = new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" });
    const entry = { ...form, updated: today };
    if (editIdx !== null) {
      const updated = [...vpDeals]; updated[editIdx] = entry; setVpDeals(updated);
    } else {
      setVpDeals([...vpDeals, entry]);
    }
    setAddModal(false);
  }
  function removeDeal(i: number) { setVpDeals(vpDeals.filter((_, idx) => idx !== i)); }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">Ventures & Portfolio</h1>
        <p className="text-xs text-muted-foreground mt-1">All active arms + strategic holdings under Wasla Ventures</p>
      </div>

      {/* ─── SECTION 1: Active Ventures ─── */}
      <div>
        <div className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-[0.06em] mb-3">Active Ventures</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VENTURES_DATA.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelected(selected === v.id ? null : v.id)}
              className="bg-card rounded-xl p-4 cursor-pointer transition-all duration-200"
              style={{
                border: `1px solid ${selected === v.id ? v.color : 'hsl(220, 25%, 16%)'}`,
                boxShadow: selected === v.id ? `0 0 0 1px ${v.color}44` : 'none',
              }}
            >
              <div className="flex items-start justify-between mb-2.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: v.color }} />
                <StageBadge stage={v.stage} color={v.stageColor} />
              </div>
              <div className="text-[13px] font-bold text-foreground mb-0.5">{v.name}</div>
              <div className="text-[10px] text-muted-foreground mb-2.5 line-clamp-2 leading-relaxed">{v.desc.slice(0, 80)}...</div>
              <div className="flex gap-1.5 text-[9px] text-muted-foreground/60">
                <span>Owner: <span className="text-muted-foreground">{v.owner.split(" ")[0]}</span></span>
                <span>·</span>
                <span>{v.metric}</span>
              </div>

              {/* Expanded detail */}
              {selected === v.id && (
                <div className="mt-3.5 pt-3.5 border-t border-border space-y-3">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{v.desc}</p>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted rounded-lg p-2.5">
                      <div className="text-[8px] text-muted-foreground/50 uppercase tracking-wide">Model</div>
                      <div className="text-[10px] text-foreground font-medium mt-0.5">{v.model}</div>
                    </div>
                    <div className="bg-muted rounded-lg p-2.5">
                      <div className="text-[8px] text-muted-foreground/50 uppercase tracking-wide">North Star</div>
                      <div className="text-[10px] text-foreground font-medium mt-0.5">{v.northStar}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold mb-1.5">Milestones</div>
                    {v.milestones.map((m, mi) => (
                      <div key={mi} className="flex gap-2 mb-1">
                        <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: v.color }} />
                        <span className="text-[10px] text-muted-foreground">{m}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-warning">⚠ {v.risks}</div>
                  <div className="text-[10px] text-green-400">→ Next: {v.next}</div>

                  <div className="flex gap-1 flex-wrap">
                    {v.services.map((s, si) => (
                      <span key={si} className="text-[9px] bg-muted px-2 py-0.5 rounded text-muted-foreground">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Portfolio */}
      <div>
        <div className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-[0.06em] mb-3">Strategic Portfolio & Holdings</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PORTFOLIO_DATA.map((p) => (
            <div key={p.name} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between mb-2.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                <StageBadge stage={p.status} color={p.status === "Active" || p.status === "Confirmed" ? "hsl(160, 80%, 40%)" : "hsl(36, 90%, 53%)"} />
              </div>
              <div className="text-[13px] font-bold text-foreground mb-0.5">{p.name}</div>
              <div className="text-[10px] text-muted-foreground mb-3 leading-relaxed">{p.desc}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted rounded-md p-2">
                  <div className="text-[8px] text-muted-foreground/50 uppercase tracking-wide">Stake</div>
                  <div className="text-xs font-bold mt-0.5" style={{ color: p.color }}>{p.stake}</div>
                </div>
                <div className="bg-muted rounded-md p-2">
                  <div className="text-[8px] text-muted-foreground/50 uppercase tracking-wide">Invested</div>
                  <div className="text-xs font-bold text-foreground mt-0.5">{p.invested}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION 2: Venture Pipeline ─── */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-foreground">Venture Pipeline</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">Investment opportunities, acquisitions, and strategic deals being tracked</p>
          </div>
          <div className="flex gap-1.5">
            {STAGE_OPTS.map((s) => (
              <span key={s} className="text-[9px] px-2 py-0.5 rounded font-semibold" style={{ background: `${STAGE_COLORS[s]}22`, color: STAGE_COLORS[s] }}>{s}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {vpDeals.map((deal, i) => {
            const stageClr = STAGE_COLORS[deal.stage] || "hsl(220, 15%, 38%)";
            const highlighted = deal.stage === "Negotiating";
            return (
              <div key={i} className="bg-card rounded-xl p-4" style={{ border: `1px solid ${highlighted ? stageClr + '55' : 'hsl(220, 25%, 16%)'}` }}>
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: deal.color }} />
                      <span className="text-[13px] font-bold text-foreground">{deal.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded font-semibold" style={{ background: `${stageClr}22`, color: stageClr }}>{deal.stage}</span>
                      <span className="text-[9px] text-muted-foreground/50">{deal.type}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground leading-relaxed mb-1">{deal.notes}</div>
                    <div className="text-[10px] text-muted-foreground/50 italic">Thesis: {deal.thesis}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 shrink-0 w-[280px]">
                    {[
                      { label: "SECTOR", value: deal.sector, color: "text-foreground" },
                      { label: "SIZE", value: deal.size, style: { color: deal.color } },
                      { label: "TARGET STAKE", value: deal.stake, color: "text-foreground" },
                    ].map((b) => (
                      <div key={b.label} className="bg-muted rounded-md p-2">
                        <div className="text-[8px] text-muted-foreground/50 uppercase tracking-wide mb-0.5">{b.label}</div>
                        <div className={`text-[10px] font-semibold ${b.color || ''}`} style={b.style}>{b.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-2.5 pt-2.5 border-t border-border items-center text-[9px]">
                  <span className="text-muted-foreground/50">Owner: <span className="text-muted-foreground">{deal.owner.split(" ")[0]}</span></span>
                  <span className="text-muted-foreground/50">Source: <span className="text-muted-foreground">{deal.source}</span></span>
                  <span className="text-muted-foreground/50">Valuation: <span className="text-muted-foreground">{deal.valuation}</span></span>
                  <span className="text-muted-foreground/50 ml-auto">Updated: {deal.updated}</span>
                  <Button variant="outline" size="sm" className="h-6 text-[9px] px-2.5" onClick={() => openEdit(i)}>
                    <Pencil className="w-3 h-3 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="h-6 text-[9px] px-2.5 border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => removeDeal(i)}>
                    <Trash2 className="w-3 h-3 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Add new deal button */}
          <button
            onClick={openAdd}
            className="w-full bg-transparent border border-dashed border-border rounded-xl p-3.5 flex items-center gap-2.5 hover:border-primary/50 transition-colors"
          >
            <Plus className="w-4 h-4 text-muted-foreground/50" />
            <span className="text-[11px] text-muted-foreground/50">Add new deal or opportunity</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Deal Dialog */}
      <Dialog open={addModal} onOpenChange={setAddModal}>
        <DialogContent className="sm:max-w-[560px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>{editIdx !== null ? "Edit Deal" : "Add New Deal"}</DialogTitle>
            <p className="text-[11px] text-muted-foreground">Track a new investment opportunity or strategic deal</p>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Deal / Company Name *</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Myfitnessbag" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Stage</label>
              <Select value={form.stage} onValueChange={(v) => setForm({ ...form, stage: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{STAGE_OPTS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Deal Type</label>
              <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="e.g. Investment, Acquisition" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Sector</label>
              <Input value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} placeholder="e.g. Health & Wellness" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Investment Size</label>
              <Input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} placeholder="e.g. 200K EGP" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Target Stake</label>
              <Input value={form.stake} onChange={(e) => setForm({ ...form, stake: e.target.value })} placeholder="e.g. 20%" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Implied Valuation</label>
              <Input value={form.valuation} onChange={(e) => setForm({ ...form, valuation: e.target.value })} placeholder="e.g. ~1M EGP" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Source</label>
              <Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="e.g. Network referral" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Owner</label>
              <Input value={form.owner} onChange={(e) => setForm({ ...form, owner: e.target.value })} className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Accent Color</label>
              <div className="flex gap-1.5 mt-1">
                {DEAL_COLORS.map((c) => (
                  <div
                    key={c}
                    onClick={() => setForm({ ...form, color: c })}
                    className="w-5 h-5 rounded cursor-pointer transition-all"
                    style={{ background: c, border: form.color === c ? "2px solid white" : "2px solid transparent" }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground font-medium">Notes</label>
            <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Deal context, current status..." className="text-xs min-h-[60px]" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground font-medium">Investment Thesis</label>
            <Textarea value={form.thesis} onChange={(e) => setForm({ ...form, thesis: e.target.value })} placeholder="Why this deal fits Wasla's strategy..." className="text-xs min-h-[50px]" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setAddModal(false)} className="text-xs h-8">Cancel</Button>
            <Button onClick={saveForm} disabled={!form.name.trim()} className="text-xs h-8">{editIdx !== null ? "Save Changes" : "Add Deal"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ventures;
