import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/models-cryptage';

@Injectable({
  providedIn: 'root'
})
export class CryptageService {
  private readonly apiUrl = 'http://localhost:3000/messages'; // URL de votre JSON Server

  constructor(private http: HttpClient) {}

  // Crypter un message
  crypter(message: string, clee: number): string {
    return message.split(' ').map((mot, index) => {
      const nouvelleCle = clee + index * 2;
      return this.crypterMot(mot, nouvelleCle);
    }).join('-');
  }

  private crypterMot(mot: string, clee: number): string {
    return mot.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const base = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        return String.fromCharCode((char.charCodeAt(0) - base + clee) % 26 + base);
      }
      return char;
    }).join('');
  }

  // Décrypter un message
  decrypter(message: string, clee: number): string {
    return message.split('-').map((mot, index) => {
      const nouvelleCle = clee + index * 2;
      return this.decrypterMot(mot, nouvelleCle);
    }).join(' ');
  }

  private decrypterMot(mot: string, clee: number): string {
    return mot.split('').map(char => {
      if (char.match(/[a-zA-Z]/)) {
        const base = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        return String.fromCharCode((char.charCodeAt(0) - base - clee + 26) % 26 + base);
      }
      return char;
    }).join('');
  }

  // Sauvegarder un message dans db.json
  enregistrerMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

  // Obtenir tous les messages sauvegardés
  obtenirMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

 // Méthode pour supprimer un message
supprimerMessage(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);

  }
}
