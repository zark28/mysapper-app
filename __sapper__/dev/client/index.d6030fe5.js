import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, t as text, a as space, c as claim_element, b as children, f as claim_text, g as detach_dev, h as claim_space, j as attr_dev, k as add_location, l as insert_dev, m as append_dev, n as noop, o as create_component, q as query_selector_all, p as claim_component, r as mount_component, u as transition_in, w as transition_out, x as destroy_component } from './client.39617b0c.js';

/* src/components/MenuList.svelte generated by Svelte v3.28.0 */

const file = "src/components/MenuList.svelte";

function create_fragment(ctx) {
	let div;
	let ul;
	let li0;
	let a0;
	let t0;
	let t1;
	let li1;
	let a1;
	let t2;
	let t3;
	let li2;
	let a2;
	let t4;
	let t5;
	let li3;
	let a3;
	let t6;

	const block = {
		c: function create() {
			div = element("div");
			ul = element("ul");
			li0 = element("li");
			a0 = element("a");
			t0 = text("Login");
			t1 = space();
			li1 = element("li");
			a1 = element("a");
			t2 = text("Sign Up");
			t3 = space();
			li2 = element("li");
			a2 = element("a");
			t4 = text("Explore");
			t5 = space();
			li3 = element("li");
			a3 = element("a");
			t6 = text("What' New");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			ul = claim_element(div_nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			li0 = claim_element(ul_nodes, "LI", {});
			var li0_nodes = children(li0);
			a0 = claim_element(li0_nodes, "A", { href: true });
			var a0_nodes = children(a0);
			t0 = claim_text(a0_nodes, "Login");
			a0_nodes.forEach(detach_dev);
			li0_nodes.forEach(detach_dev);
			t1 = claim_space(ul_nodes);
			li1 = claim_element(ul_nodes, "LI", {});
			var li1_nodes = children(li1);
			a1 = claim_element(li1_nodes, "A", { href: true });
			var a1_nodes = children(a1);
			t2 = claim_text(a1_nodes, "Sign Up");
			a1_nodes.forEach(detach_dev);
			li1_nodes.forEach(detach_dev);
			t3 = claim_space(ul_nodes);
			li2 = claim_element(ul_nodes, "LI", {});
			var li2_nodes = children(li2);
			a2 = claim_element(li2_nodes, "A", { href: true });
			var a2_nodes = children(a2);
			t4 = claim_text(a2_nodes, "Explore");
			a2_nodes.forEach(detach_dev);
			li2_nodes.forEach(detach_dev);
			t5 = claim_space(ul_nodes);
			li3 = claim_element(ul_nodes, "LI", {});
			var li3_nodes = children(li3);
			a3 = claim_element(li3_nodes, "A", { href: true });
			var a3_nodes = children(a3);
			t6 = claim_text(a3_nodes, "What' New");
			a3_nodes.forEach(detach_dev);
			li3_nodes.forEach(detach_dev);
			ul_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a0, "href", ".");
			add_location(a0, file, 6, 12, 79);
			add_location(li0, file, 6, 8, 75);
			attr_dev(a1, "href", ".");
			add_location(a1, file, 7, 12, 118);
			add_location(li1, file, 7, 8, 114);
			attr_dev(a2, "href", ".");
			add_location(a2, file, 8, 12, 159);
			add_location(li2, file, 8, 8, 155);
			attr_dev(a3, "href", ".");
			add_location(a3, file, 9, 12, 200);
			add_location(li3, file, 9, 8, 196);
			attr_dev(ul, "class", "list svelte-v2eimy");
			add_location(ul, file, 5, 4, 49);
			attr_dev(div, "class", "list-box svelte-v2eimy");
			add_location(div, file, 4, 0, 21);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, ul);
			append_dev(ul, li0);
			append_dev(li0, a0);
			append_dev(a0, t0);
			append_dev(ul, t1);
			append_dev(ul, li1);
			append_dev(li1, a1);
			append_dev(a1, t2);
			append_dev(ul, t3);
			append_dev(ul, li2);
			append_dev(li2, a2);
			append_dev(a2, t4);
			append_dev(ul, t5);
			append_dev(ul, li3);
			append_dev(li3, a3);
			append_dev(a3, t6);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
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

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("MenuList", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MenuList> was created with unknown prop '${key}'`);
	});

	return [];
}

class MenuList extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "MenuList",
			options,
			id: create_fragment.name
		});
	}
}

/* src/routes/index.svelte generated by Svelte v3.28.0 */

function create_fragment$1(ctx) {
	let t;
	let menulist;
	let current;
	menulist = new MenuList({ $$inline: true });

	const block = {
		c: function create() {
			t = space();
			create_component(menulist.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1xqvrrn\"]", document.head);
			head_nodes.forEach(detach_dev);
			t = claim_space(nodes);
			claim_component(menulist.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			document.title = "my Sapper ";
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
			mount_component(menulist, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(menulist.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(menulist.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
			destroy_component(menulist, detaching);
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Routes", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ MenuList });
	return [];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment$1.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZDYwMzBmZTUuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
