import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CameraService} from "../../service/camera.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FoodDalService} from "../../service/food-dal.service";
import {Drinking} from "../../models/drinking.model";
import {DrinkingDalService} from "../../service/drinking-dal.service";

@Component({
  selector: 'app-drinkingdetailpage',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './drinkingdetailpage.component.html',
  styleUrl: './drinkingdetailpage.component.css'
})
export class DrinkingdetailpageComponent {
  drinking:Drinking = new Drinking("noname",10.5)
  imgsrc:any;
  cameraService=inject(CameraService);
  activatedRout=inject(ActivatedRoute)
  dal = inject(DrinkingDalService)
  MIN_LENGTH =3
  MAX_LENGTH =30
  MIN_ML = 0
  router = inject(Router)
  constructor() {
    const id:number =Number(this.activatedRout.snapshot.paramMap.get("id"))
    this.dal.select(id).then(data=>{
      this.drinking = data
    }).catch((e)=>{
      console.log(e)

    })
  }
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

  onUpdateClick() {
    this.dal.update(this.drinking)
      .then((data) => {
        console.log(data);
        alert("Drinking updated successfully");
        this.router.navigate([`/drinking`])
      })
      .catch((err) => {
        console.log(err);
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
