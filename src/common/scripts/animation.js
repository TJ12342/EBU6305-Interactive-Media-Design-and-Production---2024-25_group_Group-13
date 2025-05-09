// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 初始化首页的抛物线动画
    initParabolaAnimation();
});

// 初始化抛物线动画
function initParabolaAnimation() {
    const container = document.getElementById('animation-container');
    if (!container) return;
    
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // 初始化动画参数
    let params = getRandomQuadraticParams();
    let t = 0; // 时间因子，用于动画
    let direction = 1; // 动画方向
    
    // 动画循环
    function animate() {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 计算新的参数（使动画有变化）
        t += 0.01 * direction;
        if (t > 1 || t < 0) {
            direction *= -1; // 反转动画方向
            if (t > 1) t = 1;
            if (t < 0) {
                t = 0;
                // 当动画循环一次后生成新的函数
                params = getRandomQuadraticParams();
            }
        }
        
        // 绘制坐标轴
        drawAxis(ctx, canvas.width, canvas.height);
        
        // 绘制抛物线
        drawParabola(ctx, params.a, params.b, params.c, canvas.width, canvas.height, t);
        
        // 显示方程
        displayEquation(ctx, params.a, params.b, params.c, canvas.width, canvas.height);
        
        // 继续动画
        requestAnimationFrame(animate);
    }
    
    // 启动动画
    animate();
    
    // 窗口大小变化时重新调整画布大小
    window.addEventListener('resize', function() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    });
}

// 生成随机二次函数参数
function getRandomQuadraticParams() {
    // 确保a不为0，否则不是抛物线
    const a = (Math.random() * 2 - 1) * 0.5;
    // 避免a太接近0
    const adjustedA = a === 0 ? 0.5 : a;
    
    // 生成b和c参数
    const b = (Math.random() * 4 - 2) * 0.5;
    const c = (Math.random() * 4 - 2) * 0.5;
    
    return {
        a: adjustedA,
        b: b,
        c: c
    };
}

// 格式化二次函数显示
function formatQuadraticFunction(a, b, c) {
    // 格式化为2位小数
    const aFormatted = a.toFixed(2);
    const bFormatted = b.toFixed(2);
    const cFormatted = c.toFixed(2);
    
    // 构建方程字符串
    let formula = `f(x) = `;
    
    // 处理a系数
    if (a === 1) {
        formula += `x²`;
    } else if (a === -1) {
        formula += `-x²`;
    } else {
        formula += `${aFormatted}x²`;
    }
    
    // 处理b系数
    if (b > 0) {
        formula += ` + ${bFormatted}x`;
    } else if (b < 0) {
        formula += ` - ${Math.abs(b).toFixed(2)}x`;
    }
    
    // 处理c系数
    if (c > 0) {
        formula += ` + ${cFormatted}`;
    } else if (c < 0) {
        formula += ` - ${Math.abs(c).toFixed(2)}`;
    }
    
    return formula;
}

// 绘制坐标轴
function drawAxis(ctx, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.beginPath();
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--axis-color') || '#888';
    ctx.lineWidth = 1;
    
    // X轴
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    
    // Y轴
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    
    // 绘制箭头
    // X轴箭头
    ctx.moveTo(width - 10, centerY - 5);
    ctx.lineTo(width, centerY);
    ctx.lineTo(width - 10, centerY + 5);
    
    // Y轴箭头
    ctx.moveTo(centerX - 5, 10);
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);
    
    ctx.stroke();
    
    // 绘制刻度
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-color') || '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // X轴刻度
    for (let i = -5; i <= 5; i++) {
        if (i === 0) continue; // 跳过原点
        
        const x = centerX + i * (width / 12);
        
        ctx.beginPath();
        ctx.moveTo(x, centerY - 5);
        ctx.lineTo(x, centerY + 5);
        ctx.stroke();
        
        ctx.fillText(i.toString(), x, centerY + 15);
    }
    
    // Y轴刻度
    for (let i = -3; i <= 3; i++) {
        if (i === 0) continue; // 跳过原点
        
        const y = centerY - i * (height / 8);
        
        ctx.beginPath();
        ctx.moveTo(centerX - 5, y);
        ctx.lineTo(centerX + 5, y);
        ctx.stroke();
        
        ctx.fillText(i.toString(), centerX - 15, y);
    }
    
    // 绘制原点标记
    ctx.fillText('O', centerX - 10, centerY + 15);
}

// 绘制抛物线
function drawParabola(ctx, a, b, c, width, height, t) {
    const centerX = width / 2;
    const centerY = height / 2;
    const scaleX = width / 12; // X轴缩放比例
    const scaleY = height / 8; // Y轴缩放比例
    
    // 调整参数使动画更平滑
    const currentA = a * (0.5 + t * 0.5); // a随时间变化
    
    ctx.beginPath();
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--parabola-color') || '#2196F3';
    ctx.lineWidth = 2;
    
    // 计算并绘制抛物线点
    for (let i = -width / 2; i <= width / 2; i++) {
        const x = i / scaleX;
        const y = currentA * x * x + b * x + c;
        
        // 转换为画布坐标
        const canvasX = centerX + x * scaleX;
        const canvasY = centerY - y * scaleY;
        
        if (i === -width / 2) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    
    ctx.stroke();
    
    // 绘制顶点
    const vertexX = -b / (2 * currentA);
    const vertexY = currentA * vertexX * vertexX + b * vertexX + c;
    
    // 转换为画布坐标
    const canvasVertexX = centerX + vertexX * scaleX;
    const canvasVertexY = centerY - vertexY * scaleY;
    
    // 绘制顶点点
    ctx.beginPath();
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--vertex-color') || '#FF5722';
    ctx.arc(canvasVertexX, canvasVertexY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // 标记顶点坐标
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-color') || '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`(${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})`, canvasVertexX + 8, canvasVertexY - 5);
}

// 显示方程
function displayEquation(ctx, a, b, c, width, height) {
    const formula = formatQuadraticFunction(a, b, c);
    
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-color') || '#444';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(formula, 20, 20);
} 