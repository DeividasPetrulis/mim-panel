// Rocrail helpers
// ---- Topics ----
export const TOPIC = {
  client: "rocrail/service/client", // we send commands to Rocrail here
  info: "rocrail/service/info", // Rocrail reports layout changes here
  command: "rocrail/service/command", // Rocrail's commands to the hardware
  field: "rocrail/service/field", // hardware reports (sensors) to Rocrail
};

// ---- Reading XML ----
const parser = new DOMParser();

// Turn XML text into its top element, or null
export function parseXml(xml) {
  const doc = parser.parseFromString(xml, "application/xml");
  return doc.querySelector("parsererror") ? null : doc.documentElement;
}

// Convert all attributes of an element to an object:
export function attrs(el) {
  const out = {};
  for (const a of el.attributes) out[a.name] = a.value;
  return out;
}

// ---- Commands ----
export const requestPlan = () => '<model cmd="plan"/>';
// export const flipSwitch = (id) => `<sw id="${id}" cmd="flip"/>`;
