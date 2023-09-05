import { useState, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import ActionButton from '../../components/general/ActionButton';
import { ConfigProvider, Table } from "antd";
import Wrapper from '../../components/general/Wrapper';
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import CustomInput from "../../components/general/CustomInput";
import numberWithCommas from "../../utils/numberWithCommas";
import AddHostelModal from "../../modals/AddHostelModal";
import { useLandlordHostel } from "../../hooks/useHostel";

export const HostelsScreen = () => {

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [openAddHostelModal, setOpenAddHostelModal] = useState(false);

  const { stateLoading, filteredHostels } = useLandlordHostel(searchValue);

  const handleOpenAddHostelModal = useCallback(() => {
    setOpenAddHostelModal(true);
  }, []);

  const handleCloseAddHostelModal = useCallback(() => {
    setOpenAddHostelModal(false);
  }, []);

  const handleViewHostel = (hostel) => {
    navigate(`${hostel?.slug}`, hostel);
  };

  const columns = [
    {
      title: "Hostel name",
      dataIndex: "name",
      sorter: (a, b) => a?.name.localeCompare(b?.name),
    },
    {
      title: "Rental fee",
      dataIndex: "rentalFee",
      render: (text) => <div className="uppercase">KES. {numberWithCommas(text)}</div>
    },
    {
      title: "Number of rooms",
      dataIndex: "numberOfRooms",
    },
    {
      title: "Number per room",
      dataIndex: "numberPerRoom",
    },
    {
      title: "Location",
      dataIndex: "region",
    },
    {
      title: "Gender",
      dataIndex: "gender"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, n) => {
        return (
          <div className="flex gap-6 justify-start">
            <ActionButton handleClick={() => handleViewHostel(n)}>
              <FiEdit />
            </ActionButton>

            <ActionButton handleClick={() => { }}>
              <AiOutlineDelete />
            </ActionButton>
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
              <button
                className="bg-primary_color_light hover:bg-primary_color text-black hover:text-white text-md rounded-md items-center flex gap-2 px-3 py-2"
                onClick={handleOpenAddHostelModal}
              >
                <p className="font-medium">Add Hostel</p>
              </button>
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
                  dataSource={filteredHostels}
                />
              </div>
            </ConfigProvider>
          </div>
        </Wrapper>

        <AddHostelModal
          handleOpen={openAddHostelModal}
          handleClose={handleCloseAddHostelModal}
        />
      </div>
    </AdminLayout>
  )
}

