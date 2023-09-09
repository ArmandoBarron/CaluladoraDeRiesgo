import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MortalidadService {

  constructor(private http: HttpClient) { }

  parseCsvFile(): Observable<any[]> {
    const csvFilePath = 'assets/data/municipios_cancer.csv'; // Ruta al archivo CSV en la carpeta 'assets'

    return this.http
      .get(csvFilePath, { responseType: 'text' })
      .pipe(
        map((csvData) => {
          const result = Papa.parse(csvData, {
            header: true, // Si tu archivo CSV tiene una fila de encabezado
            dynamicTyping: true,
          });
          console.log("se ejecuto")
          return result.data;
        })
      );
  }

}
