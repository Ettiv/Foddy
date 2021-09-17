import { Component } from "react";

import './store.css';

import SearchPanel from "../searchPanel/searchPanel";
import Cards from "../cards/cards";
import PagesNavigator from "../pagesNavigator/pagesNavigator";
import StoreDataService from "../../../../api/store/storeDataService";
import MealsDataService from "../../../../api/meals/mealsDataService";
import ModalWindow from "../../../uiComponents/modalWindow/modalWindow";
import EditStore from "./editStore/editStore";
import { connect } from "react-redux";
import { setMealsCurrentPageInStore , setMealsTotalPagesInStore, setMealsTotalPagesInStoreEdit} from "../../../../redux/actions";


class Store extends Component {

    constructor(props) {
        super(props);

        this.state = {
            store: [],
            storeClone: [],
            editStore: false,
            meals:[],
            mealsUntouched:[]
        }

        this.refreshStore = this.refreshStore.bind(this);
        this.onAddedCardCliced = this.onAddedCardCliced.bind(this);
        this.togleEditStore = this.togleEditStore.bind(this);
        this.onEditStoreClone = this.onEditStoreClone.bind(this);
        this.onSaveStoreEdit = this.onSaveStoreEdit.bind(this);
        this.onCanceStoreEdit = this.onCanceStoreEdit.bind(this);
        this.onDeleteMealFromStore = this.onDeleteMealFromStore.bind(this);
        this.onEditStpredMealQuantity = this.onEditStpredMealQuantity.bind(this);
        this.onSaveStoreElementInformation = this.onSaveStoreElementInformation.bind(this);
        this.onCancelEditStoreElementInformation = this.onCancelEditStoreElementInformation.bind(this);
        this.onEditStpredMealUnit = this.onEditStpredMealUnit.bind(this);
        this.setMealsCurrentPageInStore = this.setMealsCurrentPageInStore.bind(this);
        this.refreshStoredMealsTotalPages = this.refreshStoredMealsTotalPages.bind(this);
        this.refreshMeals = this.refreshMeals.bind(this);
    }

    refreshStore(page = 0, size = 35) {
        StoreDataService.retriveAllProductsInStore(page, size)
            .then(response => {
                this.setState({
                    store: response.data._embedded.stores,
                    storeClone: response.data._embedded.stores
                })
                this.props.setMealsTotalPagesInStore(response.data.page.totalPages);
            })
    }

    refreshMeals(page = 0,size = 30){
        MealsDataService.retriveAllMeals(page,size)
        .then(response => {
            this.setState({
                meals:response.data._embedded.meals,
                mealsUntouched:response.data._embedded.meals
            })
            this.props.setMealsTotalPagesInStoreEdit(response.data.page.totalPages);
        })
    }

    refreshStoredMealsTotalPages(page = 0, size = 35){
        StoreDataService.retriveAllProductsInStore(page, size)
        .then(response => {
            this.setState({
                storedMealsTotalPages: response.data.page.totalPages
            })
        })
    }
    
    setMealsCurrentPageInStore(page){
        this.props.setMealsCurrentPageInStore(page);
        this.refreshStore(page);
    }

    togleEditStore() {
        this.setState({
            editStore: !this.state.editStore
        });
    }

    onCanceStoreEdit() {
        this.setState({
            storeClone: this.state.store,
            meals: this.state.mealsUntouched
        });
    }

    onDeleteMealFromStore(clickedMeal) {

        StoreDataService.deleteMealInStore(clickedMeal.id)
            .then(() => {
                const index = this.state.store.findIndex(storeElement => storeElement.mealId === clickedMeal.mealId);

                const before = this.state.store.slice(0, index);
                const after = this.state.store.slice(index + 1);

                const newStoreClone = [...before, ...after];

                this.setState({
                    store: newStoreClone,
                    storeClone: newStoreClone
                });
            })
    }

    onSaveStoreEdit() {
        this.state.store.forEach(storeElement => {
            let deleted = true;
            this.state.storeClone.forEach(storeCloneElement => {
                if (storeElement.mealId === storeCloneElement.mealId) {
                    deleted = false;
                }
            })
            if (deleted) {
                StoreDataService.deleteMealInStore(storeElement.id);
                this.refreshStoredMealsTotalPages();
            }
        });

        this.state.storeClone.forEach(storeCloneElement => {
            let created = true;
            this.state.store.forEach(storeElement => {
                if (storeCloneElement.mealId === storeElement.mealId) {
                    created = false;
                }
            })
            if (created) {
                StoreDataService.createMealInStore(storeCloneElement)
                    .then(response => {
                        const createdMeal = response.data;

                        const index = this.state.storeClone.findIndex(storeElement => storeElement.mealId === createdMeal.mealId);

                        const before = this.state.storeClone.slice(0, index);
                        const after = this.state.storeClone.slice(index + 1);

                        const newStoreClone = [...before, createdMeal, ...after];

                        this.setState({
                            storeClone: newStoreClone,
                            store: newStoreClone
                        });
                        this.refreshStoredMealsTotalPages();
                    })
            }
        })

        this.setState({
            store: this.state.storeClone,
            mealsUntouched:this.state.meals
        });
    }

