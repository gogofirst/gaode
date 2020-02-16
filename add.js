function addLayer(center) {
  AMap.plugin('AMap.CustomLayer', function () {
    var canvas = document.createElement('canvas');
    var customLayer = new AMap.CustomLayer(canvas, {
      zooms: [3, 18],
      alwaysRender: true,//缩放过程中是否重绘，复杂绘制建议设为false
      zIndex: 120
    });
    var onRender = function () {
      // 初始化canvas的一些东西
      var retina = AMap.Browser.retina;
      var size = map.getSize();//resize
      var width = size.width;
      var height = size.height;
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      if (retina) {//高清适配
        width *= 2;
        height *= 2;
      }
      canvas.width = width;
      canvas.height = height;//清除画布
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = '#08f';
      ctx.strokeStyle = '#08f';
      // 画两个圆，一个空心圆，一个实心圆，
      drawCircle(ctx,retina, 8, 20, center, false)
      drawCircle(ctx, retina,6, 6, center, true)
    }
    customLayer.render = onRender;
    customLayer.setMap(map);
  });
}


function drawCircle(ctx,retina, r1, r2, center, isfill) {
  ctx.beginPath();
  var pos = map.lngLatToContainer(center);
  var r = r1;
  if (retina) {
    pos = pos.multiplyBy(2);
    r *= r2
  }
  ctx.moveTo(pos.x + r, pos.y)
  ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
  ctx.lineWidth = retina ? 6 : 3
  ctx.closePath();
  ctx.stroke();
  isfill && ctx.fill();
}