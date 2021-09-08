import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-contatos',
  templateUrl: './consulta-contatos.component.html',
  styleUrls: ['./consulta-contatos.component.css']
})
export class ConsultaContatosComponent implements OnInit {

  contatos: any[] = []; //lista de contatos

  //contato selecionado para exclusão ou edição
  contato: any = {
    idContato: 0,
    nome: '',
    email: '',
    telefone: ''
  };

  mensagem_exclusao: string = "";
  mensagem_edicao: string = "";

  constructor(private httpClient: HttpClient) { }

  //formulário para edição de contato
  formEdicaoContato = new FormGroup({
    idContato: new FormControl('', [Validators.required]), //campo
    nome: new FormControl('', [Validators.required]), //campo
    telefone: new FormControl('', [Validators.required]), //camppo
    email: new FormControl('', [Validators.required]), //campo
    foto: new FormControl('', [Validators.required]) //campo
  });

  //função para acessar os campos do formulario
  get form(): any {
    return this.formEdicaoContato.controls;
  }

  ngOnInit(): void {

    this.httpClient.get(environment.apiUrl + "/Contatos")
      .subscribe(
        (success) => {
          this.contatos = success as any[];
        },
        (e) => {
          console.log(e);
        }
      );

  }

  obterContato(item: any): void {
    this.contato = item;
  }

  excluirContato(): void {

    this.httpClient.delete(environment.apiUrl + "/Contatos/" + this.contato.idContato,
      { responseType: 'text' })
      .subscribe(
        (success) => {
          this.mensagem_exclusao = success;
          this.ngOnInit(); //recarregar a consulta
        },
        (e) => {
          console.log(e);
        }
      );
  }

  consultarContato(idContato: string): void {

    this.mensagem_edicao = "";

    //acessar a API e consultar os dados do contato atraves do ID..
    this.httpClient.get(environment.apiUrl + "/Contatos/" + idContato)
      .subscribe(
        (success: any) => {

          var item = success; //registro do contato

          //preenchendo os campos do formulário
          this.formEdicaoContato.controls.idContato.setValue(item.idContato);
          this.formEdicaoContato.controls.nome.setValue(item.nome);
          this.formEdicaoContato.controls.email.setValue(item.email);
          this.formEdicaoContato.controls.telefone.setValue(item.telefone);
          this.formEdicaoContato.controls.foto.setValue(item.foto);

        },
        (e) => {
          console.log(e);
        }
      )
  }

  onSubmit(): void {

    this.httpClient.put(environment.apiUrl + "/Contatos", this.formEdicaoContato.value,
      { responseType: 'text' })
      .subscribe(
        (success) => {
          this.mensagem_edicao = success;
          //recarregar a consulta
          this.ngOnInit();
        },
        (e) => {
          console.log(e);
        }
      )

  }

}
