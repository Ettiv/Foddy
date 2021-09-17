import { Component } from "react";

import './modalWindow.css';

export default class ModalWindow extends Component {

    render() {
        return (
            <div className={this.props.active ? 'modal active' : 'modal'} onClick={() => {
                this.props.togleActive();
                this.props.cancel();
            }}>
                <div className ='modalContent' onClick={e => e.stopPropagation()}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

ModalWindow.defaultProps ={
    cancel:() => {}
}