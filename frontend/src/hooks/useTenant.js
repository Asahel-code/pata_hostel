import { useState, useEffect, useMemo } from 'react'
import { useToast } from '@chakra-ui/react';
import _ from "lodash";
import { getError } from '../utils/getError';
import { toastProps } from '../utils/toastProps';
import BookingServices from '../utils/services/BookingServices';
import { MONTHS } from '../utils/timeFormat';

export const useLandlordTenants = (searchValue) => {

    const toast = useToast();

    const [tenants, setTenants] = useState([]);
    const [filteredTenants, setFilteredTenants] = useState([]);
    const [bookingPerMonth, setBookingPerMonth] = useState([]);
    const [barChartMonths, setBarChartMonths] = useState([]);
    const [awaitingPaymentCount, setAwaitPaymentCount] = useState(0);
    const [occupiedSpaceCount, setOccupiedSpaceCount] = useState(0);
    const [stateLoading, setStateLoading] = useState(true);


    const handleSearch = (arr, cond) => {
        const newArr = _.filter(arr, (obj) => {
            if (cond) {
                return (
                    obj.name?.toLowerCase()?.includes(cond?.toLowerCase()) ||
                    obj.hostel?.toLowerCase()?.includes(cond?.toLowerCase()) ||
                    obj.roomNo?.toLowerCase()?.includes(cond?.toLowerCase())
                );
            }
        });

        if (cond) return newArr;
        else return tenants;
    };

    useEffect(() => {
        const fetchLandlordTenants = async () => {
            let arr = [];
            await BookingServices.fetchLandLordBookings().then((response) => {
                response.forEach((element) => {
                    const paymentStatus = !element?.tenant?.isPaid ? "awaiting payment"
                        : (element?.tenant.isPaid && element?.tenant?.paymentDueDate >= Date.now()) ? "rental pay due" :
                            (element?.tenant?.isPaid && !element?.tenant?.isPaymentApproved) ? "awaiting approval"
                                : "paid";

                    const landlordObj = {
                        id: element?.tenant?._id || "",
                        name: element?.tenant?.userDetails?.firstname + " " + element?.tenant?.userDetails?.lastname || "",
                        hostel: element?.hostel?.name || "",
                        roomNo: element?.tenant?.roomNo || "",
                        tenantPhoneNumber: "+254".concat(element?.tenant?.userDetails?.phoneNumber) || "",
                        occumpationStartDate: element?.tenant?.paymentApprovedAt || "--",
                        occumpationDueDate: element?.tenant?.paymentDueDate || "--",
                        paymentStatus: paymentStatus || ""
                    }
                    arr.push(landlordObj)
                });
                setTenants(arr);
                setFilteredTenants(arr);
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
                let bookingCount = []

                tenants.forEach((item) => {
                    const key = Object.keys(item)[0];
                    const monthOfDate = MONTHS[new Date(key).getMonth()];
                    monthsArray.push(monthOfDate);

                    const arrayOfTenants = Object.values(item)[0];

                    const totalMonthlyBooking = arrayOfTenants?.reduce((acc, obj) => obj ? acc += 1 : acc, 0);
                    bookingCount.push(totalMonthlyBooking)
                });
                setBookingPerMonth(bookingCount);
                setBarChartMonths(monthsArray);

                setAwaitPaymentCount(response?.reduce((acc, obj) => !obj?.tenant?.isPaid ? acc += 1 : acc, 0));
                setOccupiedSpaceCount(response?.reduce((acc, obj) => obj?.tenant?.isPaid && obj?.tenant?.paymentDueDate > new Date().toISOString() ? acc += 1 : acc, 0))

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

        fetchLandlordTenants();
    }, [toast]);

    useEffect(() => {
        setFilteredTenants(handleSearch(tenants, searchValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tenants, searchValue]);

    const bookingSummary = useMemo(
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
                        label: "Bookings",
                        data: bookingPerMonth,
                        borderColor: 'rgb(240, 99, 12)',
                        backgroundColor: 'rgba(240, 99, 12, 0.5)',
                    },
                ],
                text: "35",
            },
        }),
        [bookingPerMonth, barChartMonths]
    );


    return { stateLoading, tenants, filteredTenants, awaitingPaymentCount, occupiedSpaceCount, bookingSummary };
}

export const useTenantBooking = () => {

    const toast = useToast();

    const [bookings, setbookings] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchUserBookings = async () => {
            let arr = [];
            await BookingServices.fetchUserBookings().then((response) => {
                response.forEach((element) => {
                    const paymentStatus = !element?.isPaid ? "awaiting payment"
                        : (element?.tenant?.Paid && element?.paymentDueDate >= Date.now()) ? "rental pay due" :
                            (element?.tenant?.Paid && !element?.isPaymentApproved) ? "awaiting approval"
                                : "paid";

                    const tenantObj = {
                        id: element?._id || "",
                        name: element?.userDetails?.firstname + " " + element?.userDetails?.lastname || "",
                        hostel: element?.house?.hostel?.name,
                        roomNo: element?.roomNo,
                        tenantPhoneNumber: "+254".concat(element?.userDetails?.phoneNumber) || "",
                        occumpationStartDate: element?.paidAt || "--",
                        occumpationDueDate: element?.paymentDueDate || "--",
                        isPaid: element?.isPaid || "",
                        isApproved: element?.isPaymentApproved || "",
                        paymentStatus: paymentStatus || ""
                    }
                    arr.push(tenantObj)
                });
                setbookings(arr);
                setStateLoading(false);
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

        fetchUserBookings();
    }, [toast]);

    return { stateLoading, bookings };
}

export const useTenant = (id) => {
    const toast = useToast();

    const [booking, setbooking] = useState(undefined);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchSingleBooking = async () => {
            await BookingServices.fetchBooking(id).then((response) => {
                setbooking(response);
                setStateLoading(false);
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

        fetchSingleBooking();
    }, [toast, id]);

    return { stateLoading, booking };
}
