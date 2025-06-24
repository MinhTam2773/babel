import React from 'react'
import { Container, VStack, Text, Heading, Box } from "@chakra-ui/react";
import steve from "../assets/steve.mp4";



const AboutPage = () => {
  return (
    <Container maxW="full" p={0} pt={16} mb={10}  display='flex' flexDirection='column' alignItems='center' position={'relative'}>
      <Box bg='#000000cc' w='100%' h= '300px' overflow={'hidden'}>
        <video
            src={steve} autoPlay loop muted  style={{ width: '100%', height: '100%', objectFit: 'cover'}}/>
        <Box position='absolute' top={0} left={0} right={0} bottom={0} bg='blackAlpha.600' />
      </Box>
        
        <VStack spacing={6} w="50%" position={'absolute'} bottom='50px' textAlign={'center'}>
            <Heading as="h1" size="2xl" color="teal.500">
            About BABEL
            </Heading>
            <Text fontSize="xl">
            BABEL is your ultimate destination for discovering and sharing books across various genres. Whether you're a fan of fiction, non-fiction, or any other category, BABEL has something for everyone.
            </Text>
            <Text fontSize="lg" >
            Our mission is to connect readers with the books they love and to foster a community of book enthusiasts. Join us in exploring the world of literature!
            </Text>
        </VStack>
    </Container>
  )
}

export default AboutPage