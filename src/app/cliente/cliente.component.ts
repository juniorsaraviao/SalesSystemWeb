import { DialogDeleteClienteComponent } from './../common/delete/dialogDeleteCliente.component';
import { Cliente } from 'src/app/models/cliente';

import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { ApiclienteService } from './../services/apicliente.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public clients!: any[];
  public column: string[] = ['id', 'nombre', 'actions'];
  private readonly width: string = '300px';

  constructor(
    private apiclienteService: ApiclienteService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    this.apiclienteService.getClient().subscribe(response => {
      this.clients = response.data;
    });
  }

  openAdd(): void{
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe( response => {
      this.getClient();
    });
  }

  openEdit(cliente: Cliente): void{
    // this.apiclienteService.editClient(cliente)
    // .subscribe(res => console.log(res));

    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width,
      data: cliente
    });
    dialogRef.afterClosed().subscribe( response => {
      this.getClient();
    });
  }

  deleteClient(cliente: Cliente): void{
    const dialogRef = this.dialog.open(DialogDeleteClienteComponent, {
      width: this.width,
      data: cliente
    });
    dialogRef.afterClosed().subscribe( response => {
      if (response){
        this.apiclienteService.deleteClient(cliente.id)
        .subscribe(res => {
          if (parseInt( res.success.toString(), 10 ) === 1){
            this.snackBar.open(res.message, '', {
              duration: 2000
            });
            this.getClient();
          }
        });
      }
    });
  }

}
