import React from 'react'
import { Box, useColorModeValue, useDisclosure, Heading } from "@chakra-ui/react";
import { useState } from 'react';
import { Text, Image } from '@chakra-ui/react';


const FeaturedBookCard = ({book}) => {
    const [updatedbook, setUpdatedbook] = useState(book);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const {isOpen, onOpen, onClose} = useDisclosure(); //modal
    console.log(book);
  return (
    <Box bg={bg} shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{transform: "translateY(-5px)", shadow: "xl"}}>
        <Image src={book.image} alt={book.name} w={300} h={500} objectFit='cover' />
        <Heading as='h3' size='md' mb={2} p={2}> 
            {book.name}
        </Heading>

        <Text ml={2} marginBottom={2} fontWeight='bold' fontSize='xl' color={textColor} md={4}>
            ${book.price}
        </Text>
    </Box>
  )
}

export default FeaturedBookCard