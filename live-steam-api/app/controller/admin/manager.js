/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  // 创建管理员表单
  async create() {
    const { ctx } = this;
    await ctx.render('/manager/create.html');
  }
  // 创建管理员逻辑
  async save() {
    const { ctx, app } = this;

    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '管理员账户',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
    });

    const { username, password } = ctx.request.body;

    if (
      await app.model.Manager.findOne({
        where: {
          username,
        },
      })
    ) {
      return ctx.apiFail('该管理员已存在');
    }

    const manager = await app.model.Manager.create({
      username,
      password,
    });

    ctx.apiSuccess(manager);
  }
  // 管理员列表
  async index() {
    const { ctx, app } = this;
    const data = await ctx.page('Manager');
    await ctx.render('/manager/index.html', {
      data,
    });
  }
  // 编辑管理员
  async edit() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    let data = await app.model.Manager.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return await ctx.pageFail('该记录不存在');
    }

    data = JSON.parse(JSON.stringify(data));
    delete data.password;

    await ctx.renderTemplate({
      id: ctx.params.id,
      title: '修改管理员',
      tempType: 'form',
      form: {
        // 提交地址
        action: '/admin/manager/' + ctx.params.id,
        fields,
        data,
      },
      // 新增成功跳转路径
      successUrl: '/admin/manager',
    });
  }
  // 删除管理员
  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    await app.model.Manager.destroy({
      where: {
        id,
      },
    });
    ctx.toast('删除成功', 'success');
    ctx.redirect(`/admin/manager`);
  }
  // 更新数据
  async update() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: 'int',
        required: true,
      },
      username: {
        type: 'string',
        required: true,
      },
      password: {
        type: 'string',
      },
    });
    const id = ctx.params.id;
    const { username, password } = ctx.request.body;
    // 用户名是否被使用
    const Op = app.Sequelize.Op;
    if (
      await app.model.Manager.findOne({
        where: {
          id: {
            [Op.ne]: id,
          },
          username,
        },
      })
    ) {
      return ctx.apiFail('该用户名已经存在');
    }
    // 当前管理员是否存在
    // eslint-disable-next-line prefer-const
    let manager = await app.model.Manager.findOne({
      where: {
        id,
      },
    });
    if (!manager) {
      return ctx.apiFail('该记录不存在');
    }
    manager.username = username;
    if (password) {
      manager.password = password;
    }
    ctx.apiSuccess(await manager.save());
  }
}

module.exports = ManagerController;
