import AdminLayout from "../../components/AdminLayout";
import { useToast } from "@chakra-ui/react";
import { ConfigProvider, Table } from "antd";
import Wrapper from '../../components/general/Wrapper';
import { IoSearchOutline } from "react-icons/io5";
import CustomInput from "../../components/general/CustomInput";
import { useLandlord } from "../../hooks/useLandlord";
import { useState, useCallback } from "react";
import ActionButton from "../../components/general/ActionButton";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import LandLordServices from "../../utils/services/LandLordServices";
import { toastProps } from "../../utils/toastProps";
import { getError } from "../../utils/getError";
import UpdateLandLordModal from "../../modals/UpdateLandLordModal";
import DeleteAlert from "../../components/general/DeleteAlert";


export const LandlordManagementScreen = () => {

  const [searchValue, setSearchValue] = useState("");
  const [openUpdateLandLordDetailsModal, setOpenUpdateLandLordDetailsModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [landLordId, setLandLordId] = useState("");

  const toast = useToast();

  const { stateLoading, filteredLandlords } = useLandlord(searchValue);

  const handleOpenUpdateLandLordDetailsModal = useCallback(() => {
    setOpenUpdateLandLordDetailsModal(true);
  }, []);

  const handleCloseUpdateLandLordDetailsModal = useCallback(() => {
    setOpenUpdateLandLordDetailsModal(false);
  }, []);

  const handleOpenDeleteAlert = useCallback(() => {
    setOpenDeleteAlert(true);
  }, []);

  const handleCloseDeleteAlert = useCallback(() => {
    setOpenDeleteAlert(false);
  }, []);


  const handleDelete = async (id) => {
    try {
      await LandLordServices.adminDeleteLandLordDetails(id).then(() => {
        toast({
          ...toastProps,
          title: "Success",
          description: "Landlord details have been deleted successfully",
          status: "success",
        });
      });
      handleCloseDeleteAlert();
      window.location.reload();
    } catch (error) {
      toast({
        ...toastProps,
        title: "Error!",
        description: getError(error),
        status: "error",
      });
      handleCloseDeleteAlert();
    }
  }
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
    {
      title: "Action",
      dataIndex: "action",
      render: (_, n) => {
        return (
          <div className="flex gap-6 justify-start">
            <ActionButton handleClick={() => {
              handleOpenUpdateLandLordDetailsModal();
              setLandLordId(n?.id);
            }}>
              <FiEdit />
            </ActionButton>

            <ActionButton handleClick={() => {
              handleOpenDeleteAlert();
              setLandLordId(n?.id);
            }}>
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

        {landLordId && <UpdateLandLordModal
          handleOpen={openUpdateLandLordDetailsModal}
          handleClose={handleCloseUpdateLandLordDetailsModal}
          landLordId={landLordId}
        />}

        {landLordId && <DeleteAlert
          handleOpen={openDeleteAlert}
          handleClose={handleCloseDeleteAlert}
          handleDelete={handleDelete}
          body={"Are you sure you would like to delete this landlord?"}
          id={landLordId}
        />}
      </div>
    </AdminLayout>
  )
}
