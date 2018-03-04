import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Idol, Idols, Idolform } from './idol.model';
import { Commentform } from './comment.model';
import { User, Userform, Userlogin, Userreset, Userprofile, Cloudinary } from './user.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
 headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
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
    tap(idols => console.log(`fetched idols`)),
    catchError(this.handleError('getIdols', []))
   );
 };

 /** GET hero by id. Will 404 if id not found */
 getIdol (id: any): Observable<Idol> {
  const url = `${this.idolsUrl}/${id}`;
  return this.http.get<Idol>(url).pipe(
   tap(idol => console.log(`fetched idol id=${id}`)),
   catchError(this.handleError<Idol>(`getIdol id=${id}`))
  );
 };
 
 /** POST: add a new hero to the server */
 shareIdol (idol: any): Observable<Idols> {
  return this.http.post<Idols>(this.idolsUrl, idol, httpOptions).pipe(
    tap((idol: Idols) => console.log(`shared idol w/ id=${idol._id}`)),
    catchError(this.handleError<Idols>('shareIdol'))
  );
 };
 
 /** PUT: update the hero on the server */
 updateIdol (id: any, idol: any): Observable<any> {
     const url = `${this.idolsUrl}/${id}`;
  return this.http.put(url, idol, httpOptions).pipe(
    tap(_ => console.log(`updated idol id=${id}`)),
    catchError(this.handleError<any>('updateIdol'))
  );
 };
 
 /** DELETE: delete the hero from the server */
 deleteIdol (id: any): Observable<any> {
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
 addComment (id: any, comment: any): Observable<Idol> {
     const url = `${this.idolsUrl}/${id}/comments`;
  return this.http.post<Idol>(url, comment, httpOptions).pipe(
    tap((idol: Idol) => console.log(`added comment in idol w/ id=${idol._id}`)),
    catchError(this.handleError<Idol>('addComment'))
  );
 };
 
  /** PUT: update the hero on the server */
 updateComment (id: any,commentid: any, comment: any): Observable<Idol> {
     const url = `${this.idolsUrl}/${id}/comments/${commentid}`;
  return this.http.put<Idol>(url, comment, httpOptions).pipe(
    tap((idol: Idol) => console.log(`updated comment in idol w/ id=${id}`)),
    catchError(this.handleError<any>('updateComment'))
  );
 };
 
 /** DELETE: delete the hero from the server */
 deleteComment (id: any, commentid: any): Observable<Idol> {
  const url = `${this.idolsUrl}/${id}/comments/${commentid}`;
  return this.http.delete<Idol>(url, httpOptions).pipe(
    tap((idol: Idol) => console.log(`deleted comment in idol w/ id=${id}`)),
    catchError(this.handleError<any>('deleteComment'))
  );
 };
 
 register (user: Userform): Observable<User> {
     return this.http.post<User>(`api/register`, user, httpOptions).pipe(
         tap((currentUser: User) => console.log(`Successfully, Sign Up! Nice to meet you ${currentUser.username}`)),
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
     return this.http.get(`api/logout`).pipe(
         tap(_ => console.log(`LOG YOU OUT!`)),
         catchError(this.handleError<any>('signOut'))
    );
 };
 
 forgot (forgot: any): Observable<any> {
     return this.http.post<any>(`api/forgot`, forgot, httpOptions).pipe(
         tap((msg: any) => console.log(`${msg}`)),
         catchError(this.handleError<any>('forgot'))
    );
 };
 
 reset (token: any, reset: Userreset): Observable<any> {
     return this.http.post<any>(`api/reset/${token}`, reset, httpOptions).pipe(
         tap((msg: any) => console.log(`${msg}`)),
         catchError(this.handleError<any>('reset'))
    );
 };

 
 getUserProfile (authorid: any): Observable<Userprofile> {
     return this.http.post<Userprofile>(`api/users/${authorid}`, httpOptions).pipe(
         tap((userprofile: Userprofile) => console.log(`fetched user id=${authorid}`)),
         catchError(this.handleError<any>('getUserProfile'))
    );
 };
 
 upload (file: any): Observable<any> {
     return this.http.post<Cloudinary>(`api/upload`, file, httpOptions).pipe(
         tap(result => console.log(`get src`)),
         catchError(this.handleError<String>('upload'))
     );
 };
 
 constructor(
  private http: HttpClient
 ) { };
  
}
