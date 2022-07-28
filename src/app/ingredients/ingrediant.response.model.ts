import { Ingredient } from './../shared/ingredient.model';

export class IngrediantResponse {
  public code!: string;
  public description!: string;
  public ingredients: Ingredient[] = [];
}
