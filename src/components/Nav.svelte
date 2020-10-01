<script>
import MenuBtn from "./MenuBtn.svelte";
import MenuList from "./MenuList.svelte";

	export let segment;

	const toggleMenu = ()=>{
		const list = document.querySelector('#menulist')

	if (list.classList.contains('list-off')){
		list.classList.remove('list-off')
	}else{
		list.classList.add('list-off')
	}

	};
</script>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	.menu{
		margin-top: 10px;
	}

	.list-off{
		display: none;
	}

	
</style>

<nav>
	<ul>
		<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
		<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>
	</ul>
	
	<a class='menu' href>
		<MenuBtn on:click={toggleMenu}/>
	</a>
	
</nav>
<div id='menulist' class="list-off">
	<MenuList/>
</div>
