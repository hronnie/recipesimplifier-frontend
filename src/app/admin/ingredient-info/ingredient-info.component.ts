import { Component, OnInit } from '@angular/core';
import {IngredientInfoService} from "../../_services";

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
  private rowSelection;
  private gridApi;
  private gridColumnApi;

  constructor(private ingrInfoService: IngredientInfoService) {
    this.rowSelection = "multiple";
  }

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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  createNewRowData() {
    return {
      ingredientInfoId: null,
      name: "Új név",
      description: "Új leírás"
    }
  }

  onAddRow() {
    let newItem = this.createNewRowData();
    this.ingrInfoService.create(newItem)
      .subscribe(
        savedIngredientInfo => {
          console.log('Ingredient info Saved');
        },
        error => console.log(error)
      )
    var res = this.gridApi.updateRowData({ add: [newItem] });
  }

  onRemoveSelected() {
    let selectedData = this.gridApi.getSelectedRows();
    if (!selectedData || selectedData.length < 1) {
      return;
    }

    for (let i = 0; i < selectedData.length; i++) {
      this.ingrInfoService.delete(selectedData[i])
        .subscribe(
          savedIngredientInfo => {
            console.log('Ingredient info deleted');
          },
          error => console.log(error)
        )
    }

    let res = this.gridApi.updateRowData({ remove: selectedData });
  }

}
