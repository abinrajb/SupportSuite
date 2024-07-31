import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InproInterface } from './homepage/inProgress/inpro-interface';
import { Category, Admins, Country } from './interface';


@Injectable({
    providedIn: 'root'
})


export class SharedService {
    private loggedInUser: any;
    private inProgressUser: any;

    constructor(private _http: HttpClient) { }

    login(loginPayload: any): Observable<any> {
        return this._http.post<any>(`/log`, loginPayload);
    }

    signup(signupPayload: any): Observable<any> {
        return this._http.post<any>(`/sign`, signupPayload);
    }

    makeServiceRequest(makeServiceRequest: any): Observable<any> {
        return this._http.post<any>(`/makeServiceRequest`, makeServiceRequest);
    }

    deleteInProgress(deleteTicketId: number): Observable<any> {
        return this._http.delete<any>(`/deleteTicket/${deleteTicketId}`);
    }

    getCountries(): Observable<Country[]> {
        return this._http.get<Country[]>(`/count`);
    }

    getCategories(): Observable<Category[]> {
        return this._http.get<Category[]>('/service');
    }


    getAdmin(): Observable<Admins[]> {
        return this._http.get<Admins[]>('/getAllAdmins');
    }

    getUsers(): Observable<Admins[]> {
        return this._http.get<Admins[]>('/getAllUsers');
    }

    setLoggedInUser(user: any): void {
        this.loggedInUser = user;
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    }
    
    getLoggedInUser(): any {
    if (this.loggedInUser) {
        return this.loggedInUser;
    }
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
        this.loggedInUser = JSON.parse(user);
        return this.loggedInUser;
    }
    return null;
    }

    setInProgress(user: any): void {
        this.inProgressUser = user;
    }

    getInProgress(): any {
        return this.inProgressUser;
    }

    getAllServiceTicket(ticketFetchPayLoad:any): Observable<InproInterface> {
        return this._http.post<InproInterface>(`/getAllIn-progressTickets`,ticketFetchPayLoad);
    }

    assignTicket(assignPayLoad: any): Observable<any> {
        return this._http.post<any>(`assignTicket`,assignPayLoad)
    }

    getAllRequestCount() : Observable<InproInterface> {
        return this._http.get<InproInterface>(`/getAllRequestCount/${this.loggedInUser.personId}`);
    }

    getAllTickets() : Observable<InproInterface> {
        return this._http.get<InproInterface>(`/getAllTickets/${this.loggedInUser.personId}`);
    }

    clearUserSession(): void {
        this.loggedInUser = null;
        sessionStorage.removeItem('loggedInUser');
        
    }

    getAllAssignedToMe(approvedticketFetchPayLoad:any) : Observable<InproInterface>{
        return this._http.post<InproInterface>(`/getAllAssignedToMeTickets`,approvedticketFetchPayLoad);
    }

    statusChangeToApprovedOrRejected(ApprovedOrRejectedPayLoad:any) : Observable<InproInterface>{
        return this._http.post<InproInterface>(`/statusChangeToApprovedOrRejected`,ApprovedOrRejectedPayLoad);
    }

    makeNewAdmin(newAdminPayLoad:any): Observable<InproInterface>{
        return this._http.post<InproInterface>(`/makeAdmin`,newAdminPayLoad);
    }

    createNewServiceCategory(newServicePayLoad:any): Observable<InproInterface>{
        return this._http.post<InproInterface>(`/createNewServiceCategory`,newServicePayLoad);
    }

}
