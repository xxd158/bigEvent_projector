$(function () {
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
  });
  const layer = layui.layer;
  // 初始化用户信息
  const initUserInfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg("获取用户信息失败！");
        layer.msg("获取用户信息成功！");
        form.val("formUserInfo", res.data);
      },
    });
  };

  initUserInfo();
  // 重置表单数据
  $("#btnReset").click((e) => {
    e.preventDefault();
    initUserInfo();
  });
  // 更新用户数据
  $(".layui-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(".layui-form").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("更新用户信息失败！");
        layer.msg("更新用户信息成功！");
        // 调用父页面渲染函数
        window.parent.getUserInfo();
      },
    });
  });
});
