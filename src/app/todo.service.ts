import { Http } from '@angular/http';
import { Injectable, getDebugNode } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class TodoService {
    constructor(private http: Http) { }

    getAll(limit,offset) {
        return this.http.get('http://localhost:3000/?limit=' + limit + '&offset=' + offset).map((res) => {
            console.log(res);
            return res.json();
        });
    }

    getOne(id_category) {
        return this.http.get('http://localhost:3000/contactview?id=' + id_category).map((res) => {
            console.log(res);
            return res.json();
        })
    }

    getSearch(s){
        return this.http.get('http://localhost:3000/search?search=' + s).map((res) => {
            console.log(res);
            return res.json();
        })
    }

    update(id_category, attributes_update) { // convert data from client to serve
        return this.http.post('http://localhost:3000/contactupdate', {
            id_category: id_category,
            attributes: attributes_update
        })
    }

    add(attributes_add) {
        var body = {
            attributes: attributes_add
        };
        return this.http.post('http://localhost:3000/contactadd', body)
    }
    
    deletes(id) {
        return this.http.delete(`http://localhost:3000/contactdelete/${id}`).map((res) => {
            console.log(res);
            return res.json();
        });
    }
}