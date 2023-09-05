import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

const CustomButton = ({ children, handleClick, leftIcon, rightIcon, variant, width, ...rest }) => {

    return (
        <Box
            as='button'
            height='40px'
            width={width ? width : "full"}
            lineHeight='1.2'
            transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
            px='10px'
            fontSize='15px'
            fontWeight='semibold'
            _active={{
                transform: 'scale(0.98)',
            }}
            onClick={handleClick}
            {...rest}
            className={`rounded-md hover:shadow-primary_color hover:shadow-md ${variant === "solid" ?
                `bg-primary_color text-white` :
                variant === "outline" &&
                `bg-white text-primary_color border-2 border-primary_color`}`}
        >
            <Box className='flex gap-2 justify-center'>
                {leftIcon}
                {children}
                {rightIcon}
            </Box>
        </Box>
    )
}

CustomButton.propTypes = {
    children: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element,
    variant: PropTypes.string.isRequired,
    width: PropTypes.string,
}

export default CustomButton