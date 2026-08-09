export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold border-b border-gray-800 pb-4">Politique de Confidentialité</h1>
        <p className="text-sm text-gray-400">Dernière mise à jour : 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-400">1. Données collectées</h2>
          <p className="text-gray-300 leading-relaxed">
            Vesta Protocol est une interface décentralisée. Nous ne collectons aucune information personnelle identifiable (nom, e-mail, mot de passe). Seules les adresses de portefeuilles publics et les interactions de transactions on-chain nécessaires au fonctionnement des cercles sont traitées.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-400">2. Cookies et stockage local</h2>
          <p className="text-gray-300 leading-relaxed">
            L'application peut utiliser un stockage local (Local Storage) uniquement pour mémoriser l'état de connexion de votre portefeuille Web3 ou vos préférences d'affichage.
          </p>
        </section>
      </div>
    </main>
  );
}