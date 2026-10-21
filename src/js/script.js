const html = document.querySelector("html");

const checkbox = document.querySelector("#dark");

checkbox.addEventListener('change', () => {
    html.classList.toggle("light-theme");
});