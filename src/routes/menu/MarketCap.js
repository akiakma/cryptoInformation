import React, { useEffect } from "react";
import MarketCapitalization from "../../components/MarketCapitalization";
import { useDispatch, useSelector } from "react-redux";
import { GET_MARKET_CAP_REQUEST } from "../../redux/types";
const MarketCap = () => {
    const dispatch = useDispatch();
    const data = [];
    useEffect(() => {
        dispatch({ type: GET_MARKET_CAP_REQUEST });
    }, [dispatch]);
    const marketAPI = useSelector(state => state.marketInfo.data);

    const info = () => {
        marketAPI &&
            marketAPI.map(item => {
                data.push({
                    key: item.market_cap_rank,
                    name: item.name,
                    capitalization: parseInt(item.market_cap * 1128.55),
                    day: item.price_change_percentage_24h,
                    week: item.price_change_percentage_7d_in_currency,

                    month: item.price_change_percentage_30d_in_currency,
                    year:
                        item.price_change_percentage_1y_in_currency &&
                        item.price_change_percentage_1y_in_currency,
                    ath: parseInt(item.ath * 1128.55),
                    supply: parseInt(item.circulating_supply),
                });
            });
    };
    info();

    return (
        <div>
            <MarketCapitalization data={data} />
        </div>
    );
};

export default MarketCap;
