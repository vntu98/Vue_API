<template>
    <div class="loading">
        <div class="loadingio-spinner-rolling-zbcbsebykb">
            <div class="ldio-lotlw6qexv">
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading'
}
</script>

<style>
    .loading {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100001;
		opacity: 0;
		visibility: hidden;
		/* transition: all 0.2 ease; */
    	background-color: #1e163340;
	}
    .loading.show {
		opacity: 1;
		visibility: visible;
	}
    .loading .loadingio-spinner-rolling-zbcbsebykb {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.5);
	}

    @keyframes ldio-lotlw6qexv {
        0% { transform: translate(-50%,-50%) rotate(0deg); }
        100% { transform: translate(-50%,-50%) rotate(360deg); }
    }
    .ldio-lotlw6qexv div {
        position: absolute;
        width: 80.24px;
        height: 80.24px;
        border: 2.36px solid #ffffff;
        border-top-color: transparent;
        border-radius: 50%;
    }
    .ldio-lotlw6qexv div {
        animation: ldio-lotlw6qexv 0.3717472118959108s linear infinite;
        top: 59px;
        left: 59px
    }
    .loadingio-spinner-rolling-zbcbsebykb {
        width: 118px;
        height: 118px;
        display: inline-block;
        overflow: hidden;
    }
    .ldio-lotlw6qexv {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0;
    }
    .ldio-lotlw6qexv div { box-sizing: content-box; }
</style>