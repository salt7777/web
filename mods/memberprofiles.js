layui.define(['layer', 'form'], function(exports){
	var $ = layui.jquery;
	var layer = layui.layer;
	var form = layui.form;

	form.verify({
		passwd: [/^[\S]{6,99}$/,'密碼長度至少六位'],
		passwdnew: function(value){
			var passwd = $('#L_nowpass').val();
			if (value==passwd) {
				return '新密碼不可與現時密碼一致';
			}
		},
		repasswd: function(value){
			var passwd = $('#L_pass').val();
			if (value!=passwd) {
				return '兩次輸入的密碼不一致';
			}
		},
		qq:function(value){
			if (value != ''&& !/^[1-9][0-9]{5,10}$/.test(value)) {
				return '錯誤asnkj';
			}
		}
	});

	//修改资料
	form.on('submit(profiles)', function(data){

		data.field.csrf_token = TOKEN;
		var i = layer.load(2,{shade: [0.5,'#fff']});
		$.ajax({
			url: '/member/profiles/profilesajax',
			type: 'POST',
			dataType: 'json',
			data: data.field,
		})
		.done(function(res) {
			if (res.code == '1') {
				layer.open({
					title: '提示',
					content: '已更改',
					btn: ['OK'],
					yes: function(index, layero){
					    location.reload();
					},
					cancel: function(){ 
					    location.reload();
					}
				});
			} else {
				layer.msg(res.msg,{icon:2,time:5000});
			}
		})
		.fail(function() {
			layer.msg('服务器连接失败，请联系管理员',{icon:2,time:5000});
		})
		.always(function() {
			layer.close(i);
		});

		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	});

	//修改密码
	form.on('submit(pass)', function(data){

		data.field.csrf_token = TOKEN;
		var i = layer.load(2,{shade: [0.5,'#fff']});
		$.ajax({
			url: '/member/profiles/passwordajax',
			type: 'POST',
			dataType: 'json',
			data: data.field,
		})
		.done(function(res) {
			if (res.code == '1') {
				layer.open({
					title: '提示',
					content: res.msg,
					btn: ['确定'],
					yes: function(index, layero){
					    location.reload();
					},
					cancel: function(){ 
					    location.reload();
					}
				});
			} else {
				layer.msg(res.msg,{icon:2,time:5000});
			}
		})
		.fail(function() {
			layer.msg('服务器连接失败，请联系管理员',{icon:2,time:5000});
		})
		.always(function() {
			layer.close(i);
		});

		return false; //阻止表单跳转。
	});

	exports('memberprofiles',null)
});