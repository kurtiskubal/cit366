import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is a test.', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg',
        [new Ingredient('Food', 1),
        new Ingredient('Food', 1)
    ]),
        new Recipe('A Test Recipe 2', 'This is a test 2.', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg',
        [new Ingredient('Food', 1),
        new Ingredient('Food', 1)
    ]),
      ]; 

    constructor(private slService: ShoppingListService) {

    }
      
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}