import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import logo from '~/assets/images/logo.png';

export default function Header() {
  return (
    <Container>
      <Link to="/home">
        <img src={logo} alt="Logo" />
      </Link>
    </Container>
  );
}
