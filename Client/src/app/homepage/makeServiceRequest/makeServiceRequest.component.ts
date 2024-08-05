import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import { Category } from '../homePageInterface'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-makeServiceRequest',
  templateUrl: './makeServiceRequest.component.html',
  styleUrls: ['./makeServiceRequest.component.css']
})
export class MakeServiceRequestComponent implements OnInit {

  constructor(private _sharedService: SharedService, private _router: Router) {}

  loggedInUser: any;
  categories: Category[] = [];
  selectService:number=0;
  isResponseSent: boolean = true;
  errorMap = new Map<string, string>();

  makeReqObj: any = {
    category: '',
    requestDescription: '',
    personId: null
  };

  ngOnInit() {
    this.checkUserAuthentication()
    this.getCategories();
    this.loggedInUser = this._sharedService.getLoggedInUser();
  }

  private checkUserAuthentication(): void {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this._router.navigate(['/login']);
    }
  }

  private displayErrorMessage(key: string, value: string): void {
    this.errorMap.set(key, value);
    this.isResponseSent = false;
  }

  private getCategories(): void {
    this._sharedService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Failed to fetch categories', err);
      }
    });
  }

  private requestInitialize(): void {
    this.makeReqObj.personId = this.loggedInUser.personId;
    this.makeReqObj.category = this.selectService;
  }


  clearErrorMessage(key: string) {
    this.errorMap.delete(key);
  }

  addInProgress(): void {
    this.requestInitialize();
    this.errorMap.clear();

    if (!this.makeReqObj.category) {
      this.displayErrorMessage('serviceErrorMessage', 'Please select a service to continue.');
      return;
    }
    if (this.makeReqObj.requestDescription.length > 200) {
      this.displayErrorMessage('descriptionErrorMessage', 'Description should be below 200 characters.');
      return;
    }
    this.isResponseSent=true;
    if (this.isResponseSent) {
      this._sharedService.makeServiceRequest(this.makeReqObj).subscribe({
        next: (response: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "new ticket created",
            showConfirmButton: false,
            timer: 1500
            });
        },
        error: (err) => {
          console.error('Failed to make service request', err);
        }
      });

      }
    }

  public clearForm(): void {
    this.makeReqObj = {
      category: 0,
      requestDescription: '',
      personId: 0
    };
    this.errorMap.clear();
  }
}
