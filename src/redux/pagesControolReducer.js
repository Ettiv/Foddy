const initialeState ={
    productsCurrentPage:0,
    productsTotalPages:0,
    mealsCurrentPage:0,
    mealsTotalPages:0,
    productsCurrentPageInMealProducts:0,
    productsTotalPagesInMealProducts:0,
    storedMealsCurrentPage:0,
    storedMealsTotalPages:0,
    mealsCurrentPageInStoreEdit:0,
    mealsTotalPagesInStoreEdit:0
}//если вдруг стейт не определён,то будет назначено это значение

export const pagesControolReducer = (state = initialeState,  action) => {

    switch(action.type) {
        case 'SET_PRODUCTS_CURENT_PAGE':
            return {...state, productsCurrentPage:action.payload}
        case 'SET_MEALS_CURENT_PAGE':
            return {...state, mealsCurrentPage:action.payload}
        case 'SET_PRODUCTS_CURENT_PAGE_IN_MEAL_PRODUCST':
            return {...state, productsCurrentPageInMealProducts:action.payload}
        case 'SET_MEALS_CURRENT_PAGE_IN_STORE':
            return {...state, storedMealsCurrentPage:action.payload}
        case 'SET_MEALS_CURRENT_PAGE_IN_STORE_EDIT':
            return {...state, mealsCurrentPageInStoreEdit:action.payload}
        case 'SET_PRODUCTS_TOTAL_PAGES':
            return {...state, productsTotalPages:action.payload}
        case 'SET_MEALS_TOTAL_PAGES':
            return {...state, mealsTotalPages:action.payload}
        case 'SET_PRODUCTS_TOTAL_PAGES_IN_MEAL_PRODUCST':
            return {...state, productsTotalPagesInMealProducts:action.payload}
        case 'SET_MEALS_TOTAL_PAGES_IN_STORE':
            return {...state, storedMealsTotalPages:action.payload}
        case 'SET_MEALS_TOTAL_PAGES_IN_STORE_EDIT':
            return {...state, mealsTotalPagesInStoreEdit:action.payload}
        
        default: return state;
    }
}