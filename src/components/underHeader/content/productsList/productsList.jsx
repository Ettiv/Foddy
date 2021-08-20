import { Component } from "react";

import '../content.css';

import SearchPanel from "../searchPanel/searchPanel";
import Cards from "../cards/cards";
import PagesNavigator from "../pagesNavigator/pagesNavigator";
import ProductDataService from "../../../../api/productList/productDataService";

export default class ProductsList extends Component{

    constructor(props){
        super(props);

        this.state= {
            products: [],
            totalPages:0,
            currentPage:0
        }

        this.refreshProducts = this.refreshProducts.bind(this);
        this.onProductClicked = this.onProductClicked.bind(this);
        this.onAddedCardCliced = this.onAddedCardCliced.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);

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

    onProductClicked(id){
        this.props.history.push(`/main/products/${id}`);
    }

    onAddedCardCliced(){
        this.props.history.push(`/main/products/-1`);
    }

    setCurrentPage(page){
        this.setState({
            currentPage:page
        })
        this.refreshProducts(page);
    }

    render(){
        return(
            <div className='contentContainer'>
                <SearchPanel/>
                <Cards
                    onAddedCardCliced={this.onAddedCardCliced} 
                    refreshCards={this.refreshProducts} 
                    cards={this.state.products} 
                    onCardClicked={this.onProductClicked}
                />
                <PagesNavigator 
                    totalPages={this.state.totalPages}
                    currentPage={this.state.currentPage}
                    onButtonClick={this.setCurrentPage}
                />
            </div>
        )
    }
}