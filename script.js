const tumbler = document.getElementById('tumbler');
const screenOff = document.getElementById('screen-off');
const input = document.getElementById('terminal-input');
const cursor = document.getElementById('cursor');
const screen = document.getElementById('screen');
const screenProfile = document.getElementById('screen-profile');
const terminalText = document.getElementById('terminal-text');
const terminal = document.getElementById('terminal');
const terminalInput = document.getElementById('terminal-input');
const terminalCd = document.getElementById('terminal-cd');
const terminalTop = document.getElementById('terminal-top');
const commandText = document.getElementById('command-text');

// Adjust the input width dynamically
function adjustInputWidth() {
  const context = document.createElement('canvas').getContext('2d');
  context.font = getComputedStyle(input).font; // Match font styles
  const textWidth = context.measureText(input.value).width; // Measure text width
  input.style.width = textWidth > 0 ? `${textWidth + 2}px` : '0px'; // Dynamic width or 0
}

input.addEventListener('input', adjustInputWidth); // Adjust width on user input


// Automatically focus the input when the page is loaded or refreshed
window.addEventListener('load', () => {
  input.focus(); // Focus the input on page load
});

// Optional: Keep focusing the input if the user clicks outside
screen.addEventListener('click', () => {
  input.focus(); // Focus the input when clicking anywhere in the screen
});

// List of available commands for autofill
const availableCommands = ['open my-profile', 'open tetris', 'ls', 'clear']; // List of available commands


input.addEventListener('keydown', (event) => {

  if (event.key === 'Tab') {
    event.preventDefault(); // Prevent the default tab behavior (focus switch)

    const currentInput = input.value.trim(); // Get the current input value
    const words = currentInput.split(' '); // Split the input by spaces
    const lastWord = words[words.length - 1]; // Get the last word the user is typing

    // Find matching commands based on the current input
    const matchingCommands = availableCommands.filter(cmd => cmd.startsWith(currentInput));

    if (matchingCommands.length > 0) {
      const nextSuggestedWord = matchingCommands[0].split(' ')[words.length - 1]; // Get the next suggested word

      // Autofill the next word if available
      if (nextSuggestedWord && nextSuggestedWord.startsWith(lastWord)) {
        input.value = words.slice(0, -1).concat(nextSuggestedWord).join(' '); // Replace the last word with the suggestion
        adjustInputWidth(); // Adjust the input width after autofilling
      }
    }
  } 

  if (event.key === 'Enter') {
    const command = input.value.trim(); // Get the trimmed input value

    if (command === 'open my-profile' && terminalCd.style.display === 'flex') {
      // Hide the input field (remove cursor effect)
      cursor.style.display = 'none';
      terminalCd.style.display = 'none';
      terminalTop.style.display = 'none';

      // Replace the terminal content with centered loading text
      terminalText.innerHTML = `Loading my-profile<span id="loading-dots"></span>`;
    
      const loadingDots = document.getElementById('loading-dots');
      let dotCount = 0;

      // Animate the loading dots
      const loadingInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4; // Cycle through 0, 1, 2, 3
        loadingDots.textContent = '.'.repeat(dotCount);
      }, 200); // Change every 200ms

      // After a delay, show the new profile and stop the animation
      setTimeout(() => {
        clearInterval(loadingInterval); // Stop the dot animation
        screenProfile.style.display = 'flex'; // Show the hidden container
        screen.style.display = 'none'; // Hide the visible container
      }, 1500); // Wait for 1.5 seconds before transitioning
    } else {
      terminalTop.style.display = 'flex';
      terminalCd.style.display = 'flex';
      commandText.innerHTML = `${command}`;
      commandText.style.marginLeft = '7px';
      terminalCd.innerHTML = `<span>zsh: command not found: ${command}</span>`;
      terminalInput.style.width = '0px';
    }

    if (command === 'ls') {
      terminalTop.style.display = 'flex';
      commandText.innerHTML = `${command}`;
      commandText.style.marginLeft = '7px';
      terminalCd.style.display = 'flex';
      terminalCd.innerHTML = `<span>my-profile</span><span>tetris</span>`
      terminalInput.style.width = '0px';
    }

    if (command === 'clear' && terminalCd.style.display === 'flex') {
      terminalCd.style.display = 'none'; 
      terminalTop.style.display = 'none';
      terminalInput.style.width = '0px';
    }

    input.value = ''; // Clear the input for the next command
    adjustInputWidth();
  }
});


const toggleSwitch = document.getElementById('theme-toggle');
const inputText = document.getElementById('terminal-input');
const ulElements = document.getElementById('profile-nav');
const links = ulElements.querySelectorAll('a');
const linkedinIconLetter = document.getElementById('linkedin-path-letters');
const linkedinIconBackground = document.getElementById('linkedin-icon-background');
const githubIcon = document.getElementById('github-icon');
const terminalReturn = document.getElementById('terminal-return');
const htmlIcons = {
  bl: document.getElementById('html-path-bl'),
  br: document.getElementById('html-path-br'),
  ll: document.getElementById('html-path-ll'),
  lr: document.getElementById('html-path-lr')
};
const cssIcons = {
  bl: document.getElementById('css-path-bl'),
  br: document.getElementById('css-path-br'),
  ll: document.getElementById('css-path-ll'),
  lr: document.getElementById('css-path-lr')
};
const jsIcons = {
  bl: document.getElementById('js-path-bl'),
  br: document.getElementById('js-path-br'),
  ll: document.getElementById('js-path-ll'),
  lr: document.getElementById('js-path-lr')
};

const reactIcons = {
  circle: document.getElementById('react-circle'),
  ellipses: document.getElementById('react-ellipses')
};

// Function to apply theme
function applyTheme(isNightMode) {
  // Theme Colors
  const borderColor = isNightMode ? '#f9f8f3' : '#090909ca';
  const textColor = isNightMode ? '#f9f8f3' : '#090909ca';
  const bgHover = isNightMode ? '#f9f8f3' : '#090909ca';
  const textHover = isNightMode ? '#090909ca' : '#f9f8f3';

  // Apply Classes
  screen.classList.toggle('night-mode-screen', isNightMode);
  screen.classList.toggle('day-mode-screen', !isNightMode);
  screenProfile.classList.toggle('night-mode-screen', isNightMode);
  screenProfile.classList.toggle('day-mode-screen', !isNightMode);
  cursor.classList.toggle('day-mode-text', isNightMode);
  cursor.classList.toggle('night-mode-text', !isNightMode);
  inputText.classList.toggle('night-mode-text', isNightMode);
  inputText.classList.toggle('day-mode-text', !isNightMode);

  // Update Links
  links.forEach(link => {
    link.style.border = `2px solid ${borderColor}`;
    link.style.color = textColor;
  });

  // Icon Colors
  linkedinIconLetter.setAttribute('fill', isNightMode ? '#090909ca' : '#f9f8f3');
  linkedinIconBackground.setAttribute('fill', borderColor);
  githubIcon.setAttribute('fill', borderColor);

  // Terminal Return Styles
  terminalReturn.style.border = `2px solid ${borderColor}`;
  terminalReturn.style.color = textColor;

  // Icon Fill Colors
  updateIcons(htmlIcons, isNightMode);
  updateIcons(cssIcons, isNightMode);
  updateIcons(jsIcons, isNightMode);
  updateReactIcons(reactIcons, isNightMode);
}

// Function to update icon colors
function updateIcons(icons, isNightMode) {
  icons.bl.setAttribute('fill', isNightMode ? '#f9f8f3' : '#090909ca');
  icons.br.setAttribute('fill', isNightMode ? '#F3EEE3' : '#595959');
  icons.ll.setAttribute('fill', isNightMode ? '#090909ca' : '#f9f8f3ca');
  icons.lr.setAttribute('fill', isNightMode ? '#595959' : '#f9f8f3');
}

