import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  public loading : boolean = false;
  public filtered: boolean = false;
  public prix = [];

  //FILTER OPTIONS
  public centres = this.genService.getRessource('/centres');
  public enqcods = this.genService.getRessource('/enqcods');
  public sems = this.genService.getRessource('/sems');
  public mois = this.genService.getRessource('/mois');
  public annees = this.genService.getRessource('/annees');
  public selectedCentre = "";
  public selectedEnqcod = "";
  public selectedSem = "";
  public selectedAnnee = "";
  public selectedMois = "";


  constructor(private genService: GeneralService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    this.loadPrix();
    this.loadFiterOptions();
  }

  private loadPrix(){
    this.loading = true;
    this.genService.getRessourceByFullPath('https://rim-collect.herokuapp.com/rc/synched')
    .subscribe(data=>{
      console.log(data);
      this.prix = data;
      this.loading = false;
    }, err=>{
      console.error(err);
      this.loading = false;
    }
    );
  }

  private loadFiterOptions(){

  }

  public onExportData(){
    let element = document.getElementById('data_table');
    const worksheet : XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const workbook : XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feuille1');

    XLSX.writeFile(workbook, 'output.xlsx');
  }


  //ENVENTS
  onChangeCentre(event: any){
    this.selectedCentre = event.target.value;
  }
  onChangeEnqcod(event: any){
    this.selectedEnqcod = event.target.value;
  }
  onChangeSem(event: any){
    this.selectedSem = event.target.value;
  }
  onChangeAnnee(event: any){
    this.selectedAnnee = event.target.value;
  }
  onChangeMois(event: any){
    this.selectedMois = event.target.value;
  }

  onCheckedFilter(event: any){
    console.warn(event);
    this.filtered = event.target.checked;
  }

  //full url with http://localhost.... TO AVOID CORS ERRORS
  onFilterResults(){
    this.loading = true;
    const path = 
          'https://rim-collect.herokuapp.com/rc/filteredOutput?enqcod='
          //'http://localhost:8084/rc/filteredOutput?enqcod='
          +this.selectedEnqcod+'&centre='+this.selectedCentre
          +'&sem='+this.selectedSem+'&annee='+this.selectedAnnee+'&mois='+this.selectedMois;
    console.warn(path);
    this.genService.getRessourceByFullPath(
      path
    )
    .subscribe(data=>{
      console.log(data);
      this.prix = data;
      this.loading = false;
    }, err=>{
      console.error(err);
      this.loading = false;
    }
    );    
  }
}
