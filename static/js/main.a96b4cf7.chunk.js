(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{25:function(t,e,n){},26:function(t,e,n){},36:function(t,e,n){"use strict";n.r(e);var c=n(0),s=n.n(c),i=n(18),r=n.n(i),u=(n(25),n(8)),a=(n(26),n(20)),j=n(40),o=n(39),b=n(1),O=s.a.memo((function(t){var e=Object(c.useState)(0),n=Object(u.a)(e,2),s=n[0],i=n[1],r=Object(c.useState)(0),a=Object(u.a)(r,2),O=a[0],h=a[1],l=Object(c.useState)(0),f=Object(u.a)(l,2),x=f[0],m=f[1],w=Object(c.useState)("stop"),v=Object(u.a)(w,2),S=v[0],k=v[1],g=Object(c.useState)(0),C=Object(u.a)(g,2),N=C[0],y=C[1];Object(c.useEffect)((function(){var t=Object(j.a)(1e3).pipe(Object(o.a)((function(){return"run"===S||"reset"===S||"continue"===S}))).subscribe((function(t){i((function(t){return t+1}))}));return"wait"!==S&&"continue"!==S&&B(),function(){t.unsubscribe()}}),[S]);var B=function(){i(0),h(0),m(0)};60===s&&(i(0),h((function(t){return t+1}))),60===O&&(h(0),m((function(t){return t+1})));return Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Stopwatch"}),Object(b.jsx)(p,{s:s,m:O,h:x}),Object(b.jsx)(d,{start:function(){k("run")},status:S,s:s,stop:function(){k("stop")},reset:function(){B(),k("reset")},wait:function(){k("continue"),0===N?y((new Date).getTime()):(new Date).getTime()-N<300?k("wait"):y((new Date).getTime())}})]})})})),p=function(t){var e=t.s,n=t.m,c=t.h;return Object(b.jsxs)("div",{className:"watch",children:[Object(b.jsx)("span",{children:c>=10?c:"0"+c}),"\xa0:\xa0",Object(b.jsx)("span",{children:n>=10?n:"0"+n}),"\xa0:\xa0",Object(b.jsx)("span",{children:e>=10?e:"0"+e})]})},d=function(t){var e=t.start,n=t.stop,c=t.wait,s=t.reset,i=t.status,r="run"===i||"reset"===i||"wait"===i||"continue"===i;return Object(b.jsxs)("div",{className:"stopWatchButtons",children:["stop"===i&&Object(b.jsx)("button",{onClick:e,children:"Start"}),r&&Object(b.jsx)("button",{onClick:n,className:"stopButton",children:"Stop"}),Object(b.jsx)("button",{onClick:c,children:"Wait"}),Object(b.jsx)("button",{onClick:s,id:"reset",children:"Reset"})]})},h=function(){return Object(b.jsx)(a.a,{children:Object(b.jsx)(O,{})})};r.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(h,{})}),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.a96b4cf7.chunk.js.map