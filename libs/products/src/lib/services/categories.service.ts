/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Category } from '@e-comm/products';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiURLCategories = environment.apiURL + 'categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiURLCategories}`)
  }

  getCategory(categoryId: string): Observable<Category>{
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`)
  }

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiURLCategories}`, category)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category)
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`)
  }
}

