import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

   downloadFile(url: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe((file: Blob) =>  file);
  }
}
