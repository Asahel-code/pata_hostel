import AdminLayout from "../../components/AdminLayout";
import AdminCard from "../../components/dashboard/AdminCard";
import Wrapper from '../../components/general/Wrapper';
// import { BarChart } from '../../components/charts/BarChart';

export const AdminDashboardScreen = () => {
    return (
        <AdminLayout>
            <div className="max-h-[calc(100%-80px)] p-3 overflow-y-scroll">

                <AdminCard
                    numberOfLandlord={100}
                    hostelsCount={400}
                />

                {/* Hostel spreed */}
                <div>
                    <Wrapper>
                        <div className="w-full h-[330px] flex flex-col">
                            <div className="px-5">
                                <p className="font-semibold">Hostel spread</p>
                            </div>
                            <div className="h-[310px]">
                                {/* <BarChart options={orderSummary.options} data={orderSummary.data} /> */}
                            </div>

                        </div>
                    </Wrapper>
                </div>


            </div>
        </AdminLayout>
    )
}
