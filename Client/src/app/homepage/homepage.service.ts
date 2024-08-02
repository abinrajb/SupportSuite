import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  activeButtonCSR: boolean = false;
  activeButtonHome: boolean = true;
  activeButtonAD: boolean = false;

  ActivateButtons(buttonNumber: number): Observable<any> {
    if (buttonNumber === 1) {
      this.activeButtonHome = true;
      this.activeButtonCSR = false;
      this.activeButtonAD = false;
    } else if (buttonNumber === 2) {
      this.activeButtonCSR = true;
      this.activeButtonHome = false;
      this.activeButtonAD = false;
    } else if (buttonNumber === 3) {
      this.activeButtonCSR = false;
      this.activeButtonHome = false;
      this.activeButtonAD = true;
    }

    return of({
      activeButtonHome: this.activeButtonHome,
      activeButtonCSR: this.activeButtonCSR,
      activeButtonAD: this.activeButtonAD
    });
  }
}
