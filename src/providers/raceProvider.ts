import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

@Injectable()
export class RaceProvider {

    constructor(public http: Http, public authService: Auth) {

    }

    getAllRaces() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', this.authService.token);

            this.http.post('http://localhost:9001/api/races/getAllRaces',"",{headers:headers})
            .map(res=>res.json())
            .subscribe(res=>{
                resolve(res);
            }, (err) => {
                reject(err);
            })
        })
    }

    groupByArray(xs, key) {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
            el.values.push(x);
        }
        else {
            rv.push({
                key: v,
                values: [x]
            });
        }
        return rv;
    }, []);
}

}