import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import PropTypes from 'prop-types';
import { MdArrowDropDown } from 'react-icons/md';

import { Container, Badge, OptionsList } from './styles';

export default function DropdownMenu({ visible, setVisible, text, children }) {
  return (
    <Container>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <Badge onClick={() => setVisible(!visible)} visible={visible}>
          <b>{text}</b>
          <MdArrowDropDown size={24} color="#fff" />
        </Badge>
      </OutsideClickHandler>

      <OptionsList visible={visible}>
        <div>{children}</div>
      </OptionsList>
    </Container>
  );
}

DropdownMenu.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
