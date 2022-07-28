import { RecipeService, RecipeToEdit } from './../recipe.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from './../../shared/data-storage.service';
import Swal from 'sweetalert2';
import { RecipesResponse } from '../recipe.response.model';

@Component({
  selector: 'app-recipe-add-form',
  templateUrl: './recipe-add-form.component.html',
  styleUrls: ['./recipe-add-form.component.css']
})
export class RecipeAddFormComponent implements OnInit {

  addRecipeForm!: FormGroup;
  addIngredientForm!: FormGroup;
  submitted = false;

  isEdit = false;
  recipeToEdit!: RecipeToEdit
  titlePage: string = "";

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    public dataStorage: DataStorageService,
    public recipeService: RecipeService) { }

  ngOnInit(): void {
    // forms
    this.loadUpdateForm();
    this.loadAddForm();

    this.recipeToEdit = this.recipeService.getRecipeToEdit();

    console.log(this.recipeToEdit);
    
    if (this.recipeToEdit && this.recipeToEdit.recipe) {
      this.isEdit = true;
      this.titlePage = "Editar Receta";
      
      const recipeSelected = this.recipeToEdit.recipe;
      
      this.addRecipeForm.controls['nameRecipe'].setValue(recipeSelected.name);
      this.addRecipeForm.controls['description'].setValue(recipeSelected.description);
      this.addRecipeForm.controls['imagePath'].setValue(recipeSelected.imagePath);
      this.populateIngredientsForm(recipeSelected.ingredients);

    } else {
      this.titlePage = "Agregar Receta";
    }
  }

  populateIngredientsForm(ingredients: Ingredient[]) {
    ingredients.map((ingredient: Ingredient) => {
      const newIngredientForm = this.fb.group({
        nameIngredient: ingredient.name,
        amount: ingredient.amount,
      });
      this.ingredientForms.push(newIngredientForm)
    });
  }

  get recipeForms() {
    return this.addRecipeForm.controls;
  }

  get ingredientForms() {
    return this.addRecipeForm.get('ingredients') as FormArray
  }
  
  loadIngredientForm() {
    this.addIngredientForm = this.fb.group({
      nameIngredient: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  addIngredient() {
    const newIngredientForm = this.fb.group({
      nameIngredient: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.ingredientForms.push(newIngredientForm);
  }

  deleteIngredient(i: number) {
    this.ingredientForms.removeAt(i);
  }

  loadAddForm() {
    this.addRecipeForm = this.fb.group({
      nameRecipe: ['', [
        Validators.required,
      ]],
      description: ['',  Validators.required],
      imagePath: ['', Validators.required],
      ingredients: this.fb.array([])
    });
  }

  loadUpdateForm() {
  }

  onSubmit() {
    if (this.ingredientForms.length == 0) {
      Swal.fire(
        'Ingredientes 0',
        'Debe agregar los ingredientes de la receta!',
        'error',
      )
    }
    
    if (this.addRecipeForm.invalid) {
      return;
    }

    this.submitted = true;
    
    const ingredients: Ingredient[] = this.ingredientForms.value.map( (ingre: any) => {
      return { 
        name: ingre.nameIngredient,
        amount: ingre.amount
      }
    });

    const {description, imagePath}: Recipe = {...this.addRecipeForm.value};

    const newRecipe: Recipe = {
      name: this.addRecipeForm.value.nameRecipe,
      description,
      imagePath,
      ingredients
    }

    this.showLoading();

    if (this.isEdit) {
      this.dataStorage.updateRecipe(newRecipe, this.recipeToEdit.id).subscribe((response: RecipesResponse) => {
        if (response.code === '200') {
          Swal.fire(
            'Correcto!',
            'Se Actualizo el ingrediente exitosamente!',
            'success'
          )
        } else {
          Swal.fire(
            'Errror!',
            'No se pudo actualizar la receta, intente nuevamente.',
            'error'
          )
        }
        this.hideLaoding();
        this.onReset();
      });
    } else {
      this.dataStorage.saveRecipe(newRecipe).subscribe((response: RecipesResponse) => {
        if (response.code === '201') {
          Swal.fire(
            'Correcto!',
            'Se guardo el ingrediente exitosamente!',
            'success'
          )
        } else {
          Swal.fire(
            'Errror!',
            'No se pudo guardar la receta, intente nuevamente.',
            'error'
          )
        }
        this.hideLaoding();
        this.onReset();
      });
    }
  }

  onReset() {
    this.submitted = false;
    this.addRecipeForm.reset();
    // goBack
    this.router.navigate(['recipes']);
  }
  
  showLoading() {
    Swal.showLoading();
  }

  hideLaoding() {
    Swal.hideLoading();
  }
}
