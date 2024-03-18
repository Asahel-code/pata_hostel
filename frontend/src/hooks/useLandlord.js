import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react';
import _ from "lodash";
import { getError } from '../utils/getError';
import { toastProps } from '../utils/toastProps';
import LandLordServices from '../utils/services/LandLordServices';

export const useLandlord = (searchValue) => {

    const toast = useToast();

    const [landlords, setLandlords] = useState([]);
    const [filteredLandlords, setFilteredLandlords] = useState([]);
    const [landLordCount, setLandlordCount] = useState(0);
    const [stateLoading, setStateLoading] = useState(true);

    const handleSearch = (arr, cond) => {
        const newArr = _.filter(arr, (obj) => {
            if (cond) {
                return (
                    obj.name?.toLowerCase()?.includes(cond?.toLowerCase())
                );
            }
        });

        if (cond) return newArr;
        else return landlords;
    };

    useEffect(() => {
        const fetchAllLandlords = async () => {
            let arr = [];
            await LandLordServices.fetchAllLandLord().then((response) => {
                response.forEach((element) => {
                    const subscription = !element?.isSubscribed ? "Awaiting subscription" 
                    : element?.isSubscribed && (element?.subScriptionDueDate === Date.now()) ? "Expired" : "Subscribed";

                    const landlordObj = {
                        id: element?._id || "",
                        name: element?.firstname + " " + element?.lastname || "",
                        landlordWhatsappNumber: "+254".concat(element?.whatsappNumber) || "",
                        subscription: subscription || ""
                    }
                    arr.push(landlordObj)
                });
                setLandlords(arr);
                setFilteredLandlords(arr);
                setStateLoading(false);

                setLandlordCount(response?.reduce((acc, obj) => obj ? acc += 1 : acc, 0));
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

        fetchAllLandlords();
    }, [toast]);

    useEffect(() => {
        setFilteredLandlords(handleSearch(landlords, searchValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [landlords, searchValue]);

    return { stateLoading, landlords, filteredLandlords, landLordCount };
}

export const useSpecificLandLord = () => {
    const toast = useToast();

    const [landlord, setLandlord] = useState(undefined);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchLandlord = async () => {
            await LandLordServices.fetchLandLordDetails().then((response) => {
                setLandlord(response);
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

        fetchLandlord();
    }, [toast]);


    return { stateLoading, landlord };
}

export const useSpecificLandLordAdmin = (id) => {
    const toast = useToast();

    const [landlord, setLandlord] = useState(undefined);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchLandlord = async () => {
            await LandLordServices.adminFetchLandLordDetails(id).then((response) => {
                setLandlord(response);
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

        fetchLandlord();
    }, [toast, id]);


    return { stateLoading, landlord };
}