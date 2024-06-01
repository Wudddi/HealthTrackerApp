import {Component, inject} from '@angular/core';
import {Food} from "../../models/food.model";
import {FoodDalService} from "../../service/food-dal.service";
import {Router} from "@angular/router";
import {DrinkingDalService} from "../../service/drinking-dal.service";
import {Drinking} from "../../models/drinking.model";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-drink-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './drink-page.component.html',
  styleUrl: './drink-page.component.css'
})
export class DrinkPageComponent {
  drinkings: Drinking[] = []
  dal: DrinkingDalService = inject(DrinkingDalService)
  router = inject(Router)
  showAll() {
    this.dal.selectAll().then((data) => {
      this.drinkings = data
      console.log(this.drinkings)
    }).catch((e) => {
      console.log(e)
      this.drinkings = []
    })
  }

  constructor() {
    this.showAll()
  }

  onModifyClick(drinking: Drinking) {
    this.router.navigate([`/drinkingDetail/${drinking.id}`])
  }

  onDeleteClick(drinking: Drinking) {
    this.dal.delete(drinking).then((data) => {
      this.showAll()
      alert("drinking deleted successfully")
    }).catch((e)=>{
      console.log(e)
    })
  }
}
