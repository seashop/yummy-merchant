"use strict";(self.webpackJsonp=self.webpackJsonp||[]).push([[1994],{"5403":function(e,r,t){t.d(r,{"ub":function(){return n},"Gt":function(){return c},"pf":function(){return a},"tq":function(){return i},"t3":function(){return s},"G7":function(){return u},"xv":function(){return l},"zx":function(){return f},"l0":function(){return p},"__":function(){return d},"cW":function(){return m},"iR":function(){return v},"rs":function(){return h},"gx":function(){return Z},"Ee":function(){return y},"Qd":function(){return b}});t(7294);var o=t(2214),n=((0,o.Z)("taro-cover-image-core"),(0,o.Z)("taro-cover-view-core"),(0,o.Z)("taro-match-media-core"),(0,o.Z)("taro-movable-area-core")),c=(0,o.Z)("taro-movable-view-core"),a=((0,o.Z)("taro-page-container-core"),(0,o.Z)("taro-root-portal-core"),(0,o.Z)("taro-scroll-view-core")),i=((0,o.Z)("taro-share-element-core"),(0,o.Z)("taro-swiper-core")),s=(0,o.Z)("taro-swiper-item-core"),u=(0,o.Z)("taro-view-core"),l=((0,o.Z)("taro-icon-core"),(0,o.Z)("taro-progress-core"),(0,o.Z)("taro-rich-text-core"),(0,o.Z)("taro-text-core")),f=(0,o.Z)("taro-button-core"),p=((0,o.Z)("taro-checkbox-core"),(0,o.Z)("taro-checkbox-group-core"),(0,o.Z)("taro-editor-core"),(0,o.Z)("taro-form-core")),d=((0,o.Z)("taro-keyboard-accessory-core"),(0,o.Z)("taro-label-core")),m=(0,o.Z)("taro-picker-core"),v=((0,o.Z)("taro-picker-view-core"),(0,o.Z)("taro-picker-view-column-core"),(0,o.Z)("taro-radio-core"),(0,o.Z)("taro-radio-group-core"),(0,o.Z)("taro-slider-core")),h=(0,o.Z)("taro-switch-core"),Z=(0,o.Z)("taro-textarea-core"),y=((0,o.Z)("taro-functional-page-navigator-core"),(0,o.Z)("taro-navigator-core"),(0,o.Z)("taro-navigation-bar-core"),(0,o.Z)("taro-audio-core"),(0,o.Z)("taro-camera-core"),(0,o.Z)("taro-image-core")),b=((0,o.Z)("taro-live-player-core"),(0,o.Z)("taro-live-pusher-core"),(0,o.Z)("taro-video-core"),(0,o.Z)("taro-voip-room-core"),(0,o.Z)("taro-map-core"),(0,o.Z)("taro-canvas-core"),(0,o.Z)("taro-ad-core"),(0,o.Z)("taro-ad-custom-core"),(0,o.Z)("taro-official-account-core"),(0,o.Z)("taro-open-data-core"));(0,o.Z)("taro-web-view-core"),(0,o.Z)("taro-page-meta-core"),(0,o.Z)("taro-custom-wrapper-core")},"2214":function(e,r,t){var o=t(4942),n=t(9439),c=t(1002),a=t(5671),i=t(3144),s=t(136),u=t(2963),l=t(1120),f=t(3433),p=t(7294);function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,o.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _createSuper(e){var r=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var t,o=(0,l.Z)(e);if(r){var n=(0,l.Z)(this).constructor;t=Reflect.construct(o,arguments,n)}else t=o.apply(this,arguments);return(0,u.Z)(this,t)}}p.createElement;var d="taro-scroll-view-core",m=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function updateStyle(e,r,t){/^--/.test(r)?e.style.setProperty(r,t):"number"!=typeof t||m.test(r)?e.style[r]=t:e.style[r]=t+"px"}function updateProp(e,r,t,o,n){var c=e.ref.current,a=n[t],i=o?o[t]:void 0;if("children"!==t)if("classname"!==t.toLowerCase()){if("style"!==t){if(/^data-.+/.test(t)&&c.setAttribute(t,a),r===d){if("scrollTop"===t)return void(c.mpScrollTop=a);if("scrollLeft"===t)return void(c.mpScrollLeft=a);if("scrollIntoView"===t)return void(c.mpScrollIntoView=a)}if("function"==typeof a&&t.match(/^on[A-Z]/)){var s=t.substr(2).toLowerCase(),u=a;return r===d&&"scroll"===s&&(u=function fn(e){e instanceof CustomEvent&&a.apply(null,Array.from(arguments))}),e.eventHandlers.push([s,u]),c.addEventListener(s,u)}return"string"==typeof a||"number"==typeof a?(c.setAttribute(t,a),void(c[t]=a)):"boolean"==typeof a?a?(c[t]=!0,c.setAttribute(t,a)):(c[t]=!1,c.removeAttribute(t)):void(c[t]=a)}if("string"==typeof a)return void c.setAttribute(t,a);if(!a)return void c.removeAttribute(t);if(o)if("string"==typeof i)c.style.cssText="";else for(var l in i)updateStyle(c,l,"");for(var p in a)updateStyle(c,p,a[p])}else c.className=o?function getClassName(e,r,t){var o=Array.from(e.classList),n=(r.className||r.class||"").split(" "),c=(t.className||t.class||"").split(" "),a=[];return o.forEach((function(e){c.indexOf(e)>-1?(a.push(e),c=c.filter((function(r){return r!==e}))):-1===n.indexOf(e)&&a.push(e)})),(a=[].concat((0,f.Z)(a),(0,f.Z)(c))).join(" ")}(c,o,n):a}r.Z=function reactifyWebComponent(e){var r=function(r){(0,s.Z)(Index,r);var t=_createSuper(Index);function Index(e){var r;return(0,a.Z)(this,Index),(r=t.call(this,e)).eventHandlers=[],r.ref=(0,p.createRef)(),r}return(0,i.Z)(Index,[{"key":"update","value":function update(r){var t=this;this.clearEventHandlers(),this.ref.current&&(Object.keys(r||{}).forEach((function(o){"children"===o||"key"===o||o in t.props||updateProp(t,e,o,r,t.props)})),Object.keys(this.props).forEach((function(o){updateProp(t,e,o,r,t.props)})))}},{"key":"componentDidUpdate","value":function componentDidUpdate(e){this.update(e)}},{"key":"componentDidMount","value":function componentDidMount(){var e=this.props.forwardRef;"function"==typeof e?e(this.ref.current):e&&"object"===(0,c.Z)(e)&&e.hasOwnProperty("current")?e.current=this.ref.current:"string"==typeof e&&console.warn("内置组件不支持字符串 ref"),this.update()}},{"key":"componentWillUnmount","value":function componentWillUnmount(){this.clearEventHandlers()}},{"key":"clearEventHandlers","value":function clearEventHandlers(){var e=this;this.eventHandlers.forEach((function(r){var t=(0,n.Z)(r,2),o=t[0],c=t[1];e.ref.current&&e.ref.current.removeEventListener(o,c)})),this.eventHandlers=[]}},{"key":"render","value":function render(){var r=this.props,t=r.children,o=r.dangerouslySetInnerHTML,n={"ref":this.ref};return o&&(n.dangerouslySetInnerHTML=o),(0,p.createElement)(e,n,t)}}]),Index}(p.Component);return p.forwardRef((function(e,t){return p.createElement(r,_objectSpread(_objectSpread({},e),{},{"forwardRef":t}))}))}},"1994":function(e,r,t){t.r(r),t.d(r,{"default":function(){return l}});var o=t(5671),n=t(3144),c=t(136),a=t(9388),i=t(7294),s=t(5403),u=t(5893),l=function(e){(0,c.Z)(Home,e);var r=(0,a.Z)(Home);function Home(){return(0,o.Z)(this,Home),r.apply(this,arguments)}return(0,n.Z)(Home,[{"key":"componentWillMount","value":function componentWillMount(){}},{"key":"componentDidMount","value":function componentDidMount(){}},{"key":"componentWillUnmount","value":function componentWillUnmount(){}},{"key":"componentDidShow","value":function componentDidShow(){}},{"key":"componentDidHide","value":function componentDidHide(){}},{"key":"render","value":function render(){return(0,u.jsxs)(s.G7,{"className":"home","children":[(0,u.jsxs)(s.G7,{"className":"textPart","children":[(0,u.jsx)(s.G7,{"className":"text","children":"Sea Shop,"}),(0,u.jsx)(s.G7,{"className":"text","children":"your business"}),(0,u.jsx)(s.G7,{"className":"text","children":"intelligence assistant!"})]}),(0,u.jsxs)(s.G7,{"className":"handlePart orderPart","children":[(0,u.jsxs)(s.G7,{"className":"left","children":[(0,u.jsx)(s.G7,{"className":"title","children":"订单中心"}),(0,u.jsx)(s.G7,{"className":"subTitle","children":"Order Center"}),(0,u.jsx)(s.G7,{"className":"desc","children":"请在这里处理新订单"})]}),(0,u.jsx)(s.G7,{"className":"rightImg"})]}),(0,u.jsxs)(s.G7,{"className":"handlePart reportPart","children":[(0,u.jsxs)(s.G7,{"className":"left","children":[(0,u.jsx)(s.G7,{"className":"title","children":"营收报表"}),(0,u.jsx)(s.G7,{"className":"subTitle","children":"Reporting Data"}),(0,u.jsx)(s.G7,{"className":"desc","children":"请在这里查看数据报表"})]}),(0,u.jsx)(s.G7,{"className":"rightImg"})]}),(0,u.jsxs)(s.G7,{"className":"handlePart morePart","children":[(0,u.jsxs)(s.G7,{"className":"left","children":[(0,u.jsx)(s.G7,{"className":"title1","children":"更多功能敬请期待..."}),(0,u.jsx)(s.G7,{"className":"subTitle"}),(0,u.jsx)(s.G7,{"className":"desc"})]}),(0,u.jsx)(s.G7,{"className":"rightImg"})]})]})}}]),Home}(i.Component)}}]);