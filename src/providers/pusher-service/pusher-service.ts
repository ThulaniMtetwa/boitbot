import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PusherServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare const Pusher: any;
@Injectable()
export class PusherServiceProvider {

  public _pusher : any;
  constructor(public http: HttpClient) {
    this._pusher = new Pusher("1aa659f1f16d26cd87bc", {
      cluster: "ap2",
      encrypted: true
    });
  }

  getPusher(){
    return this._pusher;
  }

}
