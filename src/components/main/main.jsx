import { Component } from 'react';

import Header from '../header/header';
import UnderHeader from '../underHeader/underHeader';


export default class Main extends Component{
    render(){
        return(
            <div className='wrapper'>
                <Header/>
                <UnderHeader/>
            </div>
        )
    }
    
}