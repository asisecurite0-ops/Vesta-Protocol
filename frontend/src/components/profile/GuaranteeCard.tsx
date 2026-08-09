'use client';

import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { GUARANTEE_POOL_ADDRESS, GUARANTEE_POOL_ABI } from '@/contracts/guaranteeConfig';

export default function GuaranteeCard() {
  const [amount, setAmount] = useState('100'); // Montant par défaut en USDC
  const { writeContract, isPending } = useWriteContract();

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    try {
      // 🚀 Conversion avec 6 décimales pour l'USDC et passage en argument du contrat
      const amountValue = parseUnits(amount, 6);

      writeContract({
        address: GUARANTEE_POOL_ADDRESS,
        abi: GUARANTEE_POOL_ABI,
        functionName: 'depositGuarantee',
        args: [amountValue], // Passage du montant en paramètre (standard ERC-20)
      }, {
        onSuccess: (hash) => {
          console.log("Transaction envoyée :", hash);
          alert("Dépôt de garantie en USDC initié avec succès !");
        },
        onError: (err) => {
          console.error("Détail de l'erreur wagmi :", err);
          alert("Erreur : " + err.message);
        }
      });
    } catch (err) {
      console.error("Erreur synchrone :", err);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
      <h3 className="text-xl font-bold text-white mb-2">Pool de Garantie (USDC)</h3>
      <p className="text-slate-400 text-sm mb-6">
        Déposez votre collatéral en USDC pour valider votre éligibilité et participer aux cercles d'épargne.
      </p>

      <form onSubmit={handleDeposit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5">Montant à bloquer (USDC)</label>
          <input 
            type="number" 
            step="1"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 rounded-2xl font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition cursor-pointer disabled:opacity-50"
        >
          {isPending ? 'Transaction en cours...' : 'Déposer la Garantie'}
        </button>
      </form>
    </div>
  );
}