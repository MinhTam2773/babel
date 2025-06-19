import React from 'react'
import { Box, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useState } from 'react';
import { Text, Image } from '@chakra-ui/react';


const BookCard = ({book}) => {
    const [updatedbook, setUpdatedbook] = useState(book);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const {isOpen, onOpen, onClose} = useDisclosure(); //modal
    console.log(book);
  return (
    <Box bg={bg} shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{transform: "translateY(-5px)", shadow: "xl"}}>
        <Image src={book.image} alt={book.name} w={200} h={300} objectFit='cover' />
        <Text>{book.name}</Text>
        <Text>{book.price}</Text>
    </Box>
  )
}

export default BookCard