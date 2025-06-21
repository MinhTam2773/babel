import React, { use } from 'react'
import { useEffect } from 'react';
import { Container, VStack, Box, HStack, Text, Image, Heading, SimpleGrid } from "@chakra-ui/react";
import FeaturedBookCard from '../components/FeaturedBookCard';
import { useBookStore } from '../store/book';
import BookCard from '../components/BookCard';
import { useState } from 'react';

const LibraryPage = () => {
  const { fetchFeaturedBook, featuredBook, loading, error, fetchBooks, books  } = useBookStore();
  const [ selectedCategory, setSelectedCategory ] = useState(null);
  const categories = ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Fantasy', 'Mystery', 'Romance'];

  useEffect(() => {
    fetchFeaturedBook();
  }, [fetchFeaturedBook]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const HandleSelectedCategory = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect if already selected
      console.log(`Deselected category: ${category}`);
    }
    else {
      setSelectedCategory(category); // Select the new category
      console.log(`Selected category: ${category}`);
    }
  }
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
          <Box key={category}  bg='gray.800' p={2}  rounded='lg' shadow='md' onClick={() => HandleSelectedCategory(category)} cursor='pointer' _hover= {{bg: selectedCategory === category?'blue.600 ': 'gray.700'}} {...selectedCategory === category && { bg: 'blue.500', color: 'white' }} userSelect="none">
            <Heading as='h3' size='md'>{category}</Heading>
          </Box>
        )) }
      </HStack>

      <SimpleGrid columns={{ base: 3 , sm: 3, md: 5, lg: 6 }} spacing={6} mt={2}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color='red.500'>Error: {error}</Text>
        ) : (
          books
            .filter((book) => !selectedCategory || book.category === selectedCategory)
            .map((book) => (
              <BookCard key={book._id} book={book} />
            ))
        )}
      </SimpleGrid>
      
    </Container>
  )
}

export default LibraryPage