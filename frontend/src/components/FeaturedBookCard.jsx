import React from 'react'
import { Box, useColorModeValue, useDisclosure, Heading, HStack, VStack } from "@chakra-ui/react";
import { useState } from 'react';
import { Text, Image } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const FeaturedBookCard = ({ book }) => {
  const navigation = useNavigate();

  const [updatedbook, setUpdatedbook] = useState(book);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure(); //modal
  console.log(book);
  return (
    <Container w='300'>
      <VStack>
        <Box bg={bg} position='relative' shadow='lg' rounded='lg' overflow='hidden' border='2px solid yellow' transition='all 0.3s' _hover={{ transform: "translateY(-5px)", shadow: "xl" }}>
            <Image src={book.image} alt={book.name} onClick={()=> navigation(`/${book._id}`)} _hover={{cursor:'pointer'}} w={300} h={500} objectFit='cover' />
          <Text bg='yellow.300' rounded='lg' position='absolute' bottom={0} right={0} p={1} color='black' border='3px solid yellow' fontWeight='bold' fontSize='lg' >
            13.99$
          </Text>
        </Box>

        <Heading as='h3' size='lg' mb={2} p={2} alignSelf={'center'}>
          {book.name}
        </Heading>

        <Text ml={2} marginBottom={2} fontWeight='bold' fontSize='xs' w={300} color={textColor} md={4} align={'center'}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum repudiandae iste iure? Atque hic in saepe quam labore omnis facere, quibusdam eveniet rerum fugiat officia corporis culpa veritatis repudiandae placeat.
        </Text>
      </VStack>
    </Container>
  )
}

export default FeaturedBookCard