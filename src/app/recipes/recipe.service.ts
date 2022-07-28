import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";

export interface RecipeToEdit {
  "id": number,
  "recipe": Recipe,
}

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  private recipeToEdit!: RecipeToEdit;

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipeToEdit() {
    return this.recipeToEdit;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipeToEdit(id: number, recipe: Recipe) {
    this.recipeToEdit = {
      id,
      recipe
    };
  }

  resetRecipeToEdit() {
    this.recipeToEdit = {} as RecipeToEdit;
  }
}
