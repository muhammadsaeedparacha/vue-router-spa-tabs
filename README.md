## Package Incomplete and Broken
## Description
This Package is used to make your Application tabular, like chrome or sublime text. It achieves this by keeping a track of which routes do you want to open in tabs, opens those routes in tabs, and keeps alive those tabs so they are not rerendered everytime they open.
Based on an amazing package by [adamschwartz/chrome-tabs](https://github.com/adamschwartz/chrome-tabs) but molded for Vue Router

Note: Works best with socket implementation which updates the tabs on the fly for new data otherwise it would require to close and reopen the tab for rerendering it based on new data from server / database.

## Installation
```js
npm install vue-router-spa-tabs
```
## Usage 
#### 1) `Routes.js`
Routes should include `name` and `meta.tab` with tab value is what will be displayed in the Tab Title
```js
export const routes = [
{path: '/', component: App, name: 'home', meta: {tab: 'Dashboard'}}
];
```
#### 2) Component Name = Router Link Name
```js
router.js
{path: '/', name: 'home'}

component.vue
...
<script>
	export default {
		name: 'home'
	}
</script>
...
```
#### 3) `example.vue`
```html
<template>
	<div>
		<div class="chrome-tabs">
			<div class="chrome-tabs-content">
				<router-link @click="chromeTabs.refreshTabs()" tag="div" v-for="(tab, index) in tabs" :to="{name: tab}" :id="tab" exact-active-class="chrome-tab-current" class="chrome-tab">
					<div class="chrome-tab-background">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="topleft" viewBox="0 0 214 29" ><path d="M14.3 0.1L214 0.1 214 29 0 29C0 29 12.2 2.6 13.2 1.1 14.3-0.4 14.3 0.1 14.3 0.1Z"/></symbol><symbol id="topright" viewBox="0 0 214 29"><use xlink:href="#topleft"/></symbol><clipPath id="crop"><rect class="mask" width="100%" height="100%" x="0"/></clipPath></defs><svg width="50%" height="100%" transfrom="scale(-1, 1)"><use xlink:href="#topleft" width="214" height="29" class="chrome-tab-background"/><use xlink:href="#topleft" width="214" height="29" class="chrome-tab-shadow"/></svg><g transform="scale(-1, 1)"><svg width="50%" height="100%" x="-100%" y="0"><use xlink:href="#topright" width="214" height="29" class="chrome-tab-background"/><use xlink:href="#topright" width="214" height="29" class="chrome-tab-shadow"/></svg></g></svg>
					</div>
					<div class="chrome-tab-favicon" style="background-image: url('demo/images/facebook-favicon.ico')"></div>
					<div class="chrome-tab-title">{{index}}</div>
					<div class="chrome-tab-close" @click="tabDelete(index)"></div>
				</router-link>
			</div>
			<div class="chrome-tabs-bottom-bar"></div>
		</div>
		<keep-alive  :include="Object.values(tabs)">
			<!--<keep-alive  include="CustomersIndex,customers">-->
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import tabs from 'vue-router-spa-tabs'
	export default{
		computed:{
			...mapState([
				'tabs',
				]),
		},
		methods: {
			...mapActions([
				'tabDelete',
				'tabsInit'
				])
		}
	}
</script>
```