import React from "react";
import "./CardScore.css";
import GaugeChart from "react-gauge-chart";

const CardScore = ({ score }) => {
    const title = score.project_name;
    const symbol = score.symbol;
    const img = score.symbol.toLowerCase();
    const value = score.value;
    const percent = score.value * 0.001;

    const chartStyle = {
        width: 200,
        fontColor: "black",
    };

    const rate = value => {
        if (value > 900) {
            return "S";
        } else if (value > 749) {
            return "A";
        } else if (value > 649) {
            return "B";
        } else if (value > 500) {
            return "C";
        } else return "F";
    };
    return (
        <>
            <div className="cardScore">
                <div className="cardScoreTitle">
                    <img
                        className="cardScoreImg"
                        src={`https://d301yvow08hyfu.cloudfront.net/svg/color/${img}.svg`}
                    />
                    <div className="cardScoreH2">
                        <div>{title}</div>
                    </div>
                </div>
                <div className="cardScoreInfo">
                    <div>{symbol}</div>
                    <div>HEALTH {value}</div>
                    <div className={`blink${rate(value)}`}>
                        <strong>{rate(value)}</strong>
                    </div>
                </div>
                <div className="cardScoreFooter">
                    <GaugeChart
                        id="gauge-chart2"
                        style={chartStyle}
                        nrOfLevels={5}
                        percent={percent}
                        textColor={"black"}
                    />
                </div>
            </div>
        </>
    );
};

export default React.memo(CardScore);
