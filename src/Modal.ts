class Modal {

    body: HTMLBodyElement;
    viewRecipeModal: HTMLDivElement;
    editButton: HTMLButtonElement;
    saveButton: HTMLButtonElement;

    constructor(){
        this.selectElements();
    }

    private selectElements = () : void => {
        this.body = document.querySelector('body');
        this.viewRecipeModal = document.querySelector('#viewRecipe');
        this.editButton = this.viewRecipeModal.querySelector('.modal-footer button.edit');
        this.saveButton = this.viewRecipeModal.querySelector('.modal-footer button.save');
    };

    closeModal = () : void => {
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
export default Modal;