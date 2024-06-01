import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {Food} from "../../models/food.model";
import {FoodDalService} from "../../service/food-dal.service";
import {CameraService} from "../../service/camera.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addfoodpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './addfoodpage.component.html',
  styleUrl: './addfoodpage.component.css'
})
export class AddfoodpageComponent {
  imgsrc:any;
  cameraService=inject(CameraService);
  food: Food = new Food('', 0);
  dal:FoodDalService = inject(FoodDalService)
  MIN_LENGTH =3
  MAX_LENGTH =30
  MAX_CALORIES = 2500
  router = inject(Router)

  onCapturePhotoClick() {
    this.cameraService.capturePhoto().then((data)=>{
      this.imgsrc=data;
      this.food.photo = data
    }).catch((e)=>{
      alert(e.toString());
    })
  }

  onLoadFromLibraryClick() {
    this.cameraService.loadPhotoFromLibrary().then((data)=>{
      this.imgsrc=data;
      this.food.photo = data
    }).catch((e)=>{
      alert(e.toString());
    })
  }

  onAddClick() {
    this.dal.insert(this.food).then((data) => {
      console.log(data)
      alert("Record added successfully")
      this.router.navigate([`/food`])
    }).catch((e) => {
      console.log("Error"+e.message)
    })
  }
}
