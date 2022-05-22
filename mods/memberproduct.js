layui.define(['layer', 'table','base64'], function(exports){
	var $ = layui.jquery;
	var layer = layui.layer;
	var table = layui.table;

	table.render({
		elem: '#order',
		url: '/member/product/ajax',
		page: true,
		cellMinWidth:60,
		cols: [[
			{field: 'orderid', title: '訂單編號', width:208},
			{field: 'productname', title: '商品名稱',minWidth:192},
			{field: 'number', title: '數量',width:60},
			{field: 'money', title: '價格',width:78},
			{field: 'addtime', title: '建立時間', width:150, templet: '#addtime'},
			{field: 'status', title: '狀態',templet: '#status',width:80},
			{field: 'opt', title: '詳情',templet: '#opt',width:70},
		]],
        limits: [50,100],
        limit: 50
	});

	exports('memberproduct',null)
});