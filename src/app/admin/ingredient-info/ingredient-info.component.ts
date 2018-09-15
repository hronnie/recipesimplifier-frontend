import { Component, OnInit } from '@angular/core';
import {IngredientInfoService} from "../../_services";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ingredient-info',
  templateUrl: './ingredient-info.component.html',
  styleUrls: ['./ingredient-info.component.css']
})
export class IngredientInfoComponent implements OnInit {

  columnDefs = [
    {headerName: 'Name', field: 'name', editable: true},
    {headerName: 'Description', field: 'description', editable: true },
  ];

  rowData: any;
  constructor(private ingrInfoService: IngredientInfoService) { }

  ngOnInit() {
    this.rowData = this.ingrInfoService.findAll();
  }

  onCellValueChanged(params: any) {
    this.ingrInfoService.update(params.data)
      .subscribe(
        savedIngredientInfo => {
          console.log('Ingredient info Saved');
        },
        error => console.log(error)
      )
  }
}
