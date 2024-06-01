import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CameraService} from "../../service/camera.service";
import {FoodDalService} from "../../service/food-dal.service";
import {Drinking} from "../../models/drinking.model";
import {DrinkingDalService} from "../../service/drinking-dal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-adddrinkingpage',
  standalone: true,
    imports: [
        FormsModule,
        NgIf
    ],
  templateUrl: './adddrinkingpage.component.html',
  styleUrl: './adddrinkingpage.component.css'
})
export class AdddrinkingpageComponent {
  imgsrc:any;
  cameraService=inject(CameraService);
  drinking: Drinking = new Drinking('', 0);
  dal:DrinkingDalService =inject(DrinkingDalService)
  MIN_LENGTH =3
  MAX_LENGTH =30
  MIN_ML = 0
  router = inject(Router)
  onCapturePhotoClick() {
    this.cameraService.capturePhoto().then((data)=>{
      this.imgsrc=data;
      this.drinking.photo = data
    }).catch((e)=>{
      alert(e.toString());
    })
  }

  onLoadFromLibraryClick() {
    this.cameraService.loadPhotoFromLibrary().then((data)=>{
      this.imgsrc=data;
      this.drinking.photo = data
    }).catch((e)=>{
      alert(e.toString());
    })
  }

  onAddClick() {
    this.dal.insert(this.drinking).then((data) => {
      console.log(data)
      alert("Record added successfully")
      this.router.navigate([`/drinking`])
    }).catch((e) => {
      console.log("Error"+e.message)
    })
  }

  calculateRemainingAmount(consumed: number): string | number {
    const targetAmount = 2000;
    if (!consumed || isNaN(consumed)) {
      return '';
    }

    let remaining = targetAmount - consumed;
    remaining = Math.max(remaining, 0);
    return remaining;
  }

}
