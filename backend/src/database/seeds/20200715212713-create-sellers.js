const uuidv4 = require('uuid').v4;

module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert(
      'sellers',
      [
        {
          CDVEND: uuidv4(),
          DSNOME: 'Vincent Van Gogh',
          CDTAB: 190,
          DTNASC: new Date(),
        },
        {
          CDVEND: uuidv4(),
          DSNOME: 'Pablo Picasso',
          CDTAB: 152,
          DTNASC: new Date(),
        },
        {
          CDVEND: uuidv4(),
          DSNOME: 'Leonardo Da Vinci',
          CDTAB: 132,
          DTNASC: new Date(),
        },
        {
          CDVEND: uuidv4(),
          DSNOME: 'Claude Monet',
          CDTAB: 123,
          DTNASC: new Date(),
        },
        {
          CDVEND: uuidv4(),
          DSNOME: 'Johannes Vermeer',
          CDTAB: 11,
          DTNASC: new Date(),
        },
        {
          CDVEND: uuidv4(),
          DSNOME: 'Edward Munch',
          CDTAB: 215,
          DTNASC: new Date(),
        },
        {
          CDVEND: uuidv4(),
          DSNOME: 'Salvador Dalí',
          CDTAB: 195,
          DTNASC: new Date(),
        },
        {
          CDVEND: uuidv4(),
          DSNOME: 'Frida Kahlo',
          CDTAB: 165,
          DTNASC: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('sellers', null, {}),
};
