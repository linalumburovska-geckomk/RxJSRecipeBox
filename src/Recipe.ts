import { fromEvent } from 'rxjs';
import 'bootstrap';

class Recipe {

    submitNewRecipe: HTMLButtonElement;
    formNewRecipe: HTMLFormElement;
    nameNewRecipe: HTMLInputElement;
    ingredientsNewRecipe: HTMLInputElement;
    table: HTMLTableElement;

    constructor() {

        this.selectElements();

        this.addEventListeners();

        // Set an empty array for all recipes
        let array: any = JSON.parse(sessionStorage.getItem('allRecipes') || "[]");
        if(array!="[]") {
            for(let i =0; i < array.length;i++) {
                let row = this.table.insertRow(i+1);
                row.insertCell(0).innerText = array[i].id;
                row.insertCell(1).innerText = array[i].name;
                row.insertCell(2).innerText = array[i].ingredients;
            }
        } else {
            sessionStorage.setItem('allRecipes',JSON.stringify(array));
        }
    }

    private selectElements = () : void => {
      this.formNewRecipe = document.querySelector('form');
      this.nameNewRecipe = this.formNewRecipe.querySelector('.name');
      this.ingredientsNewRecipe = this.formNewRecipe.querySelector('.ingredients');
      this.submitNewRecipe = document.querySelector('.modal-footer button');
      this.table = document.querySelector('table');
    };

    private addEventListeners = () : void => {
        fromEvent(this.submitNewRecipe, 'click').subscribe(() => this.addNewRecipe());
    };

    private addNewRecipe = () : void => {
        let array = JSON.parse(sessionStorage.getItem('allRecipes') || "[]");

        let newItem = {
            id: array.length,
            name: this.nameNewRecipe.value,
            ingredients: this.ingredientsNewRecipe.value
        };

        let row = this.table.insertRow(array.length+1);
        row.insertCell(0).innerText = newItem.id;
        row.insertCell(1).innerText = newItem.name;
        row.insertCell(2).innerText = newItem.ingredients;

        array.push(newItem);
        sessionStorage.setItem('allRecipes', JSON.stringify(array));
    };

}

export default Recipe;