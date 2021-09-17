import { Component } from "react";

import SearchPanel from '../../searchPanel/searchPanel';

import Cards from "../../cards/cards";
import PagesNavigator from "../../pagesNavigator/pagesNavigator";
import OkCancelButtons from "../../../../uiComponents/okCancelButtons/okCancelButtons";

import { connect } from "react-redux";
import { setMealsCurrentPageInStoreEdit } from "../../../../../redux/actions";

class EditStore extends Component {

    constructor(props){
        super(props);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.setMealsCurrentPageInStoreEdit = this.setMealsCurrentPageInStoreEdit.bind(this);
    }

    

    setMealsCurrentPageInStoreEdit(page){
        this.props.setMealsCurrentPageInStoreEdit(page);
        this.props.refreshMeals(page);
    }

    onCancelClick(){
        this.props.togleActive();
        this.props.onCanceStoreEdit();
    }

    onSaveClick(){
        this.props.togleActive();
        this.props.onSaveStoreEdit();
    }

    render() {
        return (
            <div className='editMealCompositionContainer'>
                <SearchPanel/>
                <Cards
                    selectable 
                    refreshCards={() => this.props.refreshMeals(this.props.mealsCurrentPageInStoreEdit)} 
                    cards={this.props.meals}
                    isCardChecked={this.isCardChecked}
                    onEditSelectedCards={this.props.onEditStoreClone} 
                />
                <PagesNavigator
                    totalPages={this.props.mealsTotalPagesInStoreEdit}
                    currentPage={this.props.mealsCurrentPageInStoreEdit}
                    onButtonClick={this.setMealsCurrentPageInStoreEdit}
                />
                <OkCancelButtons 
                    onOkClick={this.onSaveClick}
                    onCancelClick={this.onCancelClick}
                />
            </div>
        )
    }
}

const mapDispatchToProps = {
    setMealsCurrentPageInStoreEdit
}

const mapStateToProps = (state) => {//преобразует данные из стора в пропсы,которые мы далее используем в компоненте
    return {
        mealsCurrentPageInStoreEdit: state.pagesControolReducer.mealsCurrentPageInStoreEdit,
        mealsTotalPagesInStoreEdit: state.pagesControolReducer.mealsTotalPagesInStoreEdit
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStore);

