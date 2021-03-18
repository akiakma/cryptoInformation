import React from "react";
import { Table, Tag } from "antd";

const columns = [
    {
        title: "웹사이트",
        dataIndex: "website",
        width: "15%",
        render: text => <a>{text}</a>,
    },
    {
        title: "주소",
        className: "column-money",
        dataIndex: "address",
        width: "25%",
        align: "center",
    },
    {
        title: "설명",
        dataIndex: "explanation",
    },
];

const data = [
    {
        key: "1",
        website: "업비트",
        address: "upbit.com",
        explanation:
            "대한민국 암호화폐 거래소이며, 180여개의 코인이 상장 되어있다.",
    },
    {
        key: "2",
        website: "고팍스",
        address: "gopax.co.kr",
        explanation:
            "대한민국 암호화폐 거래소이며, 세계적으로 인정받는 거래소이다.",
    },
    {
        key: "3",
        website: "바이낸스",
        address: "binance.com",
        explanation: "세계 최대의 암호화폐 거래소",
    },
    {
        key: "4",
        website: "플립사이드크립토",
        address: "app.flipsidecrypto.com/fcas-scores",
        explanation:
            "여러 기관에서 인정하고, 투자 참고용으로 많이 사용하는 암호화폐 건강지표",
    },
    {
        key: "5",
        website: "코인니스",
        address: "kr.coinness.com",
        explanation:
            "실시간으로 코인관련 뉴스를 보도해준다. 텔레그램으로 이용하면 실시간 뉴스를 메시지로 받을 수 있다.",
    },
    {
        key: "6",
        website: "코인데스크",
        address: "www.coindeskkorea.com/",
        explanation: "디지털 통화를 전문으로하는 뉴스 사이트.",
    },
    {
        key: "7",
        website: "코인마켓캡",
        address: "coinmarketcap.com",
        explanation:
            "다양한 api를 지원해주며, 암호화폐 시총을 실시간으로 볼 수 있다.",
    },
    {
        key: "8",
        website: "김프",
        address: "kimp.ga",
        explanation:
            "바이낸스와 업비트, 빗썸 거래소간의 가격차이를 보여주는 사이트이다.",
    },
    {
        key: "9",
        website: "스팀잇",
        address: "steemit.com",
        explanation:
            "블록체인 기반 블로그 및 소셜 미디어 서비스를 제공하는 웹사이트, 소셜 네트워크 서비스이다",
    },
    {
        key: "10",
        website: "코인360",
        address: "coin360.com",
        explanation: "암호화폐 전체 도미넌스를 카드형태로 보여주는 사이트이다.",
    },
    {
        key: "11",
        website: "코인마켓캘",
        address: "coinmarketcal.com ",
        explanation: "코인회사들의 각종 이벤트 일정을 보여주는 사이트이다.",
    },
    {
        key: "12",
        website: "코인와치",
        address: "cryptowat.ch/ko ",
        explanation: "세계 거래소간의 시세차이를 보여주는 사이트이다.",
    },
    {
        key: "13",
        website: "ico레이팅",
        address: "icorating.com",
        explanation: "암호화폐 ico관련된 정보를 알수 있는 웹사이트",
    },
    {
        key: "14",
        website: "트레이딩뷰",
        address: "kr.tradingview.com",
        explanation: "다양한 차트를 볼 수 있다.",
    },
    {
        key: "15",
        website: "코인마켓캘",
        address: "coinmarketcal.com ",
        explanation: "코인회사들의 각종 이벤트 일정을 보여주는 사이트이다.",
    },
    {
        key: "16",
        website: "코인판",
        address: "www.coinpan.com",
        explanation: "암호화폐 커뮤니티.",
    },
];

const Reference = () => {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                title={() => "암호화폐 관련 웹사이트입니다."}
                footer={() => (
                    <div>
                        <Tag color="magenta">거래소</Tag>
                        <Tag color="blue">시가총액</Tag>
                        <Tag color="green">커뮤니티</Tag>
                        <Tag color="cyan">차트</Tag>
                        <Tag color="lime">뉴스</Tag>
                    </div>
                )}
                pagination={{
                    defaultPageSize: 20,
                }}
            />
        </div>
    );
};

export default Reference;
