import React from 'react'
import { useEffect } from 'react';
import { Container, VStack, Box, HStack, Text } from "@chakra-ui/react";
import FeaturedBookCard from '../components/FeaturedBookCard';
import { useBookStore } from '../store/book';
import BookCard from '../components/BookCard';

const LibraryPage = () => {
  const { fetchFeaturedBook, featuredBook, loading, error } = useBookStore();

  useEffect(() => {
    fetchFeaturedBook();
  }, [fetchFeaturedBook]);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Box shadow='lg' rounded='lg' w='60%'>
          <HStack spacing={10} p={4}>
            <BookCard book={featuredBook} />
            <Text bg='red.500' rounded='lg' position='relative' bottom={20} w='60%'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, iure voluptas ab nisi in incidunt magnam harum, nostrum cum commodi nemo! Ex iure nobis ea minus nam est? Fugit, iste?</Text>
          </HStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default LibraryPage