
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.23.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe,
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

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

    function loadData( path = requestPath() ){
        return readable({}, writeStore => {
    		writeStore( fetchApi( path, writeStore ) );
    		return () => {};
    	});
    }

    async function fetchApi( path, writeStore ) {
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

    /* src/components/Image.svelte generated by Svelte v3.23.2 */
    const file = "src/components/Image.svelte";

    function create_fragment(ctx) {
    	let div;
    	let t;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = space();
    			img = element("img");
    			add_location(div, file, 23, 0, 351);
    			attr_dev(img, "alt", /*alt*/ ctx[1]);
    			attr_dev(img, "width", /*width*/ ctx[0]);
    			attr_dev(img, "height", /*height*/ ctx[5]);
    			attr_dev(img, "class", "lazyload");
    			if (img.src !== (img_src_value = /*placeholder*/ ctx[2])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "data-src", /*src*/ ctx[3]);
    			attr_dev(img, "data-srcset", /*srcset*/ ctx[4]);
    			add_location(img, file, 25, 0, 384);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			/*div_binding*/ ctx[8](div);
    			insert_dev(target, t, anchor);
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*alt*/ 2) {
    				attr_dev(img, "alt", /*alt*/ ctx[1]);
    			}

    			if (dirty & /*width*/ 1) {
    				attr_dev(img, "width", /*width*/ ctx[0]);
    			}

    			if (dirty & /*height*/ 32) {
    				attr_dev(img, "height", /*height*/ ctx[5]);
    			}

    			if (dirty & /*placeholder*/ 4 && img.src !== (img_src_value = /*placeholder*/ ctx[2])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*src*/ 8) {
    				attr_dev(img, "data-src", /*src*/ ctx[3]);
    			}

    			if (dirty & /*srcset*/ 16) {
    				attr_dev(img, "data-srcset", /*srcset*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*div_binding*/ ctx[8](null);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { alt = "Herbert.gd" } = $$props;
    	let { placeholder = "" } = $$props;
    	let { src = "" } = $$props;
    	let { srcset = "" } = $$props;
    	let { ratio = 1 } = $$props;
    	let { width = "100%" } = $$props;
    	let height = "10vw";
    	let element;

    	onMount(() => {
    		$$invalidate(0, width = element.offsetWidth);
    		$$invalidate(5, height = Math.floor(width * ratio));
    	});

    	const writable_props = ["alt", "placeholder", "src", "srcset", "ratio", "width"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Image", $$slots, []);

    	function div_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			element = $$value;
    			$$invalidate(6, element);
    		});
    	}

    	$$self.$set = $$props => {
    		if ("alt" in $$props) $$invalidate(1, alt = $$props.alt);
    		if ("placeholder" in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ("src" in $$props) $$invalidate(3, src = $$props.src);
    		if ("srcset" in $$props) $$invalidate(4, srcset = $$props.srcset);
    		if ("ratio" in $$props) $$invalidate(7, ratio = $$props.ratio);
    		if ("width" in $$props) $$invalidate(0, width = $$props.width);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		alt,
    		placeholder,
    		src,
    		srcset,
    		ratio,
    		width,
    		height,
    		element
    	});

    	$$self.$inject_state = $$props => {
    		if ("alt" in $$props) $$invalidate(1, alt = $$props.alt);
    		if ("placeholder" in $$props) $$invalidate(2, placeholder = $$props.placeholder);
    		if ("src" in $$props) $$invalidate(3, src = $$props.src);
    		if ("srcset" in $$props) $$invalidate(4, srcset = $$props.srcset);
    		if ("ratio" in $$props) $$invalidate(7, ratio = $$props.ratio);
    		if ("width" in $$props) $$invalidate(0, width = $$props.width);
    		if ("height" in $$props) $$invalidate(5, height = $$props.height);
    		if ("element" in $$props) $$invalidate(6, element = $$props.element);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [width, alt, placeholder, src, srcset, height, element, ratio, div_binding];
    }

    class Image extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			alt: 1,
    			placeholder: 2,
    			src: 3,
    			srcset: 4,
    			ratio: 7,
    			width: 0
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get alt() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alt(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get src() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set src(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get srcset() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set srcset(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ratio() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ratio(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/GridItem.svelte generated by Svelte v3.23.2 */
    const file$1 = "src/components/GridItem.svelte";

    // (30:2) {#if 'image' in item}
    function create_if_block(ctx) {
    	let figure;
    	let image;
    	let current;
    	const image_spread_levels = [/*item*/ ctx[0].image];
    	let image_props = {};

    	for (let i = 0; i < image_spread_levels.length; i += 1) {
    		image_props = assign(image_props, image_spread_levels[i]);
    	}

    	image = new Image({ props: image_props, $$inline: true });

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			create_component(image.$$.fragment);
    			attr_dev(figure, "class", "video");
    			add_location(figure, file$1, 30, 3, 549);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			mount_component(image, figure, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const image_changes = (dirty & /*item*/ 1)
    			? get_spread_update(image_spread_levels, [get_spread_object(/*item*/ ctx[0].image)])
    			: {};

    			image.$set(image_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(image.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(image.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
    			destroy_component(image);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(30:2) {#if 'image' in item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let li;
    	let a;
    	let t0;
    	let div;
    	let h3;
    	let t1_value = /*item*/ ctx[0].title + "";
    	let t1;
    	let t2;
    	let h4;
    	let t3_value = /*item*/ ctx[0].subtitle + "";
    	let t3;
    	let a_href_value;
    	let li_class_value;
    	let current;
    	let if_block = "image" in /*item*/ ctx[0] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			if (if_block) if_block.c();
    			t0 = space();
    			div = element("div");
    			h3 = element("h3");
    			t1 = text(t1_value);
    			t2 = space();
    			h4 = element("h4");
    			t3 = text(t3_value);
    			add_location(h3, file$1, 36, 3, 648);
    			add_location(h4, file$1, 37, 3, 673);
    			attr_dev(div, "class", "title");
    			add_location(div, file$1, 35, 2, 625);
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[0].href);
    			add_location(a, file$1, 27, 1, 498);
    			attr_dev(li, "class", li_class_value = "item " + /*orientation*/ ctx[2]);
    			toggle_class(li, "hide", !/*show*/ ctx[1]);
    			add_location(li, file$1, 26, 0, 446);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			if (if_block) if_block.m(a, null);
    			append_dev(a, t0);
    			append_dev(a, div);
    			append_dev(div, h3);
    			append_dev(h3, t1);
    			append_dev(div, t2);
    			append_dev(div, h4);
    			append_dev(h4, t3);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ("image" in /*item*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*item*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(a, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if ((!current || dirty & /*item*/ 1) && t1_value !== (t1_value = /*item*/ ctx[0].title + "")) set_data_dev(t1, t1_value);
    			if ((!current || dirty & /*item*/ 1) && t3_value !== (t3_value = /*item*/ ctx[0].subtitle + "")) set_data_dev(t3, t3_value);

    			if (!current || dirty & /*item*/ 1 && a_href_value !== (a_href_value = /*item*/ ctx[0].href)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (!current || dirty & /*orientation*/ 4 && li_class_value !== (li_class_value = "item " + /*orientation*/ ctx[2])) {
    				attr_dev(li, "class", li_class_value);
    			}

    			if (dirty & /*orientation, show*/ 6) {
    				toggle_class(li, "hide", !/*show*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { item = {} } = $$props;
    	let { filter = false } = $$props;
    	let show = true;

    	afterUpdate(() => {
    		if (filter === false) {
    			$$invalidate(1, show = true);
    		} else {
    			$$invalidate(1, show = item.categories.includes(filter));
    		}
    	});

    	let orientation = "";

    	if ("image" in item) {
    		if ("ratio" in item.image) {
    			orientation = item.image.ratio < 1 ? "landscape" : "portrait";
    		}
    	}

    	const writable_props = ["item", "filter"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<GridItem> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("GridItem", $$slots, []);

    	$$self.$set = $$props => {
    		if ("item" in $$props) $$invalidate(0, item = $$props.item);
    		if ("filter" in $$props) $$invalidate(3, filter = $$props.filter);
    	};

    	$$self.$capture_state = () => ({
    		afterUpdate,
    		Image,
    		item,
    		filter,
    		show,
    		orientation
    	});

    	$$self.$inject_state = $$props => {
    		if ("item" in $$props) $$invalidate(0, item = $$props.item);
    		if ("filter" in $$props) $$invalidate(3, filter = $$props.filter);
    		if ("show" in $$props) $$invalidate(1, show = $$props.show);
    		if ("orientation" in $$props) $$invalidate(2, orientation = $$props.orientation);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [item, show, orientation, filter];
    }

    class GridItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { item: 0, filter: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GridItem",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get item() {
    		throw new Error("<GridItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<GridItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get filter() {
    		throw new Error("<GridItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set filter(value) {
    		throw new Error("<GridItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/ListItem.svelte generated by Svelte v3.23.2 */
    const file$2 = "src/components/ListItem.svelte";

    // (36:2) {#if 'image' in item}
    function create_if_block$1(ctx) {
    	let figure;
    	let image;
    	let current;
    	const image_spread_levels = [/*item*/ ctx[0].image];
    	let image_props = {};

    	for (let i = 0; i < image_spread_levels.length; i += 1) {
    		image_props = assign(image_props, image_spread_levels[i]);
    	}

    	image = new Image({ props: image_props, $$inline: true });

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			create_component(image.$$.fragment);
    			attr_dev(figure, "class", "video");
    			add_location(figure, file$2, 36, 3, 635);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			mount_component(image, figure, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const image_changes = (dirty & /*item*/ 1)
    			? get_spread_update(image_spread_levels, [get_spread_object(/*item*/ ctx[0].image)])
    			: {};

    			image.$set(image_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(image.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(image.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
    			destroy_component(image);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(36:2) {#if 'image' in item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let li;
    	let a;
    	let div;
    	let h3;
    	let t0_value = /*item*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let h4;
    	let t2_value = /*item*/ ctx[0].subtitle + "";
    	let t2;
    	let t3;
    	let a_href_value;
    	let li_class_value;
    	let current;
    	let if_block = "image" in /*item*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			div = element("div");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			h4 = element("h4");
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block) if_block.c();
    			add_location(h3, file$2, 31, 3, 548);
    			add_location(h4, file$2, 32, 3, 573);
    			attr_dev(div, "class", "title");
    			add_location(div, file$2, 30, 2, 525);
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[0].href);
    			add_location(a, file$2, 27, 1, 498);
    			attr_dev(li, "class", li_class_value = "item " + /*orientation*/ ctx[2]);
    			toggle_class(li, "hide", !/*show*/ ctx[1]);
    			add_location(li, file$2, 26, 0, 446);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, div);
    			append_dev(div, h3);
    			append_dev(h3, t0);
    			append_dev(div, t1);
    			append_dev(div, h4);
    			append_dev(h4, t2);
    			append_dev(a, t3);
    			if (if_block) if_block.m(a, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*item*/ 1) && t0_value !== (t0_value = /*item*/ ctx[0].title + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*item*/ 1) && t2_value !== (t2_value = /*item*/ ctx[0].subtitle + "")) set_data_dev(t2, t2_value);

    			if ("image" in /*item*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*item*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(a, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*item*/ 1 && a_href_value !== (a_href_value = /*item*/ ctx[0].href)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (!current || dirty & /*orientation*/ 4 && li_class_value !== (li_class_value = "item " + /*orientation*/ ctx[2])) {
    				attr_dev(li, "class", li_class_value);
    			}

    			if (dirty & /*orientation, show*/ 6) {
    				toggle_class(li, "hide", !/*show*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { item = {} } = $$props;
    	let { filter = false } = $$props;
    	let show = true;

    	afterUpdate(() => {
    		if (filter === false) {
    			$$invalidate(1, show = true);
    		} else {
    			$$invalidate(1, show = item.categories.includes(filter));
    		}
    	});

    	let orientation = "";

    	if ("image" in item) {
    		if ("ratio" in item.image) {
    			orientation = item.image.ratio < 1 ? "landscape" : "portrait";
    		}
    	}

    	const writable_props = ["item", "filter"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ListItem> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("ListItem", $$slots, []);

    	$$self.$set = $$props => {
    		if ("item" in $$props) $$invalidate(0, item = $$props.item);
    		if ("filter" in $$props) $$invalidate(3, filter = $$props.filter);
    	};

    	$$self.$capture_state = () => ({
    		afterUpdate,
    		Image,
    		item,
    		filter,
    		show,
    		orientation
    	});

    	$$self.$inject_state = $$props => {
    		if ("item" in $$props) $$invalidate(0, item = $$props.item);
    		if ("filter" in $$props) $$invalidate(3, filter = $$props.filter);
    		if ("show" in $$props) $$invalidate(1, show = $$props.show);
    		if ("orientation" in $$props) $$invalidate(2, orientation = $$props.orientation);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [item, show, orientation, filter];
    }

    class ListItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { item: 0, filter: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListItem",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get item() {
    		throw new Error("<ListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<ListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get filter() {
    		throw new Error("<ListItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set filter(value) {
    		throw new Error("<ListItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Posts.svelte generated by Svelte v3.23.2 */

    const { Object: Object_1 } = globals;
    const file$3 = "src/components/Posts.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i][0];
    	child_ctx[11] = list[i][1];
    	return child_ctx;
    }

    // (61:1) {:else}
    function create_else_block(ctx) {
    	let h3;

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "No posts found";
    			attr_dev(h3, "class", "error");
    			add_location(h3, file$3, 61, 2, 1261);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(61:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (35:1) {#if posts.length > 0}
    function create_if_block$2(ctx) {
    	let div;
    	let ul;
    	let t;
    	let ol;
    	let ol_class_value;
    	let current;
    	let each_value_1 = Object.entries(/*categories*/ ctx[2]);
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*posts*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "keywords filters");
    			add_location(ul, file$3, 38, 3, 641);
    			attr_dev(div, "class", "result-options");
    			add_location(div, file$3, 36, 2, 608);
    			attr_dev(ol, "class", ol_class_value = "container " + /*layout*/ ctx[0]);
    			add_location(ol, file$3, 54, 2, 1110);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, ul);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(ul, null);
    			}

    			insert_dev(target, t, anchor);
    			insert_dev(target, ol, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*setFilter, Object, categories, filter*/ 44) {
    				each_value_1 = Object.entries(/*categories*/ ctx[2]);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*layouts, layout, posts, filter*/ 27) {
    				each_value = /*posts*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ol, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*layout*/ 1 && ol_class_value !== (ol_class_value = "container " + /*layout*/ ctx[0])) {
    				attr_dev(ol, "class", ol_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(ol);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(35:1) {#if posts.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (40:4) {#each Object.entries(categories) as [category, count]}
    function create_each_block_1(ctx) {
    	let li;
    	let button;
    	let t0_value = /*category*/ ctx[10] + "";
    	let t0;
    	let span;
    	let t1_value = /*count*/ ctx[11] + "";
    	let t1;
    	let button_title_value;
    	let t2;
    	let mounted;
    	let dispose;

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[6](/*category*/ ctx[10], ...args);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			button = element("button");
    			t0 = text(t0_value);
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(span, "class", "count");
    			add_location(span, file$3, 41, 90, 868);
    			attr_dev(button, "title", button_title_value = "Filter by " + /*category*/ ctx[10]);
    			toggle_class(button, "active", /*filter*/ ctx[3] === /*category*/ ctx[10]);
    			add_location(button, file$3, 41, 6, 784);
    			add_location(li, file$3, 40, 5, 736);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, button);
    			append_dev(button, t0);
    			append_dev(button, span);
    			append_dev(span, t1);
    			append_dev(li, t2);

    			if (!mounted) {
    				dispose = listen_dev(li, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*categories*/ 4 && t0_value !== (t0_value = /*category*/ ctx[10] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*categories*/ 4 && t1_value !== (t1_value = /*count*/ ctx[11] + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*categories*/ 4 && button_title_value !== (button_title_value = "Filter by " + /*category*/ ctx[10])) {
    				attr_dev(button, "title", button_title_value);
    			}

    			if (dirty & /*filter, Object, categories*/ 12) {
    				toggle_class(button, "active", /*filter*/ ctx[3] === /*category*/ ctx[10]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(40:4) {#each Object.entries(categories) as [category, count]}",
    		ctx
    	});

    	return block;
    }

    // (56:3) {#each posts as item}
    function create_each_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*layouts*/ ctx[4][/*layout*/ ctx[0]];

    	function switch_props(ctx) {
    		return {
    			props: {
    				item: /*item*/ ctx[7],
    				filter: /*filter*/ ctx[3]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*posts*/ 2) switch_instance_changes.item = /*item*/ ctx[7];
    			if (dirty & /*filter*/ 8) switch_instance_changes.filter = /*filter*/ ctx[3];

    			if (switch_value !== (switch_value = /*layouts*/ ctx[4][/*layout*/ ctx[0]])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(56:3) {#each posts as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let section;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*posts*/ ctx[1].length > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			if_block.c();
    			attr_dev(section, "class", "posts");
    			add_location(section, file$3, 33, 0, 557);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			if_blocks[current_block_type_index].m(section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				}

    				transition_in(if_block, 1);
    				if_block.m(section, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let layouts = { grid: GridItem, list: ListItem };
    	let { layout = "grid" } = $$props;
    	let { posts = [] } = $$props;
    	let categories = {};

    	for (let post of posts) {
    		if (!("categories" in post)) {
    			continue;
    		}

    		for (let category of post.categories) {
    			if (!(category in categories)) {
    				categories[category] = 0;
    			}

    			categories[category]++;
    		}
    	}

    	let filter = false;

    	function setFilter(set) {
    		$$invalidate(3, filter = filter === set ? false : set);
    	}

    	const writable_props = ["layout", "posts"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Posts> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Posts", $$slots, []);
    	const click_handler = category => setFilter(category);

    	$$self.$set = $$props => {
    		if ("layout" in $$props) $$invalidate(0, layout = $$props.layout);
    		if ("posts" in $$props) $$invalidate(1, posts = $$props.posts);
    	};

    	$$self.$capture_state = () => ({
    		GridItem,
    		ListItem,
    		layouts,
    		layout,
    		posts,
    		categories,
    		filter,
    		setFilter
    	});

    	$$self.$inject_state = $$props => {
    		if ("layouts" in $$props) $$invalidate(4, layouts = $$props.layouts);
    		if ("layout" in $$props) $$invalidate(0, layout = $$props.layout);
    		if ("posts" in $$props) $$invalidate(1, posts = $$props.posts);
    		if ("categories" in $$props) $$invalidate(2, categories = $$props.categories);
    		if ("filter" in $$props) $$invalidate(3, filter = $$props.filter);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [layout, posts, categories, filter, layouts, setFilter, click_handler];
    }

    class Posts extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { layout: 0, posts: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Posts",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get layout() {
    		throw new Error("<Posts>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set layout(value) {
    		throw new Error("<Posts>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get posts() {
    		throw new Error("<Posts>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set posts(value) {
    		throw new Error("<Posts>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.23.2 */

    const { console: console_1 } = globals;

    // (22:0) {#if data.posts}
    function create_if_block$3(ctx) {
    	let posts;
    	let current;

    	posts = new Posts({
    			props: { posts: /*data*/ ctx[0].posts },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(posts.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(posts, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const posts_changes = {};
    			if (dirty & /*data*/ 1) posts_changes.posts = /*data*/ ctx[0].posts;
    			posts.$set(posts_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(posts.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(posts.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(posts, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(22:0) {#if data.posts}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*data*/ ctx[0].posts && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*data*/ ctx[0].posts) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*data*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let dataStore = loadData();
    	let data = {};

    	let unsubscribeDataStore = dataStore.subscribe(update => {
    		if (update.data) {
    			$$invalidate(0, data = update.data);
    			console.log(data);
    		}
    	});

    	onDestroy(() => {
    		unsubscribeDataStore = null;
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$capture_state = () => ({
    		onDestroy,
    		loadData,
    		Posts,
    		dataStore,
    		data,
    		unsubscribeDataStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("dataStore" in $$props) dataStore = $$props.dataStore;
    		if ("data" in $$props) $$invalidate(0, data = $$props.data);
    		if ("unsubscribeDataStore" in $$props) unsubscribeDataStore = $$props.unsubscribeDataStore;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const app = new App({
    	target: document.getElementById('frontend')
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
