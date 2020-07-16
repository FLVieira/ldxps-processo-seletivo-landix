import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.section`
  width: 60%;
  margin: 50px auto;
  background: #eee;
  height: 140%;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px;
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  a {
    background: #0e1111;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 35px;
    padding: 5px 10px;
    margin-right: 10px;

    svg {
      padding-right: 5px;
    }

    transition: background 0.2s;

    &:hover {
      background: ${lighten(0.05, '#0e1111')};
    }
  }
`;

export const RightHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: none;
    border-radius: 4px;
    height: 35px;
    padding: 5px 10px;
    color: #fff;
    font-size: 15px;
    margin-left: 10px;
    transition: opacity 0.2s;

    svg {
      padding-right: 5px;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const FormArea = styled.div`
  width: 100%;
  background: #fff;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 25px;

  b {
    color: #3d3b3b;
    margin: 10px 0;
    font-size: 13 px;
  }

  input {
    padding: 0 10px;
    font-size: 15px;
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 3px dashed #909090;
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;

    img {
      max-width: 180px;
      max-height: 180px;
    }

    input {
      display: none;
    }
  }
`;

export const ConfirmationModalContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 58px;
    color: #e09b24;
  }

  h1 {
    color: #403e3b;
    font-size: 20px;
    margin-bottom: 10px;
  }

  h3 {
    color: #615c54;
    margin-bottom: 20px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;

  button {
    width: 45%;
    height: 30px;
    background: #0e1111;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#0e1111')};
    }
  }
`;
