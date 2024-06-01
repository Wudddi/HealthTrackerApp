export class Drinking {
  id: number| undefined
  name: string;
  milliliters:number;
  photo?: string;

  constructor(name: string, milliliters: number, photo?: string) {
    this.name = name;
    this.milliliters = milliliters;
    this.photo = photo;
  }
}
