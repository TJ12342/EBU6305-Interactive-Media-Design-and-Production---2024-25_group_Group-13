// 中文语言包
window.i18n = window.i18n || {};
window.i18n.zh = {
    // 导航元素
    nav: {
        home: "首页",
        learning: "学习",
        game: "游戏",
        test: "测试",
        community: "社区"
    },
    
    // 通用元素
    common: {
        darkMode: "暗色模式",
        lightMode: "亮色模式",
        language: "语言",
        english: "英文",
        chinese: "中文",
        backToTop: "返回顶部",
        contact: "联系我们",
        email: "parabola@math-learning.com",
        copyright: "© 2024 ParabolaMaster 版权所有",
        privacy: "隐私政策",
        terms: "使用条款"
    },
    
    // 首页
    home: {
        pageTitle: "ParabolaMaster - 互动学习二次方程",
        hero: {
            title: "欢迎来到 ParabolaMaster",
            subtitle: "通过交互式学习掌握二次方程",
            getStarted: "开始学习"
        },
        features: {
            title: "特色功能",
            interactive: {
                title: "互动学习",
                description: "通过直观的可视化和互动练习理解复杂概念"
            },
            games: {
                title: "教育游戏",
                description: "通过有趣的挑战来测试和提高你的技能"
            },
            community: {
                title: "学习社区",
                description: "加入社区，提问和分享你的经验"
            }
        },
        about: {
            title: "关于 ParabolaMaster",
            description: "ParabolaMaster 是一个专为学生和教师设计的平台，旨在通过交互式内容和视觉效果使二次方程和抛物线的学习变得更容易。我们的目标是让数学变得有趣、直观且易于理解。"
        },
        testimonials: {
            title: "用户评价",
            testimonial1: {
                text: "ParabolaMaster 帮助我理解了二次方程，这在我之前一直觉得很困难。现在我甚至可以帮助我的同学们！",
                author: "李明，高中生"
            },
            testimonial2: {
                text: "作为一名教师，我发现 ParabolaMaster 是教授二次方程的绝佳工具。互动性质帮助学生更好地掌握概念。",
                author: "张老师，高中数学教师"
            }
        }
    },
    
    // 学习页面
    learning: {
        pageTitle: "学习二次方程和抛物线 | ParabolaMaster",
        intro: {
            title: "抛物线与二次方程",
            description1: "二次方程和抛物线是数学中的基础概念，但对许多学生来说可能具有挑战性。通过交互式学习，我们可以更直观地理解这些重要概念。",
            description2: "在下面的模块中，你将学习二次方程的基础知识、系数效应、图形变换以及实际应用，这些都以互动方式呈现，帮助你更好地掌握。"
        },
        modules: {
            title: "学习模块",
            basicConcepts: {
                title: "基础概念",
                description: "了解二次方程和抛物线的标准形式、顶点形式和一般形式",
                button: "开始学习"
            },
            coefficients: {
                title: "系数效应",
                description: "探索不同系数如何影响抛物线的形状和位置",
                button: "开始学习"
            },
            transformations: {
                title: "图形变换",
                description: "学习平移、拉伸和压缩对抛物线的影响",
                button: "开始学习"
            },
            applications: {
                title: "实际应用",
                description: "发现二次方程在现实世界中的应用，如物理和经济学",
                button: "开始学习"
            }
        },
        resources: {
            title: "补充资源",
            resource1: {
                title: "视频教程",
                description: "观看详细解释二次方程概念的视频教程",
                button: "观看视频"
            },
            resource2: {
                title: "练习题",
                description: "下载额外的练习题和解答",
                button: "下载练习题"
            },
            resource3: {
                title: "备忘单",
                description: "获取二次方程公式和技巧的快速参考指南",
                button: "获取备忘单"
            }
        },
        sidebar: {
            title: "导航目录",
            intro: "简介",
            basicConcepts: "基础概念",
            standardForm: "标准形式",
            vertexForm: "顶点形式",
            factorizedForm: "因式分解形式",
            coefficients: "系数效应",
            transformations: "图形变换",
            applications: "实际应用",
            resources: "补充资源"
        },
        // 详细的模块内容
        content: {
            basicConcepts: {
                title: "二次方程基础概念",
                intro: "二次方程是指最高幂次为2的多项式方程。它在坐标平面上表示为抛物线。",
                standardForm: {
                    title: "标准形式",
                    description: "二次方程的标准形式为 y = ax² + bx + c，其中 a、b、c 为常数，且 a ≠ 0。"
                },
                vertexForm: {
                    title: "顶点形式",
                    description: "顶点形式为 y = a(x - h)² + k，其中 (h, k) 是抛物线的顶点。"
                },
                factorizedForm: {
                    title: "因式分解形式",
                    description: "当方程有实数解时，可以表示为 y = a(x - r₁)(x - r₂)，其中 r₁ 和 r₂ 是方程的根。"
                }
            },
            coefficients: {
                intro: "二次函数（f(x) = ax² + bx + c）中的系数a、b和c各自对抛物线的形状和位置有独特的影响。理解这些影响对于分析和操作二次函数至关重要。",
                a: {
                    title: "系数'a'的影响",
                    description: "系数'a'决定了抛物线的宽度和方向：",
                    point1: "当|a|增大时，抛物线变窄",
                    point2: "当|a|减小时，抛物线变宽",
                    point3: "当a > 0时，抛物线开口向上",
                    point4: "当a < 0时，抛物线开口向下"
                },
                b: {
                    title: "系数'b'的影响",
                    description: "系数'b'影响顶点的水平位置和对称轴：",
                    point1: "顶点的x坐标由公式 x = -b/(2a) 给出",
                    point2: "当b增大时，抛物线向左移动",
                    point3: "当b减小时，抛物线向右移动",
                    point4: "当b = 0时，对称轴经过y轴（x = 0）"
                },
                c: {
                    title: "系数'c'的影响",
                    description: "系数'c'表示y轴截距，影响整个抛物线的垂直位置：",
                    point1: "当c增大时，整个抛物线向上移动",
                    point2: "当c减小时，整个抛物线向下移动",
                    point3: "y轴截距始终位于点(0, c)"
                },
                interactive: {
                    title: "交互式演示",
                    description: "调整滑块，查看每个系数如何影响抛物线的形状和位置。",
                    a: "a：",
                    b: "b：",
                    c: "c：",
                    aDesc: "控制宽度和方向",
                    bDesc: "控制水平位置",
                    cDesc: "控制垂直位置",
                    vertex: "顶点：",
                    axis: "对称轴：",
                    direction: "方向：",
                    yIntercept: "Y轴截距："
                },
                applications: {
                    title: "系数分析的应用",
                    description: "理解系数如何影响抛物线对多种应用至关重要：",
                    example1: {
                        title: "物理学：抛体运动",
                        description: "在抛体运动中，物体的路径遵循抛物线轨迹，可由方程 y = -0.5g·t² + v₀·sin(θ)·t + h₀ 描述，其中g是重力加速度，v₀是初速度，θ是角度，h₀是初始高度。"
                    },
                    example2: {
                        title: "工程学：悬索桥",
                        description: "悬索桥的缆索形成抛物线。工程师通过调整,系数来控制缆索的高度和张力。"
                    },
                    example3: {
                        title: "经济学：供需关系",
                        description: "在某些经济模型中，二次函数用于建模成本函数，其中系数,表示边际成本随产量增加的速度。"
                    }
                },
                quiz: {
                    title: "快速检查",
                    instruction: "测试您对系数效应的理解：",
                    q1: "如果要使抛物线变窄，应该怎么做？",
                    q1a: "增大|a|",
                    q1b: "减小|a|",
                    q1c: "增大|b|",
                    q1d: "增大|c|",
                    q2: "什么决定了抛物线的方向（向上或向下）？",
                    q2a: "a的符号",
                    q2b: "b的符号",
                    q2c: "c的符号",
                    q2d: "b²-4ac的值",
                    q3: "如果c = 3，抛物线在哪里与y轴相交？",
                    q3a: "(3, 0)",
                    q3b: "(0, 3)",
                    q3c: "(0, -3)",
                    q3d: "这取决于a和b",
                    checkButton: "检查答案"
                }
            }
        }
    },
    
    // 游戏页面
    game: {
        pageTitle: "二次方程互动游戏 | ParabolaMaster",
        title: "趣味数学游戏",
        description: "通过这些互动游戏测试和提高你对二次方程的理解。选择一个游戏开始吧！",
        
        // 游戏详情
        parabolaShooter: {
            title: "抛物线射手",
            description: "使用抛物线轨迹瞄准目标，测试你对二次方程的理解。",
            difficulty: "难度: 简单",
            button: "开始游戏",
            instructions: "调整二次方程的参数，创建正确的抛物线轨迹来击中目标。你有60秒的时间来获得尽可能多的分数。"
        },
        
        equationMatching: {
            title: "方程匹配",
            description: "将方程与相应的图形匹配，提高你的视觉识别能力。",
            difficulty: "难度: 中等",
            button: "开始游戏",
            instructions: "查看显示的抛物线图形，然后从选项中选择正确的方程。时间越快，得分越高。"
        },
        
        vertexHunter: {
            title: "顶点猎人",
            description: "快速找出抛物线的顶点，测试你的计算速度。",
            difficulty: "难度: 困难",
            button: "开始游戏",
            instructions: "给定一个二次方程，通过将方程转换为顶点形式，尽快找出抛物线的顶点。"
        },
        
        // 游戏控制
        controls: {
            score: "分数:",
            time: "时间:",
            seconds: "秒",
            start: "开始",
            restart: "重新开始",
            pause: "暂停",
            resume: "继续",
            back: "返回选择",
            gameOver: "游戏结束",
            finalScore: "最终分数",
            newHighScore: "新的最高分！",
            tryAgain: "再试一次",
            mainMenu: "主菜单"
        },
        
        // 排行榜
        leaderboard: {
            title: "排行榜",
            rank: "排名",
            player: "玩家",
            score: "分数",
            date: "日期",
            game: "游戏",
            noRecords: "暂无记录"
        }
    },
    
    // 测试页面
    test: {
        pageTitle: "二次方程测试 | ParabolaMaster",
        title: "测试你的知识",
        description: "通过我们的测试评估你对二次方程和抛物线的理解。选择一个难度级别来开始。",
        
        // 难度级别
        difficulty: {
            label: "选择难度:",
            easy: "简单",
            medium: "中等",
            hard: "困难"
        },
        
        // 测试类型
        types: {
            title: "测试类型",
            multipleChoice: {
                title: "选择题",
                description: "测试基本概念和简单应用"
            },
            fillInBlank: {
                title: "填空题",
                description: "测试你的计算能力和应用知识"
            },
            problemSolving: {
                title: "问题解决",
                description: "应用二次方程解决复杂问题"
            }
        },
        
        // 测试相关按钮和提示
        controls: {
            start: "开始测试",
            next: "下一题",
            previous: "上一题",
            submit: "提交答案",
            finishTest: "完成测试",
            timeRemaining: "剩余时间",
            questionProgress: "问题 {current} / {total}"
        },
        
        // 测试结果
        results: {
            title: "测试结果",
            score: "你的得分: {score}%",
            timeTaken: "用时: {time}",
            correct: "正确答案: {correct} / {total}",
            reviewAnswers: "查看答案",
            retakeTest: "重新测试",
            backToTests: "返回测试列表"
        }
    },
    
    // 社区页面
    community: {
        pageTitle: "二次方程学习社区 | ParabolaMaster",
        welcome: {
            title: "欢迎来到我们的学习社区",
            description: "在这里，你可以与其他学习者分享经验、提问和讨论与二次方程相关的主题。"
        },
        
        // 统计信息
        stats: {
            members: "社区成员",
            active: "活跃用户",
            topics: "讨论主题",
            posts: "帖子总数",
            online: "在线用户"
        },
        
        // 热门主题
        hotTopics: {
            title: "热门主题",
            viewAll: "查看所有"
        },
        
        // 社区规则
        rules: {
            title: "社区规则",
            viewAll: "查看所有规则",
            rule1: "尊重所有社区成员",
            rule2: "禁止发布垃圾内容或广告",
            rule3: "提问前请先搜索是否已有类似问题",
            rule4: "分享解决方案时请提供详细解释"
        },
        
        // 类别
        categories: {
            all: "所有",
            questions: "问题",
            experiences: "经验分享",
            discussions: "讨论",
            resources: "资源"
        },
        
        // 搜索
        search: {
            placeholder: "搜索社区...",
            button: "搜索"
        },
        
        // 帖子互动
        interactions: {
            reply: "回复",
            like: "点赞",
            share: "分享",
            report: "举报",
            comments: "评论"
        },
        
        // 用户提示
        tips: {
            askQuestion: "如何提出好问题？",
            tip1: "确保你的标题明确具体",
            tip2: "包含你尝试过的解决方法",
            tip3: "添加相关公式或图片",
            tip4: "检查拼写和格式"
        }
    }
}; 