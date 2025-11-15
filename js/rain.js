const rainContainer = document.querySelector('.rain-container');

if (!rainContainer) {
	console.error('Rain container not found!');
} else {
	// Ensure the rain container is in the background
	rainContainer.style.position = 'fixed';
	rainContainer.style.top = '0';
	rainContainer.style.left = '0';
}

// Function to create a single rain element
function createRainElement() {
	const rainElement = document.createElement('div');
	rainElement.classList.add('raindrop'); // Use the CSS class for styling
	
	// Random horizontal position
	const xPos = Math.random() * window.innerWidth;
	rainElement.style.left = xPos + 'px';
	
	// Random animation duration between 1.5s and 3.0s for a faster fall
	const duration = Math.random() * 1.5 + 1.5;
	rainElement.style.animationDuration = duration + 's';
	
	// Start from just above the viewport
	rainElement.style.top = '-20px';
	
	rainContainer.appendChild(rainElement);
	
	// Animate to fall straight down
	rainElement.animate([
		{ transform: 'translate(0, 0)' },
		{ transform: `translate(0, ${window.innerHeight + 50}px)` }
	], {
		duration: duration * 1000,
		easing: 'linear',
	});
	
	// Remove element after animation completes
	setTimeout(() => {
		rainElement.remove();
	}, duration * 1000);
}

let lastTime = 0;
const rainInterval = 50; // ms between raindrops
let rainLoopId = null;
let isRaining = true;

function rainLoop(timestamp) {
	if (timestamp - lastTime > rainInterval) {
		createRainElement();
		lastTime = timestamp;
	}
	rainLoopId = requestAnimationFrame(rainLoop);
}

// Kicks off the animation loop
function startRain() {
	if (!rainLoopId) {
		isRaining = true;
		rainLoopId = requestAnimationFrame(rainLoop);
		rainContainer.style.display = 'block';
		document.getElementById('rain-toggle').textContent = 'Disable Rain';
	}
}

// Stop the rain effect
function stopRain() {
	if (rainLoopId) {
		cancelAnimationFrame(rainLoopId);
		rainLoopId = null;
		isRaining = false;
		rainContainer.style.display = 'none';
		document.getElementById('rain-toggle').textContent = 'Enable Rain';
	}
}

// Toggle rain on button click
const rainToggleBtn = document.getElementById('rain-toggle');
if (rainToggleBtn) {
	rainToggleBtn.addEventListener('click', () => {
		if (isRaining) {
			stopRain();
		} else {
			startRain();
		}
	});
}

// Start the rain effect immediately
if (rainContainer) {
	startRain();
}
