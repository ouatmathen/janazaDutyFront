export const dossiers = [
  { id: 1, numero: '2025-0001', nom: 'DUPONT, Jean', dateDeces: '2025-09-01', statut: 'En cours', signaturesDone: 1, signaturesTotal: 2, dateNaissance: '1950-01-01', lieuNaissance: 'Paris', numeroActe: 'A-123', adresseFamille: '10 rue Exemple, 75000 Paris', contact: '+33 6 12 34 56 78' },
  { id: 2, numero: '2025-0002', nom: 'MARTIN, Claire', dateDeces: '2025-08-15', statut: 'Terminé', signaturesDone: 2, signaturesTotal: 2, dateNaissance: '1960-02-02', lieuNaissance: 'Lyon', numeroActe: 'B-456', adresseFamille: '20 rue Exemple, 69000 Lyon', contact: '+33 6 98 76 54 32' },
  { id: 3, numero: '2025-0003', nom: 'LEGRAND, Paul', dateDeces: '2025-09-10', statut: 'En cours', signaturesDone: 0, signaturesTotal: 1, dateNaissance: '1975-03-03', lieuNaissance: 'Marseille', numeroActe: 'C-789', adresseFamille: '30 rue Exemple, 13000 Marseille', contact: '+33 6 11 22 33 44' },
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: 4 + i,
    numero: `2025-${String(4 + i).padStart(4, '0')}`,
    nom: `Client ${i + 1}`,
    dateDeces: '2025-09-01',
    statut: i % 2 === 0 ? 'En cours' : 'Terminé',
    signaturesDone: i % 3,
    signaturesTotal: 2,
    dateNaissance: '1970-01-01',
    lieuNaissance: 'Ville',
    numeroActe: `X-${i}`,
    adresseFamille: 'Adresse',
    contact: ''
  }))
];
