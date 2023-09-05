import { useState, useEffect, useMemo } from 'react'
import { useToast } from '@chakra-ui/react';
import _ from "lodash";
import { getError } from '../utils/getError';
import { toastProps } from '../utils/toastProps';
import BookingServices from '../utils/services/BookingServices';
import { MONTHS } from '../utils/timeFormat';

export const usePayment = (searchValue) => {
    const toast = useToast();

    const [unPaidInvoices, setUnPaidInvoices] = useState([]);
    const [filteredUnPaidInvoices, setFilteredUnPaidInvoices] = useState([]);
    const [paidInvoices, setPaidInvoices] = useState([]);
    const [filteredPaidInvoices, setFilteredPaidInvoices] = useState([]);
    const [paidInvoicesPerMonth, setPaidInvoicesPerMonth] = useState([]);
    const [barChartMonths, setBarChartMonths] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchFinancialDetails = async () => {
            let unPaidArr = [];
            let paidArr = [];
            await BookingServices.fetchLandLordBookings().then((response) => {
                response.filter((tenant) => !tenant?.tenant?.isPaid).forEach((element) => {
                    const unPaidEarningsObj = {
                        id: element?.tenant?._id,
                        name: element?.tenant?.userDetails?.firstname + " " + element?.tenant?.userDetails?.lastname || "",
                        bookingDate: element?.tenant?.createdAt || 0,
                    };
                    unPaidArr.push(unPaidEarningsObj);
                });
                setUnPaidInvoices(unPaidArr);
                setFilteredUnPaidInvoices(unPaidArr);

                response.filter((tenant) => tenant?.tenant?.isPaid).forEach((element) => {
                    const paidEarningsObj = {
                        id: element?.tenant?._id,
                        name: element?.tenant?.userDetails?.firstname + " " + element?.tenant?.userDetails?.lastname || "",
                        amount: parseInt(element?.hostel?.rentalFee) * parseInt(element?.tenant?.months) || 0,
                        paidDate: element?.tenant?.paidAt || 0,
                    };
                    paidArr.push(paidEarningsObj);
                });
                setPaidInvoices(paidArr);
                setFilteredPaidInvoices(paidArr);

                setStateLoading(false);

                const tenants = Object.entries(
                    response.reduce((b, a) => {
                        let month = a.tenant.createdAt.split("T")[0].substr(0, 7);
                        if (Object.prototype.hasOwnProperty.call(b, month))
                            b[month].push(a);
                        else
                            b[month] = [a];
                        return b;
                    }, Object.create(null))
                )
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map((e) => ({ [e[0]]: e[1] }));

                let monthsArray = []
                let paidRoomsCount = []

                tenants.forEach((item) => {
                    const key = Object.keys(item)[0];
                    const monthOfDate = MONTHS[new Date(key).getMonth()];
                    monthsArray.push(monthOfDate);

                    const arrayOfTenants = Object.values(item)[0];

                    const totalMonthlyPaidRooms = arrayOfTenants?.reduce((acc, obj) => obj?.tenant.isPaid ? acc += (parseInt(obj?.hostel.rentalFee) * parseInt(obj?.tenant.months)) : acc, 0);
                    paidRoomsCount.push(totalMonthlyPaidRooms)
                });

                setBarChartMonths(monthsArray);
                setPaidInvoicesPerMonth(paidRoomsCount);
            })
                .catch((error) => {
                    toast({
                        ...toastProps,
                        title: "Error!",
                        description: getError(error),
                        status: "error",
                    });
                    setStateLoading(false);
                })
        }

        fetchFinancialDetails();
    }, [toast]);

    const handleUnPaidInvoicesSearch = (arr, cond) => {
        const newArr = _.filter(arr, (obj) => {
            if (cond) {
                return (
                    obj.name?.toLowerCase()?.includes(cond?.toLowerCase())
                );
            }
        });

        if (cond) return newArr;
        else return unPaidInvoices;
    };

    useEffect(() => {
        setFilteredUnPaidInvoices(handleUnPaidInvoicesSearch(unPaidInvoices, searchValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unPaidInvoices, searchValue]);

    const handlePaidInvoicesSearch = (arr, cond) => {
        const newArr = _.filter(arr, (obj) => {
            if (cond) {
                return (
                    obj.name?.toLowerCase()?.includes(cond?.toLowerCase()) ||
                    obj.amount == cond
                );
            }
        });

        if (cond) return newArr;
        else return paidInvoices;
    };

    useEffect(() => {
        setFilteredPaidInvoices(handlePaidInvoicesSearch(paidInvoices, searchValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paidInvoices, searchValue]);

    const paymentSummary = useMemo(
        () => ({
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },

            data: {
                labels: barChartMonths,
                datasets: [
                    {
                        label: "Payments",
                        data: paidInvoicesPerMonth,
                        borderColor: 'rgb(240, 99, 12)',
                        backgroundColor: 'rgba(240, 99, 12, 0.5)',
                    },
                ],
                text: "35",
            },
        }),
        [paidInvoicesPerMonth, barChartMonths]
    );


    return { stateLoading, filteredPaidInvoices, filteredUnPaidInvoices, paidInvoices, unPaidInvoices, paymentSummary };
}
