
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
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
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
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
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
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(anchor = null) {
            this.a = anchor;
            this.e = this.n = null;
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.h(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
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
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
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
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.23.2 */

    function create_fragment(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 32) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
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
    	let $base;
    	let $location;
    	let $routes;
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, "routes");
    	component_subscribe($$self, routes, value => $$invalidate(10, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(9, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, "base");
    	component_subscribe($$self, base, value => $$invalidate(8, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ["basepath", "url"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Router", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate(4, url = $$props.url);
    		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$base,
    		$location,
    		$routes
    	});

    	$$self.$inject_state = $$props => {
    		if ("basepath" in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ("url" in $$props) $$invalidate(4, url = $$props.url);
    		if ("hasActiveRoute" in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 256) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			 {
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 1536) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			 {
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [routes, location, base, basepath, url, $$scope, $$slots];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.23.2 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 2,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[1],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
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
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
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
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope, routeParams, $location*/ 530) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[9], dirty, get_default_slot_changes, get_default_slot_context);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[1],
    		/*routeProps*/ ctx[2]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
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
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 22)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 2 && get_spread_object(/*routeParams*/ ctx[1]),
    					dirty & /*routeProps*/ 4 && get_spread_object(/*routeProps*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
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
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[3] !== null && /*$activeRoute*/ ctx[3].route === /*route*/ ctx[7] && create_if_block(ctx);

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
    			if (/*$activeRoute*/ ctx[3] !== null && /*$activeRoute*/ ctx[3].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 8) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
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
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, "activeRoute");
    	component_subscribe($$self, activeRoute, value => $$invalidate(3, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Route", $$slots, ['default']);

    	$$self.$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ("path" in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ("component" in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ("path" in $$props) $$invalidate(8, path = $$new_props.path);
    		if ("component" in $$props) $$invalidate(0, component = $$new_props.component);
    		if ("routeParams" in $$props) $$invalidate(1, routeParams = $$new_props.routeParams);
    		if ("routeProps" in $$props) $$invalidate(2, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 8) {
    			 if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(1, routeParams = $activeRoute.params);
    			}
    		}

    		 {
    			const { path, component, ...rest } = $$props;
    			$$invalidate(2, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		$$slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.23.2 */
    const file = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$2(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*$$slots*/ ctx[11].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file, 40, 0, 1185);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1024) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[10], dirty, null, null);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*href*/ 1 && { href: /*href*/ ctx[0] },
    				dirty & /*ariaCurrent*/ 4 && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
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
    	let $base;
    	let $location;
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, "base");
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, "location");
    	component_subscribe($$self, location, value => $$invalidate(15, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	const writable_props = ["to", "replace", "state", "getProps"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Link> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Link", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("to" in $$props) $$invalidate(6, to = $$props.to);
    		if ("replace" in $$props) $$invalidate(7, replace = $$props.replace);
    		if ("state" in $$props) $$invalidate(8, state = $$props.state);
    		if ("getProps" in $$props) $$invalidate(9, getProps = $$props.getProps);
    		if ("$$scope" in $$props) $$invalidate(10, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		$base,
    		$location,
    		ariaCurrent
    	});

    	$$self.$inject_state = $$props => {
    		if ("to" in $$props) $$invalidate(6, to = $$props.to);
    		if ("replace" in $$props) $$invalidate(7, replace = $$props.replace);
    		if ("state" in $$props) $$invalidate(8, state = $$props.state);
    		if ("getProps" in $$props) $$invalidate(9, getProps = $$props.getProps);
    		if ("href" in $$props) $$invalidate(0, href = $$props.href);
    		if ("isPartiallyCurrent" in $$props) $$invalidate(12, isPartiallyCurrent = $$props.isPartiallyCurrent);
    		if ("isCurrent" in $$props) $$invalidate(13, isCurrent = $$props.isCurrent);
    		if ("props" in $$props) $$invalidate(1, props = $$props.props);
    		if ("ariaCurrent" in $$props) $$invalidate(2, ariaCurrent = $$props.ariaCurrent);
    	};

    	let ariaCurrent;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16448) {
    			 $$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 32769) {
    			 $$invalidate(12, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 32769) {
    			 $$invalidate(13, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 8192) {
    			 $$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 45569) {
    			 $$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		to,
    		replace,
    		state,
    		getProps,
    		$$scope,
    		$$slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { to: 6, replace: 7, state: 8, getProps: 9 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Item.svelte generated by Svelte v3.23.2 */

    const file$1 = "src/components/Item.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (18:2) {#if 'image' in post}
    function create_if_block_1$1(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*post*/ ctx[0].image.type === "video") return create_if_block_2;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(18:2) {#if 'image' in post}",
    		ctx
    	});

    	return block;
    }

    // (23:3) {:else}
    function create_else_block$1(ctx) {
    	let figure;
    	let div;
    	let raw_value = /*post*/ ctx[0].image.html + "";
    	let figure_class_value;

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			div = element("div");
    			attr_dev(div, "class", "image");
    			add_location(div, file$1, 24, 5, 455);
    			attr_dev(figure, "class", figure_class_value = /*post*/ ctx[0].image.orientation);
    			add_location(figure, file$1, 23, 4, 408);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			append_dev(figure, div);
    			div.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && raw_value !== (raw_value = /*post*/ ctx[0].image.html + "")) div.innerHTML = raw_value;
    			if (dirty & /*post*/ 1 && figure_class_value !== (figure_class_value = /*post*/ ctx[0].image.orientation)) {
    				attr_dev(figure, "class", figure_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(23:3) {:else}",
    		ctx
    	});

    	return block;
    }

    // (19:3) {#if post.image.type === 'video'}
    function create_if_block_2(ctx) {
    	let figure;
    	let raw_value = /*post*/ ctx[0].image.html + "";

    	const block = {
    		c: function create() {
    			figure = element("figure");
    			attr_dev(figure, "class", "video");
    			add_location(figure, file$1, 19, 4, 327);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure, anchor);
    			figure.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && raw_value !== (raw_value = /*post*/ ctx[0].image.html + "")) figure.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(19:3) {#if post.image.type === 'video'}",
    		ctx
    	});

    	return block;
    }

    // (36:4) {#if post.subtitle}
    function create_if_block$1(ctx) {
    	let h4;
    	let t_value = /*post*/ ctx[0].subtitle + "";
    	let t;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			t = text(t_value);
    			attr_dev(h4, "class", "subline");
    			add_location(h4, file$1, 36, 5, 665);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			append_dev(h4, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && t_value !== (t_value = /*post*/ ctx[0].subtitle + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(36:4) {#if post.subtitle}",
    		ctx
    	});

    	return block;
    }

    // (45:6) {#each post.categories as category}
    function create_each_block(ctx) {
    	let li;
    	let t_value = /*category*/ ctx[3] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			add_location(li, file$1, 45, 7, 838);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && t_value !== (t_value = /*category*/ ctx[3] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(45:6) {#each post.categories as category}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let li;
    	let a;
    	let t0;
    	let div4;
    	let div0;
    	let h3;
    	let t1_value = /*post*/ ctx[0].title + "";
    	let t1;
    	let t2;
    	let t3;
    	let div3;
    	let div1;
    	let ul;
    	let t4;
    	let div2;
    	let t5_value = /*post*/ ctx[0].date + "";
    	let t5;
    	let a_href_value;
    	let if_block0 = "image" in /*post*/ ctx[0] && create_if_block_1$1(ctx);
    	let if_block1 = /*post*/ ctx[0].subtitle && create_if_block$1(ctx);
    	let each_value = /*post*/ ctx[0].categories;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div4 = element("div");
    			div0 = element("div");
    			h3 = element("h3");
    			t1 = text(t1_value);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			div3 = element("div");
    			div1 = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			div2 = element("div");
    			t5 = text(t5_value);
    			attr_dev(h3, "class", "headline");
    			add_location(h3, file$1, 34, 4, 597);
    			attr_dev(div0, "class", "title");
    			add_location(div0, file$1, 33, 3, 573);
    			add_location(ul, file$1, 43, 5, 784);
    			attr_dev(div1, "class", "categories");
    			add_location(div1, file$1, 42, 4, 754);
    			attr_dev(div2, "class", "date");
    			add_location(div2, file$1, 50, 4, 899);
    			attr_dev(div3, "class", "meta");
    			add_location(div3, file$1, 40, 3, 730);
    			attr_dev(div4, "class", "info");
    			add_location(div4, file$1, 31, 2, 550);
    			attr_dev(a, "href", a_href_value = /*post*/ ctx[0].href);
    			add_location(a, file$1, 15, 1, 238);
    			attr_dev(li, "class", /*orientation*/ ctx[2]);
    			toggle_class(li, "hide", !/*show*/ ctx[1]);
    			add_location(li, file$1, 14, 0, 191);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			if (if_block0) if_block0.m(a, null);
    			append_dev(a, t0);
    			append_dev(a, div4);
    			append_dev(div4, div0);
    			append_dev(div0, h3);
    			append_dev(h3, t1);
    			append_dev(div0, t2);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div4, t3);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, t5);
    		},
    		p: function update(ctx, [dirty]) {
    			if ("image" in /*post*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(a, t0);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*post*/ 1 && t1_value !== (t1_value = /*post*/ ctx[0].title + "")) set_data_dev(t1, t1_value);

    			if (/*post*/ ctx[0].subtitle) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$1(ctx);
    					if_block1.c();
    					if_block1.m(div0, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*post*/ 1) {
    				each_value = /*post*/ ctx[0].categories;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*post*/ 1 && t5_value !== (t5_value = /*post*/ ctx[0].date + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*post*/ 1 && a_href_value !== (a_href_value = /*post*/ ctx[0].href)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*orientation*/ 4) {
    				attr_dev(li, "class", /*orientation*/ ctx[2]);
    			}

    			if (dirty & /*orientation, show*/ 6) {
    				toggle_class(li, "hide", !/*show*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_each(each_blocks, detaching);
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
    	let { post = {} } = $$props;
    	let { show = true } = $$props;
    	let orientation = "";

    	if ("image" in post) {
    		if ("orientation" in post.image) {
    			orientation = post.image.orientation;
    		}
    	}

    	const writable_props = ["post", "show"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Item> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Item", $$slots, []);

    	$$self.$set = $$props => {
    		if ("post" in $$props) $$invalidate(0, post = $$props.post);
    		if ("show" in $$props) $$invalidate(1, show = $$props.show);
    	};

    	$$self.$capture_state = () => ({ post, show, orientation });

    	$$self.$inject_state = $$props => {
    		if ("post" in $$props) $$invalidate(0, post = $$props.post);
    		if ("show" in $$props) $$invalidate(1, show = $$props.show);
    		if ("orientation" in $$props) $$invalidate(2, orientation = $$props.orientation);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [post, show, orientation];
    }

    class Item extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { post: 0, show: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Item",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get post() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set post(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get show() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set show(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Count.svelte generated by Svelte v3.23.2 */

    const file$2 = "src/components/Count.svelte";

    // (7:0) {#if count > 0 }
    function create_if_block$2(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*count*/ ctx[0]);
    			attr_dev(span, "class", "count");
    			add_location(span, file$2, 7, 1, 62);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*count*/ 1) set_data_dev(t, /*count*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(7:0) {#if count > 0 }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let if_block_anchor;
    	let if_block = /*count*/ ctx[0] > 0 && create_if_block$2(ctx);

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
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*count*/ ctx[0] > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
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
    	let { count = 0 } = $$props;
    	const writable_props = ["count"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Count> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Count", $$slots, []);

    	$$self.$set = $$props => {
    		if ("count" in $$props) $$invalidate(0, count = $$props.count);
    	};

    	$$self.$capture_state = () => ({ count });

    	$$self.$inject_state = $$props => {
    		if ("count" in $$props) $$invalidate(0, count = $$props.count);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [count];
    }

    class Count extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { count: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Count",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get count() {
    		throw new Error("<Count>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set count(value) {
    		throw new Error("<Count>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/List.svelte generated by Svelte v3.23.2 */

    const { Object: Object_1 } = globals;
    const file$3 = "src/components/List.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (42:0) {#if posts.length > 0}
    function create_if_block$3(ctx) {
    	let div0;
    	let ul;
    	let t;
    	let div1;
    	let ol;
    	let ol_class_value;
    	let current;
    	let each_value_1 = Object.keys(/*categories*/ ctx[3]);
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*posts*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();
    			div1 = element("div");
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "keywords filters");
    			add_location(ul, file$3, 45, 2, 635);
    			attr_dev(div0, "class", "result-options");
    			add_location(div0, file$3, 43, 1, 603);
    			attr_dev(ol, "class", ol_class_value = /*setLayout*/ ctx[4](/*layout*/ ctx[1]));
    			add_location(ol, file$3, 56, 2, 981);
    			attr_dev(div1, "class", "list-wrapper");
    			add_location(div1, file$3, 55, 1, 952);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, ul);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(ul, null);
    			}

    			insert_dev(target, t, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, ol);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*filter, Object, categories, setFilter*/ 44) {
    				each_value_1 = Object.keys(/*categories*/ ctx[3]);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*posts, filter*/ 5) {
    				each_value = /*posts*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ol, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*layout*/ 2 && ol_class_value !== (ol_class_value = /*setLayout*/ ctx[4](/*layout*/ ctx[1]))) {
    				attr_dev(ol, "class", ol_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(42:0) {#if posts.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (47:3) {#each Object.keys(categories) as category}
    function create_each_block_1(ctx) {
    	let li;
    	let button;
    	let t0_value = /*category*/ ctx[11] + "";
    	let t0;
    	let count;
    	let button_title_value;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;

    	count = new Count({
    			props: {
    				count: /*categories*/ ctx[3][/*category*/ ctx[11]]
    			},
    			$$inline: true
    		});

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[6](/*category*/ ctx[11], ...args);
    	}

    	const block = {
    		c: function create() {
    			li = element("li");
    			button = element("button");
    			t0 = text(t0_value);
    			create_component(count.$$.fragment);
    			t1 = space();
    			attr_dev(button, "title", button_title_value = "Filter by " + /*category*/ ctx[11]);
    			add_location(button, file$3, 48, 5, 817);
    			attr_dev(li, "class", "keyword");
    			toggle_class(li, "active", /*filter*/ ctx[2] === /*category*/ ctx[11]);
    			add_location(li, file$3, 47, 4, 716);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, button);
    			append_dev(button, t0);
    			mount_component(count, button, null);
    			append_dev(li, t1);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(li, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*categories*/ 8) && t0_value !== (t0_value = /*category*/ ctx[11] + "")) set_data_dev(t0, t0_value);
    			const count_changes = {};
    			if (dirty & /*categories*/ 8) count_changes.count = /*categories*/ ctx[3][/*category*/ ctx[11]];
    			count.$set(count_changes);

    			if (!current || dirty & /*categories*/ 8 && button_title_value !== (button_title_value = "Filter by " + /*category*/ ctx[11])) {
    				attr_dev(button, "title", button_title_value);
    			}

    			if (dirty & /*filter, Object, categories*/ 12) {
    				toggle_class(li, "active", /*filter*/ ctx[2] === /*category*/ ctx[11]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(count.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(count.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(count);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(47:3) {#each Object.keys(categories) as category}",
    		ctx
    	});

    	return block;
    }

    // (58:3) {#each posts as post}
    function create_each_block$1(ctx) {
    	let item;
    	let current;

    	item = new Item({
    			props: {
    				post: /*post*/ ctx[8],
    				show: /*filter*/ ctx[2] === false || /*post*/ ctx[8].categories.includes(/*filter*/ ctx[2])
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(item.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(item, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const item_changes = {};
    			if (dirty & /*posts*/ 1) item_changes.post = /*post*/ ctx[8];
    			if (dirty & /*filter, posts*/ 5) item_changes.show = /*filter*/ ctx[2] === false || /*post*/ ctx[8].categories.includes(/*filter*/ ctx[2]);
    			item.$set(item_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(item.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(item.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(item, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(58:3) {#each posts as post}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*posts*/ ctx[0].length > 0 && create_if_block$3(ctx);

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
    			if (/*posts*/ ctx[0].length > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*posts*/ 1) {
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
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { posts = [] } = $$props;
    	let { layout = "list" } = $$props;
    	let layoutOptions = { list: "List", grid: "Grid" };

    	function setLayout(set) {
    		if (set in layoutOptions) {
    			return set;
    		}

    		return "grid";
    	}

    	let filter = false;
    	let categories = {};

    	for (let post of posts) {
    		for (let cat of post.categories) {
    			if (!(cat in categories)) {
    				categories[cat] = 0;
    			}

    			categories[cat]++;
    		}
    	}

    	function setFilter(set) {
    		if (filter === set) {
    			$$invalidate(2, filter = false);
    		} else {
    			$$invalidate(2, filter = set);
    		}
    	}

    	const writable_props = ["posts", "layout"];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<List> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("List", $$slots, []);
    	const click_handler = category => setFilter(category);

    	$$self.$set = $$props => {
    		if ("posts" in $$props) $$invalidate(0, posts = $$props.posts);
    		if ("layout" in $$props) $$invalidate(1, layout = $$props.layout);
    	};

    	$$self.$capture_state = () => ({
    		Item,
    		Count,
    		posts,
    		layout,
    		layoutOptions,
    		setLayout,
    		filter,
    		categories,
    		setFilter
    	});

    	$$self.$inject_state = $$props => {
    		if ("posts" in $$props) $$invalidate(0, posts = $$props.posts);
    		if ("layout" in $$props) $$invalidate(1, layout = $$props.layout);
    		if ("layoutOptions" in $$props) layoutOptions = $$props.layoutOptions;
    		if ("filter" in $$props) $$invalidate(2, filter = $$props.filter);
    		if ("categories" in $$props) $$invalidate(3, categories = $$props.categories);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [posts, layout, filter, categories, setLayout, setFilter, click_handler];
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { posts: 0, layout: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "List",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get posts() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set posts(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get layout() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set layout(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Text.svelte generated by Svelte v3.23.2 */

    const file$4 = "src/components/Text.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let p;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			if (default_slot) default_slot.c();
    			add_location(p, file$4, 1, 4, 23);
    			attr_dev(div, "class", "text");
    			add_location(div, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Text> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Text", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class Text extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Text",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/routes/Channel.svelte generated by Svelte v3.23.2 */

    const { console: console_1 } = globals;
    const file$5 = "src/routes/Channel.svelte";

    // (19:4) {#if channel.description}
    function create_if_block$4(ctx) {
    	let text_1;
    	let current;

    	text_1 = new Text({
    			props: {
    				large: true,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope, channel*/ 18) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(19:4) {#if channel.description}",
    		ctx
    	});

    	return block;
    }

    // (20:8) <Text large={true}>
    function create_default_slot(ctx) {
    	let html_tag;
    	let raw_value = /*channel*/ ctx[1].description + "";

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(null);
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*channel*/ 2 && raw_value !== (raw_value = /*channel*/ ctx[1].description + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(20:8) <Text large={true}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let header;
    	let t;
    	let section;
    	let list;
    	let current;
    	let if_block = /*channel*/ ctx[1].description && create_if_block$4(ctx);

    	list = new List({
    			props: { posts: /*posts*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			if (if_block) if_block.c();
    			t = space();
    			section = element("section");
    			create_component(list.$$.fragment);
    			attr_dev(header, "class", "content svelte-pyvirl");
    			add_location(header, file$5, 16, 0, 252);
    			attr_dev(section, "class", "posts svelte-pyvirl");
    			add_location(section, file$5, 26, 0, 412);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			if (if_block) if_block.m(header, null);
    			insert_dev(target, t, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(list, section, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*channel*/ ctx[1].description) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*channel*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(header, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const list_changes = {};
    			if (dirty & /*posts*/ 1) list_changes.posts = /*posts*/ ctx[0];
    			list.$set(list_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(list.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(list.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (if_block) if_block.d();
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(section);
    			destroy_component(list);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { channels } = $$props;
    	let { slug } = $$props;
    	let { posts } = $$props;
    	console.log(posts);
    	const writable_props = ["channels", "slug", "posts"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Channel> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Channel", $$slots, []);

    	$$self.$set = $$props => {
    		if ("channels" in $$props) $$invalidate(2, channels = $$props.channels);
    		if ("slug" in $$props) $$invalidate(3, slug = $$props.slug);
    		if ("posts" in $$props) $$invalidate(0, posts = $$props.posts);
    	};

    	$$self.$capture_state = () => ({
    		List,
    		Text,
    		channels,
    		slug,
    		posts,
    		channel
    	});

    	$$self.$inject_state = $$props => {
    		if ("channels" in $$props) $$invalidate(2, channels = $$props.channels);
    		if ("slug" in $$props) $$invalidate(3, slug = $$props.slug);
    		if ("posts" in $$props) $$invalidate(0, posts = $$props.posts);
    		if ("channel" in $$props) $$invalidate(1, channel = $$props.channel);
    	};

    	let channel;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*channels, slug*/ 12) {
    			 $$invalidate(1, channel = channels.find(c => c.href === slug));
    		}
    	};

    	return [posts, channel, channels, slug];
    }

    class Channel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { channels: 2, slug: 3, posts: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Channel",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*channels*/ ctx[2] === undefined && !("channels" in props)) {
    			console_1.warn("<Channel> was created without expected prop 'channels'");
    		}

    		if (/*slug*/ ctx[3] === undefined && !("slug" in props)) {
    			console_1.warn("<Channel> was created without expected prop 'slug'");
    		}

    		if (/*posts*/ ctx[0] === undefined && !("posts" in props)) {
    			console_1.warn("<Channel> was created without expected prop 'posts'");
    		}
    	}

    	get channels() {
    		throw new Error("<Channel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set channels(value) {
    		throw new Error("<Channel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get slug() {
    		throw new Error("<Channel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slug(value) {
    		throw new Error("<Channel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get posts() {
    		throw new Error("<Channel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set posts(value) {
    		throw new Error("<Channel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Headline.svelte generated by Svelte v3.23.2 */

    const file$6 = "src/components/Headline.svelte";

    function create_fragment$8(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "headline");
    			add_location(div, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Headline> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Headline", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, $$slots];
    }

    class Headline extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Headline",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/Figure.svelte generated by Svelte v3.23.2 */

    const file$7 = "src/components/Figure.svelte";

    function create_fragment$9(ctx) {
    	let figure_1;
    	let raw_value = /*figure*/ ctx[0].image + "";

    	const block = {
    		c: function create() {
    			figure_1 = element("figure");
    			add_location(figure_1, file$7, 4, 0, 39);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, figure_1, anchor);
    			figure_1.innerHTML = raw_value;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*figure*/ 1 && raw_value !== (raw_value = /*figure*/ ctx[0].image + "")) figure_1.innerHTML = raw_value;		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(figure_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { figure } = $$props;
    	const writable_props = ["figure"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Figure> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Figure", $$slots, []);

    	$$self.$set = $$props => {
    		if ("figure" in $$props) $$invalidate(0, figure = $$props.figure);
    	};

    	$$self.$capture_state = () => ({ figure });

    	$$self.$inject_state = $$props => {
    		if ("figure" in $$props) $$invalidate(0, figure = $$props.figure);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [figure];
    }

    class Figure extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { figure: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Figure",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*figure*/ ctx[0] === undefined && !("figure" in props)) {
    			console.warn("<Figure> was created without expected prop 'figure'");
    		}
    	}

    	get figure() {
    		throw new Error("<Figure>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set figure(value) {
    		throw new Error("<Figure>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Person.svelte generated by Svelte v3.23.2 */
    const file$8 = "src/components/Person.svelte";

    // (12:4) {#if 'image' in person}
    function create_if_block$5(ctx) {
    	let figure;
    	let current;

    	figure = new Figure({
    			props: { figure: /*person*/ ctx[0].image },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(figure.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(figure, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const figure_changes = {};
    			if (dirty & /*person*/ 1) figure_changes.figure = /*person*/ ctx[0].image;
    			figure.$set(figure_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(figure.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(figure.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(figure, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(12:4) {#if 'image' in person}",
    		ctx
    	});

    	return block;
    }

    // (16:4) <Headline>
    function create_default_slot_1(ctx) {
    	let h2;
    	let raw_value = /*person*/ ctx[0].name + "";

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			add_location(h2, file$8, 15, 14, 270);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			h2.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*person*/ 1 && raw_value !== (raw_value = /*person*/ ctx[0].name + "")) h2.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(16:4) <Headline>",
    		ctx
    	});

    	return block;
    }

    // (18:4) <Text>
    function create_default_slot$1(ctx) {
    	let html_tag;
    	let raw_value = /*person*/ ctx[0].description + "";

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(null);
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*person*/ 1 && raw_value !== (raw_value = /*person*/ ctx[0].description + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(18:4) <Text>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let li;
    	let t0;
    	let headline;
    	let t1;
    	let text_1;
    	let current;
    	let if_block = "image" in /*person*/ ctx[0] && create_if_block$5(ctx);

    	headline = new Headline({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	text_1 = new Text({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (if_block) if_block.c();
    			t0 = space();
    			create_component(headline.$$.fragment);
    			t1 = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(li, "class", "person");
    			add_location(li, file$8, 9, 0, 155);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if (if_block) if_block.m(li, null);
    			append_dev(li, t0);
    			mount_component(headline, li, null);
    			append_dev(li, t1);
    			mount_component(text_1, li, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ("image" in /*person*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*person*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(li, t0);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const headline_changes = {};

    			if (dirty & /*$$scope, person*/ 3) {
    				headline_changes.$$scope = { dirty, ctx };
    			}

    			headline.$set(headline_changes);
    			const text_1_changes = {};

    			if (dirty & /*$$scope, person*/ 3) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(headline.$$.fragment, local);
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(headline.$$.fragment, local);
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    			destroy_component(headline);
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { person } = $$props;
    	const writable_props = ["person"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Person> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Person", $$slots, []);

    	$$self.$set = $$props => {
    		if ("person" in $$props) $$invalidate(0, person = $$props.person);
    	};

    	$$self.$capture_state = () => ({ Headline, Text, Figure, person });

    	$$self.$inject_state = $$props => {
    		if ("person" in $$props) $$invalidate(0, person = $$props.person);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [person];
    }

    class Person extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { person: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Person",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*person*/ ctx[0] === undefined && !("person" in props)) {
    			console.warn("<Person> was created without expected prop 'person'");
    		}
    	}

    	get person() {
    		throw new Error("<Person>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set person(value) {
    		throw new Error("<Person>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Info.svelte generated by Svelte v3.23.2 */
    const file$9 = "src/routes/Info.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (12:4) {#if info.description}
    function create_if_block_1$2(ctx) {
    	let text_1;
    	let current;

    	text_1 = new Text({
    			props: {
    				large: true,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};

    			if (dirty & /*$$scope, info*/ 17) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(12:4) {#if info.description}",
    		ctx
    	});

    	return block;
    }

    // (13:8) <Text large={true}>
    function create_default_slot$2(ctx) {
    	let html_tag;
    	let raw_value = /*info*/ ctx[0].description + "";

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(null);
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*info*/ 1 && raw_value !== (raw_value = /*info*/ ctx[0].description + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(13:8) <Text large={true}>",
    		ctx
    	});

    	return block;
    }

    // (24:0) {#if 'team' in info}
    function create_if_block$6(ctx) {
    	let section;
    	let ul;
    	let current;
    	let each_value = /*info*/ ctx[0].team;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "svelte-139hq86");
    			add_location(ul, file$9, 25, 8, 413);
    			attr_dev(section, "class", "team svelte-139hq86");
    			add_location(section, file$9, 24, 4, 382);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*info*/ 1) {
    				each_value = /*info*/ ctx[0].team;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
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
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(24:0) {#if 'team' in info}",
    		ctx
    	});

    	return block;
    }

    // (27:12) {#each info.team as person}
    function create_each_block$2(ctx) {
    	let person;
    	let current;

    	person = new Person({
    			props: { person: /*person*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(person.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(person, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const person_changes = {};
    			if (dirty & /*info*/ 1) person_changes.person = /*person*/ ctx[1];
    			person.$set(person_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(person.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(person.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(person, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(27:12) {#each info.team as person}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let header;
    	let t0;
    	let ul;
    	let li;
    	let t2;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*info*/ ctx[0].description && create_if_block_1$2(ctx);
    	let if_block1 = "team" in /*info*/ ctx[0] && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			header = element("header");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			ul = element("ul");
    			li = element("li");
    			li.textContent = "Keywords";
    			t2 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			add_location(li, file$9, 18, 8, 317);
    			attr_dev(ul, "class", "keywords");
    			add_location(ul, file$9, 17, 4, 287);
    			attr_dev(header, "class", "content svelte-139hq86");
    			add_location(header, file$9, 9, 0, 140);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			if (if_block0) if_block0.m(header, null);
    			append_dev(header, t0);
    			append_dev(header, ul);
    			append_dev(ul, li);
    			insert_dev(target, t2, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*info*/ ctx[0].description) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*info*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(header, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if ("team" in /*info*/ ctx[0]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*info*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$6(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			if (if_block0) if_block0.d();
    			if (detaching) detach_dev(t2);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { info } = $$props;
    	const writable_props = ["info"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Info> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Info", $$slots, []);

    	$$self.$set = $$props => {
    		if ("info" in $$props) $$invalidate(0, info = $$props.info);
    	};

    	$$self.$capture_state = () => ({ Person, Text, info });

    	$$self.$inject_state = $$props => {
    		if ("info" in $$props) $$invalidate(0, info = $$props.info);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [info];
    }

    class Info extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { info: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Info",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*info*/ ctx[0] === undefined && !("info" in props)) {
    			console.warn("<Info> was created without expected prop 'info'");
    		}
    	}

    	get info() {
    		throw new Error("<Info>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set info(value) {
    		throw new Error("<Info>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Keywords.svelte generated by Svelte v3.23.2 */

    const file$a = "src/components/Keywords.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (8:1) {#each keywords as keyword}
    function create_each_block$3(ctx) {
    	let li;
    	let button;
    	let t0_value = /*keyword*/ ctx[1] + "";
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			li = element("li");
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			add_location(button, file$a, 10, 3, 110);
    			add_location(li, file$a, 9, 2, 102);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, button);
    			append_dev(button, t0);
    			append_dev(li, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*keywords*/ 1 && t0_value !== (t0_value = /*keyword*/ ctx[1] + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(8:1) {#each keywords as keyword}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let ul;
    	let each_value = /*keywords*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "keywords");
    			add_location(ul, file$a, 6, 0, 48);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*keywords*/ 1) {
    				each_value = /*keywords*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { keywords = [] } = $$props;
    	const writable_props = ["keywords"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Keywords> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Keywords", $$slots, []);

    	$$self.$set = $$props => {
    		if ("keywords" in $$props) $$invalidate(0, keywords = $$props.keywords);
    	};

    	$$self.$capture_state = () => ({ keywords });

    	$$self.$inject_state = $$props => {
    		if ("keywords" in $$props) $$invalidate(0, keywords = $$props.keywords);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [keywords];
    }

    class Keywords extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { keywords: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Keywords",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get keywords() {
    		throw new Error("<Keywords>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set keywords(value) {
    		throw new Error("<Keywords>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function loadData( url ){
        return readable({}, set => {
    		set( fetchApi( url, set ) );
    		return () => {};
    	});
    }

    async function fetchApi( url, set ) {
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

    /* src/routes/Post.svelte generated by Svelte v3.23.2 */

    const { console: console_1$1 } = globals;
    const file$b = "src/routes/Post.svelte";

    // (27:0) {#if post.data}
    function create_if_block$7(ctx) {
    	let header;
    	let headline0;
    	let t0;
    	let section;
    	let div0;
    	let headline1;
    	let t1;
    	let t2;
    	let div1;
    	let text_1;
    	let current;

    	headline0 = new Headline({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	headline1 = new Headline({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = "keywords" in /*post*/ ctx[0].data && create_if_block_1$3(ctx);

    	text_1 = new Text({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			create_component(headline0.$$.fragment);
    			t0 = text("\n\n    Gallery\n\n    ");
    			section = element("section");
    			div0 = element("div");
    			create_component(headline1.$$.fragment);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			div1 = element("div");
    			create_component(text_1.$$.fragment);
    			add_location(header, file$b, 28, 4, 528);
    			attr_dev(div0, "class", "left");
    			add_location(div0, file$b, 40, 8, 787);
    			attr_dev(div1, "class", "right");
    			add_location(div1, file$b, 54, 8, 1158);
    			attr_dev(section, "class", "content");
    			add_location(section, file$b, 39, 4, 753);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			mount_component(headline0, header, null);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			mount_component(headline1, div0, null);
    			append_dev(div0, t1);
    			if (if_block) if_block.m(div0, null);
    			append_dev(section, t2);
    			append_dev(section, div1);
    			mount_component(text_1, div1, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const headline0_changes = {};

    			if (dirty & /*$$scope, post*/ 17) {
    				headline0_changes.$$scope = { dirty, ctx };
    			}

    			headline0.$set(headline0_changes);
    			const headline1_changes = {};

    			if (dirty & /*$$scope, post*/ 17) {
    				headline1_changes.$$scope = { dirty, ctx };
    			}

    			headline1.$set(headline1_changes);

    			if ("keywords" in /*post*/ ctx[0].data) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*post*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block_1$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div0, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}

    			const text_1_changes = {};

    			if (dirty & /*$$scope, post*/ 17) {
    				text_1_changes.$$scope = { dirty, ctx };
    			}

    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(headline0.$$.fragment, local);
    			transition_in(headline1.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(headline0.$$.fragment, local);
    			transition_out(headline1.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(headline0);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(headline1);
    			if (if_block) if_block.d();
    			destroy_component(text_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(27:0) {#if post.data}",
    		ctx
    	});

    	return block;
    }

    // (32:12) {#if 'subtitle' in post.data}
    function create_if_block_3(ctx) {
    	let h2;
    	let t_value = /*post*/ ctx[0].data.subtitle + "";
    	let t;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t = text(t_value);
    			add_location(h2, file$b, 32, 16, 653);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && t_value !== (t_value = /*post*/ ctx[0].data.subtitle + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(32:12) {#if 'subtitle' in post.data}",
    		ctx
    	});

    	return block;
    }

    // (30:8) <Headline>
    function create_default_slot_2(ctx) {
    	let h1;
    	let t0_value = /*post*/ ctx[0].data.title + "";
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let if_block = "subtitle" in /*post*/ ctx[0].data && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			add_location(h1, file$b, 30, 12, 568);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && t0_value !== (t0_value = /*post*/ ctx[0].data.title + "")) set_data_dev(t0, t0_value);

    			if ("subtitle" in /*post*/ ctx[0].data) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(30:8) <Headline>",
    		ctx
    	});

    	return block;
    }

    // (45:16) {#if 'subtitle' in post.data}
    function create_if_block_2$1(ctx) {
    	let h2;
    	let t_value = /*post*/ ctx[0].data.subtitle + "";
    	let t;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t = text(t_value);
    			add_location(h2, file$b, 45, 20, 939);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && t_value !== (t_value = /*post*/ ctx[0].data.subtitle + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(45:16) {#if 'subtitle' in post.data}",
    		ctx
    	});

    	return block;
    }

    // (43:12) <Headline>
    function create_default_slot_1$1(ctx) {
    	let h1;
    	let t0_value = /*post*/ ctx[0].data.title + "";
    	let t0;
    	let t1;
    	let if_block_anchor;
    	let if_block = "subtitle" in /*post*/ ctx[0].data && create_if_block_2$1(ctx);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			add_location(h1, file$b, 43, 16, 846);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			insert_dev(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && t0_value !== (t0_value = /*post*/ ctx[0].data.title + "")) set_data_dev(t0, t0_value);

    			if ("subtitle" in /*post*/ ctx[0].data) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(43:12) <Headline>",
    		ctx
    	});

    	return block;
    }

    // (50:12) {#if 'keywords' in post.data}
    function create_if_block_1$3(ctx) {
    	let keywords;
    	let current;

    	keywords = new Keywords({
    			props: { keywords: /*post*/ ctx[0].data.keywords },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(keywords.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(keywords, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const keywords_changes = {};
    			if (dirty & /*post*/ 1) keywords_changes.keywords = /*post*/ ctx[0].data.keywords;
    			keywords.$set(keywords_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(keywords.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(keywords.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(keywords, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(50:12) {#if 'keywords' in post.data}",
    		ctx
    	});

    	return block;
    }

    // (56:12) <Text>
    function create_default_slot$3(ctx) {
    	let html_tag;
    	let raw_value = /*post*/ ctx[0].data.content + "";

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(null);
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*post*/ 1 && raw_value !== (raw_value = /*post*/ ctx[0].data.content + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(56:12) <Text>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*post*/ ctx[0].data && create_if_block$7(ctx);

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
    			if (/*post*/ ctx[0].data) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*post*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$7(ctx);
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
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { slug } = $$props;

    	/* posts */
    	let postStore = loadData(`${slug}.json`);

    	let post;

    	let unsubscribePostStore = postStore.subscribe(data => {
    		$$invalidate(0, post = data);
    		console.log(data);
    	});

    	onDestroy(() => {
    		unsubscribePostStore = null;
    	});

    	const writable_props = ["slug"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1$1.warn(`<Post> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Post", $$slots, []);

    	$$self.$set = $$props => {
    		if ("slug" in $$props) $$invalidate(1, slug = $$props.slug);
    	};

    	$$self.$capture_state = () => ({
    		Headline,
    		Text,
    		Keywords,
    		loadData,
    		onDestroy,
    		slug,
    		postStore,
    		post,
    		unsubscribePostStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("slug" in $$props) $$invalidate(1, slug = $$props.slug);
    		if ("postStore" in $$props) postStore = $$props.postStore;
    		if ("post" in $$props) $$invalidate(0, post = $$props.post);
    		if ("unsubscribePostStore" in $$props) unsubscribePostStore = $$props.unsubscribePostStore;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [post, slug];
    }

    class Post extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { slug: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Post",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*slug*/ ctx[1] === undefined && !("slug" in props)) {
    			console_1$1.warn("<Post> was created without expected prop 'slug'");
    		}
    	}

    	get slug() {
    		throw new Error("<Post>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slug(value) {
    		throw new Error("<Post>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Header.svelte generated by Svelte v3.23.2 */
    const file$c = "src/components/Header.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (11:4) <Link to="/">
    function create_default_slot_2$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (img.src !== (img_src_value = /*site*/ ctx[0].logo)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Herbert.gd Logo");
    			add_location(img, file$c, 11, 6, 173);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*site*/ 1 && img.src !== (img_src_value = /*site*/ ctx[0].logo)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(11:4) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (20:12) <Link to="{channel.href}">
    function create_default_slot_1$2(ctx) {
    	let t0_value = /*channel*/ ctx[1].title + "";
    	let t0;
    	let span;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			span = element("span");
    			span.textContent = "15";
    			attr_dev(span, "class", "count");
    			add_location(span, file$c, 20, 29, 397);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*site*/ 1 && t0_value !== (t0_value = /*channel*/ ctx[1].title + "")) set_data_dev(t0, t0_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(20:12) <Link to=\\\"{channel.href}\\\">",
    		ctx
    	});

    	return block;
    }

    // (17:8) {#each site.channels as channel}
    function create_each_block$4(ctx) {
    	let li;
    	let link;
    	let current;

    	link = new Link({
    			props: {
    				to: /*channel*/ ctx[1].href,
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			add_location(li, file$c, 18, 10, 324);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(link, li, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};
    			if (dirty & /*site*/ 1) link_changes.to = /*channel*/ ctx[1].href;

    			if (dirty & /*$$scope, site*/ 17) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(17:8) {#each site.channels as channel}",
    		ctx
    	});

    	return block;
    }

    // (26:8) {#if site.info }
    function create_if_block$8(ctx) {
    	let li;
    	let link;
    	let current;

    	link = new Link({
    			props: {
    				to: /*site*/ ctx[0].info.href,
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			add_location(li, file$c, 27, 10, 516);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(link, li, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};
    			if (dirty & /*site*/ 1) link_changes.to = /*site*/ ctx[0].info.href;

    			if (dirty & /*$$scope, site*/ 17) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(26:8) {#if site.info }",
    		ctx
    	});

    	return block;
    }

    // (29:12) <Link to="{site.info.href}">
    function create_default_slot$4(ctx) {
    	let t_value = /*site*/ ctx[0].info.title + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*site*/ 1 && t_value !== (t_value = /*site*/ ctx[0].info.title + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(29:12) <Link to=\\\"{site.info.href}\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let header;
    	let div;
    	let link;
    	let t0;
    	let nav;
    	let ol;
    	let t1;
    	let current;

    	link = new Link({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*site*/ ctx[0].channels;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let if_block = /*site*/ ctx[0].info && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			header = element("header");
    			div = element("div");
    			create_component(link.$$.fragment);
    			t0 = space();
    			nav = element("nav");
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			if (if_block) if_block.c();
    			attr_dev(ol, "class", "channels");
    			add_location(ol, file$c, 15, 6, 250);
    			add_location(nav, file$c, 14, 4, 238);
    			attr_dev(div, "class", "container svelte-1ixyo7u");
    			add_location(div, file$c, 8, 2, 124);
    			attr_dev(header, "class", "site-header svelte-1ixyo7u");
    			add_location(header, file$c, 7, 0, 93);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div);
    			mount_component(link, div, null);
    			append_dev(div, t0);
    			append_dev(div, nav);
    			append_dev(nav, ol);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}

    			append_dev(ol, t1);
    			if (if_block) if_block.m(ol, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link_changes = {};

    			if (dirty & /*$$scope, site*/ 17) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);

    			if (dirty & /*site*/ 1) {
    				each_value = /*site*/ ctx[0].channels;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ol, t1);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (/*site*/ ctx[0].info) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*site*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(ol, null);
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
    			transition_in(link.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(link);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { site } = $$props;
    	const writable_props = ["site"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Header", $$slots, []);

    	$$self.$set = $$props => {
    		if ("site" in $$props) $$invalidate(0, site = $$props.site);
    	};

    	$$self.$capture_state = () => ({ Router, Link, Route, site });

    	$$self.$inject_state = $$props => {
    		if ("site" in $$props) $$invalidate(0, site = $$props.site);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [site];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { site: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$e.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*site*/ ctx[0] === undefined && !("site" in props)) {
    			console.warn("<Header> was created without expected prop 'site'");
    		}
    	}

    	get site() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set site(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/BauhausUniversityLogo.svelte generated by Svelte v3.23.2 */

    const file$d = "src/components/BauhausUniversityLogo.svelte";

    function create_fragment$f(ctx) {
    	let svg;
    	let defs;
    	let clipPath;
    	let rect0;
    	let title;
    	let t;
    	let rect1;
    	let g0;
    	let path0;
    	let path1;
    	let path2;
    	let path3;
    	let path4;
    	let path5;
    	let path6;
    	let rect2;
    	let g1;
    	let path7;
    	let path8;
    	let path9;
    	let g2;
    	let path10;
    	let path11;
    	let path12;
    	let path13;
    	let path14;
    	let g3;
    	let path15;
    	let path16;
    	let path17;
    	let path18;
    	let path19;
    	let path20;
    	let g4;
    	let path21;
    	let path22;
    	let path23;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			clipPath = svg_element("clipPath");
    			rect0 = svg_element("rect");
    			title = svg_element("title");
    			t = text("Bauhaus Universität Weimar");
    			rect1 = svg_element("rect");
    			g0 = svg_element("g");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			path2 = svg_element("path");
    			path3 = svg_element("path");
    			path4 = svg_element("path");
    			path5 = svg_element("path");
    			path6 = svg_element("path");
    			rect2 = svg_element("rect");
    			g1 = svg_element("g");
    			path7 = svg_element("path");
    			path8 = svg_element("path");
    			path9 = svg_element("path");
    			g2 = svg_element("g");
    			path10 = svg_element("path");
    			path11 = svg_element("path");
    			path12 = svg_element("path");
    			path13 = svg_element("path");
    			path14 = svg_element("path");
    			g3 = svg_element("g");
    			path15 = svg_element("path");
    			path16 = svg_element("path");
    			path17 = svg_element("path");
    			path18 = svg_element("path");
    			path19 = svg_element("path");
    			path20 = svg_element("path");
    			g4 = svg_element("g");
    			path21 = svg_element("path");
    			path22 = svg_element("path");
    			path23 = svg_element("path");
    			attr_dev(rect0, "width", "600.01");
    			attr_dev(rect0, "height", "69.61");
    			set_style(rect0, "fill", "none");
    			add_location(rect0, file$d, 2, 29, 228);
    			attr_dev(clipPath, "id", "clip-path");
    			add_location(clipPath, file$d, 2, 4, 203);
    			add_location(defs, file$d, 1, 2, 192);
    			add_location(title, file$d, 4, 2, 313);
    			attr_dev(rect1, "width", "600.01");
    			attr_dev(rect1, "height", "69.61");
    			add_location(rect1, file$d, 5, 2, 357);
    			attr_dev(path0, "d", "M36.55,40.5c0,3.32-2.76,5.08-6.42,5.08-1.21,0-3.19,0-3.19,0l0-10.08h3c5,0,6.59,1.59,6.59,5m-.26-13.7c0,3-2.11,5.13-6.46,5.13H27l0-9.47s1.3-.09,3.1-.09c2,0,6.12,0,6.12,4.43m5.17,13.79c0-3.71-2.16-6.55-5.82-7.15,1.59-.65,5.51-1.77,5.51-7,0-7-6.28-7.62-10.72-7.62-1.72,0-7.88.26-7.88.26L22.29,49s5.64.18,7.63.18c6.11,0,11.54-2.41,11.54-8.57");
    			set_style(path0, "fill", "#fff");
    			add_location(path0, file$d, 6, 39, 440);
    			attr_dev(path1, "d", "M58.39,38.21l0,5.39A6,6,0,0,1,54,46.18c-2,0-3.27-1.11-3.27-3.1,0-2.92,2.24-3.92,7.71-4.87M67,47.78l-1.25-2.33a3.32,3.32,0,0,1-1.68.65c-1.16,0-1.38-.56-1.33-2.46l.13-11c0-3.79-2.54-5.85-5.95-5.85a13.5,13.5,0,0,0-9.38,4l2.19,2.46c2.71-2.5,4.57-3,5.94-3,1.73,0,2.76.82,2.76,3.14v1.94c-7.32,1.25-12.14,2.79-12.14,7.75,0,4,2.32,6.28,6.37,6.28a8.12,8.12,0,0,0,6.11-3.22,3.19,3.19,0,0,0,3.49,3.22A9.67,9.67,0,0,0,67,47.78");
    			set_style(path1, "fill", "#fff");
    			add_location(path1, file$d, 6, 412, 813);
    			attr_dev(path2, "d", "M88.27,27.28H83.75l-.09,14.77c-1.63,2-3.53,3.4-5.46,3.4-2.29,0-3.49-.94-3.45-3.44l.17-14.73H70.4l-.13,15.63c0,3.66,1.55,6.54,6.33,6.54,3,0,5.34-1.67,7.37-3.87,0,.47-.09,1.94-.13,3.4H88.1Z");
    			set_style(path2, "fill", "#fff");
    			add_location(path2, file$d, 6, 862, 1263);
    			attr_dev(path3, "d", "M113.52,33.44c0-4.18-1.9-6.64-6.2-6.64-2.72,0-5.6,1.77-7.32,3.75.34-4.65.21-9.34.25-14H95.73L95.52,49H100l.08-14.77c1.38-1.55,3.41-3.4,5.6-3.4S109,31.84,109,34l-.08,15h4.52Z");
    			set_style(path3, "fill", "#fff");
    			add_location(path3, file$d, 6, 1085, 1486);
    			attr_dev(path4, "d", "M130.79,38.21l0,5.39a6,6,0,0,1-4.39,2.58c-2,0-3.27-1.11-3.27-3.1,0-2.92,2.24-3.92,7.7-4.87m8.62,9.57-1.25-2.33a3.35,3.35,0,0,1-1.68.65c-1.17,0-1.38-.56-1.34-2.46l.13-11c0-3.79-2.54-5.85-5.94-5.85a13.53,13.53,0,0,0-9.39,4l2.2,2.46c2.71-2.5,4.56-3,5.94-3,1.72,0,2.76.82,2.76,3.14v1.94c-7.32,1.25-12.14,2.79-12.14,7.75,0,4,2.32,6.28,6.37,6.28a8.12,8.12,0,0,0,6.11-3.22,3.19,3.19,0,0,0,3.49,3.22,9.67,9.67,0,0,0,4.74-1.67");
    			set_style(path4, "fill", "#fff");
    			add_location(path4, file$d, 6, 1294, 1695);
    			attr_dev(path5, "d", "M160.68,27.28h-4.52l-.09,14.77c-1.64,2-3.53,3.4-5.47,3.4-2.28,0-3.49-.94-3.44-3.44l.17-14.73h-4.52l-.13,15.63c-.05,3.66,1.55,6.54,6.33,6.54,3,0,5.34-1.67,7.36-3.87,0,.47-.09,1.94-.13,3.4h4.26Z");
    			set_style(path5, "fill", "#fff");
    			add_location(path5, file$d, 6, 1747, 2148);
    			attr_dev(path6, "d", "M181.62,28.53a13.69,13.69,0,0,0-7-1.73c-4,0-8.09,2.16-8.09,6.38,0,7.79,10.29,5.42,10.29,10,0,2.07-2.2,3.06-3.92,3.06a9.56,9.56,0,0,1-5-1.51l-1.68,2.93a13.38,13.38,0,0,0,7.11,1.8c3.83,0,8.18-2.41,8.18-6.71,0-7.67-10.34-5.51-10.34-10,0-2.15,2.07-2.76,4-2.76a10.78,10.78,0,0,1,4.7,1.3Z");
    			set_style(path6, "fill", "#fff");
    			add_location(path6, file$d, 6, 1975, 2376);
    			set_style(g0, "clip-path", "url(#clip-path)");
    			add_location(g0, file$d, 6, 2, 403);
    			attr_dev(rect2, "x", "186.26");
    			attr_dev(rect2, "y", "35.98");
    			attr_dev(rect2, "width", "12.49");
    			attr_dev(rect2, "height", "3.62");
    			set_style(rect2, "fill", "#fff");
    			add_location(rect2, file$d, 6, 2297, 2698);
    			attr_dev(path7, "d", "M229,19.1h-4.26l-.26,18.73c-.09,4.82-2.58,7.84-7.54,7.84-4.65,0-7.1-2.59-7.06-7.24L210,19.1h-4.56l-.13,18.82c-.05,7.71,3.87,11.53,11.45,11.53,7.41,0,11.93-3.82,12-11.45Z");
    			set_style(path7, "fill", "#fff");
    			add_location(path7, file$d, 7, 39, 2818);
    			attr_dev(path8, "d", "M254.82,33.31c.05-3.66-1.55-6.51-6.33-6.51-3,0-5.34,1.64-7.36,3.84,0-.48.09-1.9.13-3.36H237L236.82,49h4.48l.13-14.81c1.64-2,3.53-3.4,5.47-3.4,2.28,0,3.49.94,3.44,3.44L250.22,49h4.47Z");
    			set_style(path8, "fill", "#fff");
    			add_location(path8, file$d, 7, 244, 3023);
    			set_style(g1, "clip-path", "url(#clip-path)");
    			add_location(g1, file$d, 7, 2, 2781);
    			attr_dev(path9, "d", "M266.67,27.28h-4.43L262.07,49h4.43Zm.22-8.36h-4.78v4.61h4.78Z");
    			set_style(path9, "fill", "#fff");
    			add_location(path9, file$d, 7, 466, 3245);
    			attr_dev(path10, "d", "M291.77,28l-4-1.16-4.43,11.67c-1.38,3.61-2,5.77-2,5.77s-.65-2.72-1.85-6.25l-3.84-11.24L271.27,28l7.62,21h4.31Z");
    			set_style(path10, "fill", "#fff");
    			add_location(path10, file$d, 8, 39, 3382);
    			attr_dev(path11, "d", "M309,35.25l-9.39,0c.39-2.54,2.28-5.34,5.08-5.34,3.14,0,4.48,2.5,4.31,5.3m4.26,1.85c0-5.82-2.07-10.3-8.23-10.3-6.67,0-10.42,5.65-10.42,11.5,0,8.27,4,11.15,9.52,11.15,3.27,0,5.47-1.07,8-3.27l-2.37-2.54a7.15,7.15,0,0,1-5,2.33c-4.44,0-5.47-4.09-5.38-7.58l13.91,0c0-.39,0-.87,0-1.25");
    			set_style(path11, "fill", "#fff");
    			add_location(path11, file$d, 8, 185, 3528);
    			attr_dev(path12, "d", "M330.74,27.06a5.38,5.38,0,0,0-1.68-.26c-2.89,0-4.57,2.33-5.91,4.7.13-1.64.13-4.22.13-4.22H319L318.85,49h4.48l.13-13.78c1.46-2.88,3.31-4.18,5-4.18a6,6,0,0,1,1.29.18Z");
    			set_style(path12, "fill", "#fff");
    			add_location(path12, file$d, 8, 498, 3841);
    			attr_dev(path13, "d", "M348.31,28.53a13.69,13.69,0,0,0-7-1.73c-4.05,0-8.09,2.16-8.09,6.38,0,7.79,10.29,5.42,10.29,10,0,2.07-2.2,3.06-3.92,3.06a9.56,9.56,0,0,1-5-1.51l-1.68,2.93a13.38,13.38,0,0,0,7.11,1.8c3.83,0,8.18-2.41,8.18-6.71,0-7.67-10.34-5.51-10.34-10,0-2.15,2.07-2.76,4.05-2.76a10.7,10.7,0,0,1,4.69,1.3Z");
    			set_style(path13, "fill", "#fff");
    			add_location(path13, file$d, 8, 698, 4041);
    			set_style(g2, "clip-path", "url(#clip-path)");
    			add_location(g2, file$d, 8, 2, 3345);
    			attr_dev(path14, "d", "M358.86,27.28h-4.44L354.25,49h4.43Zm.21-8.36h-4.78v4.61h4.78Z");
    			set_style(path14, "fill", "#fff");
    			add_location(path14, file$d, 8, 1025, 4368);
    			attr_dev(path15, "d", "M378.91,47.48l-1.59-2.54a5.89,5.89,0,0,1-2.93,1.11c-1.38,0-2.63-.64-2.63-2.92l.05-12.49h6.5V27.28h-6.46l0-7.67h-4.48l0,7.67h-3.58v3.36h3.53L367.24,43c0,4.69,2,6.42,6.2,6.42a10.51,10.51,0,0,0,5.47-2");
    			set_style(path15, "fill", "#fff");
    			add_location(path15, file$d, 9, 39, 4505);
    			attr_dev(path16, "d", "M393,38.22l-.05,5.38a6,6,0,0,1-4.39,2.58c-2,0-3.27-1.11-3.27-3.1,0-2.92,2.24-3.92,7.71-4.86m8.61,9.56-1.25-2.33a3.32,3.32,0,0,1-1.68.65c-1.16,0-1.38-.56-1.33-2.46l.13-11c0-3.79-2.54-5.85-6-5.85a13.53,13.53,0,0,0-9.39,4l2.2,2.46c2.71-2.5,4.57-3,5.94-3,1.73,0,2.76.82,2.76,3.14v1.94c-7.32,1.25-12.14,2.8-12.14,7.75,0,4,2.32,6.28,6.37,6.28a8.12,8.12,0,0,0,6.11-3.22,3.19,3.19,0,0,0,3.49,3.22,9.67,9.67,0,0,0,4.74-1.67m-13-28.68h-4.35v4.43h4.35Zm7.36,0h-4.35v4.43H396Z");
    			set_style(path16, "fill", "#fff");
    			add_location(path16, file$d, 9, 272, 4738);
    			attr_dev(path17, "d", "M417.58,47.48,416,44.94a5.82,5.82,0,0,1-2.93,1.11c-1.37,0-2.62-.64-2.62-2.92l0-12.49H417V27.28h-6.46l0-7.67h-4.47L406,27.28h-3.57v3.36H406L405.9,43c0,4.69,2,6.42,6.21,6.42a10.54,10.54,0,0,0,5.47-2");
    			set_style(path17, "fill", "#fff");
    			add_location(path17, file$d, 9, 772, 5238);
    			attr_dev(path18, "d", "M474.75,19.57l-4.18-.95L464.24,39a32.35,32.35,0,0,0-1.33,5.77,45.15,45.15,0,0,0-1.47-6.07L455.2,19.1h-5l-5.94,19.72A59.68,59.68,0,0,0,443,44.67a46,46,0,0,0-1.38-5.89l-6.07-20.16L431,19.79,440.34,49h5l6.08-20.37a49.83,49.83,0,0,0,1.07-5.12,36.1,36.1,0,0,0,1,4.91L460,49h5Z");
    			set_style(path18, "fill", "#fff");
    			add_location(path18, file$d, 9, 1004, 5470);
    			attr_dev(path19, "d", "M490.34,35.25l-9.38,0c.38-2.54,2.28-5.34,5.08-5.34,3.14,0,4.48,2.5,4.3,5.3m4.27,1.85c0-5.82-2.07-10.3-8.23-10.3-6.67,0-10.42,5.65-10.42,11.5,0,8.27,4,11.15,9.52,11.15,3.27,0,5.47-1.07,8-3.27l-2.37-2.54A7.13,7.13,0,0,1,486,46c-4.43,0-5.47-4.09-5.39-7.58l13.91,0c0-.39.05-.87.05-1.25");
    			set_style(path19, "fill", "#fff");
    			add_location(path19, file$d, 9, 1311, 5777);
    			set_style(g3, "clip-path", "url(#clip-path)");
    			add_location(g3, file$d, 9, 2, 4468);
    			attr_dev(path20, "d", "M504.81,27.28h-4.44L500.2,49h4.43Zm.22-8.36h-4.78v4.61H505Z");
    			set_style(path20, "fill", "#fff");
    			add_location(path20, file$d, 9, 1632, 6098);
    			attr_dev(path21, "d", "M542.35,33.18c0-3.36-1.51-6.37-6.16-6.37A9.77,9.77,0,0,0,529,30.64c-.65-2.59-2.84-3.83-5.47-3.83-4.26,0-6.8,3.66-7.06,3.91,0-.12.17-2.41.17-3.44h-4.3L512.25,49h4.48l.08-14.81c1.34-1.59,3.23-3.36,5.26-3.36a2.82,2.82,0,0,1,3,3.06L525,49h4.48l.09-14.73c1.33-1.59,3.27-3.44,5.29-3.44a2.79,2.79,0,0,1,3,3.06L537.74,49h4.48Z");
    			set_style(path21, "fill", "#fff");
    			add_location(path21, file$d, 10, 39, 6233);
    			attr_dev(path22, "d", "M559.63,38.21l0,5.39a6,6,0,0,1-4.39,2.58c-2,0-3.27-1.11-3.27-3.1,0-2.92,2.24-3.92,7.71-4.87m8.61,9.57L567,45.45a3.32,3.32,0,0,1-1.68.65c-1.16,0-1.38-.56-1.33-2.46l.13-11c0-3.79-2.54-5.85-6-5.85a13.53,13.53,0,0,0-9.39,4l2.2,2.46c2.71-2.5,4.57-3,5.95-3,1.72,0,2.75.82,2.75,3.14v1.94c-7.32,1.25-12.15,2.79-12.15,7.75,0,4,2.33,6.28,6.38,6.28A8.12,8.12,0,0,0,560,46.23a3.19,3.19,0,0,0,3.49,3.22,9.67,9.67,0,0,0,4.74-1.67");
    			set_style(path22, "fill", "#fff");
    			add_location(path22, file$d, 10, 393, 6587);
    			attr_dev(path23, "d", "M583.48,27.06a5.28,5.28,0,0,0-1.68-.26c-2.88,0-4.56,2.33-5.9,4.7.13-1.64.13-4.22.13-4.22h-4.26L571.6,49h4.48l.12-13.78c1.47-2.88,3.32-4.18,5-4.18a6.17,6.17,0,0,1,1.29.18Z");
    			set_style(path23, "fill", "#fff");
    			add_location(path23, file$d, 10, 844, 7038);
    			set_style(g4, "clip-path", "url(#clip-path)");
    			add_location(g4, file$d, 10, 2, 6196);
    			attr_dev(svg, "id", "Logo");
    			attr_dev(svg, "data-name", "Bauhaus Universität Weimar");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    			attr_dev(svg, "width", "600.01");
    			attr_dev(svg, "height", "69.61");
    			attr_dev(svg, "viewBox", "0 0 600.01 69.61");
    			attr_dev(svg, "class", "svelte-7xgkdh");
    			add_location(svg, file$d, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, defs);
    			append_dev(defs, clipPath);
    			append_dev(clipPath, rect0);
    			append_dev(svg, title);
    			append_dev(title, t);
    			append_dev(svg, rect1);
    			append_dev(svg, g0);
    			append_dev(g0, path0);
    			append_dev(g0, path1);
    			append_dev(g0, path2);
    			append_dev(g0, path3);
    			append_dev(g0, path4);
    			append_dev(g0, path5);
    			append_dev(g0, path6);
    			append_dev(svg, rect2);
    			append_dev(svg, g1);
    			append_dev(g1, path7);
    			append_dev(g1, path8);
    			append_dev(svg, path9);
    			append_dev(svg, g2);
    			append_dev(g2, path10);
    			append_dev(g2, path11);
    			append_dev(g2, path12);
    			append_dev(g2, path13);
    			append_dev(svg, path14);
    			append_dev(svg, g3);
    			append_dev(g3, path15);
    			append_dev(g3, path16);
    			append_dev(g3, path17);
    			append_dev(g3, path18);
    			append_dev(g3, path19);
    			append_dev(svg, path20);
    			append_dev(svg, g4);
    			append_dev(g4, path21);
    			append_dev(g4, path22);
    			append_dev(g4, path23);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<BauhausUniversityLogo> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("BauhausUniversityLogo", $$slots, []);
    	return [];
    }

    class BauhausUniversityLogo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BauhausUniversityLogo",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src/components/Footer.svelte generated by Svelte v3.23.2 */
    const file$e = "src/components/Footer.svelte";

    // (9:15) <Link to="/">
    function create_default_slot$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Herbert.gd");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(9:15) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let footer;
    	let div0;
    	let t0;
    	let link;
    	let t1;
    	let div1;
    	let a;
    	let bauhausuniversitylogo;
    	let current;

    	link = new Link({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	bauhausuniversitylogo = new BauhausUniversityLogo({ $$inline: true });

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div0 = element("div");
    			t0 = text("© 2020 ");
    			create_component(link.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			a = element("a");
    			create_component(bauhausuniversitylogo.$$.fragment);
    			attr_dev(div0, "class", "svelte-rtmqdd");
    			add_location(div0, file$e, 7, 4, 141);
    			attr_dev(a, "class", "link logo");
    			attr_dev(a, "title", "Imprint");
    			attr_dev(a, "href", "https://www.uni-weimar.de/de/fs/impressum/");
    			attr_dev(a, "rel", "noopener");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$e, 12, 8, 237);
    			attr_dev(div1, "class", "right svelte-rtmqdd");
    			add_location(div1, file$e, 11, 4, 209);
    			attr_dev(footer, "class", "svelte-rtmqdd");
    			add_location(footer, file$e, 5, 0, 127);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div0);
    			append_dev(div0, t0);
    			mount_component(link, div0, null);
    			append_dev(footer, t1);
    			append_dev(footer, div1);
    			append_dev(div1, a);
    			mount_component(bauhausuniversitylogo, a, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			transition_in(bauhausuniversitylogo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			transition_out(bauhausuniversitylogo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			destroy_component(link);
    			destroy_component(bauhausuniversitylogo);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Footer", $$slots, []);
    	$$self.$capture_state = () => ({ Link, BauhausUniversityLogo });
    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.23.2 */
    const file$f = "src/App.svelte";

    // (41:2) {#if site.data}
    function create_if_block$9(ctx) {
    	let header;
    	let t0;
    	let main;
    	let route0;
    	let t1;
    	let route1;
    	let t2;
    	let route2;
    	let t3;
    	let route3;
    	let current;

    	header = new Header({
    			props: { site: /*site*/ ctx[1].data },
    			$$inline: true
    		});

    	route0 = new Route({
    			props: {
    				site: /*site*/ ctx[1].data,
    				path: "/",
    				component: Channel
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: {
    				info: /*site*/ ctx[1].data.info,
    				path: "info",
    				component: Info
    			},
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: ":channel",
    				$$slots: {
    					default: [
    						create_default_slot_2$2,
    						({ params }) => ({ 7: params }),
    						({ params }) => params ? 128 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route3 = new Route({
    			props: {
    				path: ":channel/:post",
    				$$slots: {
    					default: [
    						create_default_slot_1$3,
    						({ params }) => ({ 7: params }),
    						({ params }) => params ? 128 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			main = element("main");
    			create_component(route0.$$.fragment);
    			t1 = space();
    			create_component(route1.$$.fragment);
    			t2 = space();
    			create_component(route2.$$.fragment);
    			t3 = space();
    			create_component(route3.$$.fragment);
    			add_location(main, file$f, 43, 4, 853);
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(route0, main, null);
    			append_dev(main, t1);
    			mount_component(route1, main, null);
    			append_dev(main, t2);
    			mount_component(route2, main, null);
    			append_dev(main, t3);
    			mount_component(route3, main, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const header_changes = {};
    			if (dirty & /*site*/ 2) header_changes.site = /*site*/ ctx[1].data;
    			header.$set(header_changes);
    			const route0_changes = {};
    			if (dirty & /*site*/ 2) route0_changes.site = /*site*/ ctx[1].data;
    			route0.$set(route0_changes);
    			const route1_changes = {};
    			if (dirty & /*site*/ 2) route1_changes.info = /*site*/ ctx[1].data.info;
    			route1.$set(route1_changes);
    			const route2_changes = {};

    			if (dirty & /*$$scope, posts, site, params*/ 390) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    			const route3_changes = {};

    			if (dirty & /*$$scope, params*/ 384) {
    				route3_changes.$$scope = { dirty, ctx };
    			}

    			route3.$set(route3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(route0);
    			destroy_component(route1);
    			destroy_component(route2);
    			destroy_component(route3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(41:2) {#if site.data}",
    		ctx
    	});

    	return block;
    }

    // (50:6) <Route path=":channel" let:params>
    function create_default_slot_2$2(ctx) {
    	let channel;
    	let current;

    	channel = new Channel({
    			props: {
    				posts: /*posts*/ ctx[2].data,
    				channels: /*site*/ ctx[1].data.channels,
    				slug: /*params*/ ctx[7].channel
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(channel.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(channel, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const channel_changes = {};
    			if (dirty & /*posts*/ 4) channel_changes.posts = /*posts*/ ctx[2].data;
    			if (dirty & /*site*/ 2) channel_changes.channels = /*site*/ ctx[1].data.channels;
    			if (dirty & /*params*/ 128) channel_changes.slug = /*params*/ ctx[7].channel;
    			channel.$set(channel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(channel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(channel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(channel, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(50:6) <Route path=\\\":channel\\\" let:params>",
    		ctx
    	});

    	return block;
    }

    // (54:6) <Route path=":channel/:post" let:params>
    function create_default_slot_1$3(ctx) {
    	let post;
    	let current;

    	post = new Post({
    			props: {
    				slug: `${/*params*/ ctx[7].channel}/${/*params*/ ctx[7].post}`
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(post.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(post, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const post_changes = {};
    			if (dirty & /*params*/ 128) post_changes.slug = `${/*params*/ ctx[7].channel}/${/*params*/ ctx[7].post}`;
    			post.$set(post_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(post.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(post.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(post, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(54:6) <Route path=\\\":channel/:post\\\" let:params>",
    		ctx
    	});

    	return block;
    }

    // (39:0) <Router url="{url}">
    function create_default_slot$6(ctx) {
    	let t;
    	let footer;
    	let current;
    	let if_block = /*site*/ ctx[1].data && create_if_block$9(ctx);
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    			create_component(footer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*site*/ ctx[1].data) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*site*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$9(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t.parentNode, t);
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
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(39:0) <Router url=\\\"{url}\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope, posts, site*/ 262) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { url = "" } = $$props;

    	/* site */
    	let siteStore = loadData("index.json");

    	let site;

    	let unsubscribeSiteStore = siteStore.subscribe(data => {
    		$$invalidate(1, site = data);
    	});

    	/* posts */
    	let postsStore = loadData("posts.json");

    	let posts;

    	let unsubscribePostsStore = postsStore.subscribe(data => {
    		$$invalidate(2, posts = data);
    	});

    	onDestroy(() => {
    		unsubscribeSiteStore = null;
    		unsubscribePostsStore = null;
    	});

    	const writable_props = ["url"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	$$self.$set = $$props => {
    		if ("url" in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Router,
    		Link,
    		Route,
    		onDestroy,
    		Channel,
    		Info,
    		Post,
    		url,
    		Header,
    		Footer,
    		loadData,
    		siteStore,
    		site,
    		unsubscribeSiteStore,
    		postsStore,
    		posts,
    		unsubscribePostsStore
    	});

    	$$self.$inject_state = $$props => {
    		if ("url" in $$props) $$invalidate(0, url = $$props.url);
    		if ("siteStore" in $$props) siteStore = $$props.siteStore;
    		if ("site" in $$props) $$invalidate(1, site = $$props.site);
    		if ("unsubscribeSiteStore" in $$props) unsubscribeSiteStore = $$props.unsubscribeSiteStore;
    		if ("postsStore" in $$props) postsStore = $$props.postsStore;
    		if ("posts" in $$props) $$invalidate(2, posts = $$props.posts);
    		if ("unsubscribePostsStore" in $$props) unsubscribePostsStore = $$props.unsubscribePostsStore;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url, site, posts];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get url() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.getElementById('frontend')
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
