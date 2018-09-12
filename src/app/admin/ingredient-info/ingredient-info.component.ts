import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredient-info',
  templateUrl: './ingredient-info.component.html',
  styleUrls: ['./ingredient-info.component.css']
})
export class IngredientInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  columnDefs = [
    {headerName: 'Make', field: 'make' },
    {headerName: 'Model', field: 'model' },
    {headerName: 'Price', field: 'price'}
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];


}
