// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('学习页面已加载');
    
    // 初始化模块切换
    initModuleNavigation();
    
    // 初始化交互式图表
    initInteractiveGraph();
    
    // 初始化系数效应的交互式图表
    initCoefficientEffectsGraph();
    
    // 初始化小测验功能
    initQuizFunctionality();
    
    // 初始化返回顶部功能
    initBackToTop();
});

// 模块导航功能
function initModuleNavigation() {
    // 获取所有模块按钮和内容
    const moduleButtons = document.querySelectorAll('.module-btn');
    const moduleContents = document.querySelectorAll('.module-content');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    // 显示默认模块（如果URL中有锚点）
    const hash = window.location.hash;
    if (hash && hash.startsWith('#module-')) {
        const targetModule = document.querySelector(hash);
        if (targetModule) {
            // 隐藏所有模块
            moduleContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // 显示目标模块
            targetModule.style.display = 'block';
            
            // 更新侧边栏活动链接
            updateActiveSidebarLink(hash);
        }
    }
    
    // 为模块按钮添加点击事件
    moduleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetModule = document.querySelector(targetId);
            
            if (targetModule) {
                // 隐藏所有模块
                moduleContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // 显示目标模块
                targetModule.style.display = 'block';
                
                // 滚动到模块
                targetModule.scrollIntoView({ behavior: 'smooth' });
                
                // 更新URL锚点（不触发页面跳转）
                history.pushState(null, null, targetId);
                
                // 更新侧边栏活动链接
                updateActiveSidebarLink(targetId);
            }
        });
    });
    
    // 为侧边栏链接添加点击事件
    sidebarLinks.forEach(link => {
        if (link.classList.contains('back-to-top')) {
            return; // 跳过返回顶部链接，它有单独的处理
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetModule = document.querySelector(targetId);
            
            if (targetModule) {
                // 隐藏所有模块
                moduleContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // 显示目标模块
                targetModule.style.display = 'block';
                
                // 滚动到模块
                targetModule.scrollIntoView({ behavior: 'smooth' });
                
                // 更新URL锚点
                history.pushState(null, null, targetId);
                
                // 更新侧边栏活动链接
                updateActiveSidebarLink(targetId);
            }
        });
    });
}

