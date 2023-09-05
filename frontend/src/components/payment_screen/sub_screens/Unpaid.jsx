import { useState } from "react";
import { ConfigProvider, Table } from "antd";
import CustomInput from "../../general/CustomInput";
import { IoSearchOutline } from "react-icons/io5";
import { usePayment } from "../../../hooks/usePayment";
import { convertDateTimeFormart } from "../../../utils/timeFormat";

const Unpaid = () => {

    const [searchValue, setSearchValue] = useState("");

    const {stateLoading, filteredUnPaidInvoices} = usePayment(searchValue);

    const columns = [
        {
            title: "Booking date",
            dataIndex: "bookingDate",
            sorter: (a, b) => a?.bookingDate.localeCompare(b?.bookingDate),
            render: (text) => <div className="capitalize">{convertDateTimeFormart(text)}</div>,
        },
        {
            title: "To be paid",
            dataIndex: "name",
        },
    ];
    return (
        <div>
            {/* search and table actions */}
            <div className="py-3 flex justify-between item-end">
                <CustomInput
                    icon={<IoSearchOutline className="text-xl text-primary_color ml-2" />}
                    handleChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            {/* body */}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#000",
                        colorPrimaryTextActive: "#000",
                        colorPrimaryText: "#808080",
                        colorPrimaryBg: "#fff",
                    },
                }}
            >
                <div>
                    <Table
                        rowKey={(data) => data.id}
                        loading={stateLoading}
                        pagination={{
                            defaultPageSize: 8,
                            showSizeChanger: true,
                            pageSizeOptions: ["8", "16", "32", "64"],
                        }}
                        columns={columns}
                        dataSource={filteredUnPaidInvoices}
                    />
                </div>
            </ConfigProvider>
        </div>
    )
}

export default Unpaid