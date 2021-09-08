import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PainelPrincipalComponent } from './painel-principal/painel-principal.component';
import { CadastroContatosComponent } from './cadastro-contatos/cadastro-contatos.component';
import { ConsultaContatosComponent } from './consulta-contatos/consulta-contatos.component';

import { Routes, RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_interceptors/TokenInterceptor';

//configurando as rotas (links) para abrir cada componente
const routes: Routes = [
  { path: '', component: PainelPrincipalComponent },
  { path: 'cadastrar-contatos', component: CadastroContatosComponent },
  { path: 'consultar-contatos', component: ConsultaContatosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PainelPrincipalComponent,
    CadastroContatosComponent,
    ConsultaContatosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
