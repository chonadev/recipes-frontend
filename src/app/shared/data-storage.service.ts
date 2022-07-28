import { IngrediantResponse } from './../ingredients/ingrediant.response.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipesResponse } from "../recipes/recipe.response.model";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class DataStorageService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  getRecipes() {
    this.http
      .get<RecipesResponse>(`${this.API_URL}/recipe/all`)
      .subscribe((response: RecipesResponse) => {
        this.recipeService.setRecipes(response.recipes);
      });
  }

  saveRecipe(newRecipe: Recipe) : Observable<RecipesResponse> {
    return this.http
      .post<RecipesResponse>(`${this.API_URL}/recipe`, newRecipe);
  }

  getIngredients() {
    return this.http
      .get<IngrediantResponse>(`${this.API_URL}/ingredient/all`);
  }
}
