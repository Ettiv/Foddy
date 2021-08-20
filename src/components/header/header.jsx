import { Component } from "react";
import { connect } from 'react-redux';

import './header.css';

import { togleMenuActive } from "../../redux/actions";

class Header extends Component {

    constructor(props) {
        super(props);

        this.onTogleMenu = this.onTogleMenu.bind(this);
    }

    onTogleMenu() {
        this.props.togleMenuActive();
    }

    render() {
        return (
            <header className="header">
                <button className='HeaderMenuButton' onClick={this.onTogleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>

            </header>
        )
    }
}

const mapDispatchToProps = {
    togleMenuActive
}

export default connect(null, mapDispatchToProps)(Header);