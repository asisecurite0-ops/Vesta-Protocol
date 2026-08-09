'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-white text-xs shadow-md">
            V
          </div>
          <span className="text-sm font-bold text-white tracking-wider">
            VESTA <span className="text-indigo-400 font-normal">Protocol</span>
          </span>
        </div>

        <p className="text-xs text-slate-500 text-center">
          © 2026 Vesta Protocol. Sécurisé par smart contracts sur Polygon Mainnet.
        </p>

        <div className="flex items-center gap-6 text-xs">
          {/* Liens de navigation interne */}
          <div className="flex space-x-6 text-slate-400">
            <Link href="/about" className="hover:text-indigo-400 transition">
              À propos
            </Link>
            <Link href="/terms" className="hover:text-indigo-400 transition">
              Conditions
            </Link>
            <Link href="/privacy" className="hover:text-indigo-400 transition">
              Confidentialité
            </Link>
            <Link href="/audit" className="hover:text-indigo-400 transition text-emerald-400 font-medium">
              Audit
            </Link>
          </div>

          <div className="h-4 w-[1px] bg-slate-800"></div>

          {/* Liens communautaires et externes */}
          <div className="flex space-x-4 text-slate-400">
            <a 
              href="https://discord.gg/XMW4dyVk4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition font-medium text-indigo-300"
            >
              Discord
            </a>
            <a 
              href="https://github.com/vestaprotocol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}