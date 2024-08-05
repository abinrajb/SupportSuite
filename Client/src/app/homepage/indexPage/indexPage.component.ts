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
  NewServiceFlag:boolean=true;
  assignedFlag:boolean=false;
  inprogressFlag:boolean=false;
  approvedFlag:boolean=false;
  rejectFlag:boolean=false;
 
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
    public componentActivate(elementId: string) {

        this.indexFlag = false;
        this.NewServiceFlag = false;
        this.assignedFlag = false;
        this.inprogressFlag = false;
        this.approvedFlag = false;
        this.rejectFlag = false;
    
        if (elementId === "createService") {
            this.NewServiceFlag = true;
        } else if (elementId === "Inbox") {
            this.indexFlag = true;
        } else if (elementId === "InProgress") {
            this.inprogressFlag = true;
        } else if (elementId === "Assigned") {
            this.assignedFlag = true;
        } else if (elementId === "Approved") {
            this.approvedFlag = true;
        } else if (elementId === "rejected") {
            this.rejectFlag = true;
        }
    }
    
 
     
}