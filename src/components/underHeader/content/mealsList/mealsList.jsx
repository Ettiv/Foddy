import { Component } from "react";

import '../content.css';

import SearchPanel from "../searchPanel/searchPanel";
import Cards from "../cards/cards";
import PagesNavigator from "../pagesNavigator/pagesNavigator";
import MealsDataService from "../../../../api/meals/mealsDataService";
import {connect} from 'react-redux';
import {setMealsCurrentPage,setMealsTotalPages} from '../../../../redux/actions.js'

class MealsList extends Component{

    constructor(props){
        super(props);

        this.state= {
            meals: []
        }

        this.refreshMeals = this.refreshMeals.bind(this);
        this.onMealClicked = this.onMealClicked.bind(this);
        this.onAddedCardCliced = this.onAddedCardCliced.bind(this);
        this.setMealsCurrentPage = this.setMealsCurrentPage.bind(this);
    }

    setMealsCurrentPage(page){
        this.props.setMealsCurrentPage(page);
        this.refreshMeals(page)
    }

    refreshMeals(page = 0,size = 35){
        MealsDataService.retriveAllMeals(page,size)
        .then(response => {
            this.setState({
                meals:response.data._embedded.meals
            })
            this.props.setMealsTotalPages(response.data.page.totalPages);
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
                    refreshCards={() => this.refreshMeals(this.props.mealsCurrentPage)} 
                    cards={this.state.meals} 
                    onCardClicked={this.onMealClicked}
                />
                <PagesNavigator
                    totalPages={this.props.mealsTotalPages}
                    currentPage={this.props.mealsCurrentPage}
                    onButtonClick={this.setMealsCurrentPage}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    setMealsCurrentPage,
    setMealsTotalPages
}

const mapStateToProps = (state) => {//преобразует данные из стора в пропсы,которые мы далее используем в компоненте
    return {
        mealsCurrentPage: state.pagesControolReducer.mealsCurrentPage,
        mealsTotalPages: state.pagesControolReducer.mealsTotalPages
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MealsList);