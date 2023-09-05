import AdminLayout from "../../components/AdminLayout";
import { ConfigProvider, Table } from "antd";
import Wrapper from '../../components/general/Wrapper';
import { IoSearchOutline } from "react-icons/io5";
import CustomInput from "../../components/general/CustomInput";
import { useState, useCallback } from "react";
import { useLandlordTenants } from "../../hooks/useTenant";
import ApproveHostelPaymentModal from "../../modals/ApproveHostelPaymentModal";
import { convertDateTimeFormart } from "../../utils/timeFormat";


export const OccupantsScreen = () => {

  const [searchValue, setSearchValue] = useState("");
  const [openApproval, setOpenApproval] = useState(false);
  const [current, setCurrent] = useState({});

  const { stateLoading, filteredTenants } = useLandlordTenants(searchValue);

  const handleOpenApproval = useCallback(() => {
    setOpenApproval(true);
  }, []);

  const handleCloseApproval = useCallback(() => {
    setOpenApproval(false);
  }, []);

  const columns = [
    {
      title: "Tenant name",
      dataIndex: "name",
    },
    {
      title: "Hostel name",
      dataIndex: "hostel",
    },
    {
      title: "Room number",
      dataIndex: "roomNo",
    },
    {
      title: "Phone number",
      dataIndex: "tenantPhoneNumber",
    },
    {
      title: "Occumpation start date",
      dataIndex: "occumpationStartDate",
      sorter: (a, b) => a?.occumpationStartDate.localeCompare(b?.occumpationStartDate),
      render: (text) => {
        return (
          <div className="flex justify-center items-center">
            {text == "--" ?  "--" : convertDateTimeFormart(text)}
          </div>
        )
      }
    },
    {
      title: "Occumpation due date",
      dataIndex: "occumpationDueDate",
      sorter: (a, b) => a?.occumpationDueDate.localeCompare(b?.occumpationDueDate),
      render: (text) => {
        return (
          <div className="flex justify-center items-center">
            {text == "--" ?  "--" : convertDateTimeFormart(text)}
          </div>
        )
      }
    },
    {
      title: "Payment status",
      dataIndex: "paymentStatus",
      render: (_, n) => {
        const bg =
          n.paymentStatus === "awaiting payment"
            ? "bg-primary_yellow"
            : n.paymentStatus === "awaiting approval"
              ? "bg-primary_blue"
              : n.paymentStatus === "rental pay due"
                ? "bg-primary_blue"
                : n.paymentStatus === "paid"
                && "bg-primary_green";
        return (
          <div className="flex">
            {n.paymentStatus === "awaiting approval" ? (
              <div
                onClick={() => {
                  handleOpenApproval()
                  setCurrent(n)
                }}
                className={`${bg} rounded-md font-medium text-center text-gray-800 capitalize text-md px-2 py-1 cursor-pointer`}>
                {n.paymentStatus}
              </div>
            ) : (
              <div className={`${bg} rounded-md font-medium text-center text-gray-800 capitalize text-md px-2 py-1 `}>
                {n.paymentStatus}
              </div>
            )

            }
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
                  dataSource={filteredTenants}
                />
              </div>
            </ConfigProvider>
          </div>
        </Wrapper>

        <ApproveHostelPaymentModal
          handleOpen={openApproval}
          handleClose={handleCloseApproval}
          current={current}
        />
      </div>
    </AdminLayout>
  )
}