    onAddedCardCliced() {
        this.togleEditStore();
    }

    onEditStpredMealQuantity(event, index) {
        const before = this.state.store.slice(0, index);
        const after = this.state.store.slice(index + 1);

        const newStoreElement = {
            id: this.state.store[index].id,
            quantity: event.target.value,
            unitId: this.state.store[index].unitId,
            mealId: this.state.store[index].mealId
        }

        const newStore = [...before, newStoreElement, ...after];

        this.setState({
            store: newStore
        });
    }

    onEditStpredMealUnit(event, index) {
        const before = this.state.store.slice(0, index);
        const after = this.state.store.slice(index + 1);

        const newStoreElement = {
            id: this.state.store[index].id,
            quantity: this.state.store[index].quantity,
            unitId: parseInt(event.target.name),
            mealId: this.state.store[index].mealId
        }

        const newStore = [...before, newStoreElement, ...after];

        this.setState({
            store: newStore
        });
    }

    onSaveStoreElementInformation(id, index) {
        StoreDataService.updateMealInStore(id , this.state.store[index]).then(() => {
            this.setState({
                storeClone: this.state.store
            });
        })
    }

    onCancelEditStoreElementInformation(){
        this.setState({
            store: this.state.storeClone
        });
    }

    onEditStoreClone(selectedCard) {

        const index = this.state.meals.findIndex(meal => meal.id === selectedCard.id);

        if (this.state.meals[index].stored !== true) {

            const before = this.state.meals.slice(0, index);
            const after = this.state.meals.slice(index + 1);

            const newMealsElement = {
                ...this.state.meals[index],
                stored: true
            }

            const newMeals = [...before,newMealsElement ,...after];

            this.setState({
                storeClone: [
                    ...this.state.storeClone,
                    {
                        mealId: this.state.meals[index].id,
                        quantity: 0,
                        unitId: 1
                    }
                ],
                meals: newMeals
            })
            
        } else {
            const beforeStoreClone = this.state.storeClone.slice(0, index);
            const afterStoreClone = this.state.storeClone.slice(index + 1);

            const newStoreClone = [...beforeStoreClone, ...afterStoreClone];

            const beforeMeals = this.state.meals.slice(0, index);
            const afterMeals = this.state.meals.slice(index + 1);

            const newMealsElement = {
                ...this.state.meals[index],
                stored: false
            }

            const newMeals = [...beforeMeals,newMealsElement ,...afterMeals];

            this.setState({
                storeClone: newStoreClone,
                meals: newMeals
            });
        }

    }

    render() {
        return (
            <div className='contentContainer'>
                <SearchPanel />
                <Cards
                    onAddedCardCliced={this.onAddedCardCliced}
                    refreshCards={() => this.refreshStore(0, 35)}
                    cards={this.state.store}
                    onChangeInput={this.onEditStpredMealQuantity}
                    onSaveChange={this.onSaveStoreElementInformation}
                    onCancelChange={this.onCancelEditStoreElementInformation}
                    onCardDelete={this.onDeleteMealFromStore}
                    onChangeRadio={this.onEditStpredMealUnit}
                    store
                />
                <PagesNavigator 
                    totalPages={this.props.storedMealsTotalPages}
                    currentPage={this.props.storedMealsCurrentPage}
                    onButtonClick={this.setMealsCurrentPageInStore}
                />
                <ModalWindow
                    active={this.state.editStore}
                    togleActive={this.togleEditStore}
                    cancel={this.onCanceStoreEdit}
                >
                    <EditStore
                        storeClone={this.state.storeClone}
                        onEditStoreClone={this.onEditStoreClone}
                        onSaveStoreEdit={this.onSaveStoreEdit}
                        onCanceStoreEdit={this.onCanceStoreEdit}
                        togleActive={this.togleEditStore}
                        meals={this.state.meals}
                        refreshMeals={this.refreshMeals}
                    />
                </ModalWindow>
            </div>
        )
    }
}

const mapDispatchToProps = {
    setMealsCurrentPageInStore,
    setMealsTotalPagesInStore,
    setMealsTotalPagesInStoreEdit
}

const mapStateToProps = (state) => {//преобразует данные из стора в пропсы,которые мы далее используем в компоненте
    return {
        storedMealsCurrentPage: state.pagesControolReducer.storedMealsCurrentPage,
        storedMealsTotalPages: state.pagesControolReducer.storedMealsTotalPages,
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);