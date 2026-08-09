'use client';

import React from 'react';

interface CircleCardProps {
  circle: {
    id: number;
    name: string;
    contribution: string;
    members: number;
    maxMembers: number;
    frequency: string;
    description: string;
  };
  onJoin: () => void;
}

export default function CircleCard({ circle, onJoin }: CircleCardProps) {
  const isFull = circle.members >= circle.maxMembers;
  const rawProgress = circle.maxMembers > 0 ? (circle.members / circle.maxMembers) * 100 : 0;
  const progressPercent = Math.min(100, Math.max(0, rawProgress));

  return (
    <div className="p-7 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md glow-card flex flex-col justify-between relative overflow-hidden group">
      {/* Effet lumineux discret au survol */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/25 transition duration-500"></div>

      <div>
        <div className="flex justify-between items-start mb-5">
          <span className="text-[11px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
            {circle.frequency}
          </span>
          <span className="text-sm font-mono text-cyan-300 font-bold bg-cyan-950/40 px-3 py-1 rounded-xl border border-cyan-500/20">
            {circle.contribution}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-300 transition">
          {circle.name}
        </h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed font-normal">
          {circle.description}
        </p>
      </div>

      <div>
        <div className="mb-5">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
            <span>Participants : <strong className="text-white">{circle.members}</strong>/{circle.maxMembers}</span>
            <span className="text-indigo-400">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-950/80 rounded-full overflow-hidden p-[1px] border border-slate-800">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700 shadow-sm shadow-indigo-500/50" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={onJoin}
          disabled={isFull}
          aria-disabled={isFull}
          className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
            isFull 
              ? 'bg-slate-900/50 text-slate-600 border border-slate-800/50 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-xl shadow-indigo-600/20 active:scale-[0.98] cursor-pointer'
          }`}
        >
          {isFull ? 'Cercle Complet' : 'Rejoindre le Cercle'}
        </button>
      </div>
    </div>
  );
}