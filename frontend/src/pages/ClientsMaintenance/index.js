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

export default function ClientsMaintenance({ match }) {
  // From API
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(false);

  const [sellers, setSellers] = useState([]);

  // Checking if edit/register
  const { id } = match.params;

  useEffect(() => {
    async function loadClient() {
      const { data } = await api.get(`/clients/${id}`);
      setName(data.DSNOME);
      setType({
        value: data.IDTIPO,
        label: data.IDTIPO,
      });
      setCreditLimit(data.DSLIM);
      return setSelectedSeller({
        value: data.Seller.CDVEND,
        label: data.Seller.DSNOME,
      });
    }

    async function loadSellers() {
      const { data } = await api.get(`/sellers`);
      const formattedSellers = data.map((seller) => {
        return {
          label: seller.DSNOME,
          value: seller.CDVEND,
        };
      });
      setSellers(formattedSellers);
    }

    if (id) {
      loadClient();
    }
    loadSellers();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !type || !selectedSeller || !creditLimit) {
      return toast.error('Certifique-se de preencher todos os campos.');
    }

    if (name.length >= 50) {
      return toast.error('O campo nome deve ter até no máximo 50 caracteres.');
    }

    if (id) {
      try {
        const submitData = {
          DSNOME: name,
          IDTIPO: type.value,
          CDVEND: selectedSeller.value,
          DSLIM: Number(creditLimit),
        };

        await api.put(`/clients/${id}`, submitData);

        toast.success('Cliente editado com sucesso!');
        return history.push('/home');
      } catch (err) {
        return toast.error('Erro desconhecido');
      }
    }

    try {
      const submitData = {
        DSNOME: name,
        IDTIPO: type.value,
        CDVEND: selectedSeller.value,
        DSLIM: Number(creditLimit),
      };

      await api.post('/clients', submitData);
      toast.success('Cliente cadastrado com sucesso!');
      return history.push('/home');
    } catch (err) {
      return toast.error('Erro desconhecido');
    }
  }

  // eslint-disable-next-line consistent-return
  async function handleDeleteClient(option) {
    if (option === false) {
      return setConfirmationModal(false);
    }
    if (option === true) {
      setConfirmationModal(false);
      try {
        await api.delete(`/clients/${id}`);
        toast.success('Cliente deletado com sucesso!');
        return history.push('/home');
      } catch (err) {
        return toast.error('Erro desconhecido');
      }
    }
  }

  const typesOfPeople = [
    {
      label: 'PF',
      value: 'PF',
    },
    {
      label: 'PJ',
      value: 'PJ',
    },
  ];

  return (
    <>
      {confirmationModal && (
        <Modal setModalVisible={setConfirmationModal}>
          <ConfirmationModalContainer>
            <ModalHeader>
              <MdErrorOutline />
              <h1>Você tem certeza?</h1>
              <h3>Para excluir o cliente, confirme abaixo.</h3>
            </ModalHeader>
            <ModalFooter>
              <button type="button" onClick={() => handleDeleteClient(true)}>
                Sim
              </button>
              <button type="button" onClick={() => handleDeleteClient(false)}>
                Não
              </button>
            </ModalFooter>
          </ConfirmationModalContainer>
        </Modal>
      )}

      <Container>
        <h1>{id ? 'Edição de clientes' : 'Cadastro de clientes'}</h1>
        <ContainerHeader>
          <LeftHeader>
            <Link to="/home">
              <MdKeyboardArrowLeft size={22} color="#fff" />
              <b>VOLTAR</b>
            </Link>
            <Link to="/sellers/register">
              <FaUserPlus size={18} color="#fff" />
              <b>CRIAR VENDEDOR</b>
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

            <b>Limite de crédito</b>
            <input
              type="text"
              value={creditLimit && creditLimit}
              onChange={(e) => setCreditLimit(e.target.value)}
              placeholder="1500.00"
            />
            <b>Tipo de pessoa</b>
            <Select
              placeholder="Selecione o tipo de pessoa"
              options={typesOfPeople}
              onChange={setType}
              value={type && type}
            />
            <b>Vendedor</b>
            <Select
              options={sellers}
              placeholder="Selecione o vendedor"
              onChange={setSelectedSeller}
              value={selectedSeller && selectedSeller}
            />
          </Form>
        </FormArea>
      </Container>
    </>
  );
}

ClientsMaintenance.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
