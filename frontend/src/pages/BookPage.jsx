import React, { useRef } from 'react'
import { Container, Divider, Text, VStack, Image, Spinner, Box, Heading, Button, Badge, HStack, Collapse, SimpleGrid } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useBookStore } from '../store/book';
import FeaturedBookCard from '../components/FeaturedBookCard';
import { ExternalLinkIcon, StarIcon, TimeIcon } from "@chakra-ui/icons"
import HeartIcon from '../components/icons/HeartIcon';
import StackedPagesIcon from '../components/icons/StackedPagesIcon'
import BookCard from '../components/BookCard';

const BookPage = () => {
  const containRef = useRef();
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const { fetchBookById, book, loading, error, books, fetchBooks } = useBookStore();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (id) {
      fetchBookById(id);
    }
  }, [id, fetchBookById])

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks])


  if (loading) {
    return (
      <Container maxW="container.xl" py={12} pt={20}>
        <Spinner size="xl" color="teal.500" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={12} pt={20}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxW="container.xl" py={12} pt={20}>
        <Text>No book found.</Text>
      </Container>
    );
  }
  const getScrollValues = () => {
    const container = containRef.current;
    const scrollWidth = container?.clientWidth || 0;
    const maxScroll = (container?.scrollWidth || 0) - scrollWidth;
    const scrollStep = scrollWidth + 16;
    return { scrollStep, maxScroll };
  };

  const handleScrolling = (delta) => {
    const { scrollStep, maxScroll } = getScrollValues();
    const newPosition = Math.min(
      Math.max(scrollPosition + delta, 0),
      maxScroll
    );
    containRef.current.scrollLeft = newPosition;
    setScrollPosition(newPosition);
  };

  return (
    <Container maxW="container.xl" py={12} pt={20} >
      <Box display={'flex'} w='100%' mb={10}>
        <Box mr={10}>
          <Image src={book.image} w={300} h={450} shadow={'lg'} objectFit={'cover'} mb={3} />
          <HeartIcon boxSize={12} mr={2} />
          <ExternalLinkIcon boxSize={12} mr={2} />
          <Button w='62%' h='12' fontSize={'2xl'}>{book.price}$</Button>
        </Box>

        <VStack display={'flex'} alignItems={'flex-start'} w='50%'>
          <Heading size='2xl' mb={3}>{book.name}</Heading>
          <HStack><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></HStack>
          <Badge colorScheme="purple" variant="subtle" fontSize="xs" px={2}
            borderRadius="md">{book.category}</Badge>
          <Text>By {book.author}</Text>
          <Collapse startingHeight={290} in={show}>
            <Text w='100%'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, placeat. Animi in nostrum illum reiciendis ducimus sit excepturi maiores nesciunt perferendis! Dolores accusantium voluptas, quam vel maiores modi! Incidunt, error? In a world teetering on the edge of collapse, one unlikely hero holds the key to humanity’s survival.

              “The Last Lightkeeper” is a breathtaking journey through a dystopian landscape where technology has failed and myth becomes reality. Follow Elara, a fiercely intelligent but reluctant leader, as she uncovers ancient secrets hidden deep within the ruins of a forgotten world. As shadows gather and allies fall, she must decide whether to rise or remain in the dark.

              Blending heart-pounding suspense with moments of quiet reflection, this novel explores themes of hope, identity, and the power of human resilience. With rich world-building, unforgettable characters, and twists that will leave you breathless, “The Last Lightkeeper” is not just a story — it's a warning, a mirror, and a promise. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, placeat. Animi in nostrum illum reiciendis ducimus sit excepturi maiores nesciunt perferendis! Dolores accusantium voluptas, quam vel maiores modi! Incidunt, error? In a world teetering on the edge of collapse, one unlikely hero holds the key to humanity’s survival.

              “The Last Lightkeeper” is a breathtaking journey through a dystopian landscape where technology has failed and myth becomes reality. Follow Elara, a fiercely intelligent but reluctant leader, as she uncovers ancient secrets hidden deep within the ruins of a forgotten world. As shadows gather and allies fall, she must decide whether to rise or remain in the dark.

              Blending heart-pounding suspense with moments of quiet reflection, this novel explores themes of hope, identity, and the power of human resilience. With rich world-building, unforgettable characters, and twists that will leave you breathless, “The Last Lightkeeper” is not just a story — it's a warning, a mirror, and a promise.</Text>
          </Collapse>
          <Button size="sm" mt={2} variant="link" colorScheme="teal" onClick={() => setShow(!show)}>
            {show ? "Read Less" : "Read More"}
          </Button>
        </VStack>
        <Box w='20%'>
          <Text fontWeight={'bold'} mb={2}>About this book</Text>
          <Box display={'flex'}>
            <HStack>
              <StackedPagesIcon boxSize={16} />
              <VStack>
                <Text fontWeight={'extrabold'} fontSize={'xl'}>450</Text>
                <Text>Pages</Text>
              </VStack>
              <Divider orientation="vertical" height="100%" borderColor="gray.300" mx={4} />
              <TimeIcon boxSize={16} mr={2} />
              <VStack align={'start'} w='100px'>
                <Text fontWeight={'extrabold'} fontSize={'xl'} >2 - 3</Text>
                <Text>Hours</Text>
              </VStack>
            </HStack>
          </Box>
        </Box>
      </Box>
      <hr style={{ width: '50%', margin: '0 auto' }}></hr>
      <Heading size={'lg'} mt={'6'}>
        Books related to {book.name}
      </Heading>
      <HStack>
        <Button onClick={() => handleScrolling(-getScrollValues().scrollStep)}>{'<'}</Button>
        <Box ref={containRef} gap={9} mt={6} display={'flex'} scrollBehavior={'smooth'} overflowX="scroll"
          sx={{
            '::-webkit-scrollbar': {
              display: 'none',
            }
          }}>
          {books
            .filter((b) => b._id !== book._id)
            .map((b) => (
              <Box flex='0 0 auto'>
                <BookCard key={b._id} book={b} />
              </Box>
            )
            )}
        </Box>
        <Button onClick={() => handleScrolling(getScrollValues().scrollStep)}>{'>'}</Button>
      </HStack>
    </Container>
  )
}

export default BookPage