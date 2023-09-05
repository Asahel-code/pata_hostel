import PropTypes from "prop-types";
import { Box, HStack, Text } from '@chakra-ui/react';
import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';

const CustomPagination = ({
    count,
    setPage,
    page,
}) => {

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="end"
            alignItems="center"
            width="full"
            color=""
            px={0}
            gap={1.5}
        >
            <HStack spacing={5}>
                <Text color="black">
                    {page} of {count}
                </Text>
                <HStack spacing={3}>
                    {page <= 1 ? (
                        <Box
                            fontSize="xs"
                            border="1px"
                            padding="1.5"
                            borderColor="gray.500"
                            borderRadius="md"
                            color="gray.500"
                            _active={{
                                transform: 'scale(0.98)',
                            }}
                        >
                            <SlArrowLeft />
                        </Box>
                    ) : (
                        <Box
                            as="button"
                            fontSize="xs"
                            border="1px"
                            padding="1.5"
                            borderColor="#4FA154"
                            borderRadius="md"
                            color="#4FA154"
                            _active={{
                                transform: 'scale(0.98)',
                            }}
                            onClick={() => setPage(page - 1)}
                        >
                            <SlArrowLeft />
                        </Box>
                    )}

                    {page >= count? (
                        <Box
                            fontSize="xs"
                            border="1px"
                            padding="1.5"
                            borderColor="gray.500"
                            borderRadius="md"
                            color="gray.500"
                            _active={{
                                transform: 'scale(0.98)',
                            }}
                        >
                            <SlArrowRight />
                        </Box>
                    ) : (
                        <Box
                            as="button"
                            fontSize="xs"
                            border="1px"
                            padding="1.5"
                            borderColor="#4FA154"
                            borderRadius="md"
                            color="#4FA154"
                            _active={{
                                transform: 'scale(0.98)',
                            }}
                            onClick={() => setPage(page + 1)}
                        >
                            <SlArrowRight />
                        </Box>
                    )}
                </HStack>
            </HStack>
        </Box>
    )
}

CustomPagination.propTypes = {
    count: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
}

export default CustomPagination