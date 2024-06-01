import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Drinking} from "../models/drinking.model";

@Injectable({
  providedIn: 'root'
})
export class DrinkingDalService {
  database: DatabaseService = inject(DatabaseService)
  constructor() { }

  insert(drinking: Drinking): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["drinkings"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const drinkingsType= transaction.objectStore("drinkings");
      const req = drinkingsType.add(drinking);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: drinking added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Drinking[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["drinkings"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const drinkingsType = transaction.objectStore("drinkings");
      const req = drinkingsType.getAll();
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
      const transaction = this.database.db.transaction(["drinkings"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const drinkingsType = transaction.objectStore("drinkings");

      const req = drinkingsType.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  update(drinking: Drinking): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["drinkings"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const drinkingsType = transaction.objectStore("drinkings");

      const reqUpdate = drinkingsType.put(drinking);

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

  delete(drinking: Drinking): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["drinkings"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const drinkingsType = transaction.objectStore("drinkings");
      if (drinking.id) {
        const reqDelete = drinkingsType.delete(drinking.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("drinking does not have id")
      }
    });
  }
}
