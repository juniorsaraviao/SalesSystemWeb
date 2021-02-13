import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: 'dialogDeleteCliente.component.html'
})

export class DialogDeleteClienteComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteClienteComponent>
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
