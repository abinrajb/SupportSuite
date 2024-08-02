import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { HomepageService } from './homepage.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  isDropdownVisible: boolean = false;
  isLoggedIn: any = null;
  LoggedInUser: any ='';
  activeButtonHome:boolean= true;
  activeButtonCSR:boolean=false;
  activeButtonAD:boolean=false;


  constructor(private _router: Router,
              private _sharedService: SharedService,
              private _homeService:HomepageService) {}
  
  ngOnInit() {
     this.checkUserAuthentication()
  }


  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
    this.LoggedInUser = this._sharedService.getLoggedInUser();
  }

  
  public isAdmin(): boolean {
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

  public setActive(buttonName: number) {
    this._homeService.ActivateButtons(buttonName).subscribe({
      next: (response: any) => {
        if(response.activeButtonHome){
           this.activeButtonHome=response.activeButtonHome;
           this.activeButtonCSR=false;
           this.activeButtonAD=false;
        }
        if(response.activeButtonCSR){
            this.activeButtonCSR=response.activeButtonCSR;
            this.activeButtonAD=false;
            this.activeButtonHome=false;
         }
        if(response.activeButtonAD){
            this.activeButtonAD=response.activeButtonAD;
            this.activeButtonHome=false;
            this.activeButtonCSR=false;
         }
      },
      error: (err) => {
      }
    });
  }
    
  
  public logout(event: Event): void {
    event.preventDefault();
    this._sharedService.clearUserSession();
    this._router.navigate(['/login']);
  }

}
