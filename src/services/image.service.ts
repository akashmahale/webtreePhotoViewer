import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  // API call to fetch Images based on params

  getImages(page = 1, limit = 10) {
    console.log(page, limit);
    return this.http.get(`${api.images}?_page=${page}&_limit=${limit}`);
  }
}
