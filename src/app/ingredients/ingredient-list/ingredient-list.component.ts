import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model';
import { IngrediantResponse } from '../ingrediant.response.model';
import { DataStorageService } from './../../shared/data-storage.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  subscription!: Subscription;

  constructor(private dataSourceService: DataStorageService) { }

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients() {
    this.subscription = this.dataSourceService.getIngredients().subscribe((response: IngrediantResponse) => {
      this.ingredients = response.ingredients;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
