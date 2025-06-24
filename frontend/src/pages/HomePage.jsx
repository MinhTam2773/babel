import React, { useEffect } from 'react';
import { Container, Text, VStack, Button, Spinner, Heading, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BookCard from '../components/BookCard';
import { useBookStore } from '../store/book';
import FeaturedBookCard from '../components/FeaturedBookCard';

const HomePage = () => {
  const { fetchFeaturedBook, featuredBook, loading, error , books, fetchBooks} = useBookStore();

  useEffect(() => {
    fetchFeaturedBook();
  }, [fetchFeaturedBook]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <Container maxW="container.xl" py={12} pt={20}>
      <VStack spacing={6}>
        <Text fontSize="6xl" fontWeight="bold" color="teal.500">
          Welcome to BABEL
        </Text>
        <Text fontSize="4xl" color="teal.400">
          Your gateway to a world of books and knowledge!
        </Text>
        
        <Link to="/library">
          <Button colorScheme='teal' size='lg' px={8} py={6}>
            <Text fontSize="2xl" fontWeight="bold">
              Discover Now!
            </Text>
          </Button>
        </Link>

        <Text fontSize="4xl" color="teal.500" mt={10}>
          This Week's Recommended Book
        </Text>

        {loading ? (
          <Spinner size="xl" color="teal.500" />
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : featuredBook ? (
          <FeaturedBookCard w="100%" book={featuredBook} />
        ) : (
          <Text>No books available yet</Text>
        )}
      </VStack>

      <Heading mt={20} size={'lg'}>Other Recommendations</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={6} mt={3}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color='red.500'>Error: {error}</Text>
        ) : books.length > 0 ? (
          books
            .filter((book) => book._id !== featuredBook?._id && books.indexOf(book) <= 5) // Exclude featured book
            .map((book) => (
              <BookCard key={book._id} book={book} />
          ))
        ) : (
          <Text>No books available yet</Text>
        )}
      </SimpleGrid>

    </Container>
  );
};

export default HomePage;