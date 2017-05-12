import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthApiProvider } from '../SystemProviders/AuthApiProvider';
import 'rxjs/add/operator/map';

@Injectable()
export class ClassesApiProvider {

    constructor(public http: Http, public authService: AuthApiProvider) {

    }

    getAllClasses() {
        return new Promise((resolve, reject) => {
            let headers = this.authService.createAuthorizationHeaders();
            this.http.post('http://localhost:9001/api/classes/getAll', "", { headers: headers })
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        })
    }
}