import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ModalComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isOverlayVisible: boolean = false;

  toggleOverlay() {
    this.isOverlayVisible = !this.isOverlayVisible;
  }
}
