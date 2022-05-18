import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  public prix = [];
  constructor(private genService: GeneralService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    this.genService.getRessourceByFullPath('https://rim-collect.herokuapp.com/rc/synched')
        .subscribe(data=>{
          console.log(data);
          this.prix = data;
        }, err=>{
          console.error(err);
        });
  }

  public onExportData(){
    let element = document.getElementById('data_table');
    const worksheet : XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const workbook : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille1');

    XLSX.writeFile(workbook, 'output.xlsx');
  }


}
