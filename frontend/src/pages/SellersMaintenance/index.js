import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MdKeyboardArrowLeft,
  MdDone,
  MdDeleteForever,
  MdErrorOutline,
} from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  Container,
  ContainerHeader,
  LeftHeader,
  RightHeader,
  FormArea,
  Form,
  ConfirmationModalContainer,
  ModalHeader,
  ModalFooter,
} from './styles';

import api from '~/services/api';
import history from '~/services/history';

import Modal from '~/components/Modal';

export default function SellersMaintenance({ match }) {
  const [name, setName] = useState('');
  const [cdtab, setCdtab] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [selectedClients, setSelectedClients] = useState([null]);

  const [confirmationModal, setConfirmationModal] = useState(false);

  const [clients, setClients] = useState(null);

  // Checking if edit/register
  const { id } = match.params;

  useEffect(() => {
    async function loadSeller() {
      const { data } = await api.get(`/sellers/${id}`);
      setName(data.DSNOME);
      setCdtab(data.CDTAB);
      setBirthDate(
        format(parseISO(data.DTNASC), "dd'/0'M'/'yyyy", {
          locale: pt,
        })
      );
      const response = await api.get('/clients', {
        params: { cdVend: id },
      });
      const formattedClients = response.data.map((client) => {
        return {
          label: client.DSNOME,
          value: client.CDCL,
        };
      });
      return setSelectedClients(formattedClients);
    }

    async function loadClients() {
      const { data } = await api.get(`/clients`);
      const formattedClients = data.map((client) => {
        return {
          label: client.DSNOME,
          value: client.CDCL,
        };
      });
      setClients(formattedClients);
    }

    if (id) {
      loadSeller();
    }
    loadClients();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !cdtab || !birthDate || !selectedClients) {
      return toast.error('Certifique-se de preencher todos os campos.');
    }

    if (name.length >= 50) {
      return toast.error('O campo nome deve ter até no máximo 50 caracteres.');
    }

    if (isNaN(new Date(birthDate.split('/').reverse().join('-')))) {
      return toast.error('Data de nascimento inválida.');
    }

    if (id) {
      try {
        const birthDateTimestamp = new Date(
          birthDate.split('/').reverse().join('-')
        ).toISOString();

        selectedClients.map(async (client) => {
          await api.put(`/clients/${client.value}`, {
            CDVEND: id,
          });
        });

        await api.put(`/sellers/${id}`, {
          DSNOME: name,
          CDTAB: Number(cdtab),
          DTNASC: birthDateTimestamp,
        });

        toast.success('Vendedor editado com sucesso!');
        return history.push('/home');
      } catch (err) {
        return toast.error(err.response.data);
      }
    }

    try {
      const birthDateTimestamp = new Date(
        birthDate.split('/').reverse().join('-')
      ).toISOString();

      const { data } = await api.post(`/sellers`, {
        DSNOME: name,
        CDTAB: Number(cdtab),
        DTNASC: birthDateTimestamp,
      });

      selectedClients.map(async (client) => {
        await api.put(`/clients/${client.value}`, {
          CDVEND: data.CDVEND,
        });
      });

      toast.success('Vendedor criado com sucesso!');
      return history.push('/home');
    } catch (err) {
      return toast.error('Erro desconhecido');
    }
  }

  // eslint-disable-next-line consistent-return
  async function handleDeleteSeller(option) {
    if (option === false) {
      return setConfirmationModal(false);
    }
    if (option === true) {
      setConfirmationModal(false);
      try {
        await api.delete(`/sellers/${id}`);
        toast.success('Vendedor deletado com sucesso!');
        return history.push('/home');
      } catch (err) {
        return toast.error('Erro desconhecido');
      }
    }
  }

  return (
    <>
      {confirmationModal && (
        <Modal setModalVisible={setConfirmationModal}>
          <ConfirmationModalContainer>
            <ModalHeader>
              <MdErrorOutline />
              <h1>Você tem certeza?</h1>
              <h3>Para excluir o vendedor, confirme abaixo.</h3>
            </ModalHeader>
            <ModalFooter>
              <button type="button" onClick={() => handleDeleteSeller(true)}>
                Sim
              </button>
              <button type="button" onClick={() => handleDeleteSeller(false)}>
                Não
              </button>
            </ModalFooter>
          </ConfirmationModalContainer>
        </Modal>
      )}

      <Container>
        <h1>{id ? 'Edição de vendedores' : 'Cadastro de vendedores'}</h1>
        <ContainerHeader>
          <LeftHeader>
            <Link to="/home">
              <MdKeyboardArrowLeft size={22} color="#fff" />
              <b>VOLTAR</b>
            </Link>
            <Link to="/clients/register">
              <FaUserPlus size={18} color="#fff" />
              <b>CRIAR CLIENTE</b>
            </Link>
          </LeftHeader>

          <RightHeader>
            {id && (
              <button
                type="button"
                style={{ background: '#e63054' }}
                onClick={() => setConfirmationModal(true)}
              >
                <MdDeleteForever size={22} color="#fff" />
                <b>EXCLUIR</b>
              </button>
            )}
            <button
              type="submit"
              form="my-form"
              style={{ background: '#4aa86c' }}
            >
              <MdDone size={22} color="#fff" />
              <b>CONFIRMAR</b>
            </button>
          </RightHeader>
        </ContainerHeader>

        <FormArea>
          <Form onSubmit={(e) => handleSubmit(e)} id="my-form">
            <b>Nome</b>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
            <b>Cód. Tabela Preço</b>
            <input
              type="text"
              value={cdtab}
              onChange={(e) => setCdtab(e.target.value)}
              placeholder="000"
            />
            <b>Data de Nascimento</b>
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="00/00/0000"
            />
            <b>Clientes</b>
            <Select
              isMulti
              options={clients}
              placeholder="Selecione os clientes"
              onChange={setSelectedClients}
              value={selectedClients}
            />
          </Form>
        </FormArea>
      </Container>
    </>
  );
}

SellersMaintenance.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
