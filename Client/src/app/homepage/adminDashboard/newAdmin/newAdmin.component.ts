import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';
import { Router } from '@angular/router';
import { Admins } from '../../../interface';
import Swal from 'sweetalert2';

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
    this.checkUserAuthentication();
    this.loggedInUser = this._sharedService.getLoggedInUser();
    this.getAllUsers()
  }

  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
  }

  public getAllUsers() : void {
    this._sharedService.getUsers().subscribe({
        next: (data: Admins[]) => {
            this.allUsers = data;
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
            Swal.fire({
                position: "center",
                icon: "success",
                title: "New service category created",
                showConfirmButton: false,
                timer: 1500
            });
        },
        error: (err) => {
          console.error('Failed to fetch users', err);
        }
    });
  }



}
