import scoreSaga from "./scoreSaga";
import { all, fork } from "redux-saga/effects";
import marketCapSaga from "./marketCapSaga";
import CoinMarketCapSaga from "./CoinMarketCapSaga";
export default function* rootSaga() {
    yield all([fork(scoreSaga), fork(marketCapSaga), fork(CoinMarketCapSaga)]);
}
