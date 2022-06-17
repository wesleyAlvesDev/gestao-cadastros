import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../login/usuario';
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';

import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = `${environment.urlBase}/api/usuarios`;
  private tokenUrl = `${environment.urlBase}/${environment.tokenPath}`;
  private clientId = `${environment.clientId}`;
  private clientSecret = `${environment.clientSecret}`;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlBase, usuario);
  }

  public obterToken() {
    const tokentStr = localStorage.getItem('access_token');
    if (tokentStr) {
      const token = JSON.parse(tokentStr).access_token;
      return token;
    }

    return null;
  }

  public isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      return !isExpired;
    }

    return false;
  }

  public encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  public getUsuarioAutenticado() {
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token);
      return usuario;
    }

    return null;
  }

  public tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return this.http.post<any>(this.tokenUrl, params.toString(), { headers });
  }
}
