const initialeState ={
    activeIndex: 0,
    menuActive: false
}//если вдруг стейт не определён,то будет назначено это значение

export const menuActiveReducer = (state = initialeState,  action) => {

    switch(action.type) {
        case 'SET_INDEX':
            return {...state, activeIndex:action.payload}
        case 'TOGLE_MENU_ACTIVE':
            return {...state, menuActive:!state.menuActive}
        default: return state;
    }
}