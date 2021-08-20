import { Component } from "react";

import './card.css';

export default class Card extends Component {

    constructor(props){
        super(props);

        this.state = {
            checked:this.props.selected
        }
    }

    // componentDidMount(){
    //     if(this.props.selected){
    //         this.setState({
    //             checked: true
    //         })
    //     }
    // }

    render() {

        const card =
            <div className='cardContainer' onClick={this.props.onClick}>
                <div className='cardPictureContainer'>
                    <img
                        className='cardPicture'
                        src="https://static7.depositphotos.com/1002351/792/i/600/depositphotos_7926477-stock-photo-new-potato.jpg"
                        alt="Картошка"
                    />
                </div>
                <div className='cardName'>
                    <div className='cardText'>
                        {this.props.title}
                    </div>
                </div>
            </div>

        const selectableCard =
        <>
            
            <div className='cardContainer' onClick={this.props.onClick}>
                <input 
                    type='checkbox' 
                    className='cardChecboxContainer' 
                    onClick={(e) => {
                        e.stopPropagation();
                        this.setState({
                            checked: !this.state.checked
                        });
                        this.props.onClickCheckbox();
                    }}
                    checked={this.state.checked}
                />
                <div className='cardPictureContainer'>
                    <img
                        className='cardPicture'
                        src="https://static7.depositphotos.com/1002351/792/i/600/depositphotos_7926477-stock-photo-new-potato.jpg"
                        alt="Картошка"
                    >
                    </img>
                </div>
                <div className='cardName'>
                    <div className='cardText'>
                        {this.props.title}
                    </div>
                </div>
            </div>
        </>
            

        return (
            this.props.selectable ? selectableCard:card 
        );
    }
}

Card.defaultProps ={
    selectable:false,
    onClick: () =>{},
    selected:false
}