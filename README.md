## Installation
``` js
npm install vue-router-spa-tabs
```
## Usage 
```html
<template>
	<router-link v-for"tab in tabs" to=""></router-link>
	<keep-alive :include="tabs">
		<router-view></router-view>
	</keep-alive>
</template>

<script>
	import tabs from 'vue-router-spa-tabs'
	export default{
		computed:{
			...mapState([
				'tabs',
				]),
		},
	}
</script>
```