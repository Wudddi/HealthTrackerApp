import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ShakeServiceService} from "../../service/shake-service.service";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {FoodDalService} from "../../service/food-dal.service";
import {Food} from "../../models/food.model";

@Component({
  selector: 'app-random-page',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './random-page.component.html',
  styleUrl: './random-page.component.css'
})
export class RandomPageComponent  implements OnDestroy {
  shakeService=inject(ShakeServiceService)
  isShaking:boolean =false
  subscription: Subscription;
  foodDal: FoodDalService = inject(FoodDalService)
  foods: Food[] = []
  food: Food =new Food("",0)
  constructor() {
    this.foodDal.selectAll().then((data) => {
      this.foods = data
      console.log(this.foods)
    }).catch((e) => {
      console.log(e)
      this.foods = []
    })
    this.subscription = this.shakeService.watchAcceleration().subscribe(shake => {
      this.isShaking = shake;
      this.selectRandomFood();
    });
  }
  selectRandomFood(): void {
    const randomIndex = Math.floor(Math.random() * this.foods.length);
    const randomFood = this.foods[randomIndex];
    this.food = randomFood;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
