import { readable } from 'svelte/store';

function requestPath(){
    let location = window.location.pathname;
    if( location === '/' ){
        location = 'home';
    }
    let endpoint = location + '.json';
    if( window.location.search !== '' ){
        endpoint += window.location.search;
    }
    return endpoint;
}

export function loadData( path = requestPath() ){
    return readable({}, writeStore => {
		writeStore( fetchApi( path, writeStore ) );
		return () => {};
	});
}

export async function fetchApi( path, writeStore ) {
	try {

        console.log(`fetch ${path}`);
        const request = window.location.origin + '/' + path;
        const response = await fetch( request );

        if(response.status === 200) {
            const data = await response.json();
            writeStore( data );
            return data;
        } else {
            const text = response.text();
            throw new Error(text);
        }

	} catch(error) {
        data.error = error;
        writeStore(data);
		return data;
    }
}
