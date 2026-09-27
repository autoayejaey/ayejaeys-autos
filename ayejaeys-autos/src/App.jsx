import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, Users, DollarSign, Activity, CheckCircle2, Play, Settings, Plus, Trash2, 
  Edit3, ArrowUpRight, BarChart3, Mail, Video, Copy, ExternalLink, ShieldAlert,
  Search, Filter, ChevronRight, PhoneCall, MessageSquare, Send, Sparkles, RefreshCw,
  TrendingUp, Award, Clock, FileText, Check, AlertTriangle, Layers, Eye, Shield,
  Lock, Unlock, ChevronDown, Calendar, ArrowRight, Star, Sliders, CheckSquare
} from 'lucide-react';

const DEFAULT_CLIENTS = [
  { id: '1', name: 'SydCity Plumbing', contact: 'Dave Miller', email: 'dave@sydcityplumbing.com.au', phone: '0412 345 678', type: 'Trades', status: 'Active', retainer: 150, setupPaid: 500, onboardDate: '2026-01-15', leadsHandled: 142, lastActive: '10 mins ago' },
  { id: '2', name: 'Bondi Physio & Rehab', contact: 'Dr. Sarah Lin', email: 'sarah@bondiphysio.com.au', phone: '0498 765 432', type: 'Healthcare', status: 'Active', retainer: 250, setupPaid: 750, onboardDate: '2026-02-01', leadsHandled: 89, lastActive: '2 hours ago' },
  { id: '3', name: 'Melbourne Metro Electrics', contact: 'Chris Hemsworth', email: 'chris@mmelectrics.com.au', phone: '0422 111 222', type: 'Trades', status: 'Trial', retainer: 200, setupPaid: 500, onboardDate: '2026-03-10', leadsHandled: 34, lastActive: '1 day ago' },
  { id: '4', name: 'Brisbane Auto Repairs', contact: 'Mark Vance', email: 'mark@brisbaneauto.com.au', phone: '0455 666 777', type: 'Automotive', status: 'Active', retainer: 150, setupPaid: 500, onboardDate: '2026-02-20', leadsHandled: 67, lastActive: '5 mins ago' }
];

const DEFAULT_PIPELINE = [
  { id: 'p1', company: 'Perth Solar & Electrical', contact: 'Alex Reed', value: 200, stage: 'New Leads', dateAdded: '2026-03-20', phone: '0433 112 334', notes: 'Form submitted after 6pm receives no confirmation.' },
  { id: 'p2', company: 'Adelaide Chiropractic', contact: 'Dr. John Croft', value: 250, stage: 'Contacted', dateAdded: '2026-03-22', phone: '0411 998 877', notes: 'Sent Loom video showing 35% missed intake lead rate.' },
  { id: 'p3', company: 'Gold Coast Roofing Co', contact: 'Steve Rogers', value: 300, stage: 'Contacted', dateAdded: '2026-03-24', phone: '0422 334 455', notes: 'Reviewing proposal for instant SMS booking automation.' },
  { id: 'p4', company: 'Parramatta Legal Services', contact: 'Elena Rostova', value: 250, stage: 'Trial Started', dateAdded: '2026-03-25', phone: '0499 887 766', notes: '14-day free speed-to-lead trial active.' }
];

