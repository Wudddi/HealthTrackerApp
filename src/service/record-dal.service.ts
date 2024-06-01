import {inject, Injectable} from '@angular/core';
import {DatabaseService} from "./database.service";
import {Record} from "../models/record.model";

@Injectable({
  providedIn: 'root'
})
export class RecordDalService {

  database: DatabaseService = inject(DatabaseService)
  constructor() { }

  insert(record: Record): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["records"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: insert transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in insert transaction: " + event);
      };

      const recordStore= transaction.objectStore("records");
      const req = recordStore.add(record);

      req.onsuccess = (event: any) => {
        //returns the key of newly added item
        console.log(`Success: record added successfully ${event.target.result}`);
        resolve(event.target.result);
      };

      req.onerror = (event: any) => {
        console.log("Error: error in add: " + event);
        reject(event);
      };
    });
  }

  selectAll(): Promise<Record[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["records"]); //readonly

      transaction.oncomplete = (event: any) => {
        console.log("Success: selectAll transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in selectAll transaction: " + event);
      };

      const recordStore = transaction.objectStore("records");
      const req = recordStore.getAll();
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
      const transaction = this.database.db.transaction(["records"]); //readonly
      transaction.oncomplete = (event: any) => {
        console.log("Success: select transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in select transaction: " + event);
      };

      const recordStore = transaction.objectStore("records");

      const req = recordStore.get(id);
      req.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null);
      };
      req.onerror = (event: any) => {
        console.log("Error: error in select: " + event);
        reject(event);
      };
    });
  }

  update(record: Record): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["records"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: update transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in update transaction: " + event);
      };

      const recordStore = transaction.objectStore("records");

      const reqUpdate = recordStore.put(record);

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

  delete(record: Record): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.database.db.transaction(["records"], "readwrite");

      transaction.oncomplete = (event: any) => {
        console.log("Success: delete transaction successful");
      };
      transaction.onerror = (event: any) => {
        console.log("Error: error in delete transaction: " + event);
      };

      const recordStore = transaction.objectStore("records");
      if (record.id) {
        const reqDelete = recordStore.delete(record.id);
        reqDelete.onsuccess = (event: any) => {
          console.log(`Success: data deleted successfully: ${event}`);
          resolve(event);
        };
        reqDelete.onerror = (event: any) => {
          console.log(`Error: failed to delete: ${event}`);
          reject(event);
        };
      } else {
        reject("record does not have id")
      }
    });
  }
}
