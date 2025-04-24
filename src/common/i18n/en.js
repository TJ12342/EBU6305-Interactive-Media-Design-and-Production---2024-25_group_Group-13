// English language pack
window.i18n = window.i18n || {};
window.i18n.en = {
    // Navigation elements
    nav: {
        home: "Home",
        learning: "Learning",
        game: "Games",
        test: "Tests",
        community: "Community"
    },
    
    // Common elements
    common: {
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
        language: "Language",
        english: "English",
        chinese: "Chinese",
        backToTop: "Back to Top",
        contact: "Contact Us",
        email: "parabola@math-learning.com",
        copyright: "© 2024 ParabolaMaster All Rights Reserved",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
    },
    
    // Home page
    home: {
        pageTitle: "ParabolaMaster - Interactive Quadratic Equations Learning",
        hero: {
            title: "Welcome to ParabolaMaster",
            subtitle: "Master Quadratic Equations Through Interactive Learning",
            getStarted: "Get Started"
        },
        features: {
            title: "Featured Functions",
            interactive: {
                title: "Interactive Learning",
                description: "Understand complex concepts through intuitive visualizations and interactive exercises"
            },
            games: {
                title: "Educational Games",
                description: "Test and improve your skills through fun challenges"
            },
            community: {
                title: "Learning Community",
                description: "Join the community to ask questions and share your experiences"
            }
        },
        about: {
            title: "About ParabolaMaster",
            description: "ParabolaMaster is a platform designed for students and teachers to make learning quadratic equations and parabolas easier through interactive content and visual aids. Our goal is to make mathematics fun, intuitive, and easy to understand."
        },
        testimonials: {
            title: "User Testimonials",
            testimonial1: {
                text: "ParabolaMaster helped me understand quadratic equations, which I had always found difficult before. Now I can even help my classmates!",
                author: "Mike, High School Student"
            },
            testimonial2: {
                text: "As a teacher, I find ParabolaMaster to be an excellent tool for teaching quadratic equations. The interactivity helps students grasp the concepts better.",
                author: "Mrs. Johnson, High School Math Teacher"
            }
        }
    },
    
    // Learning page
    learning: {
        pageTitle: "Learn Quadratic Equations and Parabolas | ParabolaMaster",
        intro: {
            title: "Parabolas and Quadratic Equations",
            description1: "Quadratic equations and parabolas are fundamental concepts in mathematics, but they can be challenging for many students. Through interactive learning, we can understand these important concepts more intuitively.",
            description2: "In the modules below, you will learn about the basics of quadratic equations, coefficient effects, graph transformations, and practical applications, all presented in an interactive way to help you master them better."
        },
        modules: {
            title: "Learning Modules",
            basicConcepts: {
                title: "Basic Concepts",
                description: "Learn about the standard form, vertex form, and general form of quadratic equations and parabolas",
                button: "Start Learning"
            },
            coefficients: {
                title: "Coefficient Effects",
                description: "Explore how different coefficients affect the shape and position of parabolas",
                button: "Start Learning"
            },
            transformations: {
                title: "Graph Transformations",
                description: "Learn about translations, stretching, and compression effects on parabolas",
                button: "Start Learning"
            },
            applications: {
                title: "Practical Applications",
                description: "Discover how quadratic equations are applied in the real world, such as in physics and economics",
                button: "Start Learning"
            }
        },
        resources: {
            title: "Additional Resources",
            resource1: {
                title: "Video Tutorials",
                description: "Watch video tutorials explaining quadratic equation concepts in detail",
                button: "Watch Videos"
            },
            resource2: {
                title: "Practice Problems",
                description: "Download additional practice problems with solutions",
                button: "Download Problems"
            },
            resource3: {
                title: "Cheat Sheet",
                description: "Get a quick reference guide for quadratic equation formulas and tips",
                button: "Get Cheat Sheet"
            }
        },
        sidebar: {
            title: "Navigation Directory",
            intro: "Introduction",
            basicConcepts: "Basic Concepts",
            standardForm: "Standard Form",
            vertexForm: "Vertex Form",
            factorizedForm: "Factorized Form",
            coefficients: "Coefficient Effects",
            transformations: "Graph Transformations",
            applications: "Practical Applications",
            resources: "Additional Resources"
        },
        // Detailed module content
        content: {
            basicConcepts: {
                title: "Quadratic Equations Basic Concepts",
                intro: "A quadratic equation is a polynomial equation with the highest degree of 2. It is represented as a parabola on the coordinate plane.",
                standardForm: {
                    title: "Standard Form",
                    description: "The standard form of a quadratic equation is y = ax² + bx + c, where a, b, c are constants, and a ≠ 0."
                },
                vertexForm: {
                    title: "Vertex Form",
                    description: "The vertex form is y = a(x - h)² + k, where (h, k) is the vertex of the parabola."
                },
                factorizedForm: {
                    title: "Factorized Form",
                    description: "When the equation has real roots, it can be represented as y = a(x - r₁)(x - r₂), where r₁ and r₂ are the roots of the equation."
                }
            },
            coefficients: {
                intro: "The coefficients a, b, and c in a quadratic function (f(x) = ax² + bx + c) each have unique effects on the shape and position of the parabola. Understanding these effects is crucial for analyzing and manipulating quadratic functions.",
                a: {
                    title: "The Effect of Coefficient 'a'",
                    description: "The coefficient 'a' determines the width and direction of the parabola:",
                    point1: "When |a| increases, the parabola becomes narrower",
                    point2: "When |a| decreases, the parabola becomes wider",
                    point3: "When a > 0, the parabola opens upward",
                    point4: "When a < 0, the parabola opens downward"
                },
                b: {
                    title: "The Effect of Coefficient 'b'",
                    description: "The coefficient 'b' affects the horizontal position of the vertex and the axis of symmetry:",
                    point1: "The x-coordinate of the vertex is given by x = -b/(2a)",
                    point2: "When b increases, the parabola shifts to the left",
                    point3: "When b decreases, the parabola shifts to the right",
                    point4: "When b = 0, the axis of symmetry passes through the y-axis (x = 0)"
                },
                c: {
                    title: "The Effect of Coefficient 'c'",
                    description: "The coefficient 'c' represents the y-intercept and affects the vertical position of the entire parabola:",
                    point1: "When c increases, the entire parabola shifts upward",
                    point2: "When c decreases, the entire parabola shifts downward",
                    point3: "The y-intercept is always at the point (0, c)"
                },
                interactive: {
                    title: "Interactive Demonstration",
                    description: "Adjust the sliders to see how each coefficient affects the parabola's shape and position.",
                    a: "a:",
                    b: "b:",
                    c: "c:",
                    aDesc: "Controls width and direction",
                    bDesc: "Controls horizontal position",
                    cDesc: "Controls vertical position",
                    vertex: "Vertex:",
                    axis: "Axis of Symmetry:",
                    direction: "Direction:",
                    yIntercept: "Y-Intercept:"
                },
                applications: {
                    title: "Applications of Coefficient Analysis",
                    description: "Understanding how coefficients affect parabolas is essential for various applications:",
                    example1: {
                        title: "Physics: Projectile Motion",
                        description: "In projectile motion, the path of an object follows a parabolic trajectory described by y = -0.5g·t² + v₀·sin(θ)·t + h₀, where g is gravity, v₀ is initial velocity, θ is the angle, and h₀ is initial height."
                    },
                    example2: {
                        title: "Engineering: Suspension Bridges",
                        description: "The cables of suspension bridges form parabolas. Engineers adjust the \"a\" coefficient to control the height and tension of the cables."
                    },
                    example3: {
                        title: "Economics: Supply and Demand",
                        description: "In some economic models, quadratic functions model cost functions where the coefficient \"a\" represents how quickly marginal costs increase with production."
                    }
                },
                quiz: {
                    title: "Quick Check",
                    instruction: "Test your understanding of coefficient effects:",
                    q1: "If you want to make a parabola narrower, what should you do?",
                    q1a: "Increase |a|",
                    q1b: "Decrease |a|",
                    q1c: "Increase |b|",
                    q1d: "Increase |c|",
                    q2: "What determines the direction (upward or downward) of a parabola?",
                    q2a: "The sign of a",
                    q2b: "The sign of b",
                    q2c: "The sign of c",
                    q2d: "The value of b²-4ac",
                    q3: "If c = 3, where does the parabola intersect the y-axis?",
                    q3a: "(3, 0)",
                    q3b: "(0, 3)",
                    q3c: "(0, -3)",
                    q3d: "It depends on a and b",
                    checkButton: "Check Answers"
                }
            }
        }
    },
    
    // Game page
    game: {
        pageTitle: "Interactive Quadratic Equation Games | ParabolaMaster",
        title: "Fun Math Games",
        description: "Test and improve your understanding of quadratic equations through these interactive games. Choose a game to get started!",
        
        // Game details
        parabolaShooter: {
            title: "Parabola Shooter",
            description: "Use parabolic trajectories to aim at targets, testing your understanding of quadratic equations.",
            difficulty: "Difficulty: Easy",
            button: "Play Now",
            instructions: "Adjust the parameters of the quadratic equation to create the correct parabolic trajectory to hit the target. You have 60 seconds to score as many points as possible."
        },
        
        equationMatching: {
            title: "Equation Matching",
            description: "Match equations with their corresponding graphs, improving your visual recognition skills.",
            difficulty: "Difficulty: Medium",
            button: "Play Now",
            instructions: "Look at the parabola graph displayed and select the correct equation from the options. The faster you match, the higher your score."
        },
        
        vertexHunter: {
            title: "Vertex Hunter",
            description: "Quickly find the vertex of parabolas, testing your calculation speed.",
            difficulty: "Difficulty: Hard",
            button: "Play Now",
            instructions: "Given a quadratic equation, find the vertex of the parabola as quickly as possible by converting the equation to vertex form."
        },
        
        // Game controls
        controls: {
            score: "Score:",
            time: "Time:",
            seconds: "seconds",
            start: "Start",
            restart: "Restart",
            pause: "Pause",
            resume: "Resume",
            back: "Back to Selection",
            gameOver: "Game Over",
            finalScore: "Final Score",
            newHighScore: "New High Score!",
            tryAgain: "Try Again",
            mainMenu: "Main Menu"
        },
        
        // Leaderboard
        leaderboard: {
            title: "Leaderboard",
            rank: "Rank",
            player: "Player",
            score: "Score",
            date: "Date",
            game: "Game",
            noRecords: "No records yet"
        }
    },
    
    // Test page
    test: {
        pageTitle: "Quadratic Equation Tests | ParabolaMaster",
        title: "Test Your Knowledge",
        description: "Assess your understanding of quadratic equations and parabolas through our tests. Choose a difficulty level to begin.",
        
        // Difficulty levels
        difficulty: {
            label: "Select Difficulty:",
            easy: "Easy",
            medium: "Medium",
            hard: "Hard"
        },
        
        // Test types
        types: {
            title: "Test Types",
            multipleChoice: {
                title: "Multiple Choice",
                description: "Test basic concepts and simple applications"
            },
            fillInBlank: {
                title: "Fill in the Blank",
                description: "Test your calculation abilities and applied knowledge"
            },
            problemSolving: {
                title: "Problem Solving",
                description: "Apply quadratic equations to solve complex problems"
            }
        },
        
        // Test-related buttons and prompts
        controls: {
            start: "Start Test",
            next: "Next Question",
            previous: "Previous Question",
            submit: "Submit Answer",
            finishTest: "Finish Test",
            timeRemaining: "Time Remaining",
            questionProgress: "Question {current} / {total}"
        },
        
        // Test results
        results: {
            title: "Test Results",
            score: "Your Score: {score}%",
            timeTaken: "Time Taken: {time}",
            correct: "Correct Answers: {correct} / {total}",
            reviewAnswers: "Review Answers",
            retakeTest: "Retake Test",
            backToTests: "Back to Tests"
        }
    },
    
    // Community page
    community: {
        pageTitle: "Quadratic Equation Learning Community | ParabolaMaster",
        welcome: {
            title: "Welcome to Our Learning Community",
            description: "Here, you can share experiences, ask questions, and discuss topics related to quadratic equations with other learners."
        },
        
        // Statistics information
        stats: {
            members: "Community Members",
            active: "Active Users",
            topics: "Discussion Topics",
            posts: "Total Posts",
            online: "Users Online"
        },
        
        // Hot topics
        hotTopics: {
            title: "Hot Topics",
            viewAll: "View All"
        },
        
        // Community rules
        rules: {
            title: "Community Rules",
            viewAll: "View All Rules",
            rule1: "Respect all community members",
            rule2: "No spam or advertising content",
            rule3: "Search for similar questions before posting",
            rule4: "Provide detailed explanations when sharing solutions"
        },
        
        // Categories
        categories: {
            all: "All",
            questions: "Questions",
            experiences: "Experiences",
            discussions: "Discussions",
            resources: "Resources"
        },
        
        // Search
        search: {
            placeholder: "Search Community...",
            button: "Search"
        },
        
        // Post interactions
        interactions: {
            reply: "Reply",
            share: "Share",
            save: "Save",
            report: "Report",
            like: "Like",
            liked: "Liked",
            posted: "Posted on",
            replies: "Replies"
        },
        
        // Posting related
        posting: {
            newPost: "Create New Post",
            title: "Title",
            category: "Category",
            content: "Content",
            attachFiles: "Attach Files",
            tags: "Tags (separate with commas)",
            post: "Post",
            cancel: "Cancel"
        }
    }
}; 