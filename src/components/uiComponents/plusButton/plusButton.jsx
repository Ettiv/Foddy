import { Component } from "react";

import './plusButton.css';

export default class PlusButton extends Component {

    render() {
        return (
            <div className={this.props.className + ' plusButtonContainer'} onClick={this.props.onClick}>
                <img
                    className='plusButonPicture'
                    src="/images/plusBlue.png"
                    alt="Добавить"
                />
            </div>
        )
    }
}