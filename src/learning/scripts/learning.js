// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('学习页面已加载');
    
    // 初始化模块切换
    initModuleNavigation();
    
    // 初始化交互式图表
    initInteractiveGraph();
    
    // 初始化系数效应的交互式图表
    initCoefficientEffectsGraph();
    
    // 初始化图形变换的交互式图表
    initTransformationsGraph();
    
    // 初始化小测验功能
    initQuizFunctionality();
    
    // 初始化变换测验功能
    initTransformationsQuiz();
    
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

// 初始化图形变换的交互式图表
function initTransformationsGraph() {
    const graphContainer = document.getElementById('transformations-graph');
    if (!graphContainer) {
        console.log('Transformations graph container not found');
        return;
    }
    
    console.log('Initializing transformations graph', graphContainer.clientWidth, graphContainer.clientHeight);
    
    // Set minimum dimensions for the container
    if (graphContainer.clientHeight < 300) {
        graphContainer.style.minHeight = '300px';
    }
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = graphContainer.clientWidth || 600;
    canvas.height = graphContainer.clientHeight || 300;
    graphContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Cannot get canvas context');
        return;
    }
    
    // Get sliders
    const aSlider = document.getElementById('trans-a-slider');
    const hSlider = document.getElementById('trans-h-slider');
    const kSlider = document.getElementById('trans-k-slider');
    
    if (!aSlider || !hSlider || !kSlider) {
        console.error('Transformation sliders not found');
        return;
    }
    
    // Get display elements
    const aValue = document.getElementById('trans-a-value');
    const hValue = document.getElementById('trans-h-value');
    const kValue = document.getElementById('trans-k-value');
    const currentEquation = document.getElementById('trans-current-equation');
    const vertex = document.getElementById('trans-vertex');
    const direction = document.getElementById('trans-direction');
    const transformList = document.getElementById('trans-list');
    
    if (!aValue || !hValue || !kValue || !currentEquation || !vertex || !direction || !transformList) {
        console.error('Transformation display elements not found');
        return;
    }
    
    // Initialize parameters
    let a = parseFloat(aSlider.value);
    let h = parseFloat(hSlider.value);
    let k = parseFloat(kSlider.value);
    
    // Update display
    updateTransDisplay();
    
    // Draw initial function
    drawTransFunction();
    
    // Add event listeners to sliders
    aSlider.addEventListener('input', function() {
        a = parseFloat(this.value);
        updateTransDisplay();
        drawTransFunction();
    });
    
    hSlider.addEventListener('input', function() {
        h = parseFloat(this.value);
        updateTransDisplay();
        drawTransFunction();
    });
    
    kSlider.addEventListener('input', function() {
        k = parseFloat(this.value);
        updateTransDisplay();
        drawTransFunction();
    });
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        if (graphContainer.clientWidth > 0 && graphContainer.clientHeight > 0) {
            canvas.width = graphContainer.clientWidth;
            canvas.height = graphContainer.clientHeight;
            drawTransFunction();
        }
    });
    
    // Update display values
    function updateTransDisplay() {
        // Update coefficient displays
        aValue.textContent = a.toFixed(1);
        hValue.textContent = h.toFixed(1);
        kValue.textContent = k.toFixed(1);
        
        // Update equation display
        currentEquation.textContent = formatVertexForm(a, h, k);
        
        // Update vertex
        vertex.textContent = `(${h.toFixed(1)}, ${k.toFixed(1)})`;
        
        // Update direction
        direction.textContent = a > 0 ? 'Upward' : 'Downward';
        
        // Update transformation list
        updateTransformationList(a, h, k);
    }
    
    // Update transformation list display
    function updateTransformationList(a, h, k) {
        let transformations = [];
        
        // Check for a coefficient effect
        if (Math.abs(a) !== 1) {
            if (Math.abs(a) > 1) {
                transformations.push(`Vertical stretch by factor of ${Math.abs(a).toFixed(1)}`);
            } else {
                transformations.push(`Vertical compression by factor of ${Math.abs(a).toFixed(1)}`);
            }
        }
        
        // Check for reflection
        if (a < 0) {
            transformations.push("Reflection across x-axis");
        }
        
        // Check for horizontal shift
        if (h !== 0) {
            const direction = h > 0 ? "right" : "left";
            transformations.push(`Horizontal shift ${Math.abs(h).toFixed(1)} units ${direction}`);
        }
        
        // Check for vertical shift
        if (k !== 0) {
            const direction = k > 0 ? "up" : "down";
            transformations.push(`Vertical shift ${Math.abs(k).toFixed(1)} units ${direction}`);
        }
        
        // Display transformations
        if (transformations.length === 0) {
            transformList.textContent = "None";
        } else {
            transformList.textContent = transformations.join(", ");
        }
    }
    
    // Draw function
    function drawTransFunction() {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw coordinate axes
        drawTransAxis(ctx, width, height, centerX, centerY);
        
        // Draw original parabola (faded)
        drawTransParabola(ctx, 1, 0, 0, width, height, centerX, centerY, true);
        
        // Draw transformed parabola
        drawTransParabola(ctx, a, h, k, width, height, centerX, centerY, false);
        
        // Draw special points
        drawTransSpecialPoints(ctx, a, h, k, width, height, centerX, centerY);
    }
    
    // Draw coordinate axes
    function drawTransAxis(ctx, width, height, centerX, centerY) {
        // Scale factors for coordinate system
        const scaleX = width / 20;
        const scaleY = height / 10;
        
        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 1;
        
        // X-axis
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        
        // Y-axis
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        
        ctx.stroke();
        
        // Draw grid lines
        ctx.beginPath();
        ctx.strokeStyle = '#eee';
        ctx.setLineDash([1, 2]);
        
        // Vertical grid lines
        for (let x = -10; x <= 10; x++) {
            if (x === 0) continue; // Skip axis
            const xPos = centerX + x * scaleX;
            ctx.moveTo(xPos, 0);
            ctx.lineTo(xPos, height);
        }
        
        // Horizontal grid lines
        for (let y = -5; y <= 5; y++) {
            if (y === 0) continue; // Skip axis
            const yPos = centerY - y * scaleY;
            ctx.moveTo(0, yPos);
            ctx.lineTo(width, yPos);
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw axis labels and ticks
        ctx.font = '12px Arial';
        ctx.fillStyle = '#555';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        
        // X-axis ticks and labels
        for (let x = -10; x <= 10; x += 2) {
            const xPos = centerX + x * scaleX;
            
            // Draw tick
            ctx.beginPath();
            ctx.moveTo(xPos, centerY - 3);
            ctx.lineTo(xPos, centerY + 3);
            ctx.stroke();
            
            // Draw label (skip origin)
            if (x !== 0) {
                ctx.fillText(x.toString(), xPos, centerY + 5);
            }
        }
        
        // Y-axis ticks and labels
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        
        for (let y = -5; y <= 5; y++) {
            const yPos = centerY - y * scaleY;
            
            // Draw tick
            ctx.beginPath();
            ctx.moveTo(centerX - 3, yPos);
            ctx.lineTo(centerX + 3, yPos);
            ctx.stroke();
            
            // Draw label (skip origin)
            if (y !== 0) {
                ctx.fillText(y.toString(), centerX - 5, yPos);
            }
        }
        
        // Draw origin
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText('O', centerX - 5, centerY + 5);
    }
    
    // Draw parabola
    function drawTransParabola(ctx, a, h, k, width, height, centerX, centerY, isOriginal) {
        const scaleX = width / 20;
        const scaleY = height / 10;
        
        // Set styles based on whether this is the original or transformed parabola
        if (isOriginal) {
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 1;
        } else {
            ctx.strokeStyle = '#1565C0';
            ctx.lineWidth = 2;
        }
        
        ctx.beginPath();
        
        // Calculate points for the parabola
        for (let x = -10; x <= 10; x += 0.1) {
            // Convert to canvas coordinates
            const xPos = centerX + x * scaleX;
            
            // Calculate y value using vertex form: f(x) = a(x-h)^2 + k
            const yValue = a * Math.pow(x - h, 2) + k;
            
            // Convert to canvas coordinates (flipping y)
            const yPos = centerY - yValue * scaleY;
            
            if (x === -10) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }
        
        ctx.stroke();
    }
    
    // Draw special points
    function drawTransSpecialPoints(ctx, a, h, k, width, height, centerX, centerY) {
        const scaleX = width / 20;
        const scaleY = height / 10;
        
        // Draw vertex
        const vertexX = centerX + h * scaleX;
        const vertexY = centerY - k * scaleY;
        
        ctx.beginPath();
        ctx.fillStyle = '#E91E63';
        ctx.arc(vertexX, vertexY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw y-intercept
        const yIntercept = a * Math.pow(0 - h, 2) + k;
        const yInterceptX = centerX;
        const yInterceptY = centerY - yIntercept * scaleY;
        
        ctx.beginPath();
        ctx.fillStyle = '#4CAF50';
        ctx.arc(yInterceptX, yInterceptY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw x-intercepts if they exist
        // Solving a(x-h)^2 + k = 0
        // (x-h)^2 = -k/a
        if (a !== 0 && k <= 0) {
            const radical = Math.sqrt(-k / a);
            const x1 = h + radical;
            const x2 = h - radical;
            
            const x1Pos = centerX + x1 * scaleX;
            const x2Pos = centerX + x2 * scaleX;
            const interceptY = centerY;
            
            ctx.beginPath();
            ctx.fillStyle = '#FF9800';
            ctx.arc(x1Pos, interceptY, 5, 0, Math.PI * 2);
            ctx.arc(x2Pos, interceptY, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Format vertex form of quadratic function
    function formatVertexForm(a, h, k) {
        let result = 'f(x) = ';
        
        // a coefficient
        if (a === 1) {
            // No need to display a
        } else if (a === -1) {
            result += '-';
        } else {
            result += a;
        }
        
        // (x-h)² term
        if (h === 0) {
            result += 'x²';
        } else if (h > 0) {
            result += '(x-' + h + ')²';
        } else {
            result += '(x+' + Math.abs(h) + ')²';
        }
        
        // k term
        if (k !== 0) {
            if (k > 0) {
                result += '+' + k;
            } else {
                result += k;
            }
        }
        
        return result;
    }
}

// Initialize transformations quiz functionality
function initTransformationsQuiz() {
    const checkButton = document.getElementById('check-trans-quiz');
    if (!checkButton) {
        console.log('Transformations quiz button not found');
        return;
    }
    
    checkButton.addEventListener('click', function() {
        const questions = document.querySelectorAll('#module-graph-transformations .quiz-question');
        let score = 0;
        
        questions.forEach(question => {
            const feedbackDiv = question.querySelector('.quiz-feedback');
            const correctAnswer = feedbackDiv.getAttribute('data-correct');
            const selectedOption = question.querySelector('input:checked');
            
            // Reset previous feedback
            feedbackDiv.textContent = '';
            feedbackDiv.className = 'quiz-feedback';
            
            if (!selectedOption) {
                feedbackDiv.textContent = 'Please select an answer.';
                feedbackDiv.classList.add('no-answer');
                return;
            }
            
            if (selectedOption.value === correctAnswer) {
                feedbackDiv.textContent = 'Correct!';
                feedbackDiv.classList.add('correct');
                score++;
            } else {
                feedbackDiv.textContent = 'Incorrect. Try again.';
                feedbackDiv.classList.add('incorrect');
            }
        });
        
        // Update total score
        const resultsDiv = document.getElementById('trans-quiz-results');
        if (resultsDiv) {
            resultsDiv.textContent = `Score: ${score}/${questions.length}`;
            
            if (score === questions.length) {
                resultsDiv.textContent += ' - Perfect!';
            }
        }
    });
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