import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
declare var navigator: any;
@Injectable({
  providedIn: 'root'
})
export class ShakeServiceService {
  watchAcceleration(threshold: number = 10, timeout: number = 1000): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const watchID = navigator.accelerometer.watchAcceleration((accel: { x: number; y: number; z: number; }) => {
        if (Math.abs(accel.x) > threshold || Math.abs(accel.y) > threshold || Math.abs(accel.z) > threshold) {
          observer.next(true);
        }
      }, (error: any) => {
        observer.error(error);
      }, { frequency: timeout });
      return {
        unsubscribe() {
          navigator.accelerometer.clearWatch(watchID);
        }
      };
    });
  }
}
