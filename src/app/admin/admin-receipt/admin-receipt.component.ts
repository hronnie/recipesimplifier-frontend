import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-admin-receipt',
  templateUrl: './admin-receipt.component.html',
  styleUrls: ['./admin-receipt.component.css']
})
export class AdminReceiptComponent implements OnInit {
  generation = 0;
  processIdList: String[] = [];
  process: String = "valami";
  newReceiptForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor() { 
  }

  ngOnInit() {
    this.process = "valami";
    for (var i = 0; i < 20; i++) {
      var indexName = "processId" + i;
      this.processIdList[indexName] = "processId" + i;
    }
  }

  words2 = [{value: 'word1'}, {value: 'word2'}, {value: 'word3'}, {value: ''}];
  
  add() {
    this.words2.push({value: 'gsre'});
  }
}
