export function setIndex(index){
    return{
        type: 'SET_INDEX',
        payload: index
    }
} 

export function togleMenuActive(){
    return{
        type: 'TOGLE_MENU_ACTIVE'
    }
}


export function setProductsCurrentPage(currentPage){
    return{
        type: 'SET_PRODUCTS_CURENT_PAGE',
        payload:currentPage
    }
}

export function setMealsCurrentPage(currentPage){
    return{
        type: 'SET_MEALS_CURENT_PAGE',
        payload:currentPage
    }
}

export function setProductsCurrentPageInMealProducts(currentPage){
    return{
        type: 'SET_PRODUCTS_CURENT_PAGE_IN_MEAL_PRODUCST',
        payload:currentPage
    }
}

export function setMealsCurrentPageInStore(currentPage){
    return{
        type: 'SET_MEALS_CURRENT_PAGE_IN_STORE',
        payload:currentPage
    }
}

export function setMealsCurrentPageInStoreEdit(currentPage){
    return{
        type: 'SET_MEALS_CURRENT_PAGE_IN_STORE_EDIT',
        payload:currentPage
    }
}

export function setProductsTotalPages(totalPages){
    return{
        type: 'SET_PRODUCTS_TOTAL_PAGES',
        payload:totalPages
    }
}

export function setMealsTotalPages(totalPages){
    return{
        type: 'SET_MEALS_TOTAL_PAGES',
        payload:totalPages
    }
}

export function setProductsTotalPagesInMealProducts(totalPages){
    return{
        type: 'SET_PRODUCTS_TOTAL_PAGES_IN_MEAL_PRODUCST',
        payload:totalPages
    }
}

export function setMealsTotalPagesInStore(totalPages){
    return{
        type: 'SET_MEALS_TOTAL_PAGES_IN_STORE',
        payload:totalPages
    }
}

export function setMealsTotalPagesInStoreEdit(totalPages){
    return{
        type: 'SET_MEALS_TOTAL_PAGES_IN_STORE_EDIT',
        payload:totalPages
    }
}

export function setProductSearhParametr(searchParametr){
    return{
        type: 'SET_PRODUCT_SEARCH_PARAMETR',
        payload:searchParametr
    }
}

export function setMealsSearhParametr(searchParametr){
    return{
        type: 'SET_MEALS_SEARCH_PARAMETR',
        payload:searchParametr
    }
}

export function setProductsInMealProductsSearhParametr(searchParametr){
    return{
        type: 'SET_PRODUCTS_IN_MEAL_PRODUCTS_SEARCH_PARAMETR',
        payload:searchParametr
    }
}

export function setStoreSearhParametr(searchParametr){
    return{
        type: 'SET_STORE_SEARCH_PARAMETR',
        payload:searchParametr
    }
}

export function setMealsInStoreSearhParametr(searchParametr){
    return{
        type: 'SET_MEALS_IN_STORE_SEARCH_PARAMETR',
        payload:searchParametr
    }
}






