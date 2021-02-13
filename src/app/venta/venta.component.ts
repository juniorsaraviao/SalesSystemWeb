import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogventaComponent } from './dialog/dialogventa.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {
  private readonly width: string = '600px';

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(DialogventaComponent, {
      width: this.width
    });
  }

}
