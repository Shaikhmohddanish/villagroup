const counters = document.querySelectorAll('.counter');
const speed = 200;

const parseValue = valueString => {
    valueString = valueString.replace(/,/g, '');
    valueString = valueString.replace('+', '');

    if (valueString.endsWith('%')) {
        return parseFloat(valueString) / 100;
    } else {
        return parseFloat(valueString);
    }
};

const formatValue = (value, akhiValue) => {
    if (akhiValue.endsWith('%')) {
        return (value === 1 ? '100%' : Math.round(value * 100) + '%');
    } else {
        return Math.round(value).toLocaleString() + (akhiValue.includes('+') ? '+' : '');
    }
};

const animateCounter = (counter, targetValue) => {
    const step = targetValue / (speed / 16); // Update every 16ms (roughly 60fps)

    let currentValue = 0;
    const updateCounter = () => {
        currentValue = Math.min(currentValue + step, targetValue);
        counter.innerText = formatValue(
            currentValue,
            counter.getAttribute('akhi')
        );

        if (currentValue < targetValue) {
            requestAnimationFrame(updateCounter);
        }
    };

    updateCounter();
};

const startCounters = () => {
    counters.forEach(counter => {
        if (isElementInViewport(counter)) {
            const targetValue = parseValue(counter.getAttribute('akhi'));
            animateCounter(counter, targetValue);
        }
    });
};

const isElementInViewport = element => {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
};

window.addEventListener('scroll', startCounters);
startCounters(); // Initial check on page load
