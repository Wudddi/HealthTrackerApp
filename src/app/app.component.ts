import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from "./nav/nav.component";
import {ModalComponent} from "./modal/modal.component";
import {DatabaseService} from "../service/database.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  database:DatabaseService = inject(DatabaseService)
  title = 'FinalProject';
  constructor() {
    this.database.initDatabase()
  }
}
