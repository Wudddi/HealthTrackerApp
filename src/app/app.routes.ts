import { Routes } from '@angular/router';
import {RecordPageComponent} from "./record-page/record-page.component";
import {FoodPageComponent} from "./food-page/food-page.component";
import {DrinkPageComponent} from "./drink-page/drink-page.component";
import {RandomPageComponent} from "./random-page/random-page.component";
import {AddrecordpageComponent} from "./addrecordpage/addrecordpage.component";
import {AddfoodpageComponent} from "./addfoodpage/addfoodpage.component";
import {AdddrinkingpageComponent} from "./adddrinkingpage/adddrinkingpage.component";
import {FooddetailpageComponent} from "./fooddetailpage/fooddetailpage.component";
import {DrinkingdetailpageComponent} from "./drinkingdetailpage/drinkingdetailpage.component";
import {RecorddetailpageComponent} from "./recorddetailpage/recorddetailpage.component";

export const routes: Routes = [
  {path:"record",component:RecordPageComponent},
  {path:"food",component:FoodPageComponent},
  {path:"drinking",component:DrinkPageComponent},
  {path:"random",component:RandomPageComponent},
   {path:"addRecord",component:AddrecordpageComponent},
  {path:"addFood",component:AddfoodpageComponent},
  {path:"addDrinking",component:AdddrinkingpageComponent},
  {path:"foodDetail/:id",component:FooddetailpageComponent},
  {path:"drinkingDetail/:id",component:DrinkingdetailpageComponent},
  {path:"recordDetail/:id",component:RecorddetailpageComponent},
];
