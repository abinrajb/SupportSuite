import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { HomepageService } from '../homepage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexPage',
  templateUrl: './indexPage.component.html',
  styleUrls: ['./indexPage.component.css']
})

export class IndexPageComponent implements OnInit {

  allRequestCount: any ={}
  indexFlag:boolean=false;
  activeButtonCSR:boolean=false;

  constructor(private _sharedService : SharedService,
              private _router: Router,
              private _homeService:HomepageService) { }

  ngOnInit() {
    this.checkUserAuthentication()
    this.getAllRequestCount();
  }

  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
  }

  public goToMakeServiceRequest() {
    this._homeService.ActivateButtons(2);
    this._router.navigate(['homepage/makeReq']);
  }

  private getAllRequestCount(): void{
   this._sharedService.getAllRequestCount().subscribe({
    next: (response: any) => {
        this.allRequestCount=response;
    },
    error: (err) => {

        }
       });
    }
    public scrollToElement(elementId: string) {
        this.indexFlag=true;
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
}
