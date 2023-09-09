import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

class Entidad {
  CVE_ENT: number;
  'nombre entidad': string;
}
class EntidadMunicipio {
  public CVE_ENT: number ;
  public nombre: string;
  public municipios: any;
}


@Injectable({
  providedIn: 'root'
})
export class CataologosService {

  constructor(public http: HttpClient) { }
  data: any;
  dic_entidad: any
  dict_mun : any

  getEstados(): Entidad[] {
    var entidadList:Entidad[] =[]
    this.http.get('assets/data/CATALOGO_CVE_ENT_nombre-entidad.json').subscribe((data) => {
      console.log(data)
    // Crear una lista para almacenar los objetos
    // Obtener las claves de "CVE_ENT"
    this.dic_entidad = data
    const cveEntKeys = Object.keys(this.dic_entidad['CVE_ENT']);
   
    // Recorrer las claves y construir la lista de objetos
    cveEntKeys.forEach((key) => {
      const entidad = new Entidad();
      entidad["CVE_ENT"] = parseInt(key, 10); // Convertir la clave a número
      entidad['nombre entidad'] = this.dic_entidad["nombre entidad"][key]; // Asignar el nombre

      entidadList.push(entidad);
    });
    
    });
    return entidadList


  }

  getMunicipios(estadoId: number){
    return this.http.get('assets/data/ent-mun.json')
  }
  
  getRangosEdad(){
    return [
      {id: "00_04","nombre":"0 a 4"},
        {id: "05_14","nombre":"5 a 14"},
        {id: "15_24","nombre":"15 a 24"},
        {id: "25_44","nombre":"25 a 44"},
        {id: "45_64","nombre":"45 a 64"},
        {id: ">65","nombre":"65 y mas"}
    ]
  }
  getSexos(){
    return [
        { id: 1, nombre: 'Hombre' },
        { id: 2, nombre: 'Mujer' },
        { id: 3, nombre: 'Otro' }
      ]
  }
}
