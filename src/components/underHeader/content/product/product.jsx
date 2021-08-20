import { Component } from "react";

import './product.css';

import ProductDataService from "../../../../api/productList/productDataService";
import EditDeleteButtons from "../editDeleteButtons/editDeleteButtons";
import CustomSelect from "../../../uiComponents/customSelect/customSelect";
export default class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: +this.props.match.params.id,
            productTypes: [],
            name: '',
            calories: null,
            proteins: null,
            fats: null,
            carbohydrates: null,
            productTypeId: null,
            edit: false
        }

        this.togleEdit = this.togleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {

        if (this.state.id === -1) {
            this.setState({
                edit: true
            })
        }

        ProductDataService.retriveAllProductsTypes()
            .then(response => {
                let types = [
                    {
                        "value": null,
                        "label": "..."
                    }
                ];
                response.data._embedded.productTypes.forEach(type => {
                    types.push({
                        "value": type.id,
                        "label": type.name
                    })
                });
                this.setState({
                    productTypes: types
                })
            })

        ProductDataService.retriveProduct(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    calories: response.data.calories,
                    proteins: response.data.proteins,
                    fats: response.data.fats,
                    carbohydrates: response.data.carbohydrates,
                    productTypeId: response.data.productTypeId
                })
            })
    }

    togleEdit() {
        this.setState({
            edit: !this.state.edit
        })
    }

    onSave() {
        let product = {
            name: this.state.name,
            calories: this.state.calories,
            proteins: this.state.proteins,
            fats: this.state.fats,
            carbohydrates: this.state.carbohydrates,
            productTypeId: this.state.productTypeId
        }

        if (this.state.id === -1) {
            ProductDataService.createProduct(product)
                .then(() => {
                    this.togleEdit();
                });
        } else {
            ProductDataService.updateProduct(this.state.id, product)
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
            this.props.history.push(`/main/products`);
        } else {
            ProductDataService.deleteProduct(id)
                .then(() => {
                    this.props.history.push(`/main/products`);
                });
        }
    }

    onClose() {
        this.props.history.push(`/main/products`);
    }

    render() {

        const name = this.state.name;
        const editName =
            <>
                <label htmlFor='productName'>Название продукта:  </label>
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
                <label htmlFor='productCalories'>Калории:  </label>
                <input
                    id='productCalories'
                    value={this.state.calories}
                    onChange={this.handleChange}
                    name='calories'
                    type='number'
                />
            </>

        const proteins = 'Протеины: ' + this.state.proteins;
        const editProteins =
            <>
                <label htmlFor='productProteins'>Протеины:  </label>
                <input
                    id='productProteins'
                    value={this.state.proteins}
                    onChange={this.handleChange}
                    name='proteins'
                    type='number'
                />
            </>

        const fats = 'Жиры: ' + this.state.fats;
        const editFats =
            <>
                <label htmlFor='producteditFats'>Жиры:  </label>
                <input
                    id='producteditFats'
                    value={this.state.fats}
                    onChange={this.handleChange}
                    name='fats'
                    type='number'
                />
            </>


        const carbohydrates = 'Углеводы: ' + this.state.carbohydrates;
        const editСarbohydrates =
            <>
                <label htmlFor='producteditСarbohydrates'>Углеводы:  </label>
                <input
                    id='producteditСarbohydrates'
                    value={this.state.carbohydrates}
                    onChange={this.handleChange}
                    name='carbohydrates'
                    type='number'
                />
            </>

        const productType = 'Тип продукта: ' + this.state.productTypeId;
        const editProductType =
            <>
                <label htmlFor='productType'>Тип продуката:  </label>
                <CustomSelect
                    options={this.state.productTypes}
                    name='productTypeId'
                    onChange={this.handleChange}
                />
            </>



        return (
            <div className='productContainer'>
                <div className='productPictureButtonsContainer'>
                    <div className='productPictireContainerProfile'>
                        <img
                            className='productPictureProfile'
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
                <div className='productInforamtionContainer'>
                    <div className='flex'>
                        <div className='productNameInformation'>
                            {this.state.edit ? editName : name}
                        </div>
                        <div className='closeProductInformationContainer'>
                            <button className='closeProductInformation' onClick={this.onClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='flex margin5px'>
                        {this.state.edit ? editProductType : productType}
                    </div>
                    <div className='flex margin5px'>
                        {this.state.edit ? editCalories : calories}
                    </div>
                    <div className='flex margin5px' >
                        {this.state.edit ? editProteins : proteins}
                    </div>
                    <div className='flex margin5px'>
                        {this.state.edit ? editFats : fats}
                    </div>
                    <div className='flex margin5px'>
                        {this.state.edit ? editСarbohydrates : carbohydrates}
                    </div>
                </div>
            </div>
        )
    }
}