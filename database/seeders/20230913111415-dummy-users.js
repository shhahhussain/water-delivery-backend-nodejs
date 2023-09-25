"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        full_name: "John Doe",
        date_of_birth: new Date(2000, 11, 17),
        email: "johndoe@example.com",
        password: "password",
        gender: "Male",
        mobile_number: "03339995566",
        no_of_family_members: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Tom Barn",
        date_of_birth: new Date(2000, 12, 11),
        email: "tbarn@example.com",
        password: "password",
        gender: "Male",
        mobile_number: "03339995577",
        no_of_family_members: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        full_name: "Jane Wilde",
        date_of_birth: new Date(2000, 9, 17),
        email: "jwilde@example.com",
        password: "password",
        gender: "Female",
        mobile_number: "03339995544",
        no_of_family_members: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
