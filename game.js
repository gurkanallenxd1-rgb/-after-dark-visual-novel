"use strict";

const get = (id) => document.getElementById(id);
const slots = { save: "after-dark.v1.save", settings: "after-dark.v1.settings" };
let state;

function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    get("status").textContent = "Tarayıcı depolamaya izin vermiyor. İlerlemen bu oturumda korunacak.";
    get("status").hidden = false;
  }
}

const cast = Object.keys(characters);
const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

function loadSave() {
  const save = read(slots.save);
  if (save?.version !== 1 || !own(story, save.node) ||
      !cast.every((id) => Number.isInteger(save.scores?.[id]) && save.scores[id] >= 0)) {
    return null;
  }
  return save;
}

const saved = read(slots.settings);
const settings = { large: saved?.large === true, art: saved?.art === true };
state = loadSave();

function applySettings() {
  document.body.classList.toggle("large", settings.large);
  get("large").checked = settings.large;
  get("art").checked = settings.art;
}

function imageLayer(path, fallback, stack, order) {
  const image = new Image();
  image.alt = "";
  image.style.zIndex = order;
  image.addEventListener("error", () => {
    const active = image.isConnected;
    image.remove();
    if (fallback && active) imageLayer(fallback, null, stack, order);
  }, { once: true });
  stack.append(image);
  image.src = path;
}

function renderPortrait(node) {
  const stack = get("portrait");
  stack.replaceChildren();
  stack.hidden = !node.who;
  if (!node.who) return;

  const placeholder = document.createElement("span");
  placeholder.textContent = characters[node.who].name[0];
  stack.append(placeholder);
  const root = `assets/${node.who}`;
  const base = `${root}.webp`;

  // Kıyafet katmanı, temel portreyle aynı boyutta şeffaf bir WebP olmalı.
  if (node.expression) imageLayer(`${root}-${node.expression}.webp`, base, stack, 1);
  else imageLayer(base, null, stack, 1);
  if (node.clothing) imageLayer(`${root}-${node.clothing}.webp`, null, stack, 2);
  if (settings.art && node.optionalArt) imageLayer(node.optionalArt, null, stack, 3);
}

function showMenu() {
  get("game").hidden = true;
  get("menu").hidden = false;
  get("resume").disabled = !state;
  get("title").focus();
}

function render() {
  const node = story[state.node];
  const person = characters[node.who];
  const lead = cast.find((id) => state.scores[id] > 0);
  get("menu").hidden = true;
  get("game").hidden = false;
  get("speaker").textContent = person ? `${person.name} · ${person.age}` :
    node.endings ? "Bölüm Sonu" : "Anlatıcı";
  const endings = state.scores[lead] > 1 ? node.endings : node.friendlyEndings;
  get("line").textContent = endings?.[lead] ?? node.text;
  get("relations").textContent = cast.map((id) =>
    `${characters[id].name} ${state.scores[id]}`).join("  ·  ");
  renderPortrait(node);

  const choices = get("choices");
  choices.replaceChildren();
  for (const choice of node.choices ?? []) {
    const button = document.createElement("button");
    button.textContent = choice.label;
    button.addEventListener("click", () => {
      if (choice.point) state.scores[choice.point] += 1;
      go(choice.to);
    });
    choices.append(button);
  }
  const next = get("next");
  next.hidden = Boolean(node.choices);
  next.firstChild.textContent = node.endings ? "Ana Menü " : "İlerle ";
  get("speaker").focus({ preventScroll: true });
}

function go(node) {
  state.node = node;
  write(slots.save, state);
  render();
}

get("new").addEventListener("click", () => {
  if (state && !window.confirm("Yeni oyun mevcut ilerlemenin üzerine yazacak. Başlamak istiyor musun?")) return;
  state = { version: 1, node: "start", scores: Object.fromEntries(cast.map((id) => [id, 0])) };
  go("start");
});
get("resume").addEventListener("click", render);
get("home").addEventListener("click", showMenu);
get("next").addEventListener("click", () => {
  const { next } = story[state.node];
  if (next) go(next);
  else showMenu();
});
get("settings").addEventListener("click", () => get("preferences").showModal());
for (const key of ["large", "art"]) {
  get(key).addEventListener("change", (event) => {
    settings[key] = event.target.checked;
    applySettings();
    write(slots.settings, settings);
  });
}

applySettings();
get("resume").disabled = !state;
