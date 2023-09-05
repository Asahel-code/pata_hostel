import { useState } from 'react';
import AdminLayout from "../../components/AdminLayout";
import { Box, Center, HStack } from '@chakra-ui/react';
import SubNavItem from '../../components/payment_screen/SubNavItem';
import Paid from '../../components/payment_screen/sub_screens/Paid';
import Unpaid from '../../components/payment_screen/sub_screens/Unpaid';
import Wrapper from '../../components/general/Wrapper';
import { usePayment } from '../../hooks/usePayment';
import { BarChart } from '../../components/charts/BarChart';
import Loader from '../../components/general/Loader';

export const PaymentsScreen = () => {

  const [currentSubNav, setCurrentSubNav] = useState("paid");

  const { stateLoading, paymentSummary } = usePayment();

  return (
    <AdminLayout>
      <div className="max-h-[calc(100%-80px)] overflow-y-scroll">
        <Box width={"full"} bg={"#FCFCFC"}>
          <HStack px={14} spacing={0}>
            <SubNavItem
              height={"14"}
              isCurrent={currentSubNav.toLowerCase() === "paid"}
              handleClick={() => setCurrentSubNav("paid")}
              title={"Paid"}
            />
            <SubNavItem
              height={"14"}
              isCurrent={currentSubNav.toLowerCase() === "unpaid"}
              handleClick={() => setCurrentSubNav("unpaid")}
              title={"Unpaid"}
            />
          </HStack>
        </Box>

        <Box display={"flex"} gap={"5"} px={3}>
          <Box className='w-3/5'>
            <Wrapper>
              {currentSubNav === "paid" ? <Paid />
                : currentSubNav === "unpaid" && <Unpaid />
              }
            </Wrapper>
          </Box>
          <Box className='w-2/5'>
            {stateLoading ? (
              <Center>
                <Loader />
              </Center>
            ) : (
              <Wrapper>
                <div className="w-full flex flex-col">
                  <div className="px-5">
                    <p className="font-semibold mb-6">Payment summary</p>
                  </div>
                  <div className="">
                    <BarChart options={paymentSummary.options} data={paymentSummary.data} />
                  </div>

                </div>
              </Wrapper>
            )}
          </Box>
        </Box>


      </div>
    </AdminLayout >
  )
}
