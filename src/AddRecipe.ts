import {fromEvent} from "rxjs";
import ViewRecipe from "./ViewRecipe";
import DeleteRecipe from "./DeleteRecipe";

class AddRecipe {

    formNewRecipe: HTMLFormElement;
    nameNewRecipe: HTMLInputElement;
    ingredientsNewRecipe: HTMLInputElement;
    table: HTMLTableElement;

    private viewRecipe: ViewRecipe;
    private deleteRecipe: DeleteRecipe;

    constructor(){
        this.initialize();
        this.selectElements();
    }

    private initialize = () : void => {
        this.viewRecipe = new ViewRecipe();
        this.deleteRecipe = new DeleteRecipe();
    };

    private selectElements = () : void => {
        this.formNewRecipe = document.querySelector('form');
        this.nameNewRecipe = this.formNewRecipe.querySelector('.name');
        this.ingredientsNewRecipe = this.formNewRecipe.querySelector('.ingredients');
        this.table = document.querySelector('table tbody');
    };

    addNewRecipe = () : void => {
        let array : any = JSON.parse(sessionStorage.getItem('allRecipes') || "[]");

        let newItem : any = {
            id: array.length,
            name: this.nameNewRecipe.value,
            ingredients: this.ingredientsNewRecipe.value
        };

        let row : HTMLTableRowElement = this.table.insertRow(array.length);
        row.insertCell(0).innerText = newItem.name;
        row.insertCell(1).innerText = newItem.ingredients;

        fromEvent(row.firstChild, 'click').subscribe(()=> this.viewRecipe.viewRecipe(row,newItem.id));

        let deleteButton : HTMLButtonElement = document.createElement('button');
        deleteButton.setAttribute('class', 'btn btn-info');
        deleteButton.innerText='Delete';

        row.insertCell(2).append(deleteButton);
        fromEvent(deleteButton, 'click').subscribe(() => this.deleteRecipe.deleteRecipe(newItem.id));

        array.push(newItem);
        sessionStorage.setItem('allRecipes', JSON.stringify(array));
    };
}

export default AddRecipe;