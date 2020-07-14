import { readable } from 'svelte/store';

export function initialValue() {
	return {};
}

export function makeSiteStore() {
	// 1. Build the store and initialize it as empty and error free
	let initial = initialValue();
	let store = readable(initial, makeSubscribe(initial));
	return store;
}

function unsubscribe() {
	// Nothing to do in this case
}

function makeSubscribe(data) {
	return set => {
		fetchSiteData(data, set);
		return unsubscribe;
	};
}

async function fetchSiteData(data, set) {
	try {

    const response = await fetch( window.location.origin + '/index.json' );

	  if(response.status === 200) {
      const data = await response.json();
		  set(data);
		} else {
			const text = response.text();
			throw new Error(text);
    }

	} catch(error) {
		data.error = error;
		set(data);
	}
}
