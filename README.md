## Description
This Package is used to make your Application tabular, like chrome or sublime text. It achieves this by keeping a track of which routes do you want to open in tabs, opens those routes in tabs, and keeps alive those tabs so they are not rerendered everytime they open.

Note: Works best with socket implementation which updates the tabs on the fly for new data otherwise it would require to close and reopen the tab for rerendering it based on new data from server / database.

## Installation
```js
npm install vue-router-spa-tabs
```
## Usage 
#### 1) `Routes.js`
```js
export const routes = [
{path: '/', component: App, name: 'home', meta: {tab: 'Dashboard'}}
];
```
#### 2) `example.vue`
```html
<template>
	<router-link v-for"(tab, index) in tabs" :to="tab"></router-link>
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