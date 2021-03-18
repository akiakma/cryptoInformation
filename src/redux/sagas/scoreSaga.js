import axios from "axios";

import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
    GET_SCORE_FAILURE,
    GET_SCORE_REQUEST,
    GET_SCORE_SUCCESS,
} from "../types";

const loadScoreApi = () => {
    return axios({
        method: "post",
        url:
            "https://api.flipsidecrypto.com/api/v2/metrics/rank/projects?api_key=6adb49e0-f3a4-4e29-b61a-eb66cf1beb60",
        data: {
            metric: "fcas",
            change_over_in_days: 7,
        },
    });
};

function* scoreLoad() {
    try {
        const result = yield call(loadScoreApi);
        yield put({
            type: GET_SCORE_SUCCESS,
            payload: result.data,
        });
    } catch (e) {
        yield put({
            type: GET_SCORE_FAILURE,
            payload: e,
        });
    }
}

function* watchScoreLoad() {
    yield takeEvery(GET_SCORE_REQUEST, scoreLoad);
}

export default function* scoreSaga() {
    yield all([fork(watchScoreLoad)]);
}
