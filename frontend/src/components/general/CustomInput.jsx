import PropTypes from 'prop-types';
import { Box, Center, Select } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const CustomInput = ({
    icon,
    placeholder = "Search...",
    type = "text",
    value,
    handleChange,
    name,
    width,
    handleEyeClick,
    isDisabled
}) => {
    return (
        <Box
            display={"flex"}
            gap={"3"}
            alignItems={"center"}
            bg={"white"}
            borderWidth={"1px"}
            overflow={"hidden"}
            borderRadius={"md"}
            borderColor={isDisabled ? "#EBEEF3" : "#05A3FF"}
            width={width ? width : "350px"}
        >
            {icon}

            <input
                placeholder={placeholder}
                className={`px-1 border-0 outline-none focus:outline-none h-10 flex-grow ${isDisabled && `text-[#A5A7AD]`}`}
                type={type}
                value={value}
                onChange={handleChange}
                name={name}
                disabled={isDisabled}
            />
            {(name === "passwordConfirmation" || name === "password") && (
                <Center
                    className="cursor-pointer"
                    w={"10"}
                    h={"full"}
                    onClick={() => {
                        if (type === "password") {
                            handleEyeClick("text");
                        } else {
                            handleEyeClick("password");
                        }
                    }}
                >
                    {type === "password" ? (
                        <AiFillEye className="text-2xl text-[#05A3FF]" />
                    ) : (
                        <AiFillEyeInvisible className="text-2xl text-[#05A3FF]" />
                    )}
                </Center>
            )}
        </Box>
    )
}

export const CustomSelect = ({
    placeholder,
    value,
    handleChange,
    name,
    width,
    height,
    children,
}) => {
    return (
        <Box
            display={"flex"}
            gap={"3"}
            alignItems={"center"}
            width={width ? width : "350px"}
            borderWidth={"1px"}
            overflow={"hidden"}
            height={height ? height : "full"}
            borderRadius={"md"}
            borderColor={"#05A3FF"}
        >
            <Select
                variant='unstyled'
                placeholder={placeholder}
                borderWidth={0}
                width={"full"}
                bg={"white"}
                height={"40px"}
                my={"0"}
                mx={"1"}
                onChange={handleChange}
                value={value}
                name={name}
            >
                {children}
            </Select>
        </Box>
    );
}

CustomSelect.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.any,
    handleChange: PropTypes.func,
    name: PropTypes.string,
    children: PropTypes.node,
    width: PropTypes.string,
    height: PropTypes.string,
}

CustomInput.propTypes = {
    icon: PropTypes.element,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any,
    handleChange: PropTypes.func,
    name: PropTypes.string,
    width: PropTypes.string,
    handleEyeClick: PropTypes.func,
    isDisabled: PropTypes.bool,
}


export default CustomInput