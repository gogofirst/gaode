function addColor(center) {
  let timer = null;
  AMap.plugin('AMap.CustomLayer', function () {
    var canvas = document.createElement('canvas');
    var customLayer = new AMap.CustomLayer(canvas, {
      zooms: [3, 18],
      alwaysRender: true,//缩放过程中是否重绘，复杂绘制建议设为false
      zIndex: 120
    });
    var onRender = function () {
      // 为什么要清除定时器，拖拽时地图会动，图层会重新渲染，如果不清除上一个定时器，会同时有多个扇形
      clearInterval(timer) 
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


      let r1 = 0;

      timer = setInterval(() => {
        var pos = map.lngLatToContainer(center);
        var r = 8;
        if (retina) {
          pos = pos.multiplyBy(2);
          r *= 20
        }
        ctx.clearRect(0, 0, width, height) // 如果不清除，扇形面积会一直增加，效果不对
        r1 += 0.005;
        r1 = r1 % 2;   // 为啥要取余，因为r1一直加加，本例中取得是两者的差值，所以即使没有取余，也没有影响
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y)
        ctx.arc(pos.x, pos.y, r, r1 * Math.PI, r1 * Math.PI + 0.2 * Math.PI);
        ctx.lineWidth = retina ? 6 : 3
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }, 10)
    }
    customLayer.render = onRender;
    customLayer.setMap(map);
  });
}