import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable()
export class Session {
    StorageObj: any = {}
    private myValue;
    constructor(private route: ActivatedRoute,  private router: Router,) {
      this.StorageObj = sessionStorage; 
    }

    public set(key, data){
        key = key || 'session'
        data = JSON.stringify(data);
        this.StorageObj.setItem(key, JSON.stringify(data));
    }
    
    public get(key){
        key = key || 'session'
        let session = JSON.parse(this.StorageObj.getItem(key));
        if(session && typeof session == 'string'){
           session = JSON.parse(session);
        }
        return session;
    }
    
    public userId(){
        let session = this.get('session');
        return session['userId'];
    }
    public userRole(){
        let session = this.get('session');
        return session['role'];
    }   
    public techId(){
        let session = this.get('session');
        return session.technician['techId'];
    }     
    public ssoToken(){
        let session = this.get('session');
        return session && Object.keys(session).length > 0 ? session.ssoToken : false;
    }
    
    public isLoggedInWithOTP(){
      let session = this.get('session');
      return session && Object.keys(session).length > 0 ? session.isLoginWithOTP : false;      
    }
    
    public isLoggedIn(){
        let session = this.get('session');
        return session && Object.keys(session).length > 0 ? true : false;
    }
    
    public logout(key) {
        key = key || 'session';
        // remove user from local storage to log user out
        this.StorageObj.removeItem(key);
    }
    public redirectUser(){
        let session = this.get('session');
        if(session['role'] == 'admin'){
            this.router.navigate(["/clients"]);
        }else if(session['role']  == 'csr'){
            this.router.navigate(["/clients"]);
        }else if(session['role']  == 'superadmin'){
            this.router.navigate(["/clients"]);
        }        
        else if(session['role']  == 'technician'){
            this.router.navigate(["/clients"]);
        }
        else if(session['role']  == 'PO'){
            this.router.navigate(["/clients"]);
        }
        else if(session['role']  == 'jurisdiction admin'){
            this.router.navigate(["/clients"]);
        }
        else if(session['role']  == 'client'){
            this.router.navigate(["/profile"]);
        }  
    }
    setCalDate(val) {        
        this.myValue = val;
    }

    getCalDate() {
        return this.myValue ;
    }
}