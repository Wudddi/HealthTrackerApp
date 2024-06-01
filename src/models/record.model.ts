export class Record {
  id: number| undefined
  date: Date;
  weight: number;
  foodIntakes: { foodId: number; grams: number ;foodName:any}[];
  drinkIntakes: { drinkId: number;drinkingName:any;milliliters:number}[];
  totalCalories?: number;
  totalMilliliters?: number;
  location?: { latitude: number; longitude: number };

  constructor(
    date?: Date,
    weight?: number,
    foodIntakes?: { foodId: number; grams: number ;foodName:any}[],
    drinkIntakes?: { drinkId: number,drinkingName:any,milliliters:number}[],
    location?: { latitude: number; longitude: number },
    totalCalories?:number,
    totalMilliliters?:number
  ) {
    this.date = date || new Date();
    this.weight = weight || 0;
    this.foodIntakes = foodIntakes || [];
    this.drinkIntakes = drinkIntakes || [];
    this.location = location || { latitude: 0, longitude: 0 };
    this.totalCalories = totalCalories;
    this.totalMilliliters = totalMilliliters;
  }

}