function updateReactIcons(icons, isNightMode) {
  icons.circle.setAttribute('fill', isNightMode ? '#f9f8f3' : '#090909ca');
  icons.ellipses.setAttribute('stroke', isNightMode ? '#f9f8f3' : '#090909ca');
}

// Function to add hover effect based on theme
function addHoverEffect(element) {
  element.addEventListener('mouseover', () => {
    if (toggleSwitch.checked) { // Night Mode
      element.style.backgroundColor = '#f9f8f3';
      element.style.color = '#090909ca';
      element.style.borderColor = '#f9f8f3';
    } else { // Day Mode
      element.style.backgroundColor = '#090909ca';
      element.style.color = '#f9f8f3';
      element.style.borderColor = '#090909ca';
    }
  });

  element.addEventListener('mouseout', () => {
    if (toggleSwitch.checked) { // Night Mode
      element.style.backgroundColor = '';
      element.style.color = '#f9f8f3';
      element.style.borderColor = '#f9f8f3';
    } else { // Day Mode
      element.style.backgroundColor = '';
      element.style.color = '#090909ca';
      element.style.borderColor = '#090909ca';
    }
  });
}

// Apply hover effect to all links and terminalReturn
links.forEach(link => addHoverEffect(link));
addHoverEffect(terminalReturn);

// Add event listener for theme toggle
toggleSwitch.addEventListener('change', () => {
  applyTheme(toggleSwitch.checked);
});
// Apply initial theme based on toggle state
applyTheme(toggleSwitch.checked);


const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#profile-nav a');

function showSection(targetId) {
  sections.forEach(section => {
    if(section.id === targetId) {
      section.style.display = 'flex';
    } else {
      section.style.display = 'none';
    }
  }); 
}

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetSection = link.getAttribute("data-section");
    showSection(targetSection);
  });
});

function resetProfileSections() {
  sections.forEach(section => {
    if (section.id === 'profile-introduction') {
      section.style.display = 'flex'; // Show introduction
    } else {
      section.style.display = 'none'; // Hide other sections
    }
  });
}

const powerOff = document.querySelector('.fa-power-off');

tumbler.addEventListener('click', () => {
  // Check if the screen is off
  if (screenOff.style.display === 'block') {
    // Turn the screen back on
    screenOff.style.display = 'none';
    screen.style.display = 'flex';
    
    // Restore the terminal text
    terminalText.innerHTML = 'frontend-dev@Nurbakyts-MBP ~ %';
    terminalInput.style.width = '0px';

    // Show the cursor
    cursor.style.display = 'block';

    powerOff.style.color = 'rgb(9, 187, 9)';
    powerOff.style.textShadow = '0px 0px 2px rgb(23, 225, 77)';
  } else {
    // Turn the screen off
    screen.style.display = 'none';
    screenProfile.style.display = 'none';
    screenOff.style.display = 'block';

    powerOff.style.color = 'rgb(229, 54, 54)';
    powerOff.style.textShadow = '0px 0px 2px rgb(255, 0, 0)';

    resetProfileSections();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  powerOff.style.color = 'rgb(9, 187, 9)';
  powerOff.style.textShadow = '0px 0px 2px rgb(23, 225, 77)';
});

terminalReturn.addEventListener('click', () => {
  // Check if the screen is off
  if (screenProfile.style.display === 'flex') {
    // Turn the screen back on
    screenProfile.style.display = 'none';
    screen.style.display = 'flex';
    terminalText.innerHTML = 'frontend-dev@Nurbakyts-MBP ~ %';
    cursor.style.display = 'block';

    resetProfileSections();
  }
});

// Ensure sections are reset on page load
document.addEventListener('DOMContentLoaded', resetProfileSections);