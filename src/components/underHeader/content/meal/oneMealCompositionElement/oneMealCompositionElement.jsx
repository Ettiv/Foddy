import { Component } from "react";

import './oneMealCompositionElement.css';

import ProductDataService from "../../../../../api/productList/productDataService";
import UnitDataService from "../../../../../api/unit/unitDataService";
import DeleteButton from "../../../../uiComponents/deleteButton/deleteButton";

export default class OneMealCompositionElement extends Component {

    constructor(props){
        super(props);

        this.state = {
            productName:'',
            units:[]
        }
    }

    componentDidMount(){
        ProductDataService.retriveProduct(this.props.product.productId)
        .then(response => {
            this.setState({
                productName:response.data.name
            });
        });

        UnitDataService.retriveAllUnits()
        .then(response => {
            this.setState({
                units: response.data._embedded.units
            });
        });
    }

    render() {

        const editOneMealCompositionElement =
        <div className='oneMealCompositionElement'>
            <div className="onePartOfElement">
                {this.state.productName}
            </div>
            <div className="onePartOfElement">
                <input 
                    value={this.props.product.quantity}
                    onChange={this.props.onChangeInput}
                    className='compositionInut'    
                />
            </div>
            <div className="onePartOfElement">
                {this.state.units.map(unit => {
                    return (
                    <div className="onePartOfElement">
                        <input 
                            type='radio' 
                            id={unit.id} 
                            checked={this.props.product.unitId === unit.id?true:false} 
                            name={this.props.product.productId}
                            onChange={this.props.onChangeRadio}
                        />
                        <label for={unit.id}>
                            {unit.name}
                        </label>
                    </div>
                    )
                })}   
            </div>
            <DeleteButton 
                className='deleteOneMealCompositionElement'
                onClick={this.props.onDelete}    
            />
        </div>

        const oneMealCompositionElement =
        <div className='oneMealCompositionElement'>
            <div className="onePartOfElement">
                {this.state.productName}
            </div>
            <div className="onePartOfElement">
                {this.props.product.quantity}
            </div>
            <div className="onePartOfElement">
                {this.state.units.map(unit => {
                    if(unit.id === this.props.product.unitId){
                        return unit.name
                    }
                })}
            </div>
        </div>

        return (
           this.props.edit?editOneMealCompositionElement:oneMealCompositionElement
        )
    }
}