const SCRIPT_CATEGORIES = {
  Trades: {
    loomTitle: "60-Sec Speed-to-Lead Loom Pitch (Trade Services)",
    subject: "Quick question regarding quote inquiries on {{company}}",
    loomBody: `G'day {{contact}},

I was looking over {{company}} on Google and filled out your quote form after hours. I noticed an SMS confirmation didn't hit my phone right away.

When someone needs a plumber or electrician, 78% of customers hire the first business that responds. Taking 2 hours or overnight to reply means customers move on to a competitor.

I made a quick 60-second Loom recording showing how our Speed-to-Lead system texts leads back within 30 seconds to lock in bookings on autopilot:

[INSERT LOOM LINK HERE]

Happy to set this up for a 14-day free trial so you can see the bookings roll in.

Cheers,
AyeJaeys
AyeJaeys Automation Studio`,
    emailBody: `Hi {{contact}},

Quick question: what happens when a client submits a quote on {{company}} after 5 PM?

Most trade businesses lose 3 to 5 jobs a week simply because competitors answer first. We plug an automated SMS engine into your site that instantly texts new leads, confirms their job scope, and sends a direct calendar link.

Can I send over a quick 2-minute video showing how it works?

Best,
AyeJaeys`,
    smsBody: `Hi {{contact}}, noticed {{company}} takes a bit to reply to online quote requests after hours. We set up 30-sec automated SMS responses for Aussie tradies to lock in jobs fast. Worth a quick 60-sec video demo?`
  },
  Healthcare: {
    loomTitle: "Patient Intake Automation Pitch (Physio, Dental, Clinics)",
    subject: "Automating after-hours appointment bookings for {{company}}",
    loomBody: `Hi {{contact}},

Are you losing potential patients after hours because your reception line is closed?

At AyeJaeys Automation Studio, we plug a seamless intake engine into {{company}}'s website. Every time a new inquiry arrives:
1. It instantly texts a personal calendar booking link.
2. It logs patient intake details directly into your system.
3. It sends an automated reminder before the appointment.

Here is a 60-second breakdown of how it works:
[INSERT LOOM LINK HERE]

Let me know if you'd like to test this on a 14-day trial!

Best regards,
AyeJaeys`,
    emailBody: `Hi {{contact}},

When a patient searches for care after hours, they want to lock in an appointment immediately. If {{company}} makes them wait until 9 AM the next morning, many keep searching.

Our Speed-to-Lead integration confirms patient bookings via automated SMS in under 30 seconds.

Would you be open to seeing a 90-second live demo this week?

Best,
AyeJaeys`,
    smsBody: `Hi {{contact}}, loved the site for {{company}}! Quick question: do you have an automated SMS system that lets patients book appointments after hours?`
  },
  Legal: {
    loomTitle: "Client Intake & Retainer Pitch (Legal & Advisory)",
    subject: "Improving client intake response time for {{company}}",
    loomBody: `Hello {{contact}},

High-ticket legal inquiries require immediate response. If a prospective client reaches out to {{company}} and doesn't receive instant confirmation, they often call another firm.

Our intake workflow sends an immediate personalized SMS + Email response, captures key intake details, and schedules an initial consultation seamlessly.

I recorded a short Loom demo showing how it works:
[INSERT LOOM LINK HERE]

Best,
AyeJaeys`,
    emailBody: `Hello {{contact}},

Are potential legal clients slipping through the cracks outside office hours?

We help professional services implement immediate intake confirmation. The moment a web inquiry arrives, our system contacts the client, screens the inquiry, and books a consultation call.

Can I send a 2-minute video overview?

Regards,
AyeJaeys`,
    smsBody: `Hi {{contact}}, quick question for {{company}}: are prospective legal clients receiving instant automated intake confirmation when submitting forms online?`
  },
  RealEstate: {
    loomTitle: "Instant Lead Capture Pitch (Real Estate & Property)",
    subject: "Instant appraisal booking system for {{company}}",
    loomBody: `G'day {{contact}},

When vendors ask for a property appraisal on {{company}}, speed is everything. 

Our system triggers an instant SMS with an interactive appraisal booking link within 30 seconds of form submission. 

Check out this 60-second video demo:
[INSERT LOOM LINK HERE]

Cheers,
AyeJaeys`,
    emailBody: `Hi {{contact}},

Vendor inquiries for property appraisals are extremely time-sensitive. If {{company}} isn't responding in real-time, vendors move on to competing agencies.

Our Speed-to-Lead tool ensures every appraisal request receives an instant automated response and booking link.

Open to seeing a quick demo?

Best,
AyeJaeys`,
    smsBody: `Hi {{contact}}, noticed appraisal requests on {{company}} don't send instant SMS confirmations. We built a 30-sec response engine for real estate teams. Want a quick demo?`
  }
};

