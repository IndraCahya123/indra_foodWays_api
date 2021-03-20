'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        fullname: "Burger King",
        email: "burgerking@email.com",
        password: "burgerking",
        phone: "081xxxxxxx",
        location: "082138193913,0292912193201",
        image: "",
        role: "partner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Starbucks",
        email: "starbucks@email.com",
        password: "starbucks",
        phone: "081xxxxxxx",
        location: "082138193913,0292912193201",
        image: "",
        role: "partner",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Indra Cahya Bali",
        email: "indra@email.com",
        password: "indra",
        phone: "081xxxxxxx",
        location: "082138193913,0292912193201",
        image: "",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Parman",
        email: "parman@email.com",
        password: "parman",
        phone: "081xxxxxxx",
        location: "082138193913,0292912193201",
        image: "",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, [])
  }
};
