import {
    GET_MARKET_CAP_REQUEST,
    GET_MARKET_CAP_SUCCESS,
    GET_MARKET_CAP_FAILURE,
} from "../types";

const initialState = {
    data: null,
    loading: false,
};
export default function marketInfo(state = initialState, action) {
    switch (action.type) {
        case GET_MARKET_CAP_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
            };
        case GET_MARKET_CAP_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case GET_MARKET_CAP_FAILURE:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}
