import { useState, useCallback } from "react";
import AdminLayout from "../../components/AdminLayout";
import ActionButton from '../../components/general/ActionButton';
import { ConfigProvider, Table } from "antd";
import Wrapper from '../../components/general/Wrapper';
import { FiEdit } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import CustomInput from "../../components/general/CustomInput";
import AddLocationModal from "../../modals/AddLocationModal";
import UpdateLocationModal from "../../modals/UpdateLocationModal";
import { useLocation } from "../../hooks/useLocation";

export const LocationScreen = () => {

    const [openAddLocationModal, setOpenAddLocationModal] = useState(false);
    const [openUpdateLocationModal, setOpenUpdateLocationModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [current, setCurrent] = useState({});

    const { stateLoading, filteredRegions } = useLocation(searchValue);

    const handleOpenAddLocationModal = useCallback(() => {
        setOpenAddLocationModal(true);
    }, []);

    const handleCloseAddLocationModal = useCallback(() => {
        setOpenAddLocationModal(false);
    }, []);

    const handleOpenUpdateLocationModal = useCallback(() => {
        setOpenUpdateLocationModal(true);
    }, []);

    const handleCloseUpdateLocationModal = useCallback(() => {
        setOpenUpdateLocationModal(false);
    }, []);

    const columns = [
        {
            title: "Location name",
            dataIndex: "name",
            sorter: (a, b) => a?.name.localeCompare(b?.name),
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (_, n) => {
                return (
                    <div className="flex gap-6 justify-start">
                        <ActionButton handleClick={() => {
                            setCurrent(n);
                            handleOpenUpdateLocationModal()
                        }}>
                            <FiEdit />
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
                                onClick={handleOpenAddLocationModal}
                            >
                                <p className="font-medium">Add Location</p>
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
                                    dataSource={filteredRegions}
                                />
                            </div>
                        </ConfigProvider>
                    </div>
                </Wrapper>

                <AddLocationModal
                    handleOpen={openAddLocationModal}
                    handleClose={handleCloseAddLocationModal}
                />

                <UpdateLocationModal
                    handleOpen={openUpdateLocationModal}
                    handleClose={handleCloseUpdateLocationModal}
                    current={current}
                />
            </div>
        </AdminLayout>
    )
}

