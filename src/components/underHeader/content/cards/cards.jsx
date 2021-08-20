import { Component } from "react";

import './cards.css';

import Card from './card/card';
import AddedCard from "./card/addedCard";

export default class Cards extends Component {

    constructor(props) {
        super(props);

        this.isThisCardChecked = this.isThisCardChecked.bind(this);
    }

    componentDidMount() {
        this.props.refreshCards();
    }

    isThisCardChecked(cardId) {
        let selected = false;
        if (!this.props.selectable){
            return selected;
        }

        if (this.props.selectedCards.length > 0) {
            this.props.selectedCards.forEach(selectedCard => {
                if (selectedCard.productId === cardId) {
                    selected =  true;
                } 
            });
            return selected;
        } else {
            return selected;
        }
    }

    render() {
        return (
            <div className='cardsContainer'>
                {this.props.selectable ? null : <AddedCard onClick={this.props.onAddedCardCliced} />}
                {this.props.cards.map(card => {
                    const selected = this.isThisCardChecked(card.id);
                    return <Card
                        selected={selected}
                        selectable={this.props.selectable}
                        key={card.id}
                        title={card.name}
                        onClick={() => this.props.onCardClicked(card.id)}
                        onClickCheckbox={() => {this.props.onEditSelectedCards(selected,card)}}
                    />
                })}
            </div>
        )
    }
}

Cards.defaultProps = {
    selectable: false,
    onCardClicked:()=>{}
}