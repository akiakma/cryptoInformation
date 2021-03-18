import {
    GET_COIN_MARKET_CAP_REQUEST,
    GET_COIN_MARKET_CAP_SUCCESS,
    GET_COIN_MARKET_CAP_FAILURE,
} from "../types";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export default function coinMarketCap(state = initialState, action) {
    switch (action.type) {
        case GET_COIN_MARKET_CAP_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_COIN_MARKET_CAP_SUCCESS:
            return {
                loading: false,
                data: action.data,
            };
        case GET_COIN_MARKET_CAP_FAILURE:
            return {
                loading: false,
                data: null,
                error: null,
            };
        default:
            return state;
    }
}
