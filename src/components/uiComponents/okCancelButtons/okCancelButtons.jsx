import { Component } from "react";

import './okCancelButtons.css';

export default class OkCancelButtons extends Component{

    render(){
        return(
            <div className={this.props.className + ' okCancelButtonsContainer'}>
                <button 
                    className='okButton'
                    onClick={this.props.onOkClick} 
                >
                    Сохранить
                </button>
                <button 
                    className='cancelButton'
                    onClick={this.props.onCancelClick}
                >
                    Отмена
                </button>
            </div>
        )
    }
}