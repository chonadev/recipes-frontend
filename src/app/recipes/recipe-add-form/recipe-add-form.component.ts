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

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    public dataStorage: DataStorageService) { }

  ngOnInit(): void {
    this.addRecipeForm = this.fb.group({
      nameRecipe: ['', [
        Validators.required,
      ]],
      description: ['',  Validators.required],
      imagePath: ['', Validators.required],
      ingredients: this.fb.array([])
    });

    this.addIngredient();
  }

  get recipeForms() {
    return this.addRecipeForm.controls;
  }

  get ingredientForms() {
    return this.addRecipeForm.get('ingredients') as FormArray
  }
  
  addIngredient() {
    const ingredientForm = this.fb.group({
      nameIngredient: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.ingredientForms.push(ingredientForm);
  }

  deleteIngredient(i: number) {
    this.ingredientForms.removeAt(i);
  }

  onSubmit() {
    if (this.ingredientForms.length == 0) {
      Swal.fire(
        'Ingredientes 0',
        'Debe agregar los ingredientes de la receta!',
        'error',
      )
    }

    this.submitted = true;
    
    if (this.addRecipeForm.invalid) {
      return;
    }
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
