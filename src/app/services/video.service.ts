import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  extractVideo(link: string) {
    return this.http.get(link, { responseType: 'text' });
  }

  downloadVideo(link) {
    return this.http.get(link, { responseType: 'blob' });
  }
}
