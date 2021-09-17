import { Component } from "react";

import './cards.css';

import Card from './card/card';
import AddedCard from "./card/addedCard";
import StoreCard from "./storeCard/storeCard";

export default class Cards extends Component {

    componentDidMount() {
        this.props.refreshCards();
    }

    render() {

        const cards =
            this.props.cards.map(card => {
                // const selected = this.props.isCardChecked(card.id);
                return <Card
                    selected={card.stored}
                    selectable={this.props.selectable}
                    key={card.id}
                    title={card.name}
                    onClick={() => this.props.onCardClicked(card.id)}
                    onClickCheckbox={() => { this.props.onEditSelectedCards(card) }}
                />
            })

        const storeCards = 
        this.props.cards.map((card, index) => {
            return <StoreCard
                key={card.id}
                card={card}
                onDelete={() => {
                    this.props.onCardDelete(card);
                }}
                onEditStpredMealQuantity={(event) => this.props.onChangeInput(event, index)}
                onCancelEditStoreElementInformation={this.props.onCancelChange}
                onSaveStoreElementInformation={() => this.props.onSaveChange(card.id, index)}
                onEditStpredMealUnit={(event)=>{this.props.onChangeRadio(event, index)}}
            />
        })

        return (
            <div className='cardsContainer'>
                {this.props.selectable ? null : <AddedCard onClick={this.props.onAddedCardCliced} />}
                {this.props.store? storeCards:cards}
            </div>
        )
    }
}

Cards.defaultProps = {
    selectable: false,
    onCardClicked: () => {},
    store: false,
    isCardChecked: () => {},
    onCardDelete: () => {},
    onChangeInput: ()=>{},
    onSaveChange:()=>{},
    onCancelChange:()=>{},
    onChangeRadio:()=>{}
}