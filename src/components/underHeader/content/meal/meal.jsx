import { Component } from "react";

import './meal.css';

import MealsDataService from "../../../../api/meals/mealsDataService.js";
import EditDeleteButtons from "../editDeleteButtons/editDeleteButtons";
import PlusButton from "../../../uiComponents/plusButton/plusButton";
import ModalWindow from "../../../uiComponents/modalWindow/modalWindow";
import EditMealComposition from './editMealComposition/editMealComposition';
import OneMealCompositionElement from "./oneMealCompositionElement/oneMealCompositionElement";

export default class Meal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: +this.props.match.params.id,
            edit: false,
            name: '',
            calories: null,
            proteins: null,
            fats: null,
            carbohydrates: null,
            recipe: '',
            mealProducts: [],
            mealProductsClone: [],
            mealProductsCloneTemplate: [],
            mealProductsUntouched: [],
            mealUntouched: null,
            editMealProducts: false
        }

        this.togleEdit = this.togleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.togleEditMealProducts = this.togleEditMealProducts.bind(this);
        this.onEditMealProductsClone = this.onEditMealProductsClone.bind(this);
        this.onSaveEditMealProductsClone = this.onSaveEditMealProductsClone.bind(this);
        this.onCancelEditMealProductsClone = this.onCancelEditMealProductsClone.bind(this);
        this.onEditMealProductQuantity = this.onEditMealProductQuantity.bind(this);
        this.onEditMealProductUnit = this.onEditMealProductUnit.bind(this);
        this.onStopEdit = this.onStopEdit.bind(this);
        this.onDeleteOneEemetOfComposition = this.onDeleteOneEemetOfComposition.bind(this);
    }

    componentDidMount() {

        if (this.state.id === -1) {
            this.setState({
                edit: true
            })
            return;
        }

        MealsDataService.retriveMealСompositionByMealId(this.state.id)
            .then(response => {
                this.setState({
                    mealProducts: response.data._embedded.mealProducts,
                    mealProductsClone: response.data._embedded.mealProducts,
                    mealProductsCloneTemplate: response.data._embedded.mealProducts,
                    mealProductsUntouched: response.data._embedded.mealProducts,
                });
            });

        MealsDataService.retriveMeal(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    calories: response.data.calories,
                    proteins: response.data.proteins,
                    fats: response.data.fats,
                    carbohydrates: response.data.carbohydrates,
                    recipe: response.data.recipe,
                    mealUntouched: response.data
                })
            })
    }

    togleEditMealProducts() {
        this.setState({
            editMealProducts: !this.state.editMealProducts
        });
    }

    togleEdit() {
        this.setState({
            edit: !this.state.edit
        })
    }

    onSave() {
        let meal = {
            name: this.state.name,
            calories: this.state.calories,
            proteins: this.state.proteins,
            fats: this.state.fats,
            carbohydrates: this.state.carbohydrates,
            recipe: this.state.recipe

        }

        if (this.state.id === -1) {
            MealsDataService.createMeal(meal)
                .then((response) => {
                    this.setState({
                        id: response.data.id,
                        mealUntouched: meal
                    })
                })
                .then(() => {
                    const newMealProducts = this.state.mealProducts.map((mealProduct) => {
                        mealProduct.mealId = this.state.id;
                        MealsDataService.crateProductInMealProducts(mealProduct)
                            .then(response => {
                                console.log(response);
                            })
                        return mealProduct;
                    })
                    this.setState({
                        mealProducts: newMealProducts,
                        mealProductsUntouched: newMealProducts
                    });
                })
                .then(() => {
                    this.togleEdit();
                })
        } else {
            MealsDataService.updateMeal(this.state.id, meal)
                .then(() => {
                    this.togleEdit();
                    this.setState({
                        mealUntouched: meal
                    });
                });

            this.state.mealProductsUntouched.forEach(mealProductFromUntouched => {
                let deleted = true;
                this.state.mealProducts.forEach(mealProduct => {
                    if (mealProductFromUntouched.id === mealProduct.id) {
                        deleted = false;
                    }
                })
                if (deleted) {
                    MealsDataService.deleteProductInMealProducts(mealProductFromUntouched.id);
                }
            })

            this.state.mealProducts.forEach(mealProduct => {
                let created = true;
                this.state.mealProductsUntouched.forEach(mealProductFromUntouched => {
                    if (mealProduct.id === mealProductFromUntouched.id) {
                        created = false;
                        MealsDataService.updateProductInMealProducts(mealProduct.id, mealProduct);
                    }
                })
                if (created) {
                    MealsDataService.crateProductInMealProducts(mealProduct);
                }
            })
            this.setState({
                mealProductsUntouched: this.state.mealProducts
            });
        }
    }

    onEdit() {
        this.togleEdit();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]://ключ - переменная []
                event.target.value
        });
    }

    onDelete(id) {
        if (this.state.id === -1) {
            this.props.history.push(`/main/meals`);
        } else {
            MealsDataService.deleteMeal(id)
                .then(() => {
                    this.props.history.push(`/main/meals`);
                });
        }
    }

    onEditMealProductsClone(selectedProduct) {

        let existence = false;

        this.state.mealProductsClone.forEach(product => {
            if (product.productId === selectedProduct.id) {
                existence = true;
            }
        });

        if (!existence) {
            this.setState({
                mealProductsClone: [
                    ...this.state.mealProductsClone,
                    {
                        productId: selectedProduct.id,
                        mealId: this.state.id,
                        quantity: 0,
                        unitId: 1
                    }
                ]
            })
        } else {
            const index = this.state.mealProductsClone.findIndex(product => product.productId === selectedProduct.id);

            const before = this.state.mealProductsClone.slice(0, index);
            const after = this.state.mealProductsClone.slice(index + 1);

            const newMealProductsClone = [...before, ...after];

            this.setState({
                mealProductsClone: newMealProductsClone
            });
        }
    }

    onSaveEditMealProductsClone() {
        this.setState({
            mealProductsCloneTemplate: this.state.mealProductsClone,
            mealProducts: this.state.mealProductsClone
        });
    }

    onCancelEditMealProductsClone() {
        this.setState({
            mealProductsClone: this.state.mealProductsCloneTemplate
        });
    }

    onClose() {
        this.props.history.push(`/main/meals`);
    }

    onStopEdit() {
        if (this.state.mealUntouched === null) {
            this.props.history.push(`/main/meals`);
            return;
        }

        this.setState({
            mealProducts: this.state.mealProductsUntouched,
            mealProductsClone: this.state.mealProductsUntouched,
            name: this.state.mealUntouched.name,
            calories: this.state.mealUntouched.calories,
            proteins: this.state.mealUntouched.proteins,
            fats: this.state.mealUntouched.fats,
            carbohydrates: this.state.mealUntouched.carbohydrates,
            recipe: this.state.mealUntouched.recipe
        });
        this.togleEdit();
    }

    onEditMealProductQuantity(index, event) {
        const before = this.state.mealProducts.slice(0, index);
        const after = this.state.mealProducts.slice(index + 1);

        const newOneCompositionElement = {
            id: this.state.mealProducts[index].id,
            quantity: event.target.value,
            unitId: this.state.mealProducts[index].unitId,
            mealId: this.state.mealProducts[index].mealId,
            productId: this.state.mealProducts[index].productId
        }

        const newMealProducts = [...before, newOneCompositionElement, ...after];

        this.setState({
            mealProducts: newMealProducts,
            mealProductsClone: newMealProducts
        });
    }

    onEditMealProductUnit(index, event) {
        const before = this.state.mealProducts.slice(0, index);
        const after = this.state.mealProducts.slice(index + 1);

        const newOneCompositionElement = {
            id: this.state.mealProducts[index].id,
            quantity: this.state.mealProducts[index].quantity,
            unitId: Number(event.target.id),
            mealId: this.state.mealProducts[index].mealId,
            productId: this.state.mealProducts[index].productId
        }

        const newMealProducts = [...before, newOneCompositionElement, ...after];

        this.setState({
            mealProducts: newMealProducts,
            mealProductsClone: newMealProducts
        });
    }

    onDeleteOneEemetOfComposition(index) {
        const before = this.state.mealProducts.slice(0, index);
        const after = this.state.mealProducts.slice(index + 1);

        const newMealProducts = [...before, ...after];

        this.setState({
            mealProductsClone: newMealProducts,
            mealProducts: newMealProducts
        });
    }

    render() {

        const name = this.state.name;
        const editName =
            <>
                <label htmlFor='productName'>Название рецепта:  </label>
                <input
                    id='productName'
                    value={this.state.name}
                    onChange={this.handleChange}
                    name='name'
                />
            </>

        const calories = 'Калории: ' + this.state.calories;
        const editCalories =
            <>
                <label htmlFor='calories'>Калории:  </label>
                <input
                    id='calories'
                    value={this.state.calories}
                    onChange={this.handleChange}
                    name='calories'
                />
            </>

        const proteins = 'Протеины: ' + this.state.proteins;
        const editProteins =
            <>
                <label htmlFor='proteins'>Протеины:  </label>
                <input
                    id='proteins'
                    value={this.state.proteins}
                    onChange={this.handleChange}
                    name='proteins'
                />
            </>

        const fats = 'Жиры: ' + this.state.fats;
        const editFats =
            <>
                <label htmlFor='fats'>Жиры:  </label>
                <input
                    id='fats'
                    value={this.state.fats}
                    onChange={this.handleChange}
                    name='fats'
                />
            </>

        const carbohydrates = 'Углеводы: ' + this.state.carbohydrates;
        const editCarbohydrates =
            <>
                <label htmlFor='carbohydrates'>Углеводы:  </label>
                <input
                    id='carbohydrates'
                    value={this.state.carbohydrates}
                    onChange={this.handleChange}
                    name='carbohydrates'
                />
            </>

        const recipe =
            <>
                <div>
                    <label> Рецепт: </label>
                </div>
                <div className='mealRecipe'>
                        {this.state.recipe}
                </div>
            </>
        const editRecipe =
            <>
                <div>
                    <label> Рецепт: </label>
                </div>
                <div className='mealRecipeEditContainer'>
                    <textarea
                        id='recipe'
                        value={this.state.recipe}
                        onChange={this.handleChange}
                        name='recipe'
                        rows='8'
                        className='mealRecipeEdit'
                    >
                    </textarea>
                </div>
            </>



        return (
            <div className='mealsContainer'>
                <div className='flexColumn'>
                    <div className='mealsPictureButtonsContainer'>
                        <div className='mealPictireContainerProfile'>
                            <img
                                className='mealPictureProfile'
                                src="https://static7.depositphotos.com/1002351/792/i/600/depositphotos_7926477-stock-photo-new-potato.jpg"
                                alt="картошка"
                            />
                        </div>
                        <EditDeleteButtons
                            onClickEdit={this.togleEdit}
                            onClickSave={this.onSave}
                            onClickDelete={() => this.onDelete(this.state.id)}
                            edit={this.state.edit}
                            stopEdit={this.onStopEdit}

                        />
                    </div>
                    <div className='flexColumn mealCompaundContainer'>
                        {this.state.mealProducts.map((product, index) => {
                            return (
                                <OneMealCompositionElement
                                    key={product.productId}
                                    product={product}
                                    edit={this.state.edit}
                                    onChangeInput={(event) => { this.onEditMealProductQuantity(index, event) }}
                                    onChangeRadio={(event) => { this.onEditMealProductUnit(index, event) }}
                                    onDelete={() => { this.onDeleteOneEemetOfComposition(index) }}
                                />
                            )
                        })}
                        {this.state.edit ? <PlusButton onClick={this.togleEditMealProducts} /> : null}
                    </div>
                </div>
                <div className='flexColumn'>
                    <div className='mealInforamtionContainer'>
                        <div className='flex'>
                            <div className='mealNameInformation'>
                                {this.state.edit ? editName : name}
                            </div>
                            <div className='closeMealInformationContainer'>
                                <button className='closeMealInformation' onClick={this.onClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className='flex margin5px'>
                            {this.state.edit ? editCalories : calories}
                        </div>
                        <div className='flex margin5px'>
                            {this.state.edit ? editProteins : proteins}
                        </div>
                        <div className='flex margin5px'>
                            {this.state.edit ? editFats : fats}
                        </div>
                        <div className='flex margin5px'>
                            {this.state.edit ? editCarbohydrates : carbohydrates}
                        </div>
                    </div>
                    <div className='mealRecipeContaner'>
                        {this.state.edit ? editRecipe : recipe}
                    </div>
                </div>


                <ModalWindow
                    active={this.state.editMealProducts}
                    togleActive={this.togleEditMealProducts}
                    cancel={this.onCancelEditMealProductsClone}
                >
                    <EditMealComposition
                        togleActive={this.togleEditMealProducts}
                        mealProductsClone={this.state.mealProductsClone}
                        onEditMealProductsClone={this.onEditMealProductsClone}
                        onCancelEditMealProductsClone={this.onCancelEditMealProductsClone}
                        onSaveEditMealProductsClone={this.onSaveEditMealProductsClone}
                    />
                </ModalWindow>
            </div>
        )
    }
}