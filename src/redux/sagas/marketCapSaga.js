import axios from "axios";

import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    GET_MARKET_CAP_REQUEST,
    GET_MARKET_CAP_SUCCESS,
    GET_MARKET_CAP_FAILURE,
} from "../types";

const loadMarketApi = () => {
    return axios({
        method: "get",
        url:
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d,30d,1y",
    });
};

function* marketInfoLoad() {
    try {
        const result = yield call(loadMarketApi);
        yield put({
            type: GET_MARKET_CAP_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: GET_MARKET_CAP_FAILURE,
            payload: e,
        });
    }
}

function* watchMarketInfoLoad() {
    yield takeEvery(GET_MARKET_CAP_REQUEST, marketInfoLoad);
}

export default function* marketCapSaga() {
    yield all([fork(watchMarketInfoLoad)]);
}
