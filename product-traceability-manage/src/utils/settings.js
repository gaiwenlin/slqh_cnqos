import store from './../store';

export function get (name) {
  return store.state.app.settings[name];
}

export function getBoolean (name) {
  const value = get(name);
  return value === 'true' || value === 'True';
}

export function getInt (name) {
  return parseInt(store.state.app.settings[name]);
}
