import { readable } from 'svelte/store';

export function loadData( url ){
    return readable({}, set => {
		set( fetchApi( url, set ) );
		return () => {};
	});
}

export async function fetchApi( url, set ) {
	try {

        const request = window.location.origin + '/' + url;
        const response = await fetch( request );

        if(response.status === 200) {
            const data = await response.json();
            set( data );
            return data;
        } else {
            const text = response.text();
            throw new Error(text);
        }

	} catch(error) {
        data.error = error;
        set(data);
		return data;
    }
}
