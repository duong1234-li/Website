const rainContainer = document.querySelector('.rain-container');
const snowToggle = document.getElementById('snow-toggle');

if (!rainContainer) {
	console.error('Rain container not found!');
}

let snowEnabled = true;
let snowInterval = null;

// Function to create a single snow element
function createSnowElement() {
	if (!snowEnabled) return;
	
	const snowElement = document.createElement('div');
	snowElement.style.position = 'absolute'; // Position element freely

	snowElement.innerHTML = '&#10022;'; // A star character
	snowElement.style.fontSize = `${Math.random() * 15 + 10}px`; // Random size
	snowElement.style.color = 'lightcoral';
	
	// Random horizontal position
	const xPos = Math.random() * window.innerWidth;
	snowElement.style.left = xPos + 'px';
	
	// Random animation duration between 8s and 12s
	const duration = Math.random() * 4 + 8;
	snowElement.style.animationDuration = duration + 's';
	
	// Start from just above the viewport
	snowElement.style.top = '-20px';
	
	rainContainer.appendChild(snowElement);
	
	// Animate to fall left
	snowElement.animate([
		{ transform: 'translate(0, 0)' },
		{ transform: `translate(-${window.innerWidth * 0.5}px, ${window.innerHeight + 50}px)` }
	], {
		duration: duration * 1000,
		easing: 'linear',
	});
	
	// Remove breeze element after animation completes
	setTimeout(() => {
		snowElement.remove();
	}, duration * 1000);
}

// Create snow elements continuously
function startSnow() {
	// Keep creating new snow elements
	snowInterval = setInterval(createSnowElement, 100);
}

// Stop creating snow
function stopSnow() {
	if (snowInterval) {
		clearInterval(snowInterval);
		snowInterval = null;
	}
	// Clear existing elements
	rainContainer.innerHTML = '';
}

// Toggle snow on/off
snowToggle.addEventListener('click', () => {
	snowEnabled = !snowEnabled;
	
	if (snowEnabled) {
		snowToggle.textContent = '🌨️ Disable Snow';
		snowToggle.classList.remove('disabled');
		startSnow();
	} else {
		snowToggle.textContent = '❌ Enable Snow';
		snowToggle.classList.add('disabled');
		stopSnow();
	}
});

// Start the snow effect immediately
startSnow();
