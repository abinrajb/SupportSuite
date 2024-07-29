import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  isDropdownVisible: boolean = false;
  isLoggedIn: any = null;
  LoggedInUser: any ='';

  constructor(private _router: Router, private _sharedService: SharedService) {}
  
  ngOnInit() {
     this.checkUserAuthentication()
  }


  private checkUserAuthentication(): void {
    this.isLoggedIn = !!this._sharedService.getLoggedInUser();
    this.LoggedInUser = this._sharedService.getLoggedInUser();

    if (!this.isLoggedIn) {
      this._router.navigate(['/login']);
    }
  }
  public isAdmin(): boolean {
    console.log(this.isLoggedIn)
    return this.LoggedInUser?.roles.some((role: any) => role.roleId === 1)
  }

  public toggleDropdown(event: Event): void {
    event.preventDefault();
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  public userProfile(event: Event): void {
    event.preventDefault();
    this._router.navigate(['/homepage/userPro']);
  }
  
  public logout(event: Event): void {
    event.preventDefault();
    this._sharedService.clearUserSession();
    this._router.navigate(['/login']);
  }

}
