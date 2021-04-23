
import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  apiURL: string = 'http://localhost:8080/api';

  produits: Produit[];

 // produit : Produit;

  constructor(private http : HttpClient,
              private authService : AuthService ) {

   }
 

    listeProduit(): Observable<Produit[]>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
         return this.http.get<Produit[]>(this.apiURL+"/all",{headers:httpHeaders});
     }
    
   ajouterProduit( prod: Produit):Observable<Produit>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.post<Produit>(this.apiURL, prod, {headers:httpHeaders});
    }
   
    supprimerProduit(id : number) {
      const url = `${this.apiURL}/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
        return this.http.delete(url,  {headers:httpHeaders});
      }
    
     consulterProduit(id: number): Observable<Produit> {
        const url = `${this.apiURL}/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.get<Produit>(url,{headers:httpHeaders});
        }

    updateProduit(prod :Produit) : Observable<Produit>    {
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.put<Produit>(this.apiURL, prod, {headers:httpHeaders});
        }
}
