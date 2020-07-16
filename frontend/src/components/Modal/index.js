import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import PropTypes from 'prop-types';

import { Container, ConfirmationContainer } from './styles';

export default function Modal(props) {
  const { setModalVisible, children } = props;

  return (
    <Container>
      <ConfirmationContainer>
        <OutsideClickHandler onOutsideClick={() => setModalVisible(false)}>
          <div>{children}</div>
        </OutsideClickHandler>
      </ConfirmationContainer>
    </Container>
  );
}

Modal.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  children: PropTypes.PropTypes.element.isRequired,
};
