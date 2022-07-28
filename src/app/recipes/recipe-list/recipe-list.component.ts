import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";
import { DataStorageService } from "../../shared/data-storage.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private dataSourceService: DataStorageService
  ) {}

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();

    this.dataSourceService.getRecipes();
  }

  showFormRecipe() {
    console.log("Mostrando Formulario receta");
    this.router.navigate(["add-recipe"]);
  }

  showAllIngredients() {
    console.log("Mostrando Formulario receta");
    this.router.navigate(["recipes/ingredients"]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
