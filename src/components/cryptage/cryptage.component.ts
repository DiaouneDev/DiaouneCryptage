import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from '../../models/models-cryptage';
import { CryptageService } from '../../services/cryptage.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cryptage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './cryptage.component.html',
  styleUrls: ['./cryptage.component.scss']
})
export class CryptageComponent implements OnInit {

  cryptageForm!: FormGroup;
  resultat: string = ''; // Contiendra le résultat de l'opération
  messages: Message[] = []; // Historique des messages

  cryptageService = inject(CryptageService);

  ngOnInit(): void {
    this.initCryptageForm();
    this.chargerMessages();
    console.log('CryptageComponent initialized');
  }

  initCryptageForm(): void {
    this.cryptageForm = new FormGroup({
      message: new FormControl('', Validators.required),
      clee: new FormControl('', [Validators.required, Validators.min(1)]),
      type: new FormControl('Cryptage', Validators.required),
    });
  }

  executerOperation(): void {
    // Réinitialisation du résultat
    this.resultat = '';

    const { message, clee, type } = this.cryptageForm.value;
    const cleeNumber = parseInt(clee, 10);

    if (type === 'Cryptage') {
      this.resultat = this.cryptageService.crypter(message, cleeNumber);
    } else if (type === 'Décryptage') {
      this.resultat = this.cryptageService.decrypter(message, cleeNumber);
    }

    // Enregistrement du message dans la base via JSON Server
    const nouveauMessage: Omit<Message, 'id'> = {
      type,
      message,
      resultat: this.resultat,
      clee: cleeNumber,
      date: new Date().toISOString(),
    };

    this.cryptageService.enregistrerMessage(nouveauMessage).subscribe(() => {
      this.chargerMessages(); // Recharger l'historique après l'ajout
    });

    // Mise à jour du formulaire : on met à jour le champ message et on inverse le type
    this.cryptageForm.patchValue({
      message: this.resultat,
      type: type === 'Cryptage' ? 'Décryptage' : 'Cryptage'
    });
  }

  chargerMessages(): void {
    this.cryptageService.obtenirMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  // Supprimer une opération de l'historique
  supprimerOperation(id: number): void {
    this.cryptageService.supprimerMessage(id).subscribe(() => {
      this.chargerMessages(); // Recharger l'historique après la suppression
    });
  }
}
