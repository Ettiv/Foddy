import { Component } from "react";
import { Switch} from "react-router";
import AutfinticatedRoute from "../../authinticatedRoute/authinticatedRoute";

import ProductsList from "./productsList/productsList";
import Product from "./product/product";
import MealsList from "./mealsList/mealsList";
import Meal from "./meal/meal";
import Store from "./store/store";


export default class Content extends Component{

    render(){
        return(
            <Switch>
                <AutfinticatedRoute exact path='/main/products' role='ROLE_USER' component={ProductsList}/>
                <AutfinticatedRoute exact path='/main/products/:id' role='ROLE_USER' component={Product}/>
                <AutfinticatedRoute exact path='/main/products/-1' role='ROLE_USER' component={Product}/>
                <AutfinticatedRoute exact path='/main/meals' role='ROLE_USER' component={MealsList}/>
                <AutfinticatedRoute exact path='/main/meals/:id' role='ROLE_USER' component={Meal}/>
                <AutfinticatedRoute exact path='/main/meals/-1' role='ROLE_USER' component={Meal}/>
                <AutfinticatedRoute exact path='/main/store' role='ROLE_USER' component={Store}/>
            </Switch>    
        )
    }
}