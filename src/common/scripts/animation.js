// 首页抛物线动画
document.addEventListener('DOMContentLoaded', function() {
    const animationContainer = document.getElementById('animation-container');
    if (!animationContainer) return;
    
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 300;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    
    animationContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // 定义抛物线参数
    const params = {
        a: 0.05,
        b: 0,
        c: 150,
        color: '#3498db',
        lineWidth: 3
    };
    
    // 绘制坐标轴
    function drawAxes() {
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 1;
        
        // X轴
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        
        // Y轴
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
    }
    
    // 绘制抛物线
    function drawParabola() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawAxes();
        
        ctx.beginPath();
        ctx.strokeStyle = params.color;
        ctx.lineWidth = params.lineWidth;
        
        for (let x = -canvas.width / 2; x <= canvas.width / 2; x++) {
            const realX = x + canvas.width / 2;
            // f(x) = a*x^2 + b*x + c
            const y = params.a * x * x + params.b * x + params.c;
            const realY = canvas.height - y;
            
            if (x === -canvas.width / 2) {
                ctx.moveTo(realX, realY);
            } else {
                ctx.lineTo(realX, realY);
            }
        }
        
        ctx.stroke();
    }
    
    // 初始绘制
    drawParabola();
    
    // 简单动画效果
    let direction = 1;
    
    function animate() {
        params.a += 0.0005 * direction;
        
        if (params.a > 0.08) direction = -1;
        if (params.a < 0.02) direction = 1;
        
        drawParabola();
        requestAnimationFrame(animate);
    }
    
    animate();
}); 