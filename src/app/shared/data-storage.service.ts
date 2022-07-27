import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipesResponse } from "../recipes/recipe.response.model";

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  getRecipes() {
    this.http
      .get<RecipesResponse>("http://localhost:9090/api/recipe/all")
      .subscribe((response: RecipesResponse) => {
        this.recipeService.setRecipes(response.recipes);
      });
  }
}
