import { Concepto } from './../../models/concepto';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiventaService } from 'src/app/services/apiventa.service';
import { Venta } from 'src/app/models/venta';

@Component({
  selector: 'app-dialogventa',
  templateUrl: './dialogventa.component.html',
  styleUrls: ['./dialogventa.component.scss']
})
export class DialogventaComponent implements OnInit {

  public venta!: Venta;
  public conceptos!: Concepto[];

  constructor(
    private dialogRef: MatDialogRef<DialogventaComponent>,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private apiVenta: ApiventaService
  ) {
    this.conceptos = [];
    this.venta = {idCliente: 2, concepto: []};
   }

  public conceptoForm = this.formBuilder.group({
    cantidad: [0, Validators.required],
    importe: [0, Validators.required],
    idProducto: [1, Validators.required]
  });

  ngOnInit(): void {
  }

  close(): void{
    this.dialogRef.close();
  }

  addConcepto(): void {
    this.conceptos.push(this.conceptoForm.value);
  }

  addVenta(): void {
    this.venta.concepto = this.conceptos;
    this.apiVenta.addVenta(this.venta).subscribe(res => {
      console.log(res);
      if ( parseInt( res.success.toString(), 10 ) === 1 ) {
        this.dialogRef.close();
        this.snackBar.open(res.message, '', {
          duration: 2000
        });
      }
    });
  }

}
