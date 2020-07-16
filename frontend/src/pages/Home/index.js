import React, { useEffect, useState } from 'react';
import { FaIdBadge, FaUserPlus } from 'react-icons/fa';

import {
  Container,
  ContainerTop,
  Option,
  TablesTop,
  SellersHeader,
  ClientsHeader,
  TablesContainer,
  SellersTable,
  ClientsTable,
} from './styles';

import Options from './Options';

import DropdownMenu from '~/components/DropdownMenu';

import api from '~/services/api';

export default function Home() {
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    async function loadSellers() {
      const { data } = await api.get('/sellers');
      setSellers(data);
      setFilteredSellers(data);
    }
    async function loadClients() {
      const { data } = await api.get('/clients');
      setClients(data);
      setFilteredClients(data);
    }
    loadSellers();
    loadClients();
  }, []);

  function handleClientsFilter(filter, seller) {
    if (filter === true) {
      setFilteredClients(
        clients.filter((client) =>
          String(client.CDVEND).includes(seller.CDVEND)
        )
      );
      return setSelectedSeller(seller.DSNOME);
    }
    setFilteredClients(clients);
    return setSelectedSeller(null);
  }

  return (
    <Container>
      <ContainerTop>
        <h1>Home</h1>

        <DropdownMenu
          text="CADASTRAR"
          visible={dropdownVisible}
          setVisible={setDropdownVisible}
        >
          <Option to="/sellers/register">
            <FaIdBadge size={13} color="#0388fc" />
            <b>Cadastrar vendedor</b>
          </Option>
          <Option to="/clients/register">
            <FaUserPlus size={13} color="#42f55a" />
            <b>Cadastrar cliente</b>
          </Option>
        </DropdownMenu>
      </ContainerTop>

      <TablesTop>
        <SellersHeader>
          <h2>Vendedores</h2>
          Clique em um vendedor para selecioná-lo
        </SellersHeader>
        <ClientsHeader>
          <h2>Clientes&nbsp;</h2>{' '}
          {selectedSeller && (
            <>
              <h2>de {selectedSeller} - </h2>
              <button type="button" onClick={() => handleClientsFilter(false)}>
                Mostrar Todos
              </button>
            </>
          )}
        </ClientsHeader>
      </TablesTop>

      <TablesContainer>
        <SellersTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CDTAB</th>
              <th />
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredSellers.map((seller) => (
              <tr key={seller.CDVEND}>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClientsFilter(true, seller)}
                >
                  <strong>{seller.DSNOME}</strong>
                </td>
                <td
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClientsFilter(true, seller)}
                >
                  <strong>#{seller.CDTAB}</strong>
                </td>
                <td />
                <td>
                  <aside>
                    <Options data={seller} type="seller" />
                  </aside>
                </td>
              </tr>
            ))}
          </tbody>
        </SellersTable>
        <ClientsTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo de pessoa</th>
              <th>Limite de crédito</th>
              <th />
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.CDCL}>
                <td>
                  <strong>{client.DSNOME}</strong>
                </td>
                <td>
                  <strong>{client.IDTIPO}</strong>
                </td>
                <td>
                  <strong>R${client.DSLIM}</strong>
                </td>
                <td />
                <td>
                  <aside>
                    <Options data={client} type="client" />
                  </aside>
                </td>
              </tr>
            ))}
          </tbody>
        </ClientsTable>
      </TablesContainer>
    </Container>
  );
}
