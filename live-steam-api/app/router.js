'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // sorket路由配置测试
  // io.of('/').route('test', io.controller.nsp.test);
  // 进入直播间
  io.of('/').route('joinLive', io.controller.live.joinLive);
  // 离开直播间
  io.of('/').route('leaveLive', io.controller.live.leaveLive);
  // 发送弹幕
  io.of('/').route('comment', io.controller.live.comment);
  // 发送礼物
  io.of('/').route('gift', io.controller.live.gift);
  router.get('/api/gift/list', controller.api.gift.list);
  // 项目创建的测试接口路径
  router.get('/', controller.home.index);
  // 用户注册
  router.post('/api/reg', controller.api.user.reg);
  // 账号密码登录
  router.post('/api/login', controller.api.user.login);
  // 微信登录
  router.post('/api/wxLogin', controller.api.user.wxLogin);
  // 发送验证码
  router.post('/api/sendcode', controller.api.sms.sendCode);
  // 手机验证码登录
  router.post('/api/phoneLogin', controller.api.user.phoneLogin);
  // 获取当前用户信息
  router.get('/api/user/info', controller.api.user.info);
  // 用户退出登录
  router.post('/api/logout', controller.api.user.logout);
  // 创建直播间
  router.post('/api/live/create', controller.api.live.save);
  // 修改直播间状态
  router.post('/api/live/changstatus', controller.api.live.changeStatus);
  // 直播间列表
  router.get('/api/live/list/:page', controller.api.live.list);
  // 查看指定直播
  router.get('/api/live/read/:id', controller.api.live.read);


  // 后台相关路由配置

  // dashbord首页
  router.get('/admin', controller.admin.home.index);
  // 管理员登录路由
  router.get('/admin/login', controller.admin.home.login);
  // 登出路由
  router.get('/admin/logout', controller.admin.home.logout);
  // 登录登出接口
  router.post('/admin/loginevent', controller.admin.home.loginevent);
  // 管理员模块列表路由
  router.get('/admin/manager', controller.admin.manager.index);
  // 创建管理员页面路由
  router.get('/admin/manager/create', controller.admin.manager.create);
  // 新增管理员接口
  router.post('/admin/manager', controller.admin.manager.save);
};
