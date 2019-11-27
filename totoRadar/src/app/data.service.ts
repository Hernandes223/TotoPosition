import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public Http:HttpClient
  ) { }

  local(data): Promise<any> {
    return this.Http.post(`${environment.apiUrl}/local/localizacao`, data).toPromise();
  }
}
