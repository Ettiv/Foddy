const initialeState ={
    productsSearchParametr: '',
    mealsSearchParametr: '',
    productsInMealProductsSearchParametr: '',
    storeSearchParametr:'',
    mealsInStoreSearchParametr: ''
}//если вдруг стейт не определён,то будет назначено это значение

export const searchParametrsReducer = (state = initialeState,  action) => {

    switch(action.type) {
        case 'SET_PRODUCT_SEARCH_PARAMETR':
            return {...state, productsSearchParametr:action.payload}
        case 'SET_MEALS_SEARCH_PARAMETR':
            return {...state, mealsSearchParametr:action.payload}
        case 'SET_PRODUCTS_IN_MEAL_PRODUCTS_SEARCH_PARAMETR':
            return {...state, productsInMealProductsSearchParametr:action.payload}
        case 'SET_STORE_SEARCH_PARAMETR':
            return {...state, storeSearchParametr:action.payload}
        case 'SET_MEALS_IN_STORE_SEARCH_PARAMETR':
            return {...state, mealsInStoreSearchParametr:action.payload}
        
        default: return state;
    }
}