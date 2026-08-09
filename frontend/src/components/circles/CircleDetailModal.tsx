'use client';

import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { TONTINE_FACTORY_ADDRESS, TONTINE_FACTORY_ABI } from '@/contracts/tontineConfig';

interface CreateCircleModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function CreateCircleModal({ isOpen = true, onClose }: CreateCircleModalProps) {
  const [name, setName] = useState('');
  const [contribution, setContribution] = useState('50');
  const [frequency, setFrequency] = useState('Mensuel');
  const [maxMembers, setMaxMembers] = useState('5');
  const [description, setDescription] = useState('');

  // Hook Wagmi pour écrire sur la TontineFactory
  const { writeContract, isPending } = useWriteContract();

  // Empêche le blocage si la modale est fermée
  if (!isOpen) return null;

  const handleDeployContract = (e: React.FormEvent) => {
    e.preventDefault();

    // Conversion avec 6 décimales pour l'USDC
    const contributionValue = parseUnits(contribution || '0', 6);
    const membersValue = BigInt(parseInt(maxMembers) || 5);

    writeContract({
      address: TONTINE_FACTORY_ADDRESS,
      abi: TONTINE_FACTORY_ABI,
      functionName: 'createCircle',
      args: [name, contributionValue, membersValue],
    }, {
      onSuccess: () => {
        console.log("Cercle déployé avec succès sur le Mainnet Polygon (USDC) !");
        onClose();
      },
      onError: (error) => {
        console.error("Erreur lors du déploiement du cercle :", error);
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
        className="relative w-full max-w-xl p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden"
      >
        
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Déployer un Nouveau Cercle (USDC)</h2>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleDeployContract} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Nom du Cercle</label>
            <input 
              type="text"
              placeholder="ex: Cercle Gamma - Polygon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Cotisation (USDC)</label>
              <input 
                type="number"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Fréquence</label>
              <select 
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="Mensuel">Mensuel</option>
                <option value="Hebdomadaire">Hebdomadaire</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Capacité Max (Participants)</label>
            <select 
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="3">3 Membres</option>
              <option value="5">5 Membres</option>
              <option value="10">10 Membres</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
            <textarea 
              rows={3}
              placeholder="Décrivez l'objectif ou les conditions de ce cercle..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/25 transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? 'Déploiement en cours...' : 'Déployer le Smart Contract'}
          </button>
        </form>

      </div>
    </div>
  );
}