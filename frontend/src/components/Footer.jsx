import { Container } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Container>
        <hr />
        <Link to="/about">
          <p style={{ textAlign: 'center', padding: '10px 0', color: '#4A5568', fontSize: '14px' }}>
            © {new Date().getFullYear()} BABEL. All rights reserved.
            </p>
        </Link>
    </Container>
  )
}

export default Footer