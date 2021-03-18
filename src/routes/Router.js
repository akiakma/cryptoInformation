import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./menu/Home";
import MarketCap from "./menu/MarketCap";
import Score from "./menu/Score";
import CoinCalender from "./menu/CoinCalender";
import "./router.css";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
    HomeOutlined,
    StockOutlined,
    DashboardOutlined,
    ScheduleOutlined,
    IeOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { GET_COIN_MARKET_CAP_REQUEST } from "../redux/types";
import Reference from "./menu/Reference";
import logo from "../asset/Mainlogo.png";

const { Header, Content, Footer, Sider } = Layout;

const Router = () => {
    let url = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: GET_COIN_MARKET_CAP_REQUEST,
        });
    }, []);

    return (
        <>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div>
                        <img
                            style={{ margin: "0.8rem 1rem", width: "10rem" }}
                            src={logo}
                        />
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[url.pathname]}
                    >
                        <Menu.Item key="/" icon={<HomeOutlined />}>
                            <Link to="/home">홈 | 프리미엄 가격</Link>
                        </Menu.Item>
                        <Menu.Item key="/marketcap" icon={<StockOutlined />}>
                            <Link to="/marketcap">시가총액</Link>
                        </Menu.Item>
                        <Menu.Item key="/score" icon={<DashboardOutlined />}>
                            <Link to="/score">스코어</Link>
                        </Menu.Item>
                        <Menu.Item key="/reference" icon={<IeOutlined />}>
                            <Link to="/reference">참고용 사이트</Link>
                        </Menu.Item>
                        <Menu.Item key="/calender" icon={<ScheduleOutlined />}>
                            <Link to="/calender">코인 일정</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        className="site-layout-sub-header-background"
                        style={{ padding: 0, color: "white" }}
                    ></Header>
                    <Content style={{ margin: "24px 16px 0" }}>
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route
                                    path="/marketcap"
                                    exact
                                    component={MarketCap}
                                />
                                <Route path="/score" exact component={Score} />
                                <Route
                                    path="/reference"
                                    exact
                                    component={Reference}
                                />
                                <Route
                                    path="/calender"
                                    exact
                                    component={CoinCalender}
                                />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        akiakma ©2021 Created by 김햄준
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};
export default Router;
