import { Injectable } from '@angular/core';
import {Food} from "../models/food.model";
import {Drinking} from "../models/drinking.model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
  db : any;
  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("FoodTypeDB", 1);

      request.onerror = (event) => {
        console.error("Error in creating database!");
      };

      request.onsuccess = (event) => {
        console.log("onsuccess called");
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        console.log("onupgradeneeded called");
        // @ts-ignore
        this.db = event.target.result;
        const foodsType = this.db.createObjectStore("foods", {
          keyPath: "id",
          autoIncrement: true,
        });
        const recordDB = this.db.createObjectStore("records", {
          keyPath: "id",
          autoIncrement: true,
        });
        const drinkingType = this.db.createObjectStore("drinkings", {
          keyPath: "id",
          autoIncrement: true,
        });
        const initialFoods = [
          new Food('Bread', 266, 'https://icons.iconarchive.com/icons/icons8/ios7/256/Food-Bread-icon.png'),
          new Food('Hamburger', 450, 'https://icons.iconarchive.com/icons/icons8/windows-8/512/Food-Hamburger-icon.png'),
          new Food('Cheese', 328, 'https://icons.iconarchive.com/icons/icons8/ios7/512/Food-Cheese-icon.png')
        ];

        initialFoods.forEach(food => {
          foodsType.add({name: food.name, caloriesPerHundredGrams: food.caloriesPerHundredGrams, photo: food.photo});
        });

        const initialDrinkings = [
          new Drinking('Cafe', 300, 'https://icons.iconarchive.com/icons/tatice/cristal-intense/128/Java-icon.png'),
          new Drinking('Juice', 500, 'https://icons.iconarchive.com/icons/flat-icons.com/flat/512/Beer-icon.png'),
          new Drinking('Cola', 250, 'https://icons.iconarchive.com/icons/michael/coke-pepsi/512/Coca-Cola-Can-icon.png')
        ];

        initialDrinkings.forEach(drinking => {
          drinkingType.add({name: drinking.name, milliliters: drinking.milliliters, photo: drinking.photo});
        });
      };
    });
  }
  initDatabase(){
    this.createDatabase().then((data)=>{
      console.log("database created successfully: "+data)
    }).catch((e)=>{
      console.log("error in database creation: "+e.message)
    })
  }
}
