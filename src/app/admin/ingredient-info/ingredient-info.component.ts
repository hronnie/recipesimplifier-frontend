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
    {headerName: 'Name', field: 'name' },
    {headerName: 'Description', field: 'description' },
  ];

  rowData: any;
  constructor(private ingrInfoService: IngredientInfoService) { }

  ngOnInit() {
    this.rowData = this.ingrInfoService.findAll();
  }

}
