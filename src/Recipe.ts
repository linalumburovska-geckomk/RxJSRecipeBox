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
        for(let i =0; i < array.length;i++) {
            let row = this.table.insertRow(i);
            row.insertCell(0).innerText = array[i].name;
            row.insertCell(1).innerText = array[i].ingredients;

            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'btn btn-info');
            deleteButton.innerText='Delete';

            row.insertCell(2).append(deleteButton);

            fromEvent(deleteButton, 'click').subscribe(() => this.deleteRecipe(i));

        }

    }

    private selectElements = () : void => {
      this.formNewRecipe = document.querySelector('form');
      this.nameNewRecipe = this.formNewRecipe.querySelector('.name');
      this.ingredientsNewRecipe = this.formNewRecipe.querySelector('.ingredients');
      this.submitNewRecipe = document.querySelector('.modal-footer button');
      this.table = document.querySelector('table tbody');

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

        let row = this.table.insertRow(array.length);
        row.insertCell(0).innerText = newItem.name;
        row.insertCell(1).innerText = newItem.ingredients;

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'btn btn-info');
        deleteButton.innerText='Delete';

        row.insertCell(2).append(deleteButton);
        fromEvent(deleteButton, 'click').subscribe(() => this.deleteRecipe(newItem.id));

        array.push(newItem);
        sessionStorage.setItem('allRecipes', JSON.stringify(array));
    };

    private deleteRecipe = ( idx : number) : void => {
        let array = JSON.parse(sessionStorage.getItem('allRecipes'));
        for( let i = 0; i < array.length; i++){
            if (i == idx) {
                array.splice(i, 1);
                this.table.deleteRow(idx);
            }
        }
        sessionStorage.setItem('allRecipes', JSON.stringify(array));
    };
}

export default Recipe;