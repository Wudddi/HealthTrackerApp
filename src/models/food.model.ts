export class Food {
  id: number| undefined
  name: string;
  caloriesPerHundredGrams: number;
  photo?: string;
  intakeGrams?: number;
  constructor(name: string, caloriesPerHundredGrams: number, photo?: string) {
    this.name = name;
    this.caloriesPerHundredGrams = caloriesPerHundredGrams;
    this.photo = photo;
  }
}
