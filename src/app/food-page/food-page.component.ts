import {Component, inject} from '@angular/core';
import {Food} from "../../models/food.model";
import {FoodDalService} from "../../service/food-dal.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {
  foods: Food[] = []
  dal: FoodDalService = inject(FoodDalService)
  router = inject(Router)

  showAll() {
    this.dal.selectAll().then((data) => {
      this.foods = data
      console.log(this.foods)
    }).catch((e) => {
      console.log(e)
      this.foods = []
    })
  }

  constructor() {
    this.showAll()
  }

  onModifyClick(foods: Food) {
    this.router.navigate([`/foodDetail/${foods.id}`])
  }

  onDeleteClick(food: Food) {
    this.dal.delete(food).then((data) => {
      this.showAll()
      alert("food deleted successfully")
    }).catch((e)=>{
      console.log(e)
    })
  }
}
