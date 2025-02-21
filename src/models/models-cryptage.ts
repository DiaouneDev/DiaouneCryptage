export interface Message {
  id?: number; // id rendu optionnel pour que JSON Server puisse l'auto-générer
  message: string;
  clee: number; // Clé initiale fournie par l'utilisateur
  type: 'Cryptage' | 'Décryptage';
  resultat: string;
  date: string;
}
