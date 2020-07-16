import uuidValidate from 'uuid-validate';

import Client from '../models/Client';
import Seller from '../models/Seller';

class ClientController {
  async index(req, res) {
    try {
      const { cdVend } = req.query;
      let clients;
      if (cdVend) {
        clients = await Client.findAll({
          where: { CDVEND: cdVend },
          include: [{ model: Seller }],
        });
        return res.json(clients);
      }
      clients = await Client.findAll({
        include: [{ model: Seller }],
      });
      return res.json(clients);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!uuidValidate(id)) {
        return res.status(400).json({ error: 'Invalid UUID' });
      }
      const client = await Client.findByPk(id, {
        include: [{ model: Seller }],
      });
      if (!client) {
        return res.status(400).json({ error: 'Invalid client' });
      }
      return res.json(client);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(req, res) {
    try {
      const { DSNOME, IDTIPO, CDVEND, DSLIM } = req.body;
      if (!DSNOME || !IDTIPO || !CDVEND || !DSLIM) {
        return res.status(400).json({ error: 'Invalid Fields' });
      }
      if (!uuidValidate(CDVEND)) {
        return res.status(400).json({ error: 'Invalid CDVEND' });
      }
      const sellerExists = await Seller.findByPk(CDVEND);
      if (!sellerExists) {
        return res.status(400).json({ error: 'Invalid Seller' });
      }
      const newClient = await Client.create({ DSNOME, IDTIPO, CDVEND, DSLIM });
      return res.json(newClient);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!uuidValidate(id)) {
        return res.status(400).json({ error: 'Invalid UUID' });
      }
      const client = await Client.findByPk(id);
      if (!client) {
        return res.status(400).json({
          error: 'Invalid Client',
        });
      }
      await client.update(req.body);
      return res.json(client);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      if (!uuidValidate(id)) {
        return res.status(400).json({ error: 'Invalid UUID' });
      }
      const client = await Client.findByPk(id);
      if (!client) {
        return res.status(400).json({ error: 'Invalid Client' });
      }
      await client.destroy();
      return res.send();
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new ClientController();
