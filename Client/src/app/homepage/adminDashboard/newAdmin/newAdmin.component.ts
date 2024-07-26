import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';
import { Router } from '@angular/router';
import { Admins } from '../../../interface';

@Component({
  selector: 'app-newAdmin',
  templateUrl: './newAdmin.component.html',
  styleUrls: ['./newAdmin.component.css']
})
export class NewAdminComponent implements OnInit {
  
  allUsers: Admins[] = [];
  loggedInUser: any;
  makeAdminPayload: any={
    adminID:null,
    role:1,
    personId:null
  }

  constructor(private _sharedService:SharedService , private _router:Router) {}

  ngOnInit() {
    this.loggedInUser = this._sharedService.getLoggedInUser();
    this.getAllUsers()
  }

  public getAllUsers() : void {
    this.allUsers=this.allUsers
    this._sharedService.getUsers().subscribe({
        next: (data: Admins[]) => {
            this.allUsers = data;
            console.log(this.allUsers)
        },
        error: (err) => {
          console.error('Failed to fetch users', err);
        }
      });
  }

  public makeAdmin() : void{
    this.makeAdminPayload.adminID=this.loggedInUser.personId;
    this._sharedService.makeNewAdmin(this.makeAdminPayload).subscribe({
        next: (any) => {
        },
        error: (err) => {
          console.error('Failed to fetch users', err);
        }
    });
  }



}
