// This site is too small to warent separating out JS files

function circleText() {
    // src https://dev.to/jh3y/circular-text-with-css-57jf
    let halfCircleText = document.querySelectorAll(".half-circle-text");
    if (!!halfCircleText) {
        halfCircleText.forEach((el) => {
            const text = el.innerHTML;
            const chars = text.split('');
            const len = chars.length;
            const offsetNum = 3.2; // mess with this for different curves
            const innerAngle = (360 / len) / offsetNum;
            const radius = 1 / Math.sin(innerAngle / (180 / Math.PI));
            const halfCircleContainer = document.createElement("span");
            halfCircleContainer.classList.add("half-circle-visual-only");
            chars.forEach((c, index)=> {
                let char = document.createElement("span");
                char.innerHTML = c;
                let rotate = innerAngle * index;
                char.style.top = `${(offsetNum / 2 * 100 + (offsetNum * 10))}%`;
                char.style.left = "50%";
                char.style.position = "absolute";
                char.style.transform = "translate(-50%, -50%)";
                char.style.transform += `rotate(${(innerAngle * index) - (360 / offsetNum / 2 ) }deg)`
                char.style.transform += `translateY(${radius * -1}ch)`
                halfCircleContainer.appendChild(char);
            });

            el.innerHTML = "";
            
            // screen reader only
            const srOnly = document.createElement(el.tagName);
            srOnly.innerHTML = text;
            srOnly.classList.add("sr-only");
            el.parentElement.parentElement.insertBefore(srOnly, el.parentElement);

            halfCircleContainer.style.width = `${radius * 2}ch`;
            halfCircleContainer.style.height = `${(radius * 2) / offsetNum}ch`;
            halfCircleContainer.style.display = 'block';
            halfCircleContainer.style.position = 'relative';
            el.appendChild(halfCircleContainer);

            el.style.margin = "0";
            el.setAttribute("aria-hidden", "true");
        });
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    circleText();
});