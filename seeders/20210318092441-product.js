'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        title: "Classic Crispy Chicken",
        price: 48000,
        image: "",
        userId: 1,
      },
      {
        title: "Quattro Cheese Crispy Chicken",
        price: 51000,
        image: "",
        userId: 1,
      },
      {
        title: "Cheese Rasher Chicken",
        price: 45000,
        image: "",
        userId: 1,
      },
      {
        title: "Honey Almondmilk Cold Brew",
        price: 48000,
        image: "",
        userId: 2,
      },
      {
        title: "Irish Cream Cold Brew",
        price: 51000,
        image: "",
        userId: 2,
      },
      {
        title: "Iced Coffee Americano",
        price: 45000,
        image: "",
        userId: 2,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, []);
  }
};
