import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import './liForSideBar.css';

import { setIndex } from '../../../../redux/actions.js';

class LiForSideBar extends Component {

    constructor(props) {
        super(props);

        this.liOnClick = this.liOnClick.bind(this);
    }

    liOnClick() {
        this.props.setIndex(this.props.index);
    }

    render() {

        return (
            <Link className='liLink' to={this.props.linkPath}>
                <li className={this.props.index === this.props.activeIndex ? 'liContainer menuActive' : 'liContainer'} onClick={this.liOnClick}>
                    <div className='svg'>
                        <img src={this.props.svgSrc} alt='ikon' />
                    </div>
                    <div>
                        <h5 className='liText'>{this.props.text}</h5>
                    </div>
                </li>
            </Link>
        )
    }
}

const mapStateToProps = (state) => {//преобразует данные из стора в пропсы,которые мы далее используем в компоненте
    return {
        activeIndex: state.menuActiveReducer.activeIndex
    };
}

const mapDispatchToProps = {
    setIndex
}

export default connect(mapStateToProps, mapDispatchToProps)(LiForSideBar);