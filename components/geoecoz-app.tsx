'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Check, ChevronDown, Crosshair, FileText, Leaf, MapPin, Search, X } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { regions, stats, riskLabel, getRiskColor, regionSummary, type Region } from '@/lib/regions'

const nav = [{ href: '/', label: 'Dashboard' }, { href: '/map', label: 'Map' }, { href: '/report', label: 'Report threat' }, { href: '/about', label: 'About' }]

function TopBar() {
  return <header className="topbar"><Link href="/" className="wordmark">GEOECOZ</Link><nav>{nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><div className="top-status"><span className="live-dot" /> <span>{regions.length} regions monitored</span><span className="utc">31 Aug 2026 · 09:42 UTC</span></div></header>
}

function Score({ score }: { score: number }) { return <span className="score" style={{ color: getRiskColor(score) }}>{score}<small>/100</small></span> }

function FieldLog({ region, onClose }: { region: Region; onClose: () => void }) {
  const trend = region.trend.map((value, i) => ({ day: i + 1, value }))
  return <aside className="field-log"><div className="field-log-head"><span>Field log / {String(region.id).padStart(2, '0')}</span><button onClick={onClose} aria-label="Close field log"><X /></button></div><div className="field-log-body"><div className="log-kicker">Selected region</div><h2>{region.name}</h2><div className="coordinates"><MapPin /> {region.lat.toFixed(4)}° {region.lat >= 0 ? 'N' : 'S'} · {Math.abs(region.lng).toFixed(4)}° {region.lng >= 0 ? 'E' : 'W'}</div><div className="log-score"><div><span className="log-label">Risk score</span><Score score={region.riskScore} /></div><div className="risk-band" style={{ color: getRiskColor(region.riskScore) }}>{riskLabel(region.riskScore)}</div></div><div className="log-line"><span className="log-label">Primary threat</span><strong>{region.threatType}</strong></div><div className="trend"><div className="trend-head"><span className="log-label">30-day trend</span><span className="font-mono">{region.trend[29] > region.trend[0] ? '+' : ''}{region.trend[29] - region.trend[0]} pts</span></div><ResponsiveContainer width="100%" height={92}><LineChart data={trend}><Tooltip contentStyle={{ background: '#14181A', border: '1px solid rgba(234,228,214,.2)', color: '#EAE4D6', fontFamily: 'var(--font-mono)', fontSize: 11 }} /><Line type="monotone" dataKey="value" stroke={getRiskColor(region.riskScore)} strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer></div><div className="field-note"><span className="log-label">Field note</span><p>{regionSummary(region)}</p></div><div className="log-updated">Last reading <span>{region.lastUpdated}</span></div></div></aside>
}

function MapPanel({ selected, setSelected }: { selected: Region; setSelected: (region: Region) => void }) {
  return <div className="map-panel"><div className="map-grid" /><div className="map-raster" /><div className="map-label map-label-one">GLOBAL MONITORING GRID</div><div className="map-label map-label-two">N 75°</div><div className="map-label map-label-three">E 180°</div>{regions.map((region) => <button key={region.id} className={`map-marker ${region.riskScore >= 67 ? 'marker-critical' : ''} ${selected.id === region.id ? 'marker-selected' : ''}`} style={{ left: `${((region.lng + 180) / 360) * 100}%`, top: `${((75 - region.lat) / 120) * 100}%`, '--marker': getRiskColor(region.riskScore) } as React.CSSProperties} onClick={() => setSelected(region)} aria-label={`Select ${region.name}, risk ${region.riskScore}`}><span /></button>)}<div className="map-legend"><span><i style={{ background: '#5B7553' }} /> Low</span><span><i style={{ background: '#C98A4A' }} /> Moderate</span><span><i style={{ background: '#A6432D' }} /> High</span></div><div className="map-tools"><button aria-label="Center map"><Crosshair /></button><span>16 regions / 6 continents</span></div></div>
}

function RegionTable() {
  const [query, setQuery] = useState(''); const [filter, setFilter] = useState('All risk levels')
  const filtered = useMemo(() => regions.filter((region) => region.name.toLowerCase().includes(query.toLowerCase()) && (filter === 'All risk levels' || riskLabel(region.riskScore) === filter)).sort((a, b) => b.riskScore - a.riskScore), [query, filter])
  return <section className="region-table"><div className="table-head"><div><span className="section-label">Region register</span><h2>Monitored regions</h2></div><div className="table-controls"><label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search regions" aria-label="Search regions" /></label><div className="select-wrap"><select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter risk level"><option>All risk levels</option><option>High</option><option>Moderate</option><option>Low</option></select><ChevronDown /></div></div></div><div className="table-scroll"><table><thead><tr><th>Region</th><th>Risk score</th><th>Primary threat</th><th>Last reading</th></tr></thead><tbody>{filtered.map((region) => <tr key={region.id}><td><span className="row-id">{String(region.id).padStart(2, '0')}</span>{region.name}</td><td><Score score={region.riskScore} /></td><td>{region.threatType}</td><td className="font-mono">{region.lastUpdated}</td></tr>)}</tbody></table></div></section>
}

export default function GeoEcozDashboard() { const [selected, setSelected] = useState<Region>(regions[0]); const s = stats(); return <div className="console"><TopBar /><main><div className="intro"><div><span className="section-label">Earth observation / live</span><h1>A working view of<br />habitat risk.</h1><p>GeoEcoz brings remote sensing signals and field reports into one clear register for conservation teams.</p></div><Link href="/report" className="report-link"><FileText /> Report a threat <ArrowUpRight /></Link></div><div className="overview"><span>{s.activeThreats} active threats</span><span>{s.highRiskZones} high-risk zones</span><span>{s.reportsThisWeek} reports this week</span></div><div className="control-room"><MapPanel selected={selected} setSelected={setSelected} /><FieldLog region={selected} onClose={() => setSelected(regions[0])} /></div><RegionTable /></main></div> }

export function ReportConfirmation() { return <div className="confirmation"><Check /> Logged. GeoEcoz will route this to nearby monitoring stations.</div> }

export function AboutContent() { return <div className="about-copy"><span className="section-label">About GeoEcoz</span><h1>Signals become<br />field decisions.</h1><p>GeoEcoz is a small monitoring instrument for people protecting large, changing places. It watches the same landscape from several angles, then keeps the result plain enough to use during a patrol briefing.</p><p><span className="margin-note">data ingestion →</span>Satellite observations, thermal readings, forest-loss data, and reports from the field enter one register.</p><p><span className="margin-note">risk scoring →</span>Those signals are weighted into a score from 0 to 100. The score is a prompt to look closer, not a substitute for local knowledge.</p><p><span className="margin-note">field alerts →</span>Teams can see which regions need attention, open the supporting note, and send a new observation back into the system.</p></div> }

export function MapPage() { const [selected, setSelected] = useState(regions[0]); return <div className="console"><TopBar /><main><div className="intro compact"><div><span className="section-label">Map / global view</span><h1>Monitoring grid.</h1></div></div><div className="control-room map-page"><MapPanel selected={selected} setSelected={setSelected} /><FieldLog region={selected} onClose={() => setSelected(regions[0])} /></div></main></div> }

export { TopBar }
