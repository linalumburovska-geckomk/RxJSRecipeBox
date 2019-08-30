import {fromEvent} from "rxjs";
import EditRecipe from "./EditRecipe";
import Modal from "./Modal";

class ViewRecipe {

    body: HTMLBodyElement;
    viewRecipeModal: HTMLDivElement;
    viewRecipeModalName: HTMLDivElement;
    viewRecipeModalIngredients: HTMLDivElement;
    editButton: HTMLButtonElement;
    closeButton: HTMLButtonElement;

    private editRecipe: EditRecipe;
    private modal: Modal;

    constructor(){

        this.initialize();
        this.selectElements();

    }

    private initialize = () : void => {
        this.editRecipe = new EditRecipe();
        this.modal = new Modal();
    };

    private selectElements = () : void => {
        this.body = document.querySelector('body');
        this.viewRecipeModal = document.querySelector('#viewRecipe');
        this.viewRecipeModalName = this.viewRecipeModal.querySelector('.modal-body label.name');
        this.viewRecipeModalIngredients = this.viewRecipeModal.querySelector('.modal-body label.ingredients');
        this.closeButton = this.viewRecipeModal.querySelector('.close');
        this.editButton = this.viewRecipeModal.querySelector('.modal-footer button.edit');
    };

    viewRecipe = (row: ChildNode, idx: number) : void => {
        this.viewRecipeModal.setAttribute('class', 'modal fade show');
        this.viewRecipeModal.style.display="block";
        this.body.setAttribute('class', 'modal-open');
        let div : HTMLDivElement = document.createElement('div');
        div.setAttribute('class','modal-backdrop fade show');
        this.body.append(div);

        let spanName : HTMLSpanElement = document.createElement('span');
        spanName.innerText = row.childNodes[0].textContent;
        this.viewRecipeModalName.append(spanName);

        let spanIngredients : HTMLSpanElement = document.createElement('span');
        spanIngredients.innerText = row.childNodes[1].textContent;
        this.viewRecipeModalIngredients.append(spanIngredients);

        fromEvent(this.editButton, 'click').subscribe(()=> this.editRecipe.editRecipe(row,idx));
        fromEvent(this.closeButton, 'click').subscribe(() => this.modal.closeModal());
    };

}

export default ViewRecipe;