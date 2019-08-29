import { fromEvent } from 'rxjs';
import 'bootstrap';

class Recipe {

    body: HTMLBodyElement;
    submitNewRecipe: HTMLButtonElement;
    formNewRecipe: HTMLFormElement;
    nameNewRecipe: HTMLInputElement;
    ingredientsNewRecipe: HTMLInputElement;
    table: HTMLTableElement;
    viewRecipeModal: HTMLDivElement;
    viewRecipeModalTitle: HTMLDivElement;
    viewRecipeModalName: HTMLDivElement;
    viewRecipeModalIngredients: HTMLDivElement;

    constructor() {

        this.selectElements();

        this.addEventListeners();

        let array: any = JSON.parse(sessionStorage.getItem('allRecipes') || "[]");
        for(let i =0; i < array.length;i++) {
            let row = this.table.insertRow(i);
            row.insertCell(0).innerText = array[i].name;
            row.insertCell(1).innerText = array[i].ingredients;

            fromEvent(row.firstChild, 'click').subscribe(()=> this.viewRecipe(row));

            let deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'btn btn-info');
            deleteButton.innerText='Delete';

            row.insertCell(2).append(deleteButton);

            fromEvent(deleteButton, 'click').subscribe(() => this.deleteRecipe(i));

        }
    }

    private selectElements = () : void => {
      this.body = document.querySelector('body');
      this.formNewRecipe = document.querySelector('form');
      this.nameNewRecipe = this.formNewRecipe.querySelector('.name');
      this.ingredientsNewRecipe = this.formNewRecipe.querySelector('.ingredients');
      this.submitNewRecipe = document.querySelector('.modal-footer button');
      this.table = document.querySelector('table tbody');
      this.viewRecipeModal = document.querySelector('#viewRecipe');
      this.viewRecipeModalTitle = this.viewRecipeModal.querySelector('.modal-title');
      this.viewRecipeModalName = this.viewRecipeModal.querySelector('.modal-body label.name');
      this.viewRecipeModalIngredients = this.viewRecipeModal.querySelector('.modal-body label.ingredients');
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

        fromEvent(row.firstChild, 'click').subscribe((e)=> this.viewRecipe(row));

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

    private viewRecipe = (row: ChildNode) : void => {
        this.viewRecipeModal.setAttribute('class', 'modal fade show');
        this.viewRecipeModal.style.display="block";
        this.body.setAttribute('class', 'modal-open');
        let div = document.createElement('div');
        div.setAttribute('class','modal-backdrop fade show');
        this.body.append(div);

        let spanTitle = document.createElement('span');
        spanTitle.innerText = row.childNodes[0].textContent;
        this.viewRecipeModalTitle.append(spanTitle);

        let spanName = document.createElement('span');
        spanName.innerText = row.childNodes[0].textContent;
        this.viewRecipeModalName.append(spanName);

        let spanIngredients = document.createElement('span');
        spanIngredients.innerText = row.childNodes[1].textContent;
        this.viewRecipeModalIngredients.append(spanIngredients);

    }

}

export default Recipe;