import { Component } from "react";

import '../content.css';

import SearchPanel from "../searchPanel/searchPanel";
import Cards from "../cards/cards";
import PagesNavigator from "../pagesNavigator/pagesNavigator";
import ProductDataService from "../../../../api/productList/productDataService";
import { connect } from 'react-redux';
import { setProductsCurrentPage, setProductsTotalPages, setProductSearhParametr } from '../../../../redux/actions.js'

class ProductsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
        }

        this.refreshProducts = this.refreshProducts.bind(this);
        this.onProductClicked = this.onProductClicked.bind(this);
        this.onAddedCardCliced = this.onAddedCardCliced.bind(this);
        this.setProductsCurrentPage = this.setProductsCurrentPage.bind(this);
        this.onSearchProduct = this.onSearchProduct.bind(this);

    }

    refreshProducts(page = 0, size = 35, searchParametr = '') {
        if (searchParametr === '') {
            ProductDataService.retriveAllProducts(page, size)
                .then(response => {
                    this.setState({
                        products: response.data._embedded.products
                    })
                    this.props.setProductsTotalPages(response.data.page.totalPages);
                })
        } else {
            ProductDataService.retriveAllProductsSearchedByName(searchParametr)
                .then(response => {
                    this.setState({
                        products: response.data._embedded.products
                    })
                    // this.props.setProductsTotalPages(response.data.page.totalPages);
                })
        }
    }

    onProductClicked(id) {
        this.props.history.push(`/main/products/${id}`);
    }

    onAddedCardCliced() {
        this.props.history.push(`/main/products/-1`);
    }

    setProductsCurrentPage(page) {
        this.props.setProductsCurrentPage(page);
        this.refreshProducts(page)
    }

    onSearchProduct(event) {
        this.props.setProductSearhParametr(event.target.value);
        this.refreshProducts(0,35,event.target.value);
    }

    render() {
        return (
            <div className='contentContainer'>
                <SearchPanel
                    onSearch={this.onSearchProduct}
                    value={this.props.productsSearchParametr}
                />
                <Cards
                    onAddedCardCliced={this.onAddedCardCliced}
                    refreshCards={() => this.refreshProducts(this.props.productsCurrentPage)}
                    cards={this.state.products}
                    onCardClicked={this.onProductClicked}
                />
                <PagesNavigator
                    totalPages={this.props.productsTotalPages}
                    currentPage={this.props.productsCurrentPage}
                    onButtonClick={this.setProductsCurrentPage}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    setProductsCurrentPage,
    setProductsTotalPages,
    setProductSearhParametr
}

const mapStateToProps = (state) => {//преобразует данные из стора в пропсы,которые мы далее используем в компоненте
    return {
        productsCurrentPage: state.pagesControolReducer.productsCurrentPage,
        productsTotalPages: state.pagesControolReducer.productsTotalPages,
        productsSearchParametr: state.searchParametrsReducer.productsSearchParametr
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);