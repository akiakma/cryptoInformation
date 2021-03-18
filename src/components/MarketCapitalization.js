import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

class MarketCapitalization extends React.Component {
    state = {
        searchText: "",
        searchedColumn: "",
        sortedInfo: null,
        marketInformation: null,
    };

    //delete
    handleChange = (pagination, filters, sorter) => {
        console.log("Various parameters", pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };
    //delete
    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: "descend",
                columnKey: "capitalization",
            },
        });
    };

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            this.handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    render() {
        const numberToKorean = number => {
            var inputNumber = number < 0 ? false : number;
            var unitWords = ["", "만", "억", "조", "경"];
            var splitUnit = 10000;
            var splitCount = unitWords.length;
            var resultArray = [];
            var resultString = "";

            for (var i = 0; i < splitCount; i++) {
                var unitResult =
                    (inputNumber % Math.pow(splitUnit, i + 1)) /
                    Math.pow(splitUnit, i);
                unitResult = Math.floor(unitResult);
                if (unitResult > 0) {
                    resultArray[i] = unitResult;
                }
            }

            for (var i = 0; i < resultArray.length; i++) {
                if (!resultArray[i]) continue;
                resultString =
                    String(resultArray[i]) + unitWords[i] + " " + resultString;
            }
            const firstChar = resultString.indexOf("억");
            return resultString.slice(0, firstChar + 1);
        };
        let { data } = this.props;
        let { sortedInfo } = this.state;

        sortedInfo = sortedInfo || {};
        const columns = [
            {
                title: "순위",
                dataIndex: "key",
                render: dataIndex => {
                    return {
                        props: {
                            style: {
                                background: "rgb(250,250,250)",
                            },
                        },
                        children: dataIndex,
                    };
                },
                key: "name",
                width: "4%",
            },
            {
                title: "이름",
                dataIndex: "name",
                key: "name",
                width: "10%",
                ...this.getColumnSearchProps("name"),
            },
            {
                title: "시가총액",
                dataIndex: "capitalization",
                render: dataIndex => <span>{numberToKorean(dataIndex)}</span>,
                key: "capitalization",
                width: "10%",
                sorter: (a, b) => a.capitalization - b.capitalization,
                sortOrder:
                    sortedInfo.columnKey === "capitalization" &&
                    sortedInfo.order,
            },
            {
                title: "24시간",
                dataIndex: "day",
                render: dataIndex => {
                    return dataIndex > 0 ? (
                        <span style={{ color: "red" }}>
                            {"+" + dataIndex.toFixed(2) + "%"}
                        </span>
                    ) : (
                        <span style={{ color: "blue" }}>
                            {dataIndex.toFixed(2) + "%"}
                        </span>
                    );
                },
                key: "day",
                width: "7%",
                sorter: (a, b) => a.day - b.day,
                sortOrder: sortedInfo.columnKey === "day" && sortedInfo.order,
            },
            {
                title: "7일",
                dataIndex: "week",
                render: dataIndex => {
                    return {
                        children:
                            dataIndex > 0 ? (
                                <span style={{ color: "red" }}>
                                    {"+" + dataIndex.toFixed(2) + "%"}
                                </span>
                            ) : (
                                <span style={{ color: "blue" }}>
                                    {dataIndex.toFixed(2) + "%"}
                                </span>
                            ),
                    };
                },
                sorter: (a, b) => a.week - b.week,
                sortOrder: sortedInfo.columnKey === "week" && sortedInfo.order,
                width: "7%",
                key: "week",
            },
            {
                title: "30일",
                dataIndex: "month",
                render: dataIndex => {
                    return dataIndex > 0 ? (
                        <span style={{ color: "red" }}>
                            {"+" + dataIndex.toFixed(2) + "%"}
                        </span>
                    ) : (
                        <span style={{ color: "blue" }}>
                            {dataIndex.toFixed(2) + "%"}
                        </span>
                    );
                },
                sorter: (a, b) => a.month - b.month,
                sortOrder: sortedInfo.columnKey === "month" && sortedInfo.order,
                width: "7%",
                key: "month",
            },
            {
                title: "1년",
                dataIndex: "year",
                render: dataIndex => {
                    return dataIndex === null ? (
                        "less than 1 year"
                    ) : dataIndex > 0 ? (
                        <span style={{ color: "red" }}>
                            {"+" + dataIndex.toFixed(0) + "%"}
                        </span>
                    ) : (
                        <span style={{ color: "blue" }}>
                            {dataIndex.toFixed(0) + "%"}
                        </span>
                    );
                },
                sorter: (a, b) => a.year - b.year,
                sortOrder: sortedInfo.columnKey === "year" && sortedInfo.order,
                width: "10%",
                key: "year",
            },
            {
                title: "고점",
                dataIndex: "ath",
                render: dataIndex => {
                    return (
                        "₩ " +
                        dataIndex
                            .toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
                    );
                },
                sorter: (a, b) => a.ath - b.ath,
                sortOrder: sortedInfo.columnKey === "ath" && sortedInfo.order,
                key: "ath",
                width: "10%",
            },
            {
                title: "공급량",
                dataIndex: "supply",
                key: "supply",
                width: "10%",
            },
        ];
        return (
            <Table
                columns={columns}
                dataSource={data}
                onChange={this.handleChange}
                size={"middle"}
                pagination={{
                    defaultPageSize: 20,
                }}
            />
        );
    }
}

export default MarketCapitalization;
