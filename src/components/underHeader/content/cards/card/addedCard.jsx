import { Component } from "react";

import './card.css';

export default class AddedCard extends Component {

    render() {
        return (
            <div className='addedCardContainer' onClick={this.props.onClick}>
                <img
                    className='addedCardPicture'
                    src="/images/plusBlue.png"
                    alt="Добавить"
                />
            </div>
        )
    }
}