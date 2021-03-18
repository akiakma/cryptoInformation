import {
    GET_SCORE_FAILURE,
    GET_SCORE_REQUEST,
    GET_SCORE_SUCCESS,
} from "../types";

const initialState = {
    data: null,
    loading: false,
};

export default function score(state = initialState, action) {
    switch (action.type) {
        case GET_SCORE_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
            };
        case GET_SCORE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
            };
        case GET_SCORE_FAILURE:
            return {
                ...state,
                data: null,
                loading: false,
            };
        default:
            return state;
    }
}
