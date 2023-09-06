import AdminLayout from "../../components/AdminLayout";
import Wrapper from '../../components/general/Wrapper';
import { BarChart } from '../../components/charts/BarChart';
import LandlordCard from '../../components/dashboard/LandlordCard';
import { useLandlordTenants } from "../../hooks/useTenant";
import { Center } from "@chakra-ui/react";
import Loader from "../../components/general/Loader";

export const DashboardScreen = () => {

  const { stateLoading, awaitingPaymentCount, occupiedSpaceCount, bookingSummary } = useLandlordTenants();

  return (
    <AdminLayout>
      <div className="max-h-[calc(100%-80px)] p-3 overflow-y-scroll">

        <LandlordCard
          totalOccupiedSpace={occupiedSpaceCount}
          awaitingPayment={awaitingPaymentCount}
        />

        {/* Revenue breakdown */}
        <div>
          {stateLoading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <Wrapper>
              <div className="w-full h-[330px] flex flex-col">
                <div className="px-5">
                  <p className="font-semibold">Booking summary</p>
                </div>
                <div className="h-[310px]">
                  <BarChart options={bookingSummary.options} data={bookingSummary.data} />
                </div>
              </div>
            </Wrapper>
          )}

        </div>
      </div>
    </AdminLayout>
  )
}
