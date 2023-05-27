'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Articles', [
      {
        title: '长沙最好吃的小吃是什么？',
        content: '肯定是三鲜豆皮，臭豆腐一点都不好吃',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '今天天气可真好啊',
        content: '狂风暴雨特别凉快哦，欢迎每年来长沙看海！',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Articles', null, {});

  }
};
