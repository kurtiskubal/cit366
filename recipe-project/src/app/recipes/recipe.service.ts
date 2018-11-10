import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

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

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}