import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    GET_COIN_MARKET_CAP_FAILURE,
    GET_COIN_MARKET_CAP_REQUEST,
    GET_COIN_MARKET_CAP_SUCCESS,
} from "../types";

const loadCoinMarketCapAPI = () => {
    return axios({
        method: "get",
        url: "https://api.manana.kr/exchange/rate.json",
    });
};

function* coinMarketCapLoad() {
    try {
        const result = yield call(loadCoinMarketCapAPI);
        yield put({
            type: GET_COIN_MARKET_CAP_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.log(e);
    }
}

function* watchCoinMarketCapLoad() {
    yield takeEvery(GET_COIN_MARKET_CAP_REQUEST, coinMarketCapLoad);
}

export default function* CoinMarketCapSaga() {
    yield all([fork(watchCoinMarketCapLoad)]);
}
