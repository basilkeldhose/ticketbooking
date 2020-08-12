import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User;
  user:User[]
  readonly baseURL ="http://localhost:3000/users" 
 
  constructor(private http:HttpClient) { }

  postUser(user: User) {
    return this.http.post(this.baseURL, user);
  }

  getuserList() {
    return this.http.get(this.baseURL );
  }

  putUser(user: User) {
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  getCount(){
    return this.http.get(this.baseURL + '/count')
  }

}
