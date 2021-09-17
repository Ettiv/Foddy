import { Component } from "react";
import ModalWindow from "../../../../uiComponents/modalWindow/modalWindow";
import UnitDataService from '../../../../../api/unit/unitDataService.js';

import './storeCard.css';
import OkCancelButtons from "../../../../uiComponents/okCancelButtons/okCancelButtons";
import DeleteButton from "../../../../uiComponents/deleteButton/deleteButton";
import MealsDataService from "../../../../../api/meals/mealsDataService";

export default class StoreCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            units: [],
            title: ''
        }

        this.togleEdit = this.togleEdit.bind(this);
        this.onOkClick = this.onOkClick.bind(this);
        this.onCancelClicked = this.onCancelClicked.bind(this);

    }

    componentDidMount() {
        UnitDataService.retriveAllUnits()
            .then(response => {
                this.setState({
                    units: response.data._embedded.units
                });
            });

        MealsDataService.retriveMeal(this.props.card.mealId)
            .then(response => {
                this.setState({
                    title: response.data.name
                });
            })

    }

    togleEdit() {
        this.setState({
            edit: !this.state.edit
        })
    }

    onOkClick() {
        this.togleEdit();
        this.props.onSaveStoreElementInformation();
    }

    onCancelClicked() {
        this.togleEdit();
        this.props.onCancelEditStoreElementInformation();
    }

    render() {

        return (
            <div className='storeCardContainer' onClick={this.togleEdit}>
                <DeleteButton className='storeCardDeleteButton' onClick={this.props.onDelete} />
                <div className='storeCardPictureContainer'>
                    <img
                        className='storeCardPicture'
                        src="https://static7.depositphotos.com/1002351/792/i/600/depositphotos_7926477-stock-photo-new-potato.jpg"
                        alt="Картошка"
                    />
                </div>
                <div className='storeCardInformation'>
                    <div className='storeCardInformationElement'>
                        {this.props.card.quantity}
                    </div>
                    <div className='storeCardInformationElement'>
                        {this.state.units.map(unit => {
                            if (unit.id === this.props.card.unitId) {
                                return unit.name
                            }
                        })}
                    </div>
                </div>
                <div className='cardName'>
                    <div className='cardText'>
                        {this.state.title}
                    </div>
                </div>
                <ModalWindow
                    active={this.state.edit}
                    togleActive={this.togleEdit}
                >
                    <div className="editStoreProductinformationContainer">
                        <div>
                            <label>Объеём продукта: </label>
                            <input
                                className='storeCardInput'
                                type="Number"
                                step="0.01"
                                min="0"
                                onChange={this.props.onEditStpredMealQuantity}
                                value={this.props.card.quantity}
                            />
                        </div>
                        <div className='storeCardRadioContainer'>
                            {this.state.units.map(unit => {
                                return (
                                    <div>
                                        <input
                                            type='radio'
                                            id={unit.id}
                                            name={unit.id}
                                            for='unit'
                                            checked={this.props.card.unitId === unit.id ? true : false}
                                            onChange={this.props.onEditStpredMealUnit}
                                        />
                                        <label for={unit.id}>
                                            {unit.name}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <OkCancelButtons onOkClick={this.onOkClick} onCancelClick={this.onCancelClicked} />
                        </div>
                    </div>
                </ModalWindow>
            </div>
        );
    }
}

StoreCard.defaultProps = {
    edit: false
}