import { Component } from "react";

import '../content.css';

import SearchPanel from "../searchPanel/searchPanel";
import Cards from "../cards/cards";
import PagesNavigator from "../pagesNavigator/pagesNavigator";
import MealsDataService from "../../../../api/meals/mealsDataService";

export default class MealsList extends Component{

    constructor(props){
        super(props);

        this.state= {
            meals: []
        }

        this.refreshMeals = this.refreshMeals.bind(this);
        this.onMealClicked = this.onMealClicked.bind(this);
        this.onAddedCardCliced = this.onAddedCardCliced.bind(this);

    }

    refreshMeals(page = 0,size = 35){
        MealsDataService.retriveAllMeals(page,size)
        .then(response => {
            this.setState({
                meals:response.data._embedded.meals
            })
        })
    }

    onMealClicked(id){
        this.props.history.push(`/main/meals/${id}`);
    }

    onAddedCardCliced(){
        this.props.history.push(`/main/meals/-1`);
    }

    render(){
        return(
            <div className='contentContainer'>
                <SearchPanel/>
                <Cards
                    onAddedCardCliced={this.onAddedCardCliced} 
                    refreshCards={this.refreshMeals} 
                    cards={this.state.meals} 
                    onCardClicked={this.onMealClicked}
                />
                <PagesNavigator/>
            </div>
        )
    }
}