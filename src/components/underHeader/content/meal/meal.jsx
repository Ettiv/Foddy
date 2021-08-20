import { Component } from "react";

import './meal.css';

import MealsDataService from "../../../../api/meals/mealsDataService.js";
import EditDeleteButtons from "../editDeleteButtons/editDeleteButtons";
import PlusButton from "../../../uiComponents/plusButton/plusButton";
import ModalWindow from "../../../uiComponents/modalWindow/modalWindow";
import EditMealComposition from './editMealComposition/editMealComposition';
export default class Meal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: +this.props.match.params.id,
            edit: false,
            name: '',
            mealProducts: [],
            mealProductsClone:[],
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
                });
            });

        MealsDataService.retriveMeal(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name
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
            name: this.state.name
        }

        if (this.state.id === -1) {
            MealsDataService.createMeal(meal)
                .then(() => {
                    this.togleEdit();
                });
        } else {
            MealsDataService.updateMeal(this.state.id, meal)
                .then(() => {
                    this.togleEdit();
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

    onEditMealProductsClone(checked,selectedProduct){
        if(checked){
            this.setState({
                mealProductsClone:[
                    ...this.state.mealProductsClone,
                    selectedProduct
                ]
            })
            console.log(this.state.mealProductsClone);
        } else {
            const index = this.state.mealProductsClone.findIndex(product => product.productId === selectedProduct.id);

            const before = this.state.mealProductsClone.slice(0,index);
            const after = this.state.mealProductsClone.slice(index+1);

            const newMealProductsClone = [...before,...after];

            this.setState({
                mealProductsClone: newMealProductsClone                
            });
            console.log(this.state.mealProductsClone);
        } 
    }

    onClose() {
        this.props.history.push(`/main/meals`);
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
                        />
                    </div>
                    <div className='flexColumn mealCompaundContainer'>
                        {this.state.mealProducts.map(product => {
                            if (this.state.edit) {
                                return (
                                    <div key={product.productId} className='margin5px'>
                                        <div className='flex'>
                                            <div>
                                                {product.productId}
                                            </div>
                                            <div>
                                                {product.quantity}
                                            </div>
                                            <div>
                                                {product.unitId}
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={product.productId} className='margin5px'>
                                        <div className='margin5px'>
                                            <div className='flex'>
                                                <div>
                                                    {product.productId}
                                                </div>
                                                <div>
                                                    {product.quantity}
                                                </div>
                                                <div>
                                                    {product.unitId}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        {this.state.edit ? <PlusButton onClick={this.togleEditMealProducts} /> : null}
                    </div>
                </div>
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
                </div>
                <ModalWindow
                    active={this.state.editMealProducts}
                    togleActive={this.togleEditMealProducts}
                >
                    <EditMealComposition
                        togleActive={this.togleEditMealProducts}
                        mealProductsClone={this.state.mealProductsClone}
                        onEditMealProductsClone={this.onEditMealProductsClone}
                    />
                </ModalWindow>
            </div>
        )
    }
}