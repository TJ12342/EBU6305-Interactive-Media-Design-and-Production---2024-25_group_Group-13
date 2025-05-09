// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('游戏页面已加载');
    
    let feedbackIconContainer, correctIcon, incorrectIcon;
    let feedbackTimeout = null; // 用于存储反馈图标的超时ID
    
    // 获取反馈图标元素
    feedbackIconContainer = document.getElementById('feedback-icon-container');
    correctIcon = document.getElementById('correct-icon');
    incorrectIcon = document.getElementById('incorrect-icon');
    
    // 显示反馈图标的辅助函数
    window.showGameFeedbackIcon = function(type, duration = 800) {
        if (!feedbackIconContainer || !correctIcon || !incorrectIcon) {
            console.warn('Feedback icons not found in DOM');
            return;
        }
    
        // 清除上一个超时（如果有）
        if (feedbackTimeout) {
            clearTimeout(feedbackTimeout);
        }
    
        feedbackIconContainer.style.display = 'block';
        if (type === 'correct') {
            correctIcon.style.display = 'inline';
            incorrectIcon.style.display = 'none';
        } else if (type === 'incorrect') {
            correctIcon.style.display = 'none';
            incorrectIcon.style.display = 'inline';
        }
    
        feedbackTimeout = setTimeout(() => {
            feedbackIconContainer.style.display = 'none';
            correctIcon.style.display = 'none';
            incorrectIcon.style.display = 'none';
            feedbackTimeout = null;
        }, duration);
    }
    
    // 延迟初始化，确保DOM完全渲染
    setTimeout(function() {
        console.log('开始初始化游戏组件 - 延迟执行');
        
        // 初始化音效系统
        initSoundSystem();
        
        // 初始化游戏选择
        initGameSelection();
        
        // 检查Canvas元素是否存在
        console.log('抛物线射手Canvas:', document.getElementById('parabola-shooter-canvas'));
        console.log('顶点猎人Canvas:', document.getElementById('vertex-hunter-canvas'));
        
        // 初始化游戏
        initParabolaShooterGame();
        initEquationMatchingGame();
        initVertexHunterGame();
        
        // 初始化游戏结束弹窗
        initGameOverModal();
        
        // 初始化排行榜
        initLeaderboard();
        
        // 监听语言变更
        const languageSelector = document.getElementById('language');
        if (languageSelector) {
            languageSelector.addEventListener('change', function() {
                // 使用i18n.js提供的方法更改语言
                if (window.i18n && typeof window.i18n.setLanguage === 'function') {
                    window.i18n.setLanguage(this.value);
                }
                
                // 可以根据需要更新游戏特定的UI元素
                updateGameUI();
            });
        }
        
        // 监听语言变更事件
        document.addEventListener('languageChanged', function(e) {
            // 更新游戏页面特定的UI元素
            updateGameUI();
        });
    }, 300); // 延迟300毫秒确保DOM完全渲染
});

// 音效系统
function initSoundSystem() {
    console.log('初始化音效系统');
    
    // 获取预加载的音频元素
    window.gameSounds = {
        correct: document.getElementById('sound-correct'),
        wrong: document.getElementById('sound-wrong'),
        countdown: document.getElementById('sound-countdown'),
        gameover: document.getElementById('sound-gameover')
    };
    
    // 设置适当音量
    if (window.gameSounds.correct) window.gameSounds.correct.volume = 0.7; // 正确音效音量设为70%
    if (window.gameSounds.wrong) window.gameSounds.wrong.volume = 0.6;     // 错误音效音量设为60%
    if (window.gameSounds.countdown) window.gameSounds.countdown.volume = 0.5; // 倒计时音效音量设为50%
    if (window.gameSounds.gameover) window.gameSounds.gameover.volume = 0.7; // 游戏结束音效音量设为70%
    
    // 音效播放函数
    window.playSound = function(soundName) {
        if (window.gameSounds && window.gameSounds[soundName]) {
            try {
                // 重置音频以确保可以再次播放
                window.gameSounds[soundName].pause();
                window.gameSounds[soundName].currentTime = 0;
                
                // 播放音效
                const playPromise = window.gameSounds[soundName].play();
                
                // 处理播放承诺，避免可能的DOMException错误
                if (playPromise !== undefined) {
                    playPromise.catch(err => {
                        console.error('音效播放失败:', err.message);
                    });
                }
            } catch (err) {
                console.error('音效播放错误:', err.message);
            }
        } else {
            console.warn(`音效 ${soundName} 不存在或未加载`);
        }
    };
    
    console.log('音效系统初始化完成');
}

// 游戏选择功能
function initGameSelection() {
    const playButtons = document.querySelectorAll('.play-btn');
    const gameArea = document.getElementById('game-area');
    const gameSelectionSection = document.querySelector('.game-selection');
    const gameContents = document.querySelectorAll('.game-content');
    const backButton = document.getElementById('back-to-selection');
    const currentGameTitle = document.getElementById('current-game-title');
    
    // 为每个游戏按钮添加点击事件
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game');
            
            // 显示游戏区域，隐藏选择区域
            gameArea.style.display = 'block';
            gameSelectionSection.style.display = 'none';
            
            // 隐藏所有游戏内容
            gameContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // 显示选中的游戏
            const selectedGame = document.getElementById(`${gameId}-game`);
            if (selectedGame) {
                selectedGame.style.display = 'flex';
                
                // 更新游戏标题
                currentGameTitle.textContent = document.querySelector(`#${gameId} h3`).textContent;
                
                // 重置游戏状态
                resetGame(gameId);
            }
        });
    });
    
    // 返回游戏选择按钮
    if (backButton) {
        backButton.addEventListener('click', function() {
            gameArea.style.display = 'none';
            gameSelectionSection.style.display = 'block';
            
            // 停止所有游戏计时器和音效
            stopAllGameTimers();
        });
    }
    
    // 重新开始按钮
    const restartButton = document.getElementById('restart-game');
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            // 获取当前游戏ID
            const currentGameId = getCurrentGameId();
            if (currentGameId) {
                resetGame(currentGameId);
            }
        });
    }
}

// 获取当前正在进行的游戏ID
function getCurrentGameId() {
    const gameContents = document.querySelectorAll('.game-content');
    let currentGameId = null;
    
    gameContents.forEach(content => {
        if (content.style.display === 'flex') {
            currentGameId = content.id.replace('-game', '');
        }
    });
    
    return currentGameId;
}

// 重置游戏状态
function resetGame(gameId) {
    // 重置分数
    document.getElementById('current-score').textContent = '0';
    
    // 重置计时器
    resetGameTimer();
    
    // 根据游戏类型进行特定的重置
    switch (gameId) {
        case 'parabola-shooter':
            resetParabolaShooterGame();
            break;
        case 'equation-matching':
            resetEquationMatchingGame();
            break;
        case 'vertex-hunter':
            resetVertexHunterGame();
            break;
    }
}

// 停止所有游戏计时器
function stopAllGameTimers() {
    if (window.gameTimer) {
        clearInterval(window.gameTimer);
        window.gameTimer = null;
    }
    
    // 停止所有正在播放的音效，特别是倒计时音效
    if (window.gameSounds && window.gameSounds.countdown) {
        window.gameSounds.countdown.pause();
        window.gameSounds.countdown.currentTime = 0;
    }
}

// 重置游戏计时器
function resetGameTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const defaultTime = 60; // 默认60秒
    
    // 停止现有计时器
    stopAllGameTimers();
    
    // 重置显示时间
    timerDisplay.textContent = defaultTime;
    
    // 启动新计时器
    let timeLeft = defaultTime;
    window.gameTimer = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 10) {
            // 最后10秒播放倒计时音效提醒
            if (timeLeft === 10) {
                window.playSound('countdown');
            }
        }
        
        if (timeLeft <= 0) {
            // 游戏时间结束
            clearInterval(window.gameTimer);
            gameOver();
        }
    }, 1000);
}

// 游戏结束处理
function gameOver() {
    // 停止所有游戏计时器和音效
    stopAllGameTimers();
    
    // 播放游戏结束音效
    window.playSound('gameover');
    
    const finalScore = document.getElementById('current-score').textContent;
    const gameOverModal = document.getElementById('game-over-modal');
    const finalScoreDisplay = document.getElementById('final-score');
    const achievementText = document.getElementById('achievement-text');
    
    // 更新分数显示
    finalScoreDisplay.textContent = finalScore;
    
    // 根据分数显示不同的成就文本
    const score = parseInt(finalScore);
    if (score >= 500) {
        achievementText.textContent = getTranslation('game.interface.achievements.mathGenius') || '数学天才!';
    } else if (score >= 300) {
        achievementText.textContent = getTranslation('game.interface.achievements.quadraticMaster') || '二次方程大师!';
    } else if (score >= 100) {
        achievementText.textContent = getTranslation('game.interface.achievements.parabolaExpert') || '抛物线高手!';
    } else {
        achievementText.textContent = getTranslation('game.interface.achievements.keepPracticing') || '继续加油!';
    }
    
    // 显示弹窗
    gameOverModal.style.display = 'flex';
    
    // 保存分数到排行榜（这里仅模拟）
    saveScore(score);
}

// 初始化游戏结束弹窗
function initGameOverModal() {
    const gameOverModal = document.getElementById('game-over-modal');
    const playAgainButton = document.getElementById('play-again');
    const chooseAnotherButton = document.getElementById('choose-another-game');
    
    // 再玩一次按钮
    if (playAgainButton) {
        playAgainButton.addEventListener('click', function() {
            // 隐藏弹窗
            gameOverModal.style.display = 'none';
            
            // 重置当前游戏
            const currentGameId = getCurrentGameId();
            if (currentGameId) {
                resetGame(currentGameId);
            }
        });
    }
    
    // 选择其他游戏按钮
    if (chooseAnotherButton) {
        chooseAnotherButton.addEventListener('click', function() {
            // 隐藏弹窗
            gameOverModal.style.display = 'none';
            
            // 返回游戏选择界面
            document.getElementById('game-area').style.display = 'none';
            document.querySelector('.game-selection').style.display = 'block';
            
            // 停止所有游戏计时器和音效
            stopAllGameTimers();
        });
    }
}

// 保存分数（模拟）
function saveScore(score) {
    const currentGameId = getCurrentGameId();
    if (!currentGameId) return;
    
    // 这里简单模拟保存分数的逻辑
    // 在实际应用中，应该将分数发送到服务器或保存到本地存储
    console.log(`保存分数: ${score} 分，游戏: ${currentGameId}`);
    
    // 更新排行榜显示
    updateLeaderboard(currentGameId);
}

// 初始化排行榜
function initLeaderboard() {
    const tabButtons = document.querySelectorAll('.leaderboard-tabs .tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加当前按钮的活动状态
            this.classList.add('active');
            
            // 更新排行榜
            const gameId = this.getAttribute('data-game');
            updateLeaderboard(gameId);
            
            // 如果用户在游戏过程中切换了排行榜，也应该停止音效
            if (window.gameTimer) {
                stopAllGameTimers();
                
                // 返回游戏选择界面
                document.getElementById('game-area').style.display = 'none';
                document.querySelector('.game-selection').style.display = 'block';
            }
        });
    });
    
    // 默认显示第一个游戏的排行榜
    updateLeaderboard('parabola-shooter');
}

