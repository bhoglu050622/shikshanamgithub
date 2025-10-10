'use client'

import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'

// Create a comprehensive motion wrapper that handles SSR properly
const createMotionComponent = (tag: string) => {
  return dynamic(() => import('framer-motion').then(mod => ({ 
    default: mod.motion[tag] || mod.motion.div 
  })), {
    ssr: false,
    loading: () => {
      const Component = tag as any
      return <Component />
    }
  })
}

// Create all motion components
export const motion = {
  div: createMotionComponent('div'),
  section: createMotionComponent('section'),
  article: createMotionComponent('article'),
  header: createMotionComponent('header'),
  footer: createMotionComponent('footer'),
  nav: createMotionComponent('nav'),
  main: createMotionComponent('main'),
  aside: createMotionComponent('aside'),
  button: createMotionComponent('button'),
  span: createMotionComponent('span'),
  p: createMotionComponent('p'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  h4: createMotionComponent('h4'),
  h5: createMotionComponent('h5'),
  h6: createMotionComponent('h6'),
  ul: createMotionComponent('ul'),
  ol: createMotionComponent('ol'),
  li: createMotionComponent('li'),
  a: createMotionComponent('a'),
  img: createMotionComponent('img'),
  form: createMotionComponent('form'),
  input: createMotionComponent('input'),
  textarea: createMotionComponent('textarea'),
  select: createMotionComponent('select'),
  option: createMotionComponent('option'),
  label: createMotionComponent('label'),
  fieldset: createMotionComponent('fieldset'),
  legend: createMotionComponent('legend'),
  table: createMotionComponent('table'),
  thead: createMotionComponent('thead'),
  tbody: createMotionComponent('tbody'),
  tr: createMotionComponent('tr'),
  th: createMotionComponent('th'),
  td: createMotionComponent('td'),
  canvas: createMotionComponent('canvas'),
  svg: createMotionComponent('svg'),
  path: createMotionComponent('path'),
  circle: createMotionComponent('circle'),
  rect: createMotionComponent('rect'),
  line: createMotionComponent('line'),
  polyline: createMotionComponent('polyline'),
  polygon: createMotionComponent('polygon'),
  ellipse: createMotionComponent('ellipse'),
  g: createMotionComponent('g'),
  defs: createMotionComponent('defs'),
  clipPath: createMotionComponent('clipPath'),
  mask: createMotionComponent('mask'),
  pattern: createMotionComponent('pattern'),
  image: createMotionComponent('image'),
  text: createMotionComponent('text'),
  tspan: createMotionComponent('tspan'),
  foreignObject: createMotionComponent('foreignObject'),
  use: createMotionComponent('use'),
  symbol: createMotionComponent('symbol'),
  marker: createMotionComponent('marker'),
  linearGradient: createMotionComponent('linearGradient'),
  radialGradient: createMotionComponent('radialGradient'),
  stop: createMotionComponent('stop'),
  filter: createMotionComponent('filter'),
  feGaussianBlur: createMotionComponent('feGaussianBlur'),
  feColorMatrix: createMotionComponent('feColorMatrix'),
  feComposite: createMotionComponent('feComposite'),
  feMerge: createMotionComponent('feMerge'),
  feMergeNode: createMotionComponent('feMergeNode'),
  feOffset: createMotionComponent('feOffset'),
  feFlood: createMotionComponent('feFlood'),
  feBlend: createMotionComponent('feBlend'),
  feImage: createMotionComponent('feImage'),
  feMorphology: createMotionComponent('feMorphology'),
  feTile: createMotionComponent('feTile'),
  feTurbulence: createMotionComponent('feTurbulence'),
  feConvolveMatrix: createMotionComponent('feConvolveMatrix'),
  feDiffuseLighting: createMotionComponent('feDiffuseLighting'),
  feSpecularLighting: createMotionComponent('feSpecularLighting'),
  feDistantLight: createMotionComponent('feDistantLight'),
  fePointLight: createMotionComponent('fePointLight'),
  feSpotLight: createMotionComponent('feSpotLight'),
  feFuncR: createMotionComponent('feFuncR'),
  feFuncG: createMotionComponent('feFuncG'),
  feFuncB: createMotionComponent('feFuncB'),
  feFuncA: createMotionComponent('feFuncA'),
  feComponentTransfer: createMotionComponent('feComponentTransfer'),
  feDisplacementMap: createMotionComponent('feDisplacementMap'),
  feDropShadow: createMotionComponent('feDropShadow'),
}

// Create AnimatePresence with SSR safety
export const AnimatePresence = dynamic(() => import('framer-motion').then(mod => ({ 
  default: mod.AnimatePresence 
})), {
  ssr: false,
  loading: () => null
})
