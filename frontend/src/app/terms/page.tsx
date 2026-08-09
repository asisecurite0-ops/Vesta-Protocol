export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold border-b border-gray-800 pb-4">Conditions d'Utilisation</h1>
        <p className="text-sm text-gray-400">Dernière mise à jour : 2026</p>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-400">1. Acceptation des termes</h2>
          <p className="text-gray-300 leading-relaxed">
            En accédant et en utilisant Vesta Protocol, vous acceptez d'être lié par ces conditions d'utilisation et par toutes les lois et réglementations applicables en matière de finance décentralisée (DeFi).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-400">2. Utilisation du protocole</h2>
          <p className="text-gray-300 leading-relaxed">
            Vesta Protocol est une application décentralisée open-source interagissant avec des contrats intelligents sur la blockchain Polygon. Vous reconnaissez interagir directement avec la blockchain à vos propres risques.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-400">3. Absence de conseils financiers</h2>
          <p className="text-gray-300 leading-relaxed">
            Aucun contenu de cette plateforme ne constitue un conseil financier, juridique ou fiscal. L'utilisation des tontines et des coffrets de rendement comporte des risques inhérents liés aux cryptomonnaies.
          </p>
        </section>
      </div>
    </main>
  );
}