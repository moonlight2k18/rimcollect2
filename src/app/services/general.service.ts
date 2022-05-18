import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public host = environment.host;
  constructor(private httpClient: HttpClient) { }



  public getRessource(url: string): Observable<any>{
    return this.httpClient.get<any>(this.host+url);
  }

  
  public getRessourceByFullPath(url: string): Observable<any>{
    return this.httpClient.get<any>(url);
  }


  
}
