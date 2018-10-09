import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a test.', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'),
    new Recipe('A Test Recipe 2', 'This is a test 2.', 'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_1280.jpg'),
  ];
  
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
  