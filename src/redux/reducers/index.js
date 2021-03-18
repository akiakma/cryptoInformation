import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import realtimeReducer from "./realtimeReducer";
import score from "./scoreReducer";
import marketInfo from "./marketCap";
import binanceMarket from "./Binance";
import coinMarketCap from "./CoinMarketCap";

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        data: realtimeReducer,
        score: score,
        marketInfo: marketInfo,
        binance: binanceMarket,
        coinmarketcap: coinMarketCap,
    });

export default createRootReducer;
