import { Component } from "react";

import './editMealComposition.css';

import SearchPanel from '../../searchPanel/searchPanel';

import ProductDataService from '../../../../../api/productList/productDataService.js'

import Cards from "../../cards/cards";
import PagesNavigator from "../../pagesNavigator/pagesNavigator";
import OkCancelButtons from "../../../../uiComponents/okCancelButtons/okCancelButtons";

export default class EditMealComposition extends Component {

    constructor(props){
        super(props);

        this.state = {
            products:[]
        }
        this.refreshProducts = this.refreshProducts.bind(this);
    }

    refreshProducts(page = 0,size = 35){
        ProductDataService.retriveAllProducts(page,size)
        .then(response => {
            this.setState({
                products:response.data._embedded.products,
                totalPages:response.data.page.totalPages
            })
        })
    }

    render() {
        return (
            <div className='editMealCompositionContainer'>
                <SearchPanel/>
                <Cards
                    selectable 
                    refreshCards={this.refreshProducts} 
                    cards={this.state.products}
                    selectedCards={this.props.mealProductsClone}
                    onEditSelectedCards={this.props.onEditMealProductsClone} 
                />
                <PagesNavigator/>
                <OkCancelButtons 
                    onOkClick={this.props.togleActive}
                    onCancelClick={this.props.togleActive}
                />
            </div>
        )
    }
}

