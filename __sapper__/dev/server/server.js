'use strict';

var sirv = require('sirv');
var polka = require('polka');
var compression = require('compression');
var fs = require('fs');
var path = require('path');
var Stream = require('stream');
var http = require('http');
var Url = require('url');
var https = require('https');
var zlib = require('zlib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sirv__default = /*#__PURE__*/_interopDefaultLegacy(sirv);
var polka__default = /*#__PURE__*/_interopDefaultLegacy(polka);
var compression__default = /*#__PURE__*/_interopDefaultLegacy(compression);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);

// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'What is Sapper?',
		slug: 'what-is-sapper',
		html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`
	},

	{
		title: 'How to use Sapper',
		slug: 'how-to-use-sapper',
		html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`
	},

	{
		title: 'Why the name?',
		slug: 'why-the-name',
		html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`
	},

	{
		title: 'How is Sapper different from Next.js?',
		slug: 'how-is-sapper-different-from-next',
		html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://vercel.com/'>Vercel</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`
	},

	{
		title: 'How can I get involved?',
		slug: 'how-can-i-get-involved',
		html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}

var route_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get
});

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

function get$1(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

var route_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	get: get$1
});

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
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
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src/routes/index.svelte generated by Svelte v3.28.0 */

const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>my Sapper </title>`, "")}`, "")}`;
});

var component_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': Routes
});

/* src/routes/about.svelte generated by Svelte v3.28.0 */

const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>About</title>`, "")}`, "")}

<h1>About this site</h1>

<p>This is the &#39;about&#39; page. There&#39;s not much here.</p>`;
});

var component_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': About
});

/* src/routes/blog/index.svelte generated by Svelte v3.28.0 */

const css = {
	code: "ul.svelte-1frg2tf{margin:0 0 1em 0;line-height:1.5}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport function preload() {\\n\\t\\treturn this.fetch(`blog.json`).then(r => r.json()).then(posts => {\\n\\t\\t\\treturn { posts };\\n\\t\\t});\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let posts;\\n</script>\\n\\n<style>\\n\\tul {\\n\\t\\tmargin: 0 0 1em 0;\\n\\t\\tline-height: 1.5;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>Blog</title>\\n</svelte:head>\\n\\n<h1>Recent posts</h1>\\n\\n<ul>\\n\\t{#each posts as post}\\n\\t\\t<!-- we're using the non-standard `rel=prefetch` attribute to\\n\\t\\t\\t\\ttell Sapper to load the data for the page as soon as\\n\\t\\t\\t\\tthe user hovers over the link or taps it, instead of\\n\\t\\t\\t\\twaiting for the 'click' event -->\\n\\t\\t<li><a rel=\\\"prefetch\\\" href=\\\"blog/{post.slug}\\\">{post.title}</a></li>\\n\\t{/each}\\n</ul>\\n\"],\"names\":[],\"mappings\":\"AAaC,EAAE,eAAC,CAAC,AACH,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC\"}"
};

function preload() {
	return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
		return { posts };
	});
}

const Blog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { posts } = $$props;
	if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0) $$bindings.posts(posts);
	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>Blog</title>`, "")}`, "")}

<h1>Recent posts</h1>

<ul class="${"svelte-1frg2tf"}">${each(posts, post => `
		<li><a rel="${"prefetch"}" href="${"blog/" + escape(post.slug)}">${escape(post.title)}</a></li>`)}</ul>`;
});

var component_2 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': Blog,
	preload: preload
});

/* src/routes/blog/[slug].svelte generated by Svelte v3.28.0 */

const css$1 = {
	code: ".content.svelte-emm3f3 h2{font-size:1.4em;font-weight:500}.content.svelte-emm3f3 pre{background-color:#f9f9f9;box-shadow:inset 1px 1px 5px rgba(0, 0, 0, 0.05);padding:0.5em;border-radius:2px;overflow-x:auto}.content.svelte-emm3f3 pre code{background-color:transparent;padding:0}.content.svelte-emm3f3 ul{line-height:1.5}.content.svelte-emm3f3 li{margin:0 0 0.5em 0}",
	map: "{\"version\":3,\"file\":\"[slug].svelte\",\"sources\":[\"[slug].svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\n\\texport async function preload({ params }) {\\n\\t\\t// the `slug` parameter is available because\\n\\t\\t// this file is called [slug].svelte\\n\\t\\tconst res = await this.fetch(`blog/${params.slug}.json`);\\n\\t\\tconst data = await res.json();\\n\\n\\t\\tif (res.status === 200) {\\n\\t\\t\\treturn { post: data };\\n\\t\\t} else {\\n\\t\\t\\tthis.error(res.status, data.message);\\n\\t\\t}\\n\\t}\\n</script>\\n\\n<script>\\n\\texport let post;\\n</script>\\n\\n<style>\\n\\t/*\\n\\t\\tBy default, CSS is locally scoped to the component,\\n\\t\\tand any unused styles are dead-code-eliminated.\\n\\t\\tIn this page, Svelte can't know which elements are\\n\\t\\tgoing to appear inside the {{{post.html}}} block,\\n\\t\\tso we have to use the :global(...) modifier to target\\n\\t\\tall elements inside .content\\n\\t*/\\n\\t.content :global(h2) {\\n\\t\\tfont-size: 1.4em;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\n\\t.content :global(pre) {\\n\\t\\tbackground-color: #f9f9f9;\\n\\t\\tbox-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);\\n\\t\\tpadding: 0.5em;\\n\\t\\tborder-radius: 2px;\\n\\t\\toverflow-x: auto;\\n\\t}\\n\\n\\t.content :global(pre) :global(code) {\\n\\t\\tbackground-color: transparent;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t.content :global(ul) {\\n\\t\\tline-height: 1.5;\\n\\t}\\n\\n\\t.content :global(li) {\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{post.title}</title>\\n</svelte:head>\\n\\n<h1>{post.title}</h1>\\n\\n<div class=\\\"content\\\">\\n\\t{@html post.html}\\n</div>\\n\"],\"names\":[],\"mappings\":\"AA4BC,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAE,CAAC,AACtB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAAK,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACjD,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,GAAG,AAAC,CAAC,AAAQ,IAAI,AAAE,CAAC,AACpC,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,CAAC,AACX,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,sBAAQ,CAAC,AAAQ,EAAE,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC\"}"
};

async function preload$1({ params }) {
	// the `slug` parameter is available because
	// this file is called [slug].svelte
	const res = await this.fetch(`blog/${params.slug}.json`);

	const data = await res.json();

	if (res.status === 200) {
		return { post: data };
	} else {
		this.error(res.status, data.message);
	}
}

const U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { post } = $$props;
	if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
	$$result.css.add(css$1);

	return `${($$result.head += `${($$result.title = `<title>${escape(post.title)}</title>`, "")}`, "")}

<h1>${escape(post.title)}</h1>

<div class="${"content svelte-emm3f3"}">${post.html}</div>`;
});

var component_3 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': U5Bslugu5D,
	preload: preload$1
});

/* src/components/MenuBtn.svelte generated by Svelte v3.28.0 */

const css$2 = {
	code: ".menu.svelte-1bh6xrb{position:relative;height:30px;width:35px;display:flex;flex-direction:column;align-items:center ;justify-content:center;outline:none;border:none;border-radius:2px;background:inherit;box-shadow:1px 1px 2px .5px  rgb(0, 0, 0),\n\t\t-1px -1px 2px .5px rgba(151, 147, 147, 0.801)}.menu-bar.svelte-1bh6xrb::before,.menu-bar.svelte-1bh6xrb::after{content:'';position:absolute}.menu-bar.svelte-1bh6xrb,.menu-bar.svelte-1bh6xrb::after,.menu-bar.svelte-1bh6xrb::before{height:4px;width:30px;background-color:rgba(51, 51, 51, 0.815)}.menu-bar.svelte-1bh6xrb::after{top:80%;left:8%}.menu-bar.svelte-1bh6xrb::before{top:10%;left:8%}.menu.svelte-1bh6xrb:active{box-shadow:.5px .5px 0px .5px  rgba(0, 0, 0, 0.5)inset,\n\t\t-.5px -.5px 0px .5px rgba(151, 147, 147, 0.315)inset}",
	map: "{\"version\":3,\"file\":\"MenuBtn.svelte\",\"sources\":[\"MenuBtn.svelte\"],\"sourcesContent\":[\"<script>\\n\\n</script>\\n\\n\\n\\n\\n\\n<button class='menu' on:click><span class='menu-bar'></span></button>\\n\\n\\n\\n\\n<style>\\n    .menu{\\n\\t\\tposition: relative;\\n\\t\\theight: 30px;\\n\\t\\twidth: 35px;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: center ;\\n\\t\\tjustify-content: center;\\n\\t\\toutline: none;\\n        border: none;\\n        border-radius: 2px;\\n        background: inherit;\\n\\t\\tbox-shadow: 1px 1px 2px .5px  rgb(0, 0, 0),\\n\\t\\t-1px -1px 2px .5px rgba(151, 147, 147, 0.801);\\n\\n\\t}\\n\\n\\t.menu-bar::before,.menu-bar::after{\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t}\\n\\n\\t.menu-bar, .menu-bar::after,.menu-bar::before{\\n\\t\\theight: 4px;\\n\\t\\twidth: 30px;\\n\\t\\tbackground-color: rgba(51, 51, 51, 0.815);;\\n\\t}\\n\\n\\t.menu-bar::after{\\n\\t\\ttop: 80%;\\n\\t\\tleft:8%;\\n\\t}\\n\\n\\t.menu-bar::before{\\n\\t\\ttop: 10%;\\n\\t\\tleft:8%;\\n\\t\\t\\n\\t} \\n\\n\\t.menu:active{\\n\\t\\tbox-shadow: .5px .5px 0px .5px  rgba(0, 0, 0, 0.5)inset,\\n\\t\\t-.5px -.5px 0px .5px rgba(151, 147, 147, 0.315)inset;\\n\\t}\\n</style>\"],\"names\":[],\"mappings\":\"AAcI,oBAAK,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CAAC,CACpB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,IAAI,CACP,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,OAAO,CACzB,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;EAC3C,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,KAAK,CAAC,AAE9C,CAAC,AAED,wBAAS,QAAQ,CAAC,wBAAS,OAAO,CAAC,AAClC,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,AACnB,CAAC,AAED,wBAAS,CAAE,wBAAS,OAAO,CAAC,wBAAS,QAAQ,CAAC,AAC7C,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,AAC1C,CAAC,AAED,wBAAS,OAAO,CAAC,AAChB,GAAG,CAAE,GAAG,CACR,KAAK,EAAE,AACR,CAAC,AAED,wBAAS,QAAQ,CAAC,AACjB,GAAG,CAAE,GAAG,CACR,KAAK,EAAE,AAER,CAAC,AAED,oBAAK,OAAO,CAAC,AACZ,UAAU,CAAE,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,IAAI,EAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC;EACxD,KAAK,CAAC,KAAK,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,KAAK,CAAC,KAAK,AACrD,CAAC\"}"
};

const MenuBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$2);
	return `<button class="${"menu svelte-1bh6xrb"}"><span class="${"menu-bar svelte-1bh6xrb"}"></span></button>`;
});

/* src/components/MenuList.svelte generated by Svelte v3.28.0 */

const css$3 = {
	code: ".list-box.svelte-14oatkc.svelte-14oatkc{position:absolute;height:173px;width:112px;background:inherit;text-align:center;top:6.5%;left:91%;border-radius:20px 0;box-shadow:-.5px -.5px 0px .5px  rgb(238, 235, 235),\n\t\t2px 2px 0px 2px rgba(51, 51, 51, 0.514)}.list.svelte-14oatkc.svelte-14oatkc{position:relative;list-style:none;padding:4px;line-height:2.2}.list.svelte-14oatkc.svelte-14oatkc::after{position:absolute;content:'';width:calc(100% - .6em);height:2px;background-color:rgba(255, 64, 0, 0.1);display:block;bottom:-1px}a.svelte-14oatkc.svelte-14oatkc{text-decoration:none}.list.svelte-14oatkc li.svelte-14oatkc:hover{color:rgb(0, 0, 0) ;border-bottom:1px solid rgb(255,62,0);display:block;margin:0 auto;width:fit-content;font-weight:500}.list.svelte-14oatkc li.svelte-14oatkc:active{color:rgba(0, 0, 0, 0.534)}",
	map: "{\"version\":3,\"file\":\"MenuList.svelte\",\"sources\":[\"MenuList.svelte\"],\"sourcesContent\":[\"<script>\\n    import {fade,slide} from 'svelte/transition';\\n</script>\\n\\n<div in:slide out:fade class='list-box'> \\n    <ul class='list'>\\n        <li><a href=\\\".\\\">Login</a></li>\\n        <li><a href=\\\".\\\">Sign Up</a></li>\\n        <li><a href=\\\".\\\">Explore</a></li>\\n        <li><a href=\\\".\\\">What' New</a></li>\\n    </ul>\\n</div>\\n\\n<style>\\n\\n.list-box{\\n    position: absolute;\\n    height: 173px;\\n    width: 112px;\\n    background:inherit;\\n    text-align: center;\\n    top: 6.5%;\\n    left: 91%;\\n    border-radius: 20px 0;\\n    box-shadow: -.5px -.5px 0px .5px  rgb(238, 235, 235),\\n\\t\\t2px 2px 0px 2px rgba(51, 51, 51, 0.514);\\n}\\n\\n\\n.list{\\n    position: relative;\\n    list-style: none;\\n    padding: 4px;\\n    line-height: 2.2;\\n}\\n\\n\\n.list::after{\\n        position: absolute;\\n\\t\\tcontent: '';\\n\\t\\twidth: calc(100% - .6em);\\n\\t\\theight: 2px;\\n\\t\\tbackground-color: rgba(255, 64, 0, 0.1);\\n\\t\\tdisplay: block;\\n\\t\\tbottom: -1px;\\n}\\n\\na{\\n    text-decoration: none;\\n}\\n.list li:hover{\\n    color:rgb(0, 0, 0) ;\\n    border-bottom: 1px solid rgb(255,62,0);\\n    display: block;\\n    margin: 0 auto;\\n    width: fit-content;\\n    font-weight: 500;\\n}\\n\\n.list li:active{\\n    color: rgba(0, 0, 0, 0.534);\\n\\n}\\n\\n\\n</style>\"],\"names\":[],\"mappings\":\"AAeA,uCAAS,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,WAAW,OAAO,CAClB,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,GAAG,CACT,aAAa,CAAE,IAAI,CAAC,CAAC,CACrB,UAAU,CAAE,KAAK,CAAC,KAAK,CAAC,GAAG,CAAC,IAAI,EAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC;EACvD,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,AACzC,CAAC,AAGD,mCAAK,CAAC,AACF,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,CACZ,WAAW,CAAE,GAAG,AACpB,CAAC,AAGD,mCAAK,OAAO,CAAC,AACL,QAAQ,CAAE,QAAQ,CACxB,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACxB,MAAM,CAAE,GAAG,CACX,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACvC,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,AACd,CAAC,AAED,+BAAC,CAAC,AACE,eAAe,CAAE,IAAI,AACzB,CAAC,AACD,oBAAK,CAAC,iBAAE,MAAM,CAAC,AACX,MAAM,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,GAAG,CAAC,EAAE,CAAC,CAAC,CAAC,CACtC,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,KAAK,CAAE,WAAW,CAClB,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,oBAAK,CAAC,iBAAE,OAAO,CAAC,AACZ,KAAK,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,AAE/B,CAAC\"}"
};

const MenuList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$3);

	return `<div class="${"list-box svelte-14oatkc"}"><ul class="${"list svelte-14oatkc"}"><li class="${"svelte-14oatkc"}"><a href="${"."}" class="${"svelte-14oatkc"}">Login</a></li>
        <li class="${"svelte-14oatkc"}"><a href="${"."}" class="${"svelte-14oatkc"}">Sign Up</a></li>
        <li class="${"svelte-14oatkc"}"><a href="${"."}" class="${"svelte-14oatkc"}">Explore</a></li>
        <li class="${"svelte-14oatkc"}"><a href="${"."}" class="${"svelte-14oatkc"}">What&#39; New</a></li></ul>
</div>`;
});

/* src/components/Nav.svelte generated by Svelte v3.28.0 */

const css$4 = {
	code: "nav.svelte-xw616m{display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,62,0,0.1);font-weight:300;padding:0 1em}ul.svelte-xw616m{margin:0;padding:0}ul.svelte-xw616m::after{content:'';display:block;clear:both}li.svelte-xw616m{display:block;float:left}[aria-current].svelte-xw616m{position:relative;display:inline-block}[aria-current].svelte-xw616m::after{position:absolute;content:'';width:calc(100% - 1em);height:2px;background-color:rgb(255,62,0);display:block;bottom:-1px}a.svelte-xw616m{text-decoration:none;padding:1em 0.5em;display:block}.menu.svelte-xw616m{margin-top:10px}.list-off.svelte-xw616m{display:none}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\nimport MenuBtn from \\\"./MenuBtn.svelte\\\";\\nimport MenuList from \\\"./MenuList.svelte\\\";\\n\\n\\texport let segment;\\n\\n\\tconst toggleMenu = ()=>{\\n\\t\\tconst list = document.querySelector('#menulist')\\n\\n\\tif (list.classList.contains('list-off')){\\n\\t\\tlist.classList.remove('list-off')\\n\\t}else{\\n\\t\\tlist.classList.add('list-off')\\n\\t}\\n\\n\\t};\\n</script>\\n\\n<style>\\n\\tnav {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\tborder-bottom: 1px solid rgba(255,62,0,0.1);\\n\\t\\tfont-weight: 300;\\n\\t\\tpadding: 0 1em;\\n\\t}\\n\\n\\tul {\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t}\\n\\n\\t/* clearfix */\\n\\tul::after {\\n\\t\\tcontent: '';\\n\\t\\tdisplay: block;\\n\\t\\tclear: both;\\n\\t}\\n\\n\\tli {\\n\\t\\tdisplay: block;\\n\\t\\tfloat: left;\\n\\t}\\n\\n\\t[aria-current] {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: inline-block;\\n\\t}\\n\\n\\t[aria-current]::after {\\n\\t\\tposition: absolute;\\n\\t\\tcontent: '';\\n\\t\\twidth: calc(100% - 1em);\\n\\t\\theight: 2px;\\n\\t\\tbackground-color: rgb(255,62,0);\\n\\t\\tdisplay: block;\\n\\t\\tbottom: -1px;\\n\\t}\\n\\n\\ta {\\n\\t\\ttext-decoration: none;\\n\\t\\tpadding: 1em 0.5em;\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\t.menu{\\n\\t\\tmargin-top: 10px;\\n\\t}\\n\\n\\t.list-off{\\n\\t\\tdisplay: none;\\n\\t}\\n\\n\\t\\n</style>\\n\\n<nav>\\n\\t<ul>\\n\\t\\t<li><a aria-current=\\\"{segment === undefined ? 'page' : undefined}\\\" href=\\\".\\\">home</a></li>\\n\\t\\t<li><a aria-current=\\\"{segment === 'about' ? 'page' : undefined}\\\" href=\\\"about\\\">about</a></li>\\n\\n\\t\\t<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches\\n\\t\\t     the blog data when we hover over the link or tap it on a touchscreen -->\\n\\t\\t<li><a rel=prefetch aria-current=\\\"{segment === 'blog' ? 'page' : undefined}\\\" href=\\\"blog\\\">blog</a></li>\\n\\t</ul>\\n\\t\\n\\t<a class='menu' href>\\n\\t\\t<MenuBtn on:click={toggleMenu}/>\\n\\t</a>\\n\\t\\n</nav>\\n<div id='menulist' class=\\\"list-off\\\">\\n\\t<MenuList/>\\n</div>\\n\"],\"names\":[],\"mappings\":\"AAmBC,GAAG,cAAC,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAC3C,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,CAAC,CAAC,GAAG,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACX,CAAC,AAGD,gBAAE,OAAO,AAAC,CAAC,AACV,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,EAAE,cAAC,CAAC,AACH,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,CAAC,YAAY,CAAC,cAAC,CAAC,AACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,AACtB,CAAC,AAED,CAAC,YAAY,eAAC,OAAO,AAAC,CAAC,AACtB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CACvB,MAAM,CAAE,GAAG,CACX,gBAAgB,CAAE,IAAI,GAAG,CAAC,EAAE,CAAC,CAAC,CAAC,CAC/B,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,AACb,CAAC,AAED,CAAC,cAAC,CAAC,AACF,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,GAAG,CAAC,KAAK,CAClB,OAAO,CAAE,KAAK,AACf,CAAC,AAED,mBAAK,CAAC,AACL,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,uBAAS,CAAC,AACT,OAAO,CAAE,IAAI,AACd,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { segment } = $$props;

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$4);

	return `<nav class="${"svelte-xw616m"}"><ul class="${"svelte-xw616m"}"><li class="${"svelte-xw616m"}"><a${add_attribute("aria-current", segment === undefined ? "page" : undefined, 0)} href="${"."}" class="${"svelte-xw616m"}">home</a></li>
		<li class="${"svelte-xw616m"}"><a${add_attribute("aria-current", segment === "about" ? "page" : undefined, 0)} href="${"about"}" class="${"svelte-xw616m"}">about</a></li>

		
		<li class="${"svelte-xw616m"}"><a rel="${"prefetch"}"${add_attribute("aria-current", segment === "blog" ? "page" : undefined, 0)} href="${"blog"}" class="${"svelte-xw616m"}">blog</a></li></ul>
	
	<a class="${"menu svelte-xw616m"}" href>${validate_component(MenuBtn, "MenuBtn").$$render($$result, {}, {}, {})}</a></nav>
<div id="${"menulist"}" class="${"list-off svelte-xw616m"}">${validate_component(MenuList, "MenuList").$$render($$result, {}, {}, {})}</div>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.28.0 */

const css$5 = {
	code: "main.svelte-1uhnsl8{position:relative;max-width:56em;background-color:white;padding:2em;margin:0 auto;box-sizing:border-box}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport Nav from '../components/Nav.svelte';\\n\\n\\texport let segment;\\n</script>\\n\\n<style>\\n\\tmain {\\n\\t\\tposition: relative;\\n\\t\\tmax-width: 56em;\\n\\t\\tbackground-color: white;\\n\\t\\tpadding: 2em;\\n\\t\\tmargin: 0 auto;\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n</style>\\n\\n<Nav {segment}/>\\n\\n<main>\\n\\t<slot></slot>\\n</main>\"],\"names\":[],\"mappings\":\"AAOC,IAAI,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,KAAK,CACvB,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,AACvB,CAAC\"}"
};

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { segment } = $$props;
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$5);

	return `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

<main class="${"svelte-1uhnsl8"}">${slots.default ? slots.default({}) : ``}</main>`;
});

var root_comp = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': Layout
});

/* src/routes/_error.svelte generated by Svelte v3.28.0 */

const css$6 = {
	code: "h1.svelte-8od9u6,p.svelte-8od9u6{margin:0 auto}h1.svelte-8od9u6{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-8od9u6{margin:1em auto}@media(min-width: 480px){h1.svelte-8od9u6{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let status;\\n\\texport let error;\\n\\n\\tconst dev = \\\"development\\\" === 'development';\\n</script>\\n\\n<style>\\n\\th1, p {\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tfont-size: 2.8em;\\n\\t\\tfont-weight: 700;\\n\\t\\tmargin: 0 0 0.5em 0;\\n\\t}\\n\\n\\tp {\\n\\t\\tmargin: 1em auto;\\n\\t}\\n\\n\\t@media (min-width: 480px) {\\n\\t\\th1 {\\n\\t\\t\\tfont-size: 4em;\\n\\t\\t}\\n\\t}\\n</style>\\n\\n<svelte:head>\\n\\t<title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n\\t<pre>{error.stack}</pre>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAQC,gBAAE,CAAE,CAAC,cAAC,CAAC,AACN,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACpB,CAAC,AAED,CAAC,cAAC,CAAC,AACF,MAAM,CAAE,GAAG,CAAC,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,EAAE,cAAC,CAAC,AACH,SAAS,CAAE,GAAG,AACf,CAAC,AACF,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$6);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-8od9u6"}">${escape(status)}</h1>

<p class="${"svelte-8od9u6"}">${escape(error.message)}</p>

${ error.stack
	? `<pre>${escape(error.stack)}</pre>`
	: ``}`;
});

// This file is generated by Sapper — do not edit it!

const d = decodeURIComponent;

const manifest = {
	server_routes: [
		{
			// blog/index.json.js
			pattern: /^\/blog\.json$/,
			handlers: route_0,
			params: () => ({})
		},

		{
			// blog/[slug].json.js
			pattern: /^\/blog\/([^/]+?)\.json$/,
			handlers: route_1,
			params: match => ({ slug: d(match[1]) })
		}
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: component_0 }
			]
		},

		{
			// about.svelte
			pattern: /^\/about\/?$/,
			parts: [
				{ name: "about", file: "about.svelte", component: component_1 }
			]
		},

		{
			// blog/index.svelte
			pattern: /^\/blog\/?$/,
			parts: [
				{ name: "blog", file: "blog/index.svelte", component: component_2 }
			]
		},

		{
			// blog/[slug].svelte
			pattern: /^\/blog\/([^/]+?)\/?$/,
			parts: [
				null,
				{ name: "blog_$slug", file: "blog/[slug].svelte", component: component_3, params: match => ({ slug: d(match[1]) }) }
			]
		}
	],

	root_comp,
	error: Error$1
};

const build_dir = "__sapper__/dev";

const src_dir = "src";

const subscriber_queue = [];
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

const CONTEXT_KEY = {};

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.28.0 */

const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `


${validate_component(Layout, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign(level1.props), {}, {})}`}`
	})}`;
});

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/urc-ressheet+xml":["rsheet"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function get_server_route_handler(routes) {
    function handle_route(route, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.params = route.params(route.pattern.exec(req.path));
            const method = req.method.toLowerCase();
            // 'delete' cannot be exported from a module because it is a keyword,
            // so check for 'del' instead
            const method_export = method === 'delete' ? 'del' : method;
            const handle_method = route.handlers[method_export];
            if (handle_method) {
                if (process.env.SAPPER_EXPORT) {
                    const { write, end, setHeader } = res;
                    const chunks = [];
                    const headers = {};
                    // intercept data so that it can be exported
                    res.write = function (chunk) {
                        chunks.push(Buffer.from(chunk));
                        return write.apply(res, [chunk]);
                    };
                    res.setHeader = function (name, value) {
                        headers[name.toLowerCase()] = value;
                        setHeader.apply(res, [name, value]);
                    };
                    res.end = function (chunk) {
                        if (chunk)
                            chunks.push(Buffer.from(chunk));
                        end.apply(res, [chunk]);
                        process.send({
                            __sapper__: true,
                            event: 'file',
                            url: req.url,
                            method: req.method,
                            status: res.statusCode,
                            type: headers['content-type'],
                            body: Buffer.concat(chunks)
                        });
                    };
                }
                const handle_next = (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.message);
                    }
                    else {
                        process.nextTick(next);
                    }
                };
                try {
                    yield handle_method(req, res, handle_next);
                }
                catch (err) {
                    console.error(err);
                    handle_next(err);
                }
            }
            else {
                // no matching handler for method
                process.nextTick(next);
            }
        });
    }
    return function find_route(req, res, next) {
        for (const route of routes) {
            if (route.pattern.test(req.path)) {
                handle_route(route, req, res, next);
                return;
            }
        }
        next();
    };
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return "new RegExp(" + stringifyString(thing.source) + ", \"" + thing.flags + "\")";
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped$1) {
            result += escaped$1[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream__default['default'].Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream__default['default'].PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream__default['default']) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream__default['default']) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream__default['default'])) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream__default['default']) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__default['default'].STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url__default['default'].parse;
const format_url = Url__default['default'].format;

const streamDestructionSupported = 'destroy' in Stream__default['default'].Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream__default['default'].PassThrough;
const resolve_url = Url__default['default'].resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https__default['default'] : http__default['default']).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream__default['default'].Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__default['default'].Z_SYNC_FLUSH,
				finishFlush: zlib__default['default'].Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__default['default'].createInflate());
					} else {
						body = body.pipe(zlib__default['default'].createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
				body = body.pipe(zlib__default['default'].createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
var encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
var decode$1 = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

var base64 = {
	encode: encode,
	decode: decode$1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
var encode$1 = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
var decode$2 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var base64Vlq = {
	encode: encode$1,
	decode: decode$2
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var util = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */


var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

var ArraySet_1 = ArraySet;

var arraySet = {
	ArraySet: ArraySet_1
};

var binarySearch = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
var quickSort_1 = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

var quickSort = {
	quickSort: quickSort_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$1 = arraySet.ArraySet;

var quickSort$1 = quickSort.quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

var SourceMapConsumer_1 = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet$1.fromArray(names.map(String), true);
  this._sources = ArraySet$1.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet$1.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet$1.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort$1(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64Vlq.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort$1(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort$1(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort$1(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort$1(this.__originalMappings, util.compareByOriginalPositions);
  };

var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

var sourceMapConsumer = {
	SourceMapConsumer: SourceMapConsumer_1,
	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
};

var SourceMapConsumer$1 = sourceMapConsumer.SourceMapConsumer;

function get_sourcemap_url(contents) {
    const reversed = contents
        .split('\n')
        .reverse()
        .join('\n');
    const match = /\/[/*]#[ \t]+sourceMappingURL=([^\s'"]+?)(?:[ \t]+|$)/gm.exec(reversed);
    if (match)
        return match[1];
    return undefined;
}
const file_cache = new Map();
function get_file_contents(file_path) {
    if (file_cache.has(file_path)) {
        return file_cache.get(file_path);
    }
    try {
        const data = fs__default['default'].readFileSync(file_path, 'utf8');
        file_cache.set(file_path, data);
        return data;
    }
    catch (_a) {
        return undefined;
    }
}
function sourcemap_stacktrace(stack) {
    const replace = (line) => line.replace(/^ {4}at (?:(.+?)\s+\()?(?:(.+?):(\d+)(?::(\d+))?)\)?/, (input, var_name, file_path, line_num, column) => {
        if (!file_path)
            return input;
        const contents = get_file_contents(file_path);
        if (!contents)
            return input;
        const sourcemap_url = get_sourcemap_url(contents);
        if (!sourcemap_url)
            return input;
        let dir = path__default['default'].dirname(file_path);
        let sourcemap_data;
        if (/^data:application\/json[^,]+base64,/.test(sourcemap_url)) {
            const raw_data = sourcemap_url.slice(sourcemap_url.indexOf(',') + 1);
            try {
                sourcemap_data = Buffer.from(raw_data, 'base64').toString();
            }
            catch (_a) {
                return input;
            }
        }
        else {
            const sourcemap_path = path__default['default'].resolve(dir, sourcemap_url);
            const data = get_file_contents(sourcemap_path);
            if (!data)
                return input;
            sourcemap_data = data;
            dir = path__default['default'].dirname(sourcemap_path);
        }
        let raw_sourcemap;
        try {
            raw_sourcemap = JSON.parse(sourcemap_data);
        }
        catch (_b) {
            return input;
        }
        const consumer = new SourceMapConsumer$1(raw_sourcemap);
        const pos = consumer.originalPositionFor({
            line: Number(line_num),
            column: Number(column),
            bias: SourceMapConsumer$1.LEAST_UPPER_BOUND
        });
        if (!pos.source)
            return input;
        const source_path = path__default['default'].resolve(dir, pos.source);
        const source = `${source_path}:${pos.line || 0}:${pos.column || 0}`;
        if (!var_name)
            return `    at ${source}`;
        return `    at ${var_name} (${source})`;
    });
    file_cache.clear();
    return stack
        .split('\n')
        .map(replace)
        .join('\n');
}

function get_page_handler(manifest, session_getter) {
    const get_build_info =  () => JSON.parse(fs__default['default'].readFileSync(path__default['default'].join(build_dir, 'build.json'), 'utf-8'))
        ;
    const template =  () => read_template(src_dir)
        ;
    const has_service_worker = fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js'));
    const { pages, error: error_route } = manifest;
    function bail(req, res, err) {
        console.error(err);
        const message =  escape_html(err.message) ;
        res.statusCode = 500;
        res.end(`<pre>${message}</pre>`);
    }
    function handle_error(req, res, statusCode, error) {
        handle_page({
            pattern: null,
            parts: [
                { name: null, component: { default: error_route } }
            ]
        }, req, res, statusCode, error || 'Unknown error');
    }
    function handle_page(page, req, res, status = 200, error = null) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const is_service_worker_index = req.path === '/service-worker-index.html';
            const build_info = get_build_info();
            res.setHeader('Content-Type', 'text/html');
            // preload main js and css
            // TODO detect other stuff we can preload like fonts?
            let preload_files = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
            if ((_a = build_info === null || build_info === void 0 ? void 0 : build_info.css) === null || _a === void 0 ? void 0 : _a.main) {
                preload_files = preload_files.concat((_b = build_info === null || build_info === void 0 ? void 0 : build_info.css) === null || _b === void 0 ? void 0 : _b.main);
            }
            let es6_preload = false;
            if (build_info.bundler === 'rollup') {
                es6_preload = true;
                const route = page.parts[page.parts.length - 1].file;
                const deps = build_info.dependencies[route];
                if (deps) {
                    preload_files = preload_files.concat(deps);
                }
            }
            else if (!error && !is_service_worker_index) {
                page.parts.forEach(part => {
                    if (!part)
                        return;
                    // using concat because it could be a string or an array. thanks webpack!
                    preload_files = preload_files.concat(build_info.assets[part.name]);
                });
            }
            const link = preload_files
                .filter((v, i, a) => a.indexOf(v) === i) // remove any duplicates
                .filter(file => file && !file.match(/\.map$/)) // exclude source maps
                .map((file) => {
                const as = /\.css$/.test(file) ? 'style' : 'script';
                const rel = es6_preload && as === 'script' ? 'modulepreload' : 'preload';
                return `<${req.baseUrl}/client/${file}>;rel="${rel}";as="${as}"`;
            })
                .join(', ');
            res.setHeader('Link', link);
            let session;
            try {
                session = yield session_getter(req, res);
            }
            catch (err) {
                return bail(req, res, err);
            }
            let redirect;
            let preload_error;
            const preload_context = {
                redirect: (statusCode, location) => {
                    if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                        throw new Error('Conflicting redirects');
                    }
                    location = location.replace(/^\//g, ''); // leading slash (only)
                    redirect = { statusCode, location };
                },
                error: (statusCode, message) => {
                    preload_error = { statusCode, message };
                },
                fetch: (url, opts) => {
                    const protocol = req.socket.encrypted ? 'https' : 'http';
                    const parsed = new Url__default['default'].URL(url, `${protocol}://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' : ''}`);
                    opts = Object.assign({}, opts);
                    const include_credentials = (opts.credentials === 'include' ||
                        opts.credentials !== 'omit' && parsed.origin === `${protocol}://127.0.0.1:${process.env.PORT}`);
                    if (include_credentials) {
                        opts.headers = Object.assign({}, opts.headers);
                        const cookies = Object.assign({}, parse_1(req.headers.cookie || ''), parse_1(opts.headers.cookie || ''));
                        const set_cookie = res.getHeader('Set-Cookie');
                        (Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach((s) => {
                            const m = /([^=]+)=([^;]+)/.exec(s);
                            if (m)
                                cookies[m[1]] = m[2];
                        });
                        const str = Object.keys(cookies)
                            .map(key => `${key}=${cookies[key]}`)
                            .join('; ');
                        opts.headers.cookie = str;
                        if (!opts.headers.authorization && req.headers.authorization) {
                            opts.headers.authorization = req.headers.authorization;
                        }
                    }
                    return fetch(parsed.href, opts);
                }
            };
            let preloaded;
            let match;
            let params;
            try {
                const root_preload = manifest.root_comp.preload || (() => { });
                const root_preloaded = root_preload.call(preload_context, {
                    host: req.headers.host,
                    path: req.path,
                    query: req.query,
                    params: {}
                }, session);
                match = error ? null : page.pattern.exec(req.path);
                let toPreload = [root_preloaded];
                if (!is_service_worker_index) {
                    toPreload = toPreload.concat(page.parts.map(part => {
                        if (!part)
                            return null;
                        // the deepest level is used below, to initialise the store
                        params = part.params ? part.params(match) : {};
                        return part.component.preload
                            ? part.component.preload.call(preload_context, {
                                host: req.headers.host,
                                path: req.path,
                                query: req.query,
                                params
                            }, session)
                            : {};
                    }));
                }
                preloaded = yield Promise.all(toPreload);
            }
            catch (err) {
                if (error) {
                    return bail(req, res, err);
                }
                preload_error = { statusCode: 500, message: err };
                preloaded = []; // appease TypeScript
            }
            try {
                if (redirect) {
                    const location = Url__default['default'].resolve((req.baseUrl || '') + '/', redirect.location);
                    res.statusCode = redirect.statusCode;
                    res.setHeader('Location', location);
                    res.end();
                    return;
                }
                if (preload_error) {
                    handle_error(req, res, preload_error.statusCode, preload_error.message);
                    return;
                }
                const segments = req.path.split('/').filter(Boolean);
                // TODO make this less confusing
                const layout_segments = [segments[0]];
                let l = 1;
                page.parts.forEach((part, i) => {
                    layout_segments[l] = segments[i + 1];
                    if (!part)
                        return null;
                    l++;
                });
                if (error instanceof Error && error.stack) {
                    error.stack = sourcemap_stacktrace(error.stack);
                }
                const pageContext = {
                    host: req.headers.host,
                    path: req.path,
                    query: req.query,
                    params,
                    error: error
                        ? error instanceof Error
                            ? error
                            : { message: error, name: 'PreloadError' }
                        : null
                };
                const props = {
                    stores: {
                        page: {
                            subscribe: writable(pageContext).subscribe
                        },
                        preloading: {
                            subscribe: writable(null).subscribe
                        },
                        session: writable(session)
                    },
                    segments: layout_segments,
                    status: error ? status : 200,
                    error: pageContext.error,
                    level0: {
                        props: preloaded[0]
                    },
                    level1: {
                        segment: segments[0],
                        props: {}
                    }
                };
                if (!is_service_worker_index) {
                    let level_index = 1;
                    for (let i = 0; i < page.parts.length; i += 1) {
                        const part = page.parts[i];
                        if (!part)
                            continue;
                        props[`level${level_index++}`] = {
                            component: part.component.default,
                            props: preloaded[i + 1] || {},
                            segment: segments[i]
                        };
                    }
                }
                const { html, head, css } = App.render(props);
                const serialized = {
                    preloaded: `[${preloaded.map(data => try_serialize(data, err => {
                        console.error(`Failed to serialize preloaded data to transmit to the client at the /${segments.join('/')} route: ${err.message}`);
                        console.warn('The client will re-render over the server-rendered page fresh instead of continuing where it left off. See https://sapper.svelte.dev/docs#Return_value for more information');
                    })).join(',')}]`,
                    session: session && try_serialize(session, err => {
                        throw new Error(`Failed to serialize session data: ${err.message}`);
                    }),
                    error: error && serialize_error(props.error)
                };
                let script = `__SAPPER__={${[
                    error && `error:${serialized.error},status:${status}`,
                    `baseUrl:"${req.baseUrl}"`,
                    serialized.preloaded && `preloaded:${serialized.preloaded}`,
                    serialized.session && `session:${serialized.session}`
                ].filter(Boolean).join(',')}};`;
                if (has_service_worker) {
                    script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
                }
                const file = [].concat(build_info.assets.main).filter(f => f && /\.js$/.test(f))[0];
                const main = `${req.baseUrl}/client/${file}`;
                // users can set a CSP nonce using res.locals.nonce
                const nonce_value = (res.locals && res.locals.nonce) ? res.locals.nonce : '';
                const nonce_attr = nonce_value ? ` nonce="${nonce_value}"` : '';
                if (build_info.bundler === 'rollup') {
                    if (build_info.legacy_assets) {
                        const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
                        script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
                    }
                    else {
                        script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
                    }
                }
                else {
                    script += `</script><script${nonce_attr} src="${main}" defer>`;
                }
                let styles;
                // TODO make this consistent across apps
                // TODO embed build_info in placeholder.ts
                if (build_info.css && build_info.css.main) {
                    const css_chunks = new Set(build_info.css.main);
                    page.parts.forEach(part => {
                        if (!part || !build_info.dependencies)
                            return;
                        const deps_for_part = build_info.dependencies[part.file];
                        if (deps_for_part) {
                            deps_for_part.filter(d => d.endsWith('.css')).forEach(chunk => {
                                css_chunks.add(chunk);
                            });
                        }
                    });
                    styles = Array.from(css_chunks)
                        .map(href => `<link rel="stylesheet" href="client/${href}">`)
                        .join('');
                }
                else {
                    styles = (css && css.code ? `<style${nonce_attr}>${css.code}</style>` : '');
                }
                const body = template()
                    .replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
                    .replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
                    .replace('%sapper.html%', () => html)
                    .replace('%sapper.head%', () => head)
                    .replace('%sapper.styles%', () => styles)
                    .replace('%sapper.cspnonce%', () => nonce_value);
                res.statusCode = status;
                res.end(body);
            }
            catch (err) {
                if (error) {
                    bail(req, res, err);
                }
                else {
                    handle_error(req, res, 500, err);
                }
            }
        });
    }
    return function find_route(req, res, next) {
        if (req.path === '/service-worker-index.html') {
            const homePage = pages.find(page => page.pattern.test('/'));
            handle_page(homePage, req, res);
            return;
        }
        for (const page of pages) {
            if (page.pattern.test(req.path)) {
                handle_page(page, req, res);
                return;
            }
        }
        handle_error(req, res, 404, 'Not found');
    };
}
function read_template(dir = build_dir) {
    return fs__default['default'].readFileSync(`${dir}/template.html`, 'utf-8');
}
function try_serialize(data, fail) {
    try {
        return devalue(data);
    }
    catch (err) {
        if (fail)
            fail(err);
        return null;
    }
}
// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
    if (!error)
        return null;
    let serialized = try_serialize(error);
    if (!serialized) {
        const { name, message, stack } = error;
        serialized = try_serialize({ name, message, stack });
    }
    if (!serialized) {
        serialized = '{}';
    }
    return serialized;
}
function escape_html(html) {
    const chars = {
        '"': 'quot',
        '\'': '#39',
        '&': 'amp',
        '<': 'lt',
        '>': 'gt'
    };
    return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
}

function middleware(opts = {}) {
    const { session, ignore } = opts;
    let emitted_basepath = false;
    return compose_handlers(ignore, [
        (req, res, next) => {
            if (req.baseUrl === undefined) {
                let originalUrl = req.originalUrl || req.url;
                if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
                    originalUrl += '/';
                }
                req.baseUrl = originalUrl
                    ? originalUrl.slice(0, -req.url.length)
                    : '';
            }
            if (!emitted_basepath && process.send) {
                process.send({
                    __sapper__: true,
                    event: 'basepath',
                    basepath: req.baseUrl
                });
                emitted_basepath = true;
            }
            if (req.path === undefined) {
                req.path = req.url.replace(/\?.*/, '');
            }
            next();
        },
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js')) && serve({
            pathname: '/service-worker.js',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js.map')) && serve({
            pathname: '/service-worker.js.map',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        serve({
            prefix: '/client/',
            cache_control:  'no-cache' 
        }),
        get_server_route_handler(manifest.server_routes),
        get_page_handler(manifest, session || noop$1)
    ].filter(Boolean));
}
function compose_handlers(ignore, handlers) {
    const total = handlers.length;
    function nth_handler(n, req, res, next) {
        if (n >= total) {
            return next();
        }
        handlers[n](req, res, () => nth_handler(n + 1, req, res, next));
    }
    return !ignore
        ? (req, res, next) => nth_handler(0, req, res, next)
        : (req, res, next) => {
            if (should_ignore(req.path, ignore)) {
                next();
            }
            else {
                nth_handler(0, req, res, next);
            }
        };
}
function should_ignore(uri, val) {
    if (Array.isArray(val))
        return val.some(x => should_ignore(uri, x));
    if (val instanceof RegExp)
        return val.test(uri);
    if (typeof val === 'function')
        return val(uri);
    return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}
function serve({ prefix, pathname, cache_control }) {
    const filter = pathname
        ? (req) => req.path === pathname
        : (req) => req.path.startsWith(prefix);
    const read =  (file) => fs__default['default'].readFileSync(path__default['default'].join(build_dir, file))
        ;
    return (req, res, next) => {
        if (filter(req)) {
            const type = lite.getType(req.path);
            try {
                const file = path__default['default'].posix.normalize(decodeURIComponent(req.path));
                const data = read(file);
                res.setHeader('Content-Type', type);
                res.setHeader('Cache-Control', cache_control);
                res.end(data);
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    next();
                }
                else {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('an error occurred while reading a static file from disk');
                }
            }
        }
        else {
            next();
        }
    };
}
function noop$1() { }

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka__default['default']() // You can also use Express
	.use(
		compression__default['default']({ threshold: 0 }),
		sirv__default['default']('static', { dev }),
		middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvX3Bvc3RzLmpzIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanMiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvW3NsdWddLmpzb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvYmxvZy9pbmRleC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL2Jsb2cvW3NsdWddLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL05hdi5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL19sYXlvdXQuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL21hbmlmZXN0LXNlcnZlci5tanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL3N0b3JlL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9zaGFyZWQubWpzIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL0FwcC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvc2VydmVyLm1qcyIsIi4uLy4uLy4uL3NyYy9zZXJ2ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gT3JkaW5hcmlseSwgeW91J2QgZ2VuZXJhdGUgdGhpcyBkYXRhIGZyb20gbWFya2Rvd24gZmlsZXMgaW4geW91clxuLy8gcmVwbywgb3IgZmV0Y2ggdGhlbSBmcm9tIGEgZGF0YWJhc2Ugb2Ygc29tZSBraW5kLiBCdXQgaW4gb3JkZXIgdG9cbi8vIGF2b2lkIHVubmVjZXNzYXJ5IGRlcGVuZGVuY2llcyBpbiB0aGUgc3RhcnRlciB0ZW1wbGF0ZSwgYW5kIGluIHRoZVxuLy8gc2VydmljZSBvZiBvYnZpb3VzbmVzcywgd2UncmUganVzdCBnb2luZyB0byBsZWF2ZSBpdCBoZXJlLlxuXG4vLyBUaGlzIGZpbGUgaXMgY2FsbGVkIGBfcG9zdHMuanNgIHJhdGhlciB0aGFuIGBwb3N0cy5qc2AsIGJlY2F1c2Vcbi8vIHdlIGRvbid0IHdhbnQgdG8gY3JlYXRlIGFuIGAvYmxvZy9wb3N0c2Agcm91dGUg4oCUIHRoZSBsZWFkaW5nXG4vLyB1bmRlcnNjb3JlIHRlbGxzIFNhcHBlciBub3QgdG8gZG8gdGhhdC5cblxuY29uc3QgcG9zdHMgPSBbXG5cdHtcblx0XHR0aXRsZTogJ1doYXQgaXMgU2FwcGVyPycsXG5cdFx0c2x1ZzogJ3doYXQtaXMtc2FwcGVyJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD5GaXJzdCwgeW91IGhhdmUgdG8ga25vdyB3aGF0IDxhIGhyZWY9J2h0dHBzOi8vc3ZlbHRlLmRldic+U3ZlbHRlPC9hPiBpcy4gU3ZlbHRlIGlzIGEgVUkgZnJhbWV3b3JrIHdpdGggYSBib2xkIG5ldyBpZGVhOiByYXRoZXIgdGhhbiBwcm92aWRpbmcgYSBsaWJyYXJ5IHRoYXQgeW91IHdyaXRlIGNvZGUgd2l0aCAobGlrZSBSZWFjdCBvciBWdWUsIGZvciBleGFtcGxlKSwgaXQncyBhIGNvbXBpbGVyIHRoYXQgdHVybnMgeW91ciBjb21wb25lbnRzIGludG8gaGlnaGx5IG9wdGltaXplZCB2YW5pbGxhIEphdmFTY3JpcHQuIElmIHlvdSBoYXZlbid0IGFscmVhZHkgcmVhZCB0aGUgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2L2Jsb2cvZnJhbWV3b3Jrcy13aXRob3V0LXRoZS1mcmFtZXdvcmsnPmludHJvZHVjdG9yeSBibG9nIHBvc3Q8L2E+LCB5b3Ugc2hvdWxkITwvcD5cblxuXHRcdFx0PHA+U2FwcGVyIGlzIGEgTmV4dC5qcy1zdHlsZSBmcmFtZXdvcmsgKDxhIGhyZWY9J2Jsb2cvaG93LWlzLXNhcHBlci1kaWZmZXJlbnQtZnJvbS1uZXh0Jz5tb3JlIG9uIHRoYXQgaGVyZTwvYT4pIGJ1aWx0IGFyb3VuZCBTdmVsdGUuIEl0IG1ha2VzIGl0IGVtYmFycmFzc2luZ2x5IGVhc3kgdG8gY3JlYXRlIGV4dHJlbWVseSBoaWdoIHBlcmZvcm1hbmNlIHdlYiBhcHBzLiBPdXQgb2YgdGhlIGJveCwgeW91IGdldDo8L3A+XG5cblx0XHRcdDx1bD5cblx0XHRcdFx0PGxpPkNvZGUtc3BsaXR0aW5nLCBkeW5hbWljIGltcG9ydHMgYW5kIGhvdCBtb2R1bGUgcmVwbGFjZW1lbnQsIHBvd2VyZWQgYnkgd2VicGFjazwvbGk+XG5cdFx0XHRcdDxsaT5TZXJ2ZXItc2lkZSByZW5kZXJpbmcgKFNTUikgd2l0aCBjbGllbnQtc2lkZSBoeWRyYXRpb248L2xpPlxuXHRcdFx0XHQ8bGk+U2VydmljZSB3b3JrZXIgZm9yIG9mZmxpbmUgc3VwcG9ydCwgYW5kIGFsbCB0aGUgUFdBIGJlbGxzIGFuZCB3aGlzdGxlczwvbGk+XG5cdFx0XHRcdDxsaT5UaGUgbmljZXN0IGRldmVsb3BtZW50IGV4cGVyaWVuY2UgeW91J3ZlIGV2ZXIgaGFkLCBvciB5b3VyIG1vbmV5IGJhY2s8L2xpPlxuXHRcdFx0PC91bD5cblxuXHRcdFx0PHA+SXQncyBpbXBsZW1lbnRlZCBhcyBFeHByZXNzIG1pZGRsZXdhcmUuIEV2ZXJ5dGhpbmcgaXMgc2V0IHVwIGFuZCB3YWl0aW5nIGZvciB5b3UgdG8gZ2V0IHN0YXJ0ZWQsIGJ1dCB5b3Uga2VlcCBjb21wbGV0ZSBjb250cm9sIG92ZXIgdGhlIHNlcnZlciwgc2VydmljZSB3b3JrZXIsIHdlYnBhY2sgY29uZmlnIGFuZCBldmVyeXRoaW5nIGVsc2UsIHNvIGl0J3MgYXMgZmxleGlibGUgYXMgeW91IG5lZWQgaXQgdG8gYmUuPC9wPlxuXHRcdGBcblx0fSxcblxuXHR7XG5cdFx0dGl0bGU6ICdIb3cgdG8gdXNlIFNhcHBlcicsXG5cdFx0c2x1ZzogJ2hvdy10by11c2Utc2FwcGVyJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8aDI+U3RlcCBvbmU8L2gyPlxuXHRcdFx0PHA+Q3JlYXRlIGEgbmV3IHByb2plY3QsIHVzaW5nIDxhIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9SaWNoLUhhcnJpcy9kZWdpdCc+ZGVnaXQ8L2E+OjwvcD5cblxuXHRcdFx0PHByZT48Y29kZT5ucHggZGVnaXQgXCJzdmVsdGVqcy9zYXBwZXItdGVtcGxhdGUjcm9sbHVwXCIgbXktYXBwXG5cdFx0XHRjZCBteS1hcHBcblx0XHRcdG5wbSBpbnN0YWxsICMgb3IgeWFybiFcblx0XHRcdG5wbSBydW4gZGV2XG5cdFx0XHQ8L2NvZGU+PC9wcmU+XG5cblx0XHRcdDxoMj5TdGVwIHR3bzwvaDI+XG5cdFx0XHQ8cD5HbyB0byA8YSBocmVmPSdodHRwOi8vbG9jYWxob3N0OjMwMDAnPmxvY2FsaG9zdDozMDAwPC9hPi4gT3BlbiA8Y29kZT5teS1hcHA8L2NvZGU+IGluIHlvdXIgZWRpdG9yLiBFZGl0IHRoZSBmaWxlcyBpbiB0aGUgPGNvZGU+c3JjL3JvdXRlczwvY29kZT4gZGlyZWN0b3J5IG9yIGFkZCBuZXcgb25lcy48L3A+XG5cblx0XHRcdDxoMj5TdGVwIHRocmVlPC9oMj5cblx0XHRcdDxwPi4uLjwvcD5cblxuXHRcdFx0PGgyPlN0ZXAgZm91cjwvaDI+XG5cdFx0XHQ8cD5SZXNpc3Qgb3ZlcmRvbmUgam9rZSBmb3JtYXRzLjwvcD5cblx0XHRgXG5cdH0sXG5cblx0e1xuXHRcdHRpdGxlOiAnV2h5IHRoZSBuYW1lPycsXG5cdFx0c2x1ZzogJ3doeS10aGUtbmFtZScsXG5cdFx0aHRtbDogYFxuXHRcdFx0PHA+SW4gd2FyLCB0aGUgc29sZGllcnMgd2hvIGJ1aWxkIGJyaWRnZXMsIHJlcGFpciByb2FkcywgY2xlYXIgbWluZWZpZWxkcyBhbmQgY29uZHVjdCBkZW1vbGl0aW9ucyDigJQgYWxsIHVuZGVyIGNvbWJhdCBjb25kaXRpb25zIOKAlCBhcmUga25vd24gYXMgPGVtPnNhcHBlcnM8L2VtPi48L3A+XG5cblx0XHRcdDxwPkZvciB3ZWIgZGV2ZWxvcGVycywgdGhlIHN0YWtlcyBhcmUgZ2VuZXJhbGx5IGxvd2VyIHRoYW4gdGhvc2UgZm9yIGNvbWJhdCBlbmdpbmVlcnMuIEJ1dCB3ZSBmYWNlIG91ciBvd24gaG9zdGlsZSBlbnZpcm9ubWVudDogdW5kZXJwb3dlcmVkIGRldmljZXMsIHBvb3IgbmV0d29yayBjb25uZWN0aW9ucywgYW5kIHRoZSBjb21wbGV4aXR5IGluaGVyZW50IGluIGZyb250LWVuZCBlbmdpbmVlcmluZy4gU2FwcGVyLCB3aGljaCBpcyBzaG9ydCBmb3IgPHN0cm9uZz5TPC9zdHJvbmc+dmVsdGUgPHN0cm9uZz5hcHA8L3N0cm9uZz4gbWFrPHN0cm9uZz5lcjwvc3Ryb25nPiwgaXMgeW91ciBjb3VyYWdlb3VzIGFuZCBkdXRpZnVsIGFsbHkuPC9wPlxuXHRcdGBcblx0fSxcblxuXHR7XG5cdFx0dGl0bGU6ICdIb3cgaXMgU2FwcGVyIGRpZmZlcmVudCBmcm9tIE5leHQuanM/Jyxcblx0XHRzbHVnOiAnaG93LWlzLXNhcHBlci1kaWZmZXJlbnQtZnJvbS1uZXh0Jyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD48YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vemVpdC9uZXh0LmpzJz5OZXh0LmpzPC9hPiBpcyBhIFJlYWN0IGZyYW1ld29yayBmcm9tIDxhIGhyZWY9J2h0dHBzOi8vdmVyY2VsLmNvbS8nPlZlcmNlbDwvYT4sIGFuZCBpcyB0aGUgaW5zcGlyYXRpb24gZm9yIFNhcHBlci4gVGhlcmUgYXJlIGEgZmV3IG5vdGFibGUgZGlmZmVyZW5jZXMsIGhvd2V2ZXI6PC9wPlxuXG5cdFx0XHQ8dWw+XG5cdFx0XHRcdDxsaT5JdCdzIHBvd2VyZWQgYnkgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2Jz5TdmVsdGU8L2E+IGluc3RlYWQgb2YgUmVhY3QsIHNvIGl0J3MgZmFzdGVyIGFuZCB5b3VyIGFwcHMgYXJlIHNtYWxsZXI8L2xpPlxuXHRcdFx0XHQ8bGk+SW5zdGVhZCBvZiByb3V0ZSBtYXNraW5nLCB3ZSBlbmNvZGUgcm91dGUgcGFyYW1ldGVycyBpbiBmaWxlbmFtZXMuIEZvciBleGFtcGxlLCB0aGUgcGFnZSB5b3UncmUgbG9va2luZyBhdCByaWdodCBub3cgaXMgPGNvZGU+c3JjL3JvdXRlcy9ibG9nL1tzbHVnXS5zdmVsdGU8L2NvZGU+PC9saT5cblx0XHRcdFx0PGxpPkFzIHdlbGwgYXMgcGFnZXMgKFN2ZWx0ZSBjb21wb25lbnRzLCB3aGljaCByZW5kZXIgb24gc2VydmVyIG9yIGNsaWVudCksIHlvdSBjYW4gY3JlYXRlIDxlbT5zZXJ2ZXIgcm91dGVzPC9lbT4gaW4geW91ciA8Y29kZT5yb3V0ZXM8L2NvZGU+IGRpcmVjdG9yeS4gVGhlc2UgYXJlIGp1c3QgPGNvZGU+LmpzPC9jb2RlPiBmaWxlcyB0aGF0IGV4cG9ydCBmdW5jdGlvbnMgY29ycmVzcG9uZGluZyB0byBIVFRQIG1ldGhvZHMsIGFuZCByZWNlaXZlIEV4cHJlc3MgPGNvZGU+cmVxdWVzdDwvY29kZT4gYW5kIDxjb2RlPnJlc3BvbnNlPC9jb2RlPiBvYmplY3RzIGFzIGFyZ3VtZW50cy4gVGhpcyBtYWtlcyBpdCB2ZXJ5IGVhc3kgdG8sIGZvciBleGFtcGxlLCBhZGQgYSBKU09OIEFQSSBzdWNoIGFzIHRoZSBvbmUgPGEgaHJlZj0nYmxvZy9ob3ctaXMtc2FwcGVyLWRpZmZlcmVudC1mcm9tLW5leHQuanNvbic+cG93ZXJpbmcgdGhpcyB2ZXJ5IHBhZ2U8L2E+PC9saT5cblx0XHRcdFx0PGxpPkxpbmtzIGFyZSBqdXN0IDxjb2RlPiZsdDthJmd0OzwvY29kZT4gZWxlbWVudHMsIHJhdGhlciB0aGFuIGZyYW1ld29yay1zcGVjaWZpYyA8Y29kZT4mbHQ7TGluayZndDs8L2NvZGU+IGNvbXBvbmVudHMuIFRoYXQgbWVhbnMsIGZvciBleGFtcGxlLCB0aGF0IDxhIGhyZWY9J2Jsb2cvaG93LWNhbi1pLWdldC1pbnZvbHZlZCc+dGhpcyBsaW5rIHJpZ2h0IGhlcmU8L2E+LCBkZXNwaXRlIGJlaW5nIGluc2lkZSBhIGJsb2Igb2YgSFRNTCwgd29ya3Mgd2l0aCB0aGUgcm91dGVyIGFzIHlvdSdkIGV4cGVjdC48L2xpPlxuXHRcdFx0PC91bD5cblx0XHRgXG5cdH0sXG5cblx0e1xuXHRcdHRpdGxlOiAnSG93IGNhbiBJIGdldCBpbnZvbHZlZD8nLFxuXHRcdHNsdWc6ICdob3ctY2FuLWktZ2V0LWludm9sdmVkJyxcblx0XHRodG1sOiBgXG5cdFx0XHQ8cD5XZSdyZSBzbyBnbGFkIHlvdSBhc2tlZCEgQ29tZSBvbiBvdmVyIHRvIHRoZSA8YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc3ZlbHRlJz5TdmVsdGU8L2E+IGFuZCA8YSBocmVmPSdodHRwczovL2dpdGh1Yi5jb20vc3ZlbHRlanMvc2FwcGVyJz5TYXBwZXI8L2E+IHJlcG9zLCBhbmQgam9pbiB1cyBpbiB0aGUgPGEgaHJlZj0naHR0cHM6Ly9zdmVsdGUuZGV2L2NoYXQnPkRpc2NvcmQgY2hhdHJvb208L2E+LiBFdmVyeW9uZSBpcyB3ZWxjb21lLCBlc3BlY2lhbGx5IHlvdSE8L3A+XG5cdFx0YFxuXHR9XG5dO1xuXG5wb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuXHRwb3N0Lmh0bWwgPSBwb3N0Lmh0bWwucmVwbGFjZSgvXlxcdHszfS9nbSwgJycpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHBvc3RzO1xuIiwiaW1wb3J0IHBvc3RzIGZyb20gJy4vX3Bvc3RzLmpzJztcblxuY29uc3QgY29udGVudHMgPSBKU09OLnN0cmluZ2lmeShwb3N0cy5tYXAocG9zdCA9PiB7XG5cdHJldHVybiB7XG5cdFx0dGl0bGU6IHBvc3QudGl0bGUsXG5cdFx0c2x1ZzogcG9zdC5zbHVnXG5cdH07XG59KSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQocmVxLCByZXMpIHtcblx0cmVzLndyaXRlSGVhZCgyMDAsIHtcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdH0pO1xuXG5cdHJlcy5lbmQoY29udGVudHMpO1xufSIsImltcG9ydCBwb3N0cyBmcm9tICcuL19wb3N0cy5qcyc7XG5cbmNvbnN0IGxvb2t1cCA9IG5ldyBNYXAoKTtcbnBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG5cdGxvb2t1cC5zZXQocG9zdC5zbHVnLCBKU09OLnN0cmluZ2lmeShwb3N0KSk7XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldChyZXEsIHJlcywgbmV4dCkge1xuXHQvLyB0aGUgYHNsdWdgIHBhcmFtZXRlciBpcyBhdmFpbGFibGUgYmVjYXVzZVxuXHQvLyB0aGlzIGZpbGUgaXMgY2FsbGVkIFtzbHVnXS5qc29uLmpzXG5cdGNvbnN0IHsgc2x1ZyB9ID0gcmVxLnBhcmFtcztcblxuXHRpZiAobG9va3VwLmhhcyhzbHVnKSkge1xuXHRcdHJlcy53cml0ZUhlYWQoMjAwLCB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSk7XG5cblx0XHRyZXMuZW5kKGxvb2t1cC5nZXQoc2x1ZykpO1xuXHR9IGVsc2Uge1xuXHRcdHJlcy53cml0ZUhlYWQoNDA0LCB7XG5cdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0fSk7XG5cblx0XHRyZXMuZW5kKEpTT04uc3RyaW5naWZ5KHtcblx0XHRcdG1lc3NhZ2U6IGBOb3QgZm91bmRgXG5cdFx0fSkpO1xuXHR9XG59XG4iLCJmdW5jdGlvbiBub29wKCkgeyB9XG5jb25zdCBpZGVudGl0eSA9IHggPT4geDtcbmZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmb3IgKGNvbnN0IGsgaW4gc3JjKVxuICAgICAgICB0YXJba10gPSBzcmNba107XG4gICAgcmV0dXJuIHRhcjtcbn1cbmZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcbiAgICBlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG4gICAgICAgIGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuICAgIH07XG59XG5mdW5jdGlvbiBydW4oZm4pIHtcbiAgICByZXR1cm4gZm4oKTtcbn1cbmZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmZ1bmN0aW9uIHJ1bl9hbGwoZm5zKSB7XG4gICAgZm5zLmZvckVhY2gocnVuKTtcbn1cbmZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYiB8fCAoKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuZnVuY3Rpb24gaXNfZW1wdHkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcbiAgICBpZiAoc3RvcmUgIT0gbnVsbCAmJiB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIC4uLmNhbGxiYWNrcykge1xuICAgIGlmIChzdG9yZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgICBjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZSguLi5jYWxsYmFja3MpO1xuICAgIHJldHVybiB1bnN1Yi51bnN1YnNjcmliZSA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKCkgOiB1bnN1Yjtcbn1cbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBzdWJzY3JpYmUoc3RvcmUsIF8gPT4gdmFsdWUgPSBfKSgpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbik7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXSAmJiBmblxuICAgICAgICA/IGFzc2lnbigkJHNjb3BlLmN0eC5zbGljZSgpLCBkZWZpbml0aW9uWzFdKGZuKGN0eCkpKVxuICAgICAgICA6ICQkc2NvcGUuY3R4O1xufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvblsyXSAmJiBmbikge1xuICAgICAgICBjb25zdCBsZXRzID0gZGVmaW5pdGlvblsyXShmbihkaXJ0eSkpO1xuICAgICAgICBpZiAoJCRzY29wZS5kaXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbGV0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxldHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KCQkc2NvcGUuZGlydHkubGVuZ3RoLCBsZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkW2ldID0gJCRzY29wZS5kaXJ0eVtpXSB8IGxldHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkJHNjb3BlLmRpcnR5IHwgbGV0cztcbiAgICB9XG4gICAgcmV0dXJuICQkc2NvcGUuZGlydHk7XG59XG5mdW5jdGlvbiB1cGRhdGVfc2xvdChzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4sIGdldF9zbG90X2NvbnRleHRfZm4pIHtcbiAgICBjb25zdCBzbG90X2NoYW5nZXMgPSBnZXRfc2xvdF9jaGFuZ2VzKHNsb3RfZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4pO1xuICAgIGlmIChzbG90X2NoYW5nZXMpIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dChzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG4gICAgICAgIHNsb3QucChzbG90X2NvbnRleHQsIHNsb3RfY2hhbmdlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Jlc3RfcHJvcHMocHJvcHMsIGtleXMpIHtcbiAgICBjb25zdCByZXN0ID0ge307XG4gICAga2V5cyA9IG5ldyBTZXQoa2V5cyk7XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoIWtleXMuaGFzKGspICYmIGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3Rba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVfc2xvdHMoc2xvdHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzbG90cykge1xuICAgICAgICByZXN1bHRba2V5XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocmFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X3N0b3JlX3ZhbHVlKHN0b3JlLCByZXQsIHZhbHVlID0gcmV0KSB7XG4gICAgc3RvcmUuc2V0KHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufVxuY29uc3QgaGFzX3Byb3AgPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbmZ1bmN0aW9uIGFjdGlvbl9kZXN0cm95ZXIoYWN0aW9uX3Jlc3VsdCkge1xuICAgIHJldHVybiBhY3Rpb25fcmVzdWx0ICYmIGlzX2Z1bmN0aW9uKGFjdGlvbl9yZXN1bHQuZGVzdHJveSkgPyBhY3Rpb25fcmVzdWx0LmRlc3Ryb3kgOiBub29wO1xufVxuXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmxldCByYWYgPSBpc19jbGllbnQgPyBjYiA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIDogbm9vcDtcbi8vIHVzZWQgaW50ZXJuYWxseSBmb3IgdGVzdGluZ1xuZnVuY3Rpb24gc2V0X25vdyhmbikge1xuICAgIG5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIHJhZiA9IGZuO1xufVxuXG5jb25zdCB0YXNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIHJ1bl90YXNrcyhub3cpIHtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAoIXRhc2suYyhub3cpKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgICAgICB0YXNrLmYoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0YXNrcy5zaXplICE9PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seSFcbiAqL1xuZnVuY3Rpb24gY2xlYXJfbG9vcHMoKSB7XG4gICAgdGFza3MuY2xlYXIoKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0YXNrIHRoYXQgcnVucyBvbiBlYWNoIHJhZiBmcmFtZVxuICogdW50aWwgaXQgcmV0dXJucyBhIGZhbHN5IHZhbHVlIG9yIGlzIGFib3J0ZWRcbiAqL1xuZnVuY3Rpb24gbG9vcChjYWxsYmFjaykge1xuICAgIGxldCB0YXNrO1xuICAgIGlmICh0YXNrcy5zaXplID09PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHRhcmdldCwgbm9kZSkge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2VhY2goaXRlcmF0aW9ucywgZGV0YWNoaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxuICAgICAgICAgICAgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICBpZiAoaGFzX3Byb3Aob2JqLCBrKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgJiYgZXhjbHVkZS5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGFyZ2V0W2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cbmZ1bmN0aW9uIHNwYWNlKCkge1xuICAgIHJldHVybiB0ZXh0KCcgJyk7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGV4dCgnJyk7XG59XG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZWxmKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSAhPT0gdmFsdWUpXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG5vZGUuX19wcm90b19fKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfX3ZhbHVlJykge1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9IG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdG9yc1trZXldICYmIGRlc2NyaXB0b3JzW2tleV0uc2V0KSB7XG4gICAgICAgICAgICBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdmdfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgIGlmIChwcm9wIGluIG5vZGUpIHtcbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0cihub2RlLCBwcm9wLCB2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24geGxpbmtfYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXAsIF9fdmFsdWUsIGNoZWNrZWQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChncm91cFtpXS5jaGVja2VkKVxuICAgICAgICAgICAgdmFsdWUuYWRkKGdyb3VwW2ldLl9fdmFsdWUpO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrZWQpIHtcbiAgICAgICAgdmFsdWUuZGVsZXRlKF9fdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG59XG5mdW5jdGlvbiB0b19udW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gbnVsbCA6ICt2YWx1ZTtcbn1cbmZ1bmN0aW9uIHRpbWVfcmFuZ2VzX3RvX2FycmF5KHJhbmdlcykge1xuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJyYXkucHVzaCh7IHN0YXJ0OiByYW5nZXMuc3RhcnQoaSksIGVuZDogcmFuZ2VzLmVuZChpKSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuZnVuY3Rpb24gY2hpbGRyZW4oZWxlbWVudCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2Rlcyk7XG59XG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBzdmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIGxldCBqID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gbm9kZS5hdHRyaWJ1dGVzW2orK107XG4gICAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZS5uYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUucHVzaChhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZW1vdmUubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShyZW1vdmVba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3ZnID8gc3ZnX2VsZW1lbnQobmFtZSkgOiBlbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gY2xhaW1fdGV4dChub2RlcywgZGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gJycgKyBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dChkYXRhKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3NwYWNlKG5vZGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX3RleHQobm9kZXMsICcgJyk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YSh0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgIT09IGRhdGEpXG4gICAgICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdmFsdWUoaW5wdXQsIHZhbHVlKSB7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF90eXBlKGlucHV0LCB0eXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3R5bGUobm9kZSwga2V5LCB2YWx1ZSwgaW1wb3J0YW50KSB7XG4gICAgbm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIGlmIChvcHRpb24uX192YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9ucyhzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gfnZhbHVlLmluZGV4T2Yob3B0aW9uLl9fdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF92YWx1ZShzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKSB8fCBzZWxlY3Qub3B0aW9uc1swXTtcbiAgICByZXR1cm4gc2VsZWN0ZWRfb3B0aW9uICYmIHNlbGVjdGVkX29wdGlvbi5fX3ZhbHVlO1xufVxuZnVuY3Rpb24gc2VsZWN0X211bHRpcGxlX3ZhbHVlKHNlbGVjdCkge1xuICAgIHJldHVybiBbXS5tYXAuY2FsbChzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSwgb3B0aW9uID0+IG9wdGlvbi5fX3ZhbHVlKTtcbn1cbi8vIHVuZm9ydHVuYXRlbHkgdGhpcyBjYW4ndCBiZSBhIGNvbnN0YW50IGFzIHRoYXQgd291bGRuJ3QgYmUgdHJlZS1zaGFrZWFibGVcbi8vIHNvIHdlIGNhY2hlIHRoZSByZXN1bHQgaW5zdGVhZFxubGV0IGNyb3Nzb3JpZ2luO1xuZnVuY3Rpb24gaXNfY3Jvc3NvcmlnaW4oKSB7XG4gICAgaWYgKGNyb3Nzb3JpZ2luID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3Jvc3NvcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdm9pZCB3aW5kb3cucGFyZW50LmRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY3Jvc3NvcmlnaW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjcm9zc29yaWdpbjtcbn1cbmZ1bmN0aW9uIGFkZF9yZXNpemVfbGlzdGVuZXIobm9kZSwgZm4pIHtcbiAgICBjb25zdCBjb21wdXRlZF9zdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3Qgel9pbmRleCA9IChwYXJzZUludChjb21wdXRlZF9zdHlsZS56SW5kZXgpIHx8IDApIC0gMTtcbiAgICBpZiAoY29tcHV0ZWRfc3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIH1cbiAgICBjb25zdCBpZnJhbWUgPSBlbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsIGBkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IGAgK1xuICAgICAgICBgb3ZlcmZsb3c6IGhpZGRlbjsgYm9yZGVyOiAwOyBvcGFjaXR5OiAwOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogJHt6X2luZGV4fTtgKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgaWZyYW1lLnRhYkluZGV4ID0gLTE7XG4gICAgY29uc3QgY3Jvc3NvcmlnaW4gPSBpc19jcm9zc29yaWdpbigpO1xuICAgIGxldCB1bnN1YnNjcmliZTtcbiAgICBpZiAoY3Jvc3NvcmlnaW4pIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9IGBkYXRhOnRleHQvaHRtbCw8c2NyaXB0Pm9ucmVzaXplPWZ1bmN0aW9uKCl7cGFyZW50LnBvc3RNZXNzYWdlKDAsJyonKX08L3NjcmlwdD5gO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3Rlbih3aW5kb3csICdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBpZnJhbWUuY29udGVudFdpbmRvdylcbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgICBpZnJhbWUub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUgPSBsaXN0ZW4oaWZyYW1lLmNvbnRlbnRXaW5kb3csICdyZXNpemUnLCBmbik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGFwcGVuZChub2RlLCBpZnJhbWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChjcm9zc29yaWdpbikge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1bnN1YnNjcmliZSAmJiBpZnJhbWUuY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBkZXRhY2goaWZyYW1lKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIG5hbWUsIHRvZ2dsZSkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0W3RvZ2dsZSA/ICdhZGQnIDogJ3JlbW92ZSddKG5hbWUpO1xufVxuZnVuY3Rpb24gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIGRldGFpbCk7XG4gICAgcmV0dXJuIGU7XG59XG5mdW5jdGlvbiBxdWVyeV9zZWxlY3Rvcl9hbGwoc2VsZWN0b3IsIHBhcmVudCA9IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xufVxuY2xhc3MgSHRtbFRhZyB7XG4gICAgY29uc3RydWN0b3IoYW5jaG9yID0gbnVsbCkge1xuICAgICAgICB0aGlzLmEgPSBhbmNob3I7XG4gICAgICAgIHRoaXMuZSA9IHRoaXMubiA9IG51bGw7XG4gICAgfVxuICAgIG0oaHRtbCwgdGFyZ2V0LCBhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIGlmICghdGhpcy5lKSB7XG4gICAgICAgICAgICB0aGlzLmUgPSBlbGVtZW50KHRhcmdldC5ub2RlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pKGFuY2hvcik7XG4gICAgfVxuICAgIGgoaHRtbCkge1xuICAgICAgICB0aGlzLmUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgdGhpcy5uID0gQXJyYXkuZnJvbSh0aGlzLmUuY2hpbGROb2Rlcyk7XG4gICAgfVxuICAgIGkoYW5jaG9yKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5uLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpbnNlcnQodGhpcy50LCB0aGlzLm5baV0sIGFuY2hvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcChodG1sKSB7XG4gICAgICAgIHRoaXMuZCgpO1xuICAgICAgICB0aGlzLmgoaHRtbCk7XG4gICAgICAgIHRoaXMuaSh0aGlzLmEpO1xuICAgIH1cbiAgICBkKCkge1xuICAgICAgICB0aGlzLm4uZm9yRWFjaChkZXRhY2gpO1xuICAgIH1cbn1cblxuY29uc3QgYWN0aXZlX2RvY3MgPSBuZXcgU2V0KCk7XG5sZXQgYWN0aXZlID0gMDtcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXJrc2t5YXBwL3N0cmluZy1oYXNoL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5mdW5jdGlvbiBoYXNoKHN0cikge1xuICAgIGxldCBoYXNoID0gNTM4MTtcbiAgICBsZXQgaSA9IHN0ci5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpIF4gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGhhc2ggPj4+IDA7XG59XG5mdW5jdGlvbiBjcmVhdGVfcnVsZShub2RlLCBhLCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2UsIGZuLCB1aWQgPSAwKSB7XG4gICAgY29uc3Qgc3RlcCA9IDE2LjY2NiAvIGR1cmF0aW9uO1xuICAgIGxldCBrZXlmcmFtZXMgPSAne1xcbic7XG4gICAgZm9yIChsZXQgcCA9IDA7IHAgPD0gMTsgcCArPSBzdGVwKSB7XG4gICAgICAgIGNvbnN0IHQgPSBhICsgKGIgLSBhKSAqIGVhc2UocCk7XG4gICAgICAgIGtleWZyYW1lcyArPSBwICogMTAwICsgYCV7JHtmbih0LCAxIC0gdCl9fVxcbmA7XG4gICAgfVxuICAgIGNvbnN0IHJ1bGUgPSBrZXlmcmFtZXMgKyBgMTAwJSB7JHtmbihiLCAxIC0gYil9fVxcbn1gO1xuICAgIGNvbnN0IG5hbWUgPSBgX19zdmVsdGVfJHtoYXNoKHJ1bGUpfV8ke3VpZH1gO1xuICAgIGNvbnN0IGRvYyA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICBhY3RpdmVfZG9jcy5hZGQoZG9jKTtcbiAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQgfHwgKGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0ID0gZG9jLmhlYWQuYXBwZW5kQ2hpbGQoZWxlbWVudCgnc3R5bGUnKSkuc2hlZXQpO1xuICAgIGNvbnN0IGN1cnJlbnRfcnVsZXMgPSBkb2MuX19zdmVsdGVfcnVsZXMgfHwgKGRvYy5fX3N2ZWx0ZV9ydWxlcyA9IHt9KTtcbiAgICBpZiAoIWN1cnJlbnRfcnVsZXNbbmFtZV0pIHtcbiAgICAgICAgY3VycmVudF9ydWxlc1tuYW1lXSA9IHRydWU7XG4gICAgICAgIHN0eWxlc2hlZXQuaW5zZXJ0UnVsZShgQGtleWZyYW1lcyAke25hbWV9ICR7cnVsZX1gLCBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aCk7XG4gICAgfVxuICAgIGNvbnN0IGFuaW1hdGlvbiA9IG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnO1xuICAgIG5vZGUuc3R5bGUuYW5pbWF0aW9uID0gYCR7YW5pbWF0aW9uID8gYCR7YW5pbWF0aW9ufSwgYCA6IGBgfSR7bmFtZX0gJHtkdXJhdGlvbn1tcyBsaW5lYXIgJHtkZWxheX1tcyAxIGJvdGhgO1xuICAgIGFjdGl2ZSArPSAxO1xuICAgIHJldHVybiBuYW1lO1xufVxuZnVuY3Rpb24gZGVsZXRlX3J1bGUobm9kZSwgbmFtZSkge1xuICAgIGNvbnN0IHByZXZpb3VzID0gKG5vZGUuc3R5bGUuYW5pbWF0aW9uIHx8ICcnKS5zcGxpdCgnLCAnKTtcbiAgICBjb25zdCBuZXh0ID0gcHJldmlvdXMuZmlsdGVyKG5hbWVcbiAgICAgICAgPyBhbmltID0+IGFuaW0uaW5kZXhPZihuYW1lKSA8IDAgLy8gcmVtb3ZlIHNwZWNpZmljIGFuaW1hdGlvblxuICAgICAgICA6IGFuaW0gPT4gYW5pbS5pbmRleE9mKCdfX3N2ZWx0ZScpID09PSAtMSAvLyByZW1vdmUgYWxsIFN2ZWx0ZSBhbmltYXRpb25zXG4gICAgKTtcbiAgICBjb25zdCBkZWxldGVkID0gcHJldmlvdXMubGVuZ3RoIC0gbmV4dC5sZW5ndGg7XG4gICAgaWYgKGRlbGV0ZWQpIHtcbiAgICAgICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBuZXh0LmpvaW4oJywgJyk7XG4gICAgICAgIGFjdGl2ZSAtPSBkZWxldGVkO1xuICAgICAgICBpZiAoIWFjdGl2ZSlcbiAgICAgICAgICAgIGNsZWFyX3J1bGVzKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJfcnVsZXMoKSB7XG4gICAgcmFmKCgpID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgYWN0aXZlX2RvY3MuZm9yRWFjaChkb2MgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGVzaGVldCA9IGRvYy5fX3N2ZWx0ZV9zdHlsZXNoZWV0O1xuICAgICAgICAgICAgbGV0IGkgPSBzdHlsZXNoZWV0LmNzc1J1bGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldC5kZWxldGVSdWxlKGkpO1xuICAgICAgICAgICAgZG9jLl9fc3ZlbHRlX3J1bGVzID0ge307XG4gICAgICAgIH0pO1xuICAgICAgICBhY3RpdmVfZG9jcy5jbGVhcigpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVfYW5pbWF0aW9uKG5vZGUsIGZyb20sIGZuLCBwYXJhbXMpIHtcbiAgICBpZiAoIWZyb20pXG4gICAgICAgIHJldHVybiBub29wO1xuICAgIGNvbnN0IHRvID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoZnJvbS5sZWZ0ID09PSB0by5sZWZ0ICYmIGZyb20ucmlnaHQgPT09IHRvLnJpZ2h0ICYmIGZyb20udG9wID09PSB0by50b3AgJiYgZnJvbS5ib3R0b20gPT09IHRvLmJvdHRvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOiBzaG91bGQgdGhpcyBiZSBzZXBhcmF0ZWQgZnJvbSBkZXN0cnVjdHVyaW5nPyBPciBzdGFydC9lbmQgYWRkZWQgdG8gcHVibGljIGFwaSBhbmQgZG9jdW1lbnRhdGlvbj9cbiAgICBzdGFydDogc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXksIFxuICAgIC8vIEB0cy1pZ25vcmUgdG9kbzpcbiAgICBlbmQgPSBzdGFydF90aW1lICsgZHVyYXRpb24sIHRpY2sgPSBub29wLCBjc3MgfSA9IGZuKG5vZGUsIHsgZnJvbSwgdG8gfSwgcGFyYW1zKTtcbiAgICBsZXQgcnVubmluZyA9IHRydWU7XG4gICAgbGV0IHN0YXJ0ZWQgPSBmYWxzZTtcbiAgICBsZXQgbmFtZTtcbiAgICBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIDAsIDEsIGR1cmF0aW9uLCBkZWxheSwgZWFzaW5nLCBjc3MpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgIGlmIChjc3MpXG4gICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBuYW1lKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBsb29wKG5vdyA9PiB7XG4gICAgICAgIGlmICghc3RhcnRlZCAmJiBub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ZWQgJiYgbm93ID49IGVuZCkge1xuICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgY29uc3QgcCA9IG5vdyAtIHN0YXJ0X3RpbWU7XG4gICAgICAgICAgICBjb25zdCB0ID0gMCArIDEgKiBlYXNpbmcocCAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHN0YXJ0KCk7XG4gICAgdGljaygwLCAxKTtcbiAgICByZXR1cm4gc3RvcDtcbn1cbmZ1bmN0aW9uIGZpeF9wb3NpdGlvbihub2RlKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGlmIChzdHlsZS5wb3NpdGlvbiAhPT0gJ2Fic29sdXRlJyAmJiBzdHlsZS5wb3NpdGlvbiAhPT0gJ2ZpeGVkJykge1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHN0eWxlO1xuICAgICAgICBjb25zdCBhID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIG5vZGUuc3R5bGUud2lkdGggPSB3aWR0aDtcbiAgICAgICAgbm9kZS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGFkZF90cmFuc2Zvcm0obm9kZSwgYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkX3RyYW5zZm9ybShub2RlLCBhKSB7XG4gICAgY29uc3QgYiA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgaWYgKGEubGVmdCAhPT0gYi5sZWZ0IHx8IGEudG9wICE9PSBiLnRvcCkge1xuICAgICAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XG4gICAgICAgIG5vZGUuc3R5bGUudHJhbnNmb3JtID0gYCR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHthLmxlZnQgLSBiLmxlZnR9cHgsICR7YS50b3AgLSBiLnRvcH1weClgO1xuICAgIH1cbn1cblxubGV0IGN1cnJlbnRfY29tcG9uZW50O1xuZnVuY3Rpb24gc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgIGN1cnJlbnRfY29tcG9uZW50ID0gY29tcG9uZW50O1xufVxuZnVuY3Rpb24gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkge1xuICAgIGlmICghY3VycmVudF9jb21wb25lbnQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRnVuY3Rpb24gY2FsbGVkIG91dHNpZGUgY29tcG9uZW50IGluaXRpYWxpemF0aW9uYCk7XG4gICAgcmV0dXJuIGN1cnJlbnRfY29tcG9uZW50O1xufVxuZnVuY3Rpb24gYmVmb3JlVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYmVmb3JlX3VwZGF0ZS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIG9uTW91bnQoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9tb3VudC5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGFmdGVyVXBkYXRlKGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuYWZ0ZXJfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25EZXN0cm95KGZuKSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQub25fZGVzdHJveS5wdXNoKGZuKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlcigpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICByZXR1cm4gKHR5cGUsIGRldGFpbCkgPT4ge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW3R5cGVdO1xuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAvLyBUT0RPIGFyZSB0aGVyZSBzaXR1YXRpb25zIHdoZXJlIGV2ZW50cyBjb3VsZCBiZSBkaXNwYXRjaGVkXG4gICAgICAgICAgICAvLyBpbiBhIHNlcnZlciAobm9uLURPTSkgZW52aXJvbm1lbnQ/XG4gICAgICAgICAgICBjb25zdCBldmVudCA9IGN1c3RvbV9ldmVudCh0eXBlLCBkZXRhaWwpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb21wb25lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHNldENvbnRleHQoa2V5LCBjb250ZXh0KSB7XG4gICAgZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5zZXQoa2V5LCBjb250ZXh0KTtcbn1cbmZ1bmN0aW9uIGdldENvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuZ2V0KGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiBmbihldmVudCkpO1xuICAgIH1cbn1cblxuY29uc3QgZGlydHlfY29tcG9uZW50cyA9IFtdO1xuY29uc3QgaW50cm9zID0geyBlbmFibGVkOiBmYWxzZSB9O1xuY29uc3QgYmluZGluZ19jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlbmRlcl9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IGZsdXNoX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVzb2x2ZWRfcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIHNjaGVkdWxlX3VwZGF0ZSgpIHtcbiAgICBpZiAoIXVwZGF0ZV9zY2hlZHVsZWQpIHtcbiAgICAgICAgdXBkYXRlX3NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHJlc29sdmVkX3Byb21pc2UudGhlbihmbHVzaCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdGljaygpIHtcbiAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICByZXR1cm4gcmVzb2x2ZWRfcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGFkZF9yZW5kZXJfY2FsbGJhY2soZm4pIHtcbiAgICByZW5kZXJfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWRkX2ZsdXNoX2NhbGxiYWNrKGZuKSB7XG4gICAgZmx1c2hfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxubGV0IGZsdXNoaW5nID0gZmFsc2U7XG5jb25zdCBzZWVuX2NhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGlmIChmbHVzaGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlydHlfY29tcG9uZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudC4kJCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyAuLi5zbyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xuICAgIHNlZW5fY2FsbGJhY2tzLmNsZWFyKCk7XG59XG5mdW5jdGlvbiB1cGRhdGUoJCQpIHtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgJCQudXBkYXRlKCk7XG4gICAgICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3VwZGF0ZSk7XG4gICAgICAgIGNvbnN0IGRpcnR5ID0gJCQuZGlydHk7XG4gICAgICAgICQkLmRpcnR5ID0gWy0xXTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQucCgkJC5jdHgsIGRpcnR5KTtcbiAgICAgICAgJCQuYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG4gICAgfVxufVxuXG5sZXQgcHJvbWlzZTtcbmZ1bmN0aW9uIHdhaXQoKSB7XG4gICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBkaXNwYXRjaChub2RlLCBkaXJlY3Rpb24sIGtpbmQpIHtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoY3VzdG9tX2V2ZW50KGAke2RpcmVjdGlvbiA/ICdpbnRybycgOiAnb3V0cm8nfSR7a2luZH1gKSk7XG59XG5jb25zdCBvdXRyb2luZyA9IG5ldyBTZXQoKTtcbmxldCBvdXRyb3M7XG5mdW5jdGlvbiBncm91cF9vdXRyb3MoKSB7XG4gICAgb3V0cm9zID0ge1xuICAgICAgICByOiAwLFxuICAgICAgICBjOiBbXSxcbiAgICAgICAgcDogb3V0cm9zIC8vIHBhcmVudCBncm91cFxuICAgIH07XG59XG5mdW5jdGlvbiBjaGVja19vdXRyb3MoKSB7XG4gICAgaWYgKCFvdXRyb3Mucikge1xuICAgICAgICBydW5fYWxsKG91dHJvcy5jKTtcbiAgICB9XG4gICAgb3V0cm9zID0gb3V0cm9zLnA7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX2luKGJsb2NrLCBsb2NhbCkge1xuICAgIGlmIChibG9jayAmJiBibG9jay5pKSB7XG4gICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XG4gICAgICAgIGJsb2NrLmkobG9jYWwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25fb3V0KGJsb2NrLCBsb2NhbCwgZGV0YWNoLCBjYWxsYmFjaykge1xuICAgIGlmIChibG9jayAmJiBibG9jay5vKSB7XG4gICAgICAgIGlmIChvdXRyb2luZy5oYXMoYmxvY2spKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBvdXRyb2luZy5hZGQoYmxvY2spO1xuICAgICAgICBvdXRyb3MuYy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoZGV0YWNoKVxuICAgICAgICAgICAgICAgICAgICBibG9jay5kKDEpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBibG9jay5vKGxvY2FsKTtcbiAgICB9XG59XG5jb25zdCBudWxsX3RyYW5zaXRpb24gPSB7IGR1cmF0aW9uOiAwIH07XG5mdW5jdGlvbiBjcmVhdGVfaW5fdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSBmYWxzZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgbGV0IHRhc2s7XG4gICAgbGV0IHVpZCA9IDA7XG4gICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcywgdWlkKyspO1xuICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGlmICh0YXNrKVxuICAgICAgICAgICAgdGFzay5hYm9ydCgpO1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCB0cnVlLCAnc3RhcnQnKSk7XG4gICAgICAgIHRhc2sgPSBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKGdvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRhdGUoKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfb3V0X3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgY29uc3QgZ3JvdXAgPSBvdXRyb3M7XG4gICAgZ3JvdXAuciArPSAxO1xuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAxLCAwLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnc3RhcnQnKSk7XG4gICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tZ3JvdXAucikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHJlc3VsdCBpbiBgZW5kKClgIGJlaW5nIGNhbGxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IG5lZWQgdG8gY2xlYW4gdXAgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxIC0gdCwgdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ28oKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5kKHJlc2V0KSB7XG4gICAgICAgICAgICBpZiAocmVzZXQgJiYgY29uZmlnLnRpY2spIHtcbiAgICAgICAgICAgICAgICBjb25maWcudGljaygxLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcywgaW50cm8pIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgdCA9IGludHJvID8gMCA6IDE7XG4gICAgbGV0IHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lID0gbnVsbDtcbiAgICBmdW5jdGlvbiBjbGVhcl9hbmltYXRpb24oKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdChwcm9ncmFtLCBkdXJhdGlvbikge1xuICAgICAgICBjb25zdCBkID0gcHJvZ3JhbS5iIC0gdDtcbiAgICAgICAgZHVyYXRpb24gKj0gTWF0aC5hYnMoZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhOiB0LFxuICAgICAgICAgICAgYjogcHJvZ3JhbS5iLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgc3RhcnQ6IHByb2dyYW0uc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHByb2dyYW0uc3RhcnQgKyBkdXJhdGlvbixcbiAgICAgICAgICAgIGdyb3VwOiBwcm9ncmFtLmdyb3VwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKGIpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBub3coKSArIGRlbGF5LFxuICAgICAgICAgICAgYlxuICAgICAgICB9O1xuICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBwcm9ncmFtLmdyb3VwID0gb3V0cm9zO1xuICAgICAgICAgICAgb3V0cm9zLnIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBwcm9ncmFtO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhbiBpbnRybywgYW5kIHRoZXJlJ3MgYSBkZWxheSwgd2UgbmVlZCB0byBkb1xuICAgICAgICAgICAgLy8gYW4gaW5pdGlhbCB0aWNrIGFuZC9vciBhcHBseSBDU1MgYW5pbWF0aW9uIGltbWVkaWF0ZWx5XG4gICAgICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBiLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChiKVxuICAgICAgICAgICAgICAgIHRpY2soMCwgMSk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHByb2dyYW0sIGR1cmF0aW9uKTtcbiAgICAgICAgICAgIGFkZF9yZW5kZXJfY2FsbGJhY2soKCkgPT4gZGlzcGF0Y2gobm9kZSwgYiwgJ3N0YXJ0JykpO1xuICAgICAgICAgICAgbG9vcChub3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nX3Byb2dyYW0gJiYgbm93ID4gcGVuZGluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmdfcHJvZ3JhbSA9IGluaXQocGVuZGluZ19wcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKG5vZGUsIHJ1bm5pbmdfcHJvZ3JhbS5iLCAnc3RhcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25fbmFtZSA9IGNyZWF0ZV9ydWxlKG5vZGUsIHQsIHJ1bm5pbmdfcHJvZ3JhbS5iLCBydW5uaW5nX3Byb2dyYW0uZHVyYXRpb24sIDAsIGVhc2luZywgY29uZmlnLmNzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm93ID49IHJ1bm5pbmdfcHJvZ3JhbS5lbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCA9IHJ1bm5pbmdfcHJvZ3JhbS5iLCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwZW5kaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSdyZSBkb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bm5pbmdfcHJvZ3JhbS5iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGludHJvIOKAlCB3ZSBjYW4gdGlkeSB1cCBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhcl9hbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG91dHJvIOKAlCBuZWVkcyB0byBiZSBjb29yZGluYXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIS0tcnVubmluZ19wcm9ncmFtLmdyb3VwLnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5fYWxsKHJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uc3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBub3cgLSBydW5uaW5nX3Byb2dyYW0uc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ID0gcnVubmluZ19wcm9ncmFtLmEgKyBydW5uaW5nX3Byb2dyYW0uZCAqIGVhc2luZyhwIC8gcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2sodCwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhIShydW5uaW5nX3Byb2dyYW0gfHwgcGVuZGluZ19wcm9ncmFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJ1bihiKSB7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnbyhiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlX3Byb21pc2UocHJvbWlzZSwgaW5mbykge1xuICAgIGNvbnN0IHRva2VuID0gaW5mby50b2tlbiA9IHt9O1xuICAgIGZ1bmN0aW9uIHVwZGF0ZSh0eXBlLCBpbmRleCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoaW5mby50b2tlbiAhPT0gdG9rZW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGluZm8ucmVzb2x2ZWQgPSB2YWx1ZTtcbiAgICAgICAgbGV0IGNoaWxkX2N0eCA9IGluZm8uY3R4O1xuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoaWxkX2N0eCA9IGNoaWxkX2N0eC5zbGljZSgpO1xuICAgICAgICAgICAgY2hpbGRfY3R4W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBibG9jayA9IHR5cGUgJiYgKGluZm8uY3VycmVudCA9IHR5cGUpKGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBuZWVkc19mbHVzaCA9IGZhbHNlO1xuICAgICAgICBpZiAoaW5mby5ibG9jaykge1xuICAgICAgICAgICAgaWYgKGluZm8uYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9ja3MuZm9yRWFjaCgoYmxvY2ssIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IGluZGV4ICYmIGJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cF9vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5ibG9ja3NbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja19vdXRyb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5mby5ibG9jay5kKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2suYygpO1xuICAgICAgICAgICAgdHJhbnNpdGlvbl9pbihibG9jaywgMSk7XG4gICAgICAgICAgICBibG9jay5tKGluZm8ubW91bnQoKSwgaW5mby5hbmNob3IpO1xuICAgICAgICAgICAgbmVlZHNfZmx1c2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGluZm8uYmxvY2sgPSBibG9jaztcbiAgICAgICAgaWYgKGluZm8uYmxvY2tzKVxuICAgICAgICAgICAgaW5mby5ibG9ja3NbaW5kZXhdID0gYmxvY2s7XG4gICAgICAgIGlmIChuZWVkc19mbHVzaCkge1xuICAgICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNfcHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50X2NvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgICAgICBwcm9taXNlLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChudWxsKTtcbiAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGN1cnJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLmNhdGNoLCAyLCBpbmZvLmVycm9yLCBlcnJvcik7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgICAgICBpZiAoIWluZm8uaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGlmIHdlIHByZXZpb3VzbHkgaGFkIGEgdGhlbi9jYXRjaCBibG9jaywgZGVzdHJveSBpdFxuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnBlbmRpbmcpIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnBlbmRpbmcsIDApO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChpbmZvLmN1cnJlbnQgIT09IGluZm8udGhlbikge1xuICAgICAgICAgICAgdXBkYXRlKGluZm8udGhlbiwgMSwgaW5mby52YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLnJlc29sdmVkID0gcHJvbWlzZTtcbiAgICB9XG59XG5cbmNvbnN0IGdsb2JhbHMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IHdpbmRvd1xuICAgIDogdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnXG4gICAgICAgID8gZ2xvYmFsVGhpc1xuICAgICAgICA6IGdsb2JhbCk7XG5cbmZ1bmN0aW9uIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmQoMSk7XG4gICAgbG9va3VwLmRlbGV0ZShibG9jay5rZXkpO1xufVxuZnVuY3Rpb24gb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIHRyYW5zaXRpb25fb3V0KGJsb2NrLCAxLCAxLCAoKSA9PiB7XG4gICAgICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZpeF9hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIGRlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX291dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5mKCk7XG4gICAgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCk7XG59XG5mdW5jdGlvbiB1cGRhdGVfa2V5ZWRfZWFjaChvbGRfYmxvY2tzLCBkaXJ0eSwgZ2V0X2tleSwgZHluYW1pYywgY3R4LCBsaXN0LCBsb29rdXAsIG5vZGUsIGRlc3Ryb3ksIGNyZWF0ZV9lYWNoX2Jsb2NrLCBuZXh0LCBnZXRfY29udGV4dCkge1xuICAgIGxldCBvID0gb2xkX2Jsb2Nrcy5sZW5ndGg7XG4gICAgbGV0IG4gPSBsaXN0Lmxlbmd0aDtcbiAgICBsZXQgaSA9IG87XG4gICAgY29uc3Qgb2xkX2luZGV4ZXMgPSB7fTtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBvbGRfaW5kZXhlc1tvbGRfYmxvY2tzW2ldLmtleV0gPSBpO1xuICAgIGNvbnN0IG5ld19ibG9ja3MgPSBbXTtcbiAgICBjb25zdCBuZXdfbG9va3VwID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGRlbHRhcyA9IG5ldyBNYXAoKTtcbiAgICBpID0gbjtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkX2N0eCA9IGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSk7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoY2hpbGRfY3R4KTtcbiAgICAgICAgbGV0IGJsb2NrID0gbG9va3VwLmdldChrZXkpO1xuICAgICAgICBpZiAoIWJsb2NrKSB7XG4gICAgICAgICAgICBibG9jayA9IGNyZWF0ZV9lYWNoX2Jsb2NrKGtleSwgY2hpbGRfY3R4KTtcbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkeW5hbWljKSB7XG4gICAgICAgICAgICBibG9jay5wKGNoaWxkX2N0eCwgZGlydHkpO1xuICAgICAgICB9XG4gICAgICAgIG5ld19sb29rdXAuc2V0KGtleSwgbmV3X2Jsb2Nrc1tpXSA9IGJsb2NrKTtcbiAgICAgICAgaWYgKGtleSBpbiBvbGRfaW5kZXhlcylcbiAgICAgICAgICAgIGRlbHRhcy5zZXQoa2V5LCBNYXRoLmFicyhpIC0gb2xkX2luZGV4ZXNba2V5XSkpO1xuICAgIH1cbiAgICBjb25zdCB3aWxsX21vdmUgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgZGlkX21vdmUgPSBuZXcgU2V0KCk7XG4gICAgZnVuY3Rpb24gaW5zZXJ0KGJsb2NrKSB7XG4gICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICBibG9jay5tKG5vZGUsIG5leHQpO1xuICAgICAgICBsb29rdXAuc2V0KGJsb2NrLmtleSwgYmxvY2spO1xuICAgICAgICBuZXh0ID0gYmxvY2suZmlyc3Q7XG4gICAgICAgIG4tLTtcbiAgICB9XG4gICAgd2hpbGUgKG8gJiYgbikge1xuICAgICAgICBjb25zdCBuZXdfYmxvY2sgPSBuZXdfYmxvY2tzW24gLSAxXTtcbiAgICAgICAgY29uc3Qgb2xkX2Jsb2NrID0gb2xkX2Jsb2Nrc1tvIC0gMV07XG4gICAgICAgIGNvbnN0IG5ld19rZXkgPSBuZXdfYmxvY2sua2V5O1xuICAgICAgICBjb25zdCBvbGRfa2V5ID0gb2xkX2Jsb2NrLmtleTtcbiAgICAgICAgaWYgKG5ld19ibG9jayA9PT0gb2xkX2Jsb2NrKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICBuZXh0ID0gbmV3X2Jsb2NrLmZpcnN0O1xuICAgICAgICAgICAgby0tO1xuICAgICAgICAgICAgbi0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFuZXdfbG9va3VwLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIG9sZCBibG9ja1xuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWxvb2t1cC5oYXMobmV3X2tleSkgfHwgd2lsbF9tb3ZlLmhhcyhuZXdfa2V5KSkge1xuICAgICAgICAgICAgaW5zZXJ0KG5ld19ibG9jayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlkX21vdmUuaGFzKG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGVsdGFzLmdldChuZXdfa2V5KSA+IGRlbHRhcy5nZXQob2xkX2tleSkpIHtcbiAgICAgICAgICAgIGRpZF9tb3ZlLmFkZChuZXdfa2V5KTtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2lsbF9tb3ZlLmFkZChvbGRfa2V5KTtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoby0tKSB7XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3Nbb107XG4gICAgICAgIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2Jsb2NrLmtleSkpXG4gICAgICAgICAgICBkZXN0cm95KG9sZF9ibG9jaywgbG9va3VwKTtcbiAgICB9XG4gICAgd2hpbGUgKG4pXG4gICAgICAgIGluc2VydChuZXdfYmxvY2tzW24gLSAxXSk7XG4gICAgcmV0dXJuIG5ld19ibG9ja3M7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2tleXMoY3R4LCBsaXN0LCBnZXRfY29udGV4dCwgZ2V0X2tleSkge1xuICAgIGNvbnN0IGtleXMgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGdldF9rZXkoZ2V0X2NvbnRleHQoY3R4LCBsaXN0LCBpKSk7XG4gICAgICAgIGlmIChrZXlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBoYXZlIGR1cGxpY2F0ZSBrZXlzIGluIGEga2V5ZWQgZWFjaGApO1xuICAgICAgICB9XG4gICAgICAgIGtleXMuYWRkKGtleSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRfc3ByZWFkX3VwZGF0ZShsZXZlbHMsIHVwZGF0ZXMpIHtcbiAgICBjb25zdCB1cGRhdGUgPSB7fTtcbiAgICBjb25zdCB0b19udWxsX291dCA9IHt9O1xuICAgIGNvbnN0IGFjY291bnRlZF9mb3IgPSB7ICQkc2NvcGU6IDEgfTtcbiAgICBsZXQgaSA9IGxldmVscy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBvID0gbGV2ZWxzW2ldO1xuICAgICAgICBjb25zdCBuID0gdXBkYXRlc1tpXTtcbiAgICAgICAgaWYgKG4pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG8pIHtcbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gbikpXG4gICAgICAgICAgICAgICAgICAgIHRvX251bGxfb3V0W2tleV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbikge1xuICAgICAgICAgICAgICAgIGlmICghYWNjb3VudGVkX2ZvcltrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gbltrZXldO1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50ZWRfZm9yW2tleV0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldmVsc1tpXSA9IG47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0b19udWxsX291dCkge1xuICAgICAgICBpZiAoIShrZXkgaW4gdXBkYXRlKSlcbiAgICAgICAgICAgIHVwZGF0ZVtrZXldID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdXBkYXRlO1xufVxuZnVuY3Rpb24gZ2V0X3NwcmVhZF9vYmplY3Qoc3ByZWFkX3Byb3BzKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBzcHJlYWRfcHJvcHMgPT09ICdvYmplY3QnICYmIHNwcmVhZF9wcm9wcyAhPT0gbnVsbCA/IHNwcmVhZF9wcm9wcyA6IHt9O1xufVxuXG4vLyBzb3VyY2U6IGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZGljZXMuaHRtbFxuY29uc3QgYm9vbGVhbl9hdHRyaWJ1dGVzID0gbmV3IFNldChbXG4gICAgJ2FsbG93ZnVsbHNjcmVlbicsXG4gICAgJ2FsbG93cGF5bWVudHJlcXVlc3QnLFxuICAgICdhc3luYycsXG4gICAgJ2F1dG9mb2N1cycsXG4gICAgJ2F1dG9wbGF5JyxcbiAgICAnY2hlY2tlZCcsXG4gICAgJ2NvbnRyb2xzJyxcbiAgICAnZGVmYXVsdCcsXG4gICAgJ2RlZmVyJyxcbiAgICAnZGlzYWJsZWQnLFxuICAgICdmb3Jtbm92YWxpZGF0ZScsXG4gICAgJ2hpZGRlbicsXG4gICAgJ2lzbWFwJyxcbiAgICAnbG9vcCcsXG4gICAgJ211bHRpcGxlJyxcbiAgICAnbXV0ZWQnLFxuICAgICdub21vZHVsZScsXG4gICAgJ25vdmFsaWRhdGUnLFxuICAgICdvcGVuJyxcbiAgICAncGxheXNpbmxpbmUnLFxuICAgICdyZWFkb25seScsXG4gICAgJ3JlcXVpcmVkJyxcbiAgICAncmV2ZXJzZWQnLFxuICAgICdzZWxlY3RlZCdcbl0pO1xuXG5jb25zdCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciA9IC9bXFxzJ1wiPi89XFx1e0ZERDB9LVxcdXtGREVGfVxcdXtGRkZFfVxcdXtGRkZGfVxcdXsxRkZGRX1cXHV7MUZGRkZ9XFx1ezJGRkZFfVxcdXsyRkZGRn1cXHV7M0ZGRkV9XFx1ezNGRkZGfVxcdXs0RkZGRX1cXHV7NEZGRkZ9XFx1ezVGRkZFfVxcdXs1RkZGRn1cXHV7NkZGRkV9XFx1ezZGRkZGfVxcdXs3RkZGRX1cXHV7N0ZGRkZ9XFx1ezhGRkZFfVxcdXs4RkZGRn1cXHV7OUZGRkV9XFx1ezlGRkZGfVxcdXtBRkZGRX1cXHV7QUZGRkZ9XFx1e0JGRkZFfVxcdXtCRkZGRn1cXHV7Q0ZGRkV9XFx1e0NGRkZGfVxcdXtERkZGRX1cXHV7REZGRkZ9XFx1e0VGRkZFfVxcdXtFRkZGRn1cXHV7RkZGRkV9XFx1e0ZGRkZGfVxcdXsxMEZGRkV9XFx1ezEwRkZGRn1dL3U7XG4vLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNhdHRyaWJ1dGVzLTJcbi8vIGh0dHBzOi8vaW5mcmEuc3BlYy53aGF0d2cub3JnLyNub25jaGFyYWN0ZXJcbmZ1bmN0aW9uIHNwcmVhZChhcmdzLCBjbGFzc2VzX3RvX2FkZCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCAuLi5hcmdzKTtcbiAgICBpZiAoY2xhc3Nlc190b19hZGQpIHtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMuY2xhc3MgPT0gbnVsbCkge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyA9IGNsYXNzZXNfdG9fYWRkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cmlidXRlcy5jbGFzcyArPSAnICcgKyBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RyID0gJyc7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgaWYgKGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLnRlc3QobmFtZSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKVxuICAgICAgICAgICAgc3RyICs9IFwiIFwiICsgbmFtZTtcbiAgICAgICAgZWxzZSBpZiAoYm9vbGVhbl9hdHRyaWJ1dGVzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICAgICAgc3RyICs9IFwiIFwiICsgbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHIgKz0gYCAke25hbWV9PVwiJHtTdHJpbmcodmFsdWUpLnJlcGxhY2UoL1wiL2csICcmIzM0OycpLnJlcGxhY2UoLycvZywgJyYjMzk7Jyl9XCJgO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IGVzY2FwZWQgPSB7XG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnXG59O1xuZnVuY3Rpb24gZXNjYXBlKGh0bWwpIHtcbiAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoL1tcIicmPD5dL2csIG1hdGNoID0+IGVzY2FwZWRbbWF0Y2hdKTtcbn1cbmZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IG1pc3NpbmdfY29tcG9uZW50ID0ge1xuICAgICQkcmVuZGVyOiAoKSA9PiAnJ1xufTtcbmZ1bmN0aW9uIHZhbGlkYXRlX2NvbXBvbmVudChjb21wb25lbnQsIG5hbWUpIHtcbiAgICBpZiAoIWNvbXBvbmVudCB8fCAhY29tcG9uZW50LiQkcmVuZGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpXG4gICAgICAgICAgICBuYW1lICs9ICcgdGhpcz17Li4ufSc7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgPCR7bmFtZX0+IGlzIG5vdCBhIHZhbGlkIFNTUiBjb21wb25lbnQuIFlvdSBtYXkgbmVlZCB0byByZXZpZXcgeW91ciBidWlsZCBjb25maWcgdG8gZW5zdXJlIHRoYXQgZGVwZW5kZW5jaWVzIGFyZSBjb21waWxlZCwgcmF0aGVyIHRoYW4gaW1wb3J0ZWQgYXMgcHJlLWNvbXBpbGVkIG1vZHVsZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XG4gICAgY29uc29sZS5sb2coYHtAZGVidWd9ICR7ZmlsZSA/IGZpbGUgKyAnICcgOiAnJ30oJHtsaW5lfToke2NvbHVtbn0pYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiAnJztcbn1cbmxldCBvbl9kZXN0cm95O1xuZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcbiAgICBmdW5jdGlvbiAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpIHtcbiAgICAgICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgICAgICBjb25zdCAkJCA9IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3ksXG4gICAgICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgICAgICAvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxuICAgICAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKVxuICAgICAgICB9O1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoeyAkJCB9KTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGZuKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cyk7XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogKHByb3BzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICAgICAgb25fZGVzdHJveSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyB0aXRsZTogJycsIGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcykubWFwKGNzcyA9PiBjc3MuY29kZSkuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbCAvLyBUT0RPXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkOiByZXN1bHQudGl0bGUgKyByZXN1bHQuaGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJCRyZW5kZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpXG4gICAgICAgIHJldHVybiAnJztcbiAgICByZXR1cm4gYCAke25hbWV9JHt2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogYGA7XG59XG5cbmZ1bmN0aW9uIGJpbmQoY29tcG9uZW50LCBuYW1lLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gY29tcG9uZW50LiQkLnByb3BzW25hbWVdO1xuICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbXBvbmVudC4kJC5ib3VuZFtpbmRleF0gPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2soY29tcG9uZW50LiQkLmN0eFtpbmRleF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZV9jb21wb25lbnQoYmxvY2spIHtcbiAgICBibG9jayAmJiBibG9jay5jKCk7XG59XG5mdW5jdGlvbiBjbGFpbV9jb21wb25lbnQoYmxvY2ssIHBhcmVudF9ub2Rlcykge1xuICAgIGJsb2NrICYmIGJsb2NrLmwocGFyZW50X25vZGVzKTtcbn1cbmZ1bmN0aW9uIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgYW5jaG9yKSB7XG4gICAgY29uc3QgeyBmcmFnbWVudCwgb25fbW91bnQsIG9uX2Rlc3Ryb3ksIGFmdGVyX3VwZGF0ZSB9ID0gY29tcG9uZW50LiQkO1xuICAgIGZyYWdtZW50ICYmIGZyYWdtZW50Lm0odGFyZ2V0LCBhbmNob3IpO1xuICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgLy8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xuICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XG4gICAgfSk7XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkO1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBydW5fYWxsKCQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICAkJC5vbl9kZXN0cm95ID0gJCQuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgICAkJC5jdHggPSBbXTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSkge1xuICAgIGlmIChjb21wb25lbnQuJCQuZGlydHlbMF0gPT09IC0xKSB7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5LmZpbGwoMCk7XG4gICAgfVxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVsoaSAvIDMxKSB8IDBdIHw9ICgxIDw8IChpICUgMzEpKTtcbn1cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zLCBpbnN0YW5jZSwgY3JlYXRlX2ZyYWdtZW50LCBub3RfZXF1YWwsIHByb3BzLCBkaXJ0eSA9IFstMV0pIHtcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgY29uc3QgcHJvcF92YWx1ZXMgPSBvcHRpb25zLnByb3BzIHx8IHt9O1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICBkaXJ0eSxcbiAgICAgICAgc2tpcF9ib3VuZDogZmFsc2VcbiAgICB9O1xuICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgICQkLmN0eCA9IGluc3RhbmNlXG4gICAgICAgID8gaW5zdGFuY2UoY29tcG9uZW50LCBwcm9wX3ZhbHVlcywgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghJCQuc2tpcF9ib3VuZCAmJiAkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50Lmwobm9kZXMpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChkZXRhY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy4kJC5zbG90dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgICAgICB9XG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgdGhpcyBkZWxlZ2F0ZSB0byBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiQkc2V0ICYmICFpc19lbXB0eSgkJHByb3BzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnQge1xuICAgICRkZXN0cm95KCkge1xuICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgfVxuICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaF9kZXYodHlwZSwgZGV0YWlsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQodHlwZSwgT2JqZWN0LmFzc2lnbih7IHZlcnNpb246ICczLjI4LjAnIH0sIGRldGFpbCkpKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NSW5zZXJ0XCIsIHsgdGFyZ2V0LCBub2RlIH0pO1xuICAgIGFwcGVuZCh0YXJnZXQsIG5vZGUpO1xufVxuZnVuY3Rpb24gaW5zZXJ0X2Rldih0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIGRpc3BhdGNoX2RldihcIlN2ZWx0ZURPTUluc2VydFwiLCB7IHRhcmdldCwgbm9kZSwgYW5jaG9yIH0pO1xuICAgIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcik7XG59XG5mdW5jdGlvbiBkZXRhY2hfZGV2KG5vZGUpIHtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVcIiwgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gW1wiY2FwdHVyZVwiXSA6IG9wdGlvbnMgPyBBcnJheS5mcm9tKE9iamVjdC5rZXlzKG9wdGlvbnMpKSA6IFtdO1xuICAgIGlmIChoYXNfcHJldmVudF9kZWZhdWx0KVxuICAgICAgICBtb2RpZmllcnMucHVzaCgncHJldmVudERlZmF1bHQnKTtcbiAgICBpZiAoaGFzX3N0b3BfcHJvcGFnYXRpb24pXG4gICAgICAgIG1vZGlmaWVycy5wdXNoKCdzdG9wUHJvcGFnYXRpb24nKTtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01BZGRFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICBjb25zdCBkaXNwb3NlID0gbGlzdGVuKG5vZGUsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01SZW1vdmVFdmVudExpc3RlbmVyXCIsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NUmVtb3ZlQXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlIH0pO1xuICAgIGVsc2VcbiAgICAgICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0QXR0cmlidXRlXCIsIHsgbm9kZSwgYXR0cmlidXRlLCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHByb3BfZGV2KG5vZGUsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgIG5vZGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0UHJvcGVydHlcIiwgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlRE9NU2V0RGF0YXNldFwiLCB7IG5vZGUsIHByb3BlcnR5LCB2YWx1ZSB9KTtcbn1cbmZ1bmN0aW9uIHNldF9kYXRhX2Rldih0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgPT09IGRhdGEpXG4gICAgICAgIHJldHVybjtcbiAgICBkaXNwYXRjaF9kZXYoXCJTdmVsdGVET01TZXREYXRhXCIsIHsgbm9kZTogdGV4dCwgZGF0YSB9KTtcbiAgICB0ZXh0LmRhdGEgPSBkYXRhO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9hcmd1bWVudChhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ3N0cmluZycgJiYgIShhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gYXJnKSkge1xuICAgICAgICBsZXQgbXNnID0gJ3sjZWFjaH0gb25seSBpdGVyYXRlcyBvdmVyIGFycmF5LWxpa2Ugb2JqZWN0cy4nO1xuICAgICAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBhcmcgJiYgU3ltYm9sLml0ZXJhdG9yIGluIGFyZykge1xuICAgICAgICAgICAgbXNnICs9ICcgWW91IGNhbiB1c2UgYSBzcHJlYWQgdG8gY29udmVydCB0aGlzIGl0ZXJhYmxlIGludG8gYW4gYXJyYXkuJztcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICB9XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9zbG90cyhuYW1lLCBzbG90LCBrZXlzKSB7XG4gICAgZm9yIChjb25zdCBzbG90X2tleSBvZiBPYmplY3Qua2V5cyhzbG90KSkge1xuICAgICAgICBpZiAoIX5rZXlzLmluZGV4T2Yoc2xvdF9rZXkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYDwke25hbWV9PiByZWNlaXZlZCBhbiB1bmV4cGVjdGVkIHNsb3QgXCIke3Nsb3Rfa2V5fVwiLmApO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgU3ZlbHRlQ29tcG9uZW50RGV2IGV4dGVuZHMgU3ZlbHRlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucyB8fCAoIW9wdGlvbnMudGFyZ2V0ICYmICFvcHRpb25zLiQkaW5saW5lKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAndGFyZ2V0JyBpcyBhIHJlcXVpcmVkIG9wdGlvbmApO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgICRkZXN0cm95KCkge1xuICAgICAgICBzdXBlci4kZGVzdHJveSgpO1xuICAgICAgICB0aGlzLiRkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb21wb25lbnQgd2FzIGFscmVhZHkgZGVzdHJveWVkYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAkY2FwdHVyZV9zdGF0ZSgpIHsgfVxuICAgICRpbmplY3Rfc3RhdGUoKSB7IH1cbn1cbmZ1bmN0aW9uIGxvb3BfZ3VhcmQodGltZW91dCkge1xuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIHN0YXJ0ID4gdGltZW91dCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbmZpbml0ZSBsb29wIGRldGVjdGVkYCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgeyBIdG1sVGFnLCBTdmVsdGVDb21wb25lbnQsIFN2ZWx0ZUNvbXBvbmVudERldiwgU3ZlbHRlRWxlbWVudCwgYWN0aW9uX2Rlc3Ryb3llciwgYWRkX2F0dHJpYnV0ZSwgYWRkX2NsYXNzZXMsIGFkZF9mbHVzaF9jYWxsYmFjaywgYWRkX2xvY2F0aW9uLCBhZGRfcmVuZGVyX2NhbGxiYWNrLCBhZGRfcmVzaXplX2xpc3RlbmVyLCBhZGRfdHJhbnNmb3JtLCBhZnRlclVwZGF0ZSwgYXBwZW5kLCBhcHBlbmRfZGV2LCBhc3NpZ24sIGF0dHIsIGF0dHJfZGV2LCBiZWZvcmVVcGRhdGUsIGJpbmQsIGJpbmRpbmdfY2FsbGJhY2tzLCBibGFua19vYmplY3QsIGJ1YmJsZSwgY2hlY2tfb3V0cm9zLCBjaGlsZHJlbiwgY2xhaW1fY29tcG9uZW50LCBjbGFpbV9lbGVtZW50LCBjbGFpbV9zcGFjZSwgY2xhaW1fdGV4dCwgY2xlYXJfbG9vcHMsIGNvbXBvbmVudF9zdWJzY3JpYmUsIGNvbXB1dGVfcmVzdF9wcm9wcywgY29tcHV0ZV9zbG90cywgY3JlYXRlRXZlbnREaXNwYXRjaGVyLCBjcmVhdGVfYW5pbWF0aW9uLCBjcmVhdGVfYmlkaXJlY3Rpb25hbF90cmFuc2l0aW9uLCBjcmVhdGVfY29tcG9uZW50LCBjcmVhdGVfaW5fdHJhbnNpdGlvbiwgY3JlYXRlX291dF90cmFuc2l0aW9uLCBjcmVhdGVfc2xvdCwgY3JlYXRlX3Nzcl9jb21wb25lbnQsIGN1cnJlbnRfY29tcG9uZW50LCBjdXN0b21fZXZlbnQsIGRhdGFzZXRfZGV2LCBkZWJ1ZywgZGVzdHJveV9ibG9jaywgZGVzdHJveV9jb21wb25lbnQsIGRlc3Ryb3lfZWFjaCwgZGV0YWNoLCBkZXRhY2hfYWZ0ZXJfZGV2LCBkZXRhY2hfYmVmb3JlX2RldiwgZGV0YWNoX2JldHdlZW5fZGV2LCBkZXRhY2hfZGV2LCBkaXJ0eV9jb21wb25lbnRzLCBkaXNwYXRjaF9kZXYsIGVhY2gsIGVsZW1lbnQsIGVsZW1lbnRfaXMsIGVtcHR5LCBlc2NhcGUsIGVzY2FwZWQsIGV4Y2x1ZGVfaW50ZXJuYWxfcHJvcHMsIGZpeF9hbmRfZGVzdHJveV9ibG9jaywgZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jaywgZml4X3Bvc2l0aW9uLCBmbHVzaCwgZ2V0Q29udGV4dCwgZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUsIGdldF9jdXJyZW50X2NvbXBvbmVudCwgZ2V0X3Nsb3RfY2hhbmdlcywgZ2V0X3Nsb3RfY29udGV4dCwgZ2V0X3NwcmVhZF9vYmplY3QsIGdldF9zcHJlYWRfdXBkYXRlLCBnZXRfc3RvcmVfdmFsdWUsIGdsb2JhbHMsIGdyb3VwX291dHJvcywgaGFuZGxlX3Byb21pc2UsIGhhc19wcm9wLCBpZGVudGl0eSwgaW5pdCwgaW5zZXJ0LCBpbnNlcnRfZGV2LCBpbnRyb3MsIGludmFsaWRfYXR0cmlidXRlX25hbWVfY2hhcmFjdGVyLCBpc19jbGllbnQsIGlzX2Nyb3Nzb3JpZ2luLCBpc19lbXB0eSwgaXNfZnVuY3Rpb24sIGlzX3Byb21pc2UsIGxpc3RlbiwgbGlzdGVuX2RldiwgbG9vcCwgbG9vcF9ndWFyZCwgbWlzc2luZ19jb21wb25lbnQsIG1vdW50X2NvbXBvbmVudCwgbm9vcCwgbm90X2VxdWFsLCBub3csIG51bGxfdG9fZW1wdHksIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMsIG9uRGVzdHJveSwgb25Nb3VudCwgb25jZSwgb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIHByZXZlbnRfZGVmYXVsdCwgcHJvcF9kZXYsIHF1ZXJ5X3NlbGVjdG9yX2FsbCwgcmFmLCBydW4sIHJ1bl9hbGwsIHNhZmVfbm90X2VxdWFsLCBzY2hlZHVsZV91cGRhdGUsIHNlbGVjdF9tdWx0aXBsZV92YWx1ZSwgc2VsZWN0X29wdGlvbiwgc2VsZWN0X29wdGlvbnMsIHNlbGVjdF92YWx1ZSwgc2VsZiwgc2V0Q29udGV4dCwgc2V0X2F0dHJpYnV0ZXMsIHNldF9jdXJyZW50X2NvbXBvbmVudCwgc2V0X2N1c3RvbV9lbGVtZW50X2RhdGEsIHNldF9kYXRhLCBzZXRfZGF0YV9kZXYsIHNldF9pbnB1dF90eXBlLCBzZXRfaW5wdXRfdmFsdWUsIHNldF9ub3csIHNldF9yYWYsIHNldF9zdG9yZV92YWx1ZSwgc2V0X3N0eWxlLCBzZXRfc3ZnX2F0dHJpYnV0ZXMsIHNwYWNlLCBzcHJlYWQsIHN0b3BfcHJvcGFnYXRpb24sIHN1YnNjcmliZSwgc3ZnX2VsZW1lbnQsIHRleHQsIHRpY2ssIHRpbWVfcmFuZ2VzX3RvX2FycmF5LCB0b19udW1iZXIsIHRvZ2dsZV9jbGFzcywgdHJhbnNpdGlvbl9pbiwgdHJhbnNpdGlvbl9vdXQsIHVwZGF0ZV9rZXllZF9lYWNoLCB1cGRhdGVfc2xvdCwgdmFsaWRhdGVfY29tcG9uZW50LCB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50LCB2YWxpZGF0ZV9lYWNoX2tleXMsIHZhbGlkYXRlX3Nsb3RzLCB2YWxpZGF0ZV9zdG9yZSwgeGxpbmtfYXR0ciB9O1xuIiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG5cdGV4cG9ydCBmdW5jdGlvbiBwcmVsb2FkKCkge1xuXHRcdHJldHVybiB0aGlzLmZldGNoKGBibG9nLmpzb25gKS50aGVuKHIgPT4gci5qc29uKCkpLnRoZW4ocG9zdHMgPT4ge1xuXHRcdFx0cmV0dXJuIHsgcG9zdHMgfTtcblx0XHR9KTtcblx0fVxuPC9zY3JpcHQ+XG5cbjxzY3JpcHQ+XG5cdGV4cG9ydCBsZXQgcG9zdHM7XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuXHR1bCB7XG5cdFx0bWFyZ2luOiAwIDAgMWVtIDA7XG5cdFx0bGluZS1oZWlnaHQ6IDEuNTtcblx0fVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuXHQ8dGl0bGU+QmxvZzwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+UmVjZW50IHBvc3RzPC9oMT5cblxuPHVsPlxuXHR7I2VhY2ggcG9zdHMgYXMgcG9zdH1cblx0XHQ8IS0tIHdlJ3JlIHVzaW5nIHRoZSBub24tc3RhbmRhcmQgYHJlbD1wcmVmZXRjaGAgYXR0cmlidXRlIHRvXG5cdFx0XHRcdHRlbGwgU2FwcGVyIHRvIGxvYWQgdGhlIGRhdGEgZm9yIHRoZSBwYWdlIGFzIHNvb24gYXNcblx0XHRcdFx0dGhlIHVzZXIgaG92ZXJzIG92ZXIgdGhlIGxpbmsgb3IgdGFwcyBpdCwgaW5zdGVhZCBvZlxuXHRcdFx0XHR3YWl0aW5nIGZvciB0aGUgJ2NsaWNrJyBldmVudCAtLT5cblx0XHQ8bGk+PGEgcmVsPVwicHJlZmV0Y2hcIiBocmVmPVwiYmxvZy97cG9zdC5zbHVnfVwiPntwb3N0LnRpdGxlfTwvYT48L2xpPlxuXHR7L2VhY2h9XG48L3VsPlxuIiwiPHNjcmlwdCBjb250ZXh0PVwibW9kdWxlXCI+XG5cdGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHsgcGFyYW1zIH0pIHtcblx0XHQvLyB0aGUgYHNsdWdgIHBhcmFtZXRlciBpcyBhdmFpbGFibGUgYmVjYXVzZVxuXHRcdC8vIHRoaXMgZmlsZSBpcyBjYWxsZWQgW3NsdWddLnN2ZWx0ZVxuXHRcdGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuZmV0Y2goYGJsb2cvJHtwYXJhbXMuc2x1Z30uanNvbmApO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuXG5cdFx0aWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0cmV0dXJuIHsgcG9zdDogZGF0YSB9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmVycm9yKHJlcy5zdGF0dXMsIGRhdGEubWVzc2FnZSk7XG5cdFx0fVxuXHR9XG48L3NjcmlwdD5cblxuPHNjcmlwdD5cblx0ZXhwb3J0IGxldCBwb3N0O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cblx0Lypcblx0XHRCeSBkZWZhdWx0LCBDU1MgaXMgbG9jYWxseSBzY29wZWQgdG8gdGhlIGNvbXBvbmVudCxcblx0XHRhbmQgYW55IHVudXNlZCBzdHlsZXMgYXJlIGRlYWQtY29kZS1lbGltaW5hdGVkLlxuXHRcdEluIHRoaXMgcGFnZSwgU3ZlbHRlIGNhbid0IGtub3cgd2hpY2ggZWxlbWVudHMgYXJlXG5cdFx0Z29pbmcgdG8gYXBwZWFyIGluc2lkZSB0aGUge3t7cG9zdC5odG1sfX19IGJsb2NrLFxuXHRcdHNvIHdlIGhhdmUgdG8gdXNlIHRoZSA6Z2xvYmFsKC4uLikgbW9kaWZpZXIgdG8gdGFyZ2V0XG5cdFx0YWxsIGVsZW1lbnRzIGluc2lkZSAuY29udGVudFxuXHQqL1xuXHQuY29udGVudCA6Z2xvYmFsKGgyKSB7XG5cdFx0Zm9udC1zaXplOiAxLjRlbTtcblx0XHRmb250LXdlaWdodDogNTAwO1xuXHR9XG5cblx0LmNvbnRlbnQgOmdsb2JhbChwcmUpIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5O1xuXHRcdGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggNXB4IHJnYmEoMCwgMCwgMCwgMC4wNSk7XG5cdFx0cGFkZGluZzogMC41ZW07XG5cdFx0Ym9yZGVyLXJhZGl1czogMnB4O1xuXHRcdG92ZXJmbG93LXg6IGF1dG87XG5cdH1cblxuXHQuY29udGVudCA6Z2xvYmFsKHByZSkgOmdsb2JhbChjb2RlKSB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdFx0cGFkZGluZzogMDtcblx0fVxuXG5cdC5jb250ZW50IDpnbG9iYWwodWwpIHtcblx0XHRsaW5lLWhlaWdodDogMS41O1xuXHR9XG5cblx0LmNvbnRlbnQgOmdsb2JhbChsaSkge1xuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPntwb3N0LnRpdGxlfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+e3Bvc3QudGl0bGV9PC9oMT5cblxuPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cblx0e0BodG1sIHBvc3QuaHRtbH1cbjwvZGl2PlxuIiwiPHNjcmlwdD5cbmltcG9ydCBNZW51QnRuIGZyb20gXCIuL01lbnVCdG4uc3ZlbHRlXCI7XG5pbXBvcnQgTWVudUxpc3QgZnJvbSBcIi4vTWVudUxpc3Quc3ZlbHRlXCI7XG5cblx0ZXhwb3J0IGxldCBzZWdtZW50O1xuXG5cdGNvbnN0IHRvZ2dsZU1lbnUgPSAoKT0+e1xuXHRcdGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudWxpc3QnKVxuXG5cdGlmIChsaXN0LmNsYXNzTGlzdC5jb250YWlucygnbGlzdC1vZmYnKSl7XG5cdFx0bGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdsaXN0LW9mZicpXG5cdH1lbHNle1xuXHRcdGxpc3QuY2xhc3NMaXN0LmFkZCgnbGlzdC1vZmYnKVxuXHR9XG5cblx0fTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdG5hdiB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cdFx0Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjU1LDYyLDAsMC4xKTtcblx0XHRmb250LXdlaWdodDogMzAwO1xuXHRcdHBhZGRpbmc6IDAgMWVtO1xuXHR9XG5cblx0dWwge1xuXHRcdG1hcmdpbjogMDtcblx0XHRwYWRkaW5nOiAwO1xuXHR9XG5cblx0LyogY2xlYXJmaXggKi9cblx0dWw6OmFmdGVyIHtcblx0XHRjb250ZW50OiAnJztcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRjbGVhcjogYm90aDtcblx0fVxuXG5cdGxpIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRmbG9hdDogbGVmdDtcblx0fVxuXG5cdFthcmlhLWN1cnJlbnRdIHtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHR9XG5cblx0W2FyaWEtY3VycmVudF06OmFmdGVyIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0Y29udGVudDogJyc7XG5cdFx0d2lkdGg6IGNhbGMoMTAwJSAtIDFlbSk7XG5cdFx0aGVpZ2h0OiAycHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSw2MiwwKTtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRib3R0b206IC0xcHg7XG5cdH1cblxuXHRhIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdFx0cGFkZGluZzogMWVtIDAuNWVtO1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHR9XG5cblx0Lm1lbnV7XG5cdFx0bWFyZ2luLXRvcDogMTBweDtcblx0fVxuXG5cdC5saXN0LW9mZntcblx0XHRkaXNwbGF5OiBub25lO1xuXHR9XG5cblx0XG48L3N0eWxlPlxuXG48bmF2PlxuXHQ8dWw+XG5cdFx0PGxpPjxhIGFyaWEtY3VycmVudD1cIntzZWdtZW50ID09PSB1bmRlZmluZWQgPyAncGFnZScgOiB1bmRlZmluZWR9XCIgaHJlZj1cIi5cIj5ob21lPC9hPjwvbGk+XG5cdFx0PGxpPjxhIGFyaWEtY3VycmVudD1cIntzZWdtZW50ID09PSAnYWJvdXQnID8gJ3BhZ2UnIDogdW5kZWZpbmVkfVwiIGhyZWY9XCJhYm91dFwiPmFib3V0PC9hPjwvbGk+XG5cblx0XHQ8IS0tIGZvciB0aGUgYmxvZyBsaW5rLCB3ZSdyZSB1c2luZyByZWw9cHJlZmV0Y2ggc28gdGhhdCBTYXBwZXIgcHJlZmV0Y2hlc1xuXHRcdCAgICAgdGhlIGJsb2cgZGF0YSB3aGVuIHdlIGhvdmVyIG92ZXIgdGhlIGxpbmsgb3IgdGFwIGl0IG9uIGEgdG91Y2hzY3JlZW4gLS0+XG5cdFx0PGxpPjxhIHJlbD1wcmVmZXRjaCBhcmlhLWN1cnJlbnQ9XCJ7c2VnbWVudCA9PT0gJ2Jsb2cnID8gJ3BhZ2UnIDogdW5kZWZpbmVkfVwiIGhyZWY9XCJibG9nXCI+YmxvZzwvYT48L2xpPlxuXHQ8L3VsPlxuXHRcblx0PGEgY2xhc3M9J21lbnUnIGhyZWY+XG5cdFx0PE1lbnVCdG4gb246Y2xpY2s9e3RvZ2dsZU1lbnV9Lz5cblx0PC9hPlxuXHRcbjwvbmF2PlxuPGRpdiBpZD0nbWVudWxpc3QnIGNsYXNzPVwibGlzdC1vZmZcIj5cblx0PE1lbnVMaXN0Lz5cbjwvZGl2PlxuIiwiPHNjcmlwdD5cblx0aW1wb3J0IE5hdiBmcm9tICcuLi9jb21wb25lbnRzL05hdi5zdmVsdGUnO1xuXG5cdGV4cG9ydCBsZXQgc2VnbWVudDtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdG1haW4ge1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHRtYXgtd2lkdGg6IDU2ZW07XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cdFx0cGFkZGluZzogMmVtO1xuXHRcdG1hcmdpbjogMCBhdXRvO1xuXHRcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cdH1cbjwvc3R5bGU+XG5cbjxOYXYge3NlZ21lbnR9Lz5cblxuPG1haW4+XG5cdDxzbG90Pjwvc2xvdD5cbjwvbWFpbj4iLCI8c2NyaXB0PlxuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblxuXHRjb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jztcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdGgxLCBwIHtcblx0XHRtYXJnaW46IDAgYXV0bztcblx0fVxuXG5cdGgxIHtcblx0XHRmb250LXNpemU6IDIuOGVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdFx0bWFyZ2luOiAwIDAgMC41ZW0gMDtcblx0fVxuXG5cdHAge1xuXHRcdG1hcmdpbjogMWVtIGF1dG87XG5cdH1cblxuXHRAbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0XHRoMSB7XG5cdFx0XHRmb250LXNpemU6IDRlbTtcblx0XHR9XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPntzdGF0dXN9PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT57c3RhdHVzfTwvaDE+XG5cbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cblxueyNpZiBkZXYgJiYgZXJyb3Iuc3RhY2t9XG5cdDxwcmU+e2Vycm9yLnN0YWNrfTwvcHJlPlxuey9pZn1cbiIsIi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYnkgU2FwcGVyIOKAlCBkbyBub3QgZWRpdCBpdCFcbmltcG9ydCAqIGFzIHJvdXRlXzAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL2luZGV4Lmpzb24uanNcIjtcbmltcG9ydCAqIGFzIHJvdXRlXzEgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9ibG9nL1tzbHVnXS5qc29uLmpzXCI7XG5pbXBvcnQgKiBhcyBjb21wb25lbnRfMCBmcm9tIFwiLi4vLi4vLi4vcm91dGVzL2luZGV4LnN2ZWx0ZVwiO1xuaW1wb3J0ICogYXMgY29tcG9uZW50XzEgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9hYm91dC5zdmVsdGVcIjtcbmltcG9ydCAqIGFzIGNvbXBvbmVudF8yIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9pbmRleC5zdmVsdGVcIjtcbmltcG9ydCAqIGFzIGNvbXBvbmVudF8zIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvYmxvZy9bc2x1Z10uc3ZlbHRlXCI7XG5pbXBvcnQgKiBhcyByb290X2NvbXAgZnJvbSBcIi4uLy4uLy4uL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZVwiO1xuaW1wb3J0IGVycm9yIGZyb20gXCIuLi8uLi8uLi9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZVwiO1xuXG5jb25zdCBkID0gZGVjb2RlVVJJQ29tcG9uZW50O1xuXG5leHBvcnQgY29uc3QgbWFuaWZlc3QgPSB7XG5cdHNlcnZlcl9yb3V0ZXM6IFtcblx0XHR7XG5cdFx0XHQvLyBibG9nL2luZGV4Lmpzb24uanNcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZ1xcLmpzb24kLyxcblx0XHRcdGhhbmRsZXJzOiByb3V0ZV8wLFxuXHRcdFx0cGFyYW1zOiAoKSA9PiAoe30pXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGJsb2cvW3NsdWddLmpzb24uanNcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZ1xcLyhbXi9dKz8pXFwuanNvbiQvLFxuXHRcdFx0aGFuZGxlcnM6IHJvdXRlXzEsXG5cdFx0XHRwYXJhbXM6IG1hdGNoID0+ICh7IHNsdWc6IGQobWF0Y2hbMV0pIH0pXG5cdFx0fVxuXHRdLFxuXG5cdHBhZ2VzOiBbXG5cdFx0e1xuXHRcdFx0Ly8gaW5kZXguc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcLyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0eyBuYW1lOiBcImluZGV4XCIsIGZpbGU6IFwiaW5kZXguc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzAgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBhYm91dC5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvYWJvdXRcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwiYWJvdXRcIiwgZmlsZTogXCJhYm91dC5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMSB9XG5cdFx0XHRdXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC8vIGJsb2cvaW5kZXguc3ZlbHRlXG5cdFx0XHRwYXR0ZXJuOiAvXlxcL2Jsb2dcXC8/JC8sXG5cdFx0XHRwYXJ0czogW1xuXHRcdFx0XHR7IG5hbWU6IFwiYmxvZ1wiLCBmaWxlOiBcImJsb2cvaW5kZXguc3ZlbHRlXCIsIGNvbXBvbmVudDogY29tcG9uZW50XzIgfVxuXHRcdFx0XVxuXHRcdH0sXG5cblx0XHR7XG5cdFx0XHQvLyBibG9nL1tzbHVnXS5zdmVsdGVcblx0XHRcdHBhdHRlcm46IC9eXFwvYmxvZ1xcLyhbXi9dKz8pXFwvPyQvLFxuXHRcdFx0cGFydHM6IFtcblx0XHRcdFx0bnVsbCxcblx0XHRcdFx0eyBuYW1lOiBcImJsb2dfJHNsdWdcIiwgZmlsZTogXCJibG9nL1tzbHVnXS5zdmVsdGVcIiwgY29tcG9uZW50OiBjb21wb25lbnRfMywgcGFyYW1zOiBtYXRjaCA9PiAoeyBzbHVnOiBkKG1hdGNoWzFdKSB9KSB9XG5cdFx0XHRdXG5cdFx0fVxuXHRdLFxuXG5cdHJvb3RfY29tcCxcblx0ZXJyb3Jcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZF9kaXIgPSBcIl9fc2FwcGVyX18vZGV2XCI7XG5cbmV4cG9ydCBjb25zdCBzcmNfZGlyID0gXCJzcmNcIjtcblxuZXhwb3J0IGNvbnN0IGRldiA9IHRydWU7IiwiaW1wb3J0IHsgbm9vcCwgc2FmZV9ub3RfZXF1YWwsIHN1YnNjcmliZSwgcnVuX2FsbCwgaXNfZnVuY3Rpb24gfSBmcm9tICcuLi9pbnRlcm5hbCc7XG5leHBvcnQgeyBnZXRfc3RvcmVfdmFsdWUgYXMgZ2V0IH0gZnJvbSAnLi4vaW50ZXJuYWwnO1xuXG5jb25zdCBzdWJzY3JpYmVyX3F1ZXVlID0gW107XG4vKipcbiAqIENyZWF0ZXMgYSBgUmVhZGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHZhbHVlIGluaXRpYWwgdmFsdWVcbiAqIEBwYXJhbSB7U3RhcnRTdG9wTm90aWZpZXJ9c3RhcnQgc3RhcnQgYW5kIHN0b3Agbm90aWZpY2F0aW9ucyBmb3Igc3Vic2NyaXB0aW9uc1xuICovXG5mdW5jdGlvbiByZWFkYWJsZSh2YWx1ZSwgc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJzY3JpYmU6IHdyaXRhYmxlKHZhbHVlLCBzdGFydCkuc3Vic2NyaWJlXG4gICAgfTtcbn1cbi8qKlxuICogQ3JlYXRlIGEgYFdyaXRhYmxlYCBzdG9yZSB0aGF0IGFsbG93cyBib3RoIHVwZGF0aW5nIGFuZCByZWFkaW5nIGJ5IHN1YnNjcmlwdGlvbi5cbiAqIEBwYXJhbSB7Kj19dmFsdWUgaW5pdGlhbCB2YWx1ZVxuICogQHBhcmFtIHtTdGFydFN0b3BOb3RpZmllcj19c3RhcnQgc3RhcnQgYW5kIHN0b3Agbm90aWZpY2F0aW9ucyBmb3Igc3Vic2NyaXB0aW9uc1xuICovXG5mdW5jdGlvbiB3cml0YWJsZSh2YWx1ZSwgc3RhcnQgPSBub29wKSB7XG4gICAgbGV0IHN0b3A7XG4gICAgY29uc3Qgc3Vic2NyaWJlcnMgPSBbXTtcbiAgICBmdW5jdGlvbiBzZXQobmV3X3ZhbHVlKSB7XG4gICAgICAgIGlmIChzYWZlX25vdF9lcXVhbCh2YWx1ZSwgbmV3X3ZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBuZXdfdmFsdWU7XG4gICAgICAgICAgICBpZiAoc3RvcCkgeyAvLyBzdG9yZSBpcyByZWFkeVxuICAgICAgICAgICAgICAgIGNvbnN0IHJ1bl9xdWV1ZSA9ICFzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgc1sxXSgpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLnB1c2gocywgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocnVuX3F1ZXVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZVtpXVswXShzdWJzY3JpYmVyX3F1ZXVlW2kgKyAxXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlcl9xdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGUoZm4pIHtcbiAgICAgICAgc2V0KGZuKHZhbHVlKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZShydW4sIGludmFsaWRhdGUgPSBub29wKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBbcnVuLCBpbnZhbGlkYXRlXTtcbiAgICAgICAgc3Vic2NyaWJlcnMucHVzaChzdWJzY3JpYmVyKTtcbiAgICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgc3RvcCA9IHN0YXJ0KHNldCkgfHwgbm9vcDtcbiAgICAgICAgfVxuICAgICAgICBydW4odmFsdWUpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzdWJzY3JpYmVycy5pbmRleE9mKHN1YnNjcmliZXIpO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICAgICAgICAgIHN0b3AgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4geyBzZXQsIHVwZGF0ZSwgc3Vic2NyaWJlIH07XG59XG5mdW5jdGlvbiBkZXJpdmVkKHN0b3JlcywgZm4sIGluaXRpYWxfdmFsdWUpIHtcbiAgICBjb25zdCBzaW5nbGUgPSAhQXJyYXkuaXNBcnJheShzdG9yZXMpO1xuICAgIGNvbnN0IHN0b3Jlc19hcnJheSA9IHNpbmdsZVxuICAgICAgICA/IFtzdG9yZXNdXG4gICAgICAgIDogc3RvcmVzO1xuICAgIGNvbnN0IGF1dG8gPSBmbi5sZW5ndGggPCAyO1xuICAgIHJldHVybiByZWFkYWJsZShpbml0aWFsX3ZhbHVlLCAoc2V0KSA9PiB7XG4gICAgICAgIGxldCBpbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW107XG4gICAgICAgIGxldCBwZW5kaW5nID0gMDtcbiAgICAgICAgbGV0IGNsZWFudXAgPSBub29wO1xuICAgICAgICBjb25zdCBzeW5jID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBlbmRpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbihzaW5nbGUgPyB2YWx1ZXNbMF0gOiB2YWx1ZXMsIHNldCk7XG4gICAgICAgICAgICBpZiAoYXV0bykge1xuICAgICAgICAgICAgICAgIHNldChyZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCA9IGlzX2Z1bmN0aW9uKHJlc3VsdCkgPyByZXN1bHQgOiBub29wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZXJzID0gc3RvcmVzX2FycmF5Lm1hcCgoc3RvcmUsIGkpID0+IHN1YnNjcmliZShzdG9yZSwgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZXNbaV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHBlbmRpbmcgJj0gfigxIDw8IGkpO1xuICAgICAgICAgICAgaWYgKGluaXRlZCkge1xuICAgICAgICAgICAgICAgIHN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgcGVuZGluZyB8PSAoMSA8PCBpKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpbml0ZWQgPSB0cnVlO1xuICAgICAgICBzeW5jKCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgICAgICAgcnVuX2FsbCh1bnN1YnNjcmliZXJzKTtcbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgZGVyaXZlZCwgcmVhZGFibGUsIHdyaXRhYmxlIH07XG4iLCJpbXBvcnQgeyB3cml0YWJsZSB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSc7XG5cbmV4cG9ydCBjb25zdCBDT05URVhUX0tFWSA9IHt9O1xuXG5leHBvcnQgY29uc3QgcHJlbG9hZCA9ICgpID0+ICh7fSk7IiwiPCEtLSBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhIC0tPlxuPHNjcmlwdD5cblx0aW1wb3J0IHsgc2V0Q29udGV4dCwgYWZ0ZXJVcGRhdGUgfSBmcm9tICdzdmVsdGUnO1xuXHRpbXBvcnQgeyBDT05URVhUX0tFWSB9IGZyb20gJy4vc2hhcmVkJztcblx0aW1wb3J0IExheW91dCBmcm9tICcuLi8uLi8uLi9yb3V0ZXMvX2xheW91dC5zdmVsdGUnO1xuXHRpbXBvcnQgRXJyb3IgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19lcnJvci5zdmVsdGUnO1xuXG5cdGV4cG9ydCBsZXQgc3RvcmVzO1xuXHRleHBvcnQgbGV0IGVycm9yO1xuXHRleHBvcnQgbGV0IHN0YXR1cztcblx0ZXhwb3J0IGxldCBzZWdtZW50cztcblx0ZXhwb3J0IGxldCBsZXZlbDA7XG5cdGV4cG9ydCBsZXQgbGV2ZWwxID0gbnVsbDtcblx0ZXhwb3J0IGxldCBub3RpZnk7XG5cblx0YWZ0ZXJVcGRhdGUobm90aWZ5KTtcblx0c2V0Q29udGV4dChDT05URVhUX0tFWSwgc3RvcmVzKTtcbjwvc2NyaXB0PlxuXG48TGF5b3V0IHNlZ21lbnQ9XCJ7c2VnbWVudHNbMF19XCIgey4uLmxldmVsMC5wcm9wc30+XG5cdHsjaWYgZXJyb3J9XG5cdFx0PEVycm9yIHtlcnJvcn0ge3N0YXR1c30vPlxuXHR7OmVsc2V9XG5cdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz1cIntsZXZlbDEuY29tcG9uZW50fVwiIHsuLi5sZXZlbDEucHJvcHN9Lz5cblx0ey9pZn1cbjwvTGF5b3V0PiIsImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGJ1aWxkX2RpciwgZGV2LCBzcmNfZGlyLCBtYW5pZmVzdCB9IGZyb20gJy4vaW50ZXJuYWwvbWFuaWZlc3Qtc2VydmVyJztcbmltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcbmltcG9ydCBTdHJlYW0gZnJvbSAnc3RyZWFtJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGh0dHBzIGZyb20gJ2h0dHBzJztcbmltcG9ydCB6bGliIGZyb20gJ3psaWInO1xuaW1wb3J0IEFwcCBmcm9tICcuL2ludGVybmFsL0FwcC5zdmVsdGUnO1xuXG4vKipcbiAqIEBwYXJhbSB0eXBlTWFwIFtPYmplY3RdIE1hcCBvZiBNSU1FIHR5cGUgLT4gQXJyYXlbZXh0ZW5zaW9uc11cbiAqIEBwYXJhbSAuLi5cbiAqL1xuZnVuY3Rpb24gTWltZSgpIHtcbiAgdGhpcy5fdHlwZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9leHRlbnNpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMuZGVmaW5lKGFyZ3VtZW50c1tpXSk7XG4gIH1cblxuICB0aGlzLmRlZmluZSA9IHRoaXMuZGVmaW5lLmJpbmQodGhpcyk7XG4gIHRoaXMuZ2V0VHlwZSA9IHRoaXMuZ2V0VHlwZS5iaW5kKHRoaXMpO1xuICB0aGlzLmdldEV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uLmJpbmQodGhpcyk7XG59XG5cbi8qKlxuICogRGVmaW5lIG1pbWV0eXBlIC0+IGV4dGVuc2lvbiBtYXBwaW5ncy4gIEVhY2gga2V5IGlzIGEgbWltZS10eXBlIHRoYXQgbWFwc1xuICogdG8gYW4gYXJyYXkgb2YgZXh0ZW5zaW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIHR5cGUuICBUaGUgZmlyc3QgZXh0ZW5zaW9uIGlzXG4gKiB1c2VkIGFzIHRoZSBkZWZhdWx0IGV4dGVuc2lvbiBmb3IgdGhlIHR5cGUuXG4gKlxuICogZS5nLiBtaW1lLmRlZmluZSh7J2F1ZGlvL29nZycsIFsnb2dhJywgJ29nZycsICdzcHgnXX0pO1xuICpcbiAqIElmIGEgdHlwZSBkZWNsYXJlcyBhbiBleHRlbnNpb24gdGhhdCBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQsIGFuIGVycm9yIHdpbGxcbiAqIGJlIHRocm93bi4gIFRvIHN1cHByZXNzIHRoaXMgZXJyb3IgYW5kIGZvcmNlIHRoZSBleHRlbnNpb24gdG8gYmUgYXNzb2NpYXRlZFxuICogd2l0aCB0aGUgbmV3IHR5cGUsIHBhc3MgYGZvcmNlYD10cnVlLiAgQWx0ZXJuYXRpdmVseSwgeW91IG1heSBwcmVmaXggdGhlXG4gKiBleHRlbnNpb24gd2l0aCBcIipcIiB0byBtYXAgdGhlIHR5cGUgdG8gZXh0ZW5zaW9uLCB3aXRob3V0IG1hcHBpbmcgdGhlXG4gKiBleHRlbnNpb24gdG8gdGhlIHR5cGUuXG4gKlxuICogZS5nLiBtaW1lLmRlZmluZSh7J2F1ZGlvL3dhdicsIFsnd2F2J119LCB7J2F1ZGlvL3gtd2F2JywgWycqd2F2J119KTtcbiAqXG4gKlxuICogQHBhcmFtIG1hcCAoT2JqZWN0KSB0eXBlIGRlZmluaXRpb25zXG4gKiBAcGFyYW0gZm9yY2UgKEJvb2xlYW4pIGlmIHRydWUsIGZvcmNlIG92ZXJyaWRpbmcgb2YgZXhpc3RpbmcgZGVmaW5pdGlvbnNcbiAqL1xuTWltZS5wcm90b3R5cGUuZGVmaW5lID0gZnVuY3Rpb24odHlwZU1hcCwgZm9yY2UpIHtcbiAgZm9yICh2YXIgdHlwZSBpbiB0eXBlTWFwKSB7XG4gICAgdmFyIGV4dGVuc2lvbnMgPSB0eXBlTWFwW3R5cGVdLm1hcChmdW5jdGlvbih0KSB7cmV0dXJuIHQudG9Mb3dlckNhc2UoKX0pO1xuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4dGVuc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBleHQgPSBleHRlbnNpb25zW2ldO1xuXG4gICAgICAvLyAnKicgcHJlZml4ID0gbm90IHRoZSBwcmVmZXJyZWQgdHlwZSBmb3IgdGhpcyBleHRlbnNpb24uICBTbyBmaXh1cCB0aGVcbiAgICAgIC8vIGV4dGVuc2lvbiwgYW5kIHNraXAgaXQuXG4gICAgICBpZiAoZXh0WzBdID09ICcqJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFmb3JjZSAmJiAoZXh0IGluIHRoaXMuX3R5cGVzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0F0dGVtcHQgdG8gY2hhbmdlIG1hcHBpbmcgZm9yIFwiJyArIGV4dCArXG4gICAgICAgICAgJ1wiIGV4dGVuc2lvbiBmcm9tIFwiJyArIHRoaXMuX3R5cGVzW2V4dF0gKyAnXCIgdG8gXCInICsgdHlwZSArXG4gICAgICAgICAgJ1wiLiBQYXNzIGBmb3JjZT10cnVlYCB0byBhbGxvdyB0aGlzLCBvdGhlcndpc2UgcmVtb3ZlIFwiJyArIGV4dCArXG4gICAgICAgICAgJ1wiIGZyb20gdGhlIGxpc3Qgb2YgZXh0ZW5zaW9ucyBmb3IgXCInICsgdHlwZSArICdcIi4nXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3R5cGVzW2V4dF0gPSB0eXBlO1xuICAgIH1cblxuICAgIC8vIFVzZSBmaXJzdCBleHRlbnNpb24gYXMgZGVmYXVsdFxuICAgIGlmIChmb3JjZSB8fCAhdGhpcy5fZXh0ZW5zaW9uc1t0eXBlXSkge1xuICAgICAgdmFyIGV4dCA9IGV4dGVuc2lvbnNbMF07XG4gICAgICB0aGlzLl9leHRlbnNpb25zW3R5cGVdID0gKGV4dFswXSAhPSAnKicpID8gZXh0IDogZXh0LnN1YnN0cigxKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogTG9va3VwIGEgbWltZSB0eXBlIGJhc2VkIG9uIGV4dGVuc2lvblxuICovXG5NaW1lLnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24ocGF0aCkge1xuICBwYXRoID0gU3RyaW5nKHBhdGgpO1xuICB2YXIgbGFzdCA9IHBhdGgucmVwbGFjZSgvXi4qWy9cXFxcXS8sICcnKS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgZXh0ID0gbGFzdC5yZXBsYWNlKC9eLipcXC4vLCAnJykudG9Mb3dlckNhc2UoKTtcblxuICB2YXIgaGFzUGF0aCA9IGxhc3QubGVuZ3RoIDwgcGF0aC5sZW5ndGg7XG4gIHZhciBoYXNEb3QgPSBleHQubGVuZ3RoIDwgbGFzdC5sZW5ndGggLSAxO1xuXG4gIHJldHVybiAoaGFzRG90IHx8ICFoYXNQYXRoKSAmJiB0aGlzLl90eXBlc1tleHRdIHx8IG51bGw7XG59O1xuXG4vKipcbiAqIFJldHVybiBmaWxlIGV4dGVuc2lvbiBhc3NvY2lhdGVkIHdpdGggYSBtaW1lIHR5cGVcbiAqL1xuTWltZS5wcm90b3R5cGUuZ2V0RXh0ZW5zaW9uID0gZnVuY3Rpb24odHlwZSkge1xuICB0eXBlID0gL15cXHMqKFteO1xcc10qKS8udGVzdCh0eXBlKSAmJiBSZWdFeHAuJDE7XG4gIHJldHVybiB0eXBlICYmIHRoaXMuX2V4dGVuc2lvbnNbdHlwZS50b0xvd2VyQ2FzZSgpXSB8fCBudWxsO1xufTtcblxudmFyIE1pbWVfMSA9IE1pbWU7XG5cbnZhciBzdGFuZGFyZCA9IHtcImFwcGxpY2F0aW9uL2FuZHJldy1pbnNldFwiOltcImV6XCJdLFwiYXBwbGljYXRpb24vYXBwbGl4d2FyZVwiOltcImF3XCJdLFwiYXBwbGljYXRpb24vYXRvbSt4bWxcIjpbXCJhdG9tXCJdLFwiYXBwbGljYXRpb24vYXRvbWNhdCt4bWxcIjpbXCJhdG9tY2F0XCJdLFwiYXBwbGljYXRpb24vYXRvbWRlbGV0ZWQreG1sXCI6W1wiYXRvbWRlbGV0ZWRcIl0sXCJhcHBsaWNhdGlvbi9hdG9tc3ZjK3htbFwiOltcImF0b21zdmNcIl0sXCJhcHBsaWNhdGlvbi9hdHNjLWR3ZCt4bWxcIjpbXCJkd2RcIl0sXCJhcHBsaWNhdGlvbi9hdHNjLWhlbGQreG1sXCI6W1wiaGVsZFwiXSxcImFwcGxpY2F0aW9uL2F0c2MtcnNhdCt4bWxcIjpbXCJyc2F0XCJdLFwiYXBwbGljYXRpb24vYmRvY1wiOltcImJkb2NcIl0sXCJhcHBsaWNhdGlvbi9jYWxlbmRhcit4bWxcIjpbXCJ4Y3NcIl0sXCJhcHBsaWNhdGlvbi9jY3htbCt4bWxcIjpbXCJjY3htbFwiXSxcImFwcGxpY2F0aW9uL2NkZngreG1sXCI6W1wiY2RmeFwiXSxcImFwcGxpY2F0aW9uL2NkbWktY2FwYWJpbGl0eVwiOltcImNkbWlhXCJdLFwiYXBwbGljYXRpb24vY2RtaS1jb250YWluZXJcIjpbXCJjZG1pY1wiXSxcImFwcGxpY2F0aW9uL2NkbWktZG9tYWluXCI6W1wiY2RtaWRcIl0sXCJhcHBsaWNhdGlvbi9jZG1pLW9iamVjdFwiOltcImNkbWlvXCJdLFwiYXBwbGljYXRpb24vY2RtaS1xdWV1ZVwiOltcImNkbWlxXCJdLFwiYXBwbGljYXRpb24vY3Utc2VlbWVcIjpbXCJjdVwiXSxcImFwcGxpY2F0aW9uL2Rhc2greG1sXCI6W1wibXBkXCJdLFwiYXBwbGljYXRpb24vZGF2bW91bnQreG1sXCI6W1wiZGF2bW91bnRcIl0sXCJhcHBsaWNhdGlvbi9kb2Nib29rK3htbFwiOltcImRia1wiXSxcImFwcGxpY2F0aW9uL2Rzc2MrZGVyXCI6W1wiZHNzY1wiXSxcImFwcGxpY2F0aW9uL2Rzc2MreG1sXCI6W1wieGRzc2NcIl0sXCJhcHBsaWNhdGlvbi9lY21hc2NyaXB0XCI6W1wiZWNtYVwiLFwiZXNcIl0sXCJhcHBsaWNhdGlvbi9lbW1hK3htbFwiOltcImVtbWFcIl0sXCJhcHBsaWNhdGlvbi9lbW90aW9ubWwreG1sXCI6W1wiZW1vdGlvbm1sXCJdLFwiYXBwbGljYXRpb24vZXB1Yit6aXBcIjpbXCJlcHViXCJdLFwiYXBwbGljYXRpb24vZXhpXCI6W1wiZXhpXCJdLFwiYXBwbGljYXRpb24vZmR0K3htbFwiOltcImZkdFwiXSxcImFwcGxpY2F0aW9uL2ZvbnQtdGRwZnJcIjpbXCJwZnJcIl0sXCJhcHBsaWNhdGlvbi9nZW8ranNvblwiOltcImdlb2pzb25cIl0sXCJhcHBsaWNhdGlvbi9nbWwreG1sXCI6W1wiZ21sXCJdLFwiYXBwbGljYXRpb24vZ3B4K3htbFwiOltcImdweFwiXSxcImFwcGxpY2F0aW9uL2d4ZlwiOltcImd4ZlwiXSxcImFwcGxpY2F0aW9uL2d6aXBcIjpbXCJnelwiXSxcImFwcGxpY2F0aW9uL2hqc29uXCI6W1wiaGpzb25cIl0sXCJhcHBsaWNhdGlvbi9oeXBlcnN0dWRpb1wiOltcInN0a1wiXSxcImFwcGxpY2F0aW9uL2lua21sK3htbFwiOltcImlua1wiLFwiaW5rbWxcIl0sXCJhcHBsaWNhdGlvbi9pcGZpeFwiOltcImlwZml4XCJdLFwiYXBwbGljYXRpb24vaXRzK3htbFwiOltcIml0c1wiXSxcImFwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZVwiOltcImphclwiLFwid2FyXCIsXCJlYXJcIl0sXCJhcHBsaWNhdGlvbi9qYXZhLXNlcmlhbGl6ZWQtb2JqZWN0XCI6W1wic2VyXCJdLFwiYXBwbGljYXRpb24vamF2YS12bVwiOltcImNsYXNzXCJdLFwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiOltcImpzXCIsXCJtanNcIl0sXCJhcHBsaWNhdGlvbi9qc29uXCI6W1wianNvblwiLFwibWFwXCJdLFwiYXBwbGljYXRpb24vanNvbjVcIjpbXCJqc29uNVwiXSxcImFwcGxpY2F0aW9uL2pzb25tbCtqc29uXCI6W1wianNvbm1sXCJdLFwiYXBwbGljYXRpb24vbGQranNvblwiOltcImpzb25sZFwiXSxcImFwcGxpY2F0aW9uL2xncit4bWxcIjpbXCJsZ3JcIl0sXCJhcHBsaWNhdGlvbi9sb3N0K3htbFwiOltcImxvc3R4bWxcIl0sXCJhcHBsaWNhdGlvbi9tYWMtYmluaGV4NDBcIjpbXCJocXhcIl0sXCJhcHBsaWNhdGlvbi9tYWMtY29tcGFjdHByb1wiOltcImNwdFwiXSxcImFwcGxpY2F0aW9uL21hZHMreG1sXCI6W1wibWFkc1wiXSxcImFwcGxpY2F0aW9uL21hbmlmZXN0K2pzb25cIjpbXCJ3ZWJtYW5pZmVzdFwiXSxcImFwcGxpY2F0aW9uL21hcmNcIjpbXCJtcmNcIl0sXCJhcHBsaWNhdGlvbi9tYXJjeG1sK3htbFwiOltcIm1yY3hcIl0sXCJhcHBsaWNhdGlvbi9tYXRoZW1hdGljYVwiOltcIm1hXCIsXCJuYlwiLFwibWJcIl0sXCJhcHBsaWNhdGlvbi9tYXRobWwreG1sXCI6W1wibWF0aG1sXCJdLFwiYXBwbGljYXRpb24vbWJveFwiOltcIm1ib3hcIl0sXCJhcHBsaWNhdGlvbi9tZWRpYXNlcnZlcmNvbnRyb2wreG1sXCI6W1wibXNjbWxcIl0sXCJhcHBsaWNhdGlvbi9tZXRhbGluayt4bWxcIjpbXCJtZXRhbGlua1wiXSxcImFwcGxpY2F0aW9uL21ldGFsaW5rNCt4bWxcIjpbXCJtZXRhNFwiXSxcImFwcGxpY2F0aW9uL21ldHMreG1sXCI6W1wibWV0c1wiXSxcImFwcGxpY2F0aW9uL21tdC1hZWkreG1sXCI6W1wibWFlaVwiXSxcImFwcGxpY2F0aW9uL21tdC11c2QreG1sXCI6W1wibXVzZFwiXSxcImFwcGxpY2F0aW9uL21vZHMreG1sXCI6W1wibW9kc1wiXSxcImFwcGxpY2F0aW9uL21wMjFcIjpbXCJtMjFcIixcIm1wMjFcIl0sXCJhcHBsaWNhdGlvbi9tcDRcIjpbXCJtcDRzXCIsXCJtNHBcIl0sXCJhcHBsaWNhdGlvbi9tcmItY29uc3VtZXIreG1sXCI6W1wiKnhkZlwiXSxcImFwcGxpY2F0aW9uL21yYi1wdWJsaXNoK3htbFwiOltcIip4ZGZcIl0sXCJhcHBsaWNhdGlvbi9tc3dvcmRcIjpbXCJkb2NcIixcImRvdFwiXSxcImFwcGxpY2F0aW9uL214ZlwiOltcIm14ZlwiXSxcImFwcGxpY2F0aW9uL24tcXVhZHNcIjpbXCJucVwiXSxcImFwcGxpY2F0aW9uL24tdHJpcGxlc1wiOltcIm50XCJdLFwiYXBwbGljYXRpb24vbm9kZVwiOltcImNqc1wiXSxcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiOltcImJpblwiLFwiZG1zXCIsXCJscmZcIixcIm1hclwiLFwic29cIixcImRpc3RcIixcImRpc3R6XCIsXCJwa2dcIixcImJwa1wiLFwiZHVtcFwiLFwiZWxjXCIsXCJkZXBsb3lcIixcImV4ZVwiLFwiZGxsXCIsXCJkZWJcIixcImRtZ1wiLFwiaXNvXCIsXCJpbWdcIixcIm1zaVwiLFwibXNwXCIsXCJtc21cIixcImJ1ZmZlclwiXSxcImFwcGxpY2F0aW9uL29kYVwiOltcIm9kYVwiXSxcImFwcGxpY2F0aW9uL29lYnBzLXBhY2thZ2UreG1sXCI6W1wib3BmXCJdLFwiYXBwbGljYXRpb24vb2dnXCI6W1wib2d4XCJdLFwiYXBwbGljYXRpb24vb21kb2MreG1sXCI6W1wib21kb2NcIl0sXCJhcHBsaWNhdGlvbi9vbmVub3RlXCI6W1wib25ldG9jXCIsXCJvbmV0b2MyXCIsXCJvbmV0bXBcIixcIm9uZXBrZ1wiXSxcImFwcGxpY2F0aW9uL294cHNcIjpbXCJveHBzXCJdLFwiYXBwbGljYXRpb24vcDJwLW92ZXJsYXkreG1sXCI6W1wicmVsb1wiXSxcImFwcGxpY2F0aW9uL3BhdGNoLW9wcy1lcnJvcit4bWxcIjpbXCIqeGVyXCJdLFwiYXBwbGljYXRpb24vcGRmXCI6W1wicGRmXCJdLFwiYXBwbGljYXRpb24vcGdwLWVuY3J5cHRlZFwiOltcInBncFwiXSxcImFwcGxpY2F0aW9uL3BncC1zaWduYXR1cmVcIjpbXCJhc2NcIixcInNpZ1wiXSxcImFwcGxpY2F0aW9uL3BpY3MtcnVsZXNcIjpbXCJwcmZcIl0sXCJhcHBsaWNhdGlvbi9wa2NzMTBcIjpbXCJwMTBcIl0sXCJhcHBsaWNhdGlvbi9wa2NzNy1taW1lXCI6W1wicDdtXCIsXCJwN2NcIl0sXCJhcHBsaWNhdGlvbi9wa2NzNy1zaWduYXR1cmVcIjpbXCJwN3NcIl0sXCJhcHBsaWNhdGlvbi9wa2NzOFwiOltcInA4XCJdLFwiYXBwbGljYXRpb24vcGtpeC1hdHRyLWNlcnRcIjpbXCJhY1wiXSxcImFwcGxpY2F0aW9uL3BraXgtY2VydFwiOltcImNlclwiXSxcImFwcGxpY2F0aW9uL3BraXgtY3JsXCI6W1wiY3JsXCJdLFwiYXBwbGljYXRpb24vcGtpeC1wa2lwYXRoXCI6W1wicGtpcGF0aFwiXSxcImFwcGxpY2F0aW9uL3BraXhjbXBcIjpbXCJwa2lcIl0sXCJhcHBsaWNhdGlvbi9wbHMreG1sXCI6W1wicGxzXCJdLFwiYXBwbGljYXRpb24vcG9zdHNjcmlwdFwiOltcImFpXCIsXCJlcHNcIixcInBzXCJdLFwiYXBwbGljYXRpb24vcHJvdmVuYW5jZSt4bWxcIjpbXCJwcm92eFwiXSxcImFwcGxpY2F0aW9uL3Bza2MreG1sXCI6W1wicHNrY3htbFwiXSxcImFwcGxpY2F0aW9uL3JhbWwreWFtbFwiOltcInJhbWxcIl0sXCJhcHBsaWNhdGlvbi9yZGYreG1sXCI6W1wicmRmXCIsXCJvd2xcIl0sXCJhcHBsaWNhdGlvbi9yZWdpbmZvK3htbFwiOltcInJpZlwiXSxcImFwcGxpY2F0aW9uL3JlbGF4LW5nLWNvbXBhY3Qtc3ludGF4XCI6W1wicm5jXCJdLFwiYXBwbGljYXRpb24vcmVzb3VyY2UtbGlzdHMreG1sXCI6W1wicmxcIl0sXCJhcHBsaWNhdGlvbi9yZXNvdXJjZS1saXN0cy1kaWZmK3htbFwiOltcInJsZFwiXSxcImFwcGxpY2F0aW9uL3Jscy1zZXJ2aWNlcyt4bWxcIjpbXCJyc1wiXSxcImFwcGxpY2F0aW9uL3JvdXRlLWFwZCt4bWxcIjpbXCJyYXBkXCJdLFwiYXBwbGljYXRpb24vcm91dGUtcy10c2lkK3htbFwiOltcInNsc1wiXSxcImFwcGxpY2F0aW9uL3JvdXRlLXVzZCt4bWxcIjpbXCJydXNkXCJdLFwiYXBwbGljYXRpb24vcnBraS1naG9zdGJ1c3RlcnNcIjpbXCJnYnJcIl0sXCJhcHBsaWNhdGlvbi9ycGtpLW1hbmlmZXN0XCI6W1wibWZ0XCJdLFwiYXBwbGljYXRpb24vcnBraS1yb2FcIjpbXCJyb2FcIl0sXCJhcHBsaWNhdGlvbi9yc2QreG1sXCI6W1wicnNkXCJdLFwiYXBwbGljYXRpb24vcnNzK3htbFwiOltcInJzc1wiXSxcImFwcGxpY2F0aW9uL3J0ZlwiOltcInJ0ZlwiXSxcImFwcGxpY2F0aW9uL3NibWwreG1sXCI6W1wic2JtbFwiXSxcImFwcGxpY2F0aW9uL3NjdnAtY3YtcmVxdWVzdFwiOltcInNjcVwiXSxcImFwcGxpY2F0aW9uL3NjdnAtY3YtcmVzcG9uc2VcIjpbXCJzY3NcIl0sXCJhcHBsaWNhdGlvbi9zY3ZwLXZwLXJlcXVlc3RcIjpbXCJzcHFcIl0sXCJhcHBsaWNhdGlvbi9zY3ZwLXZwLXJlc3BvbnNlXCI6W1wic3BwXCJdLFwiYXBwbGljYXRpb24vc2RwXCI6W1wic2RwXCJdLFwiYXBwbGljYXRpb24vc2VubWwreG1sXCI6W1wic2VubWx4XCJdLFwiYXBwbGljYXRpb24vc2Vuc21sK3htbFwiOltcInNlbnNtbHhcIl0sXCJhcHBsaWNhdGlvbi9zZXQtcGF5bWVudC1pbml0aWF0aW9uXCI6W1wic2V0cGF5XCJdLFwiYXBwbGljYXRpb24vc2V0LXJlZ2lzdHJhdGlvbi1pbml0aWF0aW9uXCI6W1wic2V0cmVnXCJdLFwiYXBwbGljYXRpb24vc2hmK3htbFwiOltcInNoZlwiXSxcImFwcGxpY2F0aW9uL3NpZXZlXCI6W1wic2l2XCIsXCJzaWV2ZVwiXSxcImFwcGxpY2F0aW9uL3NtaWwreG1sXCI6W1wic21pXCIsXCJzbWlsXCJdLFwiYXBwbGljYXRpb24vc3BhcnFsLXF1ZXJ5XCI6W1wicnFcIl0sXCJhcHBsaWNhdGlvbi9zcGFycWwtcmVzdWx0cyt4bWxcIjpbXCJzcnhcIl0sXCJhcHBsaWNhdGlvbi9zcmdzXCI6W1wiZ3JhbVwiXSxcImFwcGxpY2F0aW9uL3NyZ3MreG1sXCI6W1wiZ3J4bWxcIl0sXCJhcHBsaWNhdGlvbi9zcnUreG1sXCI6W1wic3J1XCJdLFwiYXBwbGljYXRpb24vc3NkbCt4bWxcIjpbXCJzc2RsXCJdLFwiYXBwbGljYXRpb24vc3NtbCt4bWxcIjpbXCJzc21sXCJdLFwiYXBwbGljYXRpb24vc3dpZCt4bWxcIjpbXCJzd2lkdGFnXCJdLFwiYXBwbGljYXRpb24vdGVpK3htbFwiOltcInRlaVwiLFwidGVpY29ycHVzXCJdLFwiYXBwbGljYXRpb24vdGhyYXVkK3htbFwiOltcInRmaVwiXSxcImFwcGxpY2F0aW9uL3RpbWVzdGFtcGVkLWRhdGFcIjpbXCJ0c2RcIl0sXCJhcHBsaWNhdGlvbi90b21sXCI6W1widG9tbFwiXSxcImFwcGxpY2F0aW9uL3R0bWwreG1sXCI6W1widHRtbFwiXSxcImFwcGxpY2F0aW9uL3VyYy1yZXNzaGVldCt4bWxcIjpbXCJyc2hlZXRcIl0sXCJhcHBsaWNhdGlvbi92b2ljZXhtbCt4bWxcIjpbXCJ2eG1sXCJdLFwiYXBwbGljYXRpb24vd2FzbVwiOltcIndhc21cIl0sXCJhcHBsaWNhdGlvbi93aWRnZXRcIjpbXCJ3Z3RcIl0sXCJhcHBsaWNhdGlvbi93aW5obHBcIjpbXCJobHBcIl0sXCJhcHBsaWNhdGlvbi93c2RsK3htbFwiOltcIndzZGxcIl0sXCJhcHBsaWNhdGlvbi93c3BvbGljeSt4bWxcIjpbXCJ3c3BvbGljeVwiXSxcImFwcGxpY2F0aW9uL3hhbWwreG1sXCI6W1wieGFtbFwiXSxcImFwcGxpY2F0aW9uL3hjYXAtYXR0K3htbFwiOltcInhhdlwiXSxcImFwcGxpY2F0aW9uL3hjYXAtY2Fwcyt4bWxcIjpbXCJ4Y2FcIl0sXCJhcHBsaWNhdGlvbi94Y2FwLWRpZmYreG1sXCI6W1wieGRmXCJdLFwiYXBwbGljYXRpb24veGNhcC1lbCt4bWxcIjpbXCJ4ZWxcIl0sXCJhcHBsaWNhdGlvbi94Y2FwLWVycm9yK3htbFwiOltcInhlclwiXSxcImFwcGxpY2F0aW9uL3hjYXAtbnMreG1sXCI6W1wieG5zXCJdLFwiYXBwbGljYXRpb24veGVuYyt4bWxcIjpbXCJ4ZW5jXCJdLFwiYXBwbGljYXRpb24veGh0bWwreG1sXCI6W1wieGh0bWxcIixcInhodFwiXSxcImFwcGxpY2F0aW9uL3hsaWZmK3htbFwiOltcInhsZlwiXSxcImFwcGxpY2F0aW9uL3htbFwiOltcInhtbFwiLFwieHNsXCIsXCJ4c2RcIixcInJuZ1wiXSxcImFwcGxpY2F0aW9uL3htbC1kdGRcIjpbXCJkdGRcIl0sXCJhcHBsaWNhdGlvbi94b3AreG1sXCI6W1wieG9wXCJdLFwiYXBwbGljYXRpb24veHByb2MreG1sXCI6W1wieHBsXCJdLFwiYXBwbGljYXRpb24veHNsdCt4bWxcIjpbXCJ4c2x0XCJdLFwiYXBwbGljYXRpb24veHNwZit4bWxcIjpbXCJ4c3BmXCJdLFwiYXBwbGljYXRpb24veHYreG1sXCI6W1wibXhtbFwiLFwieGh2bWxcIixcInh2bWxcIixcInh2bVwiXSxcImFwcGxpY2F0aW9uL3lhbmdcIjpbXCJ5YW5nXCJdLFwiYXBwbGljYXRpb24veWluK3htbFwiOltcInlpblwiXSxcImFwcGxpY2F0aW9uL3ppcFwiOltcInppcFwiXSxcImF1ZGlvLzNncHBcIjpbXCIqM2dwcFwiXSxcImF1ZGlvL2FkcGNtXCI6W1wiYWRwXCJdLFwiYXVkaW8vYmFzaWNcIjpbXCJhdVwiLFwic25kXCJdLFwiYXVkaW8vbWlkaVwiOltcIm1pZFwiLFwibWlkaVwiLFwia2FyXCIsXCJybWlcIl0sXCJhdWRpby9tb2JpbGUteG1mXCI6W1wibXhtZlwiXSxcImF1ZGlvL21wM1wiOltcIiptcDNcIl0sXCJhdWRpby9tcDRcIjpbXCJtNGFcIixcIm1wNGFcIl0sXCJhdWRpby9tcGVnXCI6W1wibXBnYVwiLFwibXAyXCIsXCJtcDJhXCIsXCJtcDNcIixcIm0yYVwiLFwibTNhXCJdLFwiYXVkaW8vb2dnXCI6W1wib2dhXCIsXCJvZ2dcIixcInNweFwiXSxcImF1ZGlvL3MzbVwiOltcInMzbVwiXSxcImF1ZGlvL3NpbGtcIjpbXCJzaWxcIl0sXCJhdWRpby93YXZcIjpbXCJ3YXZcIl0sXCJhdWRpby93YXZlXCI6W1wiKndhdlwiXSxcImF1ZGlvL3dlYm1cIjpbXCJ3ZWJhXCJdLFwiYXVkaW8veG1cIjpbXCJ4bVwiXSxcImZvbnQvY29sbGVjdGlvblwiOltcInR0Y1wiXSxcImZvbnQvb3RmXCI6W1wib3RmXCJdLFwiZm9udC90dGZcIjpbXCJ0dGZcIl0sXCJmb250L3dvZmZcIjpbXCJ3b2ZmXCJdLFwiZm9udC93b2ZmMlwiOltcIndvZmYyXCJdLFwiaW1hZ2UvYWNlc1wiOltcImV4clwiXSxcImltYWdlL2FwbmdcIjpbXCJhcG5nXCJdLFwiaW1hZ2UvYm1wXCI6W1wiYm1wXCJdLFwiaW1hZ2UvY2dtXCI6W1wiY2dtXCJdLFwiaW1hZ2UvZGljb20tcmxlXCI6W1wiZHJsZVwiXSxcImltYWdlL2VtZlwiOltcImVtZlwiXSxcImltYWdlL2ZpdHNcIjpbXCJmaXRzXCJdLFwiaW1hZ2UvZzNmYXhcIjpbXCJnM1wiXSxcImltYWdlL2dpZlwiOltcImdpZlwiXSxcImltYWdlL2hlaWNcIjpbXCJoZWljXCJdLFwiaW1hZ2UvaGVpYy1zZXF1ZW5jZVwiOltcImhlaWNzXCJdLFwiaW1hZ2UvaGVpZlwiOltcImhlaWZcIl0sXCJpbWFnZS9oZWlmLXNlcXVlbmNlXCI6W1wiaGVpZnNcIl0sXCJpbWFnZS9oZWoya1wiOltcImhlajJcIl0sXCJpbWFnZS9oc2oyXCI6W1wiaHNqMlwiXSxcImltYWdlL2llZlwiOltcImllZlwiXSxcImltYWdlL2psc1wiOltcImpsc1wiXSxcImltYWdlL2pwMlwiOltcImpwMlwiLFwianBnMlwiXSxcImltYWdlL2pwZWdcIjpbXCJqcGVnXCIsXCJqcGdcIixcImpwZVwiXSxcImltYWdlL2pwaFwiOltcImpwaFwiXSxcImltYWdlL2pwaGNcIjpbXCJqaGNcIl0sXCJpbWFnZS9qcG1cIjpbXCJqcG1cIl0sXCJpbWFnZS9qcHhcIjpbXCJqcHhcIixcImpwZlwiXSxcImltYWdlL2p4clwiOltcImp4clwiXSxcImltYWdlL2p4cmFcIjpbXCJqeHJhXCJdLFwiaW1hZ2Uvanhyc1wiOltcImp4cnNcIl0sXCJpbWFnZS9qeHNcIjpbXCJqeHNcIl0sXCJpbWFnZS9qeHNjXCI6W1wianhzY1wiXSxcImltYWdlL2p4c2lcIjpbXCJqeHNpXCJdLFwiaW1hZ2Uvanhzc1wiOltcImp4c3NcIl0sXCJpbWFnZS9rdHhcIjpbXCJrdHhcIl0sXCJpbWFnZS9wbmdcIjpbXCJwbmdcIl0sXCJpbWFnZS9zZ2lcIjpbXCJzZ2lcIl0sXCJpbWFnZS9zdmcreG1sXCI6W1wic3ZnXCIsXCJzdmd6XCJdLFwiaW1hZ2UvdDM4XCI6W1widDM4XCJdLFwiaW1hZ2UvdGlmZlwiOltcInRpZlwiLFwidGlmZlwiXSxcImltYWdlL3RpZmYtZnhcIjpbXCJ0ZnhcIl0sXCJpbWFnZS93ZWJwXCI6W1wid2VicFwiXSxcImltYWdlL3dtZlwiOltcIndtZlwiXSxcIm1lc3NhZ2UvZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCI6W1wiZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCJdLFwibWVzc2FnZS9nbG9iYWxcIjpbXCJ1OG1zZ1wiXSxcIm1lc3NhZ2UvZ2xvYmFsLWRlbGl2ZXJ5LXN0YXR1c1wiOltcInU4ZHNuXCJdLFwibWVzc2FnZS9nbG9iYWwtZGlzcG9zaXRpb24tbm90aWZpY2F0aW9uXCI6W1widThtZG5cIl0sXCJtZXNzYWdlL2dsb2JhbC1oZWFkZXJzXCI6W1widThoZHJcIl0sXCJtZXNzYWdlL3JmYzgyMlwiOltcImVtbFwiLFwibWltZVwiXSxcIm1vZGVsLzNtZlwiOltcIjNtZlwiXSxcIm1vZGVsL2dsdGYranNvblwiOltcImdsdGZcIl0sXCJtb2RlbC9nbHRmLWJpbmFyeVwiOltcImdsYlwiXSxcIm1vZGVsL2lnZXNcIjpbXCJpZ3NcIixcImlnZXNcIl0sXCJtb2RlbC9tZXNoXCI6W1wibXNoXCIsXCJtZXNoXCIsXCJzaWxvXCJdLFwibW9kZWwvbXRsXCI6W1wibXRsXCJdLFwibW9kZWwvb2JqXCI6W1wib2JqXCJdLFwibW9kZWwvc3RsXCI6W1wic3RsXCJdLFwibW9kZWwvdnJtbFwiOltcIndybFwiLFwidnJtbFwiXSxcIm1vZGVsL3gzZCtiaW5hcnlcIjpbXCIqeDNkYlwiLFwieDNkYnpcIl0sXCJtb2RlbC94M2QrZmFzdGluZm9zZXRcIjpbXCJ4M2RiXCJdLFwibW9kZWwveDNkK3ZybWxcIjpbXCIqeDNkdlwiLFwieDNkdnpcIl0sXCJtb2RlbC94M2QreG1sXCI6W1wieDNkXCIsXCJ4M2R6XCJdLFwibW9kZWwveDNkLXZybWxcIjpbXCJ4M2R2XCJdLFwidGV4dC9jYWNoZS1tYW5pZmVzdFwiOltcImFwcGNhY2hlXCIsXCJtYW5pZmVzdFwiXSxcInRleHQvY2FsZW5kYXJcIjpbXCJpY3NcIixcImlmYlwiXSxcInRleHQvY29mZmVlc2NyaXB0XCI6W1wiY29mZmVlXCIsXCJsaXRjb2ZmZWVcIl0sXCJ0ZXh0L2Nzc1wiOltcImNzc1wiXSxcInRleHQvY3N2XCI6W1wiY3N2XCJdLFwidGV4dC9odG1sXCI6W1wiaHRtbFwiLFwiaHRtXCIsXCJzaHRtbFwiXSxcInRleHQvamFkZVwiOltcImphZGVcIl0sXCJ0ZXh0L2pzeFwiOltcImpzeFwiXSxcInRleHQvbGVzc1wiOltcImxlc3NcIl0sXCJ0ZXh0L21hcmtkb3duXCI6W1wibWFya2Rvd25cIixcIm1kXCJdLFwidGV4dC9tYXRobWxcIjpbXCJtbWxcIl0sXCJ0ZXh0L21keFwiOltcIm1keFwiXSxcInRleHQvbjNcIjpbXCJuM1wiXSxcInRleHQvcGxhaW5cIjpbXCJ0eHRcIixcInRleHRcIixcImNvbmZcIixcImRlZlwiLFwibGlzdFwiLFwibG9nXCIsXCJpblwiLFwiaW5pXCJdLFwidGV4dC9yaWNodGV4dFwiOltcInJ0eFwiXSxcInRleHQvcnRmXCI6W1wiKnJ0ZlwiXSxcInRleHQvc2dtbFwiOltcInNnbWxcIixcInNnbVwiXSxcInRleHQvc2hleFwiOltcInNoZXhcIl0sXCJ0ZXh0L3NsaW1cIjpbXCJzbGltXCIsXCJzbG1cIl0sXCJ0ZXh0L3N0eWx1c1wiOltcInN0eWx1c1wiLFwic3R5bFwiXSxcInRleHQvdGFiLXNlcGFyYXRlZC12YWx1ZXNcIjpbXCJ0c3ZcIl0sXCJ0ZXh0L3Ryb2ZmXCI6W1widFwiLFwidHJcIixcInJvZmZcIixcIm1hblwiLFwibWVcIixcIm1zXCJdLFwidGV4dC90dXJ0bGVcIjpbXCJ0dGxcIl0sXCJ0ZXh0L3VyaS1saXN0XCI6W1widXJpXCIsXCJ1cmlzXCIsXCJ1cmxzXCJdLFwidGV4dC92Y2FyZFwiOltcInZjYXJkXCJdLFwidGV4dC92dHRcIjpbXCJ2dHRcIl0sXCJ0ZXh0L3htbFwiOltcIip4bWxcIl0sXCJ0ZXh0L3lhbWxcIjpbXCJ5YW1sXCIsXCJ5bWxcIl0sXCJ2aWRlby8zZ3BwXCI6W1wiM2dwXCIsXCIzZ3BwXCJdLFwidmlkZW8vM2dwcDJcIjpbXCIzZzJcIl0sXCJ2aWRlby9oMjYxXCI6W1wiaDI2MVwiXSxcInZpZGVvL2gyNjNcIjpbXCJoMjYzXCJdLFwidmlkZW8vaDI2NFwiOltcImgyNjRcIl0sXCJ2aWRlby9qcGVnXCI6W1wianBndlwiXSxcInZpZGVvL2pwbVwiOltcIipqcG1cIixcImpwZ21cIl0sXCJ2aWRlby9tajJcIjpbXCJtajJcIixcIm1qcDJcIl0sXCJ2aWRlby9tcDJ0XCI6W1widHNcIl0sXCJ2aWRlby9tcDRcIjpbXCJtcDRcIixcIm1wNHZcIixcIm1wZzRcIl0sXCJ2aWRlby9tcGVnXCI6W1wibXBlZ1wiLFwibXBnXCIsXCJtcGVcIixcIm0xdlwiLFwibTJ2XCJdLFwidmlkZW8vb2dnXCI6W1wib2d2XCJdLFwidmlkZW8vcXVpY2t0aW1lXCI6W1wicXRcIixcIm1vdlwiXSxcInZpZGVvL3dlYm1cIjpbXCJ3ZWJtXCJdfTtcblxudmFyIGxpdGUgPSBuZXcgTWltZV8xKHN0YW5kYXJkKTtcblxuLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cblxuZnVuY3Rpb24gZ2V0X3NlcnZlcl9yb3V0ZV9oYW5kbGVyKHJvdXRlcykge1xyXG4gICAgZnVuY3Rpb24gaGFuZGxlX3JvdXRlKHJvdXRlLCByZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJlcS5wYXJhbXMgPSByb3V0ZS5wYXJhbXMocm91dGUucGF0dGVybi5leGVjKHJlcS5wYXRoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHJlcS5tZXRob2QudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgLy8gJ2RlbGV0ZScgY2Fubm90IGJlIGV4cG9ydGVkIGZyb20gYSBtb2R1bGUgYmVjYXVzZSBpdCBpcyBhIGtleXdvcmQsXHJcbiAgICAgICAgICAgIC8vIHNvIGNoZWNrIGZvciAnZGVsJyBpbnN0ZWFkXHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZF9leHBvcnQgPSBtZXRob2QgPT09ICdkZWxldGUnID8gJ2RlbCcgOiBtZXRob2Q7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZV9tZXRob2QgPSByb3V0ZS5oYW5kbGVyc1ttZXRob2RfZXhwb3J0XTtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZV9tZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5TQVBQRVJfRVhQT1JUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB3cml0ZSwgZW5kLCBzZXRIZWFkZXIgfSA9IHJlcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaHVua3MgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW50ZXJjZXB0IGRhdGEgc28gdGhhdCBpdCBjYW4gYmUgZXhwb3J0ZWRcclxuICAgICAgICAgICAgICAgICAgICByZXMud3JpdGUgPSBmdW5jdGlvbiAoY2h1bmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmtzLnB1c2goQnVmZmVyLmZyb20oY2h1bmspKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdyaXRlLmFwcGx5KHJlcywgW2NodW5rXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIZWFkZXIuYXBwbHkocmVzLCBbbmFtZSwgdmFsdWVdKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5lbmQgPSBmdW5jdGlvbiAoY2h1bmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNodW5rKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2h1bmtzLnB1c2goQnVmZmVyLmZyb20oY2h1bmspKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kLmFwcGx5KHJlcywgW2NodW5rXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3NhcHBlcl9fOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6ICdmaWxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogcmVxLnVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogcmVxLm1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzLnN0YXR1c0NvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBoZWFkZXJzWydjb250ZW50LXR5cGUnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEJ1ZmZlci5jb25jYXQoY2h1bmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlX25leHQgPSAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmVuZChlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKG5leHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGhhbmRsZV9tZXRob2QocmVxLCByZXMsIGhhbmRsZV9uZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlX25leHQoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIG5vIG1hdGNoaW5nIGhhbmRsZXIgZm9yIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhuZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZpbmRfcm91dGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHJvdXRlIG9mIHJvdXRlcykge1xyXG4gICAgICAgICAgICBpZiAocm91dGUucGF0dGVybi50ZXN0KHJlcS5wYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlX3JvdXRlKHJvdXRlLCByZXEsIHJlcywgbmV4dCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dCgpO1xyXG4gICAgfTtcclxufVxuXG4vKiFcbiAqIGNvb2tpZVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBSb21hbiBTaHR5bG1hblxuICogQ29weXJpZ2h0KGMpIDIwMTUgRG91Z2xhcyBDaHJpc3RvcGhlciBXaWxzb25cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKiBAcHVibGljXG4gKi9cblxudmFyIHBhcnNlXzEgPSBwYXJzZTtcblxuLyoqXG4gKiBNb2R1bGUgdmFyaWFibGVzLlxuICogQHByaXZhdGVcbiAqL1xuXG52YXIgZGVjb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50O1xudmFyIHBhaXJTcGxpdFJlZ0V4cCA9IC87ICovO1xuXG4vKipcbiAqIFBhcnNlIGEgY29va2llIGhlYWRlci5cbiAqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gY29va2llIGhlYWRlciBzdHJpbmcgaW50byBhbiBvYmplY3RcbiAqIFRoZSBvYmplY3QgaGFzIHRoZSB2YXJpb3VzIGNvb2tpZXMgYXMga2V5cyhuYW1lcykgPT4gdmFsdWVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHJldHVybiB7b2JqZWN0fVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0ciwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzdHIgbXVzdCBiZSBhIHN0cmluZycpO1xuICB9XG5cbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KHBhaXJTcGxpdFJlZ0V4cCk7XG4gIHZhciBkZWMgPSBvcHQuZGVjb2RlIHx8IGRlY29kZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBhaXIgPSBwYWlyc1tpXTtcbiAgICB2YXIgZXFfaWR4ID0gcGFpci5pbmRleE9mKCc9Jyk7XG5cbiAgICAvLyBza2lwIHRoaW5ncyB0aGF0IGRvbid0IGxvb2sgbGlrZSBrZXk9dmFsdWVcbiAgICBpZiAoZXFfaWR4IDwgMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGtleSA9IHBhaXIuc3Vic3RyKDAsIGVxX2lkeCkudHJpbSgpO1xuICAgIHZhciB2YWwgPSBwYWlyLnN1YnN0cigrK2VxX2lkeCwgcGFpci5sZW5ndGgpLnRyaW0oKTtcblxuICAgIC8vIHF1b3RlZCB2YWx1ZXNcbiAgICBpZiAoJ1wiJyA9PSB2YWxbMF0pIHtcbiAgICAgIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XG4gICAgfVxuXG4gICAgLy8gb25seSBhc3NpZ24gb25jZVxuICAgIGlmICh1bmRlZmluZWQgPT0gb2JqW2tleV0pIHtcbiAgICAgIG9ialtrZXldID0gdHJ5RGVjb2RlKHZhbCwgZGVjKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIFRyeSBkZWNvZGluZyBhIHN0cmluZyB1c2luZyBhIGRlY29kaW5nIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRlY29kZVxuICogQHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiB0cnlEZWNvZGUoc3RyLCBkZWNvZGUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlKHN0cik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cbnZhciBjaGFycyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXyQnO1xudmFyIHVuc2FmZUNoYXJzID0gL1s8PlxcYlxcZlxcblxcclxcdFxcMFxcdTIwMjhcXHUyMDI5XS9nO1xudmFyIHJlc2VydmVkID0gL14oPzpkb3xpZnxpbnxmb3J8aW50fGxldHxuZXd8dHJ5fHZhcnxieXRlfGNhc2V8Y2hhcnxlbHNlfGVudW18Z290b3xsb25nfHRoaXN8dm9pZHx3aXRofGF3YWl0fGJyZWFrfGNhdGNofGNsYXNzfGNvbnN0fGZpbmFsfGZsb2F0fHNob3J0fHN1cGVyfHRocm93fHdoaWxlfHlpZWxkfGRlbGV0ZXxkb3VibGV8ZXhwb3J0fGltcG9ydHxuYXRpdmV8cmV0dXJufHN3aXRjaHx0aHJvd3N8dHlwZW9mfGJvb2xlYW58ZGVmYXVsdHxleHRlbmRzfGZpbmFsbHl8cGFja2FnZXxwcml2YXRlfGFic3RyYWN0fGNvbnRpbnVlfGRlYnVnZ2VyfGZ1bmN0aW9ufHZvbGF0aWxlfGludGVyZmFjZXxwcm90ZWN0ZWR8dHJhbnNpZW50fGltcGxlbWVudHN8aW5zdGFuY2VvZnxzeW5jaHJvbml6ZWQpJC87XG52YXIgZXNjYXBlZCA9IHtcbiAgICAnPCc6ICdcXFxcdTAwM0MnLFxuICAgICc+JzogJ1xcXFx1MDAzRScsXG4gICAgJy8nOiAnXFxcXHUwMDJGJyxcbiAgICAnXFxcXCc6ICdcXFxcXFxcXCcsXG4gICAgJ1xcYic6ICdcXFxcYicsXG4gICAgJ1xcZic6ICdcXFxcZicsXG4gICAgJ1xcbic6ICdcXFxcbicsXG4gICAgJ1xccic6ICdcXFxccicsXG4gICAgJ1xcdCc6ICdcXFxcdCcsXG4gICAgJ1xcMCc6ICdcXFxcMCcsXG4gICAgJ1xcdTIwMjgnOiAnXFxcXHUyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICdcXFxcdTIwMjknXG59O1xudmFyIG9iamVjdFByb3RvT3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5wcm90b3R5cGUpLnNvcnQoKS5qb2luKCdcXDAnKTtcbmZ1bmN0aW9uIGRldmFsdWUodmFsdWUpIHtcbiAgICB2YXIgY291bnRzID0gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIHdhbGsodGhpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudHMuaGFzKHRoaW5nKSkge1xuICAgICAgICAgICAgY291bnRzLnNldCh0aGluZywgY291bnRzLmdldCh0aGluZykgKyAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb3VudHMuc2V0KHRoaW5nLCAxKTtcbiAgICAgICAgaWYgKCFpc1ByaW1pdGl2ZSh0aGluZykpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSh0aGluZyk7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1N0cmluZyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnQm9vbGVhbic6XG4gICAgICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpbmcuZm9yRWFjaCh3YWxrKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdNYXAnOlxuICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaW5nKS5mb3JFYWNoKHdhbGspO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG8gIT09IE9iamVjdC5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuc29ydCgpLmpvaW4oJ1xcMCcpICE9PSBvYmplY3RQcm90b093blByb3BlcnR5TmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBzdHJpbmdpZnkgYXJiaXRyYXJ5IG5vbi1QT0pPc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0aGluZykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHN0cmluZ2lmeSBQT0pPcyB3aXRoIHN5bWJvbGljIGtleXNcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpbmcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gd2Fsayh0aGluZ1trZXldKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2Fsayh2YWx1ZSk7XG4gICAgdmFyIG5hbWVzID0gbmV3IE1hcCgpO1xuICAgIEFycmF5LmZyb20oY291bnRzKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChlbnRyeSkgeyByZXR1cm4gZW50cnlbMV0gPiAxOyB9KVxuICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYlsxXSAtIGFbMV07IH0pXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSwgaSkge1xuICAgICAgICBuYW1lcy5zZXQoZW50cnlbMF0sIGdldE5hbWUoaSkpO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeSh0aGluZykge1xuICAgICAgICBpZiAobmFtZXMuaGFzKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVzLmdldCh0aGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzUHJpbWl0aXZlKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0cmluZ2lmeVByaW1pdGl2ZSh0aGluZyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHR5cGUgPSBnZXRUeXBlKHRoaW5nKTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICAgICAgY2FzZSAnU3RyaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIk9iamVjdChcIiArIHN0cmluZ2lmeSh0aGluZy52YWx1ZU9mKCkpICsgXCIpXCI7XG4gICAgICAgICAgICBjYXNlICdSZWdFeHAnOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBSZWdFeHAoXCIgKyBzdHJpbmdpZnlTdHJpbmcodGhpbmcuc291cmNlKSArIFwiLCBcXFwiXCIgKyB0aGluZy5mbGFncyArIFwiXFxcIilcIjtcbiAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIm5ldyBEYXRlKFwiICsgdGhpbmcuZ2V0VGltZSgpICsgXCIpXCI7XG4gICAgICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgICAgICAgdmFyIG1lbWJlcnMgPSB0aGluZy5tYXAoZnVuY3Rpb24gKHYsIGkpIHsgcmV0dXJuIGkgaW4gdGhpbmcgPyBzdHJpbmdpZnkodikgOiAnJzsgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHRhaWwgPSB0aGluZy5sZW5ndGggPT09IDAgfHwgKHRoaW5nLmxlbmd0aCAtIDEgaW4gdGhpbmcpID8gJycgOiAnLCc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiW1wiICsgbWVtYmVycy5qb2luKCcsJykgKyB0YWlsICsgXCJdXCI7XG4gICAgICAgICAgICBjYXNlICdTZXQnOlxuICAgICAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJuZXcgXCIgKyB0eXBlICsgXCIoW1wiICsgQXJyYXkuZnJvbSh0aGluZykubWFwKHN0cmluZ2lmeSkuam9pbignLCcpICsgXCJdKVwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gXCJ7XCIgKyBPYmplY3Qua2V5cyh0aGluZykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHNhZmVLZXkoa2V5KSArIFwiOlwiICsgc3RyaW5naWZ5KHRoaW5nW2tleV0pOyB9KS5qb2luKCcsJykgKyBcIn1cIjtcbiAgICAgICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpbmcpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksXCIgKyBvYmogKyBcIilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIk9iamVjdC5jcmVhdGUobnVsbClcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgc3RyID0gc3RyaW5naWZ5KHZhbHVlKTtcbiAgICBpZiAobmFtZXMuc2l6ZSkge1xuICAgICAgICB2YXIgcGFyYW1zXzEgPSBbXTtcbiAgICAgICAgdmFyIHN0YXRlbWVudHNfMSA9IFtdO1xuICAgICAgICB2YXIgdmFsdWVzXzEgPSBbXTtcbiAgICAgICAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgdGhpbmcpIHtcbiAgICAgICAgICAgIHBhcmFtc18xLnB1c2gobmFtZSk7XG4gICAgICAgICAgICBpZiAoaXNQcmltaXRpdmUodGhpbmcpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChzdHJpbmdpZnlQcmltaXRpdmUodGhpbmcpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUodGhpbmcpO1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnTnVtYmVyJzpcbiAgICAgICAgICAgICAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwiT2JqZWN0KFwiICsgc3RyaW5naWZ5KHRoaW5nLnZhbHVlT2YoKSkgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2godGhpbmcudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNfMS5wdXNoKFwibmV3IERhdGUoXCIgKyB0aGluZy5nZXRUaW1lKCkgKyBcIilcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0FycmF5JzpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChcIkFycmF5KFwiICsgdGhpbmcubGVuZ3RoICsgXCIpXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGluZy5mb3JFYWNoKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCJbXCIgKyBpICsgXCJdPVwiICsgc3RyaW5naWZ5KHYpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ1NldCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgU2V0XCIpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCIuXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFwiYWRkKFwiICsgc3RyaW5naWZ5KHYpICsgXCIpXCI7IH0pLmpvaW4oJy4nKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ01hcCc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc18xLnB1c2goXCJuZXcgTWFwXCIpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChuYW1lICsgXCIuXCIgKyBBcnJheS5mcm9tKHRoaW5nKS5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgayA9IF9hWzBdLCB2ID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzZXQoXCIgKyBzdHJpbmdpZnkoaykgKyBcIiwgXCIgKyBzdHJpbmdpZnkodikgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignLicpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzXzEucHVzaChPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpbmcpID09PSBudWxsID8gJ09iamVjdC5jcmVhdGUobnVsbCknIDogJ3t9Jyk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaW5nKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHNfMS5wdXNoKFwiXCIgKyBuYW1lICsgc2FmZVByb3Aoa2V5KSArIFwiPVwiICsgc3RyaW5naWZ5KHRoaW5nW2tleV0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzdGF0ZW1lbnRzXzEucHVzaChcInJldHVybiBcIiArIHN0cik7XG4gICAgICAgIHJldHVybiBcIihmdW5jdGlvbihcIiArIHBhcmFtc18xLmpvaW4oJywnKSArIFwiKXtcIiArIHN0YXRlbWVudHNfMS5qb2luKCc7JykgKyBcIn0oXCIgKyB2YWx1ZXNfMS5qb2luKCcsJykgKyBcIikpXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE5hbWUobnVtKSB7XG4gICAgdmFyIG5hbWUgPSAnJztcbiAgICBkbyB7XG4gICAgICAgIG5hbWUgPSBjaGFyc1tudW0gJSBjaGFycy5sZW5ndGhdICsgbmFtZTtcbiAgICAgICAgbnVtID0gfn4obnVtIC8gY2hhcnMubGVuZ3RoKSAtIDE7XG4gICAgfSB3aGlsZSAobnVtID49IDApO1xuICAgIHJldHVybiByZXNlcnZlZC50ZXN0KG5hbWUpID8gbmFtZSArIFwiX1wiIDogbmFtZTtcbn1cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKHRoaW5nKSB7XG4gICAgcmV0dXJuIE9iamVjdCh0aGluZykgIT09IHRoaW5nO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5UHJpbWl0aXZlKHRoaW5nKSB7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gJ3N0cmluZycpXG4gICAgICAgIHJldHVybiBzdHJpbmdpZnlTdHJpbmcodGhpbmcpO1xuICAgIGlmICh0aGluZyA9PT0gdm9pZCAwKVxuICAgICAgICByZXR1cm4gJ3ZvaWQgMCc7XG4gICAgaWYgKHRoaW5nID09PSAwICYmIDEgLyB0aGluZyA8IDApXG4gICAgICAgIHJldHVybiAnLTAnO1xuICAgIHZhciBzdHIgPSBTdHJpbmcodGhpbmcpO1xuICAgIGlmICh0eXBlb2YgdGhpbmcgPT09ICdudW1iZXInKVxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL14oLSk/MFxcLi8sICckMS4nKTtcbiAgICByZXR1cm4gc3RyO1xufVxuZnVuY3Rpb24gZ2V0VHlwZSh0aGluZykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpbmcpLnNsaWNlKDgsIC0xKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZVVuc2FmZUNoYXIoYykge1xuICAgIHJldHVybiBlc2NhcGVkW2NdIHx8IGM7XG59XG5mdW5jdGlvbiBlc2NhcGVVbnNhZmVDaGFycyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UodW5zYWZlQ2hhcnMsIGVzY2FwZVVuc2FmZUNoYXIpO1xufVxuZnVuY3Rpb24gc2FmZUtleShrZXkpIHtcbiAgICByZXR1cm4gL15bXyRhLXpBLVpdW18kYS16QS1aMC05XSokLy50ZXN0KGtleSkgPyBrZXkgOiBlc2NhcGVVbnNhZmVDaGFycyhKU09OLnN0cmluZ2lmeShrZXkpKTtcbn1cbmZ1bmN0aW9uIHNhZmVQcm9wKGtleSkge1xuICAgIHJldHVybiAvXltfJGEtekEtWl1bXyRhLXpBLVowLTldKiQvLnRlc3Qoa2V5KSA/IFwiLlwiICsga2V5IDogXCJbXCIgKyBlc2NhcGVVbnNhZmVDaGFycyhKU09OLnN0cmluZ2lmeShrZXkpKSArIFwiXVwiO1xufVxuZnVuY3Rpb24gc3RyaW5naWZ5U3RyaW5nKHN0cikge1xuICAgIHZhciByZXN1bHQgPSAnXCInO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHZhciBjaGFyID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgdmFyIGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGlmIChjaGFyID09PSAnXCInKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gJ1xcXFxcIic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhciBpbiBlc2NhcGVkKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gZXNjYXBlZFtjaGFyXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2RlID49IDB4ZDgwMCAmJiBjb2RlIDw9IDB4ZGZmZikge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBzdHIuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBiZWdpbm5pbmcgb2YgYSBbaGlnaCwgbG93XSBzdXJyb2dhdGUgcGFpcixcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgbmV4dCB0d28gY2hhcmFjdGVycywgb3RoZXJ3aXNlIGVzY2FwZVxuICAgICAgICAgICAgaWYgKGNvZGUgPD0gMHhkYmZmICYmIChuZXh0ID49IDB4ZGMwMCAmJiBuZXh0IDw9IDB4ZGZmZikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gY2hhciArIHN0clsrK2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IFwiXFxcXHVcIiArIGNvZGUudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gY2hhcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQgKz0gJ1wiJztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vdG1wdmFyL2pzZG9tL2Jsb2IvYWE4NWIyYWJmMDc3NjZmZjdiZjVjMWY2ZGFhZmIzNzI2ZjJmMmRiNS9saWIvanNkb20vbGl2aW5nL2Jsb2IuanNcblxuLy8gZml4IGZvciBcIlJlYWRhYmxlXCIgaXNuJ3QgYSBuYW1lZCBleHBvcnQgaXNzdWVcbmNvbnN0IFJlYWRhYmxlID0gU3RyZWFtLlJlYWRhYmxlO1xuXG5jb25zdCBCVUZGRVIgPSBTeW1ib2woJ2J1ZmZlcicpO1xuY29uc3QgVFlQRSA9IFN5bWJvbCgndHlwZScpO1xuXG5jbGFzcyBCbG9iIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpc1tUWVBFXSA9ICcnO1xuXG5cdFx0Y29uc3QgYmxvYlBhcnRzID0gYXJndW1lbnRzWzBdO1xuXHRcdGNvbnN0IG9wdGlvbnMgPSBhcmd1bWVudHNbMV07XG5cblx0XHRjb25zdCBidWZmZXJzID0gW107XG5cdFx0bGV0IHNpemUgPSAwO1xuXG5cdFx0aWYgKGJsb2JQYXJ0cykge1xuXHRcdFx0Y29uc3QgYSA9IGJsb2JQYXJ0cztcblx0XHRcdGNvbnN0IGxlbmd0aCA9IE51bWJlcihhLmxlbmd0aCk7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IGVsZW1lbnQgPSBhW2ldO1xuXHRcdFx0XHRsZXQgYnVmZmVyO1xuXHRcdFx0XHRpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IGVsZW1lbnQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGVsZW1lbnQpKSB7XG5cdFx0XHRcdFx0YnVmZmVyID0gQnVmZmVyLmZyb20oZWxlbWVudC5idWZmZXIsIGVsZW1lbnQuYnl0ZU9mZnNldCwgZWxlbWVudC5ieXRlTGVuZ3RoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbShlbGVtZW50KTtcblx0XHRcdFx0fSBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQmxvYikge1xuXHRcdFx0XHRcdGJ1ZmZlciA9IGVsZW1lbnRbQlVGRkVSXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRidWZmZXIgPSBCdWZmZXIuZnJvbSh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgPyBlbGVtZW50IDogU3RyaW5nKGVsZW1lbnQpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzaXplICs9IGJ1ZmZlci5sZW5ndGg7XG5cdFx0XHRcdGJ1ZmZlcnMucHVzaChidWZmZXIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNbQlVGRkVSXSA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycyk7XG5cblx0XHRsZXQgdHlwZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy50eXBlICE9PSB1bmRlZmluZWQgJiYgU3RyaW5nKG9wdGlvbnMudHlwZSkudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAodHlwZSAmJiAhL1teXFx1MDAyMC1cXHUwMDdFXS8udGVzdCh0eXBlKSkge1xuXHRcdFx0dGhpc1tUWVBFXSA9IHR5cGU7XG5cdFx0fVxuXHR9XG5cdGdldCBzaXplKCkge1xuXHRcdHJldHVybiB0aGlzW0JVRkZFUl0ubGVuZ3RoO1xuXHR9XG5cdGdldCB0eXBlKCkge1xuXHRcdHJldHVybiB0aGlzW1RZUEVdO1xuXHR9XG5cdHRleHQoKSB7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzW0JVRkZFUl0udG9TdHJpbmcoKSk7XG5cdH1cblx0YXJyYXlCdWZmZXIoKSB7XG5cdFx0Y29uc3QgYnVmID0gdGhpc1tCVUZGRVJdO1xuXHRcdGNvbnN0IGFiID0gYnVmLmJ1ZmZlci5zbGljZShidWYuYnl0ZU9mZnNldCwgYnVmLmJ5dGVPZmZzZXQgKyBidWYuYnl0ZUxlbmd0aCk7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShhYik7XG5cdH1cblx0c3RyZWFtKCkge1xuXHRcdGNvbnN0IHJlYWRhYmxlID0gbmV3IFJlYWRhYmxlKCk7XG5cdFx0cmVhZGFibGUuX3JlYWQgPSBmdW5jdGlvbiAoKSB7fTtcblx0XHRyZWFkYWJsZS5wdXNoKHRoaXNbQlVGRkVSXSk7XG5cdFx0cmVhZGFibGUucHVzaChudWxsKTtcblx0XHRyZXR1cm4gcmVhZGFibGU7XG5cdH1cblx0dG9TdHJpbmcoKSB7XG5cdFx0cmV0dXJuICdbb2JqZWN0IEJsb2JdJztcblx0fVxuXHRzbGljZSgpIHtcblx0XHRjb25zdCBzaXplID0gdGhpcy5zaXplO1xuXG5cdFx0Y29uc3Qgc3RhcnQgPSBhcmd1bWVudHNbMF07XG5cdFx0Y29uc3QgZW5kID0gYXJndW1lbnRzWzFdO1xuXHRcdGxldCByZWxhdGl2ZVN0YXJ0LCByZWxhdGl2ZUVuZDtcblx0XHRpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmVsYXRpdmVTdGFydCA9IDA7XG5cdFx0fSBlbHNlIGlmIChzdGFydCA8IDApIHtcblx0XHRcdHJlbGF0aXZlU3RhcnQgPSBNYXRoLm1heChzaXplICsgc3RhcnQsIDApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZWxhdGl2ZVN0YXJ0ID0gTWF0aC5taW4oc3RhcnQsIHNpemUpO1xuXHRcdH1cblx0XHRpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gc2l6ZTtcblx0XHR9IGVsc2UgaWYgKGVuZCA8IDApIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gTWF0aC5tYXgoc2l6ZSArIGVuZCwgMCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbGF0aXZlRW5kID0gTWF0aC5taW4oZW5kLCBzaXplKTtcblx0XHR9XG5cdFx0Y29uc3Qgc3BhbiA9IE1hdGgubWF4KHJlbGF0aXZlRW5kIC0gcmVsYXRpdmVTdGFydCwgMCk7XG5cblx0XHRjb25zdCBidWZmZXIgPSB0aGlzW0JVRkZFUl07XG5cdFx0Y29uc3Qgc2xpY2VkQnVmZmVyID0gYnVmZmVyLnNsaWNlKHJlbGF0aXZlU3RhcnQsIHJlbGF0aXZlU3RhcnQgKyBzcGFuKTtcblx0XHRjb25zdCBibG9iID0gbmV3IEJsb2IoW10sIHsgdHlwZTogYXJndW1lbnRzWzJdIH0pO1xuXHRcdGJsb2JbQlVGRkVSXSA9IHNsaWNlZEJ1ZmZlcjtcblx0XHRyZXR1cm4gYmxvYjtcblx0fVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhCbG9iLnByb3RvdHlwZSwge1xuXHRzaXplOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dHlwZTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHNsaWNlOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCbG9iLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnQmxvYicsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogZmV0Y2gtZXJyb3IuanNcbiAqXG4gKiBGZXRjaEVycm9yIGludGVyZmFjZSBmb3Igb3BlcmF0aW9uYWwgZXJyb3JzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgRmV0Y2hFcnJvciBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIG1lc3NhZ2UgICAgICBFcnJvciBtZXNzYWdlIGZvciBodW1hblxuICogQHBhcmFtICAgU3RyaW5nICAgICAgdHlwZSAgICAgICAgIEVycm9yIHR5cGUgZm9yIG1hY2hpbmVcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIHN5c3RlbUVycm9yICBGb3IgTm9kZS5qcyBzeXN0ZW0gZXJyb3JcbiAqIEByZXR1cm4gIEZldGNoRXJyb3JcbiAqL1xuZnVuY3Rpb24gRmV0Y2hFcnJvcihtZXNzYWdlLCB0eXBlLCBzeXN0ZW1FcnJvcikge1xuICBFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UpO1xuXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgLy8gd2hlbiBlcnIudHlwZSBpcyBgc3lzdGVtYCwgZXJyLmNvZGUgY29udGFpbnMgc3lzdGVtIGVycm9yIGNvZGVcbiAgaWYgKHN5c3RlbUVycm9yKSB7XG4gICAgdGhpcy5jb2RlID0gdGhpcy5lcnJubyA9IHN5c3RlbUVycm9yLmNvZGU7XG4gIH1cblxuICAvLyBoaWRlIGN1c3RvbSBlcnJvciBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzIGZyb20gZW5kLXVzZXJzXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xufVxuXG5GZXRjaEVycm9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbkZldGNoRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRmV0Y2hFcnJvcjtcbkZldGNoRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnRmV0Y2hFcnJvcic7XG5cbmxldCBjb252ZXJ0O1xudHJ5IHtcblx0Y29udmVydCA9IHJlcXVpcmUoJ2VuY29kaW5nJykuY29udmVydDtcbn0gY2F0Y2ggKGUpIHt9XG5cbmNvbnN0IElOVEVSTkFMUyA9IFN5bWJvbCgnQm9keSBpbnRlcm5hbHMnKTtcblxuLy8gZml4IGFuIGlzc3VlIHdoZXJlIFwiUGFzc1Rocm91Z2hcIiBpc24ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IFBhc3NUaHJvdWdoID0gU3RyZWFtLlBhc3NUaHJvdWdoO1xuXG4vKipcbiAqIEJvZHkgbWl4aW5cbiAqXG4gKiBSZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNib2R5XG4gKlxuICogQHBhcmFtICAgU3RyZWFtICBib2R5ICBSZWFkYWJsZSBzdHJlYW1cbiAqIEBwYXJhbSAgIE9iamVjdCAgb3B0cyAgUmVzcG9uc2Ugb3B0aW9uc1xuICogQHJldHVybiAgVm9pZFxuICovXG5mdW5jdGlvbiBCb2R5KGJvZHkpIHtcblx0dmFyIF90aGlzID0gdGhpcztcblxuXHR2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge30sXG5cdCAgICBfcmVmJHNpemUgPSBfcmVmLnNpemU7XG5cblx0bGV0IHNpemUgPSBfcmVmJHNpemUgPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHNpemU7XG5cdHZhciBfcmVmJHRpbWVvdXQgPSBfcmVmLnRpbWVvdXQ7XG5cdGxldCB0aW1lb3V0ID0gX3JlZiR0aW1lb3V0ID09PSB1bmRlZmluZWQgPyAwIDogX3JlZiR0aW1lb3V0O1xuXG5cdGlmIChib2R5ID09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIHVuZGVmaW5lZCBvciBudWxsXG5cdFx0Ym9keSA9IG51bGw7XG5cdH0gZWxzZSBpZiAoaXNVUkxTZWFyY2hQYXJhbXMoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGEgVVJMU2VhcmNoUGFyYW1zXG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkudG9TdHJpbmcoKSk7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSA7IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcihib2R5KSkgOyBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyXG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkpO1xuXHR9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJWaWV3XG5cdFx0Ym9keSA9IEJ1ZmZlci5mcm9tKGJvZHkuYnVmZmVyLCBib2R5LmJ5dGVPZmZzZXQsIGJvZHkuYnl0ZUxlbmd0aCk7XG5cdH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkgOyBlbHNlIHtcblx0XHQvLyBub25lIG9mIHRoZSBhYm92ZVxuXHRcdC8vIGNvZXJjZSB0byBzdHJpbmcgdGhlbiBidWZmZXJcblx0XHRib2R5ID0gQnVmZmVyLmZyb20oU3RyaW5nKGJvZHkpKTtcblx0fVxuXHR0aGlzW0lOVEVSTkFMU10gPSB7XG5cdFx0Ym9keSxcblx0XHRkaXN0dXJiZWQ6IGZhbHNlLFxuXHRcdGVycm9yOiBudWxsXG5cdH07XG5cdHRoaXMuc2l6ZSA9IHNpemU7XG5cdHRoaXMudGltZW91dCA9IHRpbWVvdXQ7XG5cblx0aWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0pIHtcblx0XHRib2R5Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdGNvbnN0IGVycm9yID0gZXJyLm5hbWUgPT09ICdBYm9ydEVycm9yJyA/IGVyciA6IG5ldyBGZXRjaEVycm9yKGBJbnZhbGlkIHJlc3BvbnNlIGJvZHkgd2hpbGUgdHJ5aW5nIHRvIGZldGNoICR7X3RoaXMudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKTtcblx0XHRcdF90aGlzW0lOVEVSTkFMU10uZXJyb3IgPSBlcnJvcjtcblx0XHR9KTtcblx0fVxufVxuXG5Cb2R5LnByb3RvdHlwZSA9IHtcblx0Z2V0IGJvZHkoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTXS5ib2R5O1xuXHR9LFxuXG5cdGdldCBib2R5VXNlZCgpIHtcblx0XHRyZXR1cm4gdGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZDtcblx0fSxcblxuXHQvKipcbiAgKiBEZWNvZGUgcmVzcG9uc2UgYXMgQXJyYXlCdWZmZXJcbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0YXJyYXlCdWZmZXIoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmKSB7XG5cdFx0XHRyZXR1cm4gYnVmLmJ1ZmZlci5zbGljZShidWYuYnl0ZU9mZnNldCwgYnVmLmJ5dGVPZmZzZXQgKyBidWYuYnl0ZUxlbmd0aCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogUmV0dXJuIHJhdyByZXNwb25zZSBhcyBCbG9iXG4gICpcbiAgKiBAcmV0dXJuIFByb21pc2VcbiAgKi9cblx0YmxvYigpIHtcblx0XHRsZXQgY3QgPSB0aGlzLmhlYWRlcnMgJiYgdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJyc7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmKSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdC8vIFByZXZlbnQgY29weWluZ1xuXHRcdFx0bmV3IEJsb2IoW10sIHtcblx0XHRcdFx0dHlwZTogY3QudG9Mb3dlckNhc2UoKVxuXHRcdFx0fSksIHtcblx0XHRcdFx0W0JVRkZFUl06IGJ1ZlxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIGpzb25cbiAgKlxuICAqIEByZXR1cm4gIFByb21pc2VcbiAgKi9cblx0anNvbigpIHtcblx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdHJldHVybiBjb25zdW1lQm9keS5jYWxsKHRoaXMpLnRoZW4oZnVuY3Rpb24gKGJ1ZmZlcikge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoYnVmZmVyLnRvU3RyaW5nKCkpO1xuXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdHJldHVybiBCb2R5LlByb21pc2UucmVqZWN0KG5ldyBGZXRjaEVycm9yKGBpbnZhbGlkIGpzb24gcmVzcG9uc2UgYm9keSBhdCAke190aGlzMi51cmx9IHJlYXNvbjogJHtlcnIubWVzc2FnZX1gLCAnaW52YWxpZC1qc29uJykpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdC8qKlxuICAqIERlY29kZSByZXNwb25zZSBhcyB0ZXh0XG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdHRleHQoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcykudGhlbihmdW5jdGlvbiAoYnVmZmVyKSB7XG5cdFx0XHRyZXR1cm4gYnVmZmVyLnRvU3RyaW5nKCk7XG5cdFx0fSk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIGJ1ZmZlciAobm9uLXNwZWMgYXBpKVxuICAqXG4gICogQHJldHVybiAgUHJvbWlzZVxuICAqL1xuXHRidWZmZXIoKSB7XG5cdFx0cmV0dXJuIGNvbnN1bWVCb2R5LmNhbGwodGhpcyk7XG5cdH0sXG5cblx0LyoqXG4gICogRGVjb2RlIHJlc3BvbnNlIGFzIHRleHQsIHdoaWxlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0aW5nIHRoZSBlbmNvZGluZyBhbmRcbiAgKiB0cnlpbmcgdG8gZGVjb2RlIHRvIFVURi04IChub24tc3BlYyBhcGkpXG4gICpcbiAgKiBAcmV0dXJuICBQcm9taXNlXG4gICovXG5cdHRleHRDb252ZXJ0ZWQoKSB7XG5cdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRyZXR1cm4gY29uc3VtZUJvZHkuY2FsbCh0aGlzKS50aGVuKGZ1bmN0aW9uIChidWZmZXIpIHtcblx0XHRcdHJldHVybiBjb252ZXJ0Qm9keShidWZmZXIsIF90aGlzMy5oZWFkZXJzKTtcblx0XHR9KTtcblx0fVxufTtcblxuLy8gSW4gYnJvd3NlcnMsIGFsbCBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhYmxlLlxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQm9keS5wcm90b3R5cGUsIHtcblx0Ym9keTogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGJvZHlVc2VkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0YXJyYXlCdWZmZXI6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRibG9iOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0anNvbjogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHRleHQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9XG59KTtcblxuQm9keS5taXhJbiA9IGZ1bmN0aW9uIChwcm90bykge1xuXHRmb3IgKGNvbnN0IG5hbWUgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoQm9keS5wcm90b3R5cGUpKSB7XG5cdFx0Ly8gaXN0YW5idWwgaWdub3JlIGVsc2U6IGZ1dHVyZSBwcm9vZlxuXHRcdGlmICghKG5hbWUgaW4gcHJvdG8pKSB7XG5cdFx0XHRjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihCb2R5LnByb3RvdHlwZSwgbmFtZSk7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIG5hbWUsIGRlc2MpO1xuXHRcdH1cblx0fVxufTtcblxuLyoqXG4gKiBDb25zdW1lIGFuZCBjb252ZXJ0IGFuIGVudGlyZSBCb2R5IHRvIGEgQnVmZmVyLlxuICpcbiAqIFJlZjogaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI2NvbmNlcHQtYm9keS1jb25zdW1lLWJvZHlcbiAqXG4gKiBAcmV0dXJuICBQcm9taXNlXG4gKi9cbmZ1bmN0aW9uIGNvbnN1bWVCb2R5KCkge1xuXHR2YXIgX3RoaXM0ID0gdGhpcztcblxuXHRpZiAodGhpc1tJTlRFUk5BTFNdLmRpc3R1cmJlZCkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoYGJvZHkgdXNlZCBhbHJlYWR5IGZvcjogJHt0aGlzLnVybH1gKSk7XG5cdH1cblxuXHR0aGlzW0lOVEVSTkFMU10uZGlzdHVyYmVkID0gdHJ1ZTtcblxuXHRpZiAodGhpc1tJTlRFUk5BTFNdLmVycm9yKSB7XG5cdFx0cmV0dXJuIEJvZHkuUHJvbWlzZS5yZWplY3QodGhpc1tJTlRFUk5BTFNdLmVycm9yKTtcblx0fVxuXG5cdGxldCBib2R5ID0gdGhpcy5ib2R5O1xuXG5cdC8vIGJvZHkgaXMgbnVsbFxuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdHJldHVybiBCb2R5LlByb21pc2UucmVzb2x2ZShCdWZmZXIuYWxsb2MoMCkpO1xuXHR9XG5cblx0Ly8gYm9keSBpcyBibG9iXG5cdGlmIChpc0Jsb2IoYm9keSkpIHtcblx0XHRib2R5ID0gYm9keS5zdHJlYW0oKTtcblx0fVxuXG5cdC8vIGJvZHkgaXMgYnVmZmVyXG5cdGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoYm9keSk7XG5cdH1cblxuXHQvLyBpc3RhbmJ1bCBpZ25vcmUgaWY6IHNob3VsZCBuZXZlciBoYXBwZW5cblx0aWYgKCEoYm9keSBpbnN0YW5jZW9mIFN0cmVhbSkpIHtcblx0XHRyZXR1cm4gQm9keS5Qcm9taXNlLnJlc29sdmUoQnVmZmVyLmFsbG9jKDApKTtcblx0fVxuXG5cdC8vIGJvZHkgaXMgc3RyZWFtXG5cdC8vIGdldCByZWFkeSB0byBhY3R1YWxseSBjb25zdW1lIHRoZSBib2R5XG5cdGxldCBhY2N1bSA9IFtdO1xuXHRsZXQgYWNjdW1CeXRlcyA9IDA7XG5cdGxldCBhYm9ydCA9IGZhbHNlO1xuXG5cdHJldHVybiBuZXcgQm9keS5Qcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0XHRsZXQgcmVzVGltZW91dDtcblxuXHRcdC8vIGFsbG93IHRpbWVvdXQgb24gc2xvdyByZXNwb25zZSBib2R5XG5cdFx0aWYgKF90aGlzNC50aW1lb3V0KSB7XG5cdFx0XHRyZXNUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGFib3J0ID0gdHJ1ZTtcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBSZXNwb25zZSB0aW1lb3V0IHdoaWxlIHRyeWluZyB0byBmZXRjaCAke190aGlzNC51cmx9IChvdmVyICR7X3RoaXM0LnRpbWVvdXR9bXMpYCwgJ2JvZHktdGltZW91dCcpKTtcblx0XHRcdH0sIF90aGlzNC50aW1lb3V0KTtcblx0XHR9XG5cblx0XHQvLyBoYW5kbGUgc3RyZWFtIGVycm9yc1xuXHRcdGJvZHkub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuXHRcdFx0aWYgKGVyci5uYW1lID09PSAnQWJvcnRFcnJvcicpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIHJlcXVlc3Qgd2FzIGFib3J0ZWQsIHJlamVjdCB3aXRoIHRoaXMgRXJyb3Jcblx0XHRcdFx0YWJvcnQgPSB0cnVlO1xuXHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIG90aGVyIGVycm9ycywgc3VjaCBhcyBpbmNvcnJlY3QgY29udGVudC1lbmNvZGluZ1xuXHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYEludmFsaWQgcmVzcG9uc2UgYm9keSB3aGlsZSB0cnlpbmcgdG8gZmV0Y2ggJHtfdGhpczQudXJsfTogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRib2R5Lm9uKCdkYXRhJywgZnVuY3Rpb24gKGNodW5rKSB7XG5cdFx0XHRpZiAoYWJvcnQgfHwgY2h1bmsgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3RoaXM0LnNpemUgJiYgYWNjdW1CeXRlcyArIGNodW5rLmxlbmd0aCA+IF90aGlzNC5zaXplKSB7XG5cdFx0XHRcdGFib3J0ID0gdHJ1ZTtcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBjb250ZW50IHNpemUgYXQgJHtfdGhpczQudXJsfSBvdmVyIGxpbWl0OiAke190aGlzNC5zaXplfWAsICdtYXgtc2l6ZScpKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRhY2N1bUJ5dGVzICs9IGNodW5rLmxlbmd0aDtcblx0XHRcdGFjY3VtLnB1c2goY2h1bmspO1xuXHRcdH0pO1xuXG5cdFx0Ym9keS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGFib3J0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y2xlYXJUaW1lb3V0KHJlc1RpbWVvdXQpO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRyZXNvbHZlKEJ1ZmZlci5jb25jYXQoYWNjdW0sIGFjY3VtQnl0ZXMpKTtcblx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHQvLyBoYW5kbGUgc3RyZWFtcyB0aGF0IGhhdmUgYWNjdW11bGF0ZWQgdG9vIG11Y2ggZGF0YSAoaXNzdWUgIzQxNClcblx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBDb3VsZCBub3QgY3JlYXRlIEJ1ZmZlciBmcm9tIHJlc3BvbnNlIGJvZHkgZm9yICR7X3RoaXM0LnVybH06ICR7ZXJyLm1lc3NhZ2V9YCwgJ3N5c3RlbScsIGVycikpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgYnVmZmVyIGVuY29kaW5nIGFuZCBjb252ZXJ0IHRvIHRhcmdldCBlbmNvZGluZ1xuICogcmVmOiBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDExL1dELWh0bWw1LTIwMTEwMTEzL3BhcnNpbmcuaHRtbCNkZXRlcm1pbmluZy10aGUtY2hhcmFjdGVyLWVuY29kaW5nXG4gKlxuICogQHBhcmFtICAgQnVmZmVyICBidWZmZXIgICAgSW5jb21pbmcgYnVmZmVyXG4gKiBAcGFyYW0gICBTdHJpbmcgIGVuY29kaW5nICBUYXJnZXQgZW5jb2RpbmdcbiAqIEByZXR1cm4gIFN0cmluZ1xuICovXG5mdW5jdGlvbiBjb252ZXJ0Qm9keShidWZmZXIsIGhlYWRlcnMpIHtcblx0aWYgKHR5cGVvZiBjb252ZXJ0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGUgcGFja2FnZSBgZW5jb2RpbmdgIG11c3QgYmUgaW5zdGFsbGVkIHRvIHVzZSB0aGUgdGV4dENvbnZlcnRlZCgpIGZ1bmN0aW9uJyk7XG5cdH1cblxuXHRjb25zdCBjdCA9IGhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcblx0bGV0IGNoYXJzZXQgPSAndXRmLTgnO1xuXHRsZXQgcmVzLCBzdHI7XG5cblx0Ly8gaGVhZGVyXG5cdGlmIChjdCkge1xuXHRcdHJlcyA9IC9jaGFyc2V0PShbXjtdKikvaS5leGVjKGN0KTtcblx0fVxuXG5cdC8vIG5vIGNoYXJzZXQgaW4gY29udGVudCB0eXBlLCBwZWVrIGF0IHJlc3BvbnNlIGJvZHkgZm9yIGF0IG1vc3QgMTAyNCBieXRlc1xuXHRzdHIgPSBidWZmZXIuc2xpY2UoMCwgMTAyNCkudG9TdHJpbmcoKTtcblxuXHQvLyBodG1sNVxuXHRpZiAoIXJlcyAmJiBzdHIpIHtcblx0XHRyZXMgPSAvPG1ldGEuKz9jaGFyc2V0PShbJ1wiXSkoLis/KVxcMS9pLmV4ZWMoc3RyKTtcblx0fVxuXG5cdC8vIGh0bWw0XG5cdGlmICghcmVzICYmIHN0cikge1xuXHRcdHJlcyA9IC88bWV0YVtcXHNdKz9odHRwLWVxdWl2PShbJ1wiXSljb250ZW50LXR5cGVcXDFbXFxzXSs/Y29udGVudD0oWydcIl0pKC4rPylcXDIvaS5leGVjKHN0cik7XG5cdFx0aWYgKCFyZXMpIHtcblx0XHRcdHJlcyA9IC88bWV0YVtcXHNdKz9jb250ZW50PShbJ1wiXSkoLis/KVxcMVtcXHNdKz9odHRwLWVxdWl2PShbJ1wiXSljb250ZW50LXR5cGVcXDMvaS5leGVjKHN0cik7XG5cdFx0XHRpZiAocmVzKSB7XG5cdFx0XHRcdHJlcy5wb3AoKTsgLy8gZHJvcCBsYXN0IHF1b3RlXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHJlcykge1xuXHRcdFx0cmVzID0gL2NoYXJzZXQ9KC4qKS9pLmV4ZWMocmVzLnBvcCgpKTtcblx0XHR9XG5cdH1cblxuXHQvLyB4bWxcblx0aWYgKCFyZXMgJiYgc3RyKSB7XG5cdFx0cmVzID0gLzxcXD94bWwuKz9lbmNvZGluZz0oWydcIl0pKC4rPylcXDEvaS5leGVjKHN0cik7XG5cdH1cblxuXHQvLyBmb3VuZCBjaGFyc2V0XG5cdGlmIChyZXMpIHtcblx0XHRjaGFyc2V0ID0gcmVzLnBvcCgpO1xuXG5cdFx0Ly8gcHJldmVudCBkZWNvZGUgaXNzdWVzIHdoZW4gc2l0ZXMgdXNlIGluY29ycmVjdCBlbmNvZGluZ1xuXHRcdC8vIHJlZjogaHR0cHM6Ly9oc2l2b25lbi5maS9lbmNvZGluZy1tZW51L1xuXHRcdGlmIChjaGFyc2V0ID09PSAnZ2IyMzEyJyB8fCBjaGFyc2V0ID09PSAnZ2JrJykge1xuXHRcdFx0Y2hhcnNldCA9ICdnYjE4MDMwJztcblx0XHR9XG5cdH1cblxuXHQvLyB0dXJuIHJhdyBidWZmZXJzIGludG8gYSBzaW5nbGUgdXRmLTggYnVmZmVyXG5cdHJldHVybiBjb252ZXJ0KGJ1ZmZlciwgJ1VURi04JywgY2hhcnNldCkudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKiByZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9iaXRpbm4vbm9kZS1mZXRjaC9pc3N1ZXMvMjk2I2lzc3VlY29tbWVudC0zMDc1OTgxNDNcbiAqXG4gKiBAcGFyYW0gICBPYmplY3QgIG9iaiAgICAgT2JqZWN0IHRvIGRldGVjdCBieSB0eXBlIG9yIGJyYW5kXG4gKiBAcmV0dXJuICBTdHJpbmdcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXMob2JqKSB7XG5cdC8vIER1Y2stdHlwaW5nIGFzIGEgbmVjZXNzYXJ5IGNvbmRpdGlvbi5cblx0aWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmouYXBwZW5kICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZGVsZXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouZ2V0QWxsICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouaGFzICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBvYmouc2V0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gQnJhbmQtY2hlY2tpbmcgYW5kIG1vcmUgZHVjay10eXBpbmcgYXMgb3B0aW9uYWwgY29uZGl0aW9uLlxuXHRyZXR1cm4gb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdVUkxTZWFyY2hQYXJhbXMnIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBVUkxTZWFyY2hQYXJhbXNdJyB8fCB0eXBlb2Ygb2JqLnNvcnQgPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBXM0MgYEJsb2JgIG9iamVjdCAod2hpY2ggYEZpbGVgIGluaGVyaXRzIGZyb20pXG4gKiBAcGFyYW0gIHsqfSBvYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQmxvYihvYmopIHtcblx0cmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmouYXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai50eXBlID09PSAnc3RyaW5nJyAmJiB0eXBlb2Ygb2JqLnN0cmVhbSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycgJiYgL14oQmxvYnxGaWxlKSQvLnRlc3Qob2JqLmNvbnN0cnVjdG9yLm5hbWUpICYmIC9eKEJsb2J8RmlsZSkkLy50ZXN0KG9ialtTeW1ib2wudG9TdHJpbmdUYWddKTtcbn1cblxuLyoqXG4gKiBDbG9uZSBib2R5IGdpdmVuIFJlcy9SZXEgaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgaW5zdGFuY2UgIFJlc3BvbnNlIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEByZXR1cm4gIE1peGVkXG4gKi9cbmZ1bmN0aW9uIGNsb25lKGluc3RhbmNlKSB7XG5cdGxldCBwMSwgcDI7XG5cdGxldCBib2R5ID0gaW5zdGFuY2UuYm9keTtcblxuXHQvLyBkb24ndCBhbGxvdyBjbG9uaW5nIGEgdXNlZCBib2R5XG5cdGlmIChpbnN0YW5jZS5ib2R5VXNlZCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignY2Fubm90IGNsb25lIGJvZHkgYWZ0ZXIgaXQgaXMgdXNlZCcpO1xuXHR9XG5cblx0Ly8gY2hlY2sgdGhhdCBib2R5IGlzIGEgc3RyZWFtIGFuZCBub3QgZm9ybS1kYXRhIG9iamVjdFxuXHQvLyBub3RlOiB3ZSBjYW4ndCBjbG9uZSB0aGUgZm9ybS1kYXRhIG9iamVjdCB3aXRob3V0IGhhdmluZyBpdCBhcyBhIGRlcGVuZGVuY3lcblx0aWYgKGJvZHkgaW5zdGFuY2VvZiBTdHJlYW0gJiYgdHlwZW9mIGJvZHkuZ2V0Qm91bmRhcnkgIT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyB0ZWUgaW5zdGFuY2UgYm9keVxuXHRcdHAxID0gbmV3IFBhc3NUaHJvdWdoKCk7XG5cdFx0cDIgPSBuZXcgUGFzc1Rocm91Z2goKTtcblx0XHRib2R5LnBpcGUocDEpO1xuXHRcdGJvZHkucGlwZShwMik7XG5cdFx0Ly8gc2V0IGluc3RhbmNlIGJvZHkgdG8gdGVlZCBib2R5IGFuZCByZXR1cm4gdGhlIG90aGVyIHRlZWQgYm9keVxuXHRcdGluc3RhbmNlW0lOVEVSTkFMU10uYm9keSA9IHAxO1xuXHRcdGJvZHkgPSBwMjtcblx0fVxuXG5cdHJldHVybiBib2R5O1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIHRoZSBvcGVyYXRpb24gXCJleHRyYWN0IGEgYENvbnRlbnQtVHlwZWAgdmFsdWUgZnJvbSB8b2JqZWN0fFwiIGFzXG4gKiBzcGVjaWZpZWQgaW4gdGhlIHNwZWNpZmljYXRpb246XG4gKiBodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jY29uY2VwdC1ib2R5aW5pdC1leHRyYWN0XG4gKlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgaW5zdGFuY2UuYm9keSBpcyBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSAgIE1peGVkICBpbnN0YW5jZSAgQW55IG9wdGlvbnMuYm9keSBpbnB1dFxuICovXG5mdW5jdGlvbiBleHRyYWN0Q29udGVudFR5cGUoYm9keSkge1xuXHRpZiAoYm9keSA9PT0gbnVsbCkge1xuXHRcdC8vIGJvZHkgaXMgbnVsbFxuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuXHRcdC8vIGJvZHkgaXMgc3RyaW5nXG5cdFx0cmV0dXJuICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnO1xuXHR9IGVsc2UgaWYgKGlzVVJMU2VhcmNoUGFyYW1zKGJvZHkpKSB7XG5cdFx0Ly8gYm9keSBpcyBhIFVSTFNlYXJjaFBhcmFtc1xuXHRcdHJldHVybiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdC8vIGJvZHkgaXMgYmxvYlxuXHRcdHJldHVybiBib2R5LnR5cGUgfHwgbnVsbDtcblx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJ1ZmZlclxuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuXHRcdC8vIGJvZHkgaXMgQXJyYXlCdWZmZXJcblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIEFycmF5QnVmZmVyVmlld1xuXHRcdHJldHVybiBudWxsO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBib2R5LmdldEJvdW5kYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gZGV0ZWN0IGZvcm0gZGF0YSBpbnB1dCBmcm9tIGZvcm0tZGF0YSBtb2R1bGVcblx0XHRyZXR1cm4gYG11bHRpcGFydC9mb3JtLWRhdGE7Ym91bmRhcnk9JHtib2R5LmdldEJvdW5kYXJ5KCl9YDtcblx0fSBlbHNlIGlmIChib2R5IGluc3RhbmNlb2YgU3RyZWFtKSB7XG5cdFx0Ly8gYm9keSBpcyBzdHJlYW1cblx0XHQvLyBjYW4ndCByZWFsbHkgZG8gbXVjaCBhYm91dCB0aGlzXG5cdFx0cmV0dXJuIG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQm9keSBjb25zdHJ1Y3RvciBkZWZhdWx0cyBvdGhlciB0aGluZ3MgdG8gc3RyaW5nXG5cdFx0cmV0dXJuICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnO1xuXHR9XG59XG5cbi8qKlxuICogVGhlIEZldGNoIFN0YW5kYXJkIHRyZWF0cyB0aGlzIGFzIGlmIFwidG90YWwgYnl0ZXNcIiBpcyBhIHByb3BlcnR5IG9uIHRoZSBib2R5LlxuICogRm9yIHVzLCB3ZSBoYXZlIHRvIGV4cGxpY2l0bHkgZ2V0IGl0IHdpdGggYSBmdW5jdGlvbi5cbiAqXG4gKiByZWY6IGh0dHBzOi8vZmV0Y2guc3BlYy53aGF0d2cub3JnLyNjb25jZXB0LWJvZHktdG90YWwtYnl0ZXNcbiAqXG4gKiBAcGFyYW0gICBCb2R5ICAgIGluc3RhbmNlICAgSW5zdGFuY2Ugb2YgQm9keVxuICogQHJldHVybiAgTnVtYmVyPyAgICAgICAgICAgIE51bWJlciBvZiBieXRlcywgb3IgbnVsbCBpZiBub3QgcG9zc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0VG90YWxCeXRlcyhpbnN0YW5jZSkge1xuXHRjb25zdCBib2R5ID0gaW5zdGFuY2UuYm9keTtcblxuXG5cdGlmIChib2R5ID09PSBudWxsKSB7XG5cdFx0Ly8gYm9keSBpcyBudWxsXG5cdFx0cmV0dXJuIDA7XG5cdH0gZWxzZSBpZiAoaXNCbG9iKGJvZHkpKSB7XG5cdFx0cmV0dXJuIGJvZHkuc2l6ZTtcblx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJ1ZmZlclxuXHRcdHJldHVybiBib2R5Lmxlbmd0aDtcblx0fSBlbHNlIGlmIChib2R5ICYmIHR5cGVvZiBib2R5LmdldExlbmd0aFN5bmMgPT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBkZXRlY3QgZm9ybSBkYXRhIGlucHV0IGZyb20gZm9ybS1kYXRhIG1vZHVsZVxuXHRcdGlmIChib2R5Ll9sZW5ndGhSZXRyaWV2ZXJzICYmIGJvZHkuX2xlbmd0aFJldHJpZXZlcnMubGVuZ3RoID09IDAgfHwgLy8gMS54XG5cdFx0Ym9keS5oYXNLbm93bkxlbmd0aCAmJiBib2R5Lmhhc0tub3duTGVuZ3RoKCkpIHtcblx0XHRcdC8vIDIueFxuXHRcdFx0cmV0dXJuIGJvZHkuZ2V0TGVuZ3RoU3luYygpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fSBlbHNlIHtcblx0XHQvLyBib2R5IGlzIHN0cmVhbVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cbi8qKlxuICogV3JpdGUgYSBCb2R5IHRvIGEgTm9kZS5qcyBXcml0YWJsZVN0cmVhbSAoZS5nLiBodHRwLlJlcXVlc3QpIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gICBCb2R5ICAgIGluc3RhbmNlICAgSW5zdGFuY2Ugb2YgQm9keVxuICogQHJldHVybiAgVm9pZFxuICovXG5mdW5jdGlvbiB3cml0ZVRvU3RyZWFtKGRlc3QsIGluc3RhbmNlKSB7XG5cdGNvbnN0IGJvZHkgPSBpbnN0YW5jZS5ib2R5O1xuXG5cblx0aWYgKGJvZHkgPT09IG51bGwpIHtcblx0XHQvLyBib2R5IGlzIG51bGxcblx0XHRkZXN0LmVuZCgpO1xuXHR9IGVsc2UgaWYgKGlzQmxvYihib2R5KSkge1xuXHRcdGJvZHkuc3RyZWFtKCkucGlwZShkZXN0KTtcblx0fSBlbHNlIGlmIChCdWZmZXIuaXNCdWZmZXIoYm9keSkpIHtcblx0XHQvLyBib2R5IGlzIGJ1ZmZlclxuXHRcdGRlc3Qud3JpdGUoYm9keSk7XG5cdFx0ZGVzdC5lbmQoKTtcblx0fSBlbHNlIHtcblx0XHQvLyBib2R5IGlzIHN0cmVhbVxuXHRcdGJvZHkucGlwZShkZXN0KTtcblx0fVxufVxuXG4vLyBleHBvc2UgUHJvbWlzZVxuQm9keS5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5cbi8qKlxuICogaGVhZGVycy5qc1xuICpcbiAqIEhlYWRlcnMgY2xhc3Mgb2ZmZXJzIGNvbnZlbmllbnQgaGVscGVyc1xuICovXG5cbmNvbnN0IGludmFsaWRUb2tlblJlZ2V4ID0gL1teXFxeX2BhLXpBLVpcXC0wLTkhIyQlJicqKy58fl0vO1xuY29uc3QgaW52YWxpZEhlYWRlckNoYXJSZWdleCA9IC9bXlxcdFxceDIwLVxceDdlXFx4ODAtXFx4ZmZdLztcblxuZnVuY3Rpb24gdmFsaWRhdGVOYW1lKG5hbWUpIHtcblx0bmFtZSA9IGAke25hbWV9YDtcblx0aWYgKGludmFsaWRUb2tlblJlZ2V4LnRlc3QobmFtZSkgfHwgbmFtZSA9PT0gJycpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGAke25hbWV9IGlzIG5vdCBhIGxlZ2FsIEhUVFAgaGVhZGVyIG5hbWVgKTtcblx0fVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVZhbHVlKHZhbHVlKSB7XG5cdHZhbHVlID0gYCR7dmFsdWV9YDtcblx0aWYgKGludmFsaWRIZWFkZXJDaGFyUmVnZXgudGVzdCh2YWx1ZSkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGAke3ZhbHVlfSBpcyBub3QgYSBsZWdhbCBIVFRQIGhlYWRlciB2YWx1ZWApO1xuXHR9XG59XG5cbi8qKlxuICogRmluZCB0aGUga2V5IGluIHRoZSBtYXAgb2JqZWN0IGdpdmVuIGEgaGVhZGVyIG5hbWUuXG4gKlxuICogUmV0dXJucyB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgSGVhZGVyIG5hbWVcbiAqIEByZXR1cm4gIFN0cmluZ3xVbmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gZmluZChtYXAsIG5hbWUpIHtcblx0bmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0Zm9yIChjb25zdCBrZXkgaW4gbWFwKSB7XG5cdFx0aWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSBuYW1lKSB7XG5cdFx0XHRyZXR1cm4ga2V5O1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5jb25zdCBNQVAgPSBTeW1ib2woJ21hcCcpO1xuY2xhc3MgSGVhZGVycyB7XG5cdC8qKlxuICAqIEhlYWRlcnMgY2xhc3NcbiAgKlxuICAqIEBwYXJhbSAgIE9iamVjdCAgaGVhZGVycyAgUmVzcG9uc2UgaGVhZGVyc1xuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0bGV0IGluaXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZDtcblxuXHRcdHRoaXNbTUFQXSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0XHRpZiAoaW5pdCBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcblx0XHRcdGNvbnN0IHJhd0hlYWRlcnMgPSBpbml0LnJhdygpO1xuXHRcdFx0Y29uc3QgaGVhZGVyTmFtZXMgPSBPYmplY3Qua2V5cyhyYXdIZWFkZXJzKTtcblxuXHRcdFx0Zm9yIChjb25zdCBoZWFkZXJOYW1lIG9mIGhlYWRlck5hbWVzKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgdmFsdWUgb2YgcmF3SGVhZGVyc1toZWFkZXJOYW1lXSkge1xuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKGhlYWRlck5hbWUsIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gV2UgZG9uJ3Qgd29ycnkgYWJvdXQgY29udmVydGluZyBwcm9wIHRvIEJ5dGVTdHJpbmcgaGVyZSBhcyBhcHBlbmQoKVxuXHRcdC8vIHdpbGwgaGFuZGxlIGl0LlxuXHRcdGlmIChpbml0ID09IG51bGwpIDsgZWxzZSBpZiAodHlwZW9mIGluaXQgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRjb25zdCBtZXRob2QgPSBpbml0W1N5bWJvbC5pdGVyYXRvcl07XG5cdFx0XHRpZiAobWV0aG9kICE9IG51bGwpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdIZWFkZXIgcGFpcnMgbXVzdCBiZSBpdGVyYWJsZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gc2VxdWVuY2U8c2VxdWVuY2U8Qnl0ZVN0cmluZz4+XG5cdFx0XHRcdC8vIE5vdGU6IHBlciBzcGVjIHdlIGhhdmUgdG8gZmlyc3QgZXhoYXVzdCB0aGUgbGlzdHMgdGhlbiBwcm9jZXNzIHRoZW1cblx0XHRcdFx0Y29uc3QgcGFpcnMgPSBbXTtcblx0XHRcdFx0Zm9yIChjb25zdCBwYWlyIG9mIGluaXQpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHBhaXIgIT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYWlyW1N5bWJvbC5pdGVyYXRvcl0gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0VhY2ggaGVhZGVyIHBhaXIgbXVzdCBiZSBpdGVyYWJsZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwYWlycy5wdXNoKEFycmF5LmZyb20ocGFpcikpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yIChjb25zdCBwYWlyIG9mIHBhaXJzKSB7XG5cdFx0XHRcdFx0aWYgKHBhaXIubGVuZ3RoICE9PSAyKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFYWNoIGhlYWRlciBwYWlyIG11c3QgYmUgYSBuYW1lL3ZhbHVlIHR1cGxlJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kKHBhaXJbMF0sIHBhaXJbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyByZWNvcmQ8Qnl0ZVN0cmluZywgQnl0ZVN0cmluZz5cblx0XHRcdFx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoaW5pdCkpIHtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZSA9IGluaXRba2V5XTtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZChrZXksIHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm92aWRlZCBpbml0aWFsaXplciBtdXN0IGJlIGFuIG9iamVjdCcpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIFJldHVybiBjb21iaW5lZCBoZWFkZXIgdmFsdWUgZ2l2ZW4gbmFtZVxuICAqXG4gICogQHBhcmFtICAgU3RyaW5nICBuYW1lICBIZWFkZXIgbmFtZVxuICAqIEByZXR1cm4gIE1peGVkXG4gICovXG5cdGdldChuYW1lKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0Y29uc3Qga2V5ID0gZmluZCh0aGlzW01BUF0sIG5hbWUpO1xuXHRcdGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXNbTUFQXVtrZXldLmpvaW4oJywgJyk7XG5cdH1cblxuXHQvKipcbiAgKiBJdGVyYXRlIG92ZXIgYWxsIGhlYWRlcnNcbiAgKlxuICAqIEBwYXJhbSAgIEZ1bmN0aW9uICBjYWxsYmFjayAgRXhlY3V0ZWQgZm9yIGVhY2ggaXRlbSB3aXRoIHBhcmFtZXRlcnMgKHZhbHVlLCBuYW1lLCB0aGlzQXJnKVxuICAqIEBwYXJhbSAgIEJvb2xlYW4gICB0aGlzQXJnICAgYHRoaXNgIGNvbnRleHQgZm9yIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRmb3JFYWNoKGNhbGxiYWNrKSB7XG5cdFx0bGV0IHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcblxuXHRcdGxldCBwYWlycyA9IGdldEhlYWRlcnModGhpcyk7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdHdoaWxlIChpIDwgcGFpcnMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgX3BhaXJzJGkgPSBwYWlyc1tpXTtcblx0XHRcdGNvbnN0IG5hbWUgPSBfcGFpcnMkaVswXSxcblx0XHRcdCAgICAgIHZhbHVlID0gX3BhaXJzJGlbMV07XG5cblx0XHRcdGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIG5hbWUsIHRoaXMpO1xuXHRcdFx0cGFpcnMgPSBnZXRIZWFkZXJzKHRoaXMpO1xuXHRcdFx0aSsrO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIE92ZXJ3cml0ZSBoZWFkZXIgdmFsdWVzIGdpdmVuIG5hbWVcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgbmFtZSAgIEhlYWRlciBuYW1lXG4gICogQHBhcmFtICAgU3RyaW5nICB2YWx1ZSAgSGVhZGVyIHZhbHVlXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRzZXQobmFtZSwgdmFsdWUpIHtcblx0XHRuYW1lID0gYCR7bmFtZX1gO1xuXHRcdHZhbHVlID0gYCR7dmFsdWV9YDtcblx0XHR2YWxpZGF0ZU5hbWUobmFtZSk7XG5cdFx0dmFsaWRhdGVWYWx1ZSh2YWx1ZSk7XG5cdFx0Y29uc3Qga2V5ID0gZmluZCh0aGlzW01BUF0sIG5hbWUpO1xuXHRcdHRoaXNbTUFQXVtrZXkgIT09IHVuZGVmaW5lZCA/IGtleSA6IG5hbWVdID0gW3ZhbHVlXTtcblx0fVxuXG5cdC8qKlxuICAqIEFwcGVuZCBhIHZhbHVlIG9udG8gZXhpc3RpbmcgaGVhZGVyXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgICBIZWFkZXIgbmFtZVxuICAqIEBwYXJhbSAgIFN0cmluZyAgdmFsdWUgIEhlYWRlciB2YWx1ZVxuICAqIEByZXR1cm4gIFZvaWRcbiAgKi9cblx0YXBwZW5kKG5hbWUsIHZhbHVlKSB7XG5cdFx0bmFtZSA9IGAke25hbWV9YDtcblx0XHR2YWx1ZSA9IGAke3ZhbHVlfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdHZhbGlkYXRlVmFsdWUodmFsdWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHRpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXNbTUFQXVtrZXldLnB1c2godmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzW01BUF1bbmFtZV0gPSBbdmFsdWVdO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuICAqIENoZWNrIGZvciBoZWFkZXIgbmFtZSBleGlzdGVuY2VcbiAgKlxuICAqIEBwYXJhbSAgIFN0cmluZyAgIG5hbWUgIEhlYWRlciBuYW1lXG4gICogQHJldHVybiAgQm9vbGVhblxuICAqL1xuXHRoYXMobmFtZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdHJldHVybiBmaW5kKHRoaXNbTUFQXSwgbmFtZSkgIT09IHVuZGVmaW5lZDtcblx0fVxuXG5cdC8qKlxuICAqIERlbGV0ZSBhbGwgaGVhZGVyIHZhbHVlcyBnaXZlbiBuYW1lXG4gICpcbiAgKiBAcGFyYW0gICBTdHJpbmcgIG5hbWUgIEhlYWRlciBuYW1lXG4gICogQHJldHVybiAgVm9pZFxuICAqL1xuXHRkZWxldGUobmFtZSkge1xuXHRcdG5hbWUgPSBgJHtuYW1lfWA7XG5cdFx0dmFsaWRhdGVOYW1lKG5hbWUpO1xuXHRcdGNvbnN0IGtleSA9IGZpbmQodGhpc1tNQVBdLCBuYW1lKTtcblx0XHRpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGRlbGV0ZSB0aGlzW01BUF1ba2V5XTtcblx0XHR9XG5cdH1cblxuXHQvKipcbiAgKiBSZXR1cm4gcmF3IGhlYWRlcnMgKG5vbi1zcGVjIGFwaSlcbiAgKlxuICAqIEByZXR1cm4gIE9iamVjdFxuICAqL1xuXHRyYXcoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUFQXTtcblx0fVxuXG5cdC8qKlxuICAqIEdldCBhbiBpdGVyYXRvciBvbiBrZXlzLlxuICAqXG4gICogQHJldHVybiAgSXRlcmF0b3JcbiAgKi9cblx0a2V5cygpIHtcblx0XHRyZXR1cm4gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRoaXMsICdrZXknKTtcblx0fVxuXG5cdC8qKlxuICAqIEdldCBhbiBpdGVyYXRvciBvbiB2YWx1ZXMuXG4gICpcbiAgKiBAcmV0dXJuICBJdGVyYXRvclxuICAqL1xuXHR2YWx1ZXMoKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0aGlzLCAndmFsdWUnKTtcblx0fVxuXG5cdC8qKlxuICAqIEdldCBhbiBpdGVyYXRvciBvbiBlbnRyaWVzLlxuICAqXG4gICogVGhpcyBpcyB0aGUgZGVmYXVsdCBpdGVyYXRvciBvZiB0aGUgSGVhZGVycyBvYmplY3QuXG4gICpcbiAgKiBAcmV0dXJuICBJdGVyYXRvclxuICAqL1xuXHRbU3ltYm9sLml0ZXJhdG9yXSgpIHtcblx0XHRyZXR1cm4gY3JlYXRlSGVhZGVyc0l0ZXJhdG9yKHRoaXMsICdrZXkrdmFsdWUnKTtcblx0fVxufVxuSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShIZWFkZXJzLnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnSGVhZGVycycsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEhlYWRlcnMucHJvdG90eXBlLCB7XG5cdGdldDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGZvckVhY2g6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRzZXQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRhcHBlbmQ6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRoYXM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRkZWxldGU6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRrZXlzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0dmFsdWVzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0ZW50cmllczogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG5mdW5jdGlvbiBnZXRIZWFkZXJzKGhlYWRlcnMpIHtcblx0bGV0IGtpbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdrZXkrdmFsdWUnO1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhoZWFkZXJzW01BUF0pLnNvcnQoKTtcblx0cmV0dXJuIGtleXMubWFwKGtpbmQgPT09ICdrZXknID8gZnVuY3Rpb24gKGspIHtcblx0XHRyZXR1cm4gay50b0xvd2VyQ2FzZSgpO1xuXHR9IDoga2luZCA9PT0gJ3ZhbHVlJyA/IGZ1bmN0aW9uIChrKSB7XG5cdFx0cmV0dXJuIGhlYWRlcnNbTUFQXVtrXS5qb2luKCcsICcpO1xuXHR9IDogZnVuY3Rpb24gKGspIHtcblx0XHRyZXR1cm4gW2sudG9Mb3dlckNhc2UoKSwgaGVhZGVyc1tNQVBdW2tdLmpvaW4oJywgJyldO1xuXHR9KTtcbn1cblxuY29uc3QgSU5URVJOQUwgPSBTeW1ib2woJ2ludGVybmFsJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcnNJdGVyYXRvcih0YXJnZXQsIGtpbmQpIHtcblx0Y29uc3QgaXRlcmF0b3IgPSBPYmplY3QuY3JlYXRlKEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSk7XG5cdGl0ZXJhdG9yW0lOVEVSTkFMXSA9IHtcblx0XHR0YXJnZXQsXG5cdFx0a2luZCxcblx0XHRpbmRleDogMFxuXHR9O1xuXHRyZXR1cm4gaXRlcmF0b3I7XG59XG5cbmNvbnN0IEhlYWRlcnNJdGVyYXRvclByb3RvdHlwZSA9IE9iamVjdC5zZXRQcm90b3R5cGVPZih7XG5cdG5leHQoKSB7XG5cdFx0Ly8gaXN0YW5idWwgaWdub3JlIGlmXG5cdFx0aWYgKCF0aGlzIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSAhPT0gSGVhZGVyc0l0ZXJhdG9yUHJvdG90eXBlKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdWYWx1ZSBvZiBgdGhpc2AgaXMgbm90IGEgSGVhZGVyc0l0ZXJhdG9yJyk7XG5cdFx0fVxuXG5cdFx0dmFyIF9JTlRFUk5BTCA9IHRoaXNbSU5URVJOQUxdO1xuXHRcdGNvbnN0IHRhcmdldCA9IF9JTlRFUk5BTC50YXJnZXQsXG5cdFx0ICAgICAga2luZCA9IF9JTlRFUk5BTC5raW5kLFxuXHRcdCAgICAgIGluZGV4ID0gX0lOVEVSTkFMLmluZGV4O1xuXG5cdFx0Y29uc3QgdmFsdWVzID0gZ2V0SGVhZGVycyh0YXJnZXQsIGtpbmQpO1xuXHRcdGNvbnN0IGxlbiA9IHZhbHVlcy5sZW5ndGg7XG5cdFx0aWYgKGluZGV4ID49IGxlbikge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dmFsdWU6IHVuZGVmaW5lZCxcblx0XHRcdFx0ZG9uZTogdHJ1ZVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMXS5pbmRleCA9IGluZGV4ICsgMTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogdmFsdWVzW2luZGV4XSxcblx0XHRcdGRvbmU6IGZhbHNlXG5cdFx0fTtcblx0fVxufSwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdC5nZXRQcm90b3R5cGVPZihbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShIZWFkZXJzSXRlcmF0b3JQcm90b3R5cGUsIFN5bWJvbC50b1N0cmluZ1RhZywge1xuXHR2YWx1ZTogJ0hlYWRlcnNJdGVyYXRvcicsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogRXhwb3J0IHRoZSBIZWFkZXJzIG9iamVjdCBpbiBhIGZvcm0gdGhhdCBOb2RlLmpzIGNhbiBjb25zdW1lLlxuICpcbiAqIEBwYXJhbSAgIEhlYWRlcnMgIGhlYWRlcnNcbiAqIEByZXR1cm4gIE9iamVjdFxuICovXG5mdW5jdGlvbiBleHBvcnROb2RlQ29tcGF0aWJsZUhlYWRlcnMoaGVhZGVycykge1xuXHRjb25zdCBvYmogPSBPYmplY3QuYXNzaWduKHsgX19wcm90b19fOiBudWxsIH0sIGhlYWRlcnNbTUFQXSk7XG5cblx0Ly8gaHR0cC5yZXF1ZXN0KCkgb25seSBzdXBwb3J0cyBzdHJpbmcgYXMgSG9zdCBoZWFkZXIuIFRoaXMgaGFjayBtYWtlc1xuXHQvLyBzcGVjaWZ5aW5nIGN1c3RvbSBIb3N0IGhlYWRlciBwb3NzaWJsZS5cblx0Y29uc3QgaG9zdEhlYWRlcktleSA9IGZpbmQoaGVhZGVyc1tNQVBdLCAnSG9zdCcpO1xuXHRpZiAoaG9zdEhlYWRlcktleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0b2JqW2hvc3RIZWFkZXJLZXldID0gb2JqW2hvc3RIZWFkZXJLZXldWzBdO1xuXHR9XG5cblx0cmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBIZWFkZXJzIG9iamVjdCBmcm9tIGFuIG9iamVjdCBvZiBoZWFkZXJzLCBpZ25vcmluZyB0aG9zZSB0aGF0IGRvXG4gKiBub3QgY29uZm9ybSB0byBIVFRQIGdyYW1tYXIgcHJvZHVjdGlvbnMuXG4gKlxuICogQHBhcmFtICAgT2JqZWN0ICBvYmogIE9iamVjdCBvZiBoZWFkZXJzXG4gKiBAcmV0dXJuICBIZWFkZXJzXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUhlYWRlcnNMZW5pZW50KG9iaikge1xuXHRjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcblx0Zm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKG9iaikpIHtcblx0XHRpZiAoaW52YWxpZFRva2VuUmVnZXgudGVzdChuYW1lKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9ialtuYW1lXSkpIHtcblx0XHRcdGZvciAoY29uc3QgdmFsIG9mIG9ialtuYW1lXSkge1xuXHRcdFx0XHRpZiAoaW52YWxpZEhlYWRlckNoYXJSZWdleC50ZXN0KHZhbCkpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoaGVhZGVyc1tNQVBdW25hbWVdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRoZWFkZXJzW01BUF1bbmFtZV0gPSBbdmFsXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRoZWFkZXJzW01BUF1bbmFtZV0ucHVzaCh2YWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghaW52YWxpZEhlYWRlckNoYXJSZWdleC50ZXN0KG9ialtuYW1lXSkpIHtcblx0XHRcdGhlYWRlcnNbTUFQXVtuYW1lXSA9IFtvYmpbbmFtZV1dO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gaGVhZGVycztcbn1cblxuY29uc3QgSU5URVJOQUxTJDEgPSBTeW1ib2woJ1Jlc3BvbnNlIGludGVybmFscycpO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJTVEFUVVNfQ09ERVNcIiBhcmVuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXG5jb25zdCBTVEFUVVNfQ09ERVMgPSBodHRwLlNUQVRVU19DT0RFUztcblxuLyoqXG4gKiBSZXNwb25zZSBjbGFzc1xuICpcbiAqIEBwYXJhbSAgIFN0cmVhbSAgYm9keSAgUmVhZGFibGUgc3RyZWFtXG4gKiBAcGFyYW0gICBPYmplY3QgIG9wdHMgIFJlc3BvbnNlIG9wdGlvbnNcbiAqIEByZXR1cm4gIFZvaWRcbiAqL1xuY2xhc3MgUmVzcG9uc2Uge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRsZXQgYm9keSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogbnVsbDtcblx0XHRsZXQgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cblx0XHRCb2R5LmNhbGwodGhpcywgYm9keSwgb3B0cyk7XG5cblx0XHRjb25zdCBzdGF0dXMgPSBvcHRzLnN0YXR1cyB8fCAyMDA7XG5cdFx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdHMuaGVhZGVycyk7XG5cblx0XHRpZiAoYm9keSAhPSBudWxsICYmICFoZWFkZXJzLmhhcygnQ29udGVudC1UeXBlJykpIHtcblx0XHRcdGNvbnN0IGNvbnRlbnRUeXBlID0gZXh0cmFjdENvbnRlbnRUeXBlKGJvZHkpO1xuXHRcdFx0aWYgKGNvbnRlbnRUeXBlKSB7XG5cdFx0XHRcdGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpc1tJTlRFUk5BTFMkMV0gPSB7XG5cdFx0XHR1cmw6IG9wdHMudXJsLFxuXHRcdFx0c3RhdHVzLFxuXHRcdFx0c3RhdHVzVGV4dDogb3B0cy5zdGF0dXNUZXh0IHx8IFNUQVRVU19DT0RFU1tzdGF0dXNdLFxuXHRcdFx0aGVhZGVycyxcblx0XHRcdGNvdW50ZXI6IG9wdHMuY291bnRlclxuXHRcdH07XG5cdH1cblxuXHRnZXQgdXJsKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS51cmwgfHwgJyc7XG5cdH1cblxuXHRnZXQgc3RhdHVzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXM7XG5cdH1cblxuXHQvKipcbiAgKiBDb252ZW5pZW5jZSBwcm9wZXJ0eSByZXByZXNlbnRpbmcgaWYgdGhlIHJlcXVlc3QgZW5kZWQgbm9ybWFsbHlcbiAgKi9cblx0Z2V0IG9rKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXMgPj0gMjAwICYmIHRoaXNbSU5URVJOQUxTJDFdLnN0YXR1cyA8IDMwMDtcblx0fVxuXG5cdGdldCByZWRpcmVjdGVkKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5jb3VudGVyID4gMDtcblx0fVxuXG5cdGdldCBzdGF0dXNUZXh0KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQxXS5zdGF0dXNUZXh0O1xuXHR9XG5cblx0Z2V0IGhlYWRlcnMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDFdLmhlYWRlcnM7XG5cdH1cblxuXHQvKipcbiAgKiBDbG9uZSB0aGlzIHJlc3BvbnNlXG4gICpcbiAgKiBAcmV0dXJuICBSZXNwb25zZVxuICAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlc3BvbnNlKGNsb25lKHRoaXMpLCB7XG5cdFx0XHR1cmw6IHRoaXMudXJsLFxuXHRcdFx0c3RhdHVzOiB0aGlzLnN0YXR1cyxcblx0XHRcdHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcblx0XHRcdGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcblx0XHRcdG9rOiB0aGlzLm9rLFxuXHRcdFx0cmVkaXJlY3RlZDogdGhpcy5yZWRpcmVjdGVkXG5cdFx0fSk7XG5cdH1cbn1cblxuQm9keS5taXhJbihSZXNwb25zZS5wcm90b3R5cGUpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhSZXNwb25zZS5wcm90b3R5cGUsIHtcblx0dXJsOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c3RhdHVzOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0b2s6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRyZWRpcmVjdGVkOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c3RhdHVzVGV4dDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGhlYWRlcnM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRjbG9uZTogeyBlbnVtZXJhYmxlOiB0cnVlIH1cbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUmVzcG9uc2UucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcblx0dmFsdWU6ICdSZXNwb25zZScsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbmNvbnN0IElOVEVSTkFMUyQyID0gU3ltYm9sKCdSZXF1ZXN0IGludGVybmFscycpO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJmb3JtYXRcIiwgXCJwYXJzZVwiIGFyZW4ndCBhIG5hbWVkIGV4cG9ydCBmb3Igbm9kZSA8MTBcbmNvbnN0IHBhcnNlX3VybCA9IFVybC5wYXJzZTtcbmNvbnN0IGZvcm1hdF91cmwgPSBVcmwuZm9ybWF0O1xuXG5jb25zdCBzdHJlYW1EZXN0cnVjdGlvblN1cHBvcnRlZCA9ICdkZXN0cm95JyBpbiBTdHJlYW0uUmVhZGFibGUucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrIGlmIGEgdmFsdWUgaXMgYW4gaW5zdGFuY2Ugb2YgUmVxdWVzdC5cbiAqXG4gKiBAcGFyYW0gICBNaXhlZCAgIGlucHV0XG4gKiBAcmV0dXJuICBCb29sZWFuXG4gKi9cbmZ1bmN0aW9uIGlzUmVxdWVzdChpbnB1dCkge1xuXHRyZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgaW5wdXRbSU5URVJOQUxTJDJdID09PSAnb2JqZWN0Jztcbn1cblxuZnVuY3Rpb24gaXNBYm9ydFNpZ25hbChzaWduYWwpIHtcblx0Y29uc3QgcHJvdG8gPSBzaWduYWwgJiYgdHlwZW9mIHNpZ25hbCA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKHNpZ25hbCk7XG5cdHJldHVybiAhIShwcm90byAmJiBwcm90by5jb25zdHJ1Y3Rvci5uYW1lID09PSAnQWJvcnRTaWduYWwnKTtcbn1cblxuLyoqXG4gKiBSZXF1ZXN0IGNsYXNzXG4gKlxuICogQHBhcmFtICAgTWl4ZWQgICBpbnB1dCAgVXJsIG9yIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIE9iamVjdCAgaW5pdCAgIEN1c3RvbSBvcHRpb25zXG4gKiBAcmV0dXJuICBWb2lkXG4gKi9cbmNsYXNzIFJlcXVlc3Qge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdGxldCBpbml0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuXHRcdGxldCBwYXJzZWRVUkw7XG5cblx0XHQvLyBub3JtYWxpemUgaW5wdXRcblx0XHRpZiAoIWlzUmVxdWVzdChpbnB1dCkpIHtcblx0XHRcdGlmIChpbnB1dCAmJiBpbnB1dC5ocmVmKSB7XG5cdFx0XHRcdC8vIGluIG9yZGVyIHRvIHN1cHBvcnQgTm9kZS5qcycgVXJsIG9iamVjdHM7IHRob3VnaCBXSEFUV0cncyBVUkwgb2JqZWN0c1xuXHRcdFx0XHQvLyB3aWxsIGZhbGwgaW50byB0aGlzIGJyYW5jaCBhbHNvIChzaW5jZSB0aGVpciBgdG9TdHJpbmcoKWAgd2lsbCByZXR1cm5cblx0XHRcdFx0Ly8gYGhyZWZgIHByb3BlcnR5IGFueXdheSlcblx0XHRcdFx0cGFyc2VkVVJMID0gcGFyc2VfdXJsKGlucHV0LmhyZWYpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gY29lcmNlIGlucHV0IHRvIGEgc3RyaW5nIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHBhcnNlXG5cdFx0XHRcdHBhcnNlZFVSTCA9IHBhcnNlX3VybChgJHtpbnB1dH1gKTtcblx0XHRcdH1cblx0XHRcdGlucHV0ID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcnNlZFVSTCA9IHBhcnNlX3VybChpbnB1dC51cmwpO1xuXHRcdH1cblxuXHRcdGxldCBtZXRob2QgPSBpbml0Lm1ldGhvZCB8fCBpbnB1dC5tZXRob2QgfHwgJ0dFVCc7XG5cdFx0bWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG5cblx0XHRpZiAoKGluaXQuYm9keSAhPSBudWxsIHx8IGlzUmVxdWVzdChpbnB1dCkgJiYgaW5wdXQuYm9keSAhPT0gbnVsbCkgJiYgKG1ldGhvZCA9PT0gJ0dFVCcgfHwgbWV0aG9kID09PSAnSEVBRCcpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdSZXF1ZXN0IHdpdGggR0VUL0hFQUQgbWV0aG9kIGNhbm5vdCBoYXZlIGJvZHknKTtcblx0XHR9XG5cblx0XHRsZXQgaW5wdXRCb2R5ID0gaW5pdC5ib2R5ICE9IG51bGwgPyBpbml0LmJvZHkgOiBpc1JlcXVlc3QoaW5wdXQpICYmIGlucHV0LmJvZHkgIT09IG51bGwgPyBjbG9uZShpbnB1dCkgOiBudWxsO1xuXG5cdFx0Qm9keS5jYWxsKHRoaXMsIGlucHV0Qm9keSwge1xuXHRcdFx0dGltZW91dDogaW5pdC50aW1lb3V0IHx8IGlucHV0LnRpbWVvdXQgfHwgMCxcblx0XHRcdHNpemU6IGluaXQuc2l6ZSB8fCBpbnB1dC5zaXplIHx8IDBcblx0XHR9KTtcblxuXHRcdGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbml0LmhlYWRlcnMgfHwgaW5wdXQuaGVhZGVycyB8fCB7fSk7XG5cblx0XHRpZiAoaW5wdXRCb2R5ICE9IG51bGwgJiYgIWhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKSkge1xuXHRcdFx0Y29uc3QgY29udGVudFR5cGUgPSBleHRyYWN0Q29udGVudFR5cGUoaW5wdXRCb2R5KTtcblx0XHRcdGlmIChjb250ZW50VHlwZSkge1xuXHRcdFx0XHRoZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGxldCBzaWduYWwgPSBpc1JlcXVlc3QoaW5wdXQpID8gaW5wdXQuc2lnbmFsIDogbnVsbDtcblx0XHRpZiAoJ3NpZ25hbCcgaW4gaW5pdCkgc2lnbmFsID0gaW5pdC5zaWduYWw7XG5cblx0XHRpZiAoc2lnbmFsICE9IG51bGwgJiYgIWlzQWJvcnRTaWduYWwoc2lnbmFsKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc2lnbmFsIHRvIGJlIGFuIGluc3RhbmNlb2YgQWJvcnRTaWduYWwnKTtcblx0XHR9XG5cblx0XHR0aGlzW0lOVEVSTkFMUyQyXSA9IHtcblx0XHRcdG1ldGhvZCxcblx0XHRcdHJlZGlyZWN0OiBpbml0LnJlZGlyZWN0IHx8IGlucHV0LnJlZGlyZWN0IHx8ICdmb2xsb3cnLFxuXHRcdFx0aGVhZGVycyxcblx0XHRcdHBhcnNlZFVSTCxcblx0XHRcdHNpZ25hbFxuXHRcdH07XG5cblx0XHQvLyBub2RlLWZldGNoLW9ubHkgb3B0aW9uc1xuXHRcdHRoaXMuZm9sbG93ID0gaW5pdC5mb2xsb3cgIT09IHVuZGVmaW5lZCA/IGluaXQuZm9sbG93IDogaW5wdXQuZm9sbG93ICE9PSB1bmRlZmluZWQgPyBpbnB1dC5mb2xsb3cgOiAyMDtcblx0XHR0aGlzLmNvbXByZXNzID0gaW5pdC5jb21wcmVzcyAhPT0gdW5kZWZpbmVkID8gaW5pdC5jb21wcmVzcyA6IGlucHV0LmNvbXByZXNzICE9PSB1bmRlZmluZWQgPyBpbnB1dC5jb21wcmVzcyA6IHRydWU7XG5cdFx0dGhpcy5jb3VudGVyID0gaW5pdC5jb3VudGVyIHx8IGlucHV0LmNvdW50ZXIgfHwgMDtcblx0XHR0aGlzLmFnZW50ID0gaW5pdC5hZ2VudCB8fCBpbnB1dC5hZ2VudDtcblx0fVxuXG5cdGdldCBtZXRob2QoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLm1ldGhvZDtcblx0fVxuXG5cdGdldCB1cmwoKSB7XG5cdFx0cmV0dXJuIGZvcm1hdF91cmwodGhpc1tJTlRFUk5BTFMkMl0ucGFyc2VkVVJMKTtcblx0fVxuXG5cdGdldCBoZWFkZXJzKCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5oZWFkZXJzO1xuXHR9XG5cblx0Z2V0IHJlZGlyZWN0KCkge1xuXHRcdHJldHVybiB0aGlzW0lOVEVSTkFMUyQyXS5yZWRpcmVjdDtcblx0fVxuXG5cdGdldCBzaWduYWwoKSB7XG5cdFx0cmV0dXJuIHRoaXNbSU5URVJOQUxTJDJdLnNpZ25hbDtcblx0fVxuXG5cdC8qKlxuICAqIENsb25lIHRoaXMgcmVxdWVzdFxuICAqXG4gICogQHJldHVybiAgUmVxdWVzdFxuICAqL1xuXHRjbG9uZSgpIHtcblx0XHRyZXR1cm4gbmV3IFJlcXVlc3QodGhpcyk7XG5cdH1cbn1cblxuQm9keS5taXhJbihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZXF1ZXN0LnByb3RvdHlwZSwgU3ltYm9sLnRvU3RyaW5nVGFnLCB7XG5cdHZhbHVlOiAnUmVxdWVzdCcsXG5cdHdyaXRhYmxlOiBmYWxzZSxcblx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFJlcXVlc3QucHJvdG90eXBlLCB7XG5cdG1ldGhvZDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdHVybDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGhlYWRlcnM6IHsgZW51bWVyYWJsZTogdHJ1ZSB9LFxuXHRyZWRpcmVjdDogeyBlbnVtZXJhYmxlOiB0cnVlIH0sXG5cdGNsb25lOiB7IGVudW1lcmFibGU6IHRydWUgfSxcblx0c2lnbmFsOiB7IGVudW1lcmFibGU6IHRydWUgfVxufSk7XG5cbi8qKlxuICogQ29udmVydCBhIFJlcXVlc3QgdG8gTm9kZS5qcyBodHRwIHJlcXVlc3Qgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gICBSZXF1ZXN0ICBBIFJlcXVlc3QgaW5zdGFuY2VcbiAqIEByZXR1cm4gIE9iamVjdCAgIFRoZSBvcHRpb25zIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gaHR0cC5yZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIGdldE5vZGVSZXF1ZXN0T3B0aW9ucyhyZXF1ZXN0KSB7XG5cdGNvbnN0IHBhcnNlZFVSTCA9IHJlcXVlc3RbSU5URVJOQUxTJDJdLnBhcnNlZFVSTDtcblx0Y29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHJlcXVlc3RbSU5URVJOQUxTJDJdLmhlYWRlcnMpO1xuXG5cdC8vIGZldGNoIHN0ZXAgMS4zXG5cdGlmICghaGVhZGVycy5oYXMoJ0FjY2VwdCcpKSB7XG5cdFx0aGVhZGVycy5zZXQoJ0FjY2VwdCcsICcqLyonKTtcblx0fVxuXG5cdC8vIEJhc2ljIGZldGNoXG5cdGlmICghcGFyc2VkVVJMLnByb3RvY29sIHx8ICFwYXJzZWRVUkwuaG9zdG5hbWUpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPbmx5IGFic29sdXRlIFVSTHMgYXJlIHN1cHBvcnRlZCcpO1xuXHR9XG5cblx0aWYgKCEvXmh0dHBzPzokLy50ZXN0KHBhcnNlZFVSTC5wcm90b2NvbCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPbmx5IEhUVFAoUykgcHJvdG9jb2xzIGFyZSBzdXBwb3J0ZWQnKTtcblx0fVxuXG5cdGlmIChyZXF1ZXN0LnNpZ25hbCAmJiByZXF1ZXN0LmJvZHkgaW5zdGFuY2VvZiBTdHJlYW0uUmVhZGFibGUgJiYgIXN0cmVhbURlc3RydWN0aW9uU3VwcG9ydGVkKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDYW5jZWxsYXRpb24gb2Ygc3RyZWFtZWQgcmVxdWVzdHMgd2l0aCBBYm9ydFNpZ25hbCBpcyBub3Qgc3VwcG9ydGVkIGluIG5vZGUgPCA4Jyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmstb3ItY2FjaGUgZmV0Y2ggc3RlcHMgMi40LTIuN1xuXHRsZXQgY29udGVudExlbmd0aFZhbHVlID0gbnVsbDtcblx0aWYgKHJlcXVlc3QuYm9keSA9PSBudWxsICYmIC9eKFBPU1R8UFVUKSQvaS50ZXN0KHJlcXVlc3QubWV0aG9kKSkge1xuXHRcdGNvbnRlbnRMZW5ndGhWYWx1ZSA9ICcwJztcblx0fVxuXHRpZiAocmVxdWVzdC5ib2R5ICE9IG51bGwpIHtcblx0XHRjb25zdCB0b3RhbEJ5dGVzID0gZ2V0VG90YWxCeXRlcyhyZXF1ZXN0KTtcblx0XHRpZiAodHlwZW9mIHRvdGFsQnl0ZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRjb250ZW50TGVuZ3RoVmFsdWUgPSBTdHJpbmcodG90YWxCeXRlcyk7XG5cdFx0fVxuXHR9XG5cdGlmIChjb250ZW50TGVuZ3RoVmFsdWUpIHtcblx0XHRoZWFkZXJzLnNldCgnQ29udGVudC1MZW5ndGgnLCBjb250ZW50TGVuZ3RoVmFsdWUpO1xuXHR9XG5cblx0Ly8gSFRUUC1uZXR3b3JrLW9yLWNhY2hlIGZldGNoIHN0ZXAgMi4xMVxuXHRpZiAoIWhlYWRlcnMuaGFzKCdVc2VyLUFnZW50JykpIHtcblx0XHRoZWFkZXJzLnNldCgnVXNlci1BZ2VudCcsICdub2RlLWZldGNoLzEuMCAoK2h0dHBzOi8vZ2l0aHViLmNvbS9iaXRpbm4vbm9kZS1mZXRjaCknKTtcblx0fVxuXG5cdC8vIEhUVFAtbmV0d29yay1vci1jYWNoZSBmZXRjaCBzdGVwIDIuMTVcblx0aWYgKHJlcXVlc3QuY29tcHJlc3MgJiYgIWhlYWRlcnMuaGFzKCdBY2NlcHQtRW5jb2RpbmcnKSkge1xuXHRcdGhlYWRlcnMuc2V0KCdBY2NlcHQtRW5jb2RpbmcnLCAnZ3ppcCxkZWZsYXRlJyk7XG5cdH1cblxuXHRsZXQgYWdlbnQgPSByZXF1ZXN0LmFnZW50O1xuXHRpZiAodHlwZW9mIGFnZW50ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0YWdlbnQgPSBhZ2VudChwYXJzZWRVUkwpO1xuXHR9XG5cblx0aWYgKCFoZWFkZXJzLmhhcygnQ29ubmVjdGlvbicpICYmICFhZ2VudCkge1xuXHRcdGhlYWRlcnMuc2V0KCdDb25uZWN0aW9uJywgJ2Nsb3NlJyk7XG5cdH1cblxuXHQvLyBIVFRQLW5ldHdvcmsgZmV0Y2ggc3RlcCA0LjJcblx0Ly8gY2h1bmtlZCBlbmNvZGluZyBpcyBoYW5kbGVkIGJ5IE5vZGUuanNcblxuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcGFyc2VkVVJMLCB7XG5cdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRoZWFkZXJzOiBleHBvcnROb2RlQ29tcGF0aWJsZUhlYWRlcnMoaGVhZGVycyksXG5cdFx0YWdlbnRcblx0fSk7XG59XG5cbi8qKlxuICogYWJvcnQtZXJyb3IuanNcbiAqXG4gKiBBYm9ydEVycm9yIGludGVyZmFjZSBmb3IgY2FuY2VsbGVkIHJlcXVlc3RzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgQWJvcnRFcnJvciBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAgIFN0cmluZyAgICAgIG1lc3NhZ2UgICAgICBFcnJvciBtZXNzYWdlIGZvciBodW1hblxuICogQHJldHVybiAgQWJvcnRFcnJvclxuICovXG5mdW5jdGlvbiBBYm9ydEVycm9yKG1lc3NhZ2UpIHtcbiAgRXJyb3IuY2FsbCh0aGlzLCBtZXNzYWdlKTtcblxuICB0aGlzLnR5cGUgPSAnYWJvcnRlZCc7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgLy8gaGlkZSBjdXN0b20gZXJyb3IgaW1wbGVtZW50YXRpb24gZGV0YWlscyBmcm9tIGVuZC11c2Vyc1xuICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbn1cblxuQWJvcnRFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5BYm9ydEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFib3J0RXJyb3I7XG5BYm9ydEVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0Fib3J0RXJyb3InO1xuXG4vLyBmaXggYW4gaXNzdWUgd2hlcmUgXCJQYXNzVGhyb3VnaFwiLCBcInJlc29sdmVcIiBhcmVuJ3QgYSBuYW1lZCBleHBvcnQgZm9yIG5vZGUgPDEwXG5jb25zdCBQYXNzVGhyb3VnaCQxID0gU3RyZWFtLlBhc3NUaHJvdWdoO1xuY29uc3QgcmVzb2x2ZV91cmwgPSBVcmwucmVzb2x2ZTtcblxuLyoqXG4gKiBGZXRjaCBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSAgIE1peGVkICAgIHVybCAgIEFic29sdXRlIHVybCBvciBSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0gICBPYmplY3QgICBvcHRzICBGZXRjaCBvcHRpb25zXG4gKiBAcmV0dXJuICBQcm9taXNlXG4gKi9cbmZ1bmN0aW9uIGZldGNoKHVybCwgb3B0cykge1xuXG5cdC8vIGFsbG93IGN1c3RvbSBwcm9taXNlXG5cdGlmICghZmV0Y2guUHJvbWlzZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignbmF0aXZlIHByb21pc2UgbWlzc2luZywgc2V0IGZldGNoLlByb21pc2UgdG8geW91ciBmYXZvcml0ZSBhbHRlcm5hdGl2ZScpO1xuXHR9XG5cblx0Qm9keS5Qcm9taXNlID0gZmV0Y2guUHJvbWlzZTtcblxuXHQvLyB3cmFwIGh0dHAucmVxdWVzdCBpbnRvIGZldGNoXG5cdHJldHVybiBuZXcgZmV0Y2guUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdFx0Ly8gYnVpbGQgcmVxdWVzdCBvYmplY3Rcblx0XHRjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCBvcHRzKTtcblx0XHRjb25zdCBvcHRpb25zID0gZ2V0Tm9kZVJlcXVlc3RPcHRpb25zKHJlcXVlc3QpO1xuXG5cdFx0Y29uc3Qgc2VuZCA9IChvcHRpb25zLnByb3RvY29sID09PSAnaHR0cHM6JyA/IGh0dHBzIDogaHR0cCkucmVxdWVzdDtcblx0XHRjb25zdCBzaWduYWwgPSByZXF1ZXN0LnNpZ25hbDtcblxuXHRcdGxldCByZXNwb25zZSA9IG51bGw7XG5cblx0XHRjb25zdCBhYm9ydCA9IGZ1bmN0aW9uIGFib3J0KCkge1xuXHRcdFx0bGV0IGVycm9yID0gbmV3IEFib3J0RXJyb3IoJ1RoZSB1c2VyIGFib3J0ZWQgYSByZXF1ZXN0LicpO1xuXHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdGlmIChyZXF1ZXN0LmJvZHkgJiYgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgU3RyZWFtLlJlYWRhYmxlKSB7XG5cdFx0XHRcdHJlcXVlc3QuYm9keS5kZXN0cm95KGVycm9yKTtcblx0XHRcdH1cblx0XHRcdGlmICghcmVzcG9uc2UgfHwgIXJlc3BvbnNlLmJvZHkpIHJldHVybjtcblx0XHRcdHJlc3BvbnNlLmJvZHkuZW1pdCgnZXJyb3InLCBlcnJvcik7XG5cdFx0fTtcblxuXHRcdGlmIChzaWduYWwgJiYgc2lnbmFsLmFib3J0ZWQpIHtcblx0XHRcdGFib3J0KCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWJvcnRBbmRGaW5hbGl6ZSA9IGZ1bmN0aW9uIGFib3J0QW5kRmluYWxpemUoKSB7XG5cdFx0XHRhYm9ydCgpO1xuXHRcdFx0ZmluYWxpemUoKTtcblx0XHR9O1xuXG5cdFx0Ly8gc2VuZCByZXF1ZXN0XG5cdFx0Y29uc3QgcmVxID0gc2VuZChvcHRpb25zKTtcblx0XHRsZXQgcmVxVGltZW91dDtcblxuXHRcdGlmIChzaWduYWwpIHtcblx0XHRcdHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0QW5kRmluYWxpemUpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGZpbmFsaXplKCkge1xuXHRcdFx0cmVxLmFib3J0KCk7XG5cdFx0XHRpZiAoc2lnbmFsKSBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHRcdGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcblx0XHR9XG5cblx0XHRpZiAocmVxdWVzdC50aW1lb3V0KSB7XG5cdFx0XHRyZXEub25jZSgnc29ja2V0JywgZnVuY3Rpb24gKHNvY2tldCkge1xuXHRcdFx0XHRyZXFUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBuZXR3b3JrIHRpbWVvdXQgYXQ6ICR7cmVxdWVzdC51cmx9YCwgJ3JlcXVlc3QtdGltZW91dCcpKTtcblx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHR9LCByZXF1ZXN0LnRpbWVvdXQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcblx0XHRcdHJlamVjdChuZXcgRmV0Y2hFcnJvcihgcmVxdWVzdCB0byAke3JlcXVlc3QudXJsfSBmYWlsZWQsIHJlYXNvbjogJHtlcnIubWVzc2FnZX1gLCAnc3lzdGVtJywgZXJyKSk7XG5cdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdH0pO1xuXG5cdFx0cmVxLm9uKCdyZXNwb25zZScsIGZ1bmN0aW9uIChyZXMpIHtcblx0XHRcdGNsZWFyVGltZW91dChyZXFUaW1lb3V0KTtcblxuXHRcdFx0Y29uc3QgaGVhZGVycyA9IGNyZWF0ZUhlYWRlcnNMZW5pZW50KHJlcy5oZWFkZXJzKTtcblxuXHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDVcblx0XHRcdGlmIChmZXRjaC5pc1JlZGlyZWN0KHJlcy5zdGF0dXNDb2RlKSkge1xuXHRcdFx0XHQvLyBIVFRQIGZldGNoIHN0ZXAgNS4yXG5cdFx0XHRcdGNvbnN0IGxvY2F0aW9uID0gaGVhZGVycy5nZXQoJ0xvY2F0aW9uJyk7XG5cblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuM1xuXHRcdFx0XHRjb25zdCBsb2NhdGlvblVSTCA9IGxvY2F0aW9uID09PSBudWxsID8gbnVsbCA6IHJlc29sdmVfdXJsKHJlcXVlc3QudXJsLCBsb2NhdGlvbik7XG5cblx0XHRcdFx0Ly8gSFRUUCBmZXRjaCBzdGVwIDUuNVxuXHRcdFx0XHRzd2l0Y2ggKHJlcXVlc3QucmVkaXJlY3QpIHtcblx0XHRcdFx0XHRjYXNlICdlcnJvcic6XG5cdFx0XHRcdFx0XHRyZWplY3QobmV3IEZldGNoRXJyb3IoYHVyaSByZXF1ZXN0ZWQgcmVzcG9uZHMgd2l0aCBhIHJlZGlyZWN0LCByZWRpcmVjdCBtb2RlIGlzIHNldCB0byBlcnJvcjogJHtyZXF1ZXN0LnVybH1gLCAnbm8tcmVkaXJlY3QnKSk7XG5cdFx0XHRcdFx0XHRmaW5hbGl6ZSgpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdGNhc2UgJ21hbnVhbCc6XG5cdFx0XHRcdFx0XHQvLyBub2RlLWZldGNoLXNwZWNpZmljIHN0ZXA6IG1ha2UgbWFudWFsIHJlZGlyZWN0IGEgYml0IGVhc2llciB0byB1c2UgYnkgc2V0dGluZyB0aGUgTG9jYXRpb24gaGVhZGVyIHZhbHVlIHRvIHRoZSByZXNvbHZlZCBVUkwuXG5cdFx0XHRcdFx0XHRpZiAobG9jYXRpb25VUkwgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0Ly8gaGFuZGxlIGNvcnJ1cHRlZCBoZWFkZXJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRoZWFkZXJzLnNldCgnTG9jYXRpb24nLCBsb2NhdGlvblVSTCk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub2RlanMgc2VydmVyIHByZXZlbnQgaW52YWxpZCByZXNwb25zZSBoZWFkZXJzLCB3ZSBjYW4ndCB0ZXN0IHRoaXMgdGhyb3VnaCBub3JtYWwgcmVxdWVzdFxuXHRcdFx0XHRcdFx0XHRcdHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdmb2xsb3cnOlxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDJcblx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblVSTCA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gSFRUUC1yZWRpcmVjdCBmZXRjaCBzdGVwIDVcblx0XHRcdFx0XHRcdGlmIChyZXF1ZXN0LmNvdW50ZXIgPj0gcmVxdWVzdC5mb2xsb3cpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKGBtYXhpbXVtIHJlZGlyZWN0IHJlYWNoZWQgYXQ6ICR7cmVxdWVzdC51cmx9YCwgJ21heC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgNiAoY291bnRlciBpbmNyZW1lbnQpXG5cdFx0XHRcdFx0XHQvLyBDcmVhdGUgYSBuZXcgUmVxdWVzdCBvYmplY3QuXG5cdFx0XHRcdFx0XHRjb25zdCByZXF1ZXN0T3B0cyA9IHtcblx0XHRcdFx0XHRcdFx0aGVhZGVyczogbmV3IEhlYWRlcnMocmVxdWVzdC5oZWFkZXJzKSxcblx0XHRcdFx0XHRcdFx0Zm9sbG93OiByZXF1ZXN0LmZvbGxvdyxcblx0XHRcdFx0XHRcdFx0Y291bnRlcjogcmVxdWVzdC5jb3VudGVyICsgMSxcblx0XHRcdFx0XHRcdFx0YWdlbnQ6IHJlcXVlc3QuYWdlbnQsXG5cdFx0XHRcdFx0XHRcdGNvbXByZXNzOiByZXF1ZXN0LmNvbXByZXNzLFxuXHRcdFx0XHRcdFx0XHRtZXRob2Q6IHJlcXVlc3QubWV0aG9kLFxuXHRcdFx0XHRcdFx0XHRib2R5OiByZXF1ZXN0LmJvZHksXG5cdFx0XHRcdFx0XHRcdHNpZ25hbDogcmVxdWVzdC5zaWduYWwsXG5cdFx0XHRcdFx0XHRcdHRpbWVvdXQ6IHJlcXVlc3QudGltZW91dCxcblx0XHRcdFx0XHRcdFx0c2l6ZTogcmVxdWVzdC5zaXplXG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgOVxuXHRcdFx0XHRcdFx0aWYgKHJlcy5zdGF0dXNDb2RlICE9PSAzMDMgJiYgcmVxdWVzdC5ib2R5ICYmIGdldFRvdGFsQnl0ZXMocmVxdWVzdCkgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KG5ldyBGZXRjaEVycm9yKCdDYW5ub3QgZm9sbG93IHJlZGlyZWN0IHdpdGggYm9keSBiZWluZyBhIHJlYWRhYmxlIHN0cmVhbScsICd1bnN1cHBvcnRlZC1yZWRpcmVjdCcpKTtcblx0XHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTFcblx0XHRcdFx0XHRcdGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMzAzIHx8IChyZXMuc3RhdHVzQ29kZSA9PT0gMzAxIHx8IHJlcy5zdGF0dXNDb2RlID09PSAzMDIpICYmIHJlcXVlc3QubWV0aG9kID09PSAnUE9TVCcpIHtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdE9wdHMubWV0aG9kID0gJ0dFVCc7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RPcHRzLmJvZHkgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdHJlcXVlc3RPcHRzLmhlYWRlcnMuZGVsZXRlKCdjb250ZW50LWxlbmd0aCcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBIVFRQLXJlZGlyZWN0IGZldGNoIHN0ZXAgMTVcblx0XHRcdFx0XHRcdHJlc29sdmUoZmV0Y2gobmV3IFJlcXVlc3QobG9jYXRpb25VUkwsIHJlcXVlc3RPcHRzKSkpO1xuXHRcdFx0XHRcdFx0ZmluYWxpemUoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBwcmVwYXJlIHJlc3BvbnNlXG5cdFx0XHRyZXMub25jZSgnZW5kJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZiAoc2lnbmFsKSBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydEFuZEZpbmFsaXplKTtcblx0XHRcdH0pO1xuXHRcdFx0bGV0IGJvZHkgPSByZXMucGlwZShuZXcgUGFzc1Rocm91Z2gkMSgpKTtcblxuXHRcdFx0Y29uc3QgcmVzcG9uc2Vfb3B0aW9ucyA9IHtcblx0XHRcdFx0dXJsOiByZXF1ZXN0LnVybCxcblx0XHRcdFx0c3RhdHVzOiByZXMuc3RhdHVzQ29kZSxcblx0XHRcdFx0c3RhdHVzVGV4dDogcmVzLnN0YXR1c01lc3NhZ2UsXG5cdFx0XHRcdGhlYWRlcnM6IGhlYWRlcnMsXG5cdFx0XHRcdHNpemU6IHJlcXVlc3Quc2l6ZSxcblx0XHRcdFx0dGltZW91dDogcmVxdWVzdC50aW1lb3V0LFxuXHRcdFx0XHRjb3VudGVyOiByZXF1ZXN0LmNvdW50ZXJcblx0XHRcdH07XG5cblx0XHRcdC8vIEhUVFAtbmV0d29yayBmZXRjaCBzdGVwIDEyLjEuMS4zXG5cdFx0XHRjb25zdCBjb2RpbmdzID0gaGVhZGVycy5nZXQoJ0NvbnRlbnQtRW5jb2RpbmcnKTtcblxuXHRcdFx0Ly8gSFRUUC1uZXR3b3JrIGZldGNoIHN0ZXAgMTIuMS4xLjQ6IGhhbmRsZSBjb250ZW50IGNvZGluZ3NcblxuXHRcdFx0Ly8gaW4gZm9sbG93aW5nIHNjZW5hcmlvcyB3ZSBpZ25vcmUgY29tcHJlc3Npb24gc3VwcG9ydFxuXHRcdFx0Ly8gMS4gY29tcHJlc3Npb24gc3VwcG9ydCBpcyBkaXNhYmxlZFxuXHRcdFx0Ly8gMi4gSEVBRCByZXF1ZXN0XG5cdFx0XHQvLyAzLiBubyBDb250ZW50LUVuY29kaW5nIGhlYWRlclxuXHRcdFx0Ly8gNC4gbm8gY29udGVudCByZXNwb25zZSAoMjA0KVxuXHRcdFx0Ly8gNS4gY29udGVudCBub3QgbW9kaWZpZWQgcmVzcG9uc2UgKDMwNClcblx0XHRcdGlmICghcmVxdWVzdC5jb21wcmVzcyB8fCByZXF1ZXN0Lm1ldGhvZCA9PT0gJ0hFQUQnIHx8IGNvZGluZ3MgPT09IG51bGwgfHwgcmVzLnN0YXR1c0NvZGUgPT09IDIwNCB8fCByZXMuc3RhdHVzQ29kZSA9PT0gMzA0KSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3IgTm9kZSB2Nitcblx0XHRcdC8vIEJlIGxlc3Mgc3RyaWN0IHdoZW4gZGVjb2RpbmcgY29tcHJlc3NlZCByZXNwb25zZXMsIHNpbmNlIHNvbWV0aW1lc1xuXHRcdFx0Ly8gc2VydmVycyBzZW5kIHNsaWdodGx5IGludmFsaWQgcmVzcG9uc2VzIHRoYXQgYXJlIHN0aWxsIGFjY2VwdGVkXG5cdFx0XHQvLyBieSBjb21tb24gYnJvd3NlcnMuXG5cdFx0XHQvLyBBbHdheXMgdXNpbmcgWl9TWU5DX0ZMVVNIIGlzIHdoYXQgY1VSTCBkb2VzLlxuXHRcdFx0Y29uc3QgemxpYk9wdGlvbnMgPSB7XG5cdFx0XHRcdGZsdXNoOiB6bGliLlpfU1lOQ19GTFVTSCxcblx0XHRcdFx0ZmluaXNoRmx1c2g6IHpsaWIuWl9TWU5DX0ZMVVNIXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBmb3IgZ3ppcFxuXHRcdFx0aWYgKGNvZGluZ3MgPT0gJ2d6aXAnIHx8IGNvZGluZ3MgPT0gJ3gtZ3ppcCcpIHtcblx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUd1bnppcCh6bGliT3B0aW9ucykpO1xuXHRcdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdFx0cmVzb2x2ZShyZXNwb25zZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZm9yIGRlZmxhdGVcblx0XHRcdGlmIChjb2RpbmdzID09ICdkZWZsYXRlJyB8fCBjb2RpbmdzID09ICd4LWRlZmxhdGUnKSB7XG5cdFx0XHRcdC8vIGhhbmRsZSB0aGUgaW5mYW1vdXMgcmF3IGRlZmxhdGUgcmVzcG9uc2UgZnJvbSBvbGQgc2VydmVyc1xuXHRcdFx0XHQvLyBhIGhhY2sgZm9yIG9sZCBJSVMgYW5kIEFwYWNoZSBzZXJ2ZXJzXG5cdFx0XHRcdGNvbnN0IHJhdyA9IHJlcy5waXBlKG5ldyBQYXNzVGhyb3VnaCQxKCkpO1xuXHRcdFx0XHRyYXcub25jZSgnZGF0YScsIGZ1bmN0aW9uIChjaHVuaykge1xuXHRcdFx0XHRcdC8vIHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM3NTE5ODI4XG5cdFx0XHRcdFx0aWYgKChjaHVua1swXSAmIDB4MEYpID09PSAweDA4KSB7XG5cdFx0XHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlSW5mbGF0ZSgpKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ym9keSA9IGJvZHkucGlwZSh6bGliLmNyZWF0ZUluZmxhdGVSYXcoKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKGJvZHksIHJlc3BvbnNlX29wdGlvbnMpO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBmb3IgYnJcblx0XHRcdGlmIChjb2RpbmdzID09ICdicicgJiYgdHlwZW9mIHpsaWIuY3JlYXRlQnJvdGxpRGVjb21wcmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRib2R5ID0gYm9keS5waXBlKHpsaWIuY3JlYXRlQnJvdGxpRGVjb21wcmVzcygpKTtcblx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoYm9keSwgcmVzcG9uc2Vfb3B0aW9ucyk7XG5cdFx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIG90aGVyd2lzZSwgdXNlIHJlc3BvbnNlIGFzLWlzXG5cdFx0XHRyZXNwb25zZSA9IG5ldyBSZXNwb25zZShib2R5LCByZXNwb25zZV9vcHRpb25zKTtcblx0XHRcdHJlc29sdmUocmVzcG9uc2UpO1xuXHRcdH0pO1xuXG5cdFx0d3JpdGVUb1N0cmVhbShyZXEsIHJlcXVlc3QpO1xuXHR9KTtcbn1cbi8qKlxuICogUmVkaXJlY3QgY29kZSBtYXRjaGluZ1xuICpcbiAqIEBwYXJhbSAgIE51bWJlciAgIGNvZGUgIFN0YXR1cyBjb2RlXG4gKiBAcmV0dXJuICBCb29sZWFuXG4gKi9cbmZldGNoLmlzUmVkaXJlY3QgPSBmdW5jdGlvbiAoY29kZSkge1xuXHRyZXR1cm4gY29kZSA9PT0gMzAxIHx8IGNvZGUgPT09IDMwMiB8fCBjb2RlID09PSAzMDMgfHwgY29kZSA9PT0gMzA3IHx8IGNvZGUgPT09IDMwODtcbn07XG5cbi8vIGV4cG9zZSBQcm9taXNlXG5mZXRjaC5Qcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG5cbi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxudmFyIGludFRvQ2hhck1hcCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJy5zcGxpdCgnJyk7XG5cbi8qKlxuICogRW5jb2RlIGFuIGludGVnZXIgaW4gdGhlIHJhbmdlIG9mIDAgdG8gNjMgdG8gYSBzaW5nbGUgYmFzZSA2NCBkaWdpdC5cbiAqL1xudmFyIGVuY29kZSA9IGZ1bmN0aW9uIChudW1iZXIpIHtcbiAgaWYgKDAgPD0gbnVtYmVyICYmIG51bWJlciA8IGludFRvQ2hhck1hcC5sZW5ndGgpIHtcbiAgICByZXR1cm4gaW50VG9DaGFyTWFwW251bWJlcl07XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk11c3QgYmUgYmV0d2VlbiAwIGFuZCA2MzogXCIgKyBudW1iZXIpO1xufTtcblxuLyoqXG4gKiBEZWNvZGUgYSBzaW5nbGUgYmFzZSA2NCBjaGFyYWN0ZXIgY29kZSBkaWdpdCB0byBhbiBpbnRlZ2VyLiBSZXR1cm5zIC0xIG9uXG4gKiBmYWlsdXJlLlxuICovXG52YXIgZGVjb2RlJDEgPSBmdW5jdGlvbiAoY2hhckNvZGUpIHtcbiAgdmFyIGJpZ0EgPSA2NTsgICAgIC8vICdBJ1xuICB2YXIgYmlnWiA9IDkwOyAgICAgLy8gJ1onXG5cbiAgdmFyIGxpdHRsZUEgPSA5NzsgIC8vICdhJ1xuICB2YXIgbGl0dGxlWiA9IDEyMjsgLy8gJ3onXG5cbiAgdmFyIHplcm8gPSA0ODsgICAgIC8vICcwJ1xuICB2YXIgbmluZSA9IDU3OyAgICAgLy8gJzknXG5cbiAgdmFyIHBsdXMgPSA0MzsgICAgIC8vICcrJ1xuICB2YXIgc2xhc2ggPSA0NzsgICAgLy8gJy8nXG5cbiAgdmFyIGxpdHRsZU9mZnNldCA9IDI2O1xuICB2YXIgbnVtYmVyT2Zmc2V0ID0gNTI7XG5cbiAgLy8gMCAtIDI1OiBBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlxuICBpZiAoYmlnQSA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSBiaWdaKSB7XG4gICAgcmV0dXJuIChjaGFyQ29kZSAtIGJpZ0EpO1xuICB9XG5cbiAgLy8gMjYgLSA1MTogYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcbiAgaWYgKGxpdHRsZUEgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gbGl0dGxlWikge1xuICAgIHJldHVybiAoY2hhckNvZGUgLSBsaXR0bGVBICsgbGl0dGxlT2Zmc2V0KTtcbiAgfVxuXG4gIC8vIDUyIC0gNjE6IDAxMjM0NTY3ODlcbiAgaWYgKHplcm8gPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gbmluZSkge1xuICAgIHJldHVybiAoY2hhckNvZGUgLSB6ZXJvICsgbnVtYmVyT2Zmc2V0KTtcbiAgfVxuXG4gIC8vIDYyOiArXG4gIGlmIChjaGFyQ29kZSA9PSBwbHVzKSB7XG4gICAgcmV0dXJuIDYyO1xuICB9XG5cbiAgLy8gNjM6IC9cbiAgaWYgKGNoYXJDb2RlID09IHNsYXNoKSB7XG4gICAgcmV0dXJuIDYzO1xuICB9XG5cbiAgLy8gSW52YWxpZCBiYXNlNjQgZGlnaXQuXG4gIHJldHVybiAtMTtcbn07XG5cbnZhciBiYXNlNjQgPSB7XG5cdGVuY29kZTogZW5jb2RlLFxuXHRkZWNvZGU6IGRlY29kZSQxXG59O1xuXG4vKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXG4vKlxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxuICpcbiAqIEJhc2VkIG9uIHRoZSBCYXNlIDY0IFZMUSBpbXBsZW1lbnRhdGlvbiBpbiBDbG9zdXJlIENvbXBpbGVyOlxuICogaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jbG9zdXJlLWNvbXBpbGVyL3NvdXJjZS9icm93c2UvdHJ1bmsvc3JjL2NvbS9nb29nbGUvZGVidWdnaW5nL3NvdXJjZW1hcC9CYXNlNjRWTFEuamF2YVxuICpcbiAqIENvcHlyaWdodCAyMDExIFRoZSBDbG9zdXJlIENvbXBpbGVyIEF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmVcbiAqIG1ldDpcbiAqXG4gKiAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZVxuICogICAgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmdcbiAqICAgIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZFxuICogICAgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICogTmVpdGhlciB0aGUgbmFtZSBvZiBHb29nbGUgSW5jLiBub3IgdGhlIG5hbWVzIG9mIGl0c1xuICogICAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkXG4gKiAgICBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SU1xuICogXCJBUyBJU1wiIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVFxuICogTElNSVRFRCBUTywgVEhFIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SXG4gKiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVFxuICogT1dORVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsXG4gKiBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UXG4gKiBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSxcbiAqIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWVxuICogVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFXG4gKiBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICovXG5cblxuXG4vLyBBIHNpbmdsZSBiYXNlIDY0IGRpZ2l0IGNhbiBjb250YWluIDYgYml0cyBvZiBkYXRhLiBGb3IgdGhlIGJhc2UgNjQgdmFyaWFibGVcbi8vIGxlbmd0aCBxdWFudGl0aWVzIHdlIHVzZSBpbiB0aGUgc291cmNlIG1hcCBzcGVjLCB0aGUgZmlyc3QgYml0IGlzIHRoZSBzaWduLFxuLy8gdGhlIG5leHQgZm91ciBiaXRzIGFyZSB0aGUgYWN0dWFsIHZhbHVlLCBhbmQgdGhlIDZ0aCBiaXQgaXMgdGhlXG4vLyBjb250aW51YXRpb24gYml0LiBUaGUgY29udGludWF0aW9uIGJpdCB0ZWxscyB1cyB3aGV0aGVyIHRoZXJlIGFyZSBtb3JlXG4vLyBkaWdpdHMgaW4gdGhpcyB2YWx1ZSBmb2xsb3dpbmcgdGhpcyBkaWdpdC5cbi8vXG4vLyAgIENvbnRpbnVhdGlvblxuLy8gICB8ICAgIFNpZ25cbi8vICAgfCAgICB8XG4vLyAgIFYgICAgVlxuLy8gICAxMDEwMTFcblxudmFyIFZMUV9CQVNFX1NISUZUID0gNTtcblxuLy8gYmluYXJ5OiAxMDAwMDBcbnZhciBWTFFfQkFTRSA9IDEgPDwgVkxRX0JBU0VfU0hJRlQ7XG5cbi8vIGJpbmFyeTogMDExMTExXG52YXIgVkxRX0JBU0VfTUFTSyA9IFZMUV9CQVNFIC0gMTtcblxuLy8gYmluYXJ5OiAxMDAwMDBcbnZhciBWTFFfQ09OVElOVUFUSU9OX0JJVCA9IFZMUV9CQVNFO1xuXG4vKipcbiAqIENvbnZlcnRzIGZyb20gYSB0d28tY29tcGxlbWVudCB2YWx1ZSB0byBhIHZhbHVlIHdoZXJlIHRoZSBzaWduIGJpdCBpc1xuICogcGxhY2VkIGluIHRoZSBsZWFzdCBzaWduaWZpY2FudCBiaXQuICBGb3IgZXhhbXBsZSwgYXMgZGVjaW1hbHM6XG4gKiAgIDEgYmVjb21lcyAyICgxMCBiaW5hcnkpLCAtMSBiZWNvbWVzIDMgKDExIGJpbmFyeSlcbiAqICAgMiBiZWNvbWVzIDQgKDEwMCBiaW5hcnkpLCAtMiBiZWNvbWVzIDUgKDEwMSBiaW5hcnkpXG4gKi9cbmZ1bmN0aW9uIHRvVkxRU2lnbmVkKGFWYWx1ZSkge1xuICByZXR1cm4gYVZhbHVlIDwgMFxuICAgID8gKCgtYVZhbHVlKSA8PCAxKSArIDFcbiAgICA6IChhVmFsdWUgPDwgMSkgKyAwO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRvIGEgdHdvLWNvbXBsZW1lbnQgdmFsdWUgZnJvbSBhIHZhbHVlIHdoZXJlIHRoZSBzaWduIGJpdCBpc1xuICogcGxhY2VkIGluIHRoZSBsZWFzdCBzaWduaWZpY2FudCBiaXQuICBGb3IgZXhhbXBsZSwgYXMgZGVjaW1hbHM6XG4gKiAgIDIgKDEwIGJpbmFyeSkgYmVjb21lcyAxLCAzICgxMSBiaW5hcnkpIGJlY29tZXMgLTFcbiAqICAgNCAoMTAwIGJpbmFyeSkgYmVjb21lcyAyLCA1ICgxMDEgYmluYXJ5KSBiZWNvbWVzIC0yXG4gKi9cbmZ1bmN0aW9uIGZyb21WTFFTaWduZWQoYVZhbHVlKSB7XG4gIHZhciBpc05lZ2F0aXZlID0gKGFWYWx1ZSAmIDEpID09PSAxO1xuICB2YXIgc2hpZnRlZCA9IGFWYWx1ZSA+PiAxO1xuICByZXR1cm4gaXNOZWdhdGl2ZVxuICAgID8gLXNoaWZ0ZWRcbiAgICA6IHNoaWZ0ZWQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYmFzZSA2NCBWTFEgZW5jb2RlZCB2YWx1ZS5cbiAqL1xudmFyIGVuY29kZSQxID0gZnVuY3Rpb24gYmFzZTY0VkxRX2VuY29kZShhVmFsdWUpIHtcbiAgdmFyIGVuY29kZWQgPSBcIlwiO1xuICB2YXIgZGlnaXQ7XG5cbiAgdmFyIHZscSA9IHRvVkxRU2lnbmVkKGFWYWx1ZSk7XG5cbiAgZG8ge1xuICAgIGRpZ2l0ID0gdmxxICYgVkxRX0JBU0VfTUFTSztcbiAgICB2bHEgPj4+PSBWTFFfQkFTRV9TSElGVDtcbiAgICBpZiAodmxxID4gMCkge1xuICAgICAgLy8gVGhlcmUgYXJlIHN0aWxsIG1vcmUgZGlnaXRzIGluIHRoaXMgdmFsdWUsIHNvIHdlIG11c3QgbWFrZSBzdXJlIHRoZVxuICAgICAgLy8gY29udGludWF0aW9uIGJpdCBpcyBtYXJrZWQuXG4gICAgICBkaWdpdCB8PSBWTFFfQ09OVElOVUFUSU9OX0JJVDtcbiAgICB9XG4gICAgZW5jb2RlZCArPSBiYXNlNjQuZW5jb2RlKGRpZ2l0KTtcbiAgfSB3aGlsZSAodmxxID4gMCk7XG5cbiAgcmV0dXJuIGVuY29kZWQ7XG59O1xuXG4vKipcbiAqIERlY29kZXMgdGhlIG5leHQgYmFzZSA2NCBWTFEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gc3RyaW5nIGFuZCByZXR1cm5zIHRoZVxuICogdmFsdWUgYW5kIHRoZSByZXN0IG9mIHRoZSBzdHJpbmcgdmlhIHRoZSBvdXQgcGFyYW1ldGVyLlxuICovXG52YXIgZGVjb2RlJDIgPSBmdW5jdGlvbiBiYXNlNjRWTFFfZGVjb2RlKGFTdHIsIGFJbmRleCwgYU91dFBhcmFtKSB7XG4gIHZhciBzdHJMZW4gPSBhU3RyLmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IDA7XG4gIHZhciBzaGlmdCA9IDA7XG4gIHZhciBjb250aW51YXRpb24sIGRpZ2l0O1xuXG4gIGRvIHtcbiAgICBpZiAoYUluZGV4ID49IHN0ckxlbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgbW9yZSBkaWdpdHMgaW4gYmFzZSA2NCBWTFEgdmFsdWUuXCIpO1xuICAgIH1cblxuICAgIGRpZ2l0ID0gYmFzZTY0LmRlY29kZShhU3RyLmNoYXJDb2RlQXQoYUluZGV4KyspKTtcbiAgICBpZiAoZGlnaXQgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJhc2U2NCBkaWdpdDogXCIgKyBhU3RyLmNoYXJBdChhSW5kZXggLSAxKSk7XG4gICAgfVxuXG4gICAgY29udGludWF0aW9uID0gISEoZGlnaXQgJiBWTFFfQ09OVElOVUFUSU9OX0JJVCk7XG4gICAgZGlnaXQgJj0gVkxRX0JBU0VfTUFTSztcbiAgICByZXN1bHQgPSByZXN1bHQgKyAoZGlnaXQgPDwgc2hpZnQpO1xuICAgIHNoaWZ0ICs9IFZMUV9CQVNFX1NISUZUO1xuICB9IHdoaWxlIChjb250aW51YXRpb24pO1xuXG4gIGFPdXRQYXJhbS52YWx1ZSA9IGZyb21WTFFTaWduZWQocmVzdWx0KTtcbiAgYU91dFBhcmFtLnJlc3QgPSBhSW5kZXg7XG59O1xuXG52YXIgYmFzZTY0VmxxID0ge1xuXHRlbmNvZGU6IGVuY29kZSQxLFxuXHRkZWNvZGU6IGRlY29kZSQyXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbiwgYmFzZWRpciwgbW9kdWxlKSB7XG5cdHJldHVybiBtb2R1bGUgPSB7XG5cdCAgcGF0aDogYmFzZWRpcixcblx0ICBleHBvcnRzOiB7fSxcblx0ICByZXF1aXJlOiBmdW5jdGlvbiAocGF0aCwgYmFzZSkge1xuICAgICAgcmV0dXJuIGNvbW1vbmpzUmVxdWlyZShwYXRoLCAoYmFzZSA9PT0gdW5kZWZpbmVkIHx8IGJhc2UgPT09IG51bGwpID8gbW9kdWxlLnBhdGggOiBiYXNlKTtcbiAgICB9XG5cdH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcbn1cblxuZnVuY3Rpb24gY29tbW9uanNSZXF1aXJlICgpIHtcblx0dGhyb3cgbmV3IEVycm9yKCdEeW5hbWljIHJlcXVpcmVzIGFyZSBub3QgY3VycmVudGx5IHN1cHBvcnRlZCBieSBAcm9sbHVwL3BsdWdpbi1jb21tb25qcycpO1xufVxuXG52YXIgdXRpbCA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxuLyoqXG4gKiBUaGlzIGlzIGEgaGVscGVyIGZ1bmN0aW9uIGZvciBnZXR0aW5nIHZhbHVlcyBmcm9tIHBhcmFtZXRlci9vcHRpb25zXG4gKiBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSBhcmdzIFRoZSBvYmplY3Qgd2UgYXJlIGV4dHJhY3RpbmcgdmFsdWVzIGZyb21cbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSBhcmUgZ2V0dGluZy5cbiAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgQW4gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGlmIHRoZSBwcm9wZXJ0eSBpcyBtaXNzaW5nXG4gKiBmcm9tIHRoZSBvYmplY3QuIElmIHRoaXMgaXMgbm90IHNwZWNpZmllZCBhbmQgdGhlIHByb3BlcnR5IGlzIG1pc3NpbmcsIGFuXG4gKiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqL1xuZnVuY3Rpb24gZ2V0QXJnKGFBcmdzLCBhTmFtZSwgYURlZmF1bHRWYWx1ZSkge1xuICBpZiAoYU5hbWUgaW4gYUFyZ3MpIHtcbiAgICByZXR1cm4gYUFyZ3NbYU5hbWVdO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICByZXR1cm4gYURlZmF1bHRWYWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFOYW1lICsgJ1wiIGlzIGEgcmVxdWlyZWQgYXJndW1lbnQuJyk7XG4gIH1cbn1cbmV4cG9ydHMuZ2V0QXJnID0gZ2V0QXJnO1xuXG52YXIgdXJsUmVnZXhwID0gL14oPzooW1xcdytcXC0uXSspOik/XFwvXFwvKD86KFxcdys6XFx3KylAKT8oW1xcdy4tXSopKD86OihcXGQrKSk/KC4qKSQvO1xudmFyIGRhdGFVcmxSZWdleHAgPSAvXmRhdGE6LitcXCwuKyQvO1xuXG5mdW5jdGlvbiB1cmxQYXJzZShhVXJsKSB7XG4gIHZhciBtYXRjaCA9IGFVcmwubWF0Y2godXJsUmVnZXhwKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7XG4gICAgc2NoZW1lOiBtYXRjaFsxXSxcbiAgICBhdXRoOiBtYXRjaFsyXSxcbiAgICBob3N0OiBtYXRjaFszXSxcbiAgICBwb3J0OiBtYXRjaFs0XSxcbiAgICBwYXRoOiBtYXRjaFs1XVxuICB9O1xufVxuZXhwb3J0cy51cmxQYXJzZSA9IHVybFBhcnNlO1xuXG5mdW5jdGlvbiB1cmxHZW5lcmF0ZShhUGFyc2VkVXJsKSB7XG4gIHZhciB1cmwgPSAnJztcbiAgaWYgKGFQYXJzZWRVcmwuc2NoZW1lKSB7XG4gICAgdXJsICs9IGFQYXJzZWRVcmwuc2NoZW1lICsgJzonO1xuICB9XG4gIHVybCArPSAnLy8nO1xuICBpZiAoYVBhcnNlZFVybC5hdXRoKSB7XG4gICAgdXJsICs9IGFQYXJzZWRVcmwuYXV0aCArICdAJztcbiAgfVxuICBpZiAoYVBhcnNlZFVybC5ob3N0KSB7XG4gICAgdXJsICs9IGFQYXJzZWRVcmwuaG9zdDtcbiAgfVxuICBpZiAoYVBhcnNlZFVybC5wb3J0KSB7XG4gICAgdXJsICs9IFwiOlwiICsgYVBhcnNlZFVybC5wb3J0O1xuICB9XG4gIGlmIChhUGFyc2VkVXJsLnBhdGgpIHtcbiAgICB1cmwgKz0gYVBhcnNlZFVybC5wYXRoO1xuICB9XG4gIHJldHVybiB1cmw7XG59XG5leHBvcnRzLnVybEdlbmVyYXRlID0gdXJsR2VuZXJhdGU7XG5cbi8qKlxuICogTm9ybWFsaXplcyBhIHBhdGgsIG9yIHRoZSBwYXRoIHBvcnRpb24gb2YgYSBVUkw6XG4gKlxuICogLSBSZXBsYWNlcyBjb25zZWN1dGl2ZSBzbGFzaGVzIHdpdGggb25lIHNsYXNoLlxuICogLSBSZW1vdmVzIHVubmVjZXNzYXJ5ICcuJyBwYXJ0cy5cbiAqIC0gUmVtb3ZlcyB1bm5lY2Vzc2FyeSAnPGRpcj4vLi4nIHBhcnRzLlxuICpcbiAqIEJhc2VkIG9uIGNvZGUgaW4gdGhlIE5vZGUuanMgJ3BhdGgnIGNvcmUgbW9kdWxlLlxuICpcbiAqIEBwYXJhbSBhUGF0aCBUaGUgcGF0aCBvciB1cmwgdG8gbm9ybWFsaXplLlxuICovXG5mdW5jdGlvbiBub3JtYWxpemUoYVBhdGgpIHtcbiAgdmFyIHBhdGggPSBhUGF0aDtcbiAgdmFyIHVybCA9IHVybFBhcnNlKGFQYXRoKTtcbiAgaWYgKHVybCkge1xuICAgIGlmICghdXJsLnBhdGgpIHtcbiAgICAgIHJldHVybiBhUGF0aDtcbiAgICB9XG4gICAgcGF0aCA9IHVybC5wYXRoO1xuICB9XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpO1xuXG4gIHZhciBwYXJ0cyA9IHBhdGguc3BsaXQoL1xcLysvKTtcbiAgZm9yICh2YXIgcGFydCwgdXAgPSAwLCBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBwYXJ0ID0gcGFydHNbaV07XG4gICAgaWYgKHBhcnQgPT09ICcuJykge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAocGFydCA9PT0gJy4uJykge1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwID4gMCkge1xuICAgICAgaWYgKHBhcnQgPT09ICcnKSB7XG4gICAgICAgIC8vIFRoZSBmaXJzdCBwYXJ0IGlzIGJsYW5rIGlmIHRoZSBwYXRoIGlzIGFic29sdXRlLiBUcnlpbmcgdG8gZ29cbiAgICAgICAgLy8gYWJvdmUgdGhlIHJvb3QgaXMgYSBuby1vcC4gVGhlcmVmb3JlIHdlIGNhbiByZW1vdmUgYWxsICcuLicgcGFydHNcbiAgICAgICAgLy8gZGlyZWN0bHkgYWZ0ZXIgdGhlIHJvb3QuXG4gICAgICAgIHBhcnRzLnNwbGljZShpICsgMSwgdXApO1xuICAgICAgICB1cCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0cy5zcGxpY2UoaSwgMik7XG4gICAgICAgIHVwLS07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHBhdGggPSBwYXJ0cy5qb2luKCcvJyk7XG5cbiAgaWYgKHBhdGggPT09ICcnKSB7XG4gICAgcGF0aCA9IGlzQWJzb2x1dGUgPyAnLycgOiAnLic7XG4gIH1cblxuICBpZiAodXJsKSB7XG4gICAgdXJsLnBhdGggPSBwYXRoO1xuICAgIHJldHVybiB1cmxHZW5lcmF0ZSh1cmwpO1xuICB9XG4gIHJldHVybiBwYXRoO1xufVxuZXhwb3J0cy5ub3JtYWxpemUgPSBub3JtYWxpemU7XG5cbi8qKlxuICogSm9pbnMgdHdvIHBhdGhzL1VSTHMuXG4gKlxuICogQHBhcmFtIGFSb290IFRoZSByb290IHBhdGggb3IgVVJMLlxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBqb2luZWQgd2l0aCB0aGUgcm9vdC5cbiAqXG4gKiAtIElmIGFQYXRoIGlzIGEgVVJMIG9yIGEgZGF0YSBVUkksIGFQYXRoIGlzIHJldHVybmVkLCB1bmxlc3MgYVBhdGggaXMgYVxuICogICBzY2hlbWUtcmVsYXRpdmUgVVJMOiBUaGVuIHRoZSBzY2hlbWUgb2YgYVJvb3QsIGlmIGFueSwgaXMgcHJlcGVuZGVkXG4gKiAgIGZpcnN0LlxuICogLSBPdGhlcndpc2UgYVBhdGggaXMgYSBwYXRoLiBJZiBhUm9vdCBpcyBhIFVSTCwgdGhlbiBpdHMgcGF0aCBwb3J0aW9uXG4gKiAgIGlzIHVwZGF0ZWQgd2l0aCB0aGUgcmVzdWx0IGFuZCBhUm9vdCBpcyByZXR1cm5lZC4gT3RoZXJ3aXNlIHRoZSByZXN1bHRcbiAqICAgaXMgcmV0dXJuZWQuXG4gKiAgIC0gSWYgYVBhdGggaXMgYWJzb2x1dGUsIHRoZSByZXN1bHQgaXMgYVBhdGguXG4gKiAgIC0gT3RoZXJ3aXNlIHRoZSB0d28gcGF0aHMgYXJlIGpvaW5lZCB3aXRoIGEgc2xhc2guXG4gKiAtIEpvaW5pbmcgZm9yIGV4YW1wbGUgJ2h0dHA6Ly8nIGFuZCAnd3d3LmV4YW1wbGUuY29tJyBpcyBhbHNvIHN1cHBvcnRlZC5cbiAqL1xuZnVuY3Rpb24gam9pbihhUm9vdCwgYVBhdGgpIHtcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XG4gICAgYVJvb3QgPSBcIi5cIjtcbiAgfVxuICBpZiAoYVBhdGggPT09IFwiXCIpIHtcbiAgICBhUGF0aCA9IFwiLlwiO1xuICB9XG4gIHZhciBhUGF0aFVybCA9IHVybFBhcnNlKGFQYXRoKTtcbiAgdmFyIGFSb290VXJsID0gdXJsUGFyc2UoYVJvb3QpO1xuICBpZiAoYVJvb3RVcmwpIHtcbiAgICBhUm9vdCA9IGFSb290VXJsLnBhdGggfHwgJy8nO1xuICB9XG5cbiAgLy8gYGpvaW4oZm9vLCAnLy93d3cuZXhhbXBsZS5vcmcnKWBcbiAgaWYgKGFQYXRoVXJsICYmICFhUGF0aFVybC5zY2hlbWUpIHtcbiAgICBpZiAoYVJvb3RVcmwpIHtcbiAgICAgIGFQYXRoVXJsLnNjaGVtZSA9IGFSb290VXJsLnNjaGVtZTtcbiAgICB9XG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFQYXRoVXJsKTtcbiAgfVxuXG4gIGlmIChhUGF0aFVybCB8fCBhUGF0aC5tYXRjaChkYXRhVXJsUmVnZXhwKSkge1xuICAgIHJldHVybiBhUGF0aDtcbiAgfVxuXG4gIC8vIGBqb2luKCdodHRwOi8vJywgJ3d3dy5leGFtcGxlLmNvbScpYFxuICBpZiAoYVJvb3RVcmwgJiYgIWFSb290VXJsLmhvc3QgJiYgIWFSb290VXJsLnBhdGgpIHtcbiAgICBhUm9vdFVybC5ob3N0ID0gYVBhdGg7XG4gICAgcmV0dXJuIHVybEdlbmVyYXRlKGFSb290VXJsKTtcbiAgfVxuXG4gIHZhciBqb2luZWQgPSBhUGF0aC5jaGFyQXQoMCkgPT09ICcvJ1xuICAgID8gYVBhdGhcbiAgICA6IG5vcm1hbGl6ZShhUm9vdC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIGFQYXRoKTtcblxuICBpZiAoYVJvb3RVcmwpIHtcbiAgICBhUm9vdFVybC5wYXRoID0gam9pbmVkO1xuICAgIHJldHVybiB1cmxHZW5lcmF0ZShhUm9vdFVybCk7XG4gIH1cbiAgcmV0dXJuIGpvaW5lZDtcbn1cbmV4cG9ydHMuam9pbiA9IGpvaW47XG5cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uIChhUGF0aCkge1xuICByZXR1cm4gYVBhdGguY2hhckF0KDApID09PSAnLycgfHwgdXJsUmVnZXhwLnRlc3QoYVBhdGgpO1xufTtcblxuLyoqXG4gKiBNYWtlIGEgcGF0aCByZWxhdGl2ZSB0byBhIFVSTCBvciBhbm90aGVyIHBhdGguXG4gKlxuICogQHBhcmFtIGFSb290IFRoZSByb290IHBhdGggb3IgVVJMLlxuICogQHBhcmFtIGFQYXRoIFRoZSBwYXRoIG9yIFVSTCB0byBiZSBtYWRlIHJlbGF0aXZlIHRvIGFSb290LlxuICovXG5mdW5jdGlvbiByZWxhdGl2ZShhUm9vdCwgYVBhdGgpIHtcbiAgaWYgKGFSb290ID09PSBcIlwiKSB7XG4gICAgYVJvb3QgPSBcIi5cIjtcbiAgfVxuXG4gIGFSb290ID0gYVJvb3QucmVwbGFjZSgvXFwvJC8sICcnKTtcblxuICAvLyBJdCBpcyBwb3NzaWJsZSBmb3IgdGhlIHBhdGggdG8gYmUgYWJvdmUgdGhlIHJvb3QuIEluIHRoaXMgY2FzZSwgc2ltcGx5XG4gIC8vIGNoZWNraW5nIHdoZXRoZXIgdGhlIHJvb3QgaXMgYSBwcmVmaXggb2YgdGhlIHBhdGggd29uJ3Qgd29yay4gSW5zdGVhZCwgd2VcbiAgLy8gbmVlZCB0byByZW1vdmUgY29tcG9uZW50cyBmcm9tIHRoZSByb290IG9uZSBieSBvbmUsIHVudGlsIGVpdGhlciB3ZSBmaW5kXG4gIC8vIGEgcHJlZml4IHRoYXQgZml0cywgb3Igd2UgcnVuIG91dCBvZiBjb21wb25lbnRzIHRvIHJlbW92ZS5cbiAgdmFyIGxldmVsID0gMDtcbiAgd2hpbGUgKGFQYXRoLmluZGV4T2YoYVJvb3QgKyAnLycpICE9PSAwKSB7XG4gICAgdmFyIGluZGV4ID0gYVJvb3QubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHJldHVybiBhUGF0aDtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgb25seSBwYXJ0IG9mIHRoZSByb290IHRoYXQgaXMgbGVmdCBpcyB0aGUgc2NoZW1lIChpLmUuIGh0dHA6Ly8sXG4gICAgLy8gZmlsZTovLy8sIGV0Yy4pLCBvbmUgb3IgbW9yZSBzbGFzaGVzICgvKSwgb3Igc2ltcGx5IG5vdGhpbmcgYXQgYWxsLCB3ZVxuICAgIC8vIGhhdmUgZXhoYXVzdGVkIGFsbCBjb21wb25lbnRzLCBzbyB0aGUgcGF0aCBpcyBub3QgcmVsYXRpdmUgdG8gdGhlIHJvb3QuXG4gICAgYVJvb3QgPSBhUm9vdC5zbGljZSgwLCBpbmRleCk7XG4gICAgaWYgKGFSb290Lm1hdGNoKC9eKFteXFwvXSs6XFwvKT9cXC8qJC8pKSB7XG4gICAgICByZXR1cm4gYVBhdGg7XG4gICAgfVxuXG4gICAgKytsZXZlbDtcbiAgfVxuXG4gIC8vIE1ha2Ugc3VyZSB3ZSBhZGQgYSBcIi4uL1wiIGZvciBlYWNoIGNvbXBvbmVudCB3ZSByZW1vdmVkIGZyb20gdGhlIHJvb3QuXG4gIHJldHVybiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIuLi9cIikgKyBhUGF0aC5zdWJzdHIoYVJvb3QubGVuZ3RoICsgMSk7XG59XG5leHBvcnRzLnJlbGF0aXZlID0gcmVsYXRpdmU7XG5cbnZhciBzdXBwb3J0c051bGxQcm90byA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBvYmogPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gISgnX19wcm90b19fJyBpbiBvYmopO1xufSgpKTtcblxuZnVuY3Rpb24gaWRlbnRpdHkgKHMpIHtcbiAgcmV0dXJuIHM7XG59XG5cbi8qKlxuICogQmVjYXVzZSBiZWhhdmlvciBnb2VzIHdhY2t5IHdoZW4geW91IHNldCBgX19wcm90b19fYCBvbiBvYmplY3RzLCB3ZVxuICogaGF2ZSB0byBwcmVmaXggYWxsIHRoZSBzdHJpbmdzIGluIG91ciBzZXQgd2l0aCBhbiBhcmJpdHJhcnkgY2hhcmFjdGVyLlxuICpcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL3B1bGwvMzEgYW5kXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9zb3VyY2UtbWFwL2lzc3Vlcy8zMFxuICpcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxuICovXG5mdW5jdGlvbiB0b1NldFN0cmluZyhhU3RyKSB7XG4gIGlmIChpc1Byb3RvU3RyaW5nKGFTdHIpKSB7XG4gICAgcmV0dXJuICckJyArIGFTdHI7XG4gIH1cblxuICByZXR1cm4gYVN0cjtcbn1cbmV4cG9ydHMudG9TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogdG9TZXRTdHJpbmc7XG5cbmZ1bmN0aW9uIGZyb21TZXRTdHJpbmcoYVN0cikge1xuICBpZiAoaXNQcm90b1N0cmluZyhhU3RyKSkge1xuICAgIHJldHVybiBhU3RyLnNsaWNlKDEpO1xuICB9XG5cbiAgcmV0dXJuIGFTdHI7XG59XG5leHBvcnRzLmZyb21TZXRTdHJpbmcgPSBzdXBwb3J0c051bGxQcm90byA/IGlkZW50aXR5IDogZnJvbVNldFN0cmluZztcblxuZnVuY3Rpb24gaXNQcm90b1N0cmluZyhzKSB7XG4gIGlmICghcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBzLmxlbmd0aDtcblxuICBpZiAobGVuZ3RoIDwgOSAvKiBcIl9fcHJvdG9fX1wiLmxlbmd0aCAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChzLmNoYXJDb2RlQXQobGVuZ3RoIC0gMSkgIT09IDk1ICAvKiAnXycgKi8gfHxcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSAyKSAhPT0gOTUgIC8qICdfJyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDMpICE9PSAxMTEgLyogJ28nICovIHx8XG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNCkgIT09IDExNiAvKiAndCcgKi8gfHxcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA1KSAhPT0gMTExIC8qICdvJyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDYpICE9PSAxMTQgLyogJ3InICovIHx8XG4gICAgICBzLmNoYXJDb2RlQXQobGVuZ3RoIC0gNykgIT09IDExMiAvKiAncCcgKi8gfHxcbiAgICAgIHMuY2hhckNvZGVBdChsZW5ndGggLSA4KSAhPT0gOTUgIC8qICdfJyAqLyB8fFxuICAgICAgcy5jaGFyQ29kZUF0KGxlbmd0aCAtIDkpICE9PSA5NSAgLyogJ18nICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IGxlbmd0aCAtIDEwOyBpID49IDA7IGktLSkge1xuICAgIGlmIChzLmNoYXJDb2RlQXQoaSkgIT09IDM2IC8qICckJyAqLykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIENvbXBhcmF0b3IgYmV0d2VlbiB0d28gbWFwcGluZ3Mgd2hlcmUgdGhlIG9yaWdpbmFsIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXG4gKlxuICogT3B0aW9uYWxseSBwYXNzIGluIGB0cnVlYCBhcyBgb25seUNvbXBhcmVHZW5lcmF0ZWRgIHRvIGNvbnNpZGVyIHR3b1xuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBvcmlnaW5hbCBzb3VyY2UvbGluZS9jb2x1bW4sIGJ1dCBkaWZmZXJlbnQgZ2VuZXJhdGVkXG4gKiBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYSBtYXBwaW5nIHdpdGggYVxuICogc3R1YmJlZCBvdXQgbWFwcGluZy5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZU9yaWdpbmFsKSB7XG4gIHZhciBjbXAgPSBzdHJjbXAobWFwcGluZ0Euc291cmNlLCBtYXBwaW5nQi5zb3VyY2UpO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsTGluZSAtIG1hcHBpbmdCLm9yaWdpbmFsTGluZTtcbiAgaWYgKGNtcCAhPT0gMCkge1xuICAgIHJldHVybiBjbXA7XG4gIH1cblxuICBjbXAgPSBtYXBwaW5nQS5vcmlnaW5hbENvbHVtbiAtIG1hcHBpbmdCLm9yaWdpbmFsQ29sdW1uO1xuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlT3JpZ2luYWwpIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IG1hcHBpbmdBLmdlbmVyYXRlZExpbmUgLSBtYXBwaW5nQi5nZW5lcmF0ZWRMaW5lO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIHJldHVybiBzdHJjbXAobWFwcGluZ0EubmFtZSwgbWFwcGluZ0IubmFtZSk7XG59XG5leHBvcnRzLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zID0gY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnM7XG5cbi8qKlxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aXRoIGRlZmxhdGVkIHNvdXJjZSBhbmQgbmFtZSBpbmRpY2VzIHdoZXJlXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXG4gKlxuICogT3B0aW9uYWxseSBwYXNzIGluIGB0cnVlYCBhcyBgb25seUNvbXBhcmVHZW5lcmF0ZWRgIHRvIGNvbnNpZGVyIHR3b1xuICogbWFwcGluZ3Mgd2l0aCB0aGUgc2FtZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uLCBidXQgZGlmZmVyZW50XG4gKiBzb3VyY2UvbmFtZS9vcmlnaW5hbCBsaW5lIGFuZCBjb2x1bW4gdGhlIHNhbWUuIFVzZWZ1bCB3aGVuIHNlYXJjaGluZyBmb3IgYVxuICogbWFwcGluZyB3aXRoIGEgc3R1YmJlZCBvdXQgbWFwcGluZy5cbiAqL1xuZnVuY3Rpb24gY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQobWFwcGluZ0EsIG1hcHBpbmdCLCBvbmx5Q29tcGFyZUdlbmVyYXRlZCkge1xuICB2YXIgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xuICBpZiAoY21wICE9PSAwIHx8IG9ubHlDb21wYXJlR2VuZXJhdGVkKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcbn1cbmV4cG9ydHMuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQgPSBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNEZWZsYXRlZDtcblxuZnVuY3Rpb24gc3RyY21wKGFTdHIxLCBhU3RyMikge1xuICBpZiAoYVN0cjEgPT09IGFTdHIyKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAoYVN0cjEgPT09IG51bGwpIHtcbiAgICByZXR1cm4gMTsgLy8gYVN0cjIgIT09IG51bGxcbiAgfVxuXG4gIGlmIChhU3RyMiA9PT0gbnVsbCkge1xuICAgIHJldHVybiAtMTsgLy8gYVN0cjEgIT09IG51bGxcbiAgfVxuXG4gIGlmIChhU3RyMSA+IGFTdHIyKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogQ29tcGFyYXRvciBiZXR3ZWVuIHR3byBtYXBwaW5ncyB3aXRoIGluZmxhdGVkIHNvdXJjZSBhbmQgbmFtZSBzdHJpbmdzIHdoZXJlXG4gKiB0aGUgZ2VuZXJhdGVkIHBvc2l0aW9ucyBhcmUgY29tcGFyZWQuXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0luZmxhdGVkKG1hcHBpbmdBLCBtYXBwaW5nQikge1xuICB2YXIgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkTGluZSAtIG1hcHBpbmdCLmdlbmVyYXRlZExpbmU7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0EuZ2VuZXJhdGVkQ29sdW1uIC0gbWFwcGluZ0IuZ2VuZXJhdGVkQ29sdW1uO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IHN0cmNtcChtYXBwaW5nQS5zb3VyY2UsIG1hcHBpbmdCLnNvdXJjZSk7XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgY21wID0gbWFwcGluZ0Eub3JpZ2luYWxMaW5lIC0gbWFwcGluZ0Iub3JpZ2luYWxMaW5lO1xuICBpZiAoY21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGNtcDtcbiAgfVxuXG4gIGNtcCA9IG1hcHBpbmdBLm9yaWdpbmFsQ29sdW1uIC0gbWFwcGluZ0Iub3JpZ2luYWxDb2x1bW47XG4gIGlmIChjbXAgIT09IDApIHtcbiAgICByZXR1cm4gY21wO1xuICB9XG5cbiAgcmV0dXJuIHN0cmNtcChtYXBwaW5nQS5uYW1lLCBtYXBwaW5nQi5uYW1lKTtcbn1cbmV4cG9ydHMuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zSW5mbGF0ZWQgPSBjb21wYXJlQnlHZW5lcmF0ZWRQb3NpdGlvbnNJbmZsYXRlZDtcblxuLyoqXG4gKiBTdHJpcCBhbnkgSlNPTiBYU1NJIGF2b2lkYW5jZSBwcmVmaXggZnJvbSB0aGUgc3RyaW5nIChhcyBkb2N1bWVudGVkXG4gKiBpbiB0aGUgc291cmNlIG1hcHMgc3BlY2lmaWNhdGlvbiksIGFuZCB0aGVuIHBhcnNlIHRoZSBzdHJpbmcgYXNcbiAqIEpTT04uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlU291cmNlTWFwSW5wdXQoc3RyKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKHN0ci5yZXBsYWNlKC9eXFwpXX0nW15cXG5dKlxcbi8sICcnKSk7XG59XG5leHBvcnRzLnBhcnNlU291cmNlTWFwSW5wdXQgPSBwYXJzZVNvdXJjZU1hcElucHV0O1xuXG4vKipcbiAqIENvbXB1dGUgdGhlIFVSTCBvZiBhIHNvdXJjZSBnaXZlbiB0aGUgdGhlIHNvdXJjZSByb290LCB0aGUgc291cmNlJ3NcbiAqIFVSTCwgYW5kIHRoZSBzb3VyY2UgbWFwJ3MgVVJMLlxuICovXG5mdW5jdGlvbiBjb21wdXRlU291cmNlVVJMKHNvdXJjZVJvb3QsIHNvdXJjZVVSTCwgc291cmNlTWFwVVJMKSB7XG4gIHNvdXJjZVVSTCA9IHNvdXJjZVVSTCB8fCAnJztcblxuICBpZiAoc291cmNlUm9vdCkge1xuICAgIC8vIFRoaXMgZm9sbG93cyB3aGF0IENocm9tZSBkb2VzLlxuICAgIGlmIChzb3VyY2VSb290W3NvdXJjZVJvb3QubGVuZ3RoIC0gMV0gIT09ICcvJyAmJiBzb3VyY2VVUkxbMF0gIT09ICcvJykge1xuICAgICAgc291cmNlUm9vdCArPSAnLyc7XG4gICAgfVxuICAgIC8vIFRoZSBzcGVjIHNheXM6XG4gICAgLy8gICBMaW5lIDQ6IEFuIG9wdGlvbmFsIHNvdXJjZSByb290LCB1c2VmdWwgZm9yIHJlbG9jYXRpbmcgc291cmNlXG4gICAgLy8gICBmaWxlcyBvbiBhIHNlcnZlciBvciByZW1vdmluZyByZXBlYXRlZCB2YWx1ZXMgaW4gdGhlXG4gICAgLy8gICDigJxzb3VyY2Vz4oCdIGVudHJ5LiAgVGhpcyB2YWx1ZSBpcyBwcmVwZW5kZWQgdG8gdGhlIGluZGl2aWR1YWxcbiAgICAvLyAgIGVudHJpZXMgaW4gdGhlIOKAnHNvdXJjZeKAnSBmaWVsZC5cbiAgICBzb3VyY2VVUkwgPSBzb3VyY2VSb290ICsgc291cmNlVVJMO1xuICB9XG5cbiAgLy8gSGlzdG9yaWNhbGx5LCBTb3VyY2VNYXBDb25zdW1lciBkaWQgbm90IHRha2UgdGhlIHNvdXJjZU1hcFVSTCBhc1xuICAvLyBhIHBhcmFtZXRlci4gIFRoaXMgbW9kZSBpcyBzdGlsbCBzb21ld2hhdCBzdXBwb3J0ZWQsIHdoaWNoIGlzIHdoeVxuICAvLyB0aGlzIGNvZGUgYmxvY2sgaXMgY29uZGl0aW9uYWwuICBIb3dldmVyLCBpdCdzIHByZWZlcmFibGUgdG8gcGFzc1xuICAvLyB0aGUgc291cmNlIG1hcCBVUkwgdG8gU291cmNlTWFwQ29uc3VtZXIsIHNvIHRoYXQgdGhpcyBmdW5jdGlvblxuICAvLyBjYW4gaW1wbGVtZW50IHRoZSBzb3VyY2UgVVJMIHJlc29sdXRpb24gYWxnb3JpdGhtIGFzIG91dGxpbmVkIGluXG4gIC8vIHRoZSBzcGVjLiAgVGhpcyBibG9jayBpcyBiYXNpY2FsbHkgdGhlIGVxdWl2YWxlbnQgb2Y6XG4gIC8vICAgIG5ldyBVUkwoc291cmNlVVJMLCBzb3VyY2VNYXBVUkwpLnRvU3RyaW5nKClcbiAgLy8gLi4uIGV4Y2VwdCBpdCBhdm9pZHMgdXNpbmcgVVJMLCB3aGljaCB3YXNuJ3QgYXZhaWxhYmxlIGluIHRoZVxuICAvLyBvbGRlciByZWxlYXNlcyBvZiBub2RlIHN0aWxsIHN1cHBvcnRlZCBieSB0aGlzIGxpYnJhcnkuXG4gIC8vXG4gIC8vIFRoZSBzcGVjIHNheXM6XG4gIC8vICAgSWYgdGhlIHNvdXJjZXMgYXJlIG5vdCBhYnNvbHV0ZSBVUkxzIGFmdGVyIHByZXBlbmRpbmcgb2YgdGhlXG4gIC8vICAg4oCcc291cmNlUm9vdOKAnSwgdGhlIHNvdXJjZXMgYXJlIHJlc29sdmVkIHJlbGF0aXZlIHRvIHRoZVxuICAvLyAgIFNvdXJjZU1hcCAobGlrZSByZXNvbHZpbmcgc2NyaXB0IHNyYyBpbiBhIGh0bWwgZG9jdW1lbnQpLlxuICBpZiAoc291cmNlTWFwVVJMKSB7XG4gICAgdmFyIHBhcnNlZCA9IHVybFBhcnNlKHNvdXJjZU1hcFVSTCk7XG4gICAgaWYgKCFwYXJzZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInNvdXJjZU1hcFVSTCBjb3VsZCBub3QgYmUgcGFyc2VkXCIpO1xuICAgIH1cbiAgICBpZiAocGFyc2VkLnBhdGgpIHtcbiAgICAgIC8vIFN0cmlwIHRoZSBsYXN0IHBhdGggY29tcG9uZW50LCBidXQga2VlcCB0aGUgXCIvXCIuXG4gICAgICB2YXIgaW5kZXggPSBwYXJzZWQucGF0aC5sYXN0SW5kZXhPZignLycpO1xuICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgcGFyc2VkLnBhdGggPSBwYXJzZWQucGF0aC5zdWJzdHJpbmcoMCwgaW5kZXggKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlVVJMID0gam9pbih1cmxHZW5lcmF0ZShwYXJzZWQpLCBzb3VyY2VVUkwpO1xuICB9XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZShzb3VyY2VVUkwpO1xufVxuZXhwb3J0cy5jb21wdXRlU291cmNlVVJMID0gY29tcHV0ZVNvdXJjZVVSTDtcbn0pO1xuXG4vKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXG4vKlxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxuICovXG5cblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaGFzTmF0aXZlTWFwID0gdHlwZW9mIE1hcCAhPT0gXCJ1bmRlZmluZWRcIjtcblxuLyoqXG4gKiBBIGRhdGEgc3RydWN0dXJlIHdoaWNoIGlzIGEgY29tYmluYXRpb24gb2YgYW4gYXJyYXkgYW5kIGEgc2V0LiBBZGRpbmcgYSBuZXdcbiAqIG1lbWJlciBpcyBPKDEpLCB0ZXN0aW5nIGZvciBtZW1iZXJzaGlwIGlzIE8oMSksIGFuZCBmaW5kaW5nIHRoZSBpbmRleCBvZiBhblxuICogZWxlbWVudCBpcyBPKDEpLiBSZW1vdmluZyBlbGVtZW50cyBmcm9tIHRoZSBzZXQgaXMgbm90IHN1cHBvcnRlZC4gT25seVxuICogc3RyaW5ncyBhcmUgc3VwcG9ydGVkIGZvciBtZW1iZXJzaGlwLlxuICovXG5mdW5jdGlvbiBBcnJheVNldCgpIHtcbiAgdGhpcy5fYXJyYXkgPSBbXTtcbiAgdGhpcy5fc2V0ID0gaGFzTmF0aXZlTWFwID8gbmV3IE1hcCgpIDogT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cblxuLyoqXG4gKiBTdGF0aWMgbWV0aG9kIGZvciBjcmVhdGluZyBBcnJheVNldCBpbnN0YW5jZXMgZnJvbSBhbiBleGlzdGluZyBhcnJheS5cbiAqL1xuQXJyYXlTZXQuZnJvbUFycmF5ID0gZnVuY3Rpb24gQXJyYXlTZXRfZnJvbUFycmF5KGFBcnJheSwgYUFsbG93RHVwbGljYXRlcykge1xuICB2YXIgc2V0ID0gbmV3IEFycmF5U2V0KCk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhQXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBzZXQuYWRkKGFBcnJheVtpXSwgYUFsbG93RHVwbGljYXRlcyk7XG4gIH1cbiAgcmV0dXJuIHNldDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGhvdyBtYW55IHVuaXF1ZSBpdGVtcyBhcmUgaW4gdGhpcyBBcnJheVNldC4gSWYgZHVwbGljYXRlcyBoYXZlIGJlZW5cbiAqIGFkZGVkLCB0aGFuIHRob3NlIGRvIG5vdCBjb3VudCB0b3dhcmRzIHRoZSBzaXplLlxuICpcbiAqIEByZXR1cm5zIE51bWJlclxuICovXG5BcnJheVNldC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uIEFycmF5U2V0X3NpemUoKSB7XG4gIHJldHVybiBoYXNOYXRpdmVNYXAgPyB0aGlzLl9zZXQuc2l6ZSA6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX3NldCkubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBBZGQgdGhlIGdpdmVuIHN0cmluZyB0byB0aGlzIHNldC5cbiAqXG4gKiBAcGFyYW0gU3RyaW5nIGFTdHJcbiAqL1xuQXJyYXlTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIEFycmF5U2V0X2FkZChhU3RyLCBhQWxsb3dEdXBsaWNhdGVzKSB7XG4gIHZhciBzU3RyID0gaGFzTmF0aXZlTWFwID8gYVN0ciA6IHV0aWwudG9TZXRTdHJpbmcoYVN0cik7XG4gIHZhciBpc0R1cGxpY2F0ZSA9IGhhc05hdGl2ZU1hcCA/IHRoaXMuaGFzKGFTdHIpIDogaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKTtcbiAgdmFyIGlkeCA9IHRoaXMuX2FycmF5Lmxlbmd0aDtcbiAgaWYgKCFpc0R1cGxpY2F0ZSB8fCBhQWxsb3dEdXBsaWNhdGVzKSB7XG4gICAgdGhpcy5fYXJyYXkucHVzaChhU3RyKTtcbiAgfVxuICBpZiAoIWlzRHVwbGljYXRlKSB7XG4gICAgaWYgKGhhc05hdGl2ZU1hcCkge1xuICAgICAgdGhpcy5fc2V0LnNldChhU3RyLCBpZHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRbc1N0cl0gPSBpZHg7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIElzIHRoZSBnaXZlbiBzdHJpbmcgYSBtZW1iZXIgb2YgdGhpcyBzZXQ/XG4gKlxuICogQHBhcmFtIFN0cmluZyBhU3RyXG4gKi9cbkFycmF5U2V0LnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiBBcnJheVNldF9oYXMoYVN0cikge1xuICBpZiAoaGFzTmF0aXZlTWFwKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldC5oYXMoYVN0cik7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNTdHIgPSB1dGlsLnRvU2V0U3RyaW5nKGFTdHIpO1xuICAgIHJldHVybiBoYXMuY2FsbCh0aGlzLl9zZXQsIHNTdHIpO1xuICB9XG59O1xuXG4vKipcbiAqIFdoYXQgaXMgdGhlIGluZGV4IG9mIHRoZSBnaXZlbiBzdHJpbmcgaW4gdGhlIGFycmF5P1xuICpcbiAqIEBwYXJhbSBTdHJpbmcgYVN0clxuICovXG5BcnJheVNldC5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIEFycmF5U2V0X2luZGV4T2YoYVN0cikge1xuICBpZiAoaGFzTmF0aXZlTWFwKSB7XG4gICAgdmFyIGlkeCA9IHRoaXMuX3NldC5nZXQoYVN0cik7XG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBzU3RyID0gdXRpbC50b1NldFN0cmluZyhhU3RyKTtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5fc2V0LCBzU3RyKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NldFtzU3RyXTtcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGFTdHIgKyAnXCIgaXMgbm90IGluIHRoZSBzZXQuJyk7XG59O1xuXG4vKipcbiAqIFdoYXQgaXMgdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuIGluZGV4P1xuICpcbiAqIEBwYXJhbSBOdW1iZXIgYUlkeFxuICovXG5BcnJheVNldC5wcm90b3R5cGUuYXQgPSBmdW5jdGlvbiBBcnJheVNldF9hdChhSWR4KSB7XG4gIGlmIChhSWR4ID49IDAgJiYgYUlkeCA8IHRoaXMuX2FycmF5Lmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzLl9hcnJheVthSWR4XTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoJ05vIGVsZW1lbnQgaW5kZXhlZCBieSAnICsgYUlkeCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGFycmF5IHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgc2V0ICh3aGljaCBoYXMgdGhlIHByb3BlciBpbmRpY2VzXG4gKiBpbmRpY2F0ZWQgYnkgaW5kZXhPZikuIE5vdGUgdGhhdCB0aGlzIGlzIGEgY29weSBvZiB0aGUgaW50ZXJuYWwgYXJyYXkgdXNlZFxuICogZm9yIHN0b3JpbmcgdGhlIG1lbWJlcnMgc28gdGhhdCBubyBvbmUgY2FuIG1lc3Mgd2l0aCBpbnRlcm5hbCBzdGF0ZS5cbiAqL1xuQXJyYXlTZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiBBcnJheVNldF90b0FycmF5KCkge1xuICByZXR1cm4gdGhpcy5fYXJyYXkuc2xpY2UoKTtcbn07XG5cbnZhciBBcnJheVNldF8xID0gQXJyYXlTZXQ7XG5cbnZhciBhcnJheVNldCA9IHtcblx0QXJyYXlTZXQ6IEFycmF5U2V0XzFcbn07XG5cbnZhciBiaW5hcnlTZWFyY2ggPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlLCBleHBvcnRzKSB7XG4vKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXG4vKlxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxuICovXG5cbmV4cG9ydHMuR1JFQVRFU1RfTE9XRVJfQk9VTkQgPSAxO1xuZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCA9IDI7XG5cbi8qKlxuICogUmVjdXJzaXZlIGltcGxlbWVudGF0aW9uIG9mIGJpbmFyeSBzZWFyY2guXG4gKlxuICogQHBhcmFtIGFMb3cgSW5kaWNlcyBoZXJlIGFuZCBsb3dlciBkbyBub3QgY29udGFpbiB0aGUgbmVlZGxlLlxuICogQHBhcmFtIGFIaWdoIEluZGljZXMgaGVyZSBhbmQgaGlnaGVyIGRvIG5vdCBjb250YWluIHRoZSBuZWVkbGUuXG4gKiBAcGFyYW0gYU5lZWRsZSBUaGUgZWxlbWVudCBiZWluZyBzZWFyY2hlZCBmb3IuXG4gKiBAcGFyYW0gYUhheXN0YWNrIFRoZSBub24tZW1wdHkgYXJyYXkgYmVpbmcgc2VhcmNoZWQuXG4gKiBAcGFyYW0gYUNvbXBhcmUgRnVuY3Rpb24gd2hpY2ggdGFrZXMgdHdvIGVsZW1lbnRzIGFuZCByZXR1cm5zIC0xLCAwLCBvciAxLlxuICogQHBhcmFtIGFCaWFzIEVpdGhlciAnYmluYXJ5U2VhcmNoLkdSRUFURVNUX0xPV0VSX0JPVU5EJyBvclxuICogICAgICdiaW5hcnlTZWFyY2guTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxuICovXG5mdW5jdGlvbiByZWN1cnNpdmVTZWFyY2goYUxvdywgYUhpZ2gsIGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKSB7XG4gIC8vIFRoaXMgZnVuY3Rpb24gdGVybWluYXRlcyB3aGVuIG9uZSBvZiB0aGUgZm9sbG93aW5nIGlzIHRydWU6XG4gIC8vXG4gIC8vICAgMS4gV2UgZmluZCB0aGUgZXhhY3QgZWxlbWVudCB3ZSBhcmUgbG9va2luZyBmb3IuXG4gIC8vXG4gIC8vICAgMi4gV2UgZGlkIG5vdCBmaW5kIHRoZSBleGFjdCBlbGVtZW50LCBidXQgd2UgY2FuIHJldHVybiB0aGUgaW5kZXggb2ZcbiAgLy8gICAgICB0aGUgbmV4dC1jbG9zZXN0IGVsZW1lbnQuXG4gIC8vXG4gIC8vICAgMy4gV2UgZGlkIG5vdCBmaW5kIHRoZSBleGFjdCBlbGVtZW50LCBhbmQgdGhlcmUgaXMgbm8gbmV4dC1jbG9zZXN0XG4gIC8vICAgICAgZWxlbWVudCB0aGFuIHRoZSBvbmUgd2UgYXJlIHNlYXJjaGluZyBmb3IsIHNvIHdlIHJldHVybiAtMS5cbiAgdmFyIG1pZCA9IE1hdGguZmxvb3IoKGFIaWdoIC0gYUxvdykgLyAyKSArIGFMb3c7XG4gIHZhciBjbXAgPSBhQ29tcGFyZShhTmVlZGxlLCBhSGF5c3RhY2tbbWlkXSwgdHJ1ZSk7XG4gIGlmIChjbXAgPT09IDApIHtcbiAgICAvLyBGb3VuZCB0aGUgZWxlbWVudCB3ZSBhcmUgbG9va2luZyBmb3IuXG4gICAgcmV0dXJuIG1pZDtcbiAgfVxuICBlbHNlIGlmIChjbXAgPiAwKSB7XG4gICAgLy8gT3VyIG5lZWRsZSBpcyBncmVhdGVyIHRoYW4gYUhheXN0YWNrW21pZF0uXG4gICAgaWYgKGFIaWdoIC0gbWlkID4gMSkge1xuICAgICAgLy8gVGhlIGVsZW1lbnQgaXMgaW4gdGhlIHVwcGVyIGhhbGYuXG4gICAgICByZXR1cm4gcmVjdXJzaXZlU2VhcmNoKG1pZCwgYUhpZ2gsIGFOZWVkbGUsIGFIYXlzdGFjaywgYUNvbXBhcmUsIGFCaWFzKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgZXhhY3QgbmVlZGxlIGVsZW1lbnQgd2FzIG5vdCBmb3VuZCBpbiB0aGlzIGhheXN0YWNrLiBEZXRlcm1pbmUgaWZcbiAgICAvLyB3ZSBhcmUgaW4gdGVybWluYXRpb24gY2FzZSAoMykgb3IgKDIpIGFuZCByZXR1cm4gdGhlIGFwcHJvcHJpYXRlIHRoaW5nLlxuICAgIGlmIChhQmlhcyA9PSBleHBvcnRzLkxFQVNUX1VQUEVSX0JPVU5EKSB7XG4gICAgICByZXR1cm4gYUhpZ2ggPCBhSGF5c3RhY2subGVuZ3RoID8gYUhpZ2ggOiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1pZDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gT3VyIG5lZWRsZSBpcyBsZXNzIHRoYW4gYUhheXN0YWNrW21pZF0uXG4gICAgaWYgKG1pZCAtIGFMb3cgPiAxKSB7XG4gICAgICAvLyBUaGUgZWxlbWVudCBpcyBpbiB0aGUgbG93ZXIgaGFsZi5cbiAgICAgIHJldHVybiByZWN1cnNpdmVTZWFyY2goYUxvdywgbWlkLCBhTmVlZGxlLCBhSGF5c3RhY2ssIGFDb21wYXJlLCBhQmlhcyk7XG4gICAgfVxuXG4gICAgLy8gd2UgYXJlIGluIHRlcm1pbmF0aW9uIGNhc2UgKDMpIG9yICgyKSBhbmQgcmV0dXJuIHRoZSBhcHByb3ByaWF0ZSB0aGluZy5cbiAgICBpZiAoYUJpYXMgPT0gZXhwb3J0cy5MRUFTVF9VUFBFUl9CT1VORCkge1xuICAgICAgcmV0dXJuIG1pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFMb3cgPCAwID8gLTEgOiBhTG93O1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgYmluYXJ5IHNlYXJjaCB3aGljaCB3aWxsIGFsd2F5cyB0cnkgYW5kIHJldHVyblxuICogdGhlIGluZGV4IG9mIHRoZSBjbG9zZXN0IGVsZW1lbnQgaWYgdGhlcmUgaXMgbm8gZXhhY3QgaGl0LiBUaGlzIGlzIGJlY2F1c2VcbiAqIG1hcHBpbmdzIGJldHdlZW4gb3JpZ2luYWwgYW5kIGdlbmVyYXRlZCBsaW5lL2NvbCBwYWlycyBhcmUgc2luZ2xlIHBvaW50cyxcbiAqIGFuZCB0aGVyZSBpcyBhbiBpbXBsaWNpdCByZWdpb24gYmV0d2VlbiBlYWNoIG9mIHRoZW0sIHNvIGEgbWlzcyBqdXN0IG1lYW5zXG4gKiB0aGF0IHlvdSBhcmVuJ3Qgb24gdGhlIHZlcnkgc3RhcnQgb2YgYSByZWdpb24uXG4gKlxuICogQHBhcmFtIGFOZWVkbGUgVGhlIGVsZW1lbnQgeW91IGFyZSBsb29raW5nIGZvci5cbiAqIEBwYXJhbSBhSGF5c3RhY2sgVGhlIGFycmF5IHRoYXQgaXMgYmVpbmcgc2VhcmNoZWQuXG4gKiBAcGFyYW0gYUNvbXBhcmUgQSBmdW5jdGlvbiB3aGljaCB0YWtlcyB0aGUgbmVlZGxlIGFuZCBhbiBlbGVtZW50IGluIHRoZVxuICogICAgIGFycmF5IGFuZCByZXR1cm5zIC0xLCAwLCBvciAxIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBuZWVkbGUgaXMgbGVzc1xuICogICAgIHRoYW4sIGVxdWFsIHRvLCBvciBncmVhdGVyIHRoYW4gdGhlIGVsZW1lbnQsIHJlc3BlY3RpdmVseS5cbiAqIEBwYXJhbSBhQmlhcyBFaXRoZXIgJ2JpbmFyeVNlYXJjaC5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcbiAqICAgICAnYmluYXJ5U2VhcmNoLkxFQVNUX1VQUEVSX0JPVU5EJy4gU3BlY2lmaWVzIHdoZXRoZXIgdG8gcmV0dXJuIHRoZVxuICogICAgIGNsb3Nlc3QgZWxlbWVudCB0aGF0IGlzIHNtYWxsZXIgdGhhbiBvciBncmVhdGVyIHRoYW4gdGhlIG9uZSB3ZSBhcmVcbiAqICAgICBzZWFyY2hpbmcgZm9yLCByZXNwZWN0aXZlbHksIGlmIHRoZSBleGFjdCBlbGVtZW50IGNhbm5vdCBiZSBmb3VuZC5cbiAqICAgICBEZWZhdWx0cyB0byAnYmluYXJ5U2VhcmNoLkdSRUFURVNUX0xPV0VSX0JPVU5EJy5cbiAqL1xuZXhwb3J0cy5zZWFyY2ggPSBmdW5jdGlvbiBzZWFyY2goYU5lZWRsZSwgYUhheXN0YWNrLCBhQ29tcGFyZSwgYUJpYXMpIHtcbiAgaWYgKGFIYXlzdGFjay5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICB2YXIgaW5kZXggPSByZWN1cnNpdmVTZWFyY2goLTEsIGFIYXlzdGFjay5sZW5ndGgsIGFOZWVkbGUsIGFIYXlzdGFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFDb21wYXJlLCBhQmlhcyB8fCBleHBvcnRzLkdSRUFURVNUX0xPV0VSX0JPVU5EKTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8vIFdlIGhhdmUgZm91bmQgZWl0aGVyIHRoZSBleGFjdCBlbGVtZW50LCBvciB0aGUgbmV4dC1jbG9zZXN0IGVsZW1lbnQgdGhhblxuICAvLyB0aGUgb25lIHdlIGFyZSBzZWFyY2hpbmcgZm9yLiBIb3dldmVyLCB0aGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBzdWNoXG4gIC8vIGVsZW1lbnQuIE1ha2Ugc3VyZSB3ZSBhbHdheXMgcmV0dXJuIHRoZSBzbWFsbGVzdCBvZiB0aGVzZS5cbiAgd2hpbGUgKGluZGV4IC0gMSA+PSAwKSB7XG4gICAgaWYgKGFDb21wYXJlKGFIYXlzdGFja1tpbmRleF0sIGFIYXlzdGFja1tpbmRleCAtIDFdLCB0cnVlKSAhPT0gMCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC0taW5kZXg7XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59O1xufSk7XG5cbi8qIC0qLSBNb2RlOiBqczsganMtaW5kZW50LWxldmVsOiAyOyAtKi0gKi9cbi8qXG4gKiBDb3B5cmlnaHQgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb24gYW5kIGNvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgbGljZW5zZS4gU2VlIExJQ0VOU0Ugb3I6XG4gKiBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvQlNELTMtQ2xhdXNlXG4gKi9cblxuLy8gSXQgdHVybnMgb3V0IHRoYXQgc29tZSAobW9zdD8pIEphdmFTY3JpcHQgZW5naW5lcyBkb24ndCBzZWxmLWhvc3Rcbi8vIGBBcnJheS5wcm90b3R5cGUuc29ydGAuIFRoaXMgbWFrZXMgc2Vuc2UgYmVjYXVzZSBDKysgd2lsbCBsaWtlbHkgcmVtYWluXG4vLyBmYXN0ZXIgdGhhbiBKUyB3aGVuIGRvaW5nIHJhdyBDUFUtaW50ZW5zaXZlIHNvcnRpbmcuIEhvd2V2ZXIsIHdoZW4gdXNpbmcgYVxuLy8gY3VzdG9tIGNvbXBhcmF0b3IgZnVuY3Rpb24sIGNhbGxpbmcgYmFjayBhbmQgZm9ydGggYmV0d2VlbiB0aGUgVk0ncyBDKysgYW5kXG4vLyBKSVQnZCBKUyBpcyByYXRoZXIgc2xvdyAqYW5kKiBsb3NlcyBKSVQgdHlwZSBpbmZvcm1hdGlvbiwgcmVzdWx0aW5nIGluXG4vLyB3b3JzZSBnZW5lcmF0ZWQgY29kZSBmb3IgdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24gdGhhbiB3b3VsZCBiZSBvcHRpbWFsLiBJblxuLy8gZmFjdCwgd2hlbiBzb3J0aW5nIHdpdGggYSBjb21wYXJhdG9yLCB0aGVzZSBjb3N0cyBvdXR3ZWlnaCB0aGUgYmVuZWZpdHMgb2Zcbi8vIHNvcnRpbmcgaW4gQysrLiBCeSB1c2luZyBvdXIgb3duIEpTLWltcGxlbWVudGVkIFF1aWNrIFNvcnQgKGJlbG93KSwgd2UgZ2V0XG4vLyBhIH4zNTAwbXMgbWVhbiBzcGVlZC11cCBpbiBgYmVuY2gvYmVuY2guaHRtbGAuXG5cbi8qKlxuICogU3dhcCB0aGUgZWxlbWVudHMgaW5kZXhlZCBieSBgeGAgYW5kIGB5YCBpbiB0aGUgYXJyYXkgYGFyeWAuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJ5XG4gKiAgICAgICAgVGhlIGFycmF5LlxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqICAgICAgICBUaGUgaW5kZXggb2YgdGhlIGZpcnN0IGl0ZW0uXG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogICAgICAgIFRoZSBpbmRleCBvZiB0aGUgc2Vjb25kIGl0ZW0uXG4gKi9cbmZ1bmN0aW9uIHN3YXAoYXJ5LCB4LCB5KSB7XG4gIHZhciB0ZW1wID0gYXJ5W3hdO1xuICBhcnlbeF0gPSBhcnlbeV07XG4gIGFyeVt5XSA9IHRlbXA7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJhbmRvbSBpbnRlZ2VyIHdpdGhpbiB0aGUgcmFuZ2UgYGxvdyAuLiBoaWdoYCBpbmNsdXNpdmUuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGxvd1xuICogICAgICAgIFRoZSBsb3dlciBib3VuZCBvbiB0aGUgcmFuZ2UuXG4gKiBAcGFyYW0ge051bWJlcn0gaGlnaFxuICogICAgICAgIFRoZSB1cHBlciBib3VuZCBvbiB0aGUgcmFuZ2UuXG4gKi9cbmZ1bmN0aW9uIHJhbmRvbUludEluUmFuZ2UobG93LCBoaWdoKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKGxvdyArIChNYXRoLnJhbmRvbSgpICogKGhpZ2ggLSBsb3cpKSk7XG59XG5cbi8qKlxuICogVGhlIFF1aWNrIFNvcnQgYWxnb3JpdGhtLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyeVxuICogICAgICAgIEFuIGFycmF5IHRvIHNvcnQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb21wYXJhdG9yXG4gKiAgICAgICAgRnVuY3Rpb24gdG8gdXNlIHRvIGNvbXBhcmUgdHdvIGl0ZW1zLlxuICogQHBhcmFtIHtOdW1iZXJ9IHBcbiAqICAgICAgICBTdGFydCBpbmRleCBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSByXG4gKiAgICAgICAgRW5kIGluZGV4IG9mIHRoZSBhcnJheVxuICovXG5mdW5jdGlvbiBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIHAsIHIpIHtcbiAgLy8gSWYgb3VyIGxvd2VyIGJvdW5kIGlzIGxlc3MgdGhhbiBvdXIgdXBwZXIgYm91bmQsIHdlICgxKSBwYXJ0aXRpb24gdGhlXG4gIC8vIGFycmF5IGludG8gdHdvIHBpZWNlcyBhbmQgKDIpIHJlY3Vyc2Ugb24gZWFjaCBoYWxmLiBJZiBpdCBpcyBub3QsIHRoaXMgaXNcbiAgLy8gdGhlIGVtcHR5IGFycmF5IGFuZCBvdXIgYmFzZSBjYXNlLlxuXG4gIGlmIChwIDwgcikge1xuICAgIC8vICgxKSBQYXJ0aXRpb25pbmcuXG4gICAgLy9cbiAgICAvLyBUaGUgcGFydGl0aW9uaW5nIGNob29zZXMgYSBwaXZvdCBiZXR3ZWVuIGBwYCBhbmQgYHJgIGFuZCBtb3ZlcyBhbGxcbiAgICAvLyBlbGVtZW50cyB0aGF0IGFyZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHBpdm90IHRvIHRoZSBiZWZvcmUgaXQsIGFuZFxuICAgIC8vIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBhcmUgZ3JlYXRlciB0aGFuIGl0IGFmdGVyIGl0LiBUaGUgZWZmZWN0IGlzIHRoYXRcbiAgICAvLyBvbmNlIHBhcnRpdGlvbiBpcyBkb25lLCB0aGUgcGl2b3QgaXMgaW4gdGhlIGV4YWN0IHBsYWNlIGl0IHdpbGwgYmUgd2hlblxuICAgIC8vIHRoZSBhcnJheSBpcyBwdXQgaW4gc29ydGVkIG9yZGVyLCBhbmQgaXQgd2lsbCBub3QgbmVlZCB0byBiZSBtb3ZlZFxuICAgIC8vIGFnYWluLiBUaGlzIHJ1bnMgaW4gTyhuKSB0aW1lLlxuXG4gICAgLy8gQWx3YXlzIGNob29zZSBhIHJhbmRvbSBwaXZvdCBzbyB0aGF0IGFuIGlucHV0IGFycmF5IHdoaWNoIGlzIHJldmVyc2VcbiAgICAvLyBzb3J0ZWQgZG9lcyBub3QgY2F1c2UgTyhuXjIpIHJ1bm5pbmcgdGltZS5cbiAgICB2YXIgcGl2b3RJbmRleCA9IHJhbmRvbUludEluUmFuZ2UocCwgcik7XG4gICAgdmFyIGkgPSBwIC0gMTtcblxuICAgIHN3YXAoYXJ5LCBwaXZvdEluZGV4LCByKTtcbiAgICB2YXIgcGl2b3QgPSBhcnlbcl07XG5cbiAgICAvLyBJbW1lZGlhdGVseSBhZnRlciBgamAgaXMgaW5jcmVtZW50ZWQgaW4gdGhpcyBsb29wLCB0aGUgZm9sbG93aW5nIGhvbGRcbiAgICAvLyB0cnVlOlxuICAgIC8vXG4gICAgLy8gICAqIEV2ZXJ5IGVsZW1lbnQgaW4gYGFyeVtwIC4uIGldYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHBpdm90LlxuICAgIC8vXG4gICAgLy8gICAqIEV2ZXJ5IGVsZW1lbnQgaW4gYGFyeVtpKzEgLi4gai0xXWAgaXMgZ3JlYXRlciB0aGFuIHRoZSBwaXZvdC5cbiAgICBmb3IgKHZhciBqID0gcDsgaiA8IHI7IGorKykge1xuICAgICAgaWYgKGNvbXBhcmF0b3IoYXJ5W2pdLCBwaXZvdCkgPD0gMCkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIHN3YXAoYXJ5LCBpLCBqKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2FwKGFyeSwgaSArIDEsIGopO1xuICAgIHZhciBxID0gaSArIDE7XG5cbiAgICAvLyAoMikgUmVjdXJzZSBvbiBlYWNoIGhhbGYuXG5cbiAgICBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIHAsIHEgLSAxKTtcbiAgICBkb1F1aWNrU29ydChhcnksIGNvbXBhcmF0b3IsIHEgKyAxLCByKTtcbiAgfVxufVxuXG4vKipcbiAqIFNvcnQgdGhlIGdpdmVuIGFycmF5IGluLXBsYWNlIHdpdGggdGhlIGdpdmVuIGNvbXBhcmF0b3IgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJ5XG4gKiAgICAgICAgQW4gYXJyYXkgdG8gc29ydC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbXBhcmF0b3JcbiAqICAgICAgICBGdW5jdGlvbiB0byB1c2UgdG8gY29tcGFyZSB0d28gaXRlbXMuXG4gKi9cbnZhciBxdWlja1NvcnRfMSA9IGZ1bmN0aW9uIChhcnksIGNvbXBhcmF0b3IpIHtcbiAgZG9RdWlja1NvcnQoYXJ5LCBjb21wYXJhdG9yLCAwLCBhcnkubGVuZ3RoIC0gMSk7XG59O1xuXG52YXIgcXVpY2tTb3J0ID0ge1xuXHRxdWlja1NvcnQ6IHF1aWNrU29ydF8xXG59O1xuXG4vKiAtKi0gTW9kZToganM7IGpzLWluZGVudC1sZXZlbDogMjsgLSotICovXG4vKlxuICogQ29weXJpZ2h0IDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uIGFuZCBjb250cmlidXRvcnNcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIGxpY2Vuc2UuIFNlZSBMSUNFTlNFIG9yOlxuICogaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL0JTRC0zLUNsYXVzZVxuICovXG5cblxuXG52YXIgQXJyYXlTZXQkMSA9IGFycmF5U2V0LkFycmF5U2V0O1xuXG52YXIgcXVpY2tTb3J0JDEgPSBxdWlja1NvcnQucXVpY2tTb3J0O1xuXG5mdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XG4gIHZhciBzb3VyY2VNYXAgPSBhU291cmNlTWFwO1xuICBpZiAodHlwZW9mIGFTb3VyY2VNYXAgPT09ICdzdHJpbmcnKSB7XG4gICAgc291cmNlTWFwID0gdXRpbC5wYXJzZVNvdXJjZU1hcElucHV0KGFTb3VyY2VNYXApO1xuICB9XG5cbiAgcmV0dXJuIHNvdXJjZU1hcC5zZWN0aW9ucyAhPSBudWxsXG4gICAgPyBuZXcgSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyKHNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTClcbiAgICA6IG5ldyBCYXNpY1NvdXJjZU1hcENvbnN1bWVyKHNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCk7XG59XG5cblNvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXAgPSBmdW5jdGlvbihhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XG4gIHJldHVybiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyLmZyb21Tb3VyY2VNYXAoYVNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCk7XG59O1xuXG4vKipcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwcGluZyBzcGVjIHRoYXQgd2UgYXJlIGNvbnN1bWluZy5cbiAqL1xuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl92ZXJzaW9uID0gMztcblxuLy8gYF9fZ2VuZXJhdGVkTWFwcGluZ3NgIGFuZCBgX19vcmlnaW5hbE1hcHBpbmdzYCBhcmUgYXJyYXlzIHRoYXQgaG9sZCB0aGVcbi8vIHBhcnNlZCBtYXBwaW5nIGNvb3JkaW5hdGVzIGZyb20gdGhlIHNvdXJjZSBtYXAncyBcIm1hcHBpbmdzXCIgYXR0cmlidXRlLiBUaGV5XG4vLyBhcmUgbGF6aWx5IGluc3RhbnRpYXRlZCwgYWNjZXNzZWQgdmlhIHRoZSBgX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcbi8vIGBfb3JpZ2luYWxNYXBwaW5nc2AgZ2V0dGVycyByZXNwZWN0aXZlbHksIGFuZCB3ZSBvbmx5IHBhcnNlIHRoZSBtYXBwaW5nc1xuLy8gYW5kIGNyZWF0ZSB0aGVzZSBhcnJheXMgb25jZSBxdWVyaWVkIGZvciBhIHNvdXJjZSBsb2NhdGlvbi4gV2UganVtcCB0aHJvdWdoXG4vLyB0aGVzZSBob29wcyBiZWNhdXNlIHRoZXJlIGNhbiBiZSBtYW55IHRob3VzYW5kcyBvZiBtYXBwaW5ncywgYW5kIHBhcnNpbmdcbi8vIHRoZW0gaXMgZXhwZW5zaXZlLCBzbyB3ZSBvbmx5IHdhbnQgdG8gZG8gaXQgaWYgd2UgbXVzdC5cbi8vXG4vLyBFYWNoIG9iamVjdCBpbiB0aGUgYXJyYXlzIGlzIG9mIHRoZSBmb3JtOlxuLy9cbi8vICAgICB7XG4vLyAgICAgICBnZW5lcmF0ZWRMaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBjb2RlLFxuLy8gICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIGNvZGUsXG4vLyAgICAgICBzb3VyY2U6IFRoZSBwYXRoIHRvIHRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZSB0aGF0IGdlbmVyYXRlZCB0aGlzXG4vLyAgICAgICAgICAgICAgIGNodW5rIG9mIGNvZGUsXG4vLyAgICAgICBvcmlnaW5hbExpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlIHRoYXRcbi8vICAgICAgICAgICAgICAgICAgICAgY29ycmVzcG9uZHMgdG8gdGhpcyBjaHVuayBvZiBnZW5lcmF0ZWQgY29kZSxcbi8vICAgICAgIG9yaWdpbmFsQ29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlIHRoYXRcbi8vICAgICAgICAgICAgICAgICAgICAgICBjb3JyZXNwb25kcyB0byB0aGlzIGNodW5rIG9mIGdlbmVyYXRlZCBjb2RlLFxuLy8gICAgICAgbmFtZTogVGhlIG5hbWUgb2YgdGhlIG9yaWdpbmFsIHN5bWJvbCB3aGljaCBnZW5lcmF0ZWQgdGhpcyBjaHVuayBvZlxuLy8gICAgICAgICAgICAgY29kZS5cbi8vICAgICB9XG4vL1xuLy8gQWxsIHByb3BlcnRpZXMgZXhjZXB0IGZvciBgZ2VuZXJhdGVkTGluZWAgYW5kIGBnZW5lcmF0ZWRDb2x1bW5gIGNhbiBiZVxuLy8gYG51bGxgLlxuLy9cbi8vIGBfZ2VuZXJhdGVkTWFwcGluZ3NgIGlzIG9yZGVyZWQgYnkgdGhlIGdlbmVyYXRlZCBwb3NpdGlvbnMuXG4vL1xuLy8gYF9vcmlnaW5hbE1hcHBpbmdzYCBpcyBvcmRlcmVkIGJ5IHRoZSBvcmlnaW5hbCBwb3NpdGlvbnMuXG5cblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fX2dlbmVyYXRlZE1hcHBpbmdzID0gbnVsbDtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUsICdfZ2VuZXJhdGVkTWFwcGluZ3MnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MpIHtcbiAgICAgIHRoaXMuX3BhcnNlTWFwcGluZ3ModGhpcy5fbWFwcGluZ3MsIHRoaXMuc291cmNlUm9vdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncztcbiAgfVxufSk7XG5cblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fX29yaWdpbmFsTWFwcGluZ3MgPSBudWxsO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgJ19vcmlnaW5hbE1hcHBpbmdzJywge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5fX29yaWdpbmFsTWFwcGluZ3MpIHtcbiAgICAgIHRoaXMuX3BhcnNlTWFwcGluZ3ModGhpcy5fbWFwcGluZ3MsIHRoaXMuc291cmNlUm9vdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzO1xuICB9XG59KTtcblxuU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9jaGFySXNNYXBwaW5nU2VwYXJhdG9yID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfY2hhcklzTWFwcGluZ1NlcGFyYXRvcihhU3RyLCBpbmRleCkge1xuICAgIHZhciBjID0gYVN0ci5jaGFyQXQoaW5kZXgpO1xuICAgIHJldHVybiBjID09PSBcIjtcIiB8fCBjID09PSBcIixcIjtcbiAgfTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgbWFwcGluZ3MgaW4gYSBzdHJpbmcgaW4gdG8gYSBkYXRhIHN0cnVjdHVyZSB3aGljaCB3ZSBjYW4gZWFzaWx5XG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXG4gKi9cblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fcGFyc2VNYXBwaW5ncyA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX3BhcnNlTWFwcGluZ3MoYVN0ciwgYVNvdXJjZVJvb3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdWJjbGFzc2VzIG11c3QgaW1wbGVtZW50IF9wYXJzZU1hcHBpbmdzXCIpO1xuICB9O1xuXG5Tb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVIgPSAxO1xuU291cmNlTWFwQ29uc3VtZXIuT1JJR0lOQUxfT1JERVIgPSAyO1xuXG5Tb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCA9IDE7XG5Tb3VyY2VNYXBDb25zdW1lci5MRUFTVF9VUFBFUl9CT1VORCA9IDI7XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGVhY2ggbWFwcGluZyBiZXR3ZWVuIGFuIG9yaWdpbmFsIHNvdXJjZS9saW5lL2NvbHVtbiBhbmQgYVxuICogZ2VuZXJhdGVkIGxpbmUvY29sdW1uIGluIHRoaXMgc291cmNlIG1hcC5cbiAqXG4gKiBAcGFyYW0gRnVuY3Rpb24gYUNhbGxiYWNrXG4gKiAgICAgICAgVGhlIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIHdpdGggZWFjaCBtYXBwaW5nLlxuICogQHBhcmFtIE9iamVjdCBhQ29udGV4dFxuICogICAgICAgIE9wdGlvbmFsLiBJZiBzcGVjaWZpZWQsIHRoaXMgb2JqZWN0IHdpbGwgYmUgdGhlIHZhbHVlIG9mIGB0aGlzYCBldmVyeVxuICogICAgICAgIHRpbWUgdGhhdCBgYUNhbGxiYWNrYCBpcyBjYWxsZWQuXG4gKiBAcGFyYW0gYU9yZGVyXG4gKiAgICAgICAgRWl0aGVyIGBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVJgIG9yXG4gKiAgICAgICAgYFNvdXJjZU1hcENvbnN1bWVyLk9SSUdJTkFMX09SREVSYC4gU3BlY2lmaWVzIHdoZXRoZXIgeW91IHdhbnQgdG9cbiAqICAgICAgICBpdGVyYXRlIG92ZXIgdGhlIG1hcHBpbmdzIHNvcnRlZCBieSB0aGUgZ2VuZXJhdGVkIGZpbGUncyBsaW5lL2NvbHVtblxuICogICAgICAgIG9yZGVyIG9yIHRoZSBvcmlnaW5hbCdzIHNvdXJjZS9saW5lL2NvbHVtbiBvcmRlciwgcmVzcGVjdGl2ZWx5LiBEZWZhdWx0cyB0b1xuICogICAgICAgIGBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVJgLlxuICovXG5Tb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuZWFjaE1hcHBpbmcgPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9lYWNoTWFwcGluZyhhQ2FsbGJhY2ssIGFDb250ZXh0LCBhT3JkZXIpIHtcbiAgICB2YXIgY29udGV4dCA9IGFDb250ZXh0IHx8IG51bGw7XG4gICAgdmFyIG9yZGVyID0gYU9yZGVyIHx8IFNvdXJjZU1hcENvbnN1bWVyLkdFTkVSQVRFRF9PUkRFUjtcblxuICAgIHZhciBtYXBwaW5ncztcbiAgICBzd2l0Y2ggKG9yZGVyKSB7XG4gICAgY2FzZSBTb3VyY2VNYXBDb25zdW1lci5HRU5FUkFURURfT1JERVI6XG4gICAgICBtYXBwaW5ncyA9IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBTb3VyY2VNYXBDb25zdW1lci5PUklHSU5BTF9PUkRFUjpcbiAgICAgIG1hcHBpbmdzID0gdGhpcy5fb3JpZ2luYWxNYXBwaW5ncztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIG9yZGVyIG9mIGl0ZXJhdGlvbi5cIik7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZVJvb3QgPSB0aGlzLnNvdXJjZVJvb3Q7XG4gICAgbWFwcGluZ3MubWFwKGZ1bmN0aW9uIChtYXBwaW5nKSB7XG4gICAgICB2YXIgc291cmNlID0gbWFwcGluZy5zb3VyY2UgPT09IG51bGwgPyBudWxsIDogdGhpcy5fc291cmNlcy5hdChtYXBwaW5nLnNvdXJjZSk7XG4gICAgICBzb3VyY2UgPSB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoc291cmNlUm9vdCwgc291cmNlLCB0aGlzLl9zb3VyY2VNYXBVUkwpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgIGdlbmVyYXRlZExpbmU6IG1hcHBpbmcuZ2VuZXJhdGVkTGluZSxcbiAgICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBtYXBwaW5nLmdlbmVyYXRlZENvbHVtbixcbiAgICAgICAgb3JpZ2luYWxMaW5lOiBtYXBwaW5nLm9yaWdpbmFsTGluZSxcbiAgICAgICAgb3JpZ2luYWxDb2x1bW46IG1hcHBpbmcub3JpZ2luYWxDb2x1bW4sXG4gICAgICAgIG5hbWU6IG1hcHBpbmcubmFtZSA9PT0gbnVsbCA/IG51bGwgOiB0aGlzLl9uYW1lcy5hdChtYXBwaW5nLm5hbWUpXG4gICAgICB9O1xuICAgIH0sIHRoaXMpLmZvckVhY2goYUNhbGxiYWNrLCBjb250ZXh0KTtcbiAgfTtcblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgb3JpZ2luYWwgc291cmNlLFxuICogbGluZSwgYW5kIGNvbHVtbiBwcm92aWRlZC4gSWYgbm8gY29sdW1uIGlzIHByb3ZpZGVkLCByZXR1cm5zIGFsbCBtYXBwaW5nc1xuICogY29ycmVzcG9uZGluZyB0byBhIGVpdGhlciB0aGUgbGluZSB3ZSBhcmUgc2VhcmNoaW5nIGZvciBvciB0aGUgbmV4dFxuICogY2xvc2VzdCBsaW5lIHRoYXQgaGFzIGFueSBtYXBwaW5ncy4gT3RoZXJ3aXNlLCByZXR1cm5zIGFsbCBtYXBwaW5nc1xuICogY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW4gbGluZSBhbmQgZWl0aGVyIHRoZSBjb2x1bW4gd2UgYXJlIHNlYXJjaGluZyBmb3JcbiAqIG9yIHRoZSBuZXh0IGNsb3Nlc3QgY29sdW1uIHRoYXQgaGFzIGFueSBvZmZzZXRzLlxuICpcbiAqIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gc291cmNlOiBUaGUgZmlsZW5hbWUgb2YgdGhlIG9yaWdpbmFsIHNvdXJjZS5cbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogT3B0aW9uYWwuIHRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuXG4gKiAgICBUaGUgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkLlxuICpcbiAqIGFuZCBhbiBhcnJheSBvZiBvYmplY3RzIGlzIHJldHVybmVkLCBlYWNoIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuICBUaGVcbiAqICAgIGxpbmUgbnVtYmVyIGlzIDEtYmFzZWQuXG4gKiAgIC0gY29sdW1uOiBUaGUgY29sdW1uIG51bWJlciBpbiB0aGUgZ2VuZXJhdGVkIHNvdXJjZSwgb3IgbnVsbC5cbiAqICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXG4gKi9cblNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IgPVxuICBmdW5jdGlvbiBTb3VyY2VNYXBDb25zdW1lcl9hbGxHZW5lcmF0ZWRQb3NpdGlvbnNGb3IoYUFyZ3MpIHtcbiAgICB2YXIgbGluZSA9IHV0aWwuZ2V0QXJnKGFBcmdzLCAnbGluZScpO1xuXG4gICAgLy8gV2hlbiB0aGVyZSBpcyBubyBleGFjdCBtYXRjaCwgQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX2ZpbmRNYXBwaW5nXG4gICAgLy8gcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGNsb3Nlc3QgbWFwcGluZyBsZXNzIHRoYW4gdGhlIG5lZWRsZS4gQnlcbiAgICAvLyBzZXR0aW5nIG5lZWRsZS5vcmlnaW5hbENvbHVtbiB0byAwLCB3ZSB0aHVzIGZpbmQgdGhlIGxhc3QgbWFwcGluZyBmb3JcbiAgICAvLyB0aGUgZ2l2ZW4gbGluZSwgcHJvdmlkZWQgc3VjaCBhIG1hcHBpbmcgZXhpc3RzLlxuICAgIHZhciBuZWVkbGUgPSB7XG4gICAgICBzb3VyY2U6IHV0aWwuZ2V0QXJnKGFBcmdzLCAnc291cmNlJyksXG4gICAgICBvcmlnaW5hbExpbmU6IGxpbmUsXG4gICAgICBvcmlnaW5hbENvbHVtbjogdXRpbC5nZXRBcmcoYUFyZ3MsICdjb2x1bW4nLCAwKVxuICAgIH07XG5cbiAgICBuZWVkbGUuc291cmNlID0gdGhpcy5fZmluZFNvdXJjZUluZGV4KG5lZWRsZS5zb3VyY2UpO1xuICAgIGlmIChuZWVkbGUuc291cmNlIDwgMCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHZhciBtYXBwaW5ncyA9IFtdO1xuXG4gICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZE1hcHBpbmcobmVlZGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsTWFwcGluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJvcmlnaW5hbExpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9yaWdpbmFsQ29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlTZWFyY2guTEVBU1RfVVBQRVJfQk9VTkQpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB2YXIgbWFwcGluZyA9IHRoaXMuX29yaWdpbmFsTWFwcGluZ3NbaW5kZXhdO1xuXG4gICAgICBpZiAoYUFyZ3MuY29sdW1uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG9yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lO1xuXG4gICAgICAgIC8vIEl0ZXJhdGUgdW50aWwgZWl0aGVyIHdlIHJ1biBvdXQgb2YgbWFwcGluZ3MsIG9yIHdlIHJ1biBpbnRvXG4gICAgICAgIC8vIGEgbWFwcGluZyBmb3IgYSBkaWZmZXJlbnQgbGluZSB0aGFuIHRoZSBvbmUgd2UgZm91bmQuIFNpbmNlXG4gICAgICAgIC8vIG1hcHBpbmdzIGFyZSBzb3J0ZWQsIHRoaXMgaXMgZ3VhcmFudGVlZCB0byBmaW5kIGFsbCBtYXBwaW5ncyBmb3JcbiAgICAgICAgLy8gdGhlIGxpbmUgd2UgZm91bmQuXG4gICAgICAgIHdoaWxlIChtYXBwaW5nICYmIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSBvcmlnaW5hbExpbmUpIHtcbiAgICAgICAgICBtYXBwaW5ncy5wdXNoKHtcbiAgICAgICAgICAgIGxpbmU6IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdnZW5lcmF0ZWRMaW5lJywgbnVsbCksXG4gICAgICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdnZW5lcmF0ZWRDb2x1bW4nLCBudWxsKSxcbiAgICAgICAgICAgIGxhc3RDb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdsYXN0R2VuZXJhdGVkQ29sdW1uJywgbnVsbClcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG1hcHBpbmcgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzWysraW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgb3JpZ2luYWxDb2x1bW4gPSBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xuXG4gICAgICAgIC8vIEl0ZXJhdGUgdW50aWwgZWl0aGVyIHdlIHJ1biBvdXQgb2YgbWFwcGluZ3MsIG9yIHdlIHJ1biBpbnRvXG4gICAgICAgIC8vIGEgbWFwcGluZyBmb3IgYSBkaWZmZXJlbnQgbGluZSB0aGFuIHRoZSBvbmUgd2Ugd2VyZSBzZWFyY2hpbmcgZm9yLlxuICAgICAgICAvLyBTaW5jZSBtYXBwaW5ncyBhcmUgc29ydGVkLCB0aGlzIGlzIGd1YXJhbnRlZWQgdG8gZmluZCBhbGwgbWFwcGluZ3MgZm9yXG4gICAgICAgIC8vIHRoZSBsaW5lIHdlIGFyZSBzZWFyY2hpbmcgZm9yLlxuICAgICAgICB3aGlsZSAobWFwcGluZyAmJlxuICAgICAgICAgICAgICAgbWFwcGluZy5vcmlnaW5hbExpbmUgPT09IGxpbmUgJiZcbiAgICAgICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWxDb2x1bW4gPT0gb3JpZ2luYWxDb2x1bW4pIHtcbiAgICAgICAgICBtYXBwaW5ncy5wdXNoKHtcbiAgICAgICAgICAgIGxpbmU6IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdnZW5lcmF0ZWRMaW5lJywgbnVsbCksXG4gICAgICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdnZW5lcmF0ZWRDb2x1bW4nLCBudWxsKSxcbiAgICAgICAgICAgIGxhc3RDb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdsYXN0R2VuZXJhdGVkQ29sdW1uJywgbnVsbClcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIG1hcHBpbmcgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzWysraW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcHBpbmdzO1xuICB9O1xuXG52YXIgU291cmNlTWFwQ29uc3VtZXJfMSA9IFNvdXJjZU1hcENvbnN1bWVyO1xuXG4vKipcbiAqIEEgQmFzaWNTb3VyY2VNYXBDb25zdW1lciBpbnN0YW5jZSByZXByZXNlbnRzIGEgcGFyc2VkIHNvdXJjZSBtYXAgd2hpY2ggd2UgY2FuXG4gKiBxdWVyeSBmb3IgaW5mb3JtYXRpb24gYWJvdXQgdGhlIG9yaWdpbmFsIGZpbGUgcG9zaXRpb25zIGJ5IGdpdmluZyBpdCBhIGZpbGVcbiAqIHBvc2l0aW9uIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLlxuICpcbiAqIFRoZSBmaXJzdCBwYXJhbWV0ZXIgaXMgdGhlIHJhdyBzb3VyY2UgbWFwIChlaXRoZXIgYXMgYSBKU09OIHN0cmluZywgb3JcbiAqIGFscmVhZHkgcGFyc2VkIHRvIGFuIG9iamVjdCkuIEFjY29yZGluZyB0byB0aGUgc3BlYywgc291cmNlIG1hcHMgaGF2ZSB0aGVcbiAqIGZvbGxvd2luZyBhdHRyaWJ1dGVzOlxuICpcbiAqICAgLSB2ZXJzaW9uOiBXaGljaCB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwIHNwZWMgdGhpcyBtYXAgaXMgZm9sbG93aW5nLlxuICogICAtIHNvdXJjZXM6IEFuIGFycmF5IG9mIFVSTHMgdG8gdGhlIG9yaWdpbmFsIHNvdXJjZSBmaWxlcy5cbiAqICAgLSBuYW1lczogQW4gYXJyYXkgb2YgaWRlbnRpZmllcnMgd2hpY2ggY2FuIGJlIHJlZmVycmVuY2VkIGJ5IGluZGl2aWR1YWwgbWFwcGluZ3MuXG4gKiAgIC0gc291cmNlUm9vdDogT3B0aW9uYWwuIFRoZSBVUkwgcm9vdCBmcm9tIHdoaWNoIGFsbCBzb3VyY2VzIGFyZSByZWxhdGl2ZS5cbiAqICAgLSBzb3VyY2VzQ29udGVudDogT3B0aW9uYWwuIEFuIGFycmF5IG9mIGNvbnRlbnRzIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UgZmlsZXMuXG4gKiAgIC0gbWFwcGluZ3M6IEEgc3RyaW5nIG9mIGJhc2U2NCBWTFFzIHdoaWNoIGNvbnRhaW4gdGhlIGFjdHVhbCBtYXBwaW5ncy5cbiAqICAgLSBmaWxlOiBPcHRpb25hbC4gVGhlIGdlbmVyYXRlZCBmaWxlIHRoaXMgc291cmNlIG1hcCBpcyBhc3NvY2lhdGVkIHdpdGguXG4gKlxuICogSGVyZSBpcyBhbiBleGFtcGxlIHNvdXJjZSBtYXAsIHRha2VuIGZyb20gdGhlIHNvdXJjZSBtYXAgc3BlY1swXTpcbiAqXG4gKiAgICAge1xuICogICAgICAgdmVyc2lvbiA6IDMsXG4gKiAgICAgICBmaWxlOiBcIm91dC5qc1wiLFxuICogICAgICAgc291cmNlUm9vdCA6IFwiXCIsXG4gKiAgICAgICBzb3VyY2VzOiBbXCJmb28uanNcIiwgXCJiYXIuanNcIl0sXG4gKiAgICAgICBuYW1lczogW1wic3JjXCIsIFwibWFwc1wiLCBcImFyZVwiLCBcImZ1blwiXSxcbiAqICAgICAgIG1hcHBpbmdzOiBcIkFBLEFCOztBQkNERTtcIlxuICogICAgIH1cbiAqXG4gKiBUaGUgc2Vjb25kIHBhcmFtZXRlciwgaWYgZ2l2ZW4sIGlzIGEgc3RyaW5nIHdob3NlIHZhbHVlIGlzIHRoZSBVUkxcbiAqIGF0IHdoaWNoIHRoZSBzb3VyY2UgbWFwIHdhcyBmb3VuZC4gIFRoaXMgVVJMIGlzIHVzZWQgdG8gY29tcHV0ZSB0aGVcbiAqIHNvdXJjZXMgYXJyYXkuXG4gKlxuICogWzBdOiBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9kb2N1bWVudC9kLzFVMVJHQWVoUXdSeXBVVG92RjFLUmxwaU9GemUwYi1fMmdjNmZBSDBLWTBrL2VkaXQ/cGxpPTEjXG4gKi9cbmZ1bmN0aW9uIEJhc2ljU291cmNlTWFwQ29uc3VtZXIoYVNvdXJjZU1hcCwgYVNvdXJjZU1hcFVSTCkge1xuICB2YXIgc291cmNlTWFwID0gYVNvdXJjZU1hcDtcbiAgaWYgKHR5cGVvZiBhU291cmNlTWFwID09PSAnc3RyaW5nJykge1xuICAgIHNvdXJjZU1hcCA9IHV0aWwucGFyc2VTb3VyY2VNYXBJbnB1dChhU291cmNlTWFwKTtcbiAgfVxuXG4gIHZhciB2ZXJzaW9uID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCAndmVyc2lvbicpO1xuICB2YXIgc291cmNlcyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3NvdXJjZXMnKTtcbiAgLy8gU2FzcyAzLjMgbGVhdmVzIG91dCB0aGUgJ25hbWVzJyBhcnJheSwgc28gd2UgZGV2aWF0ZSBmcm9tIHRoZSBzcGVjICh3aGljaFxuICAvLyByZXF1aXJlcyB0aGUgYXJyYXkpIHRvIHBsYXkgbmljZSBoZXJlLlxuICB2YXIgbmFtZXMgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICduYW1lcycsIFtdKTtcbiAgdmFyIHNvdXJjZVJvb3QgPSB1dGlsLmdldEFyZyhzb3VyY2VNYXAsICdzb3VyY2VSb290JywgbnVsbCk7XG4gIHZhciBzb3VyY2VzQ29udGVudCA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3NvdXJjZXNDb250ZW50JywgbnVsbCk7XG4gIHZhciBtYXBwaW5ncyA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ21hcHBpbmdzJyk7XG4gIHZhciBmaWxlID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCAnZmlsZScsIG51bGwpO1xuXG4gIC8vIE9uY2UgYWdhaW4sIFNhc3MgZGV2aWF0ZXMgZnJvbSB0aGUgc3BlYyBhbmQgc3VwcGxpZXMgdGhlIHZlcnNpb24gYXMgYVxuICAvLyBzdHJpbmcgcmF0aGVyIHRoYW4gYSBudW1iZXIsIHNvIHdlIHVzZSBsb29zZSBlcXVhbGl0eSBjaGVja2luZyBoZXJlLlxuICBpZiAodmVyc2lvbiAhPSB0aGlzLl92ZXJzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XG4gIH1cblxuICBpZiAoc291cmNlUm9vdCkge1xuICAgIHNvdXJjZVJvb3QgPSB1dGlsLm5vcm1hbGl6ZShzb3VyY2VSb290KTtcbiAgfVxuXG4gIHNvdXJjZXMgPSBzb3VyY2VzXG4gICAgLm1hcChTdHJpbmcpXG4gICAgLy8gU29tZSBzb3VyY2UgbWFwcyBwcm9kdWNlIHJlbGF0aXZlIHNvdXJjZSBwYXRocyBsaWtlIFwiLi9mb28uanNcIiBpbnN0ZWFkIG9mXG4gICAgLy8gXCJmb28uanNcIi4gIE5vcm1hbGl6ZSB0aGVzZSBmaXJzdCBzbyB0aGF0IGZ1dHVyZSBjb21wYXJpc29ucyB3aWxsIHN1Y2NlZWQuXG4gICAgLy8gU2VlIGJ1Z3ppbC5sYS8xMDkwNzY4LlxuICAgIC5tYXAodXRpbC5ub3JtYWxpemUpXG4gICAgLy8gQWx3YXlzIGVuc3VyZSB0aGF0IGFic29sdXRlIHNvdXJjZXMgYXJlIGludGVybmFsbHkgc3RvcmVkIHJlbGF0aXZlIHRvXG4gICAgLy8gdGhlIHNvdXJjZSByb290LCBpZiB0aGUgc291cmNlIHJvb3QgaXMgYWJzb2x1dGUuIE5vdCBkb2luZyB0aGlzIHdvdWxkXG4gICAgLy8gYmUgcGFydGljdWxhcmx5IHByb2JsZW1hdGljIHdoZW4gdGhlIHNvdXJjZSByb290IGlzIGEgcHJlZml4IG9mIHRoZVxuICAgIC8vIHNvdXJjZSAodmFsaWQsIGJ1dCB3aHk/PykuIFNlZSBnaXRodWIgaXNzdWUgIzE5OSBhbmQgYnVnemlsLmxhLzExODg5ODIuXG4gICAgLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gc291cmNlUm9vdCAmJiB1dGlsLmlzQWJzb2x1dGUoc291cmNlUm9vdCkgJiYgdXRpbC5pc0Fic29sdXRlKHNvdXJjZSlcbiAgICAgICAgPyB1dGlsLnJlbGF0aXZlKHNvdXJjZVJvb3QsIHNvdXJjZSlcbiAgICAgICAgOiBzb3VyY2U7XG4gICAgfSk7XG5cbiAgLy8gUGFzcyBgdHJ1ZWAgYmVsb3cgdG8gYWxsb3cgZHVwbGljYXRlIG5hbWVzIGFuZCBzb3VyY2VzLiBXaGlsZSBzb3VyY2UgbWFwc1xuICAvLyBhcmUgaW50ZW5kZWQgdG8gYmUgY29tcHJlc3NlZCBhbmQgZGVkdXBsaWNhdGVkLCB0aGUgVHlwZVNjcmlwdCBjb21waWxlclxuICAvLyBzb21ldGltZXMgZ2VuZXJhdGVzIHNvdXJjZSBtYXBzIHdpdGggZHVwbGljYXRlcyBpbiB0aGVtLiBTZWUgR2l0aHViIGlzc3VlXG4gIC8vICM3MiBhbmQgYnVnemlsLmxhLzg4OTQ5Mi5cbiAgdGhpcy5fbmFtZXMgPSBBcnJheVNldCQxLmZyb21BcnJheShuYW1lcy5tYXAoU3RyaW5nKSwgdHJ1ZSk7XG4gIHRoaXMuX3NvdXJjZXMgPSBBcnJheVNldCQxLmZyb21BcnJheShzb3VyY2VzLCB0cnVlKTtcblxuICB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMgPSB0aGlzLl9zb3VyY2VzLnRvQXJyYXkoKS5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gdXRpbC5jb21wdXRlU291cmNlVVJMKHNvdXJjZVJvb3QsIHMsIGFTb3VyY2VNYXBVUkwpO1xuICB9KTtcblxuICB0aGlzLnNvdXJjZVJvb3QgPSBzb3VyY2VSb290O1xuICB0aGlzLnNvdXJjZXNDb250ZW50ID0gc291cmNlc0NvbnRlbnQ7XG4gIHRoaXMuX21hcHBpbmdzID0gbWFwcGluZ3M7XG4gIHRoaXMuX3NvdXJjZU1hcFVSTCA9IGFTb3VyY2VNYXBVUkw7XG4gIHRoaXMuZmlsZSA9IGZpbGU7XG59XG5cbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29uc3VtZXIgPSBTb3VyY2VNYXBDb25zdW1lcjtcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGZpbmQgdGhlIGluZGV4IG9mIGEgc291cmNlLiAgUmV0dXJucyAtMSBpZiBub3RcbiAqIGZvdW5kLlxuICovXG5CYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5fZmluZFNvdXJjZUluZGV4ID0gZnVuY3Rpb24oYVNvdXJjZSkge1xuICB2YXIgcmVsYXRpdmVTb3VyY2UgPSBhU291cmNlO1xuICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGwpIHtcbiAgICByZWxhdGl2ZVNvdXJjZSA9IHV0aWwucmVsYXRpdmUodGhpcy5zb3VyY2VSb290LCByZWxhdGl2ZVNvdXJjZSk7XG4gIH1cblxuICBpZiAodGhpcy5fc291cmNlcy5oYXMocmVsYXRpdmVTb3VyY2UpKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZXMuaW5kZXhPZihyZWxhdGl2ZVNvdXJjZSk7XG4gIH1cblxuICAvLyBNYXliZSBhU291cmNlIGlzIGFuIGFic29sdXRlIFVSTCBhcyByZXR1cm5lZCBieSB8c291cmNlc3wuICBJblxuICAvLyB0aGlzIGNhc2Ugd2UgY2FuJ3Qgc2ltcGx5IHVuZG8gdGhlIHRyYW5zZm9ybS5cbiAgdmFyIGk7XG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAodGhpcy5fYWJzb2x1dGVTb3VyY2VzW2ldID09IGFTb3VyY2UpIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgQmFzaWNTb3VyY2VNYXBDb25zdW1lciBmcm9tIGEgU291cmNlTWFwR2VuZXJhdG9yLlxuICpcbiAqIEBwYXJhbSBTb3VyY2VNYXBHZW5lcmF0b3IgYVNvdXJjZU1hcFxuICogICAgICAgIFRoZSBzb3VyY2UgbWFwIHRoYXQgd2lsbCBiZSBjb25zdW1lZC5cbiAqIEBwYXJhbSBTdHJpbmcgYVNvdXJjZU1hcFVSTFxuICogICAgICAgIFRoZSBVUkwgYXQgd2hpY2ggdGhlIHNvdXJjZSBtYXAgY2FuIGJlIGZvdW5kIChvcHRpb25hbClcbiAqIEByZXR1cm5zIEJhc2ljU291cmNlTWFwQ29uc3VtZXJcbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5mcm9tU291cmNlTWFwID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZnJvbVNvdXJjZU1hcChhU291cmNlTWFwLCBhU291cmNlTWFwVVJMKSB7XG4gICAgdmFyIHNtYyA9IE9iamVjdC5jcmVhdGUoQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUpO1xuXG4gICAgdmFyIG5hbWVzID0gc21jLl9uYW1lcyA9IEFycmF5U2V0JDEuZnJvbUFycmF5KGFTb3VyY2VNYXAuX25hbWVzLnRvQXJyYXkoKSwgdHJ1ZSk7XG4gICAgdmFyIHNvdXJjZXMgPSBzbWMuX3NvdXJjZXMgPSBBcnJheVNldCQxLmZyb21BcnJheShhU291cmNlTWFwLl9zb3VyY2VzLnRvQXJyYXkoKSwgdHJ1ZSk7XG4gICAgc21jLnNvdXJjZVJvb3QgPSBhU291cmNlTWFwLl9zb3VyY2VSb290O1xuICAgIHNtYy5zb3VyY2VzQ29udGVudCA9IGFTb3VyY2VNYXAuX2dlbmVyYXRlU291cmNlc0NvbnRlbnQoc21jLl9zb3VyY2VzLnRvQXJyYXkoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYy5zb3VyY2VSb290KTtcbiAgICBzbWMuZmlsZSA9IGFTb3VyY2VNYXAuX2ZpbGU7XG4gICAgc21jLl9zb3VyY2VNYXBVUkwgPSBhU291cmNlTWFwVVJMO1xuICAgIHNtYy5fYWJzb2x1dGVTb3VyY2VzID0gc21jLl9zb3VyY2VzLnRvQXJyYXkoKS5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiB1dGlsLmNvbXB1dGVTb3VyY2VVUkwoc21jLnNvdXJjZVJvb3QsIHMsIGFTb3VyY2VNYXBVUkwpO1xuICAgIH0pO1xuXG4gICAgLy8gQmVjYXVzZSB3ZSBhcmUgbW9kaWZ5aW5nIHRoZSBlbnRyaWVzIChieSBjb252ZXJ0aW5nIHN0cmluZyBzb3VyY2VzIGFuZFxuICAgIC8vIG5hbWVzIHRvIGluZGljZXMgaW50byB0aGUgc291cmNlcyBhbmQgbmFtZXMgQXJyYXlTZXRzKSwgd2UgaGF2ZSB0byBtYWtlXG4gICAgLy8gYSBjb3B5IG9mIHRoZSBlbnRyeSBvciBlbHNlIGJhZCB0aGluZ3MgaGFwcGVuLiBTaGFyZWQgbXV0YWJsZSBzdGF0ZVxuICAgIC8vIHN0cmlrZXMgYWdhaW4hIFNlZSBnaXRodWIgaXNzdWUgIzE5MS5cblxuICAgIHZhciBnZW5lcmF0ZWRNYXBwaW5ncyA9IGFTb3VyY2VNYXAuX21hcHBpbmdzLnRvQXJyYXkoKS5zbGljZSgpO1xuICAgIHZhciBkZXN0R2VuZXJhdGVkTWFwcGluZ3MgPSBzbWMuX19nZW5lcmF0ZWRNYXBwaW5ncyA9IFtdO1xuICAgIHZhciBkZXN0T3JpZ2luYWxNYXBwaW5ncyA9IHNtYy5fX29yaWdpbmFsTWFwcGluZ3MgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZW5lcmF0ZWRNYXBwaW5ncy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNyY01hcHBpbmcgPSBnZW5lcmF0ZWRNYXBwaW5nc1tpXTtcbiAgICAgIHZhciBkZXN0TWFwcGluZyA9IG5ldyBNYXBwaW5nO1xuICAgICAgZGVzdE1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9IHNyY01hcHBpbmcuZ2VuZXJhdGVkTGluZTtcbiAgICAgIGRlc3RNYXBwaW5nLmdlbmVyYXRlZENvbHVtbiA9IHNyY01hcHBpbmcuZ2VuZXJhdGVkQ29sdW1uO1xuXG4gICAgICBpZiAoc3JjTWFwcGluZy5zb3VyY2UpIHtcbiAgICAgICAgZGVzdE1hcHBpbmcuc291cmNlID0gc291cmNlcy5pbmRleE9mKHNyY01hcHBpbmcuc291cmNlKTtcbiAgICAgICAgZGVzdE1hcHBpbmcub3JpZ2luYWxMaW5lID0gc3JjTWFwcGluZy5vcmlnaW5hbExpbmU7XG4gICAgICAgIGRlc3RNYXBwaW5nLm9yaWdpbmFsQ29sdW1uID0gc3JjTWFwcGluZy5vcmlnaW5hbENvbHVtbjtcblxuICAgICAgICBpZiAoc3JjTWFwcGluZy5uYW1lKSB7XG4gICAgICAgICAgZGVzdE1hcHBpbmcubmFtZSA9IG5hbWVzLmluZGV4T2Yoc3JjTWFwcGluZy5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc3RPcmlnaW5hbE1hcHBpbmdzLnB1c2goZGVzdE1hcHBpbmcpO1xuICAgICAgfVxuXG4gICAgICBkZXN0R2VuZXJhdGVkTWFwcGluZ3MucHVzaChkZXN0TWFwcGluZyk7XG4gICAgfVxuXG4gICAgcXVpY2tTb3J0JDEoc21jLl9fb3JpZ2luYWxNYXBwaW5ncywgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyk7XG5cbiAgICByZXR1cm4gc21jO1xuICB9O1xuXG4vKipcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UgbWFwcGluZyBzcGVjIHRoYXQgd2UgYXJlIGNvbnN1bWluZy5cbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIG9yaWdpbmFsIHNvdXJjZXMuXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCYXNpY1NvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSwgJ3NvdXJjZXMnLCB7XG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9hYnNvbHV0ZVNvdXJjZXMuc2xpY2UoKTtcbiAgfVxufSk7XG5cbi8qKlxuICogUHJvdmlkZSB0aGUgSklUIHdpdGggYSBuaWNlIHNoYXBlIC8gaGlkZGVuIGNsYXNzLlxuICovXG5mdW5jdGlvbiBNYXBwaW5nKCkge1xuICB0aGlzLmdlbmVyYXRlZExpbmUgPSAwO1xuICB0aGlzLmdlbmVyYXRlZENvbHVtbiA9IDA7XG4gIHRoaXMuc291cmNlID0gbnVsbDtcbiAgdGhpcy5vcmlnaW5hbExpbmUgPSBudWxsO1xuICB0aGlzLm9yaWdpbmFsQ29sdW1uID0gbnVsbDtcbiAgdGhpcy5uYW1lID0gbnVsbDtcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgbWFwcGluZ3MgaW4gYSBzdHJpbmcgaW4gdG8gYSBkYXRhIHN0cnVjdHVyZSB3aGljaCB3ZSBjYW4gZWFzaWx5XG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXG4gKi9cbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9wYXJzZU1hcHBpbmdzID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhhU3RyLCBhU291cmNlUm9vdCkge1xuICAgIHZhciBnZW5lcmF0ZWRMaW5lID0gMTtcbiAgICB2YXIgcHJldmlvdXNHZW5lcmF0ZWRDb2x1bW4gPSAwO1xuICAgIHZhciBwcmV2aW91c09yaWdpbmFsTGluZSA9IDA7XG4gICAgdmFyIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSAwO1xuICAgIHZhciBwcmV2aW91c1NvdXJjZSA9IDA7XG4gICAgdmFyIHByZXZpb3VzTmFtZSA9IDA7XG4gICAgdmFyIGxlbmd0aCA9IGFTdHIubGVuZ3RoO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNhY2hlZFNlZ21lbnRzID0ge307XG4gICAgdmFyIHRlbXAgPSB7fTtcbiAgICB2YXIgb3JpZ2luYWxNYXBwaW5ncyA9IFtdO1xuICAgIHZhciBnZW5lcmF0ZWRNYXBwaW5ncyA9IFtdO1xuICAgIHZhciBtYXBwaW5nLCBzdHIsIHNlZ21lbnQsIGVuZCwgdmFsdWU7XG5cbiAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGlmIChhU3RyLmNoYXJBdChpbmRleCkgPT09ICc7Jykge1xuICAgICAgICBnZW5lcmF0ZWRMaW5lKys7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gMDtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGFTdHIuY2hhckF0KGluZGV4KSA9PT0gJywnKSB7XG4gICAgICAgIGluZGV4Kys7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbWFwcGluZyA9IG5ldyBNYXBwaW5nKCk7XG4gICAgICAgIG1hcHBpbmcuZ2VuZXJhdGVkTGluZSA9IGdlbmVyYXRlZExpbmU7XG5cbiAgICAgICAgLy8gQmVjYXVzZSBlYWNoIG9mZnNldCBpcyBlbmNvZGVkIHJlbGF0aXZlIHRvIHRoZSBwcmV2aW91cyBvbmUsXG4gICAgICAgIC8vIG1hbnkgc2VnbWVudHMgb2Z0ZW4gaGF2ZSB0aGUgc2FtZSBlbmNvZGluZy4gV2UgY2FuIGV4cGxvaXQgdGhpc1xuICAgICAgICAvLyBmYWN0IGJ5IGNhY2hpbmcgdGhlIHBhcnNlZCB2YXJpYWJsZSBsZW5ndGggZmllbGRzIG9mIGVhY2ggc2VnbWVudCxcbiAgICAgICAgLy8gYWxsb3dpbmcgdXMgdG8gYXZvaWQgYSBzZWNvbmQgcGFyc2UgaWYgd2UgZW5jb3VudGVyIHRoZSBzYW1lXG4gICAgICAgIC8vIHNlZ21lbnQgYWdhaW4uXG4gICAgICAgIGZvciAoZW5kID0gaW5kZXg7IGVuZCA8IGxlbmd0aDsgZW5kKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5fY2hhcklzTWFwcGluZ1NlcGFyYXRvcihhU3RyLCBlbmQpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RyID0gYVN0ci5zbGljZShpbmRleCwgZW5kKTtcblxuICAgICAgICBzZWdtZW50ID0gY2FjaGVkU2VnbWVudHNbc3RyXTtcbiAgICAgICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAgICBpbmRleCArPSBzdHIubGVuZ3RoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlZ21lbnQgPSBbXTtcbiAgICAgICAgICB3aGlsZSAoaW5kZXggPCBlbmQpIHtcbiAgICAgICAgICAgIGJhc2U2NFZscS5kZWNvZGUoYVN0ciwgaW5kZXgsIHRlbXApO1xuICAgICAgICAgICAgdmFsdWUgPSB0ZW1wLnZhbHVlO1xuICAgICAgICAgICAgaW5kZXggPSB0ZW1wLnJlc3Q7XG4gICAgICAgICAgICBzZWdtZW50LnB1c2godmFsdWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWdtZW50Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCBhIHNvdXJjZSwgYnV0IG5vIGxpbmUgYW5kIGNvbHVtbicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWdtZW50Lmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3VuZCBhIHNvdXJjZSBhbmQgbGluZSwgYnV0IG5vIGNvbHVtbicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhY2hlZFNlZ21lbnRzW3N0cl0gPSBzZWdtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VuZXJhdGVkIGNvbHVtbi5cbiAgICAgICAgbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gPSBwcmV2aW91c0dlbmVyYXRlZENvbHVtbiArIHNlZ21lbnRbMF07XG4gICAgICAgIHByZXZpb3VzR2VuZXJhdGVkQ29sdW1uID0gbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW47XG5cbiAgICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID4gMSkge1xuICAgICAgICAgIC8vIE9yaWdpbmFsIHNvdXJjZS5cbiAgICAgICAgICBtYXBwaW5nLnNvdXJjZSA9IHByZXZpb3VzU291cmNlICsgc2VnbWVudFsxXTtcbiAgICAgICAgICBwcmV2aW91c1NvdXJjZSArPSBzZWdtZW50WzFdO1xuXG4gICAgICAgICAgLy8gT3JpZ2luYWwgbGluZS5cbiAgICAgICAgICBtYXBwaW5nLm9yaWdpbmFsTGluZSA9IHByZXZpb3VzT3JpZ2luYWxMaW5lICsgc2VnbWVudFsyXTtcbiAgICAgICAgICBwcmV2aW91c09yaWdpbmFsTGluZSA9IG1hcHBpbmcub3JpZ2luYWxMaW5lO1xuICAgICAgICAgIC8vIExpbmVzIGFyZSBzdG9yZWQgMC1iYXNlZFxuICAgICAgICAgIG1hcHBpbmcub3JpZ2luYWxMaW5lICs9IDE7XG5cbiAgICAgICAgICAvLyBPcmlnaW5hbCBjb2x1bW4uXG4gICAgICAgICAgbWFwcGluZy5vcmlnaW5hbENvbHVtbiA9IHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gKyBzZWdtZW50WzNdO1xuICAgICAgICAgIHByZXZpb3VzT3JpZ2luYWxDb2x1bW4gPSBtYXBwaW5nLm9yaWdpbmFsQ29sdW1uO1xuXG4gICAgICAgICAgaWYgKHNlZ21lbnQubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgLy8gT3JpZ2luYWwgbmFtZS5cbiAgICAgICAgICAgIG1hcHBpbmcubmFtZSA9IHByZXZpb3VzTmFtZSArIHNlZ21lbnRbNF07XG4gICAgICAgICAgICBwcmV2aW91c05hbWUgKz0gc2VnbWVudFs0XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKG1hcHBpbmcpO1xuICAgICAgICBpZiAodHlwZW9mIG1hcHBpbmcub3JpZ2luYWxMaW5lID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG9yaWdpbmFsTWFwcGluZ3MucHVzaChtYXBwaW5nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHF1aWNrU29ydCQxKGdlbmVyYXRlZE1hcHBpbmdzLCB1dGlsLmNvbXBhcmVCeUdlbmVyYXRlZFBvc2l0aW9uc0RlZmxhdGVkKTtcbiAgICB0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MgPSBnZW5lcmF0ZWRNYXBwaW5ncztcblxuICAgIHF1aWNrU29ydCQxKG9yaWdpbmFsTWFwcGluZ3MsIHV0aWwuY29tcGFyZUJ5T3JpZ2luYWxQb3NpdGlvbnMpO1xuICAgIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzID0gb3JpZ2luYWxNYXBwaW5ncztcbiAgfTtcblxuLyoqXG4gKiBGaW5kIHRoZSBtYXBwaW5nIHRoYXQgYmVzdCBtYXRjaGVzIHRoZSBoeXBvdGhldGljYWwgXCJuZWVkbGVcIiBtYXBwaW5nIHRoYXRcbiAqIHdlIGFyZSBzZWFyY2hpbmcgZm9yIGluIHRoZSBnaXZlbiBcImhheXN0YWNrXCIgb2YgbWFwcGluZ3MuXG4gKi9cbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLl9maW5kTWFwcGluZyA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX2ZpbmRNYXBwaW5nKGFOZWVkbGUsIGFNYXBwaW5ncywgYUxpbmVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhQ29sdW1uTmFtZSwgYUNvbXBhcmF0b3IsIGFCaWFzKSB7XG4gICAgLy8gVG8gcmV0dXJuIHRoZSBwb3NpdGlvbiB3ZSBhcmUgc2VhcmNoaW5nIGZvciwgd2UgbXVzdCBmaXJzdCBmaW5kIHRoZVxuICAgIC8vIG1hcHBpbmcgZm9yIHRoZSBnaXZlbiBwb3NpdGlvbiBhbmQgdGhlbiByZXR1cm4gdGhlIG9wcG9zaXRlIHBvc2l0aW9uIGl0XG4gICAgLy8gcG9pbnRzIHRvLiBCZWNhdXNlIHRoZSBtYXBwaW5ncyBhcmUgc29ydGVkLCB3ZSBjYW4gdXNlIGJpbmFyeSBzZWFyY2ggdG9cbiAgICAvLyBmaW5kIHRoZSBiZXN0IG1hcHBpbmcuXG5cbiAgICBpZiAoYU5lZWRsZVthTGluZU5hbWVdIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0xpbmUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMSwgZ290ICdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBhTmVlZGxlW2FMaW5lTmFtZV0pO1xuICAgIH1cbiAgICBpZiAoYU5lZWRsZVthQ29sdW1uTmFtZV0gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDb2x1bW4gbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gMCwgZ290ICdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBhTmVlZGxlW2FDb2x1bW5OYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJpbmFyeVNlYXJjaC5zZWFyY2goYU5lZWRsZSwgYU1hcHBpbmdzLCBhQ29tcGFyYXRvciwgYUJpYXMpO1xuICB9O1xuXG4vKipcbiAqIENvbXB1dGUgdGhlIGxhc3QgY29sdW1uIGZvciBlYWNoIGdlbmVyYXRlZCBtYXBwaW5nLiBUaGUgbGFzdCBjb2x1bW4gaXNcbiAqIGluY2x1c2l2ZS5cbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29tcHV0ZUNvbHVtblNwYW5zID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfY29tcHV0ZUNvbHVtblNwYW5zKCkge1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5ncy5sZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgIHZhciBtYXBwaW5nID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3NbaW5kZXhdO1xuXG4gICAgICAvLyBNYXBwaW5ncyBkbyBub3QgY29udGFpbiBhIGZpZWxkIGZvciB0aGUgbGFzdCBnZW5lcmF0ZWQgY29sdW1udC4gV2VcbiAgICAgIC8vIGNhbiBjb21lIHVwIHdpdGggYW4gb3B0aW1pc3RpYyBlc3RpbWF0ZSwgaG93ZXZlciwgYnkgYXNzdW1pbmcgdGhhdFxuICAgICAgLy8gbWFwcGluZ3MgYXJlIGNvbnRpZ3VvdXMgKGkuZS4gZ2l2ZW4gdHdvIGNvbnNlY3V0aXZlIG1hcHBpbmdzLCB0aGVcbiAgICAgIC8vIGZpcnN0IG1hcHBpbmcgZW5kcyB3aGVyZSB0aGUgc2Vjb25kIG9uZSBzdGFydHMpLlxuICAgICAgaWYgKGluZGV4ICsgMSA8IHRoaXMuX2dlbmVyYXRlZE1hcHBpbmdzLmxlbmd0aCkge1xuICAgICAgICB2YXIgbmV4dE1hcHBpbmcgPSB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5nc1tpbmRleCArIDFdO1xuXG4gICAgICAgIGlmIChtYXBwaW5nLmdlbmVyYXRlZExpbmUgPT09IG5leHRNYXBwaW5nLmdlbmVyYXRlZExpbmUpIHtcbiAgICAgICAgICBtYXBwaW5nLmxhc3RHZW5lcmF0ZWRDb2x1bW4gPSBuZXh0TWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gLSAxO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBsYXN0IG1hcHBpbmcgZm9yIGVhY2ggbGluZSBzcGFucyB0aGUgZW50aXJlIGxpbmUuXG4gICAgICBtYXBwaW5nLmxhc3RHZW5lcmF0ZWRDb2x1bW4gPSBJbmZpbml0eTtcbiAgICB9XG4gIH07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlLCBsaW5lLCBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgZ2VuZXJhdGVkXG4gKiBzb3VyY2UncyBsaW5lIGFuZCBjb2x1bW4gcG9zaXRpb25zIHByb3ZpZGVkLiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3RcbiAqIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcbiAqICAgICBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgY29sdW1uXG4gKiAgICAgbnVtYmVyIGlzIDAtYmFzZWQuXG4gKiAgIC0gYmlhczogRWl0aGVyICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcbiAqICAgICAnU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxuICogICAgIERlZmF1bHRzIHRvICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcuXG4gKlxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gc291cmNlOiBUaGUgb3JpZ2luYWwgc291cmNlIGZpbGUsIG9yIG51bGwuXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UsIG9yIG51bGwuICBUaGVcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxuICogICAgIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cbiAqICAgLSBuYW1lOiBUaGUgb3JpZ2luYWwgaWRlbnRpZmllciwgb3IgbnVsbC5cbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUub3JpZ2luYWxQb3NpdGlvbkZvciA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX29yaWdpbmFsUG9zaXRpb25Gb3IoYUFyZ3MpIHtcbiAgICB2YXIgbmVlZGxlID0ge1xuICAgICAgZ2VuZXJhdGVkTGluZTogdXRpbC5nZXRBcmcoYUFyZ3MsICdsaW5lJyksXG4gICAgICBnZW5lcmF0ZWRDb2x1bW46IHV0aWwuZ2V0QXJnKGFBcmdzLCAnY29sdW1uJylcbiAgICB9O1xuXG4gICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZE1hcHBpbmcoXG4gICAgICBuZWVkbGUsXG4gICAgICB0aGlzLl9nZW5lcmF0ZWRNYXBwaW5ncyxcbiAgICAgIFwiZ2VuZXJhdGVkTGluZVwiLFxuICAgICAgXCJnZW5lcmF0ZWRDb2x1bW5cIixcbiAgICAgIHV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQsXG4gICAgICB1dGlsLmdldEFyZyhhQXJncywgJ2JpYXMnLCBTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORClcbiAgICApO1xuXG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHZhciBtYXBwaW5nID0gdGhpcy5fZ2VuZXJhdGVkTWFwcGluZ3NbaW5kZXhdO1xuXG4gICAgICBpZiAobWFwcGluZy5nZW5lcmF0ZWRMaW5lID09PSBuZWVkbGUuZ2VuZXJhdGVkTGluZSkge1xuICAgICAgICB2YXIgc291cmNlID0gdXRpbC5nZXRBcmcobWFwcGluZywgJ3NvdXJjZScsIG51bGwpO1xuICAgICAgICBpZiAoc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgc291cmNlID0gdGhpcy5fc291cmNlcy5hdChzb3VyY2UpO1xuICAgICAgICAgIHNvdXJjZSA9IHV0aWwuY29tcHV0ZVNvdXJjZVVSTCh0aGlzLnNvdXJjZVJvb3QsIHNvdXJjZSwgdGhpcy5fc291cmNlTWFwVVJMKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmFtZSA9IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICduYW1lJywgbnVsbCk7XG4gICAgICAgIGlmIChuYW1lICE9PSBudWxsKSB7XG4gICAgICAgICAgbmFtZSA9IHRoaXMuX25hbWVzLmF0KG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgJ29yaWdpbmFsTGluZScsIG51bGwpLFxuICAgICAgICAgIGNvbHVtbjogdXRpbC5nZXRBcmcobWFwcGluZywgJ29yaWdpbmFsQ29sdW1uJywgbnVsbCksXG4gICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzb3VyY2U6IG51bGwsXG4gICAgICBsaW5lOiBudWxsLFxuICAgICAgY29sdW1uOiBudWxsLFxuICAgICAgbmFtZTogbnVsbFxuICAgIH07XG4gIH07XG5cbi8qKlxuICogUmV0dXJuIHRydWUgaWYgd2UgaGF2ZSB0aGUgc291cmNlIGNvbnRlbnQgZm9yIGV2ZXJ5IHNvdXJjZSBpbiB0aGUgc291cmNlXG4gKiBtYXAsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuaGFzQ29udGVudHNPZkFsbFNvdXJjZXMgPVxuICBmdW5jdGlvbiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyX2hhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzKCkge1xuICAgIGlmICghdGhpcy5zb3VyY2VzQ29udGVudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudC5sZW5ndGggPj0gdGhpcy5fc291cmNlcy5zaXplKCkgJiZcbiAgICAgICF0aGlzLnNvdXJjZXNDb250ZW50LnNvbWUoZnVuY3Rpb24gKHNjKSB7IHJldHVybiBzYyA9PSBudWxsOyB9KTtcbiAgfTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzb3VyY2UgY29udGVudC4gVGhlIG9ubHkgYXJndW1lbnQgaXMgdGhlIHVybCBvZiB0aGVcbiAqIG9yaWdpbmFsIHNvdXJjZSBmaWxlLiBSZXR1cm5zIG51bGwgaWYgbm8gb3JpZ2luYWwgc291cmNlIGNvbnRlbnQgaXNcbiAqIGF2YWlsYWJsZS5cbiAqL1xuQmFzaWNTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvciA9XG4gIGZ1bmN0aW9uIFNvdXJjZU1hcENvbnN1bWVyX3NvdXJjZUNvbnRlbnRGb3IoYVNvdXJjZSwgbnVsbE9uTWlzc2luZykge1xuICAgIGlmICghdGhpcy5zb3VyY2VzQ29udGVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gdGhpcy5fZmluZFNvdXJjZUluZGV4KGFTb3VyY2UpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2VzQ29udGVudFtpbmRleF07XG4gICAgfVxuXG4gICAgdmFyIHJlbGF0aXZlU291cmNlID0gYVNvdXJjZTtcbiAgICBpZiAodGhpcy5zb3VyY2VSb290ICE9IG51bGwpIHtcbiAgICAgIHJlbGF0aXZlU291cmNlID0gdXRpbC5yZWxhdGl2ZSh0aGlzLnNvdXJjZVJvb3QsIHJlbGF0aXZlU291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgdXJsO1xuICAgIGlmICh0aGlzLnNvdXJjZVJvb3QgIT0gbnVsbFxuICAgICAgICAmJiAodXJsID0gdXRpbC51cmxQYXJzZSh0aGlzLnNvdXJjZVJvb3QpKSkge1xuICAgICAgLy8gWFhYOiBmaWxlOi8vIFVSSXMgYW5kIGFic29sdXRlIHBhdGhzIGxlYWQgdG8gdW5leHBlY3RlZCBiZWhhdmlvciBmb3JcbiAgICAgIC8vIG1hbnkgdXNlcnMuIFdlIGNhbiBoZWxwIHRoZW0gb3V0IHdoZW4gdGhleSBleHBlY3QgZmlsZTovLyBVUklzIHRvXG4gICAgICAvLyBiZWhhdmUgbGlrZSBpdCB3b3VsZCBpZiB0aGV5IHdlcmUgcnVubmluZyBhIGxvY2FsIEhUVFAgc2VydmVyLiBTZWVcbiAgICAgIC8vIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTg4NTU5Ny5cbiAgICAgIHZhciBmaWxlVXJpQWJzUGF0aCA9IHJlbGF0aXZlU291cmNlLnJlcGxhY2UoL15maWxlOlxcL1xcLy8sIFwiXCIpO1xuICAgICAgaWYgKHVybC5zY2hlbWUgPT0gXCJmaWxlXCJcbiAgICAgICAgICAmJiB0aGlzLl9zb3VyY2VzLmhhcyhmaWxlVXJpQWJzUGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlc0NvbnRlbnRbdGhpcy5fc291cmNlcy5pbmRleE9mKGZpbGVVcmlBYnNQYXRoKV1cbiAgICAgIH1cblxuICAgICAgaWYgKCghdXJsLnBhdGggfHwgdXJsLnBhdGggPT0gXCIvXCIpXG4gICAgICAgICAgJiYgdGhpcy5fc291cmNlcy5oYXMoXCIvXCIgKyByZWxhdGl2ZVNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlc0NvbnRlbnRbdGhpcy5fc291cmNlcy5pbmRleE9mKFwiL1wiICsgcmVsYXRpdmVTb3VyY2UpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgcmVjdXJzaXZlbHkgZnJvbVxuICAgIC8vIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvci4gSW4gdGhhdCBjYXNlLCB3ZVxuICAgIC8vIGRvbid0IHdhbnQgdG8gdGhyb3cgaWYgd2UgY2FuJ3QgZmluZCB0aGUgc291cmNlIC0gd2UganVzdCB3YW50IHRvXG4gICAgLy8gcmV0dXJuIG51bGwsIHNvIHdlIHByb3ZpZGUgYSBmbGFnIHRvIGV4aXQgZ3JhY2VmdWxseS5cbiAgICBpZiAobnVsbE9uTWlzc2luZykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyByZWxhdGl2ZVNvdXJjZSArICdcIiBpcyBub3QgaW4gdGhlIFNvdXJjZU1hcC4nKTtcbiAgICB9XG4gIH07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZ2VuZXJhdGVkIGxpbmUgYW5kIGNvbHVtbiBpbmZvcm1hdGlvbiBmb3IgdGhlIG9yaWdpbmFsIHNvdXJjZSxcbiAqIGxpbmUsIGFuZCBjb2x1bW4gcG9zaXRpb25zIHByb3ZpZGVkLiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3Qgd2l0aFxuICogdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBzb3VyY2U6IFRoZSBmaWxlbmFtZSBvZiB0aGUgb3JpZ2luYWwgc291cmNlLlxuICogICAtIGxpbmU6IFRoZSBsaW5lIG51bWJlciBpbiB0aGUgb3JpZ2luYWwgc291cmNlLiAgVGhlIGxpbmUgbnVtYmVyXG4gKiAgICAgaXMgMS1iYXNlZC5cbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgY29sdW1uXG4gKiAgICAgbnVtYmVyIGlzIDAtYmFzZWQuXG4gKiAgIC0gYmlhczogRWl0aGVyICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcgb3JcbiAqICAgICAnU291cmNlTWFwQ29uc3VtZXIuTEVBU1RfVVBQRVJfQk9VTkQnLiBTcGVjaWZpZXMgd2hldGhlciB0byByZXR1cm4gdGhlXG4gKiAgICAgY2xvc2VzdCBlbGVtZW50IHRoYXQgaXMgc21hbGxlciB0aGFuIG9yIGdyZWF0ZXIgdGhhbiB0aGUgb25lIHdlIGFyZVxuICogICAgIHNlYXJjaGluZyBmb3IsIHJlc3BlY3RpdmVseSwgaWYgdGhlIGV4YWN0IGVsZW1lbnQgY2Fubm90IGJlIGZvdW5kLlxuICogICAgIERlZmF1bHRzIHRvICdTb3VyY2VNYXBDb25zdW1lci5HUkVBVEVTVF9MT1dFUl9CT1VORCcuXG4gKlxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLiAgVGhlXG4gKiAgICAgbGluZSBudW1iZXIgaXMgMS1iYXNlZC5cbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLlxuICogICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXG4gKi9cbkJhc2ljU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLmdlbmVyYXRlZFBvc2l0aW9uRm9yID1cbiAgZnVuY3Rpb24gU291cmNlTWFwQ29uc3VtZXJfZ2VuZXJhdGVkUG9zaXRpb25Gb3IoYUFyZ3MpIHtcbiAgICB2YXIgc291cmNlID0gdXRpbC5nZXRBcmcoYUFyZ3MsICdzb3VyY2UnKTtcbiAgICBzb3VyY2UgPSB0aGlzLl9maW5kU291cmNlSW5kZXgoc291cmNlKTtcbiAgICBpZiAoc291cmNlIDwgMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGluZTogbnVsbCxcbiAgICAgICAgY29sdW1uOiBudWxsLFxuICAgICAgICBsYXN0Q29sdW1uOiBudWxsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHZhciBuZWVkbGUgPSB7XG4gICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgIG9yaWdpbmFsTGluZTogdXRpbC5nZXRBcmcoYUFyZ3MsICdsaW5lJyksXG4gICAgICBvcmlnaW5hbENvbHVtbjogdXRpbC5nZXRBcmcoYUFyZ3MsICdjb2x1bW4nKVxuICAgIH07XG5cbiAgICB2YXIgaW5kZXggPSB0aGlzLl9maW5kTWFwcGluZyhcbiAgICAgIG5lZWRsZSxcbiAgICAgIHRoaXMuX29yaWdpbmFsTWFwcGluZ3MsXG4gICAgICBcIm9yaWdpbmFsTGluZVwiLFxuICAgICAgXCJvcmlnaW5hbENvbHVtblwiLFxuICAgICAgdXRpbC5jb21wYXJlQnlPcmlnaW5hbFBvc2l0aW9ucyxcbiAgICAgIHV0aWwuZ2V0QXJnKGFBcmdzLCAnYmlhcycsIFNvdXJjZU1hcENvbnN1bWVyLkdSRUFURVNUX0xPV0VSX0JPVU5EKVxuICAgICk7XG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdmFyIG1hcHBpbmcgPSB0aGlzLl9vcmlnaW5hbE1hcHBpbmdzW2luZGV4XTtcblxuICAgICAgaWYgKG1hcHBpbmcuc291cmNlID09PSBuZWVkbGUuc291cmNlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGluZTogdXRpbC5nZXRBcmcobWFwcGluZywgJ2dlbmVyYXRlZExpbmUnLCBudWxsKSxcbiAgICAgICAgICBjb2x1bW46IHV0aWwuZ2V0QXJnKG1hcHBpbmcsICdnZW5lcmF0ZWRDb2x1bW4nLCBudWxsKSxcbiAgICAgICAgICBsYXN0Q29sdW1uOiB1dGlsLmdldEFyZyhtYXBwaW5nLCAnbGFzdEdlbmVyYXRlZENvbHVtbicsIG51bGwpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbmU6IG51bGwsXG4gICAgICBjb2x1bW46IG51bGwsXG4gICAgICBsYXN0Q29sdW1uOiBudWxsXG4gICAgfTtcbiAgfTtcblxudmFyIEJhc2ljU291cmNlTWFwQ29uc3VtZXJfMSA9IEJhc2ljU291cmNlTWFwQ29uc3VtZXI7XG5cbi8qKlxuICogQW4gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyIGluc3RhbmNlIHJlcHJlc2VudHMgYSBwYXJzZWQgc291cmNlIG1hcCB3aGljaFxuICogd2UgY2FuIHF1ZXJ5IGZvciBpbmZvcm1hdGlvbi4gSXQgZGlmZmVycyBmcm9tIEJhc2ljU291cmNlTWFwQ29uc3VtZXIgaW5cbiAqIHRoYXQgaXQgdGFrZXMgXCJpbmRleGVkXCIgc291cmNlIG1hcHMgKGkuZS4gb25lcyB3aXRoIGEgXCJzZWN0aW9uc1wiIGZpZWxkKSBhc1xuICogaW5wdXQuXG4gKlxuICogVGhlIGZpcnN0IHBhcmFtZXRlciBpcyBhIHJhdyBzb3VyY2UgbWFwIChlaXRoZXIgYXMgYSBKU09OIHN0cmluZywgb3IgYWxyZWFkeVxuICogcGFyc2VkIHRvIGFuIG9iamVjdCkuIEFjY29yZGluZyB0byB0aGUgc3BlYyBmb3IgaW5kZXhlZCBzb3VyY2UgbWFwcywgdGhleVxuICogaGF2ZSB0aGUgZm9sbG93aW5nIGF0dHJpYnV0ZXM6XG4gKlxuICogICAtIHZlcnNpb246IFdoaWNoIHZlcnNpb24gb2YgdGhlIHNvdXJjZSBtYXAgc3BlYyB0aGlzIG1hcCBpcyBmb2xsb3dpbmcuXG4gKiAgIC0gZmlsZTogT3B0aW9uYWwuIFRoZSBnZW5lcmF0ZWQgZmlsZSB0aGlzIHNvdXJjZSBtYXAgaXMgYXNzb2NpYXRlZCB3aXRoLlxuICogICAtIHNlY3Rpb25zOiBBIGxpc3Qgb2Ygc2VjdGlvbiBkZWZpbml0aW9ucy5cbiAqXG4gKiBFYWNoIHZhbHVlIHVuZGVyIHRoZSBcInNlY3Rpb25zXCIgZmllbGQgaGFzIHR3byBmaWVsZHM6XG4gKiAgIC0gb2Zmc2V0OiBUaGUgb2Zmc2V0IGludG8gdGhlIG9yaWdpbmFsIHNwZWNpZmllZCBhdCB3aGljaCB0aGlzIHNlY3Rpb25cbiAqICAgICAgIGJlZ2lucyB0byBhcHBseSwgZGVmaW5lZCBhcyBhbiBvYmplY3Qgd2l0aCBhIFwibGluZVwiIGFuZCBcImNvbHVtblwiXG4gKiAgICAgICBmaWVsZC5cbiAqICAgLSBtYXA6IEEgc291cmNlIG1hcCBkZWZpbml0aW9uLiBUaGlzIHNvdXJjZSBtYXAgY291bGQgYWxzbyBiZSBpbmRleGVkLFxuICogICAgICAgYnV0IGRvZXNuJ3QgaGF2ZSB0byBiZS5cbiAqXG4gKiBJbnN0ZWFkIG9mIHRoZSBcIm1hcFwiIGZpZWxkLCBpdCdzIGFsc28gcG9zc2libGUgdG8gaGF2ZSBhIFwidXJsXCIgZmllbGRcbiAqIHNwZWNpZnlpbmcgYSBVUkwgdG8gcmV0cmlldmUgYSBzb3VyY2UgbWFwIGZyb20sIGJ1dCB0aGF0J3MgY3VycmVudGx5XG4gKiB1bnN1cHBvcnRlZC5cbiAqXG4gKiBIZXJlJ3MgYW4gZXhhbXBsZSBzb3VyY2UgbWFwLCB0YWtlbiBmcm9tIHRoZSBzb3VyY2UgbWFwIHNwZWNbMF0sIGJ1dFxuICogbW9kaWZpZWQgdG8gb21pdCBhIHNlY3Rpb24gd2hpY2ggdXNlcyB0aGUgXCJ1cmxcIiBmaWVsZC5cbiAqXG4gKiAge1xuICogICAgdmVyc2lvbiA6IDMsXG4gKiAgICBmaWxlOiBcImFwcC5qc1wiLFxuICogICAgc2VjdGlvbnM6IFt7XG4gKiAgICAgIG9mZnNldDoge2xpbmU6MTAwLCBjb2x1bW46MTB9LFxuICogICAgICBtYXA6IHtcbiAqICAgICAgICB2ZXJzaW9uIDogMyxcbiAqICAgICAgICBmaWxlOiBcInNlY3Rpb24uanNcIixcbiAqICAgICAgICBzb3VyY2VzOiBbXCJmb28uanNcIiwgXCJiYXIuanNcIl0sXG4gKiAgICAgICAgbmFtZXM6IFtcInNyY1wiLCBcIm1hcHNcIiwgXCJhcmVcIiwgXCJmdW5cIl0sXG4gKiAgICAgICAgbWFwcGluZ3M6IFwiQUFBQSxFOztBQkNERTtcIlxuICogICAgICB9XG4gKiAgICB9XSxcbiAqICB9XG4gKlxuICogVGhlIHNlY29uZCBwYXJhbWV0ZXIsIGlmIGdpdmVuLCBpcyBhIHN0cmluZyB3aG9zZSB2YWx1ZSBpcyB0aGUgVVJMXG4gKiBhdCB3aGljaCB0aGUgc291cmNlIG1hcCB3YXMgZm91bmQuICBUaGlzIFVSTCBpcyB1c2VkIHRvIGNvbXB1dGUgdGhlXG4gKiBzb3VyY2VzIGFycmF5LlxuICpcbiAqIFswXTogaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vZG9jdW1lbnQvZC8xVTFSR0FlaFF3UnlwVVRvdkYxS1JscGlPRnplMGItXzJnYzZmQUgwS1kway9lZGl0I2hlYWRpbmc9aC41MzVlczN4ZXByZ3RcbiAqL1xuZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyKGFTb3VyY2VNYXAsIGFTb3VyY2VNYXBVUkwpIHtcbiAgdmFyIHNvdXJjZU1hcCA9IGFTb3VyY2VNYXA7XG4gIGlmICh0eXBlb2YgYVNvdXJjZU1hcCA9PT0gJ3N0cmluZycpIHtcbiAgICBzb3VyY2VNYXAgPSB1dGlsLnBhcnNlU291cmNlTWFwSW5wdXQoYVNvdXJjZU1hcCk7XG4gIH1cblxuICB2YXIgdmVyc2lvbiA9IHV0aWwuZ2V0QXJnKHNvdXJjZU1hcCwgJ3ZlcnNpb24nKTtcbiAgdmFyIHNlY3Rpb25zID0gdXRpbC5nZXRBcmcoc291cmNlTWFwLCAnc2VjdGlvbnMnKTtcblxuICBpZiAodmVyc2lvbiAhPSB0aGlzLl92ZXJzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB2ZXJzaW9uOiAnICsgdmVyc2lvbik7XG4gIH1cblxuICB0aGlzLl9zb3VyY2VzID0gbmV3IEFycmF5U2V0JDEoKTtcbiAgdGhpcy5fbmFtZXMgPSBuZXcgQXJyYXlTZXQkMSgpO1xuXG4gIHZhciBsYXN0T2Zmc2V0ID0ge1xuICAgIGxpbmU6IC0xLFxuICAgIGNvbHVtbjogMFxuICB9O1xuICB0aGlzLl9zZWN0aW9ucyA9IHNlY3Rpb25zLm1hcChmdW5jdGlvbiAocykge1xuICAgIGlmIChzLnVybCkge1xuICAgICAgLy8gVGhlIHVybCBmaWVsZCB3aWxsIHJlcXVpcmUgc3VwcG9ydCBmb3IgYXN5bmNocm9uaWNpdHkuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvc291cmNlLW1hcC9pc3N1ZXMvMTZcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3VwcG9ydCBmb3IgdXJsIGZpZWxkIGluIHNlY3Rpb25zIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG4gICAgdmFyIG9mZnNldCA9IHV0aWwuZ2V0QXJnKHMsICdvZmZzZXQnKTtcbiAgICB2YXIgb2Zmc2V0TGluZSA9IHV0aWwuZ2V0QXJnKG9mZnNldCwgJ2xpbmUnKTtcbiAgICB2YXIgb2Zmc2V0Q29sdW1uID0gdXRpbC5nZXRBcmcob2Zmc2V0LCAnY29sdW1uJyk7XG5cbiAgICBpZiAob2Zmc2V0TGluZSA8IGxhc3RPZmZzZXQubGluZSB8fFxuICAgICAgICAob2Zmc2V0TGluZSA9PT0gbGFzdE9mZnNldC5saW5lICYmIG9mZnNldENvbHVtbiA8IGxhc3RPZmZzZXQuY29sdW1uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWN0aW9uIG9mZnNldHMgbXVzdCBiZSBvcmRlcmVkIGFuZCBub24tb3ZlcmxhcHBpbmcuJyk7XG4gICAgfVxuICAgIGxhc3RPZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZ2VuZXJhdGVkT2Zmc2V0OiB7XG4gICAgICAgIC8vIFRoZSBvZmZzZXQgZmllbGRzIGFyZSAwLWJhc2VkLCBidXQgd2UgdXNlIDEtYmFzZWQgaW5kaWNlcyB3aGVuXG4gICAgICAgIC8vIGVuY29kaW5nL2RlY29kaW5nIGZyb20gVkxRLlxuICAgICAgICBnZW5lcmF0ZWRMaW5lOiBvZmZzZXRMaW5lICsgMSxcbiAgICAgICAgZ2VuZXJhdGVkQ29sdW1uOiBvZmZzZXRDb2x1bW4gKyAxXG4gICAgICB9LFxuICAgICAgY29uc3VtZXI6IG5ldyBTb3VyY2VNYXBDb25zdW1lcih1dGlsLmdldEFyZyhzLCAnbWFwJyksIGFTb3VyY2VNYXBVUkwpXG4gICAgfVxuICB9KTtcbn1cblxuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlKTtcbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTb3VyY2VNYXBDb25zdW1lcjtcblxuLyoqXG4gKiBUaGUgdmVyc2lvbiBvZiB0aGUgc291cmNlIG1hcHBpbmcgc3BlYyB0aGF0IHdlIGFyZSBjb25zdW1pbmcuXG4gKi9cbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3ZlcnNpb24gPSAzO1xuXG4vKipcbiAqIFRoZSBsaXN0IG9mIG9yaWdpbmFsIHNvdXJjZXMuXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShJbmRleGVkU291cmNlTWFwQ29uc3VtZXIucHJvdG90eXBlLCAnc291cmNlcycsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNvdXJjZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuX3NlY3Rpb25zW2ldLmNvbnN1bWVyLnNvdXJjZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgc291cmNlcy5wdXNoKHRoaXMuX3NlY3Rpb25zW2ldLmNvbnN1bWVyLnNvdXJjZXNbal0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlcztcbiAgfVxufSk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlLCBsaW5lLCBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgZ2VuZXJhdGVkXG4gKiBzb3VyY2UncyBsaW5lIGFuZCBjb2x1bW4gcG9zaXRpb25zIHByb3ZpZGVkLiBUaGUgb25seSBhcmd1bWVudCBpcyBhbiBvYmplY3RcbiAqIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcbiAqICAgICBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UuICBUaGUgY29sdW1uXG4gKiAgICAgbnVtYmVyIGlzIDAtYmFzZWQuXG4gKlxuICogYW5kIGFuIG9iamVjdCBpcyByZXR1cm5lZCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gc291cmNlOiBUaGUgb3JpZ2luYWwgc291cmNlIGZpbGUsIG9yIG51bGwuXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UsIG9yIG51bGwuICBUaGVcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZSwgb3IgbnVsbC4gIFRoZVxuICogICAgIGNvbHVtbiBudW1iZXIgaXMgMC1iYXNlZC5cbiAqICAgLSBuYW1lOiBUaGUgb3JpZ2luYWwgaWRlbnRpZmllciwgb3IgbnVsbC5cbiAqL1xuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5vcmlnaW5hbFBvc2l0aW9uRm9yID1cbiAgZnVuY3Rpb24gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyX29yaWdpbmFsUG9zaXRpb25Gb3IoYUFyZ3MpIHtcbiAgICB2YXIgbmVlZGxlID0ge1xuICAgICAgZ2VuZXJhdGVkTGluZTogdXRpbC5nZXRBcmcoYUFyZ3MsICdsaW5lJyksXG4gICAgICBnZW5lcmF0ZWRDb2x1bW46IHV0aWwuZ2V0QXJnKGFBcmdzLCAnY29sdW1uJylcbiAgICB9O1xuXG4gICAgLy8gRmluZCB0aGUgc2VjdGlvbiBjb250YWluaW5nIHRoZSBnZW5lcmF0ZWQgcG9zaXRpb24gd2UncmUgdHJ5aW5nIHRvIG1hcFxuICAgIC8vIHRvIGFuIG9yaWdpbmFsIHBvc2l0aW9uLlxuICAgIHZhciBzZWN0aW9uSW5kZXggPSBiaW5hcnlTZWFyY2guc2VhcmNoKG5lZWRsZSwgdGhpcy5fc2VjdGlvbnMsXG4gICAgICBmdW5jdGlvbihuZWVkbGUsIHNlY3Rpb24pIHtcbiAgICAgICAgdmFyIGNtcCA9IG5lZWRsZS5nZW5lcmF0ZWRMaW5lIC0gc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZTtcbiAgICAgICAgaWYgKGNtcCkge1xuICAgICAgICAgIHJldHVybiBjbXA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKG5lZWRsZS5nZW5lcmF0ZWRDb2x1bW4gLVxuICAgICAgICAgICAgICAgIHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbik7XG4gICAgICB9KTtcbiAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW3NlY3Rpb25JbmRleF07XG5cbiAgICBpZiAoIXNlY3Rpb24pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvdXJjZTogbnVsbCxcbiAgICAgICAgbGluZTogbnVsbCxcbiAgICAgICAgY29sdW1uOiBudWxsLFxuICAgICAgICBuYW1lOiBudWxsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWN0aW9uLmNvbnN1bWVyLm9yaWdpbmFsUG9zaXRpb25Gb3Ioe1xuICAgICAgbGluZTogbmVlZGxlLmdlbmVyYXRlZExpbmUgLVxuICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxuICAgICAgY29sdW1uOiBuZWVkbGUuZ2VuZXJhdGVkQ29sdW1uIC1cbiAgICAgICAgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgPT09IG5lZWRsZS5nZW5lcmF0ZWRMaW5lXG4gICAgICAgICA/IHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZENvbHVtbiAtIDFcbiAgICAgICAgIDogMCksXG4gICAgICBiaWFzOiBhQXJncy5iaWFzXG4gICAgfSk7XG4gIH07XG5cbi8qKlxuICogUmV0dXJuIHRydWUgaWYgd2UgaGF2ZSB0aGUgc291cmNlIGNvbnRlbnQgZm9yIGV2ZXJ5IHNvdXJjZSBpbiB0aGUgc291cmNlXG4gKiBtYXAsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyLnByb3RvdHlwZS5oYXNDb250ZW50c09mQWxsU291cmNlcyA9XG4gIGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9oYXNDb250ZW50c09mQWxsU291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fc2VjdGlvbnMuZXZlcnkoZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBzLmNvbnN1bWVyLmhhc0NvbnRlbnRzT2ZBbGxTb3VyY2VzKCk7XG4gICAgfSk7XG4gIH07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgb3JpZ2luYWwgc291cmNlIGNvbnRlbnQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIHRoZSB1cmwgb2YgdGhlXG4gKiBvcmlnaW5hbCBzb3VyY2UgZmlsZS4gUmV0dXJucyBudWxsIGlmIG5vIG9yaWdpbmFsIHNvdXJjZSBjb250ZW50IGlzXG4gKiBhdmFpbGFibGUuXG4gKi9cbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuc291cmNlQ29udGVudEZvciA9XG4gIGZ1bmN0aW9uIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl9zb3VyY2VDb250ZW50Rm9yKGFTb3VyY2UsIG51bGxPbk1pc3NpbmcpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW2ldO1xuXG4gICAgICB2YXIgY29udGVudCA9IHNlY3Rpb24uY29uc3VtZXIuc291cmNlQ29udGVudEZvcihhU291cmNlLCB0cnVlKTtcbiAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobnVsbE9uTWlzc2luZykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBhU291cmNlICsgJ1wiIGlzIG5vdCBpbiB0aGUgU291cmNlTWFwLicpO1xuICAgIH1cbiAgfTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBnZW5lcmF0ZWQgbGluZSBhbmQgY29sdW1uIGluZm9ybWF0aW9uIGZvciB0aGUgb3JpZ2luYWwgc291cmNlLFxuICogbGluZSwgYW5kIGNvbHVtbiBwb3NpdGlvbnMgcHJvdmlkZWQuIFRoZSBvbmx5IGFyZ3VtZW50IGlzIGFuIG9iamVjdCB3aXRoXG4gKiB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogICAtIHNvdXJjZTogVGhlIGZpbGVuYW1lIG9mIHRoZSBvcmlnaW5hbCBzb3VyY2UuXG4gKiAgIC0gbGluZTogVGhlIGxpbmUgbnVtYmVyIGluIHRoZSBvcmlnaW5hbCBzb3VyY2UuICBUaGUgbGluZSBudW1iZXJcbiAqICAgICBpcyAxLWJhc2VkLlxuICogICAtIGNvbHVtbjogVGhlIGNvbHVtbiBudW1iZXIgaW4gdGhlIG9yaWdpbmFsIHNvdXJjZS4gIFRoZSBjb2x1bW5cbiAqICAgICBudW1iZXIgaXMgMC1iYXNlZC5cbiAqXG4gKiBhbmQgYW4gb2JqZWN0IGlzIHJldHVybmVkIHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBsaW5lOiBUaGUgbGluZSBudW1iZXIgaW4gdGhlIGdlbmVyYXRlZCBzb3VyY2UsIG9yIG51bGwuICBUaGVcbiAqICAgICBsaW5lIG51bWJlciBpcyAxLWJhc2VkLiBcbiAqICAgLSBjb2x1bW46IFRoZSBjb2x1bW4gbnVtYmVyIGluIHRoZSBnZW5lcmF0ZWQgc291cmNlLCBvciBudWxsLlxuICogICAgIFRoZSBjb2x1bW4gbnVtYmVyIGlzIDAtYmFzZWQuXG4gKi9cbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuZ2VuZXJhdGVkUG9zaXRpb25Gb3IgPVxuICBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfZ2VuZXJhdGVkUG9zaXRpb25Gb3IoYUFyZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc2VjdGlvbiA9IHRoaXMuX3NlY3Rpb25zW2ldO1xuXG4gICAgICAvLyBPbmx5IGNvbnNpZGVyIHRoaXMgc2VjdGlvbiBpZiB0aGUgcmVxdWVzdGVkIHNvdXJjZSBpcyBpbiB0aGUgbGlzdCBvZlxuICAgICAgLy8gc291cmNlcyBvZiB0aGUgY29uc3VtZXIuXG4gICAgICBpZiAoc2VjdGlvbi5jb25zdW1lci5fZmluZFNvdXJjZUluZGV4KHV0aWwuZ2V0QXJnKGFBcmdzLCAnc291cmNlJykpID09PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBnZW5lcmF0ZWRQb3NpdGlvbiA9IHNlY3Rpb24uY29uc3VtZXIuZ2VuZXJhdGVkUG9zaXRpb25Gb3IoYUFyZ3MpO1xuICAgICAgaWYgKGdlbmVyYXRlZFBvc2l0aW9uKSB7XG4gICAgICAgIHZhciByZXQgPSB7XG4gICAgICAgICAgbGluZTogZ2VuZXJhdGVkUG9zaXRpb24ubGluZSArXG4gICAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxuICAgICAgICAgIGNvbHVtbjogZ2VuZXJhdGVkUG9zaXRpb24uY29sdW1uICtcbiAgICAgICAgICAgIChzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRMaW5lID09PSBnZW5lcmF0ZWRQb3NpdGlvbi5saW5lXG4gICAgICAgICAgICAgPyBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW4gLSAxXG4gICAgICAgICAgICAgOiAwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBsaW5lOiBudWxsLFxuICAgICAgY29sdW1uOiBudWxsXG4gICAgfTtcbiAgfTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgbWFwcGluZ3MgaW4gYSBzdHJpbmcgaW4gdG8gYSBkYXRhIHN0cnVjdHVyZSB3aGljaCB3ZSBjYW4gZWFzaWx5XG4gKiBxdWVyeSAodGhlIG9yZGVyZWQgYXJyYXlzIGluIHRoZSBgdGhpcy5fX2dlbmVyYXRlZE1hcHBpbmdzYCBhbmRcbiAqIGB0aGlzLl9fb3JpZ2luYWxNYXBwaW5nc2AgcHJvcGVydGllcykuXG4gKi9cbkluZGV4ZWRTb3VyY2VNYXBDb25zdW1lci5wcm90b3R5cGUuX3BhcnNlTWFwcGluZ3MgPVxuICBmdW5jdGlvbiBJbmRleGVkU291cmNlTWFwQ29uc3VtZXJfcGFyc2VNYXBwaW5ncyhhU3RyLCBhU291cmNlUm9vdCkge1xuICAgIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncyA9IFtdO1xuICAgIHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNlY3Rpb24gPSB0aGlzLl9zZWN0aW9uc1tpXTtcbiAgICAgIHZhciBzZWN0aW9uTWFwcGluZ3MgPSBzZWN0aW9uLmNvbnN1bWVyLl9nZW5lcmF0ZWRNYXBwaW5ncztcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VjdGlvbk1hcHBpbmdzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBtYXBwaW5nID0gc2VjdGlvbk1hcHBpbmdzW2pdO1xuXG4gICAgICAgIHZhciBzb3VyY2UgPSBzZWN0aW9uLmNvbnN1bWVyLl9zb3VyY2VzLmF0KG1hcHBpbmcuc291cmNlKTtcbiAgICAgICAgc291cmNlID0gdXRpbC5jb21wdXRlU291cmNlVVJMKHNlY3Rpb24uY29uc3VtZXIuc291cmNlUm9vdCwgc291cmNlLCB0aGlzLl9zb3VyY2VNYXBVUkwpO1xuICAgICAgICB0aGlzLl9zb3VyY2VzLmFkZChzb3VyY2UpO1xuICAgICAgICBzb3VyY2UgPSB0aGlzLl9zb3VyY2VzLmluZGV4T2Yoc291cmNlKTtcblxuICAgICAgICB2YXIgbmFtZSA9IG51bGw7XG4gICAgICAgIGlmIChtYXBwaW5nLm5hbWUpIHtcbiAgICAgICAgICBuYW1lID0gc2VjdGlvbi5jb25zdW1lci5fbmFtZXMuYXQobWFwcGluZy5uYW1lKTtcbiAgICAgICAgICB0aGlzLl9uYW1lcy5hZGQobmFtZSk7XG4gICAgICAgICAgbmFtZSA9IHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgbWFwcGluZ3MgY29taW5nIGZyb20gdGhlIGNvbnN1bWVyIGZvciB0aGUgc2VjdGlvbiBoYXZlXG4gICAgICAgIC8vIGdlbmVyYXRlZCBwb3NpdGlvbnMgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBzZWN0aW9uLCBzbyB3ZVxuICAgICAgICAvLyBuZWVkIHRvIG9mZnNldCB0aGVtIHRvIGJlIHJlbGF0aXZlIHRvIHRoZSBzdGFydCBvZiB0aGUgY29uY2F0ZW5hdGVkXG4gICAgICAgIC8vIGdlbmVyYXRlZCBmaWxlLlxuICAgICAgICB2YXIgYWRqdXN0ZWRNYXBwaW5nID0ge1xuICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgIGdlbmVyYXRlZExpbmU6IG1hcHBpbmcuZ2VuZXJhdGVkTGluZSArXG4gICAgICAgICAgICAoc2VjdGlvbi5nZW5lcmF0ZWRPZmZzZXQuZ2VuZXJhdGVkTGluZSAtIDEpLFxuICAgICAgICAgIGdlbmVyYXRlZENvbHVtbjogbWFwcGluZy5nZW5lcmF0ZWRDb2x1bW4gK1xuICAgICAgICAgICAgKHNlY3Rpb24uZ2VuZXJhdGVkT2Zmc2V0LmdlbmVyYXRlZExpbmUgPT09IG1hcHBpbmcuZ2VuZXJhdGVkTGluZVxuICAgICAgICAgICAgPyBzZWN0aW9uLmdlbmVyYXRlZE9mZnNldC5nZW5lcmF0ZWRDb2x1bW4gLSAxXG4gICAgICAgICAgICA6IDApLFxuICAgICAgICAgIG9yaWdpbmFsTGluZTogbWFwcGluZy5vcmlnaW5hbExpbmUsXG4gICAgICAgICAgb3JpZ2luYWxDb2x1bW46IG1hcHBpbmcub3JpZ2luYWxDb2x1bW4sXG4gICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuX19nZW5lcmF0ZWRNYXBwaW5ncy5wdXNoKGFkanVzdGVkTWFwcGluZyk7XG4gICAgICAgIGlmICh0eXBlb2YgYWRqdXN0ZWRNYXBwaW5nLm9yaWdpbmFsTGluZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICB0aGlzLl9fb3JpZ2luYWxNYXBwaW5ncy5wdXNoKGFkanVzdGVkTWFwcGluZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBxdWlja1NvcnQkMSh0aGlzLl9fZ2VuZXJhdGVkTWFwcGluZ3MsIHV0aWwuY29tcGFyZUJ5R2VuZXJhdGVkUG9zaXRpb25zRGVmbGF0ZWQpO1xuICAgIHF1aWNrU29ydCQxKHRoaXMuX19vcmlnaW5hbE1hcHBpbmdzLCB1dGlsLmNvbXBhcmVCeU9yaWdpbmFsUG9zaXRpb25zKTtcbiAgfTtcblxudmFyIEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcl8xID0gSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyO1xuXG52YXIgc291cmNlTWFwQ29uc3VtZXIgPSB7XG5cdFNvdXJjZU1hcENvbnN1bWVyOiBTb3VyY2VNYXBDb25zdW1lcl8xLFxuXHRCYXNpY1NvdXJjZU1hcENvbnN1bWVyOiBCYXNpY1NvdXJjZU1hcENvbnN1bWVyXzEsXG5cdEluZGV4ZWRTb3VyY2VNYXBDb25zdW1lcjogSW5kZXhlZFNvdXJjZU1hcENvbnN1bWVyXzFcbn07XG5cbnZhciBTb3VyY2VNYXBDb25zdW1lciQxID0gc291cmNlTWFwQ29uc3VtZXIuU291cmNlTWFwQ29uc3VtZXI7XG5cbmZ1bmN0aW9uIGdldF9zb3VyY2VtYXBfdXJsKGNvbnRlbnRzKSB7XHJcbiAgICBjb25zdCByZXZlcnNlZCA9IGNvbnRlbnRzXHJcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxyXG4gICAgICAgIC5yZXZlcnNlKClcclxuICAgICAgICAuam9pbignXFxuJyk7XHJcbiAgICBjb25zdCBtYXRjaCA9IC9cXC9bLypdI1sgXFx0XStzb3VyY2VNYXBwaW5nVVJMPShbXlxccydcIl0rPykoPzpbIFxcdF0rfCQpL2dtLmV4ZWMocmV2ZXJzZWQpO1xyXG4gICAgaWYgKG1hdGNoKVxyXG4gICAgICAgIHJldHVybiBtYXRjaFsxXTtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuY29uc3QgZmlsZV9jYWNoZSA9IG5ldyBNYXAoKTtcclxuZnVuY3Rpb24gZ2V0X2ZpbGVfY29udGVudHMoZmlsZV9wYXRoKSB7XHJcbiAgICBpZiAoZmlsZV9jYWNoZS5oYXMoZmlsZV9wYXRoKSkge1xyXG4gICAgICAgIHJldHVybiBmaWxlX2NhY2hlLmdldChmaWxlX3BhdGgpO1xyXG4gICAgfVxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKGZpbGVfcGF0aCwgJ3V0ZjgnKTtcclxuICAgICAgICBmaWxlX2NhY2hlLnNldChmaWxlX3BhdGgsIGRhdGEpO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzb3VyY2VtYXBfc3RhY2t0cmFjZShzdGFjaykge1xyXG4gICAgY29uc3QgcmVwbGFjZSA9IChsaW5lKSA9PiBsaW5lLnJlcGxhY2UoL14gezR9YXQgKD86KC4rPylcXHMrXFwoKT8oPzooLis/KTooXFxkKykoPzo6KFxcZCspKT8pXFwpPy8sIChpbnB1dCwgdmFyX25hbWUsIGZpbGVfcGF0aCwgbGluZV9udW0sIGNvbHVtbikgPT4ge1xyXG4gICAgICAgIGlmICghZmlsZV9wYXRoKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgY29uc3QgY29udGVudHMgPSBnZXRfZmlsZV9jb250ZW50cyhmaWxlX3BhdGgpO1xyXG4gICAgICAgIGlmICghY29udGVudHMpXHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICBjb25zdCBzb3VyY2VtYXBfdXJsID0gZ2V0X3NvdXJjZW1hcF91cmwoY29udGVudHMpO1xyXG4gICAgICAgIGlmICghc291cmNlbWFwX3VybClcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIGxldCBkaXIgPSBwYXRoLmRpcm5hbWUoZmlsZV9wYXRoKTtcclxuICAgICAgICBsZXQgc291cmNlbWFwX2RhdGE7XHJcbiAgICAgICAgaWYgKC9eZGF0YTphcHBsaWNhdGlvblxcL2pzb25bXixdK2Jhc2U2NCwvLnRlc3Qoc291cmNlbWFwX3VybCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcmF3X2RhdGEgPSBzb3VyY2VtYXBfdXJsLnNsaWNlKHNvdXJjZW1hcF91cmwuaW5kZXhPZignLCcpICsgMSk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VtYXBfZGF0YSA9IEJ1ZmZlci5mcm9tKHJhd19kYXRhLCAnYmFzZTY0JykudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc291cmNlbWFwX3BhdGggPSBwYXRoLnJlc29sdmUoZGlyLCBzb3VyY2VtYXBfdXJsKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGdldF9maWxlX2NvbnRlbnRzKHNvdXJjZW1hcF9wYXRoKTtcclxuICAgICAgICAgICAgaWYgKCFkYXRhKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgICAgICBzb3VyY2VtYXBfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGRpciA9IHBhdGguZGlybmFtZShzb3VyY2VtYXBfcGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByYXdfc291cmNlbWFwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJhd19zb3VyY2VtYXAgPSBKU09OLnBhcnNlKHNvdXJjZW1hcF9kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKF9iKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY29uc3VtZXIgPSBuZXcgU291cmNlTWFwQ29uc3VtZXIkMShyYXdfc291cmNlbWFwKTtcclxuICAgICAgICBjb25zdCBwb3MgPSBjb25zdW1lci5vcmlnaW5hbFBvc2l0aW9uRm9yKHtcclxuICAgICAgICAgICAgbGluZTogTnVtYmVyKGxpbmVfbnVtKSxcclxuICAgICAgICAgICAgY29sdW1uOiBOdW1iZXIoY29sdW1uKSxcclxuICAgICAgICAgICAgYmlhczogU291cmNlTWFwQ29uc3VtZXIkMS5MRUFTVF9VUFBFUl9CT1VORFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcG9zLnNvdXJjZSlcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZV9wYXRoID0gcGF0aC5yZXNvbHZlKGRpciwgcG9zLnNvdXJjZSk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gYCR7c291cmNlX3BhdGh9OiR7cG9zLmxpbmUgfHwgMH06JHtwb3MuY29sdW1uIHx8IDB9YDtcclxuICAgICAgICBpZiAoIXZhcl9uYW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gYCAgICBhdCAke3NvdXJjZX1gO1xyXG4gICAgICAgIHJldHVybiBgICAgIGF0ICR7dmFyX25hbWV9ICgke3NvdXJjZX0pYDtcclxuICAgIH0pO1xyXG4gICAgZmlsZV9jYWNoZS5jbGVhcigpO1xyXG4gICAgcmV0dXJuIHN0YWNrXHJcbiAgICAgICAgLnNwbGl0KCdcXG4nKVxyXG4gICAgICAgIC5tYXAocmVwbGFjZSlcclxuICAgICAgICAuam9pbignXFxuJyk7XHJcbn1cblxuZnVuY3Rpb24gZ2V0X3BhZ2VfaGFuZGxlcihtYW5pZmVzdCwgc2Vzc2lvbl9nZXR0ZXIpIHtcclxuICAgIGNvbnN0IGdldF9idWlsZF9pbmZvID0gZGV2XHJcbiAgICAgICAgPyAoKSA9PiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnYnVpbGQuanNvbicpLCAndXRmLTgnKSlcclxuICAgICAgICA6IChhc3NldHMgPT4gKCkgPT4gYXNzZXRzKShKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnYnVpbGQuanNvbicpLCAndXRmLTgnKSkpO1xyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBkZXZcclxuICAgICAgICA/ICgpID0+IHJlYWRfdGVtcGxhdGUoc3JjX2RpcilcclxuICAgICAgICA6IChzdHIgPT4gKCkgPT4gc3RyKShyZWFkX3RlbXBsYXRlKGJ1aWxkX2RpcikpO1xyXG4gICAgY29uc3QgaGFzX3NlcnZpY2Vfd29ya2VyID0gZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMnKSk7XHJcbiAgICBjb25zdCB7IHBhZ2VzLCBlcnJvcjogZXJyb3Jfcm91dGUgfSA9IG1hbmlmZXN0O1xyXG4gICAgZnVuY3Rpb24gYmFpbChyZXEsIHJlcywgZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBkZXYgPyBlc2NhcGVfaHRtbChlcnIubWVzc2FnZSkgOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJztcclxuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcclxuICAgICAgICByZXMuZW5kKGA8cHJlPiR7bWVzc2FnZX08L3ByZT5gKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGhhbmRsZV9lcnJvcihyZXEsIHJlcywgc3RhdHVzQ29kZSwgZXJyb3IpIHtcclxuICAgICAgICBoYW5kbGVfcGFnZSh7XHJcbiAgICAgICAgICAgIHBhdHRlcm46IG51bGwsXHJcbiAgICAgICAgICAgIHBhcnRzOiBbXHJcbiAgICAgICAgICAgICAgICB7IG5hbWU6IG51bGwsIGNvbXBvbmVudDogeyBkZWZhdWx0OiBlcnJvcl9yb3V0ZSB9IH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0sIHJlcSwgcmVzLCBzdGF0dXNDb2RlLCBlcnJvciB8fCAnVW5rbm93biBlcnJvcicpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaGFuZGxlX3BhZ2UocGFnZSwgcmVxLCByZXMsIHN0YXR1cyA9IDIwMCwgZXJyb3IgPSBudWxsKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYjtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBjb25zdCBpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCA9IHJlcS5wYXRoID09PSAnL3NlcnZpY2Utd29ya2VyLWluZGV4Lmh0bWwnO1xyXG4gICAgICAgICAgICBjb25zdCBidWlsZF9pbmZvID0gZ2V0X2J1aWxkX2luZm8oKTtcclxuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xyXG4gICAgICAgICAgICAvLyBwcmVsb2FkIG1haW4ganMgYW5kIGNzc1xyXG4gICAgICAgICAgICAvLyBUT0RPIGRldGVjdCBvdGhlciBzdHVmZiB3ZSBjYW4gcHJlbG9hZCBsaWtlIGZvbnRzP1xyXG4gICAgICAgICAgICBsZXQgcHJlbG9hZF9maWxlcyA9IEFycmF5LmlzQXJyYXkoYnVpbGRfaW5mby5hc3NldHMubWFpbikgPyBidWlsZF9pbmZvLmFzc2V0cy5tYWluIDogW2J1aWxkX2luZm8uYXNzZXRzLm1haW5dO1xyXG4gICAgICAgICAgICBpZiAoKF9hID0gYnVpbGRfaW5mbyA9PT0gbnVsbCB8fCBidWlsZF9pbmZvID09PSB2b2lkIDAgPyB2b2lkIDAgOiBidWlsZF9pbmZvLmNzcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1haW4pIHtcclxuICAgICAgICAgICAgICAgIHByZWxvYWRfZmlsZXMgPSBwcmVsb2FkX2ZpbGVzLmNvbmNhdCgoX2IgPSBidWlsZF9pbmZvID09PSBudWxsIHx8IGJ1aWxkX2luZm8gPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJ1aWxkX2luZm8uY3NzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubWFpbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGVzNl9wcmVsb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChidWlsZF9pbmZvLmJ1bmRsZXIgPT09ICdyb2xsdXAnKSB7XHJcbiAgICAgICAgICAgICAgICBlczZfcHJlbG9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3V0ZSA9IHBhZ2UucGFydHNbcGFnZS5wYXJ0cy5sZW5ndGggLSAxXS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVwcyA9IGJ1aWxkX2luZm8uZGVwZW5kZW5jaWVzW3JvdXRlXTtcclxuICAgICAgICAgICAgICAgIGlmIChkZXBzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZF9maWxlcyA9IHByZWxvYWRfZmlsZXMuY29uY2F0KGRlcHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCFlcnJvciAmJiAhaXNfc2VydmljZV93b3JrZXJfaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2UucGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2luZyBjb25jYXQgYmVjYXVzZSBpdCBjb3VsZCBiZSBhIHN0cmluZyBvciBhbiBhcnJheS4gdGhhbmtzIHdlYnBhY2shXHJcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZF9maWxlcyA9IHByZWxvYWRfZmlsZXMuY29uY2F0KGJ1aWxkX2luZm8uYXNzZXRzW3BhcnQubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbGluayA9IHByZWxvYWRfZmlsZXNcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKHYsIGksIGEpID0+IGEuaW5kZXhPZih2KSA9PT0gaSkgLy8gcmVtb3ZlIGFueSBkdXBsaWNhdGVzXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZpbGUgPT4gZmlsZSAmJiAhZmlsZS5tYXRjaCgvXFwubWFwJC8pKSAvLyBleGNsdWRlIHNvdXJjZSBtYXBzXHJcbiAgICAgICAgICAgICAgICAubWFwKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcyA9IC9cXC5jc3MkLy50ZXN0KGZpbGUpID8gJ3N0eWxlJyA6ICdzY3JpcHQnO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVsID0gZXM2X3ByZWxvYWQgJiYgYXMgPT09ICdzY3JpcHQnID8gJ21vZHVsZXByZWxvYWQnIDogJ3ByZWxvYWQnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGA8JHtyZXEuYmFzZVVybH0vY2xpZW50LyR7ZmlsZX0+O3JlbD1cIiR7cmVsfVwiO2FzPVwiJHthc31cImA7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuam9pbignLCAnKTtcclxuICAgICAgICAgICAgcmVzLnNldEhlYWRlcignTGluaycsIGxpbmspO1xyXG4gICAgICAgICAgICBsZXQgc2Vzc2lvbjtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNlc3Npb24gPSB5aWVsZCBzZXNzaW9uX2dldHRlcihyZXEsIHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJhaWwocmVxLCByZXMsIGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHJlZGlyZWN0O1xyXG4gICAgICAgICAgICBsZXQgcHJlbG9hZF9lcnJvcjtcclxuICAgICAgICAgICAgY29uc3QgcHJlbG9hZF9jb250ZXh0ID0ge1xyXG4gICAgICAgICAgICAgICAgcmVkaXJlY3Q6IChzdGF0dXNDb2RlLCBsb2NhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWRpcmVjdCAmJiAocmVkaXJlY3Quc3RhdHVzQ29kZSAhPT0gc3RhdHVzQ29kZSB8fCByZWRpcmVjdC5sb2NhdGlvbiAhPT0gbG9jYXRpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZmxpY3RpbmcgcmVkaXJlY3RzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gbG9jYXRpb24ucmVwbGFjZSgvXlxcLy9nLCAnJyk7IC8vIGxlYWRpbmcgc2xhc2ggKG9ubHkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3QgPSB7IHN0YXR1c0NvZGUsIGxvY2F0aW9uIH07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IChzdGF0dXNDb2RlLCBtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZF9lcnJvciA9IHsgc3RhdHVzQ29kZSwgbWVzc2FnZSB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZldGNoOiAodXJsLCBvcHRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdG9jb2wgPSByZXEuc29ja2V0LmVuY3J5cHRlZCA/ICdodHRwcycgOiAnaHR0cCc7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gbmV3IFVybC5VUkwodXJsLCBgJHtwcm90b2NvbH06Ly8xMjcuMC4wLjE6JHtwcm9jZXNzLmVudi5QT1JUfSR7cmVxLmJhc2VVcmwgPyByZXEuYmFzZVVybCArICcvJyA6ICcnfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmNsdWRlX2NyZWRlbnRpYWxzID0gKG9wdHMuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNyZWRlbnRpYWxzICE9PSAnb21pdCcgJiYgcGFyc2VkLm9yaWdpbiA9PT0gYCR7cHJvdG9jb2x9Oi8vMTI3LjAuMC4xOiR7cHJvY2Vzcy5lbnYuUE9SVH1gKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZV9jcmVkZW50aWFscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzLmhlYWRlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb29raWVzID0gT2JqZWN0LmFzc2lnbih7fSwgcGFyc2VfMShyZXEuaGVhZGVycy5jb29raWUgfHwgJycpLCBwYXJzZV8xKG9wdHMuaGVhZGVycy5jb29raWUgfHwgJycpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2V0X2Nvb2tpZSA9IHJlcy5nZXRIZWFkZXIoJ1NldC1Db29raWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKEFycmF5LmlzQXJyYXkoc2V0X2Nvb2tpZSkgPyBzZXRfY29va2llIDogW3NldF9jb29raWVdKS5mb3JFYWNoKChzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtID0gLyhbXj1dKyk9KFteO10rKS8uZXhlYyhzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tpZXNbbVsxXV0gPSBtWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyID0gT2JqZWN0LmtleXMoY29va2llcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoa2V5ID0+IGAke2tleX09JHtjb29raWVzW2tleV19YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCc7ICcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmhlYWRlcnMuY29va2llID0gc3RyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdHMuaGVhZGVycy5hdXRob3JpemF0aW9uICYmIHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuaGVhZGVycy5hdXRob3JpemF0aW9uID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2gocGFyc2VkLmhyZWYsIG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsZXQgcHJlbG9hZGVkO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2g7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXM7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb290X3ByZWxvYWQgPSBtYW5pZmVzdC5yb290X2NvbXAucHJlbG9hZCB8fCAoKCkgPT4geyB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvb3RfcHJlbG9hZGVkID0gcm9vdF9wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9zdDogcmVxLmhlYWRlcnMuaG9zdCxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiByZXEucGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcmVxLnF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge31cclxuICAgICAgICAgICAgICAgIH0sIHNlc3Npb24pO1xyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBlcnJvciA/IG51bGwgOiBwYWdlLnBhdHRlcm4uZXhlYyhyZXEucGF0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9QcmVsb2FkID0gW3Jvb3RfcHJlbG9hZGVkXTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNfc2VydmljZV93b3JrZXJfaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b1ByZWxvYWQgPSB0b1ByZWxvYWQuY29uY2F0KHBhZ2UucGFydHMubWFwKHBhcnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGRlZXBlc3QgbGV2ZWwgaXMgdXNlZCBiZWxvdywgdG8gaW5pdGlhbGlzZSB0aGUgc3RvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0gcGFydC5wYXJhbXMgPyBwYXJ0LnBhcmFtcyhtYXRjaCkgOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnQuY29tcG9uZW50LnByZWxvYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gcGFydC5jb21wb25lbnQucHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3Q6IHJlcS5oZWFkZXJzLmhvc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogcmVxLnBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHJlcS5xdWVyeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNlc3Npb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHByZWxvYWRlZCA9IHlpZWxkIFByb21pc2UuYWxsKHRvUHJlbG9hZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJhaWwocmVxLCByZXMsIGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwcmVsb2FkX2Vycm9yID0geyBzdGF0dXNDb2RlOiA1MDAsIG1lc3NhZ2U6IGVyciB9O1xyXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVkID0gW107IC8vIGFwcGVhc2UgVHlwZVNjcmlwdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IFVybC5yZXNvbHZlKChyZXEuYmFzZVVybCB8fCAnJykgKyAnLycsIHJlZGlyZWN0LmxvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IHJlZGlyZWN0LnN0YXR1c0NvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignTG9jYXRpb24nLCBsb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmVuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcmVsb2FkX2Vycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlX2Vycm9yKHJlcSwgcmVzLCBwcmVsb2FkX2Vycm9yLnN0YXR1c0NvZGUsIHByZWxvYWRfZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudHMgPSByZXEucGF0aC5zcGxpdCgnLycpLmZpbHRlcihCb29sZWFuKTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIGxlc3MgY29uZnVzaW5nXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXlvdXRfc2VnbWVudHMgPSBbc2VnbWVudHNbMF1dO1xyXG4gICAgICAgICAgICAgICAgbGV0IGwgPSAxO1xyXG4gICAgICAgICAgICAgICAgcGFnZS5wYXJ0cy5mb3JFYWNoKChwYXJ0LCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0X3NlZ21lbnRzW2xdID0gc2VnbWVudHNbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFydClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbCsrO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5zdGFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLnN0YWNrID0gc291cmNlbWFwX3N0YWNrdHJhY2UoZXJyb3Iuc3RhY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFnZUNvbnRleHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9zdDogcmVxLmhlYWRlcnMuaG9zdCxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiByZXEucGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcmVxLnF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBlcnJvciBpbnN0YW5jZW9mIEVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsgbWVzc2FnZTogZXJyb3IsIG5hbWU6ICdQcmVsb2FkRXJyb3InIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZTogd3JpdGFibGUocGFnZUNvbnRleHQpLnN1YnNjcmliZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVsb2FkaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmU6IHdyaXRhYmxlKG51bGwpLnN1YnNjcmliZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uOiB3cml0YWJsZShzZXNzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VnbWVudHM6IGxheW91dF9zZWdtZW50cyxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGVycm9yID8gc3RhdHVzIDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBwYWdlQ29udGV4dC5lcnJvcixcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbDA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHByZWxvYWRlZFswXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZ21lbnQ6IHNlZ21lbnRzWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge31cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc19zZXJ2aWNlX3dvcmtlcl9pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsZXZlbF9pbmRleCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlLnBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnQgPSBwYWdlLnBhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHNbYGxldmVsJHtsZXZlbF9pbmRleCsrfWBdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBwYXJ0LmNvbXBvbmVudC5kZWZhdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHByZWxvYWRlZFtpICsgMV0gfHwge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWdtZW50OiBzZWdtZW50c1tpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaHRtbCwgaGVhZCwgY3NzIH0gPSBBcHAucmVuZGVyKHByb3BzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlcmlhbGl6ZWQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZGVkOiBgWyR7cHJlbG9hZGVkLm1hcChkYXRhID0+IHRyeV9zZXJpYWxpemUoZGF0YSwgZXJyID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNlcmlhbGl6ZSBwcmVsb2FkZWQgZGF0YSB0byB0cmFuc21pdCB0byB0aGUgY2xpZW50IGF0IHRoZSAvJHtzZWdtZW50cy5qb2luKCcvJyl9IHJvdXRlOiAke2Vyci5tZXNzYWdlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBjbGllbnQgd2lsbCByZS1yZW5kZXIgb3ZlciB0aGUgc2VydmVyLXJlbmRlcmVkIHBhZ2UgZnJlc2ggaW5zdGVhZCBvZiBjb250aW51aW5nIHdoZXJlIGl0IGxlZnQgb2ZmLiBTZWUgaHR0cHM6Ly9zYXBwZXIuc3ZlbHRlLmRldi9kb2NzI1JldHVybl92YWx1ZSBmb3IgbW9yZSBpbmZvcm1hdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKS5qb2luKCcsJyl9XWAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbjogc2Vzc2lvbiAmJiB0cnlfc2VyaWFsaXplKHNlc3Npb24sIGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHNlcmlhbGl6ZSBzZXNzaW9uIGRhdGE6ICR7ZXJyLm1lc3NhZ2V9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yICYmIHNlcmlhbGl6ZV9lcnJvcihwcm9wcy5lcnJvcilcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0ID0gYF9fU0FQUEVSX189eyR7W1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGBlcnJvcjoke3NlcmlhbGl6ZWQuZXJyb3J9LHN0YXR1czoke3N0YXR1c31gLFxyXG4gICAgICAgICAgICAgICAgICAgIGBiYXNlVXJsOlwiJHtyZXEuYmFzZVVybH1cImAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZC5wcmVsb2FkZWQgJiYgYHByZWxvYWRlZDoke3NlcmlhbGl6ZWQucHJlbG9hZGVkfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZC5zZXNzaW9uICYmIGBzZXNzaW9uOiR7c2VyaWFsaXplZC5zZXNzaW9ufWBcclxuICAgICAgICAgICAgICAgIF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJywnKX19O2A7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFzX3NlcnZpY2Vfd29ya2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0ICs9IGBpZignc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKW5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCcke3JlcS5iYXNlVXJsfS9zZXJ2aWNlLXdvcmtlci5qcycpO2A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gW10uY29uY2F0KGJ1aWxkX2luZm8uYXNzZXRzLm1haW4pLmZpbHRlcihmID0+IGYgJiYgL1xcLmpzJC8udGVzdChmKSlbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYWluID0gYCR7cmVxLmJhc2VVcmx9L2NsaWVudC8ke2ZpbGV9YDtcclxuICAgICAgICAgICAgICAgIC8vIHVzZXJzIGNhbiBzZXQgYSBDU1Agbm9uY2UgdXNpbmcgcmVzLmxvY2Fscy5ub25jZVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9uY2VfdmFsdWUgPSAocmVzLmxvY2FscyAmJiByZXMubG9jYWxzLm5vbmNlKSA/IHJlcy5sb2NhbHMubm9uY2UgOiAnJztcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vbmNlX2F0dHIgPSBub25jZV92YWx1ZSA/IGAgbm9uY2U9XCIke25vbmNlX3ZhbHVlfVwiYCA6ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1aWxkX2luZm8uYnVuZGxlciA9PT0gJ3JvbGx1cCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYnVpbGRfaW5mby5sZWdhY3lfYXNzZXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZ2FjeV9tYWluID0gYCR7cmVxLmJhc2VVcmx9L2NsaWVudC9sZWdhY3kvJHtidWlsZF9pbmZvLmxlZ2FjeV9hc3NldHMubWFpbn1gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQgKz0gYChmdW5jdGlvbigpe3RyeXtldmFsKFwiYXN5bmMgZnVuY3Rpb24geCgpe31cIik7dmFyIG1haW49XCIke21haW59XCJ9Y2F0Y2goZSl7bWFpbj1cIiR7bGVnYWN5X21haW59XCJ9O3ZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7dHJ5e25ldyBGdW5jdGlvbihcImlmKDApaW1wb3J0KCcnKVwiKSgpO3Muc3JjPW1haW47cy50eXBlPVwibW9kdWxlXCI7cy5jcm9zc09yaWdpbj1cInVzZS1jcmVkZW50aWFsc1wiO31jYXRjaChlKXtzLnNyYz1cIiR7cmVxLmJhc2VVcmx9L2NsaWVudC9zaGltcG9ydEAke2J1aWxkX2luZm8uc2hpbXBvcnR9LmpzXCI7cy5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1haW5cIixtYWluKTt9ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTt9KCkpO2A7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQgKz0gYHZhciBzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7dHJ5e25ldyBGdW5jdGlvbihcImlmKDApaW1wb3J0KCcnKVwiKSgpO3Muc3JjPVwiJHttYWlufVwiO3MudHlwZT1cIm1vZHVsZVwiO3MuY3Jvc3NPcmlnaW49XCJ1c2UtY3JlZGVudGlhbHNcIjt9Y2F0Y2goZSl7cy5zcmM9XCIke3JlcS5iYXNlVXJsfS9jbGllbnQvc2hpbXBvcnRAJHtidWlsZF9pbmZvLnNoaW1wb3J0fS5qc1wiO3Muc2V0QXR0cmlidXRlKFwiZGF0YS1tYWluXCIsXCIke21haW59XCIpfWRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocylgO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdCArPSBgPC9zY3JpcHQ+PHNjcmlwdCR7bm9uY2VfYXR0cn0gc3JjPVwiJHttYWlufVwiIGRlZmVyPmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGVzO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBtYWtlIHRoaXMgY29uc2lzdGVudCBhY3Jvc3MgYXBwc1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBlbWJlZCBidWlsZF9pbmZvIGluIHBsYWNlaG9sZGVyLnRzXHJcbiAgICAgICAgICAgICAgICBpZiAoYnVpbGRfaW5mby5jc3MgJiYgYnVpbGRfaW5mby5jc3MubWFpbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNzc19jaHVua3MgPSBuZXcgU2V0KGJ1aWxkX2luZm8uY3NzLm1haW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2UucGFydHMuZm9yRWFjaChwYXJ0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJ0IHx8ICFidWlsZF9pbmZvLmRlcGVuZGVuY2llcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVwc19mb3JfcGFydCA9IGJ1aWxkX2luZm8uZGVwZW5kZW5jaWVzW3BhcnQuZmlsZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXBzX2Zvcl9wYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXBzX2Zvcl9wYXJ0LmZpbHRlcihkID0+IGQuZW5kc1dpdGgoJy5jc3MnKSkuZm9yRWFjaChjaHVuayA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzX2NodW5rcy5hZGQoY2h1bmspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZXMgPSBBcnJheS5mcm9tKGNzc19jaHVua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoaHJlZiA9PiBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCJjbGllbnQvJHtocmVmfVwiPmApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlcyA9IChjc3MgJiYgY3NzLmNvZGUgPyBgPHN0eWxlJHtub25jZV9hdHRyfT4ke2Nzcy5jb2RlfTwvc3R5bGU+YCA6ICcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSB0ZW1wbGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJyVzYXBwZXIuYmFzZSUnLCAoKSA9PiBgPGJhc2UgaHJlZj1cIiR7cmVxLmJhc2VVcmx9L1wiPmApXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJyVzYXBwZXIuc2NyaXB0cyUnLCAoKSA9PiBgPHNjcmlwdCR7bm9uY2VfYXR0cn0+JHtzY3JpcHR9PC9zY3JpcHQ+YClcclxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnJXNhcHBlci5odG1sJScsICgpID0+IGh0bWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJyVzYXBwZXIuaGVhZCUnLCAoKSA9PiBoZWFkKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCclc2FwcGVyLnN0eWxlcyUnLCAoKSA9PiBzdHlsZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoJyVzYXBwZXIuY3Nwbm9uY2UlJywgKCkgPT4gbm9uY2VfdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICByZXMuZW5kKGJvZHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhaWwocmVxLCByZXMsIGVycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVfZXJyb3IocmVxLCByZXMsIDUwMCwgZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZpbmRfcm91dGUocmVxLCByZXMsIG5leHQpIHtcclxuICAgICAgICBpZiAocmVxLnBhdGggPT09ICcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCcpIHtcclxuICAgICAgICAgICAgY29uc3QgaG9tZVBhZ2UgPSBwYWdlcy5maW5kKHBhZ2UgPT4gcGFnZS5wYXR0ZXJuLnRlc3QoJy8nKSk7XHJcbiAgICAgICAgICAgIGhhbmRsZV9wYWdlKGhvbWVQYWdlLCByZXEsIHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBwYWdlIG9mIHBhZ2VzKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdlLnBhdHRlcm4udGVzdChyZXEucGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZV9wYWdlKHBhZ2UsIHJlcSwgcmVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBoYW5kbGVfZXJyb3IocmVxLCByZXMsIDQwNCwgJ05vdCBmb3VuZCcpO1xyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiByZWFkX3RlbXBsYXRlKGRpciA9IGJ1aWxkX2Rpcikge1xyXG4gICAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhgJHtkaXJ9L3RlbXBsYXRlLmh0bWxgLCAndXRmLTgnKTtcclxufVxyXG5mdW5jdGlvbiB0cnlfc2VyaWFsaXplKGRhdGEsIGZhaWwpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIGRldmFsdWUoZGF0YSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgaWYgKGZhaWwpXHJcbiAgICAgICAgICAgIGZhaWwoZXJyKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG4vLyBFbnN1cmUgd2UgcmV0dXJuIHNvbWV0aGluZyB0cnV0aHkgc28gdGhlIGNsaWVudCB3aWxsIG5vdCByZS1yZW5kZXIgdGhlIHBhZ2Ugb3ZlciB0aGUgZXJyb3JcclxuZnVuY3Rpb24gc2VyaWFsaXplX2Vycm9yKGVycm9yKSB7XHJcbiAgICBpZiAoIWVycm9yKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgbGV0IHNlcmlhbGl6ZWQgPSB0cnlfc2VyaWFsaXplKGVycm9yKTtcclxuICAgIGlmICghc2VyaWFsaXplZCkge1xyXG4gICAgICAgIGNvbnN0IHsgbmFtZSwgbWVzc2FnZSwgc3RhY2sgfSA9IGVycm9yO1xyXG4gICAgICAgIHNlcmlhbGl6ZWQgPSB0cnlfc2VyaWFsaXplKHsgbmFtZSwgbWVzc2FnZSwgc3RhY2sgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXNlcmlhbGl6ZWQpIHtcclxuICAgICAgICBzZXJpYWxpemVkID0gJ3t9JztcclxuICAgIH1cclxuICAgIHJldHVybiBzZXJpYWxpemVkO1xyXG59XHJcbmZ1bmN0aW9uIGVzY2FwZV9odG1sKGh0bWwpIHtcclxuICAgIGNvbnN0IGNoYXJzID0ge1xyXG4gICAgICAgICdcIic6ICdxdW90JyxcclxuICAgICAgICAnXFwnJzogJyMzOScsXHJcbiAgICAgICAgJyYnOiAnYW1wJyxcclxuICAgICAgICAnPCc6ICdsdCcsXHJcbiAgICAgICAgJz4nOiAnZ3QnXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvW1wiJyY8Pl0vZywgYyA9PiBgJiR7Y2hhcnNbY119O2ApO1xyXG59XG5cbmZ1bmN0aW9uIG1pZGRsZXdhcmUob3B0cyA9IHt9KSB7XHJcbiAgICBjb25zdCB7IHNlc3Npb24sIGlnbm9yZSB9ID0gb3B0cztcclxuICAgIGxldCBlbWl0dGVkX2Jhc2VwYXRoID0gZmFsc2U7XHJcbiAgICByZXR1cm4gY29tcG9zZV9oYW5kbGVycyhpZ25vcmUsIFtcclxuICAgICAgICAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcS5iYXNlVXJsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvcmlnaW5hbFVybCA9IHJlcS5vcmlnaW5hbFVybCB8fCByZXEudXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcS51cmwgPT09ICcvJyAmJiBvcmlnaW5hbFVybFtvcmlnaW5hbFVybC5sZW5ndGggLSAxXSAhPT0gJy8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxVcmwgKz0gJy8nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVxLmJhc2VVcmwgPSBvcmlnaW5hbFVybFxyXG4gICAgICAgICAgICAgICAgICAgID8gb3JpZ2luYWxVcmwuc2xpY2UoMCwgLXJlcS51cmwubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFlbWl0dGVkX2Jhc2VwYXRoICYmIHByb2Nlc3Muc2VuZCkge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBfX3NhcHBlcl9fOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiAnYmFzZXBhdGgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhc2VwYXRoOiByZXEuYmFzZVVybFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVkX2Jhc2VwYXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmVxLnBhdGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmVxLnBhdGggPSByZXEudXJsLnJlcGxhY2UoL1xcPy4qLywgJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgJ3NlcnZpY2Utd29ya2VyLmpzJykpICYmIHNlcnZlKHtcclxuICAgICAgICAgICAgcGF0aG5hbWU6ICcvc2VydmljZS13b3JrZXIuanMnLFxyXG4gICAgICAgICAgICBjYWNoZV9jb250cm9sOiAnbm8tY2FjaGUsIG5vLXN0b3JlLCBtdXN0LXJldmFsaWRhdGUnXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oYnVpbGRfZGlyLCAnc2VydmljZS13b3JrZXIuanMubWFwJykpICYmIHNlcnZlKHtcclxuICAgICAgICAgICAgcGF0aG5hbWU6ICcvc2VydmljZS13b3JrZXIuanMubWFwJyxcclxuICAgICAgICAgICAgY2FjaGVfY29udHJvbDogJ25vLWNhY2hlLCBuby1zdG9yZSwgbXVzdC1yZXZhbGlkYXRlJ1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHNlcnZlKHtcclxuICAgICAgICAgICAgcHJlZml4OiAnL2NsaWVudC8nLFxyXG4gICAgICAgICAgICBjYWNoZV9jb250cm9sOiBkZXYgPyAnbm8tY2FjaGUnIDogJ21heC1hZ2U9MzE1MzYwMDAsIGltbXV0YWJsZSdcclxuICAgICAgICB9KSxcclxuICAgICAgICBnZXRfc2VydmVyX3JvdXRlX2hhbmRsZXIobWFuaWZlc3Quc2VydmVyX3JvdXRlcyksXHJcbiAgICAgICAgZ2V0X3BhZ2VfaGFuZGxlcihtYW5pZmVzdCwgc2Vzc2lvbiB8fCBub29wKVxyXG4gICAgXS5maWx0ZXIoQm9vbGVhbikpO1xyXG59XHJcbmZ1bmN0aW9uIGNvbXBvc2VfaGFuZGxlcnMoaWdub3JlLCBoYW5kbGVycykge1xyXG4gICAgY29uc3QgdG90YWwgPSBoYW5kbGVycy5sZW5ndGg7XHJcbiAgICBmdW5jdGlvbiBudGhfaGFuZGxlcihuLCByZXEsIHJlcywgbmV4dCkge1xyXG4gICAgICAgIGlmIChuID49IHRvdGFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGhhbmRsZXJzW25dKHJlcSwgcmVzLCAoKSA9PiBudGhfaGFuZGxlcihuICsgMSwgcmVxLCByZXMsIG5leHQpKTtcclxuICAgIH1cclxuICAgIHJldHVybiAhaWdub3JlXHJcbiAgICAgICAgPyAocmVxLCByZXMsIG5leHQpID0+IG50aF9oYW5kbGVyKDAsIHJlcSwgcmVzLCBuZXh0KVxyXG4gICAgICAgIDogKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzaG91bGRfaWdub3JlKHJlcS5wYXRoLCBpZ25vcmUpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBudGhfaGFuZGxlcigwLCByZXEsIHJlcywgbmV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIHNob3VsZF9pZ25vcmUodXJpLCB2YWwpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXHJcbiAgICAgICAgcmV0dXJuIHZhbC5zb21lKHggPT4gc2hvdWxkX2lnbm9yZSh1cmksIHgpKTtcclxuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBSZWdFeHApXHJcbiAgICAgICAgcmV0dXJuIHZhbC50ZXN0KHVyaSk7XHJcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICByZXR1cm4gdmFsKHVyaSk7XHJcbiAgICByZXR1cm4gdXJpLnN0YXJ0c1dpdGgodmFsLmNoYXJDb2RlQXQoMCkgPT09IDQ3ID8gdmFsIDogYC8ke3ZhbH1gKTtcclxufVxyXG5mdW5jdGlvbiBzZXJ2ZSh7IHByZWZpeCwgcGF0aG5hbWUsIGNhY2hlX2NvbnRyb2wgfSkge1xyXG4gICAgY29uc3QgZmlsdGVyID0gcGF0aG5hbWVcclxuICAgICAgICA/IChyZXEpID0+IHJlcS5wYXRoID09PSBwYXRobmFtZVxyXG4gICAgICAgIDogKHJlcSkgPT4gcmVxLnBhdGguc3RhcnRzV2l0aChwcmVmaXgpO1xyXG4gICAgY29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XHJcbiAgICBjb25zdCByZWFkID0gZGV2XHJcbiAgICAgICAgPyAoZmlsZSkgPT4gZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihidWlsZF9kaXIsIGZpbGUpKVxyXG4gICAgICAgIDogKGZpbGUpID0+IChjYWNoZS5oYXMoZmlsZSkgPyBjYWNoZSA6IGNhY2hlLnNldChmaWxlLCBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGJ1aWxkX2RpciwgZmlsZSkpKSkuZ2V0KGZpbGUpO1xyXG4gICAgcmV0dXJuIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWx0ZXIocmVxKSkge1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gbGl0ZS5nZXRUeXBlKHJlcS5wYXRoKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBwYXRoLnBvc2l4Lm5vcm1hbGl6ZShkZWNvZGVVUklDb21wb25lbnQocmVxLnBhdGgpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZWFkKGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDYWNoZS1Db250cm9sJywgY2FjaGVfY29udHJvbCk7XHJcbiAgICAgICAgICAgICAgICByZXMuZW5kKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmVuZCgnYW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVhZGluZyBhIHN0YXRpYyBmaWxlIGZyb20gZGlzaycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBub29wKCkgeyB9XG5cbmV4cG9ydCB7IG1pZGRsZXdhcmUgfTtcbiIsImltcG9ydCBzaXJ2IGZyb20gJ3NpcnYnO1xuaW1wb3J0IHBvbGthIGZyb20gJ3BvbGthJztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbic7XG5pbXBvcnQgKiBhcyBzYXBwZXIgZnJvbSAnQHNhcHBlci9zZXJ2ZXInO1xuXG5jb25zdCB7IFBPUlQsIE5PREVfRU5WIH0gPSBwcm9jZXNzLmVudjtcbmNvbnN0IGRldiA9IE5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnO1xuXG5wb2xrYSgpIC8vIFlvdSBjYW4gYWxzbyB1c2UgRXhwcmVzc1xuXHQudXNlKFxuXHRcdGNvbXByZXNzaW9uKHsgdGhyZXNob2xkOiAwIH0pLFxuXHRcdHNpcnYoJ3N0YXRpYycsIHsgZGV2IH0pLFxuXHRcdHNhcHBlci5taWRkbGV3YXJlKClcblx0KVxuXHQubGlzdGVuKFBPUlQsIGVyciA9PiB7XG5cdFx0aWYgKGVycikgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyKTtcblx0fSk7XG4iXSwibmFtZXMiOlsiZ2V0IiwicHJlbG9hZCIsImVycm9yIiwiZXNjYXBlZCIsIlN0cmVhbSIsImh0dHAiLCJVcmwiLCJodHRwcyIsInpsaWIiLCJmcyIsInBhdGgiLCJub29wIiwicG9sa2EiLCJjb21wcmVzc2lvbiIsInNpcnYiLCJzYXBwZXIubWlkZGxld2FyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLEtBQUssR0FBRztBQUNkLENBQUM7QUFDRCxFQUFFLEtBQUssRUFBRSxpQkFBaUI7QUFD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QUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHlDQUF5QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1bFM7QUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUN0RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFB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QUFDSCxFQUFFLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtBQUN2QixJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQzNCLEdBQUc7QUFDSCxFQUFFLElBQUksVUFBVSxDQUFDLElBQUksRUFBRTtBQUN2QixJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztBQUNqQyxHQUFHO0FBQ0gsRUFBRSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUU7QUFDdkIsSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztBQUMzQixHQUFHO0FBQ0gsRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRCxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7QUFDMUIsRUFBRSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7QUFDbkIsRUFBRSxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUIsRUFBRSxJQUFJLEdBQUcsRUFBRTtBQUNYLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDbkIsTUFBTSxPQUFPLEtBQUssQ0FBQztBQUNuQixLQUFLO0FBQ0wsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQixHQUFHO0FBQ0gsRUFBRSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVDO0FBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUks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LEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQjtBQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0IsSUFBSSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNmLFFBQVEsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENB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
