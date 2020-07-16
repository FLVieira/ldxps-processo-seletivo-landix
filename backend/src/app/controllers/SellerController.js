import uuidValidate from 'uuid-validate';

import Seller from '../models/Seller';

class SellerController {
  async index(req, res) {
    try {
      const sellers = await Seller.findAll();
      return res.json(sellers);
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
      const seller = await Seller.findByPk(id);
      if (!seller) {
        return res.status(400).json({ error: 'Invalid Seller' });
      }
      return res.json(seller);
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(req, res) {
    try {
      const { DSNOME, CDTAB, DTNASC } = req.body;
      if (!DSNOME || !CDTAB || !DTNASC) {
        return res.status(400).json({ error: 'Invalid Fields' });
      }
      const newSeller = await Seller.create({ DSNOME, CDTAB, DTNASC });
      return res.json(newSeller);
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
      const seller = await Seller.findByPk(id);
      if (!seller) {
        return res.status(400).json({
          error: 'Invalid Seller',
        });
      }
      await seller.update(req.body);
      return res.json(seller);
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
      const seller = await Seller.findByPk(id);
      if (!seller) {
        return res.status(400).json({ error: 'Invalid Seller' });
      }
      await seller.destroy();
      return res.send();
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new SellerController();
