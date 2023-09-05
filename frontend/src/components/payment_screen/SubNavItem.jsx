import PropTypes from "prop-types";
import { Box, Text } from '@chakra-ui/react'

const SubNavItem = ({ title, height, isCurrent, handleClick, ...rest }) => {
  return (
    <Box
      as="button"
      h={height ? height : "20"}
      px={1}
      width={"150px"}
      cursor={"pointer"}
      borderRadius={"none"}
      className={`text-black text-md text-start ${isCurrent ? "text-primary_color font-semibold" : "text-black"
        }`}
      _hover={{
        bg: "white",
        borderBottomColor: "#05A3FF",
        borderBottomWidth: "4px",
        textColor: "#05A3FF",
      }}
      _focus={{
        bg: "white",
        borderBottomColor: "#05A3FF",
        textColor: "#05A3FF",
      }}
      bg={isCurrent && "white"}
      fontWeight={isCurrent ? "semibold" : "normal"}
      borderBottomWidth={"4px"}
      borderBottomColor={isCurrent ? "#05A3FF" : "none"}
      onClick={handleClick}
      {...rest}
    >
      <Text letterSpacing={1}>{title}</Text>
    </Box>
  )
}

SubNavItem.propTypes = {
  title: PropTypes.string.isRequired, 
  height: PropTypes.string, 
  isCurrent: PropTypes.bool, 
  handleClick: PropTypes.func, 
}

export default SubNavItem