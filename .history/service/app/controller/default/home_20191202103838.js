"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    let result = await this.app.mysql.get("blog_content", {});
    console.log(result);
    this.ctx.body = result;
  }

  async getArticleList() {
    let sql = "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.Id";

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results
    };
  }

  async getArticleById() {
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id

    const result = await this.app.mysql.query(sql)

    this.ctx.body = {
      data: result
    }

  }
}

module.exports = HomeController;