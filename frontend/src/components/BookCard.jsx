import React from 'react'
import { Box, useColorModeValue, useDisclosure, VStack } from "@chakra-ui/react";
import { Badge } from '@chakra-ui/react';
import { useState } from 'react';
import { Text, Image } from '@chakra-ui/react';


const BookCard = ({ book }) => {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');
  const shadow = useColorModeValue('md', 'dark-lg');
  return (
    <Box
      bg={bg}
      shadow={shadow}
      w={200}
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
      {/* Image with price overlay */}
      <Image
        src={book.image}
        alt={book.name}
        w="full"
        h={300}
        objectFit="cover"
      />

      {/* Book info */}
      <VStack align="start" spacing={1} px={3} py={2} position={'relative'}>
        <Text fontWeight="bold" fontSize="md" color={textColor} noOfLines={1}>
          {book.name}
        </Text>
        <Text fontSize="sm" color="gray.500" noOfLines={1}>
          by {book.author}
        </Text>
        <Badge
          colorScheme="purple"
          variant="subtle"
          fontSize="xs"
          px={2}
          borderRadius="md"
        >
          {book.category}
        </Badge>
        <Badge
          position="absolute"
          bottom={2}
          right={2}
          bg="yellow.400"
          color="black"
          px={2}
          py={1}
          borderRadius="md"
          fontSize="sm"
          fontWeight="bold"
        >
          ${book.price}
        </Badge>
      </VStack>
    </Box>
  )
}

export default BookCard