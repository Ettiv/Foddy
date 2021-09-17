import { Component } from "react";

import './editMealComposition.css';

import SearchPanel from '../../searchPanel/searchPanel';

import ProductDataService from '../../../../../api/productList/productDataService.js'

import Cards from "../../cards/cards";
import PagesNavigator from "../../pagesNavigator/pagesNavigator";
import OkCancelButtons from "../../../../uiComponents/okCancelButtons/okCancelButtons";

import {connect} from 'react-redux';
import { setProductsCurrentPageInMealProducts, setProductsTotalPagesInMealProducts } from "../../../../../redux/actions.js";

class EditMealComposition extends Component {

    constructor(props){
        super(props);

        this.state = {
            products:[]
        }
        this.refreshProducts = this.refreshProducts.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.isCardChecked = this.isCardChecked.bind(this);
        this.setProductsCurrentPageInMealProducts = this.setProductsCurrentPageInMealProducts.bind(this);
    }

    refreshProducts(page = 0,size = 30){
        ProductDataService.retriveAllProducts(page,size)
        .then(response => {
            this.setState({
                products:response.data._embedded.products
            })
            this.props.setProductsTotalPagesInMealProducts(response.data.page.totalPages)
        })
    }

    setProductsCurrentPageInMealProducts(page){
        this.props.setProductsCurrentPageInMealProducts(page);
        this.refreshProducts(page)
    }

    isCardChecked(cardId) {
        let selected = false;
    
        if (this.props.mealProductsClone.length > 0) {
            this.props.mealProductsClone.forEach(selectedCard => {
                if (selectedCard.productId === cardId) {
                    selected = true;
                }
            });
            return selected;
        } else {
            return selected;
        }
    }

    onCancelClick(){
        this.props.togleActive();
        this.props.onCancelEditMealProductsClone();
    }

    onSaveClick(){
        this.props.togleActive();
        this.props.onSaveEditMealProductsClone();
    }

    render() {
        return (
            <div className='editMealCompositionContainer'>
                <SearchPanel/>
                <Cards
                    selectable 
                    refreshCards={() => this.refreshProducts(this.props.productsCurrentPageInMealProducts,30)} 
                    cards={this.state.products}
                    isCardChecked={this.isCardChecked}
                    onEditSelectedCards={this.props.onEditMealProductsClone} 
                />
                <PagesNavigator
                    totalPages={this.props.productsTotalPagesInMealProducts}
                    currentPage={this.props.productsCurrentPageInMealProducts}
                    onButtonClick={this.setProductsCurrentPageInMealProducts}
                />
                <OkCancelButtons 
                    onOkClick={this.onSaveClick}
                    onCancelClick={this.onCancelClick}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    setProductsCurrentPageInMealProducts,
    setProductsTotalPagesInMealProducts
}

const mapStateToProps = (state) => {//преобразует данные из стора в пропсы,которые мы далее используем в компоненте
    return {
        productsCurrentPageInMealProducts: state.pagesControolReducer.productsCurrentPageInMealProducts,
        productsTotalPagesInMealProducts:state.pagesControolReducer.productsTotalPagesInMealProducts
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMealComposition);

