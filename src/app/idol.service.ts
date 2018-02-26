import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Idol, Idols, Idolform } from './idol.model';
import { Commentform } from './comment.model';
import { User, Userform, Userlogin, Userreset, Userprofile } from './user.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
 headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionfile = {
 headers: new HttpHeaders({ 'enctype': 'multipart/form-data', 'Accept': 'application/json' })
};

@Injectable()
export class IdolService {

 private idolsUrl = 'api/idols';  // URL to web api
 
 private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
 };
 
 /** GET heroes from the server */
 getIdols (): Observable<Idols[]> {
  return this.http.get<Idols[]>(this.idolsUrl)
   .pipe(
    tap(heroes => console.log(`fetched idols`)),
    catchError(this.handleError('getIdols', []))
   );
 };

 /** GET hero by id. Will 404 if id not found */
 getIdol (id: number): Observable<Idol> {
  const url = `${this.idolsUrl}/${id}`;
  return this.http.get<Idol>(url).pipe(
   tap(_ => console.log(`fetched idol id=${id}`)),
   catchError(this.handleError<Idol>(`getIdol id=${id}`))
  );
 };
 
 /** POST: add a new hero to the server */
 shareIdol (idol: Idolform): Observable<Idols> {
  return this.http.post<Idols>(this.idolsUrl, idol, httpOptions).pipe(
    tap((idol: Idols) => console.log(`shared idol w/ id=${idol._id}`)),
    catchError(this.handleError<Idols>('shareIdol'))
  );
 };
 
 /** PUT: update the hero on the server */
 updateIdol (id: number, idol: Idolform): Observable<any> {
     const url = `${this.idolsUrl}/${id}`;
  return this.http.put(url, idol, httpOptions).pipe(
    tap(_ => console.log(`updated idol id=${id}`)),
    catchError(this.handleError<any>('updateIdol'))
  );
 };
 
 /** DELETE: delete the hero from the server */
 deleteIdol (id: number): Observable<any> {
  const url = `${this.idolsUrl}/${id}`;
  return this.http.delete(url, httpOptions).pipe(
    tap(_ => console.log(`deleted idol id=${id}`)),
    catchError(this.handleError<any>('deleteHero'))
  );
 };
 
 /* GET heroes whose name contains search term */
 searchIdols (term: string): Observable<Idols[]> {
  if (!term.trim()) {
   // if not search term, return empty hero array.
   return of([]);
  }
  return this.http.get<Idols[]>(`api/idols/?nickname=${term}`).pipe(
   tap(_ => console.log(`found idols matching "${term}"`)),
   catchError(this.handleError<Idols[]>('searchIdols', []))
  );
 };
 
 /** POST: add a new hero to the server */
 addComment (id: number, comment: Commentform): Observable<Idol> {
     const url = `${this.idolsUrl}/${id}/comments`;
  return this.http.post<Idol>(url, comment, httpOptions).pipe(
    tap((idol: Idol) => console.log(`added comment in idol w/ id=${idol._id}`)),
    catchError(this.handleError<Idol>('addComment'))
  );
 };
 
  /** PUT: update the hero on the server */
 updateComment (id: number,commentid: number, comment: Commentform): Observable<Idol> {
     const url = `${this.idolsUrl}/${id}/comments/${commentid}`;
  return this.http.put<Idol>(url, comment, httpOptions).pipe(
    tap(_ => console.log(`updated comment in idol w/ id=${id}`)),
    catchError(this.handleError<any>('updateComment'))
  );
 };
 
 /** DELETE: delete the hero from the server */
 deleteComment (id: number, commentid: number): Observable<Idol> {
  const url = `${this.idolsUrl}/${id}/comments/${commentid}`;
  return this.http.delete<Idol>(url, httpOptions).pipe(
    tap(_ => console.log(`deleted comment in idol w/ id=${id}`)),
    catchError(this.handleError<any>('deleteComment'))
  );
 };
 
 register (user: Userform): Observable<User> {
     return this.http.post<User>(`api/register`, user, httpOptions).pipe(
         tap((currentUser: User) => console.log(`Successfully, Sign Up! Nice to meet you${currentUser.username}`)),
         catchError(this.handleError<User>('register'))
    );
 };
 
 signIn (user: Userlogin): Observable<User> {
     return this.http.post<User>(`api/login`, user, httpOptions).pipe(
         tap((currentUser: User) => console.log(`Successfully, LOG IN!!! ${currentUser.username}`)),
         catchError(this.handleError<User>('signIn'))
    );
 };
 
 signOut (): Observable<any> {
     return this.http.get(`api/logout`, httpOptions).pipe(
         tap(_ => console.log(`LOG YOU OUT!`)),
         catchError(this.handleError<any>('signOut'))
    );
 };
 
 forgot (email: String): Observable<any> {
     return this.http.post<any>(`api/forgot`, email, httpOptions).pipe(
         tap((msg: any) => console.log(`${msg}`)),
         catchError(this.handleError<any>('forgot'))
    );
 };
 
 reset (token: number, reset: Userreset): Observable<any> {
     return this.http.post<any>(`api/reset/${token}`, reset, httpOptions).pipe(
         tap((msg: any) => console.log(`${msg}`)),
         catchError(this.handleError<any>('reset'))
    );
 };

 
 getUserProfile (authorid: Number): Observable<Userprofile> {
     return this.http.get<Userprofile>(`api/users/${authorid}`, httpOptions).pipe(
         tap(_ => console.log(`fetched user id=${authorid}`)),
         catchError(this.handleError<any>('getUserProfile'))
    );
 };
 
 upload (file: String): Observable<String> {
     return this.http.post<String>(`api/upload`, file, httpOptions).pipe(
         tap((src: String) => console.log(`${src}`)),
         catchError(this.handleError<String>('upload'))
     );
 };
 
 constructor(
  private http: HttpClient
 ) { };
  
}
