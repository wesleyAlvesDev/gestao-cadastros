import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public cadastroForm: FormGroup

  public loginError: boolean;

  public cadastrando: boolean;

  public mensagemSucesso: string = null;

  public errors: string[];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login() {
    if (!this.loginForm.valid) {
      return;
    }

    const usuario: Usuario = this.loginForm.getRawValue();
    this.authService.tentarLogar(usuario.username, usuario.password).subscribe(response => {
      const access_token = JSON.stringify(response);
      localStorage.setItem('access_token', access_token);
      this.router.navigate(['/home']);
    }, error => {
      this.errors = ['Usúario e/ou senha incorreto(s)!'];
    });
  }

  public cadastro() {
    if (!this.loginForm.valid) {
      return;
    }

    const usuario: Usuario = this.loginForm.getRawValue();
    this.authService.cadastrar(usuario).subscribe(response => {
      this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login."
      this.cadastrando = false;
      this.errors = [];
      this.limparFormulario();
    }, errorResponse => {
      this.mensagemSucesso = null;
      this.errors = errorResponse.error.errors;
    });
  }

  public prepararCadastrar(event: Event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  public cancelaCadastrar() {
    this.cadastrando = false;
    this.mensagemSucesso = null;
    this.errors = [];
    this.limparFormulario();
  }

  public limparFormulario() {
    this.loginForm.get("username").setValue("");
    this.loginForm.get("password").setValue("");
  }

}
