import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react';
import { getError } from '../utils/getError';
import { toastProps } from '../utils/toastProps';
import CountServices from '../utils/services/CountServices'

export const useTenantAndHostelCount = () => {
    const toast = useToast();

    const [hostelCount, setHostelCount] = useState(0);
    const [tenantCount, setTenantCount] = useState(0);
    const [stateLoading, setStateLoading] = useState(true);

    useEffect(() => {
        const fetchTenantAndHostelCount = async () => {
            await CountServices.fetchTenantAndHostelCount().then((response) => {
                console.log(response);
                setHostelCount(response.hostelsCount);
                setTenantCount(response.tenantsCount);
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

        fetchTenantAndHostelCount();
    }, [toast]);


    return { stateLoading, hostelCount, tenantCount };
}