let bodyBG = document.body;
const themeSlider = document.getElementsByClassName('dark-mode-slider')[0];
let sliderThumb = document.getElementsByClassName('slider-thumb')[0];
let dashboardTitle = document.getElementsByClassName('dashboard-title')[0];
let hr = document.getElementsByTagName("hr")[0];
let titleSubtext = document.getElementsByClassName('title-subtext');
let overviewTitle = document.getElementsByClassName('overview-title')[0];
let topCardBG = document.getElementsByClassName("media-tile");
let bottomCardBG = document.getElementsByClassName("stats-tile");
let mediaAccount = document.getElementsByClassName("media-account");
let followerNumSubtext = document.getElementsByClassName("follower-num-subtext");
let statNum = document.getElementsByClassName("stat-num");
let mediaFollowers = document.getElementsByClassName("media-followers");
let statName = document.getElementsByClassName("stat-name");
let lightMode = document.getElementsByClassName("light-mode")[0];
let lightTheme = true;

let toDarkTheme = () => {
    moveThumbSlider = () => {
        let pos = 0;
        let id = setInterval(frame, 5);

        function frame() {
            if (pos == 35) {
                clearInterval(id);
            } else {
                pos++;
                sliderThumb.style.right = pos + 'px';
            }

        }
    }
    moveThumbSlider();
    bodyBG.style.backgroundColor = "var(--dark-theme-bg)";

    themeSlider.style.background = "var(--dark-theme-slider-gradient)";
    sliderThumb.style.backgroundColor = "var(--dark-theme-card-bg)";
    
    dashboardTitle.style.color = "var(--dark-theme-light-text)";
    overviewTitle.style.color = "var(--dark-theme-light-text)";
    
    lightMode.innerHTML = 'Dark Mode';

    hr.style.borderTop = "1px solid var(--dark-theme-dark-text)";
    
    Array.prototype.forEach.call(titleSubtext, (el) => {
        el.style.color = "var(--dark-theme-dark-text)";
    });
    Array.prototype.forEach.call(topCardBG, (el) => {
        el.style.backgroundColor = "var(--dark-theme-card-bg)";
    });
    Array.prototype.forEach.call(bottomCardBG, (el) => {
        el.style.backgroundColor = "var(--dark-theme-card-bg)";
    });
    Array.prototype.forEach.call(mediaAccount, (el) => {
        el.style.color = "var(--dark-theme-dark-text)";
    });
    Array.prototype.forEach.call(followerNumSubtext, (el) => {
        el.style.color = "var(--dark-theme-dark-text)";
    });
    Array.prototype.forEach.call(statName, (el) => {
        el.style.color = "var(--dark-theme-dark-text)";
    });
    Array.prototype.forEach.call(statNum, (el) => {
        el.style.color = "var(--dark-theme-light-text)";
    });
    Array.prototype.forEach.call(mediaFollowers, (el) => {
        el.style.color = "var(--dark-theme-light-text)";
    });

    lightTheme = false;
}

let toLightTheme = () => {
    moveThumbSliderRight = () => {
        let pos = 35;
        let id = setInterval(frame, 5);

        function frame() {
            if (pos == 4) {
                clearInterval(id);
            } else {
                pos--;
                sliderThumb.style.right = pos + 'px';
            }

        }
    }
    moveThumbSliderRight();
    bodyBG.style.backgroundColor = "var(--light-theme-bg)";

    themeSlider.style.background = "var(--light-theme-slider-bg)";
    sliderThumb.style.backgroundColor = "var(--light-theme-main-bg)";

    dashboardTitle.style.color = "var(--light-theme-dark-text)";
    overviewTitle.style.color = "var(--light-theme-light-text)";
    
    lightMode.innerHTML = 'Light Mode';

    hr.style.borderTop = "1px solid var(--light-theme-dark-text)";

    Array.prototype.forEach.call(titleSubtext, (el) => {
        el.style.color = "var(--light-theme-light-text)";
    });
    Array.prototype.forEach.call(topCardBG, (el) => {
        el.style.backgroundColor = "var(--light-theme-card-bg)";
    });
    Array.prototype.forEach.call(bottomCardBG, (el) => {
        el.style.backgroundColor = "var(--light-theme-card-bg)";
    });
    Array.prototype.forEach.call(mediaAccount, (el) => {
        el.style.color = "var(--light-theme-light-text)";
    });
    Array.prototype.forEach.call(followerNumSubtext, (el) => {
        el.style.color = "var(--light-theme-light-text)";
    });
    Array.prototype.forEach.call(statName, (el) => {
        el.style.color = "var(--light-theme-light-text)";
    });
    Array.prototype.forEach.call(statNum, (el) => {
        el.style.color = "var(--light-theme-dark-text)";
    });
    Array.prototype.forEach.call(mediaFollowers, (el) => {
        el.style.color = "var(--light-theme-dark-text)";
    });

    lightTheme = true;
}

switchColorTheme = () => {
    switch (lightTheme) {
        case true:
            toDarkTheme();
            lightTheme = false;
            break;
        case false:
            toLightTheme();
            lightTheme = true;
            break;
    }
}

themeSlider.onclick = switchColorTheme;