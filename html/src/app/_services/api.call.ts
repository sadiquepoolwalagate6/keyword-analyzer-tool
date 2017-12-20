import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs/Rx';
import 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable()
export class ApiCall {
    env: any = {};
    rquestUrl: any = '';
    isEnvValid: boolean = true;
    X_API_KEY_NAME: string = ''
    X_API_KEY_VALUE: string = ''
    X_AUTH_TOKEN_NAME: string = ''
    X_AUTH_TOKEN_VALUE: string = ''
    header: any = {};
    
    
    constructor(private http: Http, private router: Router, private alertService: AlertService) {
        this.env = environment;
        if(this.env && !this.env.apiUrl){
            this.isEnvValid = false;
        }
        
        this.rquestUrl = this.env.apiUrl
        this.X_API_KEY_NAME = this.env.apiKeyName
        this.X_API_KEY_VALUE = this.env.apiKeyValue
        this.X_AUTH_TOKEN_NAME = this.env.apiTokenName
        this.X_AUTH_TOKEN_VALUE = this.env.apiTokenValue

        if( typeof this.header[this.X_API_KEY_NAME] == 'undefined'){
          this.header[this.X_API_KEY_NAME] = ''
        }                
        this.header['Content-Type'] = 'application/json';
        this.header[this.X_API_KEY_NAME] = this.X_API_KEY_VALUE;
    }
    

    GetAll(endPoint, queryString: any='') {
        queryString = queryString ? '?'+queryString : ''

        return this.http.get(this.rquestUrl+endPoint+queryString, this.jwt())
            .map((response: Response) => this.response(response.json()))
            .catch((error:any) => this.errResponse(error));
    }

    Post(endPoint, data) {
        data = data || {}
        console.log(this.rquestUrl+endPoint);
        return this.http.post(this.rquestUrl+endPoint, JSON.stringify(data), this.jwt())
        .map((response: Response) => this.response(response.json()))
        .catch((error:any) => this.errResponse(error));
    }

    Upload(endPoint, data) {
        console.log('data', data);
        data = data || {}
        console.log(this.rquestUrl+endPoint);
        this.header['Accept'] = 'application/json, text/html';         
        delete this.header['Content-Type'];
        
        return this.http.post(this.rquestUrl+endPoint, data, this.jwt())
        .map((response: Response) => this.response(response.json()))
        .catch((error:any) => this.errResponse(error));
        
        
    }    
    
    
    
    Update(endPoint, data) {
        data = data || {}
        return this.http.post(this.rquestUrl+endPoint, JSON.stringify(data), this.jwt())
        .map((response: Response) => this.response(response.json()))
        .catch((error:any) => this.errResponse(error));
    }
    
      

    // private helper methods
    private jwt() {
        let session = JSON.parse(sessionStorage.getItem('session'));
        if(session && typeof session == 'string'){
           session = JSON.parse(session);
        }
        
        
        if( typeof this.header[this.X_AUTH_TOKEN_NAME] == 'undefined' && session && session.ssoToken){
          this.header[this.X_AUTH_TOKEN_NAME] = session.ssoToken;
        }
        
        if(session && session.ssoToken){
            this.header[this.X_AUTH_TOKEN_NAME] = session.ssoToken;
        }
        
        let headers = new Headers(this.header);
        return new RequestOptions({ headers: headers });
    }
    
    private response(response){
        if(response.code == 401){          
            sessionStorage.removeItem('session');            
        }else{
            this.header['Content-Type'] = 'application/json';
          return response;
        }
    }
    
    private errResponse(error){
        if(error.status == 401){
            this.alertService.model(true, 'logout');            
        }else{
          return Observable.throw(error.json() || 'Server error')
        }
    }
}