import { Box, Button } from '@chakra-ui/react';

const LoadingButton = ({ ...rest }) => {
    return (
        <Box className='flex justify-end'>
            <Button
                isLoading
                loadingText="Loading"
                borderColor={"#05A3FF"}
                textColor={"#05A3FF"}
                variant={"outline"}
                spinnerPlacement="end"
                width={"full"}
                {...rest}
            >
                loading
            </Button>
        </Box>

    )
}

export default LoadingButton