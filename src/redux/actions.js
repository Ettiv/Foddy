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