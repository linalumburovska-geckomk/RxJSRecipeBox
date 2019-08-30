import {fromEvent} from "rxjs";
import Modal from "./Modal";

class EditRecipe {
    body: HTMLBodyElement;
    viewRecipeModal: HTMLDivElement;
    viewRecipeModalName: HTMLDivElement;
    viewRecipeModalIngredients: HTMLDivElement;
    editButton: HTMLButtonElement;
    saveButton: HTMLButtonElement;
    closeButton: HTMLButtonElement;

    private modal: Modal;

    constructor(){
        this.initialize();
        this.selectElements();

    }

    private initialize = () : void => {
        this.modal = new Modal();
    };

    private selectElements = () : void => {
        this.body = document.querySelector('body');
        this.viewRecipeModal = document.querySelector('#viewRecipe');
        this.viewRecipeModalName = this.viewRecipeModal.querySelector('.modal-body label.name');
        this.viewRecipeModalIngredients = this.viewRecipeModal.querySelector('.modal-body label.ingredients');
        this.closeButton = this.viewRecipeModal.querySelector('.close');
        this.editButton = this.viewRecipeModal.querySelector('.modal-footer button.edit');
        this.saveButton = this.viewRecipeModal.querySelector('.modal-footer button.save');

    };

    editRecipe = (row: ChildNode, idx: number) : void => {
        this.editButton.classList.add('d-none');
        this.saveButton.classList.remove('d-none');

        this.viewRecipeModalName.childNodes[1].remove();
        let inputName : HTMLInputElement = document.createElement('input');
        this.viewRecipeModalName.append(inputName);
        inputName.value = row.childNodes[0].textContent;

        this.viewRecipeModalIngredients.childNodes[1].remove();
        let inputIngredients : HTMLInputElement = document.createElement('input');
        this.viewRecipeModalIngredients.append(inputIngredients);
        inputIngredients.value = row.childNodes[1].textContent;

        fromEvent(this.saveButton, 'click').subscribe(() => this.saveRecipe(row,idx,inputName.value,inputIngredients.value));
        fromEvent(this.closeButton, 'click').subscribe(() => this.modal.closeModal());
    };

    saveRecipe = (row: ChildNode, idx: number, newName: string, newIngredients: string) : void => {
        let array : any = JSON.parse(sessionStorage.getItem('allRecipes'));
        for(let i : number = 0; i<array.length; i++) {
            if(idx == i){
                array[idx].name = newName;
                array[idx].ingredients = newIngredients;
            }
        }
        sessionStorage.setItem('allRecipes', JSON.stringify(array));
        row.childNodes[0].textContent = newName;
        row.childNodes[1].textContent = newIngredients;

        this.modal.closeModal();
    };

}

export default EditRecipe;