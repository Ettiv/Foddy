import { Component } from "react";

import SideBar from './sideBar/sideBar';
import Content from './content/content';

import './underHeader.css';

export default class UnderHeader extends Component{
    render(){
        return(
            <div className='underHeaderContainer'>
                <SideBar/>
                <Content/>
            </div>
        )
    }
}