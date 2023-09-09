import { Component,OnInit} from '@angular/core';
import { CataologosService } from './cataologos.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { SharedMemoryTabsService } from '../shared-memory-tabs.service'
import { NavController } from '@ionic/angular';


class Sexos {
  public id: number ;
  public nombre: string;
}


interface AutoCompleteCompleteEvent {
  component: IonicSelectableComponent,
  value: any
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{
  ListaSexos: Sexos[];
  ListaEstados: any[];
  ListaEdades: any[]
  list_municipios : any[]

  estados: any[] = [];
  municipios: any[] = [];

  selectedEstado: any = 1;
  selectedMunicipio: any = 1;
  selectedSexo: Sexos;
  selectedEdad: any = "";

  constructor(private dataService: CataologosService,private SM: SharedMemoryTabsService 
    ,private navCtrl: NavController) {} 

  ngOnInit() {
    this.ListaSexos = this.dataService.getSexos()
    this.ListaEstados = this.dataService.getEstados()
    this.ListaEdades= this.dataService.getRangosEdad()
  } 



  filterMun(event: AutoCompleteCompleteEvent) {
    var temp_sub= this.dataService.getMunicipios(event.value.CVE_ENT)
    temp_sub.subscribe((data) => {
      var temp: number = event.value.CVE_ENT
      var dict_mun = data[temp.toString() as keyof typeof data]
      dict_mun = dict_mun["municipios" as keyof typeof dict_mun]
      this.list_municipios = dict_mun
    });
    //this.municipios = this.dataService.getMunicipios(this.selectedEstado);
  }

  submitForm() {
    var formData = {
      "Estado":this.selectedEstado,
      "Municipio":this.selectedMunicipio,
      "Sexo":this.selectedSexo,
      "Edad":this.selectedEdad
    }
    this.SM.setFormData(formData);
    this.navCtrl.navigateForward('/tabs/tab2');

    // cciones con los datos seleccionados
  }
}
