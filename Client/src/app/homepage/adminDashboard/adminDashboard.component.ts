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

  constructor(private _router: Router, private _sharedService: SharedService) { }

  ngOnInit() {
    this.checkUserAuthentication()
    this.getAllRequestCount()
  }

  private checkUserAuthentication(): void {
    const isLoggedIn = !!this._sharedService.getLoggedInUser();
    if (!isLoggedIn) {
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

}
