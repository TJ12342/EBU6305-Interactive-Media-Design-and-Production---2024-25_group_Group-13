/**
 * Interactive Problem Solver Script
 * Implements interactive simulations for various quadratic equation applications
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Interactive Problem Solver: DOM loaded");
    
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Activate the clicked tab
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Initialize all simulators
    initProjectileSimulator();
    initRevenueSimulator();
    initAreaSimulator();
});

/**
 * Projectile Motion Simulator
 */
function initProjectileSimulator() {
    console.log("Initializing Projectile Simulator");
    
    // Get DOM elements
    const canvas = document.getElementById('projectile-canvas');
    if (!canvas) {
        console.error("Projectile canvas not found");
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const heightSlider = document.getElementById('projectile-height');
    const velocitySlider = document.getElementById('projectile-velocity');
    const angleSlider = document.getElementById('projectile-angle');
    const heightValue = document.getElementById('height-value');
    const velocityValue = document.getElementById('velocity-value');
    const angleValue = document.getElementById('angle-value');
    const xEquation = document.getElementById('x-equation');
    const yEquation = document.getElementById('y-equation');
    const maxHeightSpan = document.getElementById('max-height');
    const timeInAirSpan = document.getElementById('time-in-air');
    const distanceSpan = document.getElementById('distance');
    const launchBtn = document.getElementById('projectile-start');
    const resetBtn = document.getElementById('projectile-reset');
    
    // Simulation variables
    let initialHeight = parseFloat(heightSlider.value);
    let initialVelocity = parseFloat(velocitySlider.value);
    let angle = parseFloat(angleSlider.value);
    let gravity = 9.8;
    let animationId = null;
    let isAnimating = false;
    let trajectoryPoints = [];
    let currentTime = 0;
    
    // Scale factors for drawing
    const SCALE_X = 20; // pixels per meter
    const SCALE_Y = 20; // pixels per meter
    const ORIGIN_X = 50; // x position of origin in canvas
    const ORIGIN_Y = canvas.height - 50; // y position of origin in canvas
    
    // Update displays when sliders change
    heightSlider.addEventListener('input', updateValues);
    velocitySlider.addEventListener('input', updateValues);
    angleSlider.addEventListener('input', updateValues);
    
    // Launch and reset buttons
    launchBtn.addEventListener('click', startAnimation);
    resetBtn.addEventListener('click', resetSimulation);
    
    // Initial simulation setup
    updateValues();
    drawScene();
    
    function updateValues() {
        initialHeight = parseFloat(heightSlider.value);
        initialVelocity = parseFloat(velocitySlider.value);
        angle = parseFloat(angleSlider.value);
        
        // Update display values
        heightValue.textContent = initialHeight.toFixed(1);
        velocityValue.textContent = initialVelocity.toFixed(1);
        angleValue.textContent = angle.toFixed(0);
        
        // Update equations
        const angleRad = angle * Math.PI / 180;
        xEquation.textContent = `x(t) = ${(initialVelocity * Math.cos(angleRad)).toFixed(1)}·t`;
        yEquation.textContent = `y(t) = ${initialHeight.toFixed(1)} + ${(initialVelocity * Math.sin(angleRad)).toFixed(1)}·t - 4.9t²`;
        
        // Calculate trajectory analysis
        calculateTrajectory();
        drawScene();
    }
    
    function calculateTrajectory() {
        const angleRad = angle * Math.PI / 180;
        const v0x = initialVelocity * Math.cos(angleRad);
        const v0y = initialVelocity * Math.sin(angleRad);
        
        // Time of flight calculation (time when y = 0)
        // From y = h0 + v0y*t - 0.5*g*t^2
        // Using quadratic formula
        const a = -0.5 * gravity;
        const b = v0y;
        const c = initialHeight;
        const discriminant = b*b - 4*a*c;
        
        // Calculate time in air (choose the positive time)
        let timeInAir;
        if (discriminant < 0) {
            timeInAir = 0; // No real solutions, shouldn't happen with normal physics
        } else {
            const t1 = (-b + Math.sqrt(discriminant)) / (2*a);
            const t2 = (-b - Math.sqrt(discriminant)) / (2*a);
            timeInAir = Math.max(t1, t2); // Take the larger (positive) solution
        }
        
        // Calculate horizontal distance
        const distance = v0x * timeInAir;
        
        // Calculate maximum height
        // Time to reach max height: when vertical velocity = 0
        const timeToMaxHeight = v0y / gravity;
        let maxHeight;
        
        if (timeToMaxHeight <= 0) {
            // If initial vertical velocity is negative or zero, max height is initial height
            maxHeight = initialHeight;
        } else {
            // Calculate max height at time of maximum
            maxHeight = initialHeight + v0y*timeToMaxHeight - 0.5*gravity*timeToMaxHeight*timeToMaxHeight;
        }
        
        // Update UI with results
        maxHeightSpan.textContent = maxHeight.toFixed(2);
        timeInAirSpan.textContent = timeInAir.toFixed(2);
        distanceSpan.textContent = distance.toFixed(2);
        
        // Generate trajectory points for drawing
        trajectoryPoints = [];
        const dt = timeInAir / 50; // Generate 50 points along trajectory
        
        for (let t = 0; t <= timeInAir; t += dt) {
            const x = v0x * t;
            const y = initialHeight + v0y*t - 0.5*gravity*t*t;
            trajectoryPoints.push({x, y, t});
        }
    }
    
    function drawScene() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw coordinate axes
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // X-axis
        ctx.moveTo(ORIGIN_X, ORIGIN_Y);
        ctx.lineTo(canvas.width - 20, ORIGIN_Y);
        
        // Y-axis
        ctx.moveTo(ORIGIN_X, canvas.height - 20);
        ctx.lineTo(ORIGIN_X, 20);
        
        ctx.stroke();
        
        // Draw grid
        ctx.strokeStyle = '#eee';
        ctx.setLineDash([2, 2]);
        
        for (let x = ORIGIN_X + SCALE_X; x < canvas.width - 20; x += SCALE_X) {
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, canvas.height - 20);
            ctx.stroke();
        }
        
        for (let y = ORIGIN_Y - SCALE_Y; y > 20; y -= SCALE_Y) {
            ctx.beginPath();
            ctx.moveTo(ORIGIN_X, y);
            ctx.lineTo(canvas.width - 20, y);
            ctx.stroke();
        }
        
        ctx.setLineDash([]);
        
        // Draw ground
        ctx.strokeStyle = '#5a3d2b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ORIGIN_X, ORIGIN_Y);
        ctx.lineTo(canvas.width - 20, ORIGIN_Y);
        ctx.stroke();
        
        // Draw axis labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.fillText('0', ORIGIN_X - 10, ORIGIN_Y + 15);
        ctx.fillText('Distance (m)', canvas.width - 80, ORIGIN_Y + 15);
        ctx.fillText('Height (m)', ORIGIN_X - 45, 30);
        
        // Draw scale labels
        for (let i = 1; i <= 5; i++) {
            // X-axis labels
            const xPos = ORIGIN_X + i * SCALE_X * 2;
            ctx.fillText(i * 2, xPos, ORIGIN_Y + 15);
            
            // Y-axis labels
            const yPos = ORIGIN_Y - i * SCALE_Y;
            ctx.fillText(i, ORIGIN_X - 15, yPos);
        }
        
        // Draw the predicted trajectory
        if (trajectoryPoints.length > 0) {
            ctx.strokeStyle = '#999';
            ctx.lineWidth = 1;
            ctx.beginPath();
            
            trajectoryPoints.forEach((point, index) => {
                const canvasX = ORIGIN_X + point.x * SCALE_X;
                const canvasY = ORIGIN_Y - point.y * SCALE_Y;
                
                if (index === 0) {
                    ctx.moveTo(canvasX, canvasY);
                } else {
                    ctx.lineTo(canvasX, canvasY);
                }
            });
            
            ctx.stroke();
        }
        
        // Draw the basketball at current position if animating
        if (isAnimating && currentTime <= trajectoryPoints[trajectoryPoints.length - 1].t) {
            // Find the point closest to current time
            let currentPoint = null;
            for (let i = 0; i < trajectoryPoints.length; i++) {
                if (trajectoryPoints[i].t >= currentTime) {
                    currentPoint = trajectoryPoints[i];
                    break;
                }
            }
            
            if (currentPoint) {
                const ballX = ORIGIN_X + currentPoint.x * SCALE_X;
                const ballY = ORIGIN_Y - currentPoint.y * SCALE_Y;
                
                // Draw basketball
                ctx.fillStyle = '#ff6600';
                ctx.beginPath();
                ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw basketball lines
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
                ctx.moveTo(ballX - 10, ballY);
                ctx.lineTo(ballX + 10, ballY);
                ctx.moveTo(ballX, ballY - 10);
                ctx.lineTo(ballX, ballY + 10);
                ctx.stroke();
            }
        }
    }
    
    function startAnimation() {
        if (isAnimating) return;
        
        isAnimating = true;
        currentTime = 0;
        
        function animate() {
            currentTime += 0.05;
            drawScene();
            
            // Check if animation should continue
            if (currentTime <= trajectoryPoints[trajectoryPoints.length - 1].t) {
                animationId = requestAnimationFrame(animate);
            } else {
                isAnimating = false;
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    function resetSimulation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        isAnimating = false;
        currentTime = 0;
        drawScene();
    }
}

/**
 * Revenue Optimization Simulator
 */
function initRevenueSimulator() {
    console.log("Initializing Revenue Simulator");
    
    // Get DOM elements
    const canvas = document.getElementById('revenue-canvas');
    if (!canvas) {
        console.error("Revenue canvas not found");
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const basePriceSlider = document.getElementById('revenue-base-price');
    const baseDemandSlider = document.getElementById('revenue-base-demand');
    const elasticitySlider = document.getElementById('revenue-elasticity');
    const basePriceValue = document.getElementById('base-price-value');
    const baseDemandValue = document.getElementById('base-demand-value');
    const elasticityValue = document.getElementById('elasticity-value');
    const demandEquation = document.getElementById('demand-equation');
    const revenueEquation = document.getElementById('revenue-equation');
    const optimalPrice = document.getElementById('optimal-price');
    const maxRevenue = document.getElementById('max-revenue');
    const ticketsSold = document.getElementById('tickets-sold');
    
    // Model parameters
    let basePrice = parseFloat(basePriceSlider.value);
    let baseDemand = parseFloat(baseDemandSlider.value);
    let elasticity = parseFloat(elasticitySlider.value);
    
    // Scale factors for drawing
    const PADDING_RIGHT = 40;
    const PADDING_TOP = 40;
    const PADDING_BOTTOM = 40;
    const PADDING_LEFT = 70; // Increased left padding to avoid text overlap
    const GRAPH_WIDTH = canvas.width - PADDING_LEFT - PADDING_RIGHT;
    const GRAPH_HEIGHT = canvas.height - PADDING_TOP - PADDING_BOTTOM;
    
    // Update values when sliders change
    basePriceSlider.addEventListener('input', updateValues);
    baseDemandSlider.addEventListener('input', updateValues);
    elasticitySlider.addEventListener('input', updateValues);
    
    // Initial setup
    updateValues();
    
    function updateValues() {
        basePrice = parseFloat(basePriceSlider.value);
        baseDemand = parseFloat(baseDemandSlider.value);
        elasticity = parseFloat(elasticitySlider.value);
        
        // Update display values
        basePriceValue.textContent = basePrice.toFixed(2);
        baseDemandValue.textContent = baseDemand.toFixed(0);
        elasticityValue.textContent = elasticity.toFixed(0);
        
        // Calculate and update demand and revenue equations
        const intercept = baseDemand + elasticity * basePrice;
        demandEquation.textContent = `q = ${intercept} - ${elasticity}p`;
        revenueEquation.textContent = `R = p(${intercept} - ${elasticity}p) = ${intercept}p - ${elasticity}p²`;
        
        // Calculate optimal price and maximum revenue
        // From R(p) = p * (intercept - elasticity*p) = intercept*p - elasticity*p^2
        // dR/dp = intercept - 2*elasticity*p = 0
        // p_optimal = intercept / (2*elasticity)
        const optimalPriceValue = intercept / (2 * elasticity);
        const optimalDemand = intercept - elasticity * optimalPriceValue;
        const maxRevenueValue = optimalPriceValue * optimalDemand;
        
        // Update result display
        optimalPrice.textContent = optimalPriceValue.toFixed(2);
        maxRevenue.textContent = maxRevenueValue.toFixed(2);
        ticketsSold.textContent = optimalDemand.toFixed(0);
        
        // Draw graphs
        drawRevenueGraphs(intercept, elasticity, optimalPriceValue);
    }
    
    function drawRevenueGraphs(intercept, elasticity, optimalPrice) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Define the price range to display (0 to 2x optimal price)
        const maxPrice = Math.min(intercept / elasticity, optimalPrice * 2);
        
        // Calculate the maximum revenue for scaling
        const maxRevenueValue = optimalPrice * (intercept - elasticity * optimalPrice);
        
        // Define scaling functions
        const scaleX = (price) => PADDING_LEFT + (price / maxPrice) * GRAPH_WIDTH;
        const scaleY = (value) => canvas.height - PADDING_BOTTOM - (value / maxRevenueValue) * GRAPH_HEIGHT;
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(PADDING_LEFT, PADDING_TOP);
        ctx.lineTo(PADDING_LEFT, canvas.height - PADDING_BOTTOM);
        ctx.lineTo(canvas.width - PADDING_RIGHT, canvas.height - PADDING_BOTTOM);
        ctx.stroke();
        
        // Draw axis labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        
        // X-axis (Price)
        ctx.fillText('Price ($)', canvas.width / 2, canvas.height - 10);
        
        // Y-axis (Revenue/Demand)
        ctx.save();
        ctx.translate(20, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Revenue ($) / Demand', 0, 0);
        ctx.restore();
        
        // Draw grid and axis markers
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        
        // X-axis markers
        const xStep = maxPrice / 5;
        for (let i = 0; i <= 5; i++) {
            const x = scaleX(i * xStep);
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - PADDING_BOTTOM);
            ctx.lineTo(x, canvas.height - PADDING_BOTTOM + 5);
            ctx.stroke();
            ctx.fillText((i * xStep).toFixed(1), x, canvas.height - PADDING_BOTTOM + 15);
            
            // Grid lines
            if (i > 0) {
                ctx.beginPath();
                ctx.setLineDash([3, 3]);
                ctx.moveTo(x, PADDING_TOP);
                ctx.lineTo(x, canvas.height - PADDING_BOTTOM);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
        
        // Y-axis markers (scaled to max revenue)
        const yStep = maxRevenueValue / 5;
        for (let i = 0; i <= 5; i++) {
            const y = scaleY(i * yStep);
            ctx.beginPath();
            ctx.moveTo(PADDING_LEFT, y);
            ctx.lineTo(PADDING_LEFT - 5, y);
            ctx.stroke();
            ctx.textAlign = 'right';
            ctx.fillText((i * yStep).toFixed(0), PADDING_LEFT - 10, y + 4);
            
            // Grid lines
            if (i > 0) {
                ctx.beginPath();
                ctx.setLineDash([3, 3]);
                ctx.moveTo(PADDING_LEFT, y);
                ctx.lineTo(canvas.width - PADDING_RIGHT, y);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
        
        // Draw demand curve
        ctx.strokeStyle = '#5470C6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let price = 0; price <= maxPrice; price += maxPrice / 100) {
            const demand = Math.max(0, intercept - elasticity * price);
            const x = scaleX(price);
            const y = scaleY(demand);
            
            if (price === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Draw revenue curve
        ctx.strokeStyle = '#91CC75';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let price = 0; price <= maxPrice; price += maxPrice / 100) {
            const demand = Math.max(0, intercept - elasticity * price);
            const revenue = price * demand;
            const x = scaleX(price);
            const y = scaleY(revenue);
            
            if (price === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        // Mark optimal price and max revenue
        const optimalX = scaleX(optimalPrice);
        const optimalY = scaleY(maxRevenueValue);
        
        // Draw optimal price line
        ctx.strokeStyle = '#F56C6C';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(optimalX, canvas.height - PADDING_BOTTOM);
        ctx.lineTo(optimalX, optimalY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw max revenue point
        ctx.fillStyle = '#F56C6C';
        ctx.beginPath();
        ctx.arc(optimalX, optimalY, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw legend
        ctx.font = '12px Arial';
        const legendX = canvas.width - PADDING_RIGHT - 150;
        const legendY = PADDING_TOP + 20;
        
        // Demand curve
        ctx.strokeStyle = '#5470C6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(legendX, legendY);
        ctx.lineTo(legendX + 30, legendY);
        ctx.stroke();
        ctx.fillStyle = '#333';
        ctx.textAlign = 'left';
        ctx.fillText('Demand Curve', legendX + 40, legendY + 4);
        
        // Revenue curve
        ctx.strokeStyle = '#91CC75';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(legendX, legendY + 20);
        ctx.lineTo(legendX + 30, legendY + 20);
        ctx.stroke();
        ctx.fillStyle = '#333';
        ctx.fillText('Revenue Curve', legendX + 40, legendY + 24);
        
        // Optimal point
        ctx.fillStyle = '#F56C6C';
        ctx.beginPath();
        ctx.arc(legendX + 15, legendY + 40, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#333';
        ctx.fillText('Optimal Point', legendX + 40, legendY + 44);
    }
}

/**
 * Area Optimizer Simulator
 */
function initAreaSimulator() {
    console.log("Initializing Area Simulator");
    
    // Get DOM elements
    const canvas = document.getElementById('area-canvas');
    if (!canvas) {
        console.error("Area canvas not found");
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const perimeterSlider = document.getElementById('area-perimeter');
    const widthSlider = document.getElementById('area-width');
    const perimeterValue = document.getElementById('perimeter-value');
    const widthValue = document.getElementById('width-value');
    const perimeterEquation = document.getElementById('perimeter-equation');
    const lengthEquation = document.getElementById('length-equation');
    const areaEquation = document.getElementById('area-equation');
    const currentWidth = document.getElementById('current-width');
    const currentLength = document.getElementById('current-length');
    const currentArea = document.getElementById('current-area');
    const optimalDimensions = document.getElementById('optimal-dimensions');
    const maxArea = document.getElementById('max-area');
    
    // Model parameters
    let perimeter = parseFloat(perimeterSlider.value);
    let width = parseFloat(widthSlider.value);
    
    // Update values when sliders change
    perimeterSlider.addEventListener('input', updatePerimeter);
    widthSlider.addEventListener('input', updateWidth);
    
    // Initial setup
    updatePerimeter();
    
    function updatePerimeter() {
        perimeter = parseFloat(perimeterSlider.value);
        perimeterValue.textContent = perimeter.toFixed(0);
        
        // Update equations
        perimeterEquation.textContent = `2x + 2y = ${perimeter}`;
        lengthEquation.textContent = `y = (${perimeter} - 2x)/2 = ${perimeter/2} - x`;
        areaEquation.textContent = `A = x·y = x(${perimeter/2} - x) = ${perimeter/2}x - x²`;
        
        // Calculate optimal width (which is perimeter/4 for a rectangle to maximize area)
        const optimalWidth = perimeter / 4;
        const optimalLength = perimeter / 4;
        const maxAreaValue = optimalWidth * optimalLength;
        
        // Update optimal values
        optimalDimensions.textContent = `${optimalWidth.toFixed(1)} × ${optimalLength.toFixed(1)}`;
        maxArea.textContent = maxAreaValue.toFixed(1);
        
        // Update slider maximum and make sure width can't exceed perimeter/2
        const maxWidthPossible = perimeter / 2;
        widthSlider.max = maxWidthPossible;
        
        // Adjust width if necessary
        if (width > maxWidthPossible) {
            width = maxWidthPossible;
            widthSlider.value = width;
        }
        
        // Update width-dependent values
        updateWidth();
    }
    
    function updateWidth() {
        width = parseFloat(widthSlider.value);
        widthValue.textContent = width.toFixed(1);
        
        // Calculate length and area with current width
        const length = (perimeter - 2 * width) / 2;
        const area = width * length;
        
        // Update current values
        currentWidth.textContent = width.toFixed(1);
        currentLength.textContent = length.toFixed(1);
        currentArea.textContent = area.toFixed(1);
        
        // Redraw the visualization
        drawAreaVisual();
    }
    
    function drawAreaVisual() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions in canvas space
        const maxDimension = Math.max(canvas.width, canvas.height) - 80;
        const scale = maxDimension / (perimeter / 2);
        
        // Calculate length based on perimeter and width
        const length = (perimeter - 2 * width) / 2;
        
        // Calculate canvas positions
        const rectWidth = width * scale;
        const rectHeight = length * scale;
        const rectX = (canvas.width - rectWidth) / 2;
        const rectY = (canvas.height - rectHeight) / 2;
        
        // Draw the rectangle
        ctx.fillStyle = 'rgba(98, 0, 234, 0.1)';
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        
        // Draw the outline
        ctx.strokeStyle = '#6200ea';
        ctx.lineWidth = 3;
        ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
        
        // Draw dimensions
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        
        // Width
        ctx.fillText(`${width.toFixed(1)} m`, rectX + rectWidth / 2, rectY + rectHeight + 20);
        
        // Length
        ctx.save();
        ctx.translate(rectX - 20, rectY + rectHeight / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(`${length.toFixed(1)} m`, 0, 0);
        ctx.restore();
        
        // Draw "fencing" decorations
        const fenceInterval = 10;
        
        ctx.strokeStyle = '#855E42';
        ctx.lineWidth = 2;
        
        // Top fence posts
        for (let x = rectX; x <= rectX + rectWidth; x += fenceInterval) {
            ctx.beginPath();
            ctx.moveTo(x, rectY - 5);
            ctx.lineTo(x, rectY - 15);
            ctx.stroke();
        }
        
        // Bottom fence posts
        for (let x = rectX; x <= rectX + rectWidth; x += fenceInterval) {
            ctx.beginPath();
            ctx.moveTo(x, rectY + rectHeight + 5);
            ctx.lineTo(x, rectY + rectHeight + 15);
            ctx.stroke();
        }
        
        // Left fence posts
        for (let y = rectY; y <= rectY + rectHeight; y += fenceInterval) {
            ctx.beginPath();
            ctx.moveTo(rectX - 5, y);
            ctx.lineTo(rectX - 15, y);
            ctx.stroke();
        }
        
        // Right fence posts
        for (let y = rectY; y <= rectY + rectHeight; y += fenceInterval) {
            ctx.beginPath();
            ctx.moveTo(rectX + rectWidth + 5, y);
            ctx.lineTo(rectX + rectWidth + 15, y);
            ctx.stroke();
        }
        
        // Draw optimality indicator
        const optimalWidth = perimeter / 4;
        const percentFromOptimal = Math.abs(width - optimalWidth) / optimalWidth;
        let message;
        
        if (percentFromOptimal < 0.05) {
            message = "Perfect! This is very close to optimal.";
        } else if (percentFromOptimal < 0.2) {
            message = "Good, but not optimal. Try adjusting width.";
        } else {
            message = "Far from optimal. Try a different width.";
        }
        
        ctx.fillStyle = percentFromOptimal < 0.05 ? '#4CAF50' : 
                        percentFromOptimal < 0.2 ? '#FF9800' : '#F44336';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(message, canvas.width / 2, 30);
    }
} 