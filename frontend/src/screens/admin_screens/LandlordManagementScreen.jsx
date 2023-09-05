import AdminLayout from "../../components/AdminLayout";
import { ConfigProvider, Table } from "antd";
import Wrapper from '../../components/general/Wrapper';
import { IoSearchOutline } from "react-icons/io5";
import CustomInput from "../../components/general/CustomInput";
import { useLandlord } from "../../hooks/useLandlord";
import { useState } from "react";


export const LandlordManagementScreen = () => {

  const [searchValue, setSearchValue] = useState("");

  const { stateLoading, filteredLandlords } = useLandlord(searchValue)
  const columns = [
    {
      title: "Lanlord name",
      dataIndex: "name",
    },
    {
      title: "Whatsapp Phone number",
      dataIndex: "landlordWhatsappNumber",
    },
    {
      title: "Subscription status",
      dataIndex: "subscription",
      render: (text) => {
        const bg =
          text === "Awaiting subscription"
            ? "bg-primary_yellow"
            : text === "Expired"
              ? "bg-primary_red"
              : text === "Subscribed"
              && "bg-primary_green";
        return (
          <div className="flex">
            <div className={`${bg} rounded-md font-medium text-center text-gray-800 capitalize text-md px-2 py-1`}>
              {text}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <div className="max-h-[calc(100%-80px)] p-3 overflow-y-scroll">
        <Wrapper className="p-3">
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
                  dataSource={filteredLandlords}
                />
              </div>
            </ConfigProvider>
          </div>
        </Wrapper>
      </div>
    </AdminLayout>
  )
}
