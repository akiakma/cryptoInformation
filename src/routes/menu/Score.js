import React, { useEffect, useRef, useState } from "react";
import "./Score.css";
import { useDispatch, useSelector } from "react-redux";
import CardScore from "../../components/CardScore";
import { GET_SCORE_REQUEST } from "../../redux/types";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const Score = () => {
    const number = useRef(-20);
    const [item, setItem] = useState({
        items: 20,
        preItems: 0,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: GET_SCORE_REQUEST });
    }, [dispatch]);
    const data = useSelector(state => state.score.data);
    const loading = useSelector(state => state.score.loading);

    const card = data && data.data;
    const information = () => {
        return card && card.slice(0, number.current);
    };
    useEffect(() => {
        number.current = number.current + 20;
    });
    const onScroll = () => {
        if (
            window.scrollY + document.documentElement.clientHeight >
            document.documentElement.scrollHeight - 10
        ) {
            setItem({
                items: item.items + 20,
                preItems: 0,
            });
        }
    };
    console.log(number);
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);
    return (
        <>
            <div className="scoreHeader">
                <div className="scoreHeaderBlock">
                    <div className="shb-desc">
                        <div>
                            The Fundamental Crypto Asset Score(FCAS) is a
                            Comparative
                        </div>
                        <div>
                            metric used to assess the fundamental health of
                            crypto projects.
                        </div>
                    </div>
                    <div>
                        <img
                            src={
                                "https://flipsidecrypto.com/ratings-spectrum.svg"
                            }
                        />
                    </div>
                    <div className="shb-footer">
                        <div>
                            <div className="shb-footer-left">
                                Each asset is given a score, 0-1000,
                            </div>
                            <div className="shb-footer-left">
                                and an associated letter grade
                            </div>
                            <div className="shb-footer-left-detail">
                                More Detail..
                            </div>
                            <div>
                                <img
                                    src={
                                        "https://flipsidecrypto.com/images/fcas_logo.svg"
                                    }
                                />
                            </div>
                        </div>
                        <div className="shb-footer-right">
                            <div className="shb-footer-right-children">
                                <div className="shb-span">Superb</div>
                                <div
                                    className="shb-span-rate"
                                    style={{
                                        backgroundColor: " rgb(46, 212, 46)",
                                    }}
                                >
                                    S
                                </div>
                                <div className="shb-span-num">900-1,000</div>
                            </div>
                            <div className="shb-footer-right-children">
                                <div className="shb-span">Attractive</div>
                                <div
                                    className="shb-span-rate"
                                    style={{
                                        backgroundColor: "rgb(106, 236, 106",
                                    }}
                                >
                                    A
                                </div>
                                <div className="shb-span-num">750-899</div>
                            </div>
                            <div className="shb-footer-right-children">
                                <div className="shb-span">Basic</div>
                                <div
                                    className="shb-span-rate"
                                    style={{
                                        backgroundColor: "rgb(170, 231, 170",
                                    }}
                                >
                                    B
                                </div>
                                <div className="shb-span-num">650-749</div>
                            </div>
                            <div className="shb-footer-right-children">
                                <div className="shb-span"> Caution</div>
                                <div
                                    className="shb-span-rate"
                                    style={{
                                        backgroundColor: " rgb(238, 192, 42)",
                                    }}
                                >
                                    C
                                </div>
                                <div className="shb-span-num">500-649</div>
                            </div>
                            <div className="shb-footer-right-children">
                                <div className="shb-span">Fragile</div>
                                <div
                                    className="shb-span-rate"
                                    style={{
                                        backgroundColor: "rgb(236, 102, 49)",
                                    }}
                                >
                                    F
                                </div>
                                <div className="shb-span-num">Below 500</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="loader">
                    <div className="loader">
                        <Loader
                            type="Audio"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={13000} //3 secs
                        />
                    </div>
                </div>
            ) : (
                <div className="scoreDiv">
                    {card &&
                        information().map(item => {
                            return <CardScore score={item} />;
                        })}
                </div>
            )}
        </>
    );
};

export default Score;
