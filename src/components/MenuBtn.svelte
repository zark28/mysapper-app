<script>

</script>





<button class='menu' on:click><span class='menu-bar'></span></button>




<style>
    .menu{
		position: relative;
		height: 30px;
		width: 35px;
		display: flex;
		flex-direction: column;
		align-items: center ;
		justify-content: center;
		outline: none;
        border: none;
        border-radius: 2px;
        background: inherit;
		box-shadow: 1px 1px 2px .5px  rgb(0, 0, 0),
		-1px -1px 2px .5px rgba(151, 147, 147, 0.801);

	}

	.menu-bar::before,.menu-bar::after{
		content: '';
		position: absolute;
	}

	.menu-bar, .menu-bar::after,.menu-bar::before{
		height: 4px;
		width: 30px;
		background-color: rgba(51, 51, 51, 0.815);;
	}

	.menu-bar::after{
		top: 80%;
		left:8%;
	}

	.menu-bar::before{
		top: 10%;
		left:8%;
		
	} 

	.menu:active{
		box-shadow: .5px .5px 0px .5px  rgba(0, 0, 0, 0.5)inset,
		-.5px -.5px 0px .5px rgba(151, 147, 147, 0.315)inset;
	}
</style>