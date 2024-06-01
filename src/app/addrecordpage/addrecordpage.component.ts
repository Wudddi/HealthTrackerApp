import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Food} from "../../models/food.model";
import {Record} from "../../models/record.model";
import {GeoService} from "../../service/geo.service";
import {FoodDalService} from "../../service/food-dal.service";
import {DrinkingDalService} from "../../service/drinking-dal.service";
import {Drinking} from "../../models/drinking.model";
import {RecordDalService} from "../../service/record-dal.service";
import {Router} from "@angular/router";

declare const H:any

@Component({
  selector: 'app-addrecordpage',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './addrecordpage.component.html',
  styleUrl: './addrecordpage.component.css'
})
export class AddrecordpageComponent {
  foods: Food[] = []
  drinkings:Drinking[]=[]
  record: Record= new Record();
  geoService = inject(GeoService)
  foodDal: FoodDalService = inject(FoodDalService)
  drinkingDal: DrinkingDalService = inject(DrinkingDalService)
  recordDal:RecordDalService=inject(RecordDalService)
  lat: any
  lon: any
  isHidden: boolean = true
  showFoods: boolean = false;
  showDrinkings: boolean = false;
  totalCalories:number=0
  totalMilliliterWaterTake:number=0
  MAX_WEIGHT:number=500;
  router = inject(Router)
  constructor() {
    this.foodDal.selectAll().then((data) => {
      this.foods = data
      console.log(this.foods)
    }).catch((e) => {
      console.log(e)
      this.foods = []
    })
    this.drinkingDal.selectAll().then((data) => {
      this.drinkings = data
      console.log(this.foods)
    }).catch((e) => {
      console.log(e)
      this.foods = []
    })
  }
  getLocationOnclick() {
    this.isHidden = false;
    this.geoService.getCurrentLocation().then((data) => {
      if (!this.record.location) {
        this.record.location = { latitude: 0, longitude: 0 };
      }
      this.lat = data.lat
      this.lon = data.lon
      this.record.location.latitude = data.lat;
      this.record.location.longitude = data.lon;
      console.log(data)
      this.showMap()
    }).catch((e) => {
      console.log(e)
    })
  }

  public showMap() {
    console.log("showing map: ")
    document.getElementById('mapContainer')!.innerHTML = '';

    var platform = new H.service.Platform({
      'apikey': 'q1nkHS1xbdqwiWEHwT9L9MIhfbDyLcd6RXSi6C4XD2A'
    });
    var maptypes = platform.createDefaultLayers();

    var options = {
      zoom: 15,
      center: {
        lat: this.lat, lng: this.lon
      }
    };
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );

    var icon = new H.map.Icon('assets/img/img_1.png');
    var marker = new H.map.Marker({
      lat: this.lat, lng: this.lon
    }, {icon: icon});
    map.addObject(marker);
  }

  onFoodCheckboxChange() {
    this.showFoods = !this.showFoods
    console.log('Checkbox value:', this.showFoods);
  }
  onDrinkingCheckboxChange() {
    this.showDrinkings = !this.showDrinkings
    console.log('Checkbox value:', this.showFoods);
  }

  addFoodToIntake(foodId: number | undefined, intakeGrams: number | undefined,Name:any|undefined) {
    if (foodId !== undefined && intakeGrams !== undefined && intakeGrams > 0) {
      //Check to see if there is already a record of this food intake
      const existingIntakeIndex = this.record.foodIntakes.findIndex(intake => intake.foodId === foodId);
      //If it already exists, update the gram count
      if (existingIntakeIndex !== -1) {
        this.record.foodIntakes[existingIntakeIndex].grams += intakeGrams;
        console.log("update the gram count")
      } else {
        // If not, create a new intake record
        this.record.foodIntakes.push({ foodId, grams: intakeGrams,foodName:Name});
        console.log("create a new intake record")
      }
    } else {
      console.error('Invalid foodId or intakeGrams');
    }
  }

  addDrinkingIntake(drinkingId: number,name:any,milliliters:number): void {
    // Check if the drink is already in the array
    const existingDrinkIndex = this.record.drinkIntakes.findIndex(drink => drink.drinkId === drinkingId);

    // If it's not already there, add it
    if (existingDrinkIndex === -1) {
      this.record.drinkIntakes.push({ drinkId: drinkingId,drinkingName:name,milliliters:milliliters});
      console.log("create a new intake record")
    } else {
      const result=confirm("You want another one?");
      if(result){
        this.record.drinkIntakes.push({ drinkId: drinkingId,drinkingName:name,milliliters:milliliters});
        console.log("create a same intake record")
      }
    }
  }

  CalculateTotalCalories(id: number | undefined) {
    // Initialize totalCalories to 0
    this.totalCalories = 0;
    // Store the promises in an array
    let promises = this.record.foodIntakes.map(intake => {
      return this.foodDal.select(intake.foodId).then((data) => {
        // Make sure data and grams are defined and are numbers
        if(data && 'caloriesPerHundredGrams' in data && intake.grams) {
          return (data.caloriesPerHundredGrams * intake.grams) / 100;
        }
        return 0;
      });
    });
    // Wait for all promises to resolve
    Promise.all(promises).then(results => {
      // Sum up all the calories
      this.totalCalories = results.reduce((sum, calories) => sum + calories, 0);
      this.record.totalCalories =this.totalCalories
      console.log(this.totalCalories);
    }).catch(error => {
      console.error('Error calculating total calories:', error);
    });
  }

  CalculateTotalMilliliters(id: number | undefined) {
  this.totalMilliliterWaterTake=0
    let promises = this.record.drinkIntakes.map(intake => {
      return this.drinkingDal.select(intake.drinkId).then((data) => {
        // Make sure data and grams are defined and are numbers
        if(data && 'milliliters' in data) {
          return data.milliliters
        }
        return 0;
      });
    });
    Promise.all(promises).then(results => {
      // Sum up all the calories
      this.totalMilliliterWaterTake = results.reduce((sum, calories) => sum + calories, 0);
      this.record.totalMilliliters =this.totalMilliliterWaterTake
      console.log(this.totalCalories);
    }).catch(error => {
      console.error('Error calculating total calories:', error);
    });
  }


  deleteFoodIntake(i: number) {
    if(i >= 0 && i < this.record.foodIntakes.length) {
      this.record.foodIntakes.splice(i, 1);
    } else {
      console.error('Invalid index for food intake');
    }
  }

  deleteDrinkingIntake(i: number) {
    if(i >= 0 && i < this.record.drinkIntakes.length) {
      this.record.drinkIntakes.splice(i, 1);
    } else {
      console.error('Invalid index for food intake');
    }
  }
  onAddClick() {
    this.recordDal.insert(this.record).then((data) => {
      console.log(data)
      alert("Record added successfully")
      this.router.navigate([`/record`])
    }).catch((e) => {
      console.log("Error"+e.message)
    })
  }

  protected readonly Number = Number;
}
