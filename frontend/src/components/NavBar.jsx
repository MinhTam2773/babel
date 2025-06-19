import React, { use } from 'react'
import { Container, Flex, Text } from "@chakra-ui/react";
import { HStack, Button } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Link  } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const getTabIndex = () => {
    if (location.pathname === "/") {
      return 0; // Home tab
    } else if (location.pathname === "/library") {
      return 1; // Library tab
    }
    return -1; // No matching tab
  }

  // Dynamic colors
  const tabBg = useColorModeValue("white", "gray.800");
  const activeTabBg = useColorModeValue("blue.50", "blue.900");
  const activeTabTextColor = useColorModeValue("blue.600", "blue.200");
  const tabTextColor = useColorModeValue("gray.700", "gray.300");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return <Container maxW={"1140px"} px={4} position={"fixed"} top={0} left={0} right={0} zIndex={1000} bg={tabBg} boxShadow={"md"} borderBottomWidth={1} borderColor={borderColor}>
    <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base: "column", sm: "row"}}>
      <Text fontSize={{ base: "30", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}>
        <Link to={"/"}>BABEL</Link>
      </Text>  

      <HStack spacing={5} >
        <Tabs variant='soft-rounded' colorScheme='blue' index={getTabIndex()}>
          <TabList
              gap={1}
              p={1}
              borderRadius="lg"
              border="1px solid"
              borderColor={borderColor}
              bg={tabBg}
            >
              <Tab
                as={Link}
                to="/"
                _selected={{
                  bg: activeTabBg,
                  color: activeTabTextColor,
                  boxShadow: "sm",
                  fontWeight: "bold",
                }}
                _hover={{ bg: hoverBg }}
                color={tabTextColor}
                borderRadius="md"
                px={5}
                py={2}
                fontSize="sm"
                fontWeight="medium"
              >
                Home
              </Tab>
              <Tab
                as={Link}
                to="/library"
                _selected={{
                  bg: activeTabBg,
                  color: activeTabTextColor,
                  boxShadow: "sm",
                  fontWeight: "bold",
                }}
                _hover={{ bg: hoverBg }}
                color={tabTextColor}
                borderRadius="md"
                px={5}
                py={2}
                fontSize="sm"
                fontWeight="medium"
              >
                Library
             </Tab>
          </TabList>
        </Tabs>
        <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon/> : <LuSun size="20"/>}
        </Button>
        <Button as={Link} to="/create"  >
          <PlusSquareIcon />
        </Button>
      </HStack>
    </Flex>
  </Container>
}

export default NavBar