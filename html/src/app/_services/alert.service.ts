import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false, autoHide = true) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message, autoHide:autoHide });

        
    }

    error(message: string, keepAfterNavigationChange = false, autoHide = true) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message, autoHide:autoHide  });
        
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();       
    }
    
    getModelData(): Observable<any> {
        return this.subject.asObservable();
    }
    
    model(isModelShow: boolean, modelType: string){
        modelType = modelType || 'normal';
        this.subject.next({ modelShow: isModelShow, modelType: modelType });
    }
}