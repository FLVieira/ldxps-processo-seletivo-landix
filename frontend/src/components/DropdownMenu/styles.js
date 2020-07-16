import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  position: relative;
  background: ${(props) =>
    props.visible ? darken(0.07, '#232b2b') : '#232b2b'};
  border-radius: 4px;
  border: none;
  height: 40px;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;

  b {
    color: #fff;
  }
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.07, '#232b2b')};
  }
`;

export const OptionsList = styled.div`
  background: ${(props) =>
    props.visible ? darken(0.07, '#232b2b') : '#232b2b'};
  z-index: 1;
  position: absolute;
  width: 160px;
  height: 60px;
  border-radius: 4px;
  left: calc(50% - 80px);
  top: calc(50% + 18px);
  display: ${(props) => (props.visible === true ? 'block' : 'none')} !important;

  div {
    display: flex;
    flex-direction: column;
    height: 97%;
    justify-content: space-between;
  }
`;
