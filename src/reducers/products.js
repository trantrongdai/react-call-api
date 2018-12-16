import * as Types from './../constants/ActionTypes';
var initialState = [];

var findIndex = (products, id) => {
    var result = -1;
    products.map((product, index) => {
        if (product.id === id) {
            result = index;
        }
    });
    return result
}

const products = (state = initialState, action) => {
    var ind = -1;
    switch (action.type) {
        case Types.FETCH_PRODUCT:
            state = action.products;
            return [...state];

        case Types.ADD_PRODUCT:
            state.push(action.product);
            return [...state];

        case Types.UPDATE_PRODUCT:
            ind = findIndex(state, action.product.id);
            state[ind] = action.product;
            return [...state];

        case Types.DELETE_PRODUCT:
            ind = findIndex(state, action.id);
            state.splice(ind, 1);
            return [...state];

        default: return [...state];
    }
};
export default products;