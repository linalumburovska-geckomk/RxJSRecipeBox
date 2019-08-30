class DeleteRecipe {

    table: HTMLTableElement;

    constructor() {
        this.selectElements();
    }

    private selectElements = () : void => {
        this.table = document.querySelector('table tbody');
    };

    deleteRecipe = ( idx : number) : void => {
        let array : any = JSON.parse(sessionStorage.getItem('allRecipes'));
        for( let i : number = 0; i < array.length; i++){
            if (i == idx) {
                array.splice(i, 1);
                this.table.deleteRow(idx);
            }
        }
        sessionStorage.setItem('allRecipes', JSON.stringify(array));
    };
}

export default DeleteRecipe;