import {
    GET_BINANCE_REQUEST,
    GET_BINANCE_SUCCESS,
    GET_BINANCE_FAILURE,
} from "../types";

const initialState = {
    realtimeData: {
        isLoad: false,
        data: null,
        error: null,
    },
};

export default function binanceMarket(state = initialState, action) {
    switch (action.type) {
        case GET_BINANCE_REQUEST:
            return {
                ...state,
                isLoad: true,
            };
        case GET_BINANCE_SUCCESS:
            return {
                ...state,
                realtimeData: action.data,
            };
        case GET_BINANCE_FAILURE:
            return {
                ...state,
                isLoad: true,
                error: null,
            };
        default:
            return state;
    }
}
