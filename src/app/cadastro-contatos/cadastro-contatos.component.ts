import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-contatos',
  templateUrl: './cadastro-contatos.component.html',
  styleUrls: ['./cadastro-contatos.component.css']
})
export class CadastroContatosComponent implements OnInit {

  mensagem: string = "";

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  //formulário para cadastro de contato
  formCadastroContato = new FormGroup({
    nome: new FormControl('', [Validators.required]), //campo
    telefone: new FormControl('', [Validators.required]), //camppo
    email: new FormControl('', [Validators.required]), //campo
    foto: new FormControl('', [Validators.required]) //campo
  });

  //função para acessar os campos do formulario
  get form(): any {
    return this.formCadastroContato.controls;
  }

  //função para executar o submit do formulário
  onSubmit(): void {

    this.httpClient.post(environment.apiUrl + "/Contatos", this.formCadastroContato.value,
      { responseType: 'text' })
      .subscribe(
        (success) => {
          this.mensagem = success; //imprimindo a mensagem de sucesso
          this.formCadastroContato.reset(); //limpar o formulário
        },
        (e) => {
          console.log(e);
        }
      );
  }
}
