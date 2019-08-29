import {from, fromEvent} from 'rxjs';
import 'bootstrap';

class Recipe {

    body: HTMLBodyElement;
    submitNewRecipe: HTMLButtonElement;
    formNewRecipe: HTMLFormElement;
    nameNewRecipe: HTMLInputElement;
    ingredientsNewRecipe: HTMLInputElement;
    table: HTMLTableElement;
    viewRecipeModal: HTMLDivElement;
    viewRecipeModalName: HTMLDivElement;
    viewRecipeModalIngredients: HTMLDivElement;
    editButton: HTMLButtonElement;
    saveButton: HTMLButtonElement;
    closeButton: HTMLButtonElement;

    constructor() {

        this.selectElements();

        this.addEventListeners();

        let array: any = JSON.parse(sessionStorage.getItem('allRecipes') || "[]");
        for(let i =0; i < array.length;i++) {
            let row = this.table.insertRow(i);
            row.insertCell(0).innerText = array[i].name;
            row.insertCell(1).innerText = array[i].ingredients;

            fromEvent(row.firstChild, 'click').subscribe(()=> this.viewRecipe(row,i));

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
      this.viewRecipeModalName = this.viewRecipeModal.querySelector('.modal-body label.name');
      this.viewRecipeModalIngredients = this.viewRecipeModal.querySelector('.modal-body label.ingredients');
      this.editButton = this.viewRecipeModal.querySelector('.modal-footer button.edit');
      this.saveButton = this.viewRecipeModal.querySelector('.modal-footer button.save');
      this.closeButton = this.viewRecipeModal.querySelector('.close');
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

        fromEvent(row.firstChild, 'click').subscribe((e)=> this.viewRecipe(row,newItem.id));

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

    private viewRecipe = (row: ChildNode, idx: number) : void => {
        this.viewRecipeModal.setAttribute('class', 'modal fade show');
        this.viewRecipeModal.style.display="block";
        this.body.setAttribute('class', 'modal-open');
        let div = document.createElement('div');
        div.setAttribute('class','modal-backdrop fade show');
        this.body.append(div);

        let spanName = document.createElement('span');
        spanName.innerText = row.childNodes[0].textContent;
        this.viewRecipeModalName.append(spanName);

        let spanIngredients = document.createElement('span');
        spanIngredients.innerText = row.childNodes[1].textContent;
        this.viewRecipeModalIngredients.append(spanIngredients);

        fromEvent(this.editButton, 'click').subscribe(()=> this.editRecipe(row,idx));
        fromEvent(this.closeButton, 'click').subscribe(() => this.closeModal());
    };

    private editRecipe = (row: ChildNode, idx: number) : void => {
        this.editButton.classList.add('d-none');
        this.saveButton.classList.remove('d-none');

        this.viewRecipeModalName.childNodes[1].remove();
        let inputName = document.createElement('input');
        this.viewRecipeModalName.append(inputName);
        inputName.value = row.childNodes[0].textContent;

        this.viewRecipeModalIngredients.childNodes[1].remove();
        let inputIngredients = document.createElement('input');
        this.viewRecipeModalIngredients.append(inputIngredients);
        inputIngredients.value = row.childNodes[1].textContent;

        fromEvent(this.saveButton, 'click').subscribe(() => this.saveRecipe(row,idx,inputName.value,inputIngredients.value));
        fromEvent(this.closeButton, 'click').subscribe(() => this.closeModal());
    };

    private saveRecipe = (row: ChildNode, idx: number, newName: string, newIngredients: string) : void => {
        let array = JSON.parse(sessionStorage.getItem('allRecipes'));
        for(let i=0; i<array.length; i++) {
            if(idx == i){
                array[idx].name = newName;
                array[idx].ingredients = newIngredients;
            }
        }
        sessionStorage.setItem('allRecipes', JSON.stringify(array));
        row.childNodes[0].textContent = newName;
        row.childNodes[1].textContent = newIngredients;

        this.closeModal();
    };

    private closeModal = () : void => {
        this.viewRecipeModal.setAttribute('class', 'modal fade');
        this.viewRecipeModal.style.display="none";
        this.body.classList.remove('modal-open');
        this.body.querySelector('.modal-backdrop').remove();

        this.viewRecipeModal.querySelectorAll('input').forEach((input: HTMLInputElement): void => {
            input.remove();
        });
        this.saveButton.classList.add('d-none');
        this.editButton.classList.remove('d-none');

    };


}

export default Recipe;