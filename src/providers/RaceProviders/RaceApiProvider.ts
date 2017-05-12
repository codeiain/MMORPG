import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http';
import { AuthApiProvider } from '../SystemProviders/AuthApiProvider';
import 'rxjs/add/operator/map';

@Injectable()
export class RaceApiProvider {

    constructor(public http: Http, public authService: AuthApiProvider) {

    }

    getAllRaces() {
        return new Promise((resolve, reject) => {
            let headers = this.authService.createAuthorizationHeaders();


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