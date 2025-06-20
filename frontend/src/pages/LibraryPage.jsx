import React from 'react'
import { useEffect } from 'react';
import { Container, VStack, Box, HStack, Text, Image, Heading } from "@chakra-ui/react";
import FeaturedBookCard from '../components/FeaturedBookCard';
import { useBookStore } from '../store/book';
import BookCard from '../components/BookCard';

const LibraryPage = () => {
  const { fetchFeaturedBook, featuredBook, loading, error } = useBookStore();
  const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Fantasy', 'Mystery', 'Romance'];

  useEffect(() => {
    fetchFeaturedBook();
  }, [fetchFeaturedBook]);
  return (
    <Container maxW="full" py={12} pt={20}>
      <VStack spacing={8}>
        <Box shadow='lg' rounded='lg' w='60%' bg='gray.700'>
          <HStack spacing={8} p={4}>
            <Image src={featuredBook?.image} alt={featuredBook?.name} w={200} h={300} objectFit='cover' />
            <VStack spacing={6} align='start'  alignSelf={'flex-start'}>
              <Heading as='h2' size='xl' color='white'>
                Authority
              </Heading>
              <Text bg='gray.800' p={2} rounded='lg' w='100%'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, iure voluptas ab nisi in incidunt magnam harum, nostrum cum commodi nemo! Ex iure nobis ea minus nam est? Fugit, iste?</Text>
            </VStack>
          </HStack>
        </Box>
      </VStack>

      <HStack spacing={6} mt={12} alignItems='flex-start'>
        { categories.map((category) => (
          <Box key={category}  bg='gray.800' p={2}  rounded='lg' shadow='md'>
            <Heading as='h3' size='md'>{category}</Heading>
          </Box>
        )) }
      </HStack>
      
    </Container>
  )
}

export default LibraryPage