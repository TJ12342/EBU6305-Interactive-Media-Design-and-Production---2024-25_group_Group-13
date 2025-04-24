document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Quadratic Equations & Parabolas Interactive Learning Website Loaded');
    
    // 初始化逻辑或可视化动画可放在这里
    // initAnimation();
    // initDarkMode(); 等
});

/** 生成二次函数 */
const generateQuadraticFunction = (a = 1, b = 0, c = 0) => {
    if (a === 0) {
        console.warn("参数 a 不可为 0，已自动设为 1");
        a = 1;
    }
    return (x) => a * x * x + b * x + c;
};

/** 随机生成参数：a ∈ [-1, 1]，b ∈ [-3, 3]，c ∈ [-5, 5] */
const getRandomQuadraticParams = () => {
    const randomInRange = (min, max) => Math.random() * (max - min) + min;
    let a = randomInRange(-1, 1);
    a = a === 0 ? 1 : a; // 保证 a ≠ 0

    return {
        a,
        b: randomInRange(-3, 3),
        c: randomInRange(-5, 5),
    };
};

/** 格式化为数学函数字符串表示 */
const formatQuadraticFunction = (a, b, c) => {
    const formatCoeff = (coeff, variable) => {
        if (coeff === 0) return '';
        const absVal = Math.abs(coeff).toFixed(2);
        const sign = coeff < 0 ? ' - ' : (variable ? ' + ' : '');
        const display = Math.abs(coeff) === 1 && variable ? '' : absVal;
        return `${sign}${display}${variable}`;
    };

    const parts = [
        formatCoeff(a, 'x²'),
        formatCoeff(b, 'x'),
        formatCoeff(c, '')
    ].filter(Boolean);

    return `f(x) = ${parts.join('') || '0'}`;
};
