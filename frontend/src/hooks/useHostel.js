import { useState, useEffect, useMemo } from 'react'
import { useToast } from '@chakra-ui/react';
import _ from "lodash";
import { getError } from '../utils/getError';
import { toastProps } from '../utils/toastProps';
import HouseServices from '../utils/services/HouseServices';

export const useHostel = (searchValue) => {

    const toast = useToast();

    const [hostels, setHostels] = useState([]);
    const [filteredHostels, setFilteredHostels] = useState([]);
    const [hostelLocations, setHostelsLocations] = useState([]);
    const [hostelCountPerLocation, setHostelCountPerLocation] = useState([]);
    const [hostelCount, setHostelCount] = useState(0);
    const [stateLoading, setStateLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSearch = (arr, cond) => {
        const newArr = _.filter(arr, (obj) => {
            if (cond) {
                return (
                    obj.name?.toLowerCase()?.includes(cond?.toLowerCase()) ||
                    obj.region?.toLowerCase()?.includes(cond?.toLowerCase()) ||
                    obj.gender?.toLowerCase()?.includes(cond?.toLowerCase())
                );
            }
        });

        if (cond) return newArr;
        else return hostels;
    };

    useEffect(() => {
        const fetchAllHostels = async () => {
            let arr = [];
            await HouseServices.fetchHouses().then((response) => {
                response.forEach((element) => {
                    const hostelObj = {
                        id: element?._id || "",
                        name: element?.name || "",
                        slug: element?.slug || "",
                        region: element?.region.name || "",
                        gender: element?.gender || "",
                        numberOfRooms: element?.numberOfRooms || "",
                        numberPerRoom: element?.numberPerRoom || "",
                        houseNamingPattern: element?.houseNamingPattern || "",
                        rentalFee: element?.rentalFee || "",
                        images: element?.images || [],
                    }
                    arr.push(hostelObj)
                });
                setHostels(arr);
                setFilteredHostels(arr);
                setStateLoading(false);

                const hostels = Object.entries(
                    response.reduce((b, a) => {
                        let location = a.region.name;
                        if (Object.prototype.hasOwnProperty.call(b, location))
                            b[location].push(a);
                        else
                            b[location] = [a];
                        return b;
                    }, Object.create(null))
                )
                    .sort((a, b) => a[0].localeCompare(b[0]))
                    .map((e) => ({ [e[0]]: e[1] }));

                let locationsArray = []
                let hostelCount = []

                console.log(hostels);

                hostels.forEach((item) => {
                    const key = Object.keys(item)[0];
                    locationsArray.push(key);

                    const arrayOfHostels = Object.values(item)[0];

                    const totalMonthlyBooking = arrayOfHostels?.reduce((acc, obj) => obj ? acc += 1 : acc, 0);
                    hostelCount.push(totalMonthlyBooking)
                });

                setHostelsLocations(locationsArray);
                setHostelCountPerLocation(hostelCount);
                setHostelCount(response?.reduce((acc, obj) => obj ? acc += 1 : acc, 0));
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

        fetchAllHostels();
    }, [toast]);

    useEffect(() => {
        setFilteredHostels(handleSearch(hostels, searchValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostels, searchValue]);


    const handleHostelSearch = async (state) => {
        setLoading(true);
        try {
            let arr = [];
            await HouseServices.searchHouse(state).then((response) => {
                response.forEach((element) => {
                    const hostelObj = {
                        id: element?._id || "",
                        name: element?.name || "",
                        slug: element?.slug || "",
                        region: element?.region.name || "",
                        gender: element?.gender || "",
                        numberOfRooms: element?.numberOfRooms || "",
                        numberPerRoom: element?.numberPerRoom || "",
                        houseNamingPattern: element?.houseNamingPattern || "",
                        rentalFee: element?.rentalFee || "",
                        images: element?.images || [],
                    }
                    arr.push(hostelObj)
                });
                setHostels(arr);
                setFilteredHostels(arr);
                setLoading(false);
                setStateLoading(false);
            })
        } catch (error) {
            toast({
                ...toastProps,
                title: "Error!",
                description: getError(error),
                status: "error",
            });
            setLoading(false);
            setStateLoading(false);
        }
    }

    const hostelSpread = useMemo(
        () => ({
          options: {
            plugins: {
              centerText: {
                display: true,
                text: "90%",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          },
    
          data: {
            labels: hostelLocations,
            datasets: [
              {
                label: "Count",
                data: hostelCountPerLocation,
                backgroundColor: [
                  "#6EF07B",
                  "#6FCDFB",
                  "#FF65C1",
                  "#BB1600",
                  "#FFCF63",
                ],
              },
            ],
            text: "35",
          },
        }),
        [hostelLocations, hostelCountPerLocation]
      );

    return { stateLoading, loading, hostels, filteredHostels, handleHostelSearch, hostelCount, hostelSpread };

}

export const useSpecificHostel = (slug) => {
    const toast = useToast();

    const [hostel, setHostel] = useState(undefined);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchHostel = async () => {
            await HouseServices.fetchHouse(slug).then((response) => {
                setHostel(response);
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

        fetchHostel();
    }, [toast, slug]);

    return { stateLoading, hostel };
}

export const useLandlordHostel = (searchValue) => {
    const toast = useToast();

    const [hostels, setHostels] = useState([]);
    const [filteredHostels, setFilteredHostels] = useState([]);
    const [stateLoading, setStateLoading] = useState(true);

    const handleSearch = (arr, cond) => {
        const newArr = _.filter(arr, (obj) => {
            if (cond) {
                return (
                    obj.name?.toLowerCase()?.includes(cond?.toLowerCase()) ||
                    obj.gender?.toLowerCase()?.includes(cond?.toLowerCase()) ||
                    obj.region?.toLowerCase()?.includes(cond?.toLowerCase()) ||
                    obj.rentalFee >= cond && obj.rentalFee <= cond
                );
            }
        });

        if (cond) return newArr;
        else return hostels;
    };

    useEffect(() => {
        const fetchLandLordHostels = async () => {
            let arr = [];
            await HouseServices.fetchLandLordHouses().then((response) => {
                response.forEach((element) => {
                    const hostelObj = {
                        id: element?._id || "",
                        name: element?.name || "",
                        slug: element?.slug || "",
                        region: element?.region.name || "",
                        gender: element?.gender || "",
                        numberOfRooms: element?.numberOfRooms || "",
                        numberPerRoom: element?.numberPerRoom || "",
                        houseNamingPattern: element?.houseNamingPattern || "",
                        rentalFee: element?.rentalFee || "",
                        images: element?.images || [],
                    }
                    arr.push(hostelObj)
                });
                setHostels(arr);
                setFilteredHostels(arr);
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

        fetchLandLordHostels();
    }, [toast]);

    useEffect(() => {
        setFilteredHostels(handleSearch(hostels, searchValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostels, searchValue]);

    useEffect(() => {

    }, []);

    return { stateLoading, hostels, filteredHostels };
}
