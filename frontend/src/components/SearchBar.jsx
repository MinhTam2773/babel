import React, { useEffect } from 'react'
import { background, Box, Input, useDisclosure } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useBookStore } from '../store/book';
import  {  useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { books, fetchBooks } = useBookStore();
    const wrapperRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const matchingBooks = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery !== ''
    );

    useEffect(() => { // Detect clicks outside the search bar
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (query) => {
        if (query.trim() === '') return;
        navigation(`/search?q=${encodeURIComponent(query)}`);
    }

    return (
        <Box ref={wrapperRef} w='800px' position='relative' display='flex' bg='gray.900' borderRadius={100} >
            <Input borderLeftRadius={100} border='solid 2px #313742' w={750} focusBorderColor="#313742" placeholder='Search a Book or Author...'
                value={searchQuery}
                onChange={(e) => [setSearchQuery(e.target.value), setIsOpen(true)]}
                onClick={() => setIsOpen(true)}
            />
            {isOpen && matchingBooks.length > 0 && (
                <Box bg='#202120' position={'absolute'} top='100%' w='750px' rounded={'lg'} pb={1}>
                    {matchingBooks.map((book) => (
                        <Box onClick={() => [navigation(`/${book._id}`), setIsOpen(false)]} userSelect={'none'} bg='#202120' position={'relative'} left={2} rounded={'lg'} w='98%' h={8} _hover={{ bg: '#383939' }} key={book._id} pl={5} pt={1} mt={1}>{book.name}</Box>
                    ))}
                </Box>
            )}

            <Box onClick={() => [handleSearch(searchQuery), setIsOpen(!isOpen)]} position={'absolute'} border='solid 1px #313742' right={0} w={50} h={10} display="flex" alignItems={'center'} justifyContent={'center'} borderRightRadius={100} bg='#313742'>
                <SearchIcon w={6} h={6} color='gray' bg='#313742' _hover={{ cursor: 'pointer', color: "blue.200" }} />
            </Box>
        </Box>
    )
}

export default SearchBar