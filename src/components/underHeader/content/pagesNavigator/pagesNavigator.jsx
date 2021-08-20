import { Component } from "react";

import './pagesNavigator.css'

export default class PagesNavigator extends Component {

    render() {
        return (
            <div className='pagesNavigator'>
                <button
                    disabled={this.props.currentPage === 0 ? true : false}
                    className={this.props.currentPage === 0 ? 'pagesNavigatorButton pagesNavigatorButtonDisabled':'pagesNavigatorButton'}
                    onClick={() => this.props.onButtonClick(this.props.currentPage - 1)}
                >
                    «
                </button>
                <button
                    disabled={this.props.currentPage === this.props.totalPages - 1 ?true:false}
                    className={this.props.currentPage === this.props.totalPages - 1 ?'pagesNavigatorButton pagesNavigatorButtonDisabled':'pagesNavigatorButton'}
                    onClick={() => this.props.onButtonClick(this.props.currentPage + 1)}
                >
                    »
                </button>
            </div>
        )
    }
}