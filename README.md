## Installation
```js
npm install vue-router-spa-tabs
```
## Usage 
#### 1) `Routes.js`
export const routes = [
{path: '/', component: App, name: 'home', meta: {tab: 'Dashboard', breadcrumb: 'Dashboard', permission: '', fail: '/login'}}
];

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