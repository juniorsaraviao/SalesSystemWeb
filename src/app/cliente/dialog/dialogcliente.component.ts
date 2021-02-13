import { ApiclienteService } from './../../services/apicliente.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente';

@Component({
  templateUrl: './dialogcliente.component.html'
})

export class DialogClienteComponent implements OnInit{

  public nombre!: string;
  public titleComponent!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogClienteComponent>,
    private apiClienteService: ApiclienteService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private cliente: Cliente
  ){ }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    if (this.cliente != null) {
      this.nombre = this.cliente.nombre;
      this.titleComponent = 'Edit User';
    }else{
      this.titleComponent = 'New User';
    }
  }

  closeWindows(): void{
    this.dialogRef.close();
  }

  saveClient(): void{
    if ( this.nombre ){
      if ( this.cliente ){
        this.editClient();
      }else{
        this.addClient();
      }
    }else{
      this.snackBar.open('Add Client name, please!', '', {
        duration: 2000
      });
    }
  }

  addClient(): void{
    const cliente: Cliente = {nombre: this.nombre};
    this.apiClienteService.addCliente(cliente).subscribe(
      response => {
        if (parseInt( response.success.toString(), 10 ) === 1){
          this.dialogRef.close();
          this.snackBar.open(response.message, '', {
            duration: 2000
          });
        }
      }
    );
  }

  editClient(): void {
    const cliente: Cliente = {id: this.cliente.id, nombre: this.nombre};
    this.apiClienteService.editClient(cliente).subscribe(
      response => {
        if (parseInt( response.success.toString(), 10 ) as number === 1){
          this.dialogRef.close();
          this.snackBar.open(response.message, '', {
            duration: 2000
          });
        }
      }
    );
  }

}
