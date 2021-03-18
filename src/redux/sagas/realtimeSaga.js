import axios from "axios";
import { GET_MARKETCAP_SUCCESS } from "../types";

export async function getMarket(dispatch) {
    try {
        // 마켓 가져오기 중
        const response = await axios.get("https://api.upbit.com/v1/market/all");
        dispatch({
            type: "GET_MARKET_SUCCESS",
            data: response.data,
        });

        // 마켓 리스트를 추출하여 웹소켓 실행
        const marketList = response.data
            .filter(list => list.market.includes("KRW-"))
            .map(list => list.market);

        const ws = new WebSocket("wss://api.upbit.com/websocket/v1");
        ws.onopen = () => {
            // 웹소켓 연결
            dispatch({
                type: "GET_REALTIME_DATA",
            });
            ws.send(
                `[{"ticket":"test"},{"type":"ticker","codes": ${JSON.stringify(
                    marketList
                )}}]`
            );
        };
        ws.onmessage = async e => {
            // 실시간 데이터 수신
            const { data } = e;
            const text = await new Response(data).text();

            // console.log(JSON.parse(text));
            dispatch({
                type: "GET_REALTIME_DATA_SUCCESS",
                data: JSON.parse(text),
            });
        };
        ws.onerror = e => {
            // 실시간 데이터 수신 에러
            dispatch({
                type: "GET_REALTIME_DATA_ERROR",
                error: e,
            });
        };
    } catch (e) {
        // 마켓 가져오기 실패
        dispatch({
            type: "GET_MARKET_ERROR",
            error: e,
        });
    }
}

export async function getBinanceMarket(dispatch) {
    try {
        let wssServer = "wss://stream.binance.com:9443/stream?streams=";

        const websocket = new WebSocket(
            `wss://stream.binance.com:9443/ws/btcusdt@ticker`
        );
        websocket.onmessage = function (event) {
            let Data = JSON.parse(event.data);
            dispatch({
                type: "GET_BINANCE_SUCCESS",
                data: Data,
            });
        };
    } catch (e) {
        console.log(e);
    }
}
//{ [Data.data.s]: Data.data.a },

export async function MarketCap(dispatch) {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d,30d,1y"
        );
        dispatch({
            type: GET_MARKETCAP_SUCCESS,
            data: response.data,
        });
    } catch (e) {
        console.log(e);
    }
}
