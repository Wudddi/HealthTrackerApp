import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {NavigationStart, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() showOverlay: boolean = false;

  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart && this.showOverlay) {
        this.closeOverlay();
      }
    });
  }

  closeOverlay(): void {
    this.showOverlay = false;
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
