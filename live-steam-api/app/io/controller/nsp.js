/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;

class NspController extends Controller {
  async test() {
    console.log('进入该测试方法');
    const { ctx, app } = this;
    console.log(ctx);
  }
}

module.exports = NspController;
