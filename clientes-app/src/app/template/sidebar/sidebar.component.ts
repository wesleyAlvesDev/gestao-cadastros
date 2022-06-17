import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioAutenticado()?.user_name;
  }

  public logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }
}
