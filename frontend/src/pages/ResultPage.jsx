import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useBookStore } from '../store/book';
import { Container, Box, Image, HStack, Text, VStack, Heading, Divider } from '@chakra-ui/react'

const ResultPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { books, fetchBooks, error, loading } = useBookStore();
    const [filteredBooks, setFilterBooks] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks])

    useEffect(() => {
        setFilterBooks(books.filter((book) => book.name.toLowerCase().includes(query.toLowerCase())));
    }, [query, books])

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

    if (!books) {
        return (
            <Container maxW="container.xl" py={12} pt={20}>
                <Text>No book found.</Text>
            </Container>
        );
    }
    console.log(filteredBooks.length, query, books.length)

    return (
        <Container maxW="container.xl" py={12} pt={20}>
            <Text mb={5} fontSize={'30'} color='gray.600'>Results for "{query}"</Text>
            <Box display={'flex'} flexDirection={'column'} gap={7}>
                {filteredBooks.map((b) => (
                    <HStack p={5} onClick={()=> navigation(`/${b._id}`)} transition="background-color 0.4s ease" _hover={{cursor:'pointer', bg:'teal.500'}} spacing={8} align={'start'}>
                        <Image src={b.image} w={200} h={300} objectFit={'cover'} />
                        <VStack align={'start'}>
                            <Heading>{b.name}</Heading>
                            <Text>by <Text as='span' fontStyle={'italic'} fontWeight={'semibold'}>{b.author}</Text> </Text>
                            <Text mt={5} noOfLines={4} w={500}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, reprehenderit doloribus ipsum consectetur ipsa debitis saepe numquam similique magnam quas culpa totam. Quod debitis deserunt ea voluptate, in nobis eaque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus reprehenderit porro inventore iusto tempora corrupti recusandae in temporibus culpa qui, placeat aliquam. Libero totam at, impedit eos consectetur explicabo voluptatibus? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate corporis unde et eum, culpa sapiente voluptatem sit recusandae quae, rerum facilis laudantium sint ab itaque accusantium, optio blanditiis cupiditate. Modi!</Text>
                        </VStack>
                        <Divider orientation="vertical" height='250' borderColor='teal.800'/>
                        <Heading size='lg'>{b.price}$</Heading>
                    </HStack>
                ))}
            </Box>

        </Container>
    )
}

export default ResultPage