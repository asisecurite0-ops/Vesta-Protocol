'use client';

import React from 'react';

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <span className="text-xs text-slate-400 font-mono block mb-1">Volume Global</span>
        <span className="text-2xl font-bold text-white font-mono">142k USDC</span>
      </div>
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <span className="text-xs text-slate-400 font-mono block mb-1">Cercles Actifs</span>
        <span className="text-2xl font-bold text-indigo-400 font-mono">4</span>
      </div>
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <span className="text-xs text-slate-400 font-mono block mb-1">Participants</span>
        <span className="text-2xl font-bold text-cyan-400 font-mono">584</span>
      </div>
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <span className="text-xs text-slate-400 font-mono block mb-1">Uptime</span>
        <span className="text-2xl font-bold text-emerald-400 font-mono">99.9%</span>
      </div>
    </div>
  );
}