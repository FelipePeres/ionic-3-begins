import { Injectable } from '@angular/core';

let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  private config = {

    showSlide:false,
    name:"",
    username:""
  }  

  constructor() {
    
  }

//recuperar os dados do localstorage
  getConfigData(): any{
      //return localStorage.getItem(config_key_name) || {};

      return localStorage.getItem(config_key_name);

  }

  setConfigData(showSlide?:boolean,name?:string,username?:string): any{

    let config = {
        showSlide: false,
        name:"",
        username:""
    };

    if(showSlide){
        config.showSlide = showSlide;
    }

    if(name){
      config.name = name;
    }

    if(username){
      config.username = username;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));

  }

}
