'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        articleId: 1,
        content: "这是文章1的评论",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        articleId: 1,
        content: "这是还是文章1的评论啊",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        articleId: 2,
        content: "这是文章2的评论",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
