const rainContainer = document.querySelector('.rain-container');
const rainToggle = document.getElementById('rain-toggle');

if (!rainContainer) {
	console.error('Rain container not found!');
} else {
	// Ensure the rain container is in the background
	rainContainer.style.position = 'fixed';
	rainContainer.style.top = '0';
	rainContainer.style.left = '0';
}

let rainEnabled = true;
let rainInterval = null;

// Function to create a single rain element
function createRainElement() {
	if (!rainEnabled) return;
	
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

// Create rain elements continuously
function startRain() {
	// Create new rain elements more frequently for a heavier downpour
	rainInterval = setInterval(createRainElement, 50);
}

// Stop creating rain
function stopRain() {
	if (rainInterval) {
		clearInterval(rainInterval);
		rainInterval = null;
	}
	// Clear existing elements
	while (rainContainer.firstChild) {
		rainContainer.removeChild(rainContainer.firstChild);
	}
}

// Toggle rain on/off
if (!rainToggle) {
	console.error('Rain toggle button not found!');
	// If the toggle doesn't exist, we can't add a listener to it.
	// The rain will start by default and cannot be stopped.
} else {
rainToggle.addEventListener('click', () => {
	rainEnabled = !rainEnabled;
	
	if (rainEnabled) {
		rainToggle.textContent = 'Disable Rain';
		rainToggle.classList.remove('disabled');
		startRain();
	} else {
		rainToggle.textContent = 'Enable Rain';
		rainToggle.classList.add('disabled');
		stopRain();
	}
});
}

// Start the rain effect immediately
if (rainContainer) {
	startRain();
}

// Handle window resize to ensure raindrops fall the correct distance
window.addEventListener('resize', () => {
	if (rainEnabled && rainContainer) {
		// Stop and clear existing rain
		stopRain();
		// Restart with new window dimensions
		startRain();
	}
});
