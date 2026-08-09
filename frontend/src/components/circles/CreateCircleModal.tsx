'use client';

import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { TONTINE_FACTORY_ADDRESS, TONTINE_FACTORY_ABI } from '@/contracts/tontineConfig';

interface CreateCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newCircle: {
    id: number;
    name: string;
    contribution: string;
    members: number;
    maxMembers: number;
    frequency: string;
    description: string;
    participantsList: string[];
  }) => void;
}

export default function CreateCircleModal({ isOpen, onClose, onCreate }: CreateCircleModalProps) {
  const [name, setName] = useState('');
  const [contribution, setContribution] = useState('');
  const [frequency, setFrequency] = useState('Mensuel');
  const [maxMembers, setMaxMembers] = useState('5');
  const [description, setDescription] = useState('');

  const { writeContract, isPending } = useWriteContract();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contribution) return;

    // 🚀 Conversion avec 6 décimales pour l'USDC sur Polygon Mainnet
    const contributionValue = parseUnits(contribution, 6);
    const maxMembersValue = BigInt(parseInt(maxMembers) || 5);

    writeContract({
      address: TONTINE_FACTORY_ADDRESS,
      abi: TONTINE_FACTORY_ABI,
      functionName: 'createCircle',
      args: [name, contributionValue, maxMembersValue],
    }, {
      onSuccess: () => {
        const newCircle = {
          id: Date.now(),
          name,
          contribution: `${contribution} USDC`, // 🚀 Affichage en USDC
          members: 1,
          maxMembers: parseInt(maxMembers) || 5,
          frequency,
          description: description || 'Cercle sécurisé en USDC sur le protocole.',
          participantsList: ['0x71C...3a92 (Créateur)'],
        };

        onCreate(newCircle);
        setName('');
        setContribution('');
        setDescription('');
        onClose();
      },
      onError: (error) => {
        console.error("Erreur lors du déploiement du cercle en USDC :", error);
      }
    });
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-lg p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl glow-indigo"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Déployer un Cercle (USDC)</h2>
          <button 
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Nom du Cercle</label>
            <input 
              type="text" 
              required
              placeholder="ex: Cercle USDC Mainnet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Cotisation (USDC)</label>
              <input 
                type="number" 
                step="1"
                required
                placeholder="100"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Fréquence</label>
              <select 
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="Mensuel">Mensuel</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Capacité Max (Participants)</label>
            <select 
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="3">3 Membres</option>
              <option value="5">5 Membres</option>
              <option value="10">10 Membres</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Description</label>
            <textarea 
              rows={3}
              placeholder="Décrivez l'objectif ou les conditions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 mt-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/25 transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? 'Validation en cours...' : 'Déployer avec USDC'}
          </button>
        </form>
      </div>
    </div>
  );
}