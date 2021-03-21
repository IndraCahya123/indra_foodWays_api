'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHashed = await bcrypt.hash("12345678", 10);
    return queryInterface.bulkInsert("Users", [
      {
        fullname: "Burger King",
        email: "burgerking@email.com",
        password: passwordHashed,
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
        password: passwordHashed,
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
        password: passwordHashed,
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
        password: passwordHashed,
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
