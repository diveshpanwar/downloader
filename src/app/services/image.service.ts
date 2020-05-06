import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  extractImage(link: string) {
    return this.http.get(link, {responseType: 'text'});
  }

  downloadImage(link) {
    return this.http.get(link, {responseType: 'blob'});
  }
}
