import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpXsrfCookieExtractor } from '@angular/common/http/src/xsrf';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()

export class MoovieProvider{

  private baseApiPath = "https://api.themoviedb.org/3";

  constructor(public http: HttpClient){
    //console.log('Hello MoovieProvider Provider');
  }

  getLatestMoovies(page){
    return this.http.get(this.baseApiPath+ `/movie/popular?page=${page}&api_key=` + this.getApiKey());
  } 



 getMovieDetails(filmeid){

      return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=`+ this.getApiKey());
 }

 getApiKey(): string{
      return 'b45475b8eca82b45d571ffd636f65158';
 }



}
