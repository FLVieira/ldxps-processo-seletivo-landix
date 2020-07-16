import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken, lighten } from 'polished';

export const Container = styled.section`
  width: 90%;
  margin: 50px auto;
  background: #eee;
`;

export const ContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 32px;
  }
`;

export const Option = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  background: ${darken(0.07, '#232b2b')} !important;
  width: 160px;
  height: 30px;
  color: #fff;
  padding-left: 10px;

  b {
    font-size: 12px;
    font-weight: normal;
    margin-left: 10px;
    margin-right: auto;
  }

  &:hover {
    background: #232b2b !important;
  }
`;

export const TablesTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 70px;
`;

export const SellersHeader = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h2 {
    padding-bottom: 10px;
  }
`;

export const ClientsHeader = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 10px;
    height: 40px;
    background: #0e1111;
    border: none;
    border-radius: 6px;
    width: 140px;
    font-weight: bold;
    color: #fff;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;

    transition: background 0.2s;

    &:hover {
      background: ${lighten(0.05, '#0e1111')};
    }
  }
`;

export const TablesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
`;

export const SellersTable = styled.table`
  width: 30%;
  border-spacing: 0px;

  thead th {
    color: #383636;
    text-align: left;
    padding: 12px 12px 28px 12px;

    &:last-child {
      text-align: center;
    }
  }

  tbody tr {
    &:hover {
      background: #c7c3c3;
    }
  }

  tbody td {
    padding: 12px;
    border-radius: 4px;
    border-bottom: 20px solid #eee;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  div {
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    strong {
      margin-left: 5px;
    }
  }

  aside {
    display: flex;
    justify-content: center;
  }

  strong {
    color: #525050;
    font-weight: normal;
    display: block;
  }

  tbody {
    background: #fff;
  }
`;

export const ClientsTable = styled.table`
  width: 55%;
  border-spacing: 0px;

  thead th {
    color: #383636;
    text-align: left;
    padding: 12px 12px 28px 12px;

    &:last-child {
      text-align: center;
    }
  }

  tbody td {
    padding: 12px;
    border-radius: 4px;
    border-bottom: 20px solid #eee;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  div {
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

    strong {
      margin-left: 5px;
    }
  }

  aside {
    display: flex;
    justify-content: center;
  }

  strong {
    color: #525050;
    font-weight: normal;
    display: block;
  }

  tbody {
    background: #fff;
  }
`;
