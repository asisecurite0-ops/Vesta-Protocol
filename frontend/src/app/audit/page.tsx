export default function AuditPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold border-b border-gray-800 pb-4">Sécurité & Audits</h1>
        <p className="text-gray-300">
          La sécurité des fonds de nos utilisateurs est la priorité absolue de Vesta Protocol. Nos contrats intelligents font l'objet d'évaluations rigoureuses.
        </p>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">Statut des Audits</h2>
          <p className="text-gray-300 text-sm">
            Les rapports complets d'analyse de code de nos smart contracts (Factory, GuaranteePool, YieldVault) sont disponibles ci-dessous :
          </p>
          <div className="pt-2">
            <a 
              href="https://github.com/vestaprotocol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Télécharger le rapport d'audit (PDF)
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}