import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Food} from "../models/food.model";

@Injectable({
  providedIn: 'root'
})
export class FoodDalService {
  database: DatabaseService = inject(DatabaseService)
  constructor() { }

  insert(food: Food): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["foods"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const foodsType= transaction.objectStore("foods");
      const req = foodsType.add(food);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: food added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Food[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["foods"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const foodsType = transaction.objectStore("foods");
      const req = foodsType.getAll();
      req.onsuccess = (event: any) => {
        resolve(event.target.result);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["foods"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const foodsType = transaction.objectStore("foods");

      const req = foodsType.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  update(food: Food): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["foods"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const foodsType = transaction.objectStore("foods");

      const reqUpdate = foodsType.put(food);

      reqUpdate.onsuccess = (event: any) => {
        console.log(`Success: data updated successfully: ${event}`);
        resolve(event);
      };

      reqUpdate.onerror = (event: any) => {
        console.log(`Error: failed to update: ${event}`);
        reject(event)
      };
    });
  }

  delete(food: Food): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["foods"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const foodsType = transaction.objectStore("foods");
      if (food.id) {
        const reqDelete = foodsType.delete(food.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("food does not have id")
      }
    });
  }
}
