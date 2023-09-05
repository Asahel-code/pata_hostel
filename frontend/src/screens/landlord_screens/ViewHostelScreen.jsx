import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { HiHome } from "react-icons/hi";
import Breadcrumb from "../../components/general/Breadcrumb";
import ActionButton from "../../components/general/ActionButton";
import Wrapper from "../../components/general/Wrapper";
import { TbCloudUpload } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import UpdateHostelModal from "../../modals/UpdateHostelModal";
import UpdateHostelImagesModal from "../../modals/UpdateHostelImagesModal";
import { useSpecificHostel } from "../../hooks/useHostel";
import { Center } from "@chakra-ui/react";
import Loader from "../../components/general/Loader";

export const ViewHostelScreen = () => {

  let { hostel_slug } = useParams();

  const { stateLoading, hostel } = useSpecificHostel(hostel_slug);

  const [openHostelDetailsModal, setOpenHostelDetailsModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    hostel?.house && setPreviewImage(hostel?.house?.images[0])
  }, [hostel?.house])


  const handleOpenHostelDetailsModal = useCallback(() => {
    setOpenHostelDetailsModal(true);
  }, []);

  const handleCloseHostelDetailsModal = useCallback(() => {
    setOpenHostelDetailsModal(false);
  }, []);

  const handleOpenImageModal = useCallback(() => {
    setOpenImageModal(true);
  }, []);

  const handleCloseImageModal = useCallback(() => {
    setOpenImageModal(false);
  }, []);

  return (
    <AdminLayout>
      {stateLoading ? (
        <div className="max-h-[91%] p-3">
          <Center>
            <Loader />
          </Center>
        </div>
      ) : (
        <div className="max-h-[91%] overflow-y-scroll p-3">
          <Breadcrumb
            icon={<HiHome />}
            title={"Hostels /"}
            subtitle={hostel_slug}
          />
          <div className="flex gap-5">
            <div className="w-5/12">
              <Wrapper>
                <div className="flex justify-between pb-5">
                  <p className="text-lg font-bold">
                    Hostel Information
                  </p>
                  <ActionButton handleClick={() => {
                    handleOpenHostelDetailsModal()
                    setCurrent(hostel?.house)
                  }}>
                    <FiEdit />
                  </ActionButton>
                </div>

                <div className="flex justify-center items-center gap-3 text-[14px]">
                  <div className="text-right flex flex-col gap-3">
                    <p className="font-semibold text-lg">Hostel name</p>
                    <p className="font-semibold text-lg">Location</p>
                    <p className="font-semibold text-lg">Gender</p>
                    <p className="font-semibold text-lg">Number of Rooms</p>
                    <p className="font-semibold text-lg">Number per Room</p>
                    <p className="font-semibold text-lg">House naming pattern</p>
                  </div>

                  <div className="bg-gray-200 h-56 w-0.5 rounded-full" />

                  <div className="text-left flex flex-col gap-5">
                    <p className="font-normal">{hostel?.house?.name}</p>
                    <p className="font-normal">{hostel?.house?.region?.name}</p>
                    <p className="font-normal">{hostel?.house?.gender}</p>
                    <p className="font-normal">{hostel?.house?.numberOfRooms}</p>
                    <p className="font-normal">{hostel?.house?.numberPerRoom}</p>
                    <p className="font-normal">{hostel?.house?.houseNamingPattern}</p>
                  </div>
                </div>
              </Wrapper>
            </div>
            <div className="w-8/12">
              <Wrapper>
                <div className="relative">
                  <div>
                    <div className="w-full h-full border rounded-md">
                      <img src={previewImage} alt="sample" className="h-full w-full rounded-lg object-cover" />
                    </div>
                    <div className={`grid grid-cols-${hostel?.house?.images.length} gap-1 mt-3 w-full`}>
                      {hostel?.house?.images.map((image, index) => {
                        return (
                          <div className="w-20 h-20 border rounded-lg cursor-pointer" key={index} onClick={() => setPreviewImage(image)}>
                            <img src={image} alt="sample" className="h-full w-full rounded-lg object-cover" />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="absolute bottom-1 right-1">
                    <ActionButton handleClick={() => {
                      setCurrent(hostel?.house)
                      handleOpenImageModal()
                    }}
                    >
                      <TbCloudUpload />
                    </ActionButton>
                  </div>
                </div>
              </Wrapper>
            </div>
          </div>
          <UpdateHostelModal
            handleOpen={openHostelDetailsModal}
            handleClose={handleCloseHostelDetailsModal}
            current={current}
          />
          <UpdateHostelImagesModal
            handleOpen={openImageModal}
            handleClose={handleCloseImageModal}
            current={current}
          />
        </div>
      )}
    </AdminLayout>
  )
}
