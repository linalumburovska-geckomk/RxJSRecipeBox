import { fromEvent } from 'rxjs';
import 'bootstrap';
import AddRecipe from './AddRecipe';
import ViewRecipe from "./ViewRecipe";
import DeleteRecipe from "./DeleteRecipe";


class Recipe {

    submitNewRecipe: HTMLButtonElement;
    table: HTMLTableElement;


    private newRecipe: AddRecipe;
    private viewRecipe: ViewRecipe;
    private deleteRecipe: DeleteRecipe;

    constructor() {

        this.initialize();

        this.selectElements();

        this.addEventListeners();

        let array: any = JSON.parse(sessionStorage.getItem('allRecipes') || "[]");
        for(let i : number = 0; i < array.length;i++) {
            let row : HTMLTableRowElement = this.table.insertRow(i);
            row.insertCell(0).innerText = array[i].name;
            row.insertCell(1).innerText = array[i].ingredients;

            fromEvent(row.firstChild, 'click').subscribe(()=> this.viewRecipe.viewRecipe(row,i));

            let deleteButton : HTMLButtonElement = document.createElement('button');
            deleteButton.setAttribute('class', 'btn btn-info');
            deleteButton.innerText='Delete';

            row.insertCell(2).append(deleteButton);

            fromEvent(deleteButton, 'click').subscribe(() => this.deleteRecipe.deleteRecipe(i));

        }
    }

    private initialize = () : void => {
        this.newRecipe = new AddRecipe();
        this.viewRecipe = new ViewRecipe();
        this.deleteRecipe = new DeleteRecipe();
    };

    private selectElements = () : void => {
        this.submitNewRecipe = document.querySelector('.modal-footer button');
        this.table = document.querySelector('table tbody');
    };

    private addEventListeners = () : void => {
        fromEvent(this.submitNewRecipe, 'click').subscribe(() => this.newRecipe.addNewRecipe());
    };
}

export default Recipe;