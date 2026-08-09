export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* En-tête */}
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block">
            Documentation Officielle
          </span>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">À propos de Vesta Protocol</h1>
          <p className="text-slate-400 text-lg">
            L'épargne rotative et décentralisée réinventée sur la blockchain Polygon.
          </p>
        </div>

        {/* Section 1 : C'est quoi ? */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">1. Qu'est-ce que Vesta Protocol ?</h2>
          <p className="text-slate-300 leading-relaxed">
            <strong>Vesta Protocol</strong> est une application décentralisée (dApp) open-source qui automatise les systèmes d'épargne rotative traditionnels (souvent appelés tontines ou "njangui") grâce aux contrats intelligents. 
          </p>
          <p className="text-slate-300 leading-relaxed">
            En éliminant les intermédiaires financiers, le protocole permet à des groupes de participants de mettre en commun leurs capitaux en toute transparence, avec une exécution garantie et immuable par la blockchain.
          </p>
        </section>

        {/* Section 2 : Comment ça marche ? */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">2. Comment fonctionne le protocole ?</h2>
          <div className="grid gap-4 pt-2">
            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl">
              <h3 className="text-lg font-medium text-white mb-2">🛡️ Le GuaranteePool</h3>
              <p className="text-slate-400 text-sm">
                Pour garantir la sécurité et l'engagement de chaque membre, le protocole s'appuie sur un système de collatéralisation indépendant. Chaque participant verrouille un montant de garantie afin de valider son éligibilité au sein des cercles.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl">
              <h3 className="text-lg font-medium text-white mb-2">🔄 Les Cercles d'Épargne</h3>
              <p className="text-slate-400 text-sm">
                Les utilisateurs peuvent déployer ou rejoindre des cercles définis par des contributions et des fréquences spécifiques. Les fonds tournent de manière autonome selon les règles programmées dans les smart contracts.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 : Sécurité & Polygon */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-indigo-400">3. Pourquoi Polygon Mainnet ?</h2>
          <p className="text-slate-300 leading-relaxed">
            Vesta Protocol est déployé sur le réseau <strong>Polygon</strong> pour offrir des frais de transaction minimes (gas fees) et une vitesse d'exécution optimale, tout en bénéficiant de la robustesse de sécurité d'Ethereum.
          </p>
        </section>

      </div>
    </main>
  );
}