// Rocrail state: what we currently know about the layout
import { TOPIC, parseXml, attrs } from "./rocrail.js";

export const rocrailState = $state({
  online: false,
  power: null,
  title: "",
  locos: {},
  tracks: {},
  switches: {},
  sensors: {},
  blocks: {},
});

// Which list each kind of element belongs to
const LISTS = {
  lc: "locos",
  tk: "tracks",
  sw: "switches",
  fb: "sensors",
  bk: "blocks",
};

// the MQTT handler calls this for every rocrail message
export function handleRocrailMessage(topic, xml, retained) {
  updateOnline(topic, xml, retained);

  if (topic !== TOPIC.info) return;

  const el = parseXml(xml);
  if (!el) return;

  if (el.tagName in LISTS) updateItem(el);
  else if (el.tagName === "state") updateState(el);
  else if (el.tagName === "plan") updatePlan(el);
}

// ---- Updates ----

// Check if Rocrail is running. A new (not retained) message means it's online
function updateOnline(topic, xml, retained) {
  if (xml.includes('cmd="shutdown"')) {
    rocrailState.online = false;
  } else if (!retained && topic !== TOPIC.client) {
    rocrailState.online = true;
  }
}

// Update all of the lists with the contents of a new plan element
function updatePlan(el) {
  rocrailState.title = el.getAttribute("title") ?? "";

  for (const [tag, list] of Object.entries(LISTS)) {
    rocrailState[list] = {};
    for (const item of el.querySelectorAll(`${tag}list > ${tag}`)) {
      const a = attrs(item);
      rocrailState[list][a.id] = a;
    }
  }
}

// Merge one changed item into its list
function updateItem(el) {
  const a = attrs(el);
  if (!a.id) return;
  const list = LISTS[el.tagName];
  rocrailState[list][a.id] = { ...rocrailState[list][a.id], ...a };
}

// Update Rocrail's overall state (currently only using the power attribute)
function updateState(el) {
  if (el.hasAttribute("power")) {
    rocrailState.power = el.getAttribute("power") === "true";
  }
}