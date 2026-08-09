'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StatsOverview from '@/components/stats/StatsOverview';
import CircleGrid from '@/components/circles/CircleGrid';
import CircleDetailModal from '@/components/circles/CircleDetailModal';
import CreateCircleModal from '@/components/circles/CreateCircleModal';
import GuaranteeCard from '@/components/profile/GuaranteeCard';

// Exemple de structure typée pour un cercle
interface Circle {
  id: number;
  name: string;
  contribution: string;
  members: number;
  maxMembers: number;
  frequency: string;
  description: string;
  participantsList: string[];
}

export default function Home() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fonction appelée lors du déploiement ou de la mise à jour
  const handleAddCircle = (newCircle: Circle) => {
    setCircles(prev => [newCircle, ...prev]);
  };

  const handleJoinCircle = (id: number) => {
    setCircles(prev =>
      prev.map(circle =>
        circle.id === id ? { ...circle, members: circle.members + 1 } : circle
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full space-y-16">
        {/* Section Hero / Vue d'ensemble */}
        <section id="overview" className="pt-4">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 inline-block">
            Polygon Mainnet • Smart Contract Audité
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            L'Épargne Rotative <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Sans Intermédiaire & Sécurisée.
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg mb-8">
            Mettez en commun vos capitaux au sein de cercles cryptographiques autonomes. Transparence totale, exécution garantie par la blockchain.
          </p>
          <StatsOverview />
        </section>

        {/* Section de Gestion du Pool de Garantie */}
        <section id="guarantee" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <div className="lg:col-span-1">
              <GuaranteeCard />
            </div>
            <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md flex flex-col justify-center">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3 inline-block w-fit">
                Collatéral & Sécurité
              </span>
              <h2 className="text-2xl font-bold text-white mb-3">Pourquoi déposer une garantie ?</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Sur Vesta Protocol, la garantie est gérée indépendamment dans le <strong className="text-slate-200">GuaranteePool</strong>. En verrouillant un montant de collatéral, vous validez votre éligibilité tout en préservant votre solde pour les différentes actions du protocole.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Une fois votre garantie placée, vous pouvez déployer ou rejoindre des cercles librement.
              </p>
            </div>
          </div>
        </section>

        {/* Section des Cercles */}
        <section id="circles" className="pt-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">Cercles Disponibles</h2>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
            >
              + Déployer un Cercle
            </button>
          </div>
          <CircleGrid 
            circles={circles} 
            onJoinCircle={(id) => {
              const found = circles.find(c => c.id === id);
              if (found) setSelectedCircle(found);
            }} 
          />
        </section>

        {/* Section Gouvernance DAO */}
        <section id="governance" className="pt-8 pb-12">
          <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3 inline-block">
              DAO Vesta Protocol
            </span>
            <h2 className="text-2xl font-bold text-white mb-3">Gouvernance Décentralisée</h2>
            <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
              Les détenteurs de jetons de gouvernance peuvent voter sur les propositions d'évolution du protocole, les frais de réseau et l'intégration de nouveaux types de collatéraux.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modales */}
      {selectedCircle && (
        <CircleDetailModal 
          circle={selectedCircle} 
          onClose={() => setSelectedCircle(null)} 
          onJoin={handleJoinCircle} 
        />
      )}

      {isCreateModalOpen && (
        <CreateCircleModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreate={handleAddCircle} 
        />
      )}
    </div>
  );
}