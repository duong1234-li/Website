const rainContainer = document.querySelector('.rain-container');
const rainToggle = document.getElementById('rain-toggle');

// Ensure the rain container is in the background
rainContainer.style.position = 'fixed';
rainContainer.style.top = '0';
rainContainer.style.left = '0';
if (!rainContainer) {
	console.error('Rain container not found!');
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
	
	// Random animation duration between 8s and 12s
	const duration = Math.random() * 2 + 4;
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
	// Keep creating new rain elements
	rainInterval = setInterval(createRainElement, 200);
}

// Stop creating rain
function stopRain() {
	if (rainInterval) {
		clearInterval(rainInterval);
		rainInterval = null;
	}
	// Clear existing elements
	rainContainer.innerHTML = '';
}

// Toggle rain on/off
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

// Start the rain effect immediately
startRain();
