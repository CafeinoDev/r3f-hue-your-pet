import{r as l,t as g,g as h,x as r,v as t,y as n}from"./index-a171926e.js";import{u as o,e as p}from"./useGLTF-25c6c7cf.js";const d=s=>{const m=l.useRef(),i=g(n),{nodes:e,materials:a}=o("./bear.gltf");return h((u,c)=>p.dampC(a["BrownDark.036"].color,i.color,.25,c)),r("group",{ref:m,...s,dispose:null,children:t("mesh",{geometry:e.character_bear.geometry,material:e.character_bear.material,rotation:[Math.PI/2,0,0],children:[r("mesh",{geometry:e.character_bearArmLeft.geometry,material:e.character_bearArmLeft.material,position:[.2,0,-.63]}),r("mesh",{geometry:e.character_bearArmRight.geometry,material:e.character_bearArmRight.material,position:[-.2,0,-.63]}),t("group",{position:[0,0,-.7],children:[r("mesh",{geometry:e.Cube1337.geometry,material:a["Black.025"]}),r("mesh",{geometry:e.Cube1337_1.geometry,material:e.Cube1337_1.material})]})]})})};o.preload("./bear.gltf");export{d as default};