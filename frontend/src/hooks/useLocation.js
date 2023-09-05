import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react';
import _ from "lodash";
import { getError } from '../utils/getError';
import { toastProps } from '../utils/toastProps';
import RegionServices from '../utils/services/RegionServices';

export const useLocation = (searchValue) => {
  
    const toast = useToast();

    const [regions, setRegions] = useState([]);
    const [filteredRegions, setFilteredRegions] = useState([]);
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
        else return regions;
    };

    useEffect(() => {
        const fetchAllRegions = async () => {
            let arr = [];
            await RegionServices.fetchRegions().then((response) => {
                response.forEach((element) => {
                    const regionObj = {
                        id: element?._id || "",
                        name: element?.name || "",
                    }
                    arr.push(regionObj)
                });
                setRegions(arr);
                setFilteredRegions(arr);
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

        fetchAllRegions();
    }, [toast]);

    useEffect(() => {
        setFilteredRegions(handleSearch(regions, searchValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regions, searchValue]);

    return { stateLoading, regions, filteredRegions };
}
