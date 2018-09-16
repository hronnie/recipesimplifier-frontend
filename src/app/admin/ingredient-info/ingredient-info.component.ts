import { Component, OnInit } from '@angular/core';
import {IngredientInfoService} from "../../_services";

@Component({
  selector: 'app-ingredient-info',
  templateUrl: './ingredient-info.component.html',
  styleUrls: ['./ingredient-info.component.css']
})
export class IngredientInfoComponent implements OnInit {

  columnDefs = [
    {headerName: 'Name',
      field: 'name',
      editable: true},
    {headerName: 'Description',
      field: 'description',
      editable: true,
      cellEditor: "agLargeTextCellEditor",
      }
  ];

  rowData: any;
  private rowSelection;
  private gridApi;
  private gridColumnApi;
  responseSuccessMsg: String;
  responseErrorMsg: String;

  constructor(private ingrInfoService: IngredientInfoService) {
    this.rowSelection = "multiple";
  }

  ngOnInit() {
    this.rowData = this.ingrInfoService.findAll();
  }

  onCellValueChanged(params: any) {
    this.ingrInfoService.update(params.data)
      .subscribe(res =>
        {
          this.responseSuccessMsg = "A hozzávaló infó sikeresen módosítva lett :) ";
        }, err => {
          if (err.status === 422) {
            this.responseErrorMsg = "Az elküldött hozzávaló infó nem megfelelő";
          } else if (err.status === 401) {
            this.responseErrorMsg = "Autentikációs hiba, a recept elküldéséhez be kell jelentkezni"
          } else if (err.status === 500) {
            this.responseErrorMsg = "Rendszerhiba történt, szólj kérlek a rendszergazdának: aron.harsfalvi@gmail.com"
          } else {
            this.responseErrorMsg = "Ismeretlen hiba"
          }
        }
      );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  createNewRowData(id) {
    return {
      ingredientInfoId: id,
      name: "Új név",
      description: "Új leírás"
    }
  }

  onAddRow() {
    let newItem = this.createNewRowData(null);
    this.ingrInfoService.create(newItem)
      .subscribe(res =>
        {
          this.responseSuccessMsg = "A hozzávaló infó sikeresen el lett tárolva :) ";
          let idPosition = res.lastIndexOf("/");
          let idStr = res.substring(idPosition + 1, res.length);
          this.gridApi.updateRowData({ add: [this.createNewRowData(idStr)] });
        }, err => {
          if (err.status === 422) {
            this.responseErrorMsg = "Az elküldött hozzávaló infó nem megfelelő";
          } else if (err.status === 401) {
            this.responseErrorMsg = "Autentikációs hiba, a recept elküldéséhez be kell jelentkezni"
          } else if (err.status === 500) {
            this.responseErrorMsg = "Rendszerhiba történt, szólj kérlek a rendszergazdának: aron.harsfalvi@gmail.com"
          } else {
            this.responseErrorMsg = "Ismeretlen hiba"
          }
        }
      );

  }

  onRemoveSelected() {
    let selectedData = this.gridApi.getSelectedRows();
    if (!selectedData || selectedData.length < 1) {
      return;
    }

    for (let i = 0; i < selectedData.length; i++) {
      this.ingrInfoService.delete(selectedData[i])
        .subscribe(res =>
          {
            this.responseSuccessMsg = "A hozzávaló infó sikeresen ki lett törölve :) ";
          }, err => {
            if (err.status === 422) {
              this.responseErrorMsg = "Az elküldött hozzávaló infó nem megfelelő";
            } else if (err.status === 401) {
              this.responseErrorMsg = "Autentikációs hiba, a recept elküldéséhez be kell jelentkezni"
            } else if (err.status === 500) {
              this.responseErrorMsg = "Rendszerhiba történt, szólj kérlek a rendszergazdának: aron.harsfalvi@gmail.com"
            } else {
              this.responseErrorMsg = "Ismeretlen hiba"
            }
          }
        );
    }

    let res = this.gridApi.updateRowData({ remove: selectedData });
  }

}
