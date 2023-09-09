import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedMemoryTabsService } from '../shared-memory-tabs.service'
import * as d3 from "d3";
import * as c3 from "c3";
import { MortalidadService } from '../mortalidad.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private SM: SharedMemoryTabsService, private MS: MortalidadService) {
  }

  DataMortalidad: any[] = [];

  loadCsvData() {
    this.MS.parseCsvFile()
    //this.MS.parseCsvFile().subscribe(
    //  (data) => {
    //    //this.DataMortalidad = data;
    //    //console.log('Datos CSV:', this.DataMortalidad);
    //  },
    //  (error) => {
    //    console.error('Error al cargar el archivo CSV:', error);
    //  }
    //);
  }

  ionViewDidEnter() {
    // Obtener los datos del servicio cuando se carga la vista
    console.log(this.SM.getFormData())
    this.loadCsvData()





    var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data', 23.4]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge: {
      },
      color: {
        pattern: ['#60B044','#F6C600', '#F97600','#FF0000',], // the three color levels for the percentage values.
        threshold: {
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 180
      }
    });
    setTimeout(function () {
      chart.load({
          columns: [['data', 10]]
      });
  }, 1000);
  
  setTimeout(function () {
      chart.load({
          columns: [['data', 50]]
      });
  
  }, 2000);
  
  setTimeout(function () {
      chart.load({
          columns: [['data', 70]]
      });
  }, 3000);
  
  setTimeout(function () {
      chart.load({
          columns: [['data', 0]]
      });
  }, 4000);
  
  setTimeout(function () {
      chart.load({
          columns: [['data', 100]]
      });
  }, 5000);


  }
}