// 更新排行榜（模拟数据）
function updateLeaderboard(gameId) {
    const leaderboardData = document.getElementById('leaderboard-data');
    
    // 清空现有数据
    leaderboardData.innerHTML = '';
    
    // 模拟数据
    const data = getLeaderboardData(gameId);
    
    // 填充表格
    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.player}</td>
            <td>${entry.score}</td>
            <td>${entry.date}</td>
        `;
        
        leaderboardData.appendChild(row);
    });
}

// 获取排行榜数据（模拟）
function getLeaderboardData(gameId) {
    // 模拟不同游戏的排行榜数据
    const data = {
        'parabola-shooter': [
            { player: '数学王子', score: 950, date: '2025-03-15' },
            { player: '抛物线高手', score: 920, date: '2025-03-10' },
            { player: '函数达人', score: 880, date: '2025-03-18' },
            { player: '几何大师', score: 850, date: '2025-03-05' },
            { player: '代数专家', score: 820, date: '2025-03-12' }
        ],
        'equation-matching': [
            { player: '匹配王者', score: 880, date: '2025-03-14' },
            { player: '方程高手', score: 860, date: '2025-03-11' },
            { player: '图像达人', score: 830, date: '2025-03-17' },
            { player: '图形专家', score: 800, date: '2025-03-09' },
            { player: '数学爱好者', score: 780, date: '2025-03-13' }
        ],
        'vertex-hunter': [
            { player: '顶点猎手', score: 920, date: '2025-03-16' },
            { player: '公式大师', score: 900, date: '2025-03-08' },
            { player: '计算天才', score: 870, date: '2025-03-19' },
            { player: '函数专家', score: 840, date: '2025-03-07' },
            { player: '坐标高手', score: 810, date: '2025-03-14' }
        ]
    };
    
    return data[gameId] || [];
}

// ===== 抛物线射手游戏 =====
function initParabolaShooterGame() {
    console.log('初始化抛物线射手游戏');
    
    const canvas = document.getElementById('parabola-shooter-canvas');
    if (!canvas) {
        console.error('无法找到抛物线射手游戏的canvas元素');
        return;
    }
    
    // 强制设置canvas尺寸
    const canvasContainer = canvas.parentElement;
    if (canvasContainer) {
        // 强制设置容器尺寸，确保它是可见的
        canvasContainer.style.width = '100%';
        canvasContainer.style.minHeight = '400px';
        canvasContainer.style.minWidth = '600px';
        canvasContainer.style.border = '1px solid #ddd';
        canvasContainer.style.display = 'flex';
        
        console.log('Canvas容器尺寸:', canvasContainer.clientWidth, 'x', canvasContainer.clientHeight);
    }
    
    // 使用固定尺寸初始化canvas
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.backgroundColor = 'white';
    
    console.log('设置Canvas尺寸为:', canvas.width, 'x', canvas.height);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('无法获取Canvas上下文');
        return;
    }
    
    // 获取控制滑块
    const aSlider = document.getElementById('a-slider');
    const bSlider = document.getElementById('b-slider');
    const cSlider = document.getElementById('c-slider');
    
    // 获取显示元素
    const aValue = document.getElementById('a-value');
    const bValue = document.getElementById('b-value');
    const cValue = document.getElementById('c-value');
    const currentEquation = document.getElementById('current-equation');
    
    // 检查必要的元素
    if (!aSlider || !bSlider || !cSlider || !aValue || !bValue || !cValue || !currentEquation) {
        console.error('抛物线射手游戏所需的UI元素不完整');
        return;
    }
    
    // 射击按钮
    const shootButton = document.getElementById('shoot-button');
    if (!shootButton) {
        console.error('无法找到射击按钮');
        return;
    }
    
    // 游戏状态变量
    let a = parseFloat(aSlider.value);
    let b = parseFloat(bSlider.value);
    let c = parseFloat(cSlider.value);
    let score = 0;
    let target = generateTarget();
    
    // 在确保DOM完全加载后的一段时间内强制更新
    setTimeout(() => {
        console.log('强制更新Canvas绘制...');
        try {
            // 确保sliders值被正确加载
            a = parseFloat(aSlider.value);
            b = parseFloat(bSlider.value);
            c = parseFloat(cSlider.value);
            console.log('当前参数:', a, b, c);
            
            // 更新显示
            updateParabolaDisplay();
            
            // 强制重绘
            drawParabolaShooterGame();
        } catch (e) {
            console.error('Canvas绘制更新出错:', e);
        }
    }, 500);
    
    // 监听滑块变化
    aSlider.addEventListener('input', function() {
        a = parseFloat(this.value);
        if (a === 0) a = 0.1;  // 防止a为0
        updateParabolaDisplay();
    });
    
    bSlider.addEventListener('input', function() {
        b = parseFloat(this.value);
        updateParabolaDisplay();
    });
    
    cSlider.addEventListener('input', function() {
        c = parseFloat(this.value);
        updateParabolaDisplay();
    });
    
    // 射击按钮
    shootButton.addEventListener('click', function() {
        checkHit();
    });
    
    // 窗口大小变化时固定Canvas尺寸
    window.addEventListener('resize', function() {
        // 保持固定尺寸，确保绘图质量
        canvas.width = 600;
        canvas.height = 400;
        drawParabolaShooterGame();
    });
    
    // 更新参数显示
    function updateParabolaDisplay() {
        aValue.textContent = a.toFixed(1);
        bValue.textContent = b.toFixed(1);
        cValue.textContent = c.toFixed(1);
        currentEquation.textContent = formatQuadraticFunction(a, b, c);
        
        // 重绘画布
        drawParabolaShooterGame();
    }
    
    // 绘制游戏
    function drawParabolaShooterGame() {
        // 检查Canvas上下文
        if (!ctx) {
            console.error('无法获取Canvas上下文，无法绘制');
            return;
        }
        
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        console.log('绘制抛物线射手游戏:', width, 'x', height);
        
        try {
            // 清除画布
            ctx.clearRect(0, 0, width, height);
            
            // 绘制白色背景
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            
            // 绘制坐标系统
            drawCoordinateSystem(ctx, width, height, centerX, centerY);
            
            // 绘制抛物线
            drawGameParabola(ctx, a, b, c, width, height, centerX, centerY);
            
            // 绘制目标
            drawTarget(ctx, target, width, height, centerX, centerY);
            
            console.log('Canvas绘制完成');
        } catch (e) {
            console.error('绘制过程出错:', e);
        }
    }
    
    // 绘制坐标系统
    function drawCoordinateSystem(ctx, width, height, centerX, centerY) {
        // 绘制更现代化的背景
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);
        
        // 绘制细网格线
        ctx.beginPath();
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;
        
        // 水平网格线
        for (let y = centerY % 20; y < height; y += 20) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        
        // 垂直网格线
        for (let x = centerX % 20; x < width; x += 20) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        
        ctx.stroke();
        
        // 绘制主坐标轴
        ctx.beginPath();
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        
        // X轴
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        
        // Y轴
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        
        ctx.stroke();
        
        // 绘制坐标轴箭头
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
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // X轴刻度
        for (let i = -5; i <= 5; i++) {
            if (i === 0) continue;
            
            const x = centerX + i * (width / 12);
            
            ctx.beginPath();
            ctx.strokeStyle = '#555';
            ctx.lineWidth = 1;
            ctx.moveTo(x, centerY - 5);
            ctx.lineTo(x, centerY + 5);
            ctx.stroke();
            
            ctx.fillText(i.toString(), x, centerY + 15);
        }
        
        // Y轴刻度
        for (let i = -3; i <= 3; i++) {
            if (i === 0) continue;
            
            const y = centerY - i * (height / 8);
            
            ctx.beginPath();
            ctx.strokeStyle = '#555';
            ctx.lineWidth = 1;
            ctx.moveTo(centerX - 5, y);
            ctx.lineTo(centerX + 5, y);
            ctx.stroke();
            
            ctx.fillText(i.toString(), centerX - 15, y);
        }
        
        // 原点标记
        ctx.fillText('O', centerX - 10, centerY + 15);
        
        // 坐标轴标签 - 使用斜体来表示数学变量
        ctx.font = 'italic 14px Arial';
        ctx.fillText('x', width - 10, centerY - 15);
        ctx.fillText('y', centerX + 15, 10);
    }
    
    // 绘制抛物线
    function drawGameParabola(ctx, a, b, c, width, height, centerX, centerY) {
        const scaleX = width / 12;  // 每单位x对应的像素数
        const scaleY = height / 8;  // 每单位y对应的像素数
        
        // 绘制抛物线
        ctx.beginPath();
        ctx.strokeStyle = '#00acc1';
        ctx.lineWidth = 3;
        
        // 使用更平滑的方式绘制抛物线
        for (let i = -width / 2; i <= width / 2; i += 1) {
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
        
        // 使用渐变颜色
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#2196f3');
        gradient.addColorStop(0.5, '#00acc1');
        gradient.addColorStop(1, '#26c6da');
        ctx.strokeStyle = gradient;
        
        ctx.stroke();
        
        // 绘制顶点
        const vertexX = -b / (2 * a);
        const vertexY = a * vertexX * vertexX + b * vertexX + c;
        
        // 将顶点坐标转换为像素坐标
        const vertexPixelX = centerX + vertexX * scaleX;
        const vertexPixelY = centerY - vertexY * scaleY;
        
        // 绘制顶点点
        ctx.beginPath();
        ctx.fillStyle = '#e91e63';
        ctx.arc(vertexPixelX, vertexPixelY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // 添加顶点的小标签
        ctx.font = '12px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.fillText('Vertex', vertexPixelX + 8, vertexPixelY);
        
        // 计算并绘制零点（如果存在）
        const delta = b * b - 4 * a * c;
        
        if (delta >= 0) {
            // 至少有一个零点
            const x1 = (-b + Math.sqrt(delta)) / (2 * a);
            const x2 = (-b - Math.sqrt(delta)) / (2 * a);
            
            // 绘制第一个零点
            const canvasX1 = centerX + x1 * scaleX;
            const canvasY1 = centerY; // 零点在x轴上，y = 0
            
            ctx.beginPath();
            ctx.fillStyle = '#4caf50';
            ctx.arc(canvasX1, canvasY1, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // 如果有两个不同的零点，绘制第二个
            if (delta > 0) {
                const canvasX2 = centerX + x2 * scaleX;
                const canvasY2 = centerY;
                
                ctx.beginPath();
                ctx.fillStyle = '#4caf50';
                ctx.arc(canvasX2, canvasY2, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // 绘制目标
    function drawTarget(ctx, target, width, height, centerX, centerY) {
        const scaleX = width / 12;
        const scaleY = height / 8;
        
        const canvasX = centerX + target.x * scaleX;
        const canvasY = centerY - target.y * scaleY;
        
        console.log('绘制目标点:', target.x, target.y, '在位置:', canvasX, canvasY);
        
        // 绘制外圈
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 87, 34, 0.3)';
        ctx.arc(canvasX, canvasY, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制内圈
        ctx.beginPath();
        ctx.fillStyle = '#ff5722';
        ctx.arc(canvasX, canvasY, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制目标坐标
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`(${target.x}, ${target.y})`, canvasX, canvasY - 25);
    }
    
    // 生成新目标
    function generateTarget() {
        const x = Math.floor(Math.random() * 9) - 4; // -4 到 4
        const y = Math.floor(Math.random() * 5) - 2; // -2 到 2
        return { x, y };
    }
    
    // 检查命中
    function checkHit() {
        // 计算目标点的y值应该是多少
        const expectedY = a * target.x * target.x + b * target.x + c;
        
        // 检查是否足够接近
        const distance = Math.abs(expectedY - target.y);
        const hitThreshold = 0.5; // 允许的误差范围
        
        if (distance <= hitThreshold) {
            // 命中目标
            handleHit();
        } else {
            // 未命中
            handleMiss(expectedY);
        }
    }
    
    // 处理命中
    function handleHit() {
        // 增加分数
        score += 10;
        document.getElementById('current-score').textContent = score;
        
        // 播放正确音效
        window.playSound('correct');
        window.showGameFeedbackIcon('correct'); // <--- 添加对勾反馈
        
        // 动画效果（简单闪烁）
        animateHit();
        
        // 生成新目标
        setTimeout(() => {
            target = generateTarget();
            drawParabolaShooterGame();
        }, 500);
    }
    
    // 处理未命中
    function handleMiss(calculatedY) {
        // 播放错误音效
        window.playSound('wrong');
        window.showGameFeedbackIcon('incorrect'); // <--- 添加叉反馈
        
        // 显示实际函数经过的点
        animateMiss(calculatedY);
        
        // 短暂延迟后重绘
        setTimeout(() => {
            drawParabolaShooterGame();
        }, 500);
    }
    
    // 处理命中的动画效果
    function animateHit() {
        const canvas = document.getElementById('parabola-shooter-canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const scaleX = width / 12;
        const scaleY = height / 8;
        
        const targetX = centerX + target.x * scaleX;
        const targetY = centerY - target.y * scaleY;
        
        // 保存当前绘图状态
        ctx.save();
        
        // 创建动画帧序列
        const frameCount = 20;
        let frame = 0;
        
        // 动画定时器
        const animation = setInterval(() => {
            // 重绘游戏场景
            drawParabolaShooterGame();
            
            // 计算当前帧的动画参数
            const progress = frame / frameCount;
            const radius = 30 * (1 - progress);
            const alpha = 1 - progress;
            
            // 绘制爆炸效果-外圈
            ctx.beginPath();
            ctx.arc(targetX, targetY, radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 200, 83, ${alpha * 0.3})`;
            ctx.fill();
            
            // 绘制爆炸效果-中圈
            ctx.beginPath();
            ctx.arc(targetX, targetY, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 200, 83, ${alpha * 0.6})`;
            ctx.fill();
            
            // 绘制爆炸效果-内圈
            ctx.beginPath();
            ctx.arc(targetX, targetY, radius * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 200, 83, ${alpha})`;
            ctx.fill();
            
            // 绘制+10分数动画
            ctx.font = `bold ${16 + progress * 8}px Arial`;
            ctx.fillStyle = `rgba(0, 128, 0, ${1 - progress})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('+10', targetX, targetY - 30 - progress * 20);
            
            // 更新帧计数
            frame++;
            
            // 动画结束后清除定时器
            if (frame >= frameCount) {
                clearInterval(animation);
                ctx.restore();
            }
        }, 25);
    }
    
    // 处理未命中的动画效果
    function animateMiss(calculatedY) {
        const canvas = document.getElementById('parabola-shooter-canvas');
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const scaleX = width / 12;
        const scaleY = height / 8;
        
        // 计算抛物线上对应x值的实际点
        const targetX = centerX + target.x * scaleX;
        const calculatedCanvasY = centerY - calculatedY * scaleY;
        const actualCanvasY = centerY - target.y * scaleY;
        
        // 保存当前绘图状态
        ctx.save();
        
        // 创建动画帧序列
        const frameCount = 15;
        let frame = 0;
        
        // 显示失误距离
        const distance = Math.abs(calculatedY - target.y).toFixed(1);
        
        // 动画定时器
        const animation = setInterval(() => {
            // 重绘游戏场景
            drawParabolaShooterGame();
            
            // 计算当前帧的动画参数
            const progress = frame / frameCount;
            const alpha = 1 - progress;
            
            // 绘制抛物线实际点与目标点之间的连线
            ctx.beginPath();
            ctx.moveTo(targetX, calculatedCanvasY);
            ctx.lineTo(targetX, actualCanvasY);
            ctx.strokeStyle = `rgba(244, 67, 54, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // 绘制距离文本
            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = `rgba(244, 67, 54, ${alpha})`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(`差距: ${distance}`, targetX + 15, (calculatedCanvasY + actualCanvasY) / 2);
            
            // 在实际点绘制目标点 - 以红色突出显示
            ctx.beginPath();
            ctx.arc(targetX, actualCanvasY, 10, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 67, 54, ${alpha * 0.7})`;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = `rgba(183, 28, 28, ${alpha})`;
            ctx.stroke();
            
            // 在计算点绘制计算点 - 以黄色突出显示
            ctx.beginPath();
            ctx.arc(targetX, calculatedCanvasY, 8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 193, 7, ${alpha * 0.7})`;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = `rgba(255, 111, 0, ${alpha})`;
            ctx.stroke();
            
            // 更新帧计数
            frame++;
            
            // 动画结束后清除定时器
            if (frame >= frameCount) {
                clearInterval(animation);
                ctx.restore();
            }
        }, 30);
    }
    
    // 重置游戏
    window.resetParabolaShooterGame = function() {
        score = 0;
        a = 1;
        b = 0;
        c = 0;
        
        // 重置滑块
        aSlider.value = a;
        bSlider.value = b;
        cSlider.value = c;
        
        // 更新显示
        updateParabolaDisplay();
        
        // 生成新目标
        target = generateTarget();
        drawParabolaShooterGame();
    };
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

