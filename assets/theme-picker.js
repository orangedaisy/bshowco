'use strict';

const themeButtons = document.querySelectorAll('.js-theme-controls button');

// save the current theme choice
const saveThemeChoice = theme => window.localStorage.setItem('theme-choice', theme);

// update the `body[data-ui-theme]` attribute to set the current theme
const updateTheme = theme => document.body.dataset.uiTheme = theme;

function resetDisabledButtons() {
    themeButtons.forEach(button => button.disabled = false)
}

function disableCurrentThemeButton(button) {
    resetDisabledButtons();
    button.disabled = true;
}

// check the user's storage and set the theme accordingly
if (window.localStorage.getItem('theme-choice') === null) {
    updateTheme('default');
    disableCurrentThemeButton(document.querySelector('[data-choice="default"]'));
} else {
    let currentThemeChoice = window.localStorage.getItem('theme-choice');
    updateTheme(currentThemeChoice);
    disableCurrentThemeButton(document.querySelector(`[data-choice="${currentThemeChoice}"]`));
}

// handle theme change
themeButtons.forEach(button => button.addEventListener('click', (e) => {
    e.preventDefault();
    disableCurrentThemeButton(e.currentTarget);
    let themeChoice = e.currentTarget.dataset.choice;
    saveThemeChoice(themeChoice);
    updateTheme(themeChoice);
}));
