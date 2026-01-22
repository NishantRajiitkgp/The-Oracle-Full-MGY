import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, CheckCircle2, AlertTriangle, XCircle, 
  Server, Clock, RefreshCw, ChevronDown, ChevronUp, 
  Mail, ArrowLeft, Shield, Zap, Database
} from 'lucide-react';

interface SystemStatusProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const GLOBAL_STATUS = 'Operational'; // Operational, Degraded, Partial Outage, Maintenance

const SERVICES = [
    { id: 'engine', name: 'Oracle Query Engine', status: 'Operational', uptime: '99.9%', group: 'Core' },
    { id: 'guides', name: 'Guides Chat System', status: 'Operational', uptime: '99.8%', group: 'Core' },
    { id: 'reports', name: 'Reports Generator', status: 'Degraded', uptime: '98.5%', group: 'Core', note: 'High latency in PDF generation' },
    { id: 'observatory', name: 'Observatory Feed', status: 'Operational', uptime: '100%', group: 'Data' },
    { id: 'transits', name: 'Transits Calculator', status: 'Operational', uptime: '99.9%', group: 'Data' },
    { id: 'corridor', name: 'Corridor Match Engine', status: 'Operational', uptime: '99.5%', group: 'Social' },
    { id: 'notify', name: 'Notifications Service', status: 'Operational', uptime: '100%', group: 'Social' },
    { id: 'payments', name: 'Billing & Access', status: 'Operational', uptime: '100%', group: 'Infrastructure' }
];

const INCIDENTS = [
    {
        id: 'inc1',
        title: 'Report Generation Latency',
        status: 'Investigating',
        date: 'Oct 24, 2026',
        duration: 'Ongoing',
        updates: [
            { time: '10:45 AM', text: 'We are observing slower than usual generation times for deep-dive PDF reports. The engineering team is scaling the render nodes.' }
        ]
    },
    {
        id: 'inc2',
        title: 'Observatory Data Sync Delay',
        status: 'Resolved',
        date: 'Oct 22, 2026',
        duration: '45 mins',
        updates: [
            { time: '02:30 PM', text: 'Issue resolved. Real-time transit data is now current.' },
            { time: '01:45 PM', text: 'Planetary positions are failing to update in the Observatory dashboard.' }
        ]
    },
    {
        id: 'inc3',
        title: 'Scheduled Maintenance: Database Upgrade',
        status: 'Completed',
        date: 'Oct 15, 2026',
        duration: '2 hours',
        updates: [
            { time: '04:00 AM', text: 'Maintenance completed successfully.' }
        ]
    }
];

const MAINTENANCE = [
    {
        title: 'Core System Optimization',
        date: 'Nov 01, 2026',
        window: '03:00 AM - 05:00 AM UTC',
        impact: 'Brief interruptions to chat services.'
    }
];

export const SystemStatus: React.FC<SystemStatusProps> = ({ onNavigate, onBack }) => {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [expandedIncident, setExpandedIncident] = useState<string | null>(INCIDENTS[0].id);

    useEffect(() => {
        let interval: any;
        if (autoRefresh) {
            interval = setInterval(() => {
                setLastUpdated(new Date());
            }, 30000); // 30s refresh simulation
        }
        return () => clearInterval(interval);
    }, [autoRefresh]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Operational': return 'text-green-600 bg-green-50 border-green-200';
            case 'Degraded': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Partial Outage': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'Major Outage': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-ink/60 bg-ink/5 border-ink/10';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Operational': return <CheckCircle2 size={14} />;
            case 'Degraded': return <Activity size={14} />;
            case 'Partial Outage': return <AlertTriangle size={14} />;
            default: return <XCircle size={14} />;
        }
    };

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1000px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8 gap-8"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">Home</button>
                            <ChevronDown size={10} className="-rotate-90" />
                            <span className="text-ink font-bold">System Status</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Operational Health</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                Live diagnostic of the Oracle's subsystems.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-ink/40">
                            <span>Auto-Refresh</span>
                            <button 
                                onClick={() => setAutoRefresh(!autoRefresh)}
                                className={`w-8 h-4 rounded-full relative transition-colors ${autoRefresh ? 'bg-green-500' : 'bg-ink/20'}`}
                            >
                                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${autoRefresh ? 'left-4.5' : 'left-0.5'}`}></div>
                            </button>
                        </div>
                        <div className="text-[10px] font-mono text-ink/30 flex items-center gap-2">
                            <RefreshCw size={10} className={autoRefresh ? "animate-spin-slow" : ""} />
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </div>
                    </div>
                </motion.div>

                {/* 2. GLOBAL STATUS CARD */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-8 border-l-4 shadow-sm flex items-start gap-6 ${
                        GLOBAL_STATUS === 'Operational' ? 'bg-green-50/50 border-green-500' : 
                        GLOBAL_STATUS === 'Degraded' ? 'bg-yellow-50/50 border-yellow-500' :
                        'bg-red-50/50 border-red-500'
                    }`}
                >
                    <div className={`p-3 rounded-full ${
                        GLOBAL_STATUS === 'Operational' ? 'bg-green-100 text-green-700' : 
                        GLOBAL_STATUS === 'Degraded' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                        <Activity size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif text-ink mb-2">All Systems Nominal</h2>
                        <p className="text-sm text-ink/60 leading-relaxed max-w-lg">
                            The Oracle Engine is operating within expected parameters. Resonance calibration is stable across all sectors.
                        </p>
                    </div>
                </motion.div>

                {/* 3. SERVICES TABLE */}
                <div className="space-y-6">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 flex items-center gap-2">
                        <Server size={12} /> Component Status
                    </h3>
                    
                    <div className="bg-white border border-ink/10 shadow-sm divide-y divide-ink/5">
                        {SERVICES.map((service) => (
                            <div key={service.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-paper-light transition-colors gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${service.status === 'Operational' ? 'bg-green-500' : service.status === 'Degraded' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></div>
                                    <div>
                                        <div className="text-sm font-bold text-ink">{service.name}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-ink/30">{service.group}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto">
                                    {service.note && (
                                        <span className="text-[10px] text-yellow-600 bg-yellow-50 px-2 py-1 rounded-sm border border-yellow-100">
                                            {service.note}
                                        </span>
                                    )}
                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-widest font-bold ${getStatusColor(service.status)}`}>
                                        {getStatusIcon(service.status)}
                                        {service.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. INCIDENT HISTORY & MAINTENANCE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Incidents */}
                    <div className="lg:col-span-8 space-y-6">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 flex items-center gap-2">
                            <Clock size={12} /> Incident Timeline
                        </h3>
                        
                        <div className="space-y-4">
                            {INCIDENTS.map((incident) => (
                                <div key={incident.id} className="bg-white border border-ink/10 p-6 shadow-sm">
                                    <div 
                                        className="flex justify-between items-start cursor-pointer"
                                        onClick={() => setExpandedIncident(expandedIncident === incident.id ? null : incident.id)}
                                    >
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm font-bold ${
                                                    incident.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                                                    incident.status === 'Investigating' ? 'bg-yellow-100 text-yellow-700' : 
                                                    'bg-ink/10 text-ink/50'
                                                }`}>
                                                    {incident.status}
                                                </span>
                                                <span className="text-xs font-mono text-ink/40">{incident.date}</span>
                                            </div>
                                            <h4 className="text-lg font-serif text-ink">{incident.title}</h4>
                                        </div>
                                        <div className="text-ink/40">
                                            {expandedIncident === incident.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedIncident === incident.id && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 mt-4 border-t border-ink/5 space-y-6">
                                                    {incident.updates.map((update, i) => (
                                                        <div key={i} className="flex gap-4 text-sm">
                                                            <div className="text-[10px] font-mono text-ink/40 w-16 pt-1">{update.time}</div>
                                                            <p className="text-ink/70 leading-relaxed flex-1">{update.text}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar: Maintenance & Subscribe */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Maintenance */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2">
                                <Database size={12} /> Maintenance Schedule
                            </h3>
                            {MAINTENANCE.map((item, i) => (
                                <div key={i} className="mb-4 last:mb-0">
                                    <div className="text-sm font-bold text-ink mb-1">{item.title}</div>
                                    <div className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">{item.date} • {item.window}</div>
                                    <p className="text-xs text-ink/60">{item.impact}</p>
                                </div>
                            ))}
                        </div>

                        {/* Subscribe */}
                        <div className="bg-ink text-paper p-6 shadow-lg">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-gold mb-4 flex items-center gap-2">
                                <Mail size={12} /> Signals & Alerts
                            </h3>
                            <p className="text-xs text-white/60 mb-4 leading-relaxed">
                                Receive immediate transmission when system health fluctuates.
                            </p>
                            <div className="space-y-3">
                                <input 
                                    type="email" 
                                    placeholder="Enter email address..." 
                                    className="w-full bg-white/10 border border-white/20 p-3 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                                />
                                <button className="w-full py-3 bg-gold text-ink text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

             </div>
        </div>
    );
};