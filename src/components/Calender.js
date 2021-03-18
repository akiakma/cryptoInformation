import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Calender.css";
import { Calendar, Badge } from "antd";
function getListData(value) {
    let listData;
    switch (value.date()) {
        case 11:
            listData = [
                { type: "warning", content: "쿠팡 상장일" },
                { type: "warning", content: "연준 FOMC" },
            ];
            break;
        case 12:
            listData = [
                { type: "warning", content: "넴 에어드랍" },
                { type: "warning", content: "이오스 POWER UP 활성화" },
            ];
            break;
        case 15:
            listData = [{ type: "warning", content: "넴 메인넷 출시" }];
            break;
        case 17:
            listData = [{ type: "warning", content: "카르다노 bitmex 상장" }];
            break;
        case 25:
            listData = [{ type: "warning", content: "크립토닷컴 메인넷 출시" }];
            break;
        case 31:
            listData = [
                { type: "warning", content: "네오 3.0 테스트넷" },
                { type: "warning", content: "폴리매스 메인넷 출시" },
                { type: "warning", content: "체인링크 오라클 통합" },
                { type: "warning", content: "아이콘 Defi 출시" },
            ];
            break;
        default:
    }
    return listData || [];
}
function monthCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map(item => (
                <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </li>
            ))}
        </ul>
    );
}

const Calender = () => {
    function onPanelChange(value, mode) {
        console.log(value.format("YYYY-MM-DD"), mode);
    }

    return (
        <div>
            <div style={{ marginTop: "3rem" }}>
                <Calendar
                    onPanelChange={onPanelChange}
                    dateCellRender={monthCellRender}
                    mode={"month"}
                />
            </div>
        </div>
    );
};

export default Calender;
