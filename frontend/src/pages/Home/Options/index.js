import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import PropTypes from 'prop-types';

import { MdEdit } from 'react-icons/md';

import { Container, Badge, OptionsList, Option } from './styles';

export default function Options({ data, type }) {
  const [visible, setVisible] = useState(false);

  return (
    <Container>
      <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
        <Badge onClick={() => setVisible(!visible)}>
          <b>...</b>
        </Badge>
      </OutsideClickHandler>

      <OptionsList visible={visible}>
        <div>
          <Link
            to={
              type === 'seller'
                ? `/sellers/edit/${data.CDVEND}`
                : `/clients/edit/${data.CDCL}`
            }
          >
            <Option type="button">
              <MdEdit size={15} color="#0388fc" />
              <b>Editar</b>
            </Option>
          </Link>
        </div>
      </OptionsList>
    </Container>
  );
}

Options.propTypes = {
  data: PropTypes.shape({
    CDVEND: PropTypes.string,
    CDCL: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
