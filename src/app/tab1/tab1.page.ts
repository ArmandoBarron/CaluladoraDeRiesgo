import { Component,OnInit} from '@angular/core';
import { CataologosService } from './cataologos.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { SharedMemoryTabsService } from '../shared-memory-tabs.service'
import { NavController } from '@ionic/angular';
import { ApiService } from './../services/api.service';

declare var Plotly:any;

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
  list_items: any[];

  estados: any[] = [];
  municipios: any[] = [];

  selectedEstado: any = 1;
  selectedMunicipio: any = 1;
  selectedSexo: Sexos;
  selectedEdad: any = "";

  formData:any;

  constructor(private dataService: CataologosService,private SM: SharedMemoryTabsService 
    ,private navCtrl: NavController, private apiService: ApiService) {} 

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
    // console.log(this.selectedEstado);
    // this.list_items = [];
    let est:any = this.selectedEstado['CVE_ENT'] + 1;
    // console.log(this.selectedEstado);
    let formData = {
      "Estado":this.selectedEstado,
      "Municipio":this.selectedMunicipio,
      "Sexo":this.selectedSexo,
      "Edad":this.selectedEdad
    }

    let myObject:any = {
      'estado': est,
      'municipio': this.selectedMunicipio['CVE_MUN'],
      'sexo': this.selectedSexo['nombre'],
      'edad': this.selectedEdad['id']
    }

    // this.SM.setFormData(formData);
    // this.navCtrl.navigateForward('/tabs/tab2');
    this.formData = formData;
    console.log(myObject);
    this.apiService.getProducts(myObject).subscribe((res:any)=>{
      console.log(res);
      this.list_items = res['products'];
      // this.ngOnInit();
      // this.plot();
      this.list_items.forEach(this.makeFigs);
    });
    // cciones con los datos seleccionados
  }

  plot(){
  }

  makeFigs(element:any, index:any, array: any){
    let figName:any = 'fig' + (index+1).toString();
    console.log(element);
    var data = [
      {
        // domain: { x: [0, 1], y: [0, 1] },
        type: "indicator",
        mode: "gauge+number",
        value: (element['tasa']*0.5)*100,
        title: { text: element['descrip_defuncion'] },
        gauge: {
          axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 33], color: "green" },
            { range: [33, 66], color: "yellow" },
            { range: [66, 100], color: "red" }
          ],
          // threshold: {
          //   line: { color: "red", width: 4 },
          //   thickness: 0.75,
          //   value: 49
          // }
        }
      }
    ];

    var layout = { width: 300, height: 200, margin: { t: 0, b: 0 } };
    Plotly.newPlot(figName, data, layout); 
  }
}
