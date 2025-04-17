// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quadratic Equations & Parabolas Interactive Learning Website Loaded');
    
    // 注意：语言选择器功能现在由i18n.js处理
    // 旧版语言选择器功能保留以备参考，但不再使用
    // initLanguageSelector();
});

// 旧版语言选择器功能 - 现在由i18n.js处理
// function initLanguageSelector() {
//     const languageSelector = document.getElementById('language');
//     if (!languageSelector) return;
//     
//     // 添加语言切换事件监听器
//     languageSelector.addEventListener('change', function(e) {
//         const selectedLanguage = e.target.value;
//         console.log(`语言已切换为: ${selectedLanguage}`);
//         
//         // 这里可以添加实际的语言切换逻辑
//         // 比如使用i18n库或自定义逻辑
//         // 示例: changeLanguage(selectedLanguage);
//     });
//     
//     // 默认设置为当前浏览器语言
//     const browserLang = navigator.language || navigator.userLanguage;
//     if (browserLang.startsWith('zh')) {
//         languageSelector.value = 'zh';
//     } else {
//         languageSelector.value = 'en';
//     }
// }

// 工具函数：生成二次函数
function generateQuadraticFunction(a, b, c) {
    return function(x) {
        return a * x * x + b * x + c;
    };
}

// 工具函数：生成随机二次函数参数
function getRandomQuadraticParams() {
    // 确保a不为0，以保持是二次函数
    const a = Math.random() * 2 - 1;
    const b = Math.random() * 6 - 3;
    const c = Math.random() * 10 - 5;
    
    return {
        a: a === 0 ? 1 : a,
        b,
        c
    };
}

// 工具函数：格式化二次函数为字符串
function formatQuadraticFunction(a, b, c) {
    let formula = '';
    
    // 处理a项
    if (a !== 0) {
        if (a === 1) {
            formula += 'x²';
        } else if (a === -1) {
            formula += '-x²';
        } else {
            formula += a.toFixed(2) + 'x²';
        }
    }
    
    // 处理b项
    if (b !== 0) {
        if (b > 0 && formula !== '') {
            formula += ' + ';
        } else if (b < 0) {
            formula += ' - ';
        }
        
        if (Math.abs(b) === 1) {
            formula += 'x';
        } else {
            formula += Math.abs(b).toFixed(2) + 'x';
        }
    }
    
    // 处理c项
    if (c !== 0) {
        if (c > 0 && formula !== '') {
            formula += ' + ';
        } else if (c < 0) {
            formula += ' - ';
        }
        formula += Math.abs(c).toFixed(2);
    }
    
    // 如果公式为空，说明所有系数都为0
    if (formula === '') {
        formula = '0';
    }
    
    return 'f(x) = ' + formula;
} 