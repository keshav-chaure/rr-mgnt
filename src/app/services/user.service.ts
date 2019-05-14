import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


import { User } from '../model/user';

import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  
  constructor(private messageService: MessageService,
              private http: HttpClient,
              ) { }

 private log(message:string ){
   this.messageService.add(`UserService: ${message}`)
 }


private usersUrl = 'http://localhost:8083/demo/users';

  getHeroes(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
                    .pipe(catchError(this.handleError('getUsers',[])));
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** GET hero by id. Will 404 if id not found */
getUser(id: number): Observable<User> {
  const url = `${this.usersUrl}/${id}`;
  return this.http.get<User>(url).pipe(
    tap(_ => this.log(`fetched user id=${id}`)),
    catchError(this.handleError<User>(`getHero id=${id}`))
  );
}

/** PUT: update the user on the server */
updateUser (user: User): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };  
  const url = `${this.usersUrl}/${user.userId}`;
  return this.http.put(url, user, httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${user.userId}`)),
    catchError(this.handleError<any>('updateUser'))
  );
}
}