// 更新侧边栏活动链接
function updateActiveSidebarLink(targetId) {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        const linkTarget = link.getAttribute('href');
        
        if (linkTarget === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 初始化返回顶部功能
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 初始化交互式图表
function initInteractiveGraph() {
    const graphContainer = document.getElementById('basic-concepts-graph');
    if (!graphContainer) {
        console.error('图表容器不存在');
        return;
    }
    
    console.log('初始化图表', graphContainer.clientWidth, graphContainer.clientHeight);
    
    // 设置容器的最小尺寸，确保可见
    if (graphContainer.clientHeight < 300) {
        graphContainer.style.minHeight = '300px';
    }
    
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.width = graphContainer.clientWidth || 600;
    canvas.height = graphContainer.clientHeight || 300;
    graphContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('无法获取Canvas上下文');
        return;
    }
    
    // 获取滑块元素
    const aSlider = document.getElementById('a-slider');
    const bSlider = document.getElementById('b-slider');
    const cSlider = document.getElementById('c-slider');
    
    if (!aSlider || !bSlider || !cSlider) {
        console.error('滑块元素不存在');
        return;
    }
    
    // 获取显示值的元素
    const aValue = document.getElementById('a-value');
    const bValue = document.getElementById('b-value');
    const cValue = document.getElementById('c-value');
    const currentEquation = document.getElementById('current-equation');
    const vertex = document.getElementById('vertex');
    const axis = document.getElementById('axis');
    const direction = document.getElementById('direction');
    
    if (!aValue || !bValue || !cValue || !currentEquation || !vertex || !axis || !direction) {
        console.error('显示元素不存在');
        return;
    }
    
    // 初始化参数
    let a = parseFloat(aSlider.value);
    let b = parseFloat(bSlider.value);
    let c = parseFloat(cSlider.value);
    
    // 更新UI显示
    updateDisplay();
    
    // 绘制初始函数
    drawFunction();
    
    // 为滑块添加事件监听器
    aSlider.addEventListener('input', function() {
        a = parseFloat(this.value);
        if (a === 0) a = 0.1; // 防止a为0
        updateDisplay();
        drawFunction();
    });
    
    bSlider.addEventListener('input', function() {
        b = parseFloat(this.value);
        updateDisplay();
        drawFunction();
    });
    
    cSlider.addEventListener('input', function() {
        c = parseFloat(this.value);
        updateDisplay();
        drawFunction();
    });
    
    // 窗口大小变化时重新调整画布
    window.addEventListener('resize', function() {
        if (graphContainer.clientWidth > 0 && graphContainer.clientHeight > 0) {
            canvas.width = graphContainer.clientWidth;
            canvas.height = graphContainer.clientHeight;
            drawFunction();
        }
    });
    
    // 更新显示值
    function updateDisplay() {
        // 更新系数显示
        aValue.textContent = a.toFixed(1);
        bValue.textContent = b.toFixed(1);
        cValue.textContent = c.toFixed(1);
        
        // 更新方程显示
        currentEquation.textContent = formatQuadraticFunction(a, b, c);
        
        // 计算并更新顶点
        const vertexX = -b / (2 * a);
        const vertexY = a * vertexX * vertexX + b * vertexX + c;
        vertex.textContent = `(${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})`;
        
        // 更新对称轴
        axis.textContent = `x = ${vertexX.toFixed(1)}`;
        
        // 更新开口方向
        direction.textContent = a > 0 ? '向上' : '向下';
    }
    
    // 绘制函数图像
    function drawFunction() {
        if (canvas.width === 0 || canvas.height === 0) {
            console.error('Canvas尺寸为0，无法绘图');
            return;
        }
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        console.log('绘制函数', width, height);
        
        // 绘制坐标轴
        drawAxis(ctx, width, height, centerX, centerY);
        
        // 绘制抛物线
        drawParabola(ctx, a, b, c, width, height, centerX, centerY);
        
        // 绘制特殊点
        drawSpecialPoints(ctx, a, b, c, width, height, centerX, centerY);
    }
    
    // 绘制坐标轴
    function drawAxis(ctx, width, height, centerX, centerY) {
        ctx.beginPath();
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        
        // X轴
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        
        // Y轴
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        
        ctx.stroke();
        
        // 绘制箭头
        // X轴箭头
        ctx.beginPath();
        ctx.moveTo(width - 10, centerY - 5);
        ctx.lineTo(width, centerY);
        ctx.lineTo(width - 10, centerY + 5);
        ctx.stroke();
        
        // Y轴箭头
        ctx.beginPath();
        ctx.moveTo(centerX - 5, 10);
        ctx.lineTo(centerX, 0);
        ctx.lineTo(centerX + 5, 10);
        ctx.stroke();
        
        // 绘制刻度
        ctx.fillStyle = '#666';
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
        
        // 原点
        ctx.fillText('O', centerX - 10, centerY + 15);
    }
    
    // 绘制抛物线
    function drawParabola(ctx, a, b, c, width, height, centerX, centerY) {
        const scaleX = width / 12; // X轴缩放比例
        const scaleY = height / 8; // Y轴缩放比例
        
        ctx.beginPath();
        ctx.strokeStyle = '#00acc1';
        ctx.lineWidth = 2;
        
        // 计算并绘制抛物线
        for (let i = -width / 2; i <= width / 2; i++) {
            const x = i / scaleX;
            const y = a * x * x + b * x + c;
            
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
    }
    
    // 绘制特殊点（顶点和零点）
    function drawSpecialPoints(ctx, a, b, c, width, height, centerX, centerY) {
        const scaleX = width / 12;
        const scaleY = height / 8;
        
        // 绘制顶点
        const vertexX = -b / (2 * a);
        const vertexY = a * vertexX * vertexX + b * vertexX + c;
        
        // 转换为画布坐标
        const canvasVertexX = centerX + vertexX * scaleX;
        const canvasVertexY = centerY - vertexY * scaleY;
        
        // 绘制顶点点
        ctx.beginPath();
        ctx.fillStyle = '#e91e63';
        ctx.arc(canvasVertexX, canvasVertexY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // 标记顶点
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Vertex', canvasVertexX + 8, canvasVertexY);
        
        // 计算并绘制零点（如果存在）
        const delta = b * b - 4 * a * c;
        
        if (delta >= 0) {
            // 一个或两个零点
            const x1 = (-b + Math.sqrt(delta)) / (2 * a);
            const x2 = (-b - Math.sqrt(delta)) / (2 * a);
            
            // 转换为画布坐标
            const canvasX1 = centerX + x1 * scaleX;
            const canvasY1 = centerY; // 零点在x轴上，y = 0
            
            ctx.beginPath();
            ctx.fillStyle = '#4caf50';
            ctx.arc(canvasX1, canvasY1, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.fillText('Zeros1', canvasX1, canvasY1 + 20);
            
            if (delta > 0) {
                // 第二个零点
                const canvasX2 = centerX + x2 * scaleX;
                const canvasY2 = centerY;
                
                ctx.beginPath();
                ctx.fillStyle = '#4caf50';
                ctx.arc(canvasX2, canvasY2, 5, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#333';
                ctx.textAlign = 'center';
                ctx.fillText('Zeros2', canvasX2, canvasY2 + 20);
            }
        }
        
        // 绘制对称轴
        ctx.beginPath();
        ctx.strokeStyle = '#ff9800';
        ctx.setLineDash([5, 3]);
        ctx.moveTo(canvasVertexX, 0);
        ctx.lineTo(canvasVertexX, height);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

// 格式化二次函数表达式
function formatQuadraticFunction(a, b, c) {
    let expression = 'f(x) = ';
    
    // a项
    if (a === 1) {
        expression += 'x²';
    } else if (a === -1) {
        expression += '-x²';
    } else {
        expression += a.toFixed(1) + 'x²';
    }
    
    // b项
    if (b !== 0) {
        if (b > 0) {
            expression += ' + ' + b.toFixed(1) + 'x';
        } else {
            expression += ' - ' + Math.abs(b).toFixed(1) + 'x';
        }
    }
    
    // c项
    if (c !== 0) {
        if (c > 0) {
            expression += ' + ' + c.toFixed(1);
        } else {
            expression += ' - ' + Math.abs(c).toFixed(1);
        }
    }
    
    return expression;
}

// 初始化系数效应的交互式图表
function initCoefficientEffectsGraph() {
    const graphContainer = document.getElementById('coefficients-graph');
    if (!graphContainer) {
        console.log('系数效应图表容器不存在');
        return;
    }
    
    console.log('初始化系数效应图表');
    
    // 设置容器的最小尺寸，确保可见
    if (graphContainer.clientHeight < 300) {
        graphContainer.style.minHeight = '300px';
    }
    
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.width = graphContainer.clientWidth || 600;
    canvas.height = graphContainer.clientHeight || 300;
    graphContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('无法获取Canvas上下文');
        return;
    }
    
    // 获取滑块元素
    const aSlider = document.getElementById('coef-a-slider');
    const bSlider = document.getElementById('coef-b-slider');
    const cSlider = document.getElementById('coef-c-slider');
    
    if (!aSlider || !bSlider || !cSlider) {
        console.error('系数效应滑块元素不存在');
        return;
    }
    
    // 获取显示值的元素
    const aValue = document.getElementById('coef-a-value');
    const bValue = document.getElementById('coef-b-value');
    const cValue = document.getElementById('coef-c-value');
    const currentEquation = document.getElementById('coef-current-equation');
    const vertex = document.getElementById('coef-vertex');
    const axis = document.getElementById('coef-axis');
    const direction = document.getElementById('coef-direction');
    const yIntercept = document.getElementById('coef-y-intercept');
    
    if (!aValue || !bValue || !cValue || !currentEquation || !vertex || !axis || !direction || !yIntercept) {
        console.error('系数效应显示元素不存在');
        return;
    }
    
    // 初始化参数
    let a = parseFloat(aSlider.value);
    let b = parseFloat(bSlider.value);
    let c = parseFloat(cSlider.value);
    
    // 更新UI显示
    updateCoefDisplay();
    
    // 绘制初始函数
    drawCoefFunction();
    
    // 为滑块添加事件监听器
    aSlider.addEventListener('input', function() {
        a = parseFloat(this.value);
        if (a === 0) a = 0.1; // 防止a为0
        updateCoefDisplay();
        drawCoefFunction();
    });
    
    bSlider.addEventListener('input', function() {
        b = parseFloat(this.value);
        updateCoefDisplay();
        drawCoefFunction();
    });
    
    cSlider.addEventListener('input', function() {
        c = parseFloat(this.value);
        updateCoefDisplay();
        drawCoefFunction();
    });
    
    // 窗口大小变化时重新调整画布
    window.addEventListener('resize', function() {
        if (graphContainer.clientWidth > 0 && graphContainer.clientHeight > 0) {
            canvas.width = graphContainer.clientWidth;
            canvas.height = graphContainer.clientHeight;
            drawCoefFunction();
        }
    });
    
    // 更新显示值
    function updateCoefDisplay() {
        // 更新系数显示
        aValue.textContent = a.toFixed(1);
        bValue.textContent = b.toFixed(1);
        cValue.textContent = c.toFixed(1);
        
        // 更新方程显示
        currentEquation.textContent = formatQuadraticFunction(a, b, c);
        
        // 计算并更新顶点
        const vertexX = -b / (2 * a);
        const vertexY = a * vertexX * vertexX + b * vertexX + c;
        vertex.textContent = `(${vertexX.toFixed(1)}, ${vertexY.toFixed(1)})`;
        
        // 更新对称轴
        axis.textContent = `x = ${vertexX.toFixed(1)}`;
        
        // 更新开口方向
        direction.textContent = a > 0 ? '向上' : '向下';
        
        // 更新y轴截距
        yIntercept.textContent = `(0, ${c.toFixed(1)})`;
    }
    
    // 绘制函数图像
    function drawCoefFunction() {
        if (canvas.width === 0 || canvas.height === 0) {
            console.error('Canvas尺寸为0，无法绘图');
            return;
        }
        
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        // 绘制坐标轴
        drawCoefAxis(ctx, width, height, centerX, centerY);
        
        // 绘制抛物线
        drawCoefParabola(ctx, a, b, c, width, height, centerX, centerY);
        
        // 绘制特殊点
        drawCoefSpecialPoints(ctx, a, b, c, width, height, centerX, centerY);
    }
    
    // 绘制坐标轴
    function drawCoefAxis(ctx, width, height, centerX, centerY) {
        ctx.beginPath();
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        
        // X轴
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        
        // Y轴
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        
        ctx.stroke();
        
        // 绘制箭头
        // X轴箭头
        ctx.beginPath();
        ctx.moveTo(width - 10, centerY - 5);
        ctx.lineTo(width, centerY);
        ctx.lineTo(width - 10, centerY + 5);
        ctx.stroke();
        
        // Y轴箭头
        ctx.beginPath();
        ctx.moveTo(centerX - 5, 10);
        ctx.lineTo(centerX, 0);
        ctx.lineTo(centerX + 5, 10);
        ctx.stroke();
        
        // 绘制刻度
        ctx.fillStyle = '#666';
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
        
        // 原点
        ctx.fillText('O', centerX - 10, centerY + 15);
    }
    
    // 绘制抛物线
    function drawCoefParabola(ctx, a, b, c, width, height, centerX, centerY) {
        const scaleX = width / 12; // X轴缩放比例
        const scaleY = height / 8; // Y轴缩放比例
        
        ctx.beginPath();
        ctx.strokeStyle = '#00acc1';
        ctx.lineWidth = 2;
        
        // 计算并绘制抛物线
        for (let i = -width / 2; i <= width / 2; i++) {
            const x = i / scaleX;
            const y = a * x * x + b * x + c;
            
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
    }
    
    // 绘制特殊点（顶点、零点和y轴截距）
    function drawCoefSpecialPoints(ctx, a, b, c, width, height, centerX, centerY) {
        const scaleX = width / 12;
        const scaleY = height / 8;
        
        // 绘制顶点
        const vertexX = -b / (2 * a);
        const vertexY = a * vertexX * vertexX + b * vertexX + c;
        
        // 转换为画布坐标
        const canvasVertexX = centerX + vertexX * scaleX;
        const canvasVertexY = centerY - vertexY * scaleY;
        
        // 绘制顶点点
        ctx.beginPath();
        ctx.fillStyle = '#e91e63';
        ctx.arc(canvasVertexX, canvasVertexY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // 标记顶点
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Vertex', canvasVertexX + 8, canvasVertexY);
        
        // 绘制y轴截距
        const canvasYInterceptX = centerX;
        const canvasYInterceptY = centerY - c * scaleY;
        
        ctx.beginPath();
        ctx.fillStyle = '#9c27b0';
        ctx.arc(canvasYInterceptX, canvasYInterceptY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.fillText('y-intercept', canvasYInterceptX + 8, canvasYInterceptY);
        
        // 计算并绘制零点（如果存在）
        const delta = b * b - 4 * a * c;
        
        if (delta >= 0) {
            // 一个或两个零点
            const x1 = (-b + Math.sqrt(delta)) / (2 * a);
            const x2 = (-b - Math.sqrt(delta)) / (2 * a);
            
            // 转换为画布坐标
            const canvasX1 = centerX + x1 * scaleX;
            const canvasY1 = centerY; // 零点在x轴上，y = 0
            
            ctx.beginPath();
            ctx.fillStyle = '#4caf50';
            ctx.arc(canvasX1, canvasY1, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.fillText('root1', canvasX1, canvasY1 + 20);
            
            if (delta > 0) {
                // 第二个零点
                const canvasX2 = centerX + x2 * scaleX;
                const canvasY2 = centerY;
                
                ctx.beginPath();
                ctx.fillStyle = '#4caf50';
                ctx.arc(canvasX2, canvasY2, 5, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#333';
                ctx.textAlign = 'center';
                ctx.fillText('root2', canvasX2, canvasY2 + 20);
            }
        }
        
        // 绘制对称轴
        ctx.beginPath();
        ctx.strokeStyle = '#ff9800';
        ctx.setLineDash([5, 3]);
        ctx.moveTo(canvasVertexX, 0);
        ctx.lineTo(canvasVertexX, height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // 添加变化轨迹标记 (可选)
        if (Math.abs(b) > 0.1 || Math.abs(c) > 0.1) {
            // 绘制从(0,0)到顶点的虚线，表示移动轨迹
            ctx.beginPath();
            ctx.strokeStyle = '#673ab7';
            ctx.setLineDash([3, 3]);
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(canvasVertexX, canvasVertexY);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }
}

// 初始化小测验功能
function initQuizFunctionality() {
    const checkQuizButton = document.getElementById('check-quiz');
    if (!checkQuizButton) {
        console.log('小测验按钮不存在');
        return;
    }
    
    checkQuizButton.addEventListener('click', function() {
        const quizQuestions = document.querySelectorAll('.quiz-question');
        let correctCount = 0;
        let totalQuestions = quizQuestions.length;
        
        quizQuestions.forEach(question => {
            const feedbackDiv = question.querySelector('.quiz-feedback');
            const correctAnswer = feedbackDiv.getAttribute('data-correct');
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            
            if (selectedOption) {
                const userAnswer = selectedOption.value;
                
                if (userAnswer === correctAnswer) {
                    feedbackDiv.textContent = '✓ 正确!';
                    feedbackDiv.className = 'quiz-feedback correct';
                    correctCount++;
                } else {
                    feedbackDiv.textContent = '✗ 不正确。正确答案是: ' + correctAnswer;
                    feedbackDiv.className = 'quiz-feedback incorrect';
                }
            } else {
                feedbackDiv.textContent = '请选择一个答案';
                feedbackDiv.className = 'quiz-feedback no-answer';
            }
        });
        
        const resultsDiv = document.getElementById('quiz-results');
        if (resultsDiv) {
            resultsDiv.textContent = `得分: ${correctCount}/${totalQuestions}`;
            resultsDiv.className = 'quiz-score';
        }
    });
} 