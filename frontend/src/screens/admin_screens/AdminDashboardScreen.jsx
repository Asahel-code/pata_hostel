import AdminLayout from "../../components/AdminLayout";
import AdminCard from "../../components/dashboard/AdminCard";
import Wrapper from '../../components/general/Wrapper';
import { useHostel } from "../../hooks/useHostel";
import { useLandlord } from "../../hooks/useLandlord";
import { PieChart } from '../../components/charts/PieChart';
import { Center } from "@chakra-ui/react";
import Loader from "../../components/general/Loader";

export const AdminDashboardScreen = () => {

    const { landLordCount } = useLandlord();
    const { stateLoading, hostelCount, hostelSpread } = useHostel();

    return (
        <AdminLayout>
            <div className="max-h-[calc(100%-80px)] p-3 overflow-y-scroll">

                <AdminCard
                    numberOfLandlord={landLordCount}
                    hostelsCount={hostelCount}
                />

                {/* Hostel spreed */}
                <div>
                    {stateLoading ? (
                        <Center>
                            <Loader />
                        </Center>
                    ) : (
                        <Wrapper>
                            <div className="w-full h-[330px] flex flex-col">
                                <div className="px-5">
                                    <p className="font-semibold">Hostel spread</p>
                                </div>
                                <div className="h-[310px]">
                                    <PieChart options={hostelSpread.options} data={hostelSpread.data} />
                                </div>

                            </div>
                        </Wrapper>
                    )}
                </div>


            </div>
        </AdminLayout>
    )
}