// ===== 方程配对游戏 =====
function initEquationMatchingGame() {
    console.log('初始化方程配对游戏');
    
    // 获取游戏元素
    const equationList = document.getElementById('equation-list');
    const graphGrid = document.getElementById('graph-grid');
    
    if (!equationList || !graphGrid) {
        console.error('无法找到方程配对游戏所需的HTML元素');
        return;
    }
    
    // 游戏变量
    let score = 0;
    let selectedEquation = null;
    let selectedGraph = null;
    let matchedPairs = 0;
    let equations = [];
    let currentLevel = 1;
    
    // 初始化游戏
    startNewLevel();
    
    // 开始新关卡
    function startNewLevel() {
        console.log('开始方程配对游戏第', currentLevel, '关');
        
        // 清空现有内容
        equationList.innerHTML = '';
        graphGrid.innerHTML = '';
        
        // 重置状态
        selectedEquation = null;
        selectedGraph = null;
        matchedPairs = 0;
        
        // 生成新的方程和图形
        generateEquations();
        renderEquations();
        renderGraphs();
    }
    
    // 生成方程组
    function generateEquations() {
        equations = [];
        
        // 根据难度决定方程数量
        let numEquations;
        
        if (currentLevel === 1) {
            numEquations = 4; // 第一关4个
        } else if (currentLevel === 2) {
            numEquations = 4; // 第二关4个
        } else if (currentLevel === 3) {
            numEquations = 4; // 第三关4个
        } else if (currentLevel === 4) {
            numEquations = 5; // 第四关5个
        } else {
            numEquations = 6; // 第五关6个
        }
        
        for (let i = 0; i < numEquations; i++) {
            // 生成随机系数
            let a = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 0.5);
            let b = Math.random() * 8 - 4;
            let c = Math.random() * 6 - 3;
            
            // 四舍五入系数使其更易读
            a = Math.round(a * 10) / 10;
            b = Math.round(b * 10) / 10;
            c = Math.round(c * 10) / 10;
            
            // 确保方程不同
            if (equations.some(eq => eq.a === a && eq.b === b && eq.c === c)) {
                i--; // 重新生成
                continue;
            }
            
            // 创建方程
            const equation = {
                id: i + 1,
                a: a,
                b: b,
                c: c,
                text: formatQuadraticFunction(a, b, c),
                matched: false
            };
            
            equations.push(equation);
        }
    }
    
    // 渲染方程列表
    function renderEquations() {
        equationList.innerHTML = '';
        
        // 随机排序方程
        const shuffledEquations = [...equations].sort(() => Math.random() - 0.5);
        
        // 移除之前的特殊类
        equationList.classList.remove('items-5', 'items-6');
        
        // 添加特殊的CSS类，根据元素数量
        if (shuffledEquations.length === 5) {
            equationList.classList.add('items-5');
        } else if (shuffledEquations.length === 6) {
            equationList.classList.add('items-6');
        }
        
        // 创建方程项
        shuffledEquations.forEach(equation => {
            const item = document.createElement('div');
            item.className = 'equation-item';
            item.dataset.id = equation.id;
            item.textContent = equation.text;
            
            if (equation.matched) {
                item.classList.add('matched');
                item.style.opacity = '0.8';
                item.style.pointerEvents = 'none';
            } else {
                // 添加点击事件
                item.addEventListener('click', function() {
                    selectEquation(this, equation);
                });
            }
            
            equationList.appendChild(item);
        });
    }
    
    // 渲染图形网格
    function renderGraphs() {
        graphGrid.innerHTML = '';
        
        // 随机排序方程以创建图形
        const shuffledEquations = [...equations].sort(() => Math.random() - 0.5);
        
        // 移除之前的特殊类
        graphGrid.classList.remove('items-5', 'items-6');
        
        // 添加特殊的CSS类，根据元素数量
        if (shuffledEquations.length === 5) {
            graphGrid.classList.add('items-5');
        } else if (shuffledEquations.length === 6) {
            graphGrid.classList.add('items-6');
        }
        
        // 为每个方程创建图形
        shuffledEquations.forEach(equation => {
            // 创建图形项
            const graphItem = document.createElement('div');
            graphItem.className = 'graph-item';
            graphItem.dataset.id = equation.id;
            
            if (equation.matched) {
                graphItem.classList.add('matched');
                graphItem.style.opacity = '0.8';
                graphItem.style.pointerEvents = 'none';
            } else {
                // 添加点击事件
                graphItem.addEventListener('click', function() {
                    selectGraph(this, equation);
                });
            }
            
            // 创建canvas元素绘制图形
            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            graphItem.appendChild(canvas);
            
            // 绘制图形
            drawParabola(canvas, equation.a, equation.b, equation.c);
            
            // 添加到网格
            graphGrid.appendChild(graphItem);
        });
    }
    
    // 绘制抛物线
    function drawParabola(canvas, a, b, c) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        // 清除画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制背景
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        
        // 绘制坐标轴
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
        
        // 绘制抛物线
        const scaleX = width / 10;  // 每单位x对应的像素数
        const scaleY = height / 10;  // 每单位y对应的像素数
        
        ctx.beginPath();
        ctx.strokeStyle = '#00acc1';
        ctx.lineWidth = 2;
        
        let isFirstPoint = true;
        
        // 在x轴范围内绘制抛物线
        for (let pixelX = 0; pixelX <= width; pixelX += 2) {
            // 将像素坐标转换为数学坐标
            const x = (pixelX - centerX) / scaleX;
            const y = a * x * x + b * x + c;
            
            // 将数学坐标转换回像素坐标
            const canvasY = centerY - y * scaleY;
            
            // 如果y值超出画布范围，跳过
            if (canvasY < 0 || canvasY > height) continue;
            
            if (isFirstPoint) {
                ctx.moveTo(pixelX, canvasY);
                isFirstPoint = false;
            } else {
                ctx.lineTo(pixelX, canvasY);
            }
        }
        
        ctx.stroke();
    }
    
    // 选择方程
    function selectEquation(element, equation) {
        // 如果已匹配，不做任何操作
        if (equation.matched) return;
        
        // 移除之前选择的方程
        const previouslySelected = document.querySelector('.equation-item.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        
        // 选择当前方程
        element.classList.add('selected');
        selectedEquation = equation;
        
        // 检查是否可以匹配
        checkForMatch();
    }
    
    // 选择图形
    function selectGraph(element, equation) {
        // 如果已匹配，不做任何操作
        if (equation.matched) return;
        
        // 移除之前选择的图形
        const previouslySelected = document.querySelector('.graph-item.selected');
        if (previouslySelected) {
            previouslySelected.classList.remove('selected');
        }
        
        // 选择当前图形
        element.classList.add('selected');
        selectedGraph = equation;
        
        // 检查是否可以匹配
        checkForMatch();
    }
    
    // 检查是否匹配
    function checkForMatch() {
        // 如果没有选择方程或图形，返回
        if (!selectedEquation || !selectedGraph) return;
        
        // 检查是否匹配
        if (selectedEquation.id === selectedGraph.id) {
            // 匹配成功
            handleCorrectMatch();
        } else {
            // 匹配失败
            handleIncorrectMatch();
        }
    }
    
    // 处理正确匹配
    function handleCorrectMatch() {
        console.log('正确匹配！');
        
        // 播放正确音效
        window.playSound('correct');
        window.showGameFeedbackIcon('correct'); // <--- 添加对勾反馈
        
        // 更新方程和图形的状态
        const equationIndex = equations.findIndex(eq => eq.id === selectedEquation.id);
        equations[equationIndex].matched = true;
        
        // 获取选中的元素
        const selectedEquationElement = document.querySelector(`.equation-item.selected`);
        const selectedGraphElement = document.querySelector(`.graph-item.selected`);
        
        // 添加匹配动画
        selectedEquationElement.classList.add('correct-animation');
        selectedGraphElement.classList.add('correct-animation');
        
        setTimeout(() => {
            // 移除动画类
            selectedEquationElement.classList.remove('correct-animation');
            selectedGraphElement.classList.remove('correct-animation');
            
            // 添加匹配样式并禁用点击
            selectedEquationElement.classList.remove('selected');
            selectedEquationElement.classList.add('matched');
            selectedEquationElement.style.opacity = '0.8';
            selectedEquationElement.style.pointerEvents = 'none';
            
            selectedGraphElement.classList.remove('selected');
            selectedGraphElement.classList.add('matched');
            selectedGraphElement.style.opacity = '0.8';
            selectedGraphElement.style.pointerEvents = 'none';
        }, 600);
        
        // 增加分数
        score += 10;
        document.getElementById('current-score').textContent = score;
        
        // 增加匹配对数
        matchedPairs++;
        
        // 重置选中状态
        selectedEquation = null;
        selectedGraph = null;
        
        // 检查是否完成所有匹配
        if (matchedPairs === equations.length) {
            // 关卡完成
            setTimeout(handleLevelComplete, 1000);
        }
    }
    
    // 处理错误匹配
    function handleIncorrectMatch() {
        console.log('匹配错误！');
        
        // 播放错误音效
        window.playSound('wrong');
        window.showGameFeedbackIcon('incorrect'); // <--- 添加叉反馈
        
        // 获取选中的元素
        const selectedEquationElement = document.querySelector(`.equation-item.selected`);
        const selectedGraphElement = document.querySelector(`.graph-item.selected`);
        
        // 添加错误动画类
        selectedEquationElement.classList.add('incorrect-animation');
        selectedGraphElement.classList.add('incorrect-animation');
        
        // 短暂闪烁错误颜色
        selectedEquationElement.style.borderColor = '#f44336';
        selectedEquationElement.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        selectedGraphElement.style.borderColor = '#f44336';
        selectedGraphElement.style.backgroundColor = 'rgba(244, 67, 54, 0.1)';
        
        // 1秒后恢复
        setTimeout(() => {
            // 移除错误样式
            selectedEquationElement.classList.remove('selected', 'incorrect-animation');
            selectedGraphElement.classList.remove('selected', 'incorrect-animation');
            
            selectedEquationElement.style.borderColor = '';
            selectedEquationElement.style.backgroundColor = '';
            selectedGraphElement.style.borderColor = '';
            selectedGraphElement.style.backgroundColor = '';
            
            // 重置选中状态
            selectedEquation = null;
            selectedGraph = null;
        }, 800);
    }
    
    // 处理关卡完成
    function handleLevelComplete() {
        console.log('关卡完成！');
        
        // 增加关卡
        currentLevel++;
        
        // 如果是最后一关，显示游戏结束
        if (currentLevel > 5) {
            // 显示游戏结束
            gameOver();
        } else {
            // 开始新关卡
            startNewLevel();
        }
    }
    
    // 重置游戏
    window.resetEquationMatchingGame = function() {
        score = 0;
        currentLevel = 1;
        document.getElementById('current-score').textContent = '0';
        startNewLevel();
    };
    
    // 添加动画到全局变量，使其可以被访问
    window.equationMatchingAnimations = {
        correctMatch: 'correct-animation',
        incorrectMatch: 'incorrect-animation'
    };
}

