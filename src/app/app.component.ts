import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CryptageComponent } from '../components/cryptage/cryptage.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CryptageComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CryptoCesar';
}
