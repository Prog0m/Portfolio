// Add projects here. Each item becomes a portfolio tab and updates the preview.
const projects = [
  { name: "Loaf & Dough", url: "https://prog0m.github.io/Loaf-and-Dough/", description: "A warm, inviting online home for a neighborhood bakery." },
  { name: "Art Plumbing", url: "https://prog0m.github.io/Art-plumbing/", description: "A clear, dependable web presence for a plumbing business." },
  { name: "Root & Range", url: "https://prog0m.github.io/Root-and-Range./", description: "A fresh digital showcase for Root & Range." }
];

const tabList = document.querySelector(".tabs");
const preview = document.querySelector("#preview");
const title = document.querySelector("#project-title");
const description = document.querySelector("#project-description");
const visit = document.querySelector("#visit-link");
const address = document.querySelector("#address");
const number = document.querySelector(".project-number");

function readableAddress(url) {
  return new URL(url).host + new URL(url).pathname.replace(/\/$/, "");
}

function selectProject(index) {
  const project = projects[index];
  document.querySelectorAll(".tab").forEach((tab, i) => {
    tab.setAttribute("aria-selected", String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  title.textContent = project.name;
  description.textContent = project.description;
  visit.href = project.url;
  address.textContent = readableAddress(project.url);
  number.textContent = String(index + 1).padStart(2, "0");
  preview.title = `${project.name} website preview`;
  preview.src = project.url;
}

projects.forEach((project, index) => {
  const tab = document.createElement("button");
  tab.className = "tab";
  tab.type = "button";
  tab.id = `project-tab-${index}`;
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-controls", "preview");
  tab.setAttribute("aria-selected", String(index === 0));
  tab.tabIndex = index === 0 ? 0 : -1;
  tab.textContent = project.name;
  tab.addEventListener("click", () => selectProject(index));
  tab.addEventListener("keydown", event => {
    if (!["ArrowRight", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + projects.length) % projects.length;
    tabList.children[next].focus();
    selectProject(next);
  });
  tabList.append(tab);
});
document.querySelector("#project-count").textContent = String(projects.length).padStart(2, "0");
document.querySelector("#year").textContent = new Date().getFullYear();
