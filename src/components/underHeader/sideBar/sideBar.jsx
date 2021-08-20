import { Component } from "react";
import { connect } from "react-redux";

import './sideBar.css';

import LiForSideBar from "./liForSideBar/liForSideBar";

import { svgPath } from "../../../constants/constants";

class SideBar extends Component{

    menuItems =[
        {
            svgSrc: svgPath+'/aperture.svg',
            text: 'Продукты',
            linkPath:'/main/products'
        }, 
        {
            svgSrc: svgPath+'/aperture.svg',
            text: 'Рецепты',
            linkPath:'/main/meals'
        }, 
        {
            svgSrc: svgPath+'/aperture.svg',
            text: 'Холодильник',
            linkPath:'/main/store'
        }, 
        {
            svgSrc: svgPath+'/aperture.svg',
            text: 'Пресеты',
            linkPath:'/main/presets'
        }
    ]

    render(){
        return(
            <div className={this.props.menuActive?"sideBarPosition sideBarActive":'sideBarPosition'}>
                <ul className='ulPosition'>
                    {this.menuItems.map((item,index)=>{
                        return <LiForSideBar key={index} index={index} svgSrc={item.svgSrc} text={item.text} linkPath={item.linkPath}/>
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {//преобразует данные из стора в пропсы,которые мы далее используем в компоненте
    return {
        menuActive: state.menuActiveReducer.menuActive
    };
}

export default connect(mapStateToProps,null)(SideBar);