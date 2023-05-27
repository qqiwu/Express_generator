var express = require('express');
var router = express.Router();
var models = require('../models');
var Op = models.Sequelize.Op

/* 获取所有文章数据 */
// router.get('/', async function (req, res, next) {

//   var articles = await models.Article.findAll({
//     order: [['id', 'DESC']]
//   });
//   res.json({ articles: articles });
// });

/* 模糊查询 */
router.get('/', async function (req, res, next) {
  var currentPage = parseInt(req.query.currentPage) || 1;
  var pageSize = parseInt(req.query.pageSize) || 2;

  var where = {};
  // 模糊查询标题
  var title = req.query.title;
  if (title) {
    where.title = {
      [Op.like]: `%${title}%`
    }
  }

  var result = await models.Article.findAndCountAll({
    order: [['id', 'DESC']],
    where: where,
    offset: (currentPage - 1) * pageSize,
    limit: pageSize
  });
  res.json({
    articles: result.rows,
    pagination: {
      currentPage: currentPage,
      pageSize: pageSize,
      // 一共有多少条记录
      total: result.count
    }
  })
});

/* 添加文章数据 */
router.post('/', async function (req, res, next) {
  var article = await models.Article.create(req.body)
  res.json({ article: article })
})

/* 根据id获取文章数据 */
// router.get('/:id', async function (req, res, next) {
//   // res.json({ id: req.params.id });
//   var article = await models.Article.findByPk(req.params.id);
//   res.json({ article: article });
// })
// 升级
router.get('/:id', async function (req, res, next) {
  var article = await models.Article.findOne({
    where: { id: req.params.id },
    include: [models.Comment],
  });
  res.json({ article: article });
})

/* 根据id更新文章数据 */
router.put('/:id', async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id);
  article.update(req.body);
  res.json({ article: article });
})

/* 根据id删除文章数据 */
router.delete('/:id', async function (req, res, next) {
  var article = await models.Article.findByPk(req.params.id);
  await article.destroy();
  res.json({ msg: '删除成功' })
})

module.exports = router;