export default function App() {
  // Navigation & View Mode
  const [activePortal, setActivePortal] = useState('public'); // 'public' | 'admin'
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Public Tabs: 'demo' | 'calculator' | 'pricing' | 'case_studies'
  const [publicTab, setPublicTab] = useState('demo');
  
  // Admin Tabs: 'pipeline' | 'clients' | 'pitch' | 'logs'
  const [adminTab, setAdminTab] = useState('pipeline');

  // Persistent State
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('ayejaeys_clients_v2');
    return saved ? JSON.parse(saved) : DEFAULT_CLIENTS;
  });

  const [pipeline, setPipeline] = useState(() => {
    const saved = localStorage.getItem('ayejaeys_pipeline_v2');
    return saved ? JSON.parse(saved) : DEFAULT_PIPELINE;
  });

  const [automationLogs, setAutomationLogs] = useState(() => {
    return [
      { id: 'l1', time: '10:42:15 AM', event: 'Form Submitted', details: 'SydCity Plumbing - New Lead captured via Webhook', status: 'Success' },
      { id: 'l2', time: '10:42:16 AM', event: 'SMS Dispatched', details: 'Automated response sent to 0412***678 in 1.2s', status: 'Success' },
      { id: 'l3', time: '09:15:02 AM', event: 'Calendar Sync', details: 'Bondi Physio - Appointment booked by client', status: 'Success' }
    ];
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('ayejaeys_clients_v2', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('ayejaeys_pipeline_v2', JSON.stringify(pipeline));
  }, [pipeline]);

  // Toast Notification
  const [toast, setToast] = useState(null);
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const activeClients = clients.filter(c => c.status === 'Active' || c.status === 'Trial');
    const weeklyMRR = activeClients.reduce((acc, c) => acc + Number(c.retainer), 0);
    const monthlyMRR = weeklyMRR * 4.33;
    const totalSetups = clients.reduce((acc, c) => acc + Number(c.setupPaid || 0), 0);
    const totalLeads = clients.reduce((acc, c) => acc + Number(c.leadsHandled || 0), 0);

    return { weeklyMRR, monthlyMRR, totalSetups, totalLeads, activeCount: activeClients.length };
  }, [clients]);

  // Handle Admin Portal Auth
  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminPasswordInput === 'ayejaeys2026' || adminPasswordInput === 'admin') {
      setAdminAuthenticated(true);
      setShowAuthModal(false);
      setActivePortal('admin');
      setAdminPasswordInput('');
      triggerToast('Super-User Access Granted!');
    } else {
      alert('Invalid Master Key! Try entering: ayejaeys2026 or admin');
    }
  };

  const resetAllData = () => {
    if (window.confirm("Reset all client, pipeline, and settings data back to defaults?")) {
      setClients(DEFAULT_CLIENTS);
      setPipeline(DEFAULT_PIPELINE);
      localStorage.removeItem('ayejaeys_clients_v2');
      localStorage.removeItem('ayejaeys_pipeline_v2');
      triggerToast('System data reset to default state.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-[#8B5CF6] selection:text-white pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#151D2A] border border-[#06B6D4]/50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-[#06B6D4]" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#8B5CF6] via-[#06B6D4] to-[#10B981] p-0.5 shadow-lg shadow-[#8B5CF6]/20">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#06B6D4] fill-[#06B6D4]/20" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  AyeJaeys <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6]">Automation Studio</span>
                </h1>
                <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#06B6D4] border border-[#8B5CF6]/30">
                  AU B2B Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Automated Speed-to-Lead & High-Retention Client Systems</p>
            </div>
          </div>

          {/* PORTAL TOGGLE & ADMIN LOCK */}
          <div className="flex items-center gap-3">
            {activePortal === 'public' ? (
              <button
                onClick={() => {
                  if (adminAuthenticated) {
                    setActivePortal('admin');
                  } else {
                    setShowAuthModal(true);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#1E293B] hover:bg-[#334155] border border-white/10 text-slate-300 hover:text-white transition shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Super-User Portal
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePortal('public')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#06B6D4] hover:bg-[#06B6D4]/20 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Public Portal
                </button>
                <button
                  onClick={() => setAdminAuthenticated(false)}
                  className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition"
                  title="Lock Admin Session"
                >
                  <Unlock className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* AUTHENTICATION MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151D2A] border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#8B5CF6]" /> Super-User Access
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter master key password to access client management, pipeline CRM, and script tools.
              <br /><span className="text-[#06B6D4] font-mono">Master Key: ayejaeys2026 or admin</span>
            </p>
            <form onSubmit={handleAdminAuth} className="space-y-3">
              <input
                type="password"
                placeholder="Enter Master Key..."
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#06B6D4]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="w-1/2 py-2 rounded-xl border border-white/10 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-xs font-bold text-white shadow-lg"
                >
                  Unlock Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      {activePortal === 'public' ? (
        <PublicPortalView 
          publicTab={publicTab} 
          setPublicTab={setPublicTab} 
          triggerToast={triggerToast}
          logs={automationLogs}
          setLogs={setAutomationLogs}
        />
      ) : (
        <AdminPortalView 
          adminTab={adminTab} 
          setAdminTab={setAdminTab}
          metrics={metrics}
          clients={clients}
          setClients={setClients}
          pipeline={pipeline}
          setPipeline={setPipeline}
          logs={automationLogs}
          triggerToast={triggerToast}
          resetAllData={resetAllData}
        />
      )}
    </div>
  );
}

function PublicPortalView({ publicTab, setPublicTab, triggerToast, logs, setLogs }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#06B6D4] bg-[#06B6D4]/10 px-3.5 py-1.5 rounded-full border border-[#06B6D4]/30">
          The 30-Second Speed-to-Lead Engine
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Never Lose Another <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#8B5CF6] to-[#10B981]">High-Value Client</span> To Slow Responses
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          78% of Australian customers hire the first business that responds to their quote request. Our automated intake engine captures inquiries, texts customers back within 30 seconds, and locks in bookings automatically.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex justify-center border-b border-white/10 overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {[
            { id: 'demo', label: 'Live Speed-to-Lead Simulator', icon: Play },
            { id: 'calculator', label: 'Interactive ROI Calculator', icon: BarChart3 },
            { id: 'pricing', label: 'Retainer Packages', icon: DollarSign },
            { id: 'case_studies', label: 'Verified Aussie Case Studies', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = publicTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setPublicTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive 
                    ? 'bg-[#151D2A] text-[#06B6D4] border border-[#06B6D4]/30 shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: LIVE SIMULATOR */}
      {publicTab === 'demo' && (
        <SimulatorTab triggerToast={triggerToast} logs={logs} setLogs={setLogs} />
      )}

      {/* TAB 2: ROI CALCULATOR */}
      {publicTab === 'calculator' && (
        <CalculatorTab />
      )}

      {/* TAB 3: PRICING TIERS */}
      {publicTab === 'pricing' && (
        <PricingTab triggerToast={triggerToast} />
      )}

      {/* TAB 4: CASE STUDIES */}
      {publicTab === 'case_studies' && (
        <CaseStudiesTab />
      )}
    </div>
  );
}

function SimulatorTab({ triggerToast, logs, setLogs }) {
  const [formData, setFormData] = useState({
    name: 'Sarah Jenkins',
    phone: '0412 345 678',
    trade: 'SydCity Plumbing (Plumbing)',
    service: 'Emergency Hot Water Repair'
  });

  const [simState, setSimState] = useState('idle'); // 'idle' | 'running' | 'done'

  const handleRunSimulator = (e) => {
    e.preventDefault();
    setSimState('running');
    
    const newLog1 = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString(),
      event: 'Form Submitted',
      details: `${formData.trade} - Quote request received for ${formData.service}`,
      status: 'Success'
    };
    
    setLogs(prev => [newLog1, ...prev]);

    setTimeout(() => {
      const newLog2 = {
        id: (Date.now() + 1).toString(),
        time: new Date().toLocaleTimeString(),
        event: 'SMS Triggered',
        details: `Auto-SMS dispatched to ${formData.phone} in 1.4s`,
        status: 'Success'
      };
      setLogs(prev => [newLog2, ...prev]);
      setSimState('done');
      triggerToast('Automated SMS & Calendar Booking sent!');
    }, 1800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
      {/* Left Input Form */}
      <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="border-b border-white/10 pb-3 flex justify-between items-center">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-[#06B6D4]" /> Test Lead Inquiry Form
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">LIVE DEMO</span>
        </div>

        <form onSubmit={handleRunSimulator} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Lead Full Name</label>
            <input 
              type="text" required value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#06B6D4]"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Mobile Phone Number</label>
            <input 
              type="text" required value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#06B6D4]"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Select Demo Business</label>
            <select 
              value={formData.trade} onChange={e => setFormData({...formData, trade: e.target.value})}
              className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#06B6D4]"
            >
              <option>SydCity Plumbing (Trades)</option>
              <option>Bondi Physio & Rehab (Healthcare)</option>
              <option>Melbourne Metro Electrics (Electrical)</option>
              <option>Parramatta Legal (Legal Services)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Requested Service</label>
            <input 
              type="text" required value={formData.service}
              onChange={e => setFormData({...formData, service: e.target.value})}
              className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#06B6D4]"
            />
          </div>

          <button
            type="submit"
            disabled={simState === 'running'}
            className="w-full bg-gradient-to-r from-[#06B6D4] via-[#8B5CF6] to-[#10B981] text-white font-extrabold py-3 rounded-xl shadow-lg hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            {simState === 'running' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Triggering Instant Automation...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Fire 30-Second Automation Demo
              </>
            )}
          </button>
        </form>
      </div>

      {/* Right Simulated Phone Output */}
      <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="border-b border-white/10 pb-3 flex justify-between items-center">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#10B981]" /> Automated Lead Mobile Screen
          </h3>
          <span className="text-[10px] text-[#10B981] font-mono font-bold">SUB-30s RESPONSE</span>
        </div>

        {/* Mobile Mock Frame */}
        <div className="bg-[#05050A] border-2 border-white/10 rounded-3xl p-4 max-w-sm mx-auto shadow-2xl space-y-3">
          <div className="w-16 h-2.5 bg-white/10 rounded-full mx-auto mb-2"></div>

          {simState === 'idle' ? (
            <div className="h-56 flex items-center justify-center text-center text-slate-500 text-xs p-4">
              Click 'Fire 30-Second Automation Demo' on the left to test live SMS dispatch.
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              {/* Incoming SMS Bubble */}
              <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-3 space-y-1.5 animate-fade-in">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span className="font-bold text-[#06B6D4]">{formData.trade.split(' ')[0]} Automated Response</span>
                  <span>Just now</span>
                </div>
                <p className="text-slate-200">
                  G'day {formData.name}! Thanks for requesting a quote for <strong>{formData.service}</strong>.
                </p>
                <p className="text-slate-200">
                  We've received your inquiry. Tap below to pick an immediate consultation time slot on our calendar:
                </p>
                <div className="pt-1">
                  <span className="text-[#06B6D4] underline text-[11px] font-mono cursor-pointer">
                    book.ayejaeys.com.au/slot-392
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="bg-[#10B981]/10 border border-[#10B981]/30 p-2.5 rounded-xl text-[11px] text-[#10B981] flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Response Time: 1.4 seconds (Saved customer from calling competitor)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalculatorTab() {
  const [ticketValue, setTicketValue] = useState(650);
  const [missedCalls, setMissedCalls] = useState(12);
  const [weeklyRetainer, setWeeklyRetainer] = useState(150);

  const monthlyLostRevenue = missedCalls * ticketValue;
  const rescuedJobs = Math.ceil(missedCalls * 0.45); // 45% conversion of missed leads
  const rescuedMonthlyRevenue = rescuedJobs * ticketValue;
  const monthlyRetainerCost = weeklyRetainer * 4.33;
  const netMonthlyProfit = rescuedMonthlyRevenue - monthlyRetainerCost;

  return (
    <div className="max-w-4xl mx-auto bg-[#151D2A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#06B6D4]" /> Australian Business Lost Revenue Calculator
        </h3>
        <p className="text-xs text-slate-400">Calculate how much money your business loses every month to slow lead response times.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-slate-300 font-medium">Average Job / Client Value ($ AUD)</label>
              <span className="text-[#06B6D4] font-mono font-bold">${ticketValue} AUD</span>
            </div>
            <input 
              type="range" min="100" max="3000" step="50" value={ticketValue}
              onChange={e => setTicketValue(Number(e.target.value))}
              className="w-full accent-[#06B6D4]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-slate-300 font-medium">Missed Inquiries / After-Hours Form Fills per Month</label>
              <span className="text-[#06B6D4] font-mono font-bold">{missedCalls} inquiries</span>
            </div>
            <input 
              type="range" min="2" max="50" step="1" value={missedCalls}
              onChange={e => setMissedCalls(Number(e.target.value))}
              className="w-full accent-[#06B6D4]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-slate-300 font-medium">AyeJaeys Automation Weekly Retainer ($ AUD)</label>
              <span className="text-[#06B6D4] font-mono font-bold">${weeklyRetainer} AUD/wk</span>
            </div>
            <input 
              type="range" min="100" max="400" step="25" value={weeklyRetainer}
              onChange={e => setWeeklyRetainer(Number(e.target.value))}
              className="w-full accent-[#06B6D4]"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-[#0B0F17] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Estimated Net Profit Recovered</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-[#10B981] my-2">
              +${netMonthlyProfit.toLocaleString()} <span className="text-xs font-normal text-slate-400">AUD / mo</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              By automatically capturing missed inquiries in under 30 seconds, you recover ~<strong className="text-white">{rescuedJobs} extra closed jobs</strong> every month.
            </p>
          </div>

          <div className="space-y-2 text-xs border-t border-white/10 pt-4">
            <div className="flex justify-between text-slate-400">
              <span>Gross Revenue Lost Currently:</span>
              <span className="text-rose-400 font-mono font-bold">-${monthlyLostRevenue.toLocaleString()} AUD</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>AyeJaeys Monthly Retainer Fee:</span>
              <span className="text-slate-300 font-mono">-${monthlyRetainerCost.toFixed(0)} AUD</span>
            </div>
            <div className="flex justify-between font-bold text-[#06B6D4] pt-1 border-t border-white/5">
              <span>ROI Return Factor:</span>
              <span>{((rescuedMonthlyRevenue / monthlyRetainerCost) || 0).toFixed(1)}x Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingTab({ triggerToast }) {
  const tiers = [
    {
      name: 'Essential Speed-to-Lead',
      price: 150,
      setup: 500,
      desc: 'Ideal for local tradies and solo service providers.',
      features: ['Automated Instant SMS Auto-Responder', 'Google Lead Form Integration', 'Basic Email Booking Link Dispatch', 'Sub-30s Response Time Warranty']
    },
    {
      name: 'Growth Intake Engine',
      price: 250,
      setup: 750,
      popular: true,
      desc: 'For busy clinics, legal teams, and trade groups.',
      features: ['Everything in Essential', 'Dynamic Calendar Scheduling Sync', 'Automated SMS Appointment Reminders', 'Multi-User Staff Lead Alerting', 'Weekly Performance Analytics']
    },
    {
      name: 'Custom Enterprise Suite',
      price: 450,
      setup: 1200,
      desc: 'Complete CRM integration & multi-location support.',
      features: ['Everything in Growth Engine', 'Custom CRM Pipeline Integration', 'Database Reactivation Sequences', 'Dedicated Account Manager', '24/7 Priority Support']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {tiers.map((tier, idx) => (
        <div 
          key={idx} 
          className={`bg-[#151D2A] border rounded-2xl p-6 flex flex-col justify-between relative ${
            tier.popular ? 'border-[#06B6D4] shadow-2xl shadow-[#06B6D4]/10' : 'border-white/10'
          }`}
        >
          {tier.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-full shadow">
              Most Popular
            </span>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="text-base font-bold text-white">{tier.name}</h4>
              <p className="text-xs text-slate-400 mt-1">{tier.desc}</p>
            </div>

            <div className="border-y border-white/10 py-4">
              <div className="text-3xl font-extrabold text-white">
                ${tier.price} <span className="text-xs font-normal text-slate-400">AUD / week</span>
              </div>
              <div className="text-[11px] text-[#06B6D4] font-medium mt-1">
                +${tier.setup} AUD one-off setup fee
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300">
              {tier.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => triggerToast(`Selected ${tier.name}! Booking consultation...`)}
            className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition ${
              tier.popular 
                ? 'bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-white shadow-lg' 
                : 'bg-[#1E293B] hover:bg-[#334155] text-slate-200'
            }`}
          >
            Lock In 14-Day Free Trial
          </button>
        </div>
      ))}
    </div>
  );
}

function CaseStudiesTab() {
  const reviews = [
    {
      company: 'SydCity Plumbing',
      location: 'Sydney, NSW',
      author: 'Dave Miller (Owner)',
      stat: '+38% Closed Quote Rate',
      quote: "Before AyeJaeys Automation, we were missing 10+ quote requests a week when our plumbers were on job sites. Now clients get an SMS in 10 seconds and book right in."
    },
    {
      company: 'Bondi Physio & Rehab',
      location: 'Bondi, NSW',
      author: 'Dr. Sarah Lin',
      stat: 'Saved 14 hrs/wk Admin Time',
      quote: "Patients searching for physios after 6 PM were leaving for other clinics. This Speed-to-Lead integration secured $3,200 AUD in extra bookings in our first 30 days."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {reviews.map((r, i) => (
        <div key={i} className="bg-[#151D2A] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-white text-sm">{r.company}</h4>
              <span className="text-[11px] text-slate-400">{r.location} • {r.author}</span>
            </div>
            <span className="bg-[#10B981]/20 text-[#10B981] text-[11px] font-extrabold px-2.5 py-1 rounded-md border border-[#10B981]/30">
              {r.stat}
            </span>
          </div>
          <p className="text-xs text-slate-300 italic leading-relaxed">
            "{r.quote}"
          </p>
        </div>
      ))}
    </div>
  );
}

function AdminPortalView({ 
  adminTab, setAdminTab, metrics, clients, setClients, pipeline, setPipeline, 
  logs, triggerToast, resetAllData 
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Top Admin Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Weekly MRR</span>
            <DollarSign className="w-4 h-4 text-[#06B6D4]" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            ${metrics.weeklyMRR.toLocaleString()} <span className="text-xs text-slate-400 font-normal">AUD/wk</span>
          </div>
          <span className="text-[11px] text-[#10B981] font-semibold">${metrics.monthlyMRR.toFixed(0).toLocaleString()} AUD/mo Run-Rate</span>
        </div>

        <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Retainers</span>
            <Users className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {metrics.activeCount} <span className="text-xs text-slate-400 font-normal">Clients</span>
          </div>
          <span className="text-[11px] text-slate-400">Total Setup Revenue: ${metrics.totalSetups} AUD</span>
        </div>

        <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Processed Leads</span>
            <Activity className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {metrics.totalLeads} <span className="text-xs text-slate-400 font-normal">Captured</span>
          </div>
          <span className="text-[11px] text-[#06B6D4]">Sub-30s Response Rate</span>
        </div>

        <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Status</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
          </div>
          <div className="text-xs font-bold text-[#10B981]">Webhooks Live & Operational</div>
          <button 
            onClick={resetAllData}
            className="text-[10px] text-slate-500 hover:text-rose-400 flex items-center gap-1 transition mt-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset Local Data
          </button>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {[
            { id: 'pipeline', label: 'Outreach Pipeline CRM', icon: Layers },
            { id: 'clients', label: 'Retainer Client Manager', icon: Users },
            { id: 'pitch', label: 'Loom & Script Generator', icon: Video },
            { id: 'logs', label: 'System Webhook Logs', icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive 
                    ? 'bg-[#151D2A] text-[#06B6D4] border border-[#06B6D4]/30 shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ADMIN TAB 1: PIPELINE CRM */}
      {adminTab === 'pipeline' && (
        <AdminPipelineTab pipeline={pipeline} setPipeline={setPipeline} triggerToast={triggerToast} />
      )}

      {/* ADMIN TAB 2: CLIENT RETAINERS */}
      {adminTab === 'clients' && (
        <AdminClientsTab clients={clients} setClients={setClients} triggerToast={triggerToast} />
      )}

      {/* ADMIN TAB 3: LOOM & SCRIPT GENERATOR */}
      {adminTab === 'pitch' && (
        <AdminPitchTab triggerToast={triggerToast} />
      )}

      {/* ADMIN TAB 4: WEBHOOK LOGS */}
      {adminTab === 'logs' && (
        <AdminLogsTab logs={logs} />
      )}
    </div>
  );
}

function AdminPipelineTab({ pipeline, setPipeline, triggerToast }) {
  const stages = ['New Leads', 'Contacted', 'Trial Started', 'Retainer Signed', 'Closed-Lost'];

  const moveStage = (id, newStage) => {
    setPipeline(pipeline.map(p => p.id === id ? { ...p, stage: newStage } : p));
    triggerToast(`Moved prospect to ${newStage}`);
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProspect, setNewProspect] = useState({ company: '', contact: '', phone: '', value: 200, notes: '' });

  const handleAddProspect = (e) => {
    e.preventDefault();
    if (!newProspect.company || !newProspect.contact) return;
    const item = {
      ...newProspect,
      id: Date.now().toString(),
      stage: 'New Leads',
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setPipeline([item, ...pipeline]);
    setShowAddModal(false);
    setNewProspect({ company: '', contact: '', phone: '', value: 200, notes: '' });
    triggerToast('Added prospect to pipeline!');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-[#151D2A] p-4 rounded-xl border border-white/10 text-xs">
        <span className="text-slate-400">Manage B2B lead opportunities across sales stages.</span>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Lead Opportunity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const items = pipeline.filter(p => p.stage === stage);
          return (
            <div key={stage} className="bg-[#151D2A] border border-white/10 rounded-2xl p-3 min-w-[210px] flex flex-col">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10 text-xs">
                <span className="font-bold text-white uppercase tracking-wider">{stage}</span>
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-300">{items.length}</span>
              </div>

              <div className="space-y-3 flex-1">
                {items.map(item => (
                  <div key={item.id} className="bg-[#0B0F17] border border-white/5 rounded-xl p-3 space-y-2 hover:border-[#06B6D4]/30 transition text-xs">
                    <div className="font-bold text-white">{item.company}</div>
                    <div className="text-[11px] text-slate-400">{item.contact} • {item.phone}</div>
                    <div className="text-[10px] text-slate-400 bg-white/5 p-1.5 rounded">{item.notes}</div>
                    <div className="flex justify-between items-center pt-1 border-t border-white/5">
                      <span className="font-extrabold text-[#10B981]">${item.value} AUD/wk</span>
                      <div className="flex gap-1">
                        {stage !== stages[stages.length - 1] && (
                          <button
                            onClick={() => moveStage(item.id, stages[stages.indexOf(stage) + 1])}
                            className="p-1 bg-[#8B5CF6]/20 text-[#06B6D4] hover:bg-[#8B5CF6] hover:text-white rounded transition"
                            title="Advance Stage"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151D2A] border border-white/20 rounded-2xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-base font-bold text-white">Add B2B Lead Opportunity</h3>
            <form onSubmit={handleAddProspect} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Company Name</label>
                <input 
                  type="text" required value={newProspect.company}
                  onChange={e => setNewProspect({...newProspect, company: e.target.value})}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Contact Name</label>
                <input 
                  type="text" required value={newProspect.contact}
                  onChange={e => setNewProspect({...newProspect, contact: e.target.value})}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Phone Number</label>
                  <input 
                    type="text" value={newProspect.phone}
                    onChange={e => setNewProspect({...newProspect, phone: e.target.value})}
                    className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Target Retainer ($ AUD)</label>
                  <input 
                    type="number" value={newProspect.value}
                    onChange={e => setNewProspect({...newProspect, value: Number(e.target.value)})}
                    className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Notes / Missing Workflow Audit</label>
                <textarea 
                  value={newProspect.notes}
                  onChange={e => setNewProspect({...newProspect, notes: e.target.value})}
                  className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white h-20"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  type="button" onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2 rounded-xl border border-white/10 text-slate-400"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white font-bold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminClientsTab({ clients, setClients, triggerToast }) {
  const handleDelete = (id) => {
    if (window.confirm("Delete client from retainer records?")) {
      setClients(clients.filter(c => c.id !== id));
      triggerToast("Client removed.");
    }
  };

  return (
    <div className="bg-[#151D2A] border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0B0F17] text-slate-400 uppercase tracking-wider border-b border-white/10">
            <tr>
              <th className="p-4">Business</th>
              <th className="p-4">Industry</th>
              <th className="p-4">Retainer Rate</th>
              <th className="p-4">Setup Paid</th>
              <th className="p-4">Status</th>
              <th className="p-4">Leads Handled</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {clients.map(c => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-semibold text-white">
                  <div>{c.name}</div>
                  <div className="text-[11px] text-slate-400 font-normal">{c.contact} • {c.phone}</div>
                </td>
                <td className="p-4">{c.type}</td>
                <td className="p-4 font-bold text-[#06B6D4]">${c.retainer} AUD/wk</td>
                <td className="p-4 text-[#10B981]">${c.setupPaid} AUD</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    c.status === 'Active' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#06B6D4]/20 text-[#06B6D4]'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 font-mono">{c.leadsHandled}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(c.id)} className="text-slate-400 hover:text-rose-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminPitchTab({ triggerToast }) {
  const [category, setCategory] = useState('Trades');
  const [company, setCompany] = useState('Parramatta Roofing');
  const [contact, setContact] = useState('Mark Johnson');

  const currentScript = SCRIPT_CATEGORIES[category] || SCRIPT_CATEGORIES.Trades;

  const replacePlaceholders = (text) => {
    return text.replaceAll('{{company}}', company).replaceAll('{{contact}}', contact);
  };

  const copyToClipboard = (txt) => {
    navigator.clipboard.writeText(txt);
    triggerToast("Copied script template to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Video className="w-4 h-4 text-[#06B6D4]" /> Interactive Loom Pitch & Script Builder
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Industry Category</label>
            <select 
              value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
            >
              <option value="Trades">Trades & Home Services</option>
              <option value="Healthcare">Healthcare & Clinics</option>
              <option value="Legal">Legal & Professional</option>
              <option value="RealEstate">Real Estate & Property</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Target Business Name</label>
            <input 
              type="text" value={company} onChange={e => setCompany(e.target.value)}
              className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Contact Person</label>
            <input 
              type="text" value={contact} onChange={e => setContact(e.target.value)}
              className="w-full bg-[#0B0F17] border border-white/10 rounded-xl px-3 py-2 text-white"
            />
          </div>
        </div>
      </div>

      {/* Loom Video Script Box */}
      <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-6 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-white text-xs text-[#06B6D4]">{currentScript.loomTitle}</h4>
          <button 
            onClick={() => copyToClipboard(replacePlaceholders(currentScript.loomBody))}
            className="bg-[#8B5CF6]/20 hover:bg-[#8B5CF6] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Loom Script
          </button>
        </div>
        <pre className="bg-[#0B0F17] border border-white/5 rounded-xl p-4 text-xs font-mono text-slate-300 whitespace-pre-wrap">
          {replacePlaceholders(currentScript.loomBody)}
        </pre>
      </div>

      {/* Cold Email Script Box */}
      <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-6 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-white text-xs text-[#10B981]">Cold Email Pitch Copy</h4>
          <button 
            onClick={() => copyToClipboard(`Subject: ${replacePlaceholders(currentScript.subject)}\n\n${replacePlaceholders(currentScript.emailBody)}`)}
            className="bg-[#10B981]/20 hover:bg-[#10B981] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" /> Copy Email Copy
          </button>
        </div>
        <div className="bg-[#0B0F17] border border-white/5 rounded-xl p-4 text-xs font-mono text-slate-300 space-y-2">
          <div className="text-[#06B6D4] font-bold">Subject: {replacePlaceholders(currentScript.subject)}</div>
          <div className="whitespace-pre-wrap">{replacePlaceholders(currentScript.emailBody)}</div>
        </div>
      </div>
    </div>
  );
}

function AdminLogsTab({ logs }) {
  return (
    <div className="bg-[#151D2A] border border-white/10 rounded-2xl p-6 space-y-4">
      <h3 className="font-bold text-white text-sm flex items-center gap-2">
        <Activity className="w-4 h-4 text-[#10B981]" /> Simulated Webhook Trigger Logs
      </h3>
      <div className="space-y-2 font-mono text-xs">
        {logs.map((log) => (
          <div key={log.id} className="bg-[#0B0F17] border border-white/5 rounded-xl p-3 flex justify-between items-center text-slate-300">
            <div>
              <span className="text-[#06B6D4] font-bold">[{log.time}]</span> <span className="text-white font-semibold">{log.event}</span> — {log.details}
            </div>
            <span className="bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold px-2 py-0.5 rounded">
              {log.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}