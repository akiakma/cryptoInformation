import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    MarketCap,
    getBinanceMarket,
    getMarket,
} from "../redux/sagas/realtimeSaga";
import "./RealtimeChart.css";
import RealtimeChartList from "./RealtimeChartList";
import upbit from "../asset/upbit.svg";
import binance from "../asset/binance.png";
import { SwapOutlined, SearchOutlined } from "@ant-design/icons";
import Marquee from "react-fast-marquee";

const RealtimeChart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getMarket(dispatch);
    }, [dispatch]);

    useEffect(() => {
        MarketCap(dispatch);
    }, []);
    const marketData = useSelector(state => state.data.market);
    const realtimeData = useSelector(state => state.data.realtimeData.data);

    // console.log(realtimeData);
    const [onSort, setOnSort] = useState("one");

    const coinMarketCapData = useSelector(state => state.data.marketCap.data);
    const dollar = useSelector(state => state.coinmarketcap);
    const dollarPrice = dollar.data && dollar.data[1].rate;
    const sortedVolume = useCallback(() => {
        switch (onSort) {
            case "one":
                return (
                    realtimeData &&
                    realtimeData.sort(
                        (a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h
                    )
                );
            case "two":
                return (
                    realtimeData &&
                    realtimeData.sort(
                        (a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h
                    )
                );
            case "three":
                return (
                    realtimeData &&
                    realtimeData.sort((a, b) => b.trade_price - a.trade_price)
                );
            case "four":
                return (
                    realtimeData &&
                    realtimeData.sort((a, b) => a.trade_price - b.trade_price)
                );
            case "five":
                return (
                    realtimeData &&
                    realtimeData.sort((a, b) => b.change_rate - a.change_rate)
                );
            case "six":
                return (
                    realtimeData &&
                    realtimeData.sort((a, b) => a.change_rate - b.change_rate)
                );
        }
    }, [realtimeData, onSort]);
    const onVolume = () => {
        if (onSort === "one") {
            setOnSort("two");
        } else setOnSort("one");
    };
    const onPrice = () => {
        if (onSort === "three") {
            setOnSort("four");
        } else setOnSort("three");
    };
    const onChange24 = () => {
        if (onSort === "five") {
            setOnSort("six");
        } else setOnSort("five");
    };
    const [information, setInformation] = useState("");

    const [search, setSearch] = useState("");
    const handleChange = e => {
        setSearch(e.target.value);
    };
    useEffect(() => {
        getBinanceMarket(dispatch);
    }, []);

    const Binancedata = useSelector(state => state.binance.realtimeData.a);

    const binanceDollarExchange = (Binancedata * dollarPrice).toFixed(2);
    const binanceDollar = Binancedata;
    const bitcoinPrice = useCallback(() => {
        return (
            realtimeData && realtimeData.filter(item => item.code === "KRW-BTC")
        );
    }, [realtimeData]);

    return (
        <>
            <Marquee
                className="marqueeStyle"
                speed="40"
                gradient={false}
                pauseOnHover={true}
            >
                <div className="chart-header-second">
                    <h2 className="chart-header-h2">
                        <div className="chart-header-div">
                            Bitcoin Dominance
                        </div>
                        <div className="chart_header_number">61%</div>
                    </h2>
                    <h2 className="chart-header-h2" style={{ width: "8rem" }}>
                        <div>Nasdaq</div>
                        <div className="chart_header_number">+3%</div>
                    </h2>
                    <h2 className="chart-header-h2" style={{ width: "12rem" }}>
                        <div>S&P 500</div>
                        <div className="chart_header_number">+5%</div>
                    </h2>
                    <h2 className="chart-header-h2" style={{ width: "8rem" }}>
                        <div>Gold</div>
                        <div className="chart_header_number">-1.3%</div>
                    </h2>
                    <h2 className="chart-header-h2" style={{ width: "8rem" }}>
                        <div>Silver</div>
                        <div className="chart_header_number">-0.3%</div>
                    </h2>
                    <h2 className="chart-header-h2" style={{ width: "16rem" }}>
                        <div>Dollar exchange</div>
                        <div className="chart_header_number">
                            {parseInt(dollarPrice)}
                        </div>
                    </h2>
                    <h2 className="chart-header-h2" style={{ width: "16rem" }}>
                        <div>Kospi</div>
                        <div className="chart_header_number">-1.3%</div>
                    </h2>
                    <h2 className="chart-header-h2" style={{ width: "16rem" }}>
                        <div>TSLA</div>
                        <div className="chart_header_number">-1.3%</div>
                    </h2>
                </div>
            </Marquee>

            <div className="chart">
                <div class="chart-Component">
                    <div className="chart-searchSide">
                        <div className="upbit-binanceDiv">
                            <div className="upbitLogoDiv">
                                <img className="upbitLogoImg" src={upbit} />
                            </div>
                            <div>
                                <SwapOutlined style={{ width: "2rem" }} />
                            </div>
                            <div>
                                <img className="binanceLogoImg" src={binance} />
                            </div>
                        </div>
                        <div>
                            <div className="binanceBitcoinPremium">
                                김치프리미엄:
                                {bitcoinPrice() &&
                                    (
                                        ((bitcoinPrice()[0].trade_price -
                                            binanceDollarExchange) /
                                            bitcoinPrice()[0].trade_price) *
                                        100
                                    ).toFixed(2)}
                                %
                            </div>
                            <div className="binanceBitcoinPrice">
                                바이낸스: $
                                {parseInt(binanceDollar).toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <SearchOutlined />
                            <input
                                className="inputSearch"
                                onChange={handleChange}
                            ></input>
                        </div>
                        <div>
                            <strong>총</strong>
                            {realtimeData && realtimeData.length}
                            <strong>개</strong>
                        </div>
                    </div>
                    <div className="chart_list">
                        <div className="chart_list_head">
                            <div className=" chart_list_name">이름</div>
                            <div
                                className={`chart_list_price${onSort}`}
                                onClick={onPrice}
                                style={{
                                    textAlign: "right",
                                    width: "6rem",
                                    verticalAlign: "middle",
                                }}
                            >
                                {onSort === "three"
                                    ? "₩ 가격 ▽"
                                    : onSort === "four"
                                    ? "₩ 가격 △"
                                    : "₩ 가격"}
                            </div>
                            <div
                                className={`chart_list_change${onSort}`}
                                onClick={onChange24}
                                style={{
                                    textAlign: "center",
                                    width: "5rem",
                                }}
                            >
                                {onSort === "five"
                                    ? "전일대비 ▽"
                                    : onSort === "six"
                                    ? "전일대비 △"
                                    : "전일대비"}
                            </div>
                            <div
                                className={`chart_list_volume${onSort}`}
                                onClick={onVolume}
                                style={{
                                    textAlign: "center",
                                    width: "4rem",
                                }}
                            >
                                {onSort === "one"
                                    ? "거래량 ▽"
                                    : onSort === "two"
                                    ? "거래량 △"
                                    : "거래량"}
                            </div>
                        </div>
                        <div className="Coins">
                            {sortedVolume() &&
                                sortedVolume().map(data => (
                                    <RealtimeChartList
                                        key={data.code}
                                        data={data}
                                        name={
                                            marketData.filter(
                                                list =>
                                                    list.market === data.code
                                            )[0].korean_name
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RealtimeChart;
