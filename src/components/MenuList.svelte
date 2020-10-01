<script>
    import {fade,slide} from 'svelte/transition';
</script>

<div in:slide out:fade class='list-box'> 
    <ul class='list'>
        <li><a href=".">Login</a></li>
        <li><a href=".">Sign Up</a></li>
        <li><a href=".">Explore</a></li>
        <li><a href=".">What' New</a></li>
    </ul>
</div>

<style>

.list-box{
    position: absolute;
    height: 173px;
    width: 112px;
    background:inherit;
    text-align: center;
    top: 6.5%;
    left: 91%;
    border-radius: 20px 0;
    box-shadow: -.5px -.5px 0px .5px  rgb(238, 235, 235),
		2px 2px 0px 2px rgba(51, 51, 51, 0.514);
}


.list{
    position: relative;
    list-style: none;
    padding: 4px;
    line-height: 2.2;
}


.list::after{
        position: absolute;
		content: '';
		width: calc(100% - .6em);
		height: 2px;
		background-color: rgba(255, 64, 0, 0.1);
		display: block;
		bottom: -1px;
}

a{
    text-decoration: none;
}
.list li:hover{
    color:rgb(0, 0, 0) ;
    border-bottom: 1px solid rgb(255,62,0);
    display: block;
    margin: 0 auto;
    width: fit-content;
    font-weight: 500;
}

.list li:active{
    color: rgba(0, 0, 0, 0.534);

}


</style>