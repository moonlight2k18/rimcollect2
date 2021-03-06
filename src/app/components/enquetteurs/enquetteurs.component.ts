import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-enquetteurs',
  templateUrl: './enquetteurs.component.html',
  styleUrls: ['./enquetteurs.component.scss']
})
export class EnquetteursComponent implements OnInit {
  public enquetteurs = [];
  public loading: boolean = false;
  constructor(private genService: GeneralService) { }

  ngOnInit(): void {
    this.loadData(); 
  }

  private async loadData() {
    this.loading = true;
    this.genService.getRessourceByFullPath('https://baismail.herokuapp.com/rc/fetchEnquetteurs').subscribe(data=>{
          console.log(data);
          this.enquetteurs = data;
          this.loading = false;
        });
  }
}




