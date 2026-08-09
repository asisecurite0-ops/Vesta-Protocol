'use client';

import React from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  return (
    <header className="border-b border-slate-800/60 bg-[#030712]/85 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-extrabold text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition duration-300">
            V
          </div>
          <span className="text-lg font-bold text-white tracking-widest">
            VESTA <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-semibold">PROTOCOL</span>
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
          <Link href="#overview" className="text-white hover:text-indigo-400 transition">Overview</Link>
          <Link href="#circles" className="hover:text-indigo-400 transition">Cercles</Link>
          <Link href="#governance" className="hover:text-indigo-400 transition">Gouvernance</Link>
        </nav>

        {/* Web3 Connect Button (Intégration RainbowKit) */}
        <div>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
                  })}
                >
                  {!connected ? (
                    <button
                      onClick={openConnectModal}
                      className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-xl transition duration-300 group-hover:opacity-100 opacity-85"></span>
                      <span className="relative px-5 py-2.5 rounded-xl bg-slate-950 text-white font-semibold text-sm flex items-center space-x-2 transition duration-300 group-hover:bg-transparent">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Connecter le portefeuille</span>
                      </span>
                    </button>
                  ) : chain.unsupported ? (
                    <button
                      onClick={openChainModal}
                      className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm hover:bg-red-500/20 transition cursor-pointer"
                    >
                      Réseau non supporté
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={openChainModal}
                        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-700 transition cursor-pointer"
                      >
                        {chain.hasIcon && (
                          <div style={{ background: chain.iconBackground, width: 12, height: 12, borderRadius: 999, overflow: 'hidden', marginRight: 4 }}>
                            {chain.iconUrl && (
                              <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 12, height: 12 }} />
                            )}
                          </div>
                        )}
                        <span>{chain.name}</span>
                      </button>

                      <button
                        onClick={openAccountModal}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold font-mono shadow-lg shadow-indigo-600/20 hover:opacity-90 transition cursor-pointer"
                      >
                        {account.displayName}
                      </button>
                    </div>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </header>
  );
}