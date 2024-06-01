import {Component, inject} from '@angular/core';
import {Food} from "../../models/food.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FoodDalService} from "../../service/food-dal.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CameraService} from "../../service/camera.service";

@Component({
  selector: 'app-fooddetailpage',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './fooddetailpage.component.html',
  styleUrl: './fooddetailpage.component.css'
})
export class FooddetailpageComponent {
  food:Food = new Food("",0)
  imgsrc:any;
  cameraService=inject(CameraService);
  activatedRout=inject(ActivatedRoute)
  dal = inject(FoodDalService)
  MIN_LENGTH =3
  MAX_LENGTH =30
  MAX_CALORIES = 2500
  router = inject(Router)
  constructor() {
    const id:number =Number(this.activatedRout.snapshot.paramMap.get("id"))
    this.dal.select(id).then(data=>{
      this.food = data
    }).catch((e)=>{
      console.log(e)

    })
  }
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

  onUpdateClick() {
    this.dal.update(this.food)
      .then((data) => {
        console.log(data);
        alert("Reord updated successfully");
        this.router.navigate([`/food`])
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
