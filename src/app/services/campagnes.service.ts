import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Campagnes} from '../modele/campagnes';


@Injectable({
  providedIn: 'root',
})
export class CampagnesService {

  private url = environment.serverURL + 'campagnes/';

  constructor(private http: HttpClient) {
  }

  AddCampagne(campagne: Campagnes): Observable<Campagnes> {
    return this.http.post<Campagnes>(this.url + 'add', campagne);
  }

  SendEmail(campagne: Campagnes,idEntite,idModel): Observable<Campagnes> {
    return this.http.post<Campagnes>(this.url + 'sendEmail/'+idEntite+'/'+idModel, campagne);
  }

  


  getAllCampagne(id): Observable<Campagnes> {
    return this.http.get<Campagnes>(this.url+'all/'+id);
  }


  changeEtatCampagne(id): Observable<Campagnes> {
    return this.http.get<Campagnes>(this.url + 'changeEtat/' + id);
  }

  getCampagne(id): Observable<Campagnes> {
    return this.http.get<Campagnes>(this.url + id);
  }

  EditCampagne(id, campagne: Campagnes): Observable<Campagnes> {
    return this.http.put<Campagnes>(this.url + 'put/' + id, campagne);
  }

  DeleteCampagne(id): Observable<Campagnes> {
    return this.http.delete<Campagnes>(this.url + 'delete/' + id);
  }
}