// ===== 顶点猎人游戏 =====
function initVertexHunterGame() {
    console.log('初始化顶点猎人游戏');
    
    const canvas = document.getElementById('vertex-hunter-canvas');
    if (!canvas) {
        console.error('无法找到顶点猎人游戏的canvas元素');
        return;
    }
    
    // 强制设置canvas尺寸
    const canvasContainer = canvas.parentElement;
    if (canvasContainer) {
        // 强制设置容器尺寸，确保它是可见的
        canvasContainer.style.width = '100%';
        canvasContainer.style.minHeight = '400px';
        canvasContainer.style.minWidth = '500px';
        canvasContainer.style.border = '1px solid #ddd';
        canvasContainer.style.display = 'flex';
        
        console.log('顶点猎人容器尺寸:', canvasContainer.clientWidth, 'x', canvasContainer.clientHeight);
    }
    
    // 使用固定尺寸初始化canvas
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.backgroundColor = 'white';
    
    console.log('设置顶点猎人Canvas尺寸为:', canvas.width, 'x', canvas.height);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('无法获取Canvas上下文');
        return;
    }
    
    console.log('顶点猎人游戏初始化，Canvas尺寸:', canvas.width, 'x', canvas.height);
    
    // 游戏UI元素
    const equationDisplay = document.getElementById('vertex-hunter-equation');
    const vertexXInput = document.getElementById('vertex-x');
    const vertexYInput = document.getElementById('vertex-y');
    const submitButton = document.getElementById('submit-vertex');
    const feedbackDisplay = document.getElementById('vertex-feedback');
    
    // 检查所需UI元素
    if (!equationDisplay || !vertexXInput || !vertexYInput || !submitButton || !feedbackDisplay) {
        console.error('顶点猎人游戏所需的UI元素不完整');
        return;
    }
    
    // 游戏变量 - 明确初始化 a, b, c 值
    // 这些变量需要声明在函数作用域中，以便其他嵌套函数可以访问
    let a = 1;  // 默认值
    let b = 0;  // 默认值
    let c = 0;  // 默认值
    let correctVertexX, correctVertexY;
    let score = 0;
    
    // 生成新的二次函数
    generateNewFunction();
    
    // 在确保DOM完全加载后的一段时间内强制更新
    setTimeout(() => {
        console.log('强制更新顶点猎人Canvas绘制...');
        try {
            // 重新生成函数，确保有值
            generateNewFunction();
            // 绘制初始函数
            drawVertexHunterFunction();
        } catch (e) {
            console.error('Canvas绘制更新出错:', e);
        }
    }, 500);
    
    // 绘制初始函数
    drawVertexHunterFunction();
    
    // 提交答案按钮
    submitButton.addEventListener('click', function() {
        checkVertexAnswer();
    });
    
    // 窗口大小变化时保持固定Canvas尺寸
    window.addEventListener('resize', function() {
        // 保持固定尺寸，确保绘图质量
        canvas.width = 600;
        canvas.height = 400;
        drawVertexHunterFunction();
    });
    
    // 生成新的二次函数
    function generateNewFunction() {
        console.log('生成新二次函数...');
        
        // 直接定义顶点坐标 (h, k)
        // 随机选择x坐标（顶点的水平位置）
        let h = Math.floor(Math.random() * 9) - 4; // 整数，范围在-4到4之间
        if (Math.random() > 0.5 && h !== 0) { // 增加非零检查，确保即使加0.5也不会让非零值变为0
            h += 0.5; // 添加0.5使其有一位小数
        }
        
        // 随机选择y坐标（顶点的垂直位置）
        let k = Math.floor(Math.random() * 7) - 3; // 整数，范围在-3到3之间
        if (Math.random() > 0.5) {
            k += 0.5; // 添加0.5使其有一位小数
        }
        
        // 生成随机a系数 - 控制抛物线的开口方向和宽窄
        a = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 0.5);
        a = Math.round(a * 10) / 10; // 限制a的精度
        if (a === 0) a = 0.5; // 防止a为0
        
        // 从顶点形式 f(x) = a(x-h)² + k 转换为标准形式 f(x) = ax² + bx + c
        b = -2 * a * h;
        c = a * h * h + k;
        
        // 保存正确的顶点坐标
        correctVertexX = h;
        correctVertexY = k;
        
        // 验证计算是否正确
        const testVertexX = -b / (2 * a);
        const testVertexY = a * testVertexX * testVertexX + b * testVertexX + c;
        
        // 打印调试信息
        console.log('生成新函数:');
        console.log('- 顶点坐标 (h,k):', h, k);
        console.log('- 系数 (a,b,c):', a, b, c);
        console.log('- 验证顶点X:', testVertexX);
        console.log('- 验证顶点Y:', testVertexY);
        
        // 如果计算有误，输出警告
        if (Math.abs(testVertexX - h) > 0.001 || Math.abs(testVertexY - k) > 0.001) {
            console.warn('警告：计算的顶点与预期不符！');
        }
        
        // 更新方程显示
        equationDisplay.textContent = formatQuadraticFunction(a, b, c);
        
        // 清空输入框
        vertexXInput.value = '';
        vertexYInput.value = '';
        
        // 清空反馈
        feedbackDisplay.textContent = '';
        feedbackDisplay.className = 'feedback-message';
        
        console.log('准备绘制顶点猎人函数...');
        
        // 强制立即重绘 - 重要：确保在值改变后立即更新图像
        setTimeout(function() {
            // 重新绘制函数图形
            drawVertexHunterFunction();
        }, 0);
    }
    
    // 绘制函数
    function drawVertexHunterFunction() {
        // 检查Canvas上下文
        if (!ctx) {
            console.error('无法获取Canvas上下文，无法绘制');
            return;
        }
        
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        
        console.log('绘制顶点猎人函数:', width, 'x', height);
        
        try {
            // 清除画布
            ctx.clearRect(0, 0, width, height);
            
            // 绘制白色背景
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            
            // 绘制网格背景
            ctx.fillStyle = '#f9f9f9';
            ctx.fillRect(0, 0, width, height);
            
            // 绘制细网格线
            ctx.beginPath();
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 0.5;
            
            // 水平网格线
            for (let y = 0; y < height; y += 20) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            
            // 垂直网格线
            for (let x = 0; x < width; x += 20) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            
            ctx.stroke();
            
            // 绘制主坐标轴
            ctx.beginPath();
            ctx.strokeStyle = '#555';
            ctx.lineWidth = 2;
            
            // X轴
            ctx.moveTo(0, centerY);
            ctx.lineTo(width, centerY);
            
            // Y轴
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, height);
            
            ctx.stroke();
            
            // 绘制刻度
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // X轴刻度
            for (let i = -5; i <= 5; i++) {
                if (i === 0) continue;
                
                const x = centerX + i * (width / 12);
                
                ctx.beginPath();
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 1;
                ctx.moveTo(x, centerY - 5);
                ctx.lineTo(x, centerY + 5);
                ctx.stroke();
                
                ctx.fillText(i.toString(), x, centerY + 15);
            }
            
            // Y轴刻度
            for (let i = -3; i <= 3; i++) {
                if (i === 0) continue;
                
                const y = centerY - i * (height / 8);
                
                ctx.beginPath();
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 1;
                ctx.moveTo(centerX - 5, y);
                ctx.lineTo(centerX + 5, y);
                ctx.stroke();
                
                ctx.fillText(i.toString(), centerX - 15, y);
            }
            
            // 绘制抛物线
            drawVertexParabola();
            
            console.log('顶点猎人Canvas绘制完成');
        } catch (e) {
            console.error('绘制顶点猎人图形出错:', e);
        }
    }
    
    // 绘制抛物线
    function drawVertexParabola() {
        console.log('开始绘制抛物线, 参数:', a, b, c);
        
        if (a === undefined || b === undefined || c === undefined) {
            console.error('抛物线参数未定义!');
            return;
        }
        
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const scaleX = width / 12;
        const scaleY = height / 8;
        
        // 保存当前绘图状态
        ctx.save();
        
        // 清除当前路径
        ctx.beginPath();
        ctx.strokeStyle = '#673ab7';
        ctx.lineWidth = 3;
        
        // 使用渐变颜色
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#8e24aa');
        gradient.addColorStop(0.5, '#673ab7');
        gradient.addColorStop(1, '#5e35b1');
        ctx.strokeStyle = gradient;
        
        let isFirstPoint = true;
        let validPointsCount = 0;
        
        // 在x轴范围内绘制抛物线
        for (let pixelX = 0; pixelX <= width; pixelX += 2) {
            // 将像素坐标转换为数学坐标
            const x = (pixelX - centerX) / scaleX;
            const y = a * x * x + b * x + c;
            
            // 将数学坐标转换回像素坐标
            const canvasY = centerY - y * scaleY;
            
            // 跳过超出画布范围的点
            if (canvasY < -100 || canvasY > height + 100) continue;
            
            if (isFirstPoint) {
                ctx.moveTo(pixelX, canvasY);
                isFirstPoint = false;
            } else {
                ctx.lineTo(pixelX, canvasY);
            }
            validPointsCount++;
        }
        
        ctx.stroke();
        
        // 恢复绘图状态
        ctx.restore();
        
        console.log('抛物线绘制完成, 有效点数:', validPointsCount);
        
        // 绘制顶点标记
        const vertexPixelX = centerX + correctVertexX * scaleX;
        const vertexPixelY = centerY - correctVertexY * scaleY;
        
        // 只有当顶点在可视范围内时才绘制
        if (vertexPixelX >= 0 && vertexPixelX <= width && 
            vertexPixelY >= 0 && vertexPixelY <= height) {
            // 绘制顶点提示点 (但不显示，仅用于调试)
            ctx.beginPath();
            ctx.fillStyle = 'rgba(244, 67, 54, 0.1)'; // 红色，几乎透明
            ctx.arc(vertexPixelX, vertexPixelY, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 检查顶点答案
    function checkVertexAnswer() {
        const userX = parseFloat(vertexXInput.value);
        const userY = parseFloat(vertexYInput.value);
        
        if (isNaN(userX) || isNaN(userY)) {
            feedbackDisplay.textContent = getTranslation('game.interface.feedback.incorrect') || '不正确，请再试一次';
            feedbackDisplay.className = 'feedback-message incorrect';
            window.playSound('wrong');
            window.showGameFeedbackIcon('incorrect'); // <--- 添加叉反馈
            return false;
        }
        
        // 计算误差
        const xError = Math.abs(userX - correctVertexX);
        const yError = Math.abs(userY - correctVertexY);
        
        // 允许的误差范围
        const allowedError = 0.2;
        
        if (xError <= allowedError && yError <= allowedError) {
            // 答案正确
            feedbackDisplay.textContent = getTranslation('game.interface.feedback.correct') || '正确!';
            feedbackDisplay.className = 'feedback-message correct';
            
            // 播放正确音效
            window.playSound('correct');
            window.showGameFeedbackIcon('correct'); // <--- 添加对勾反馈
            
            // 增加分数
            score += 10;
            document.getElementById('current-score').textContent = score;
            
            // 生成新函数
            setTimeout(function() {
                generateNewFunction();
                feedbackDisplay.textContent = '';
                feedbackDisplay.className = 'feedback-message';
                document.getElementById('vertex-x').value = '';
                document.getElementById('vertex-y').value = '';
            }, 1000);
            
            return true;
        } else if (xError <= 0.3 && yError <= 0.3) {
            // 接近正确
            feedbackDisplay.textContent = getTranslation('game.interface.feedback.almostCorrect') || '接近正确，再试一次';
            feedbackDisplay.className = 'feedback-message almost';
            window.playSound('wrong');
            window.showGameFeedbackIcon('incorrect'); // <--- 添加叉反馈 (也视为错误的一种)
            return false;
        } else {
            // 不正确
            feedbackDisplay.textContent = getTranslation('game.interface.feedback.incorrect') || '不正确，请再试一次';
            feedbackDisplay.className = 'feedback-message incorrect';
            window.playSound('wrong');
            window.showGameFeedbackIcon('incorrect'); // <--- 添加叉反馈
            return false;
        }
    }
    
    // 重置顶点猎人游戏
    window.resetVertexHunterGame = function() {
        score = 0;
        generateNewFunction();
        drawVertexHunterFunction();
    };
}

// 辅助函数：获取翻译文本
function getTranslation(key) {
    // 检查是否有window.i18n公共函数可用
    if (window.i18n && typeof window.i18n.getTranslation === 'function') {
        return window.i18n.getTranslation(key);
    }
    
    const language = document.getElementById('language').value || 'en';
    
    if (window.i18n && window.i18n[language] && key.split('.').reduce((obj, prop) => obj && obj[prop], window.i18n[language])) {
        return key.split('.').reduce((obj, prop) => obj[prop], window.i18n[language]);
    }
    
    // 如果没有找到翻译，返回键的最后一部分作为默认值
    return key.split('.').pop();
}

// 更新游戏UI元素 - 响应语言变更
function updateGameUI() {
    // 更新游戏卡片标题和描述
    const games = [
        { id: 'parabola-shooter', key: 'parabolaShooter' }, 
        { id: 'equation-matching', key: 'equationMatching' }, 
        { id: 'vertex-hunter', key: 'vertexHunter' }
    ];
    
    games.forEach(game => {
        const card = document.getElementById(game.id);
        if (card) {
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            const btn = card.querySelector('.play-btn');
            const diff = card.querySelector('.difficulty');
            
            if (title) title.textContent = getTranslation(`game.${game.key}.title`) || title.textContent;
            if (desc) desc.textContent = getTranslation(`game.${game.key}.description`) || desc.textContent;
            if (btn) btn.textContent = getTranslation(`game.${game.key}.button`) || btn.textContent;
            if (diff) diff.textContent = getTranslation(`game.${game.key}.difficulty`) || diff.textContent;
        }
    });
    
    // 更新游戏控制区域
    const controlElems = {
        score: document.querySelector('.score-display span:first-child'),
        time: document.querySelector('.timer span:first-child'),
        seconds: document.querySelector('.timer span:last-child'),
        restart: document.getElementById('restart-game'),
        back: document.getElementById('back-to-selection')
    };
    
    if (controlElems.score) controlElems.score.textContent = getTranslation('game.controls.score') || controlElems.score.textContent;
    if (controlElems.time) controlElems.time.textContent = getTranslation('game.controls.time') || controlElems.time.textContent;
    if (controlElems.seconds) controlElems.seconds.textContent = getTranslation('game.controls.seconds') || controlElems.seconds.textContent;
    if (controlElems.restart) controlElems.restart.textContent = getTranslation('game.controls.restart') || controlElems.restart.textContent;
    if (controlElems.back) controlElems.back.textContent = getTranslation('game.controls.back') || controlElems.back.textContent;
    
    // 更新排行榜
    const leaderboardElems = {
        title: document.querySelector('.leaderboard h2'),
        rankHeader: document.querySelector('.leaderboard-table th:nth-child(1)'),
        playerHeader: document.querySelector('.leaderboard-table th:nth-child(2)'),
        scoreHeader: document.querySelector('.leaderboard-table th:nth-child(3)'),
        dateHeader: document.querySelector('.leaderboard-table th:nth-child(4)')
    };
    
    if (leaderboardElems.title) leaderboardElems.title.textContent = getTranslation('game.leaderboard.title') || leaderboardElems.title.textContent;
    if (leaderboardElems.rankHeader) leaderboardElems.rankHeader.textContent = getTranslation('game.leaderboard.rank') || leaderboardElems.rankHeader.textContent;
    if (leaderboardElems.playerHeader) leaderboardElems.playerHeader.textContent = getTranslation('game.leaderboard.player') || leaderboardElems.playerHeader.textContent;
    if (leaderboardElems.scoreHeader) leaderboardElems.scoreHeader.textContent = getTranslation('game.leaderboard.score') || leaderboardElems.scoreHeader.textContent;
    if (leaderboardElems.dateHeader) leaderboardElems.dateHeader.textContent = getTranslation('game.leaderboard.date') || leaderboardElems.dateHeader.textContent;
} 