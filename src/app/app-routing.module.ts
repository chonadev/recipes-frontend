import { IngredientListComponent } from './ingredients/ingredient-list/ingredient-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeAddFormComponent } from './recipes/recipe-add-form/recipe-add-form.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: 'ingredients', component: IngredientListComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: '', component: RecipeStartComponent },
  ]},
  { path: 'add-recipe', component: RecipeAddFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
