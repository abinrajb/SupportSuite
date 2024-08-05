import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-adminDashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  allRequestCount: any ={}
  dashboardFlag:boolean = false;
  NewServiceRequestFlag:boolean = true;
  newAdminFlag:boolean = false;
  NewServiceCategoryFlag:boolean = false;
  recordFlag:boolean = false;

  constructor(private _router: Router, private _sharedService: SharedService) { }

  ngOnInit() {
    this.checkUserAuthentication();
    this.getAllRequestCount();
  }

  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
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

    public handleChildEvent(data: any) {
        this.getAllRequestCount();
    }

    public componentActivate(elementId: string) {

        this.dashboardFlag = false;
        this.NewServiceRequestFlag = false;
        this.newAdminFlag = false;
        this.NewServiceCategoryFlag = false;
        this.recordFlag = false;

        if (elementId === "Dashboard") {
            this.dashboardFlag = true;
        } else if (elementId === "createService") {
            this.NewServiceRequestFlag = true;
        } else if (elementId === "NewServiceCategory") {
            this.NewServiceCategoryFlag= true;
        } else if (elementId === "NewAdmin") {
            this.newAdminFlag = true;
        } else if (elementId === "Records") {
            this.recordFlag = true;
        }
    }
    
   

}
