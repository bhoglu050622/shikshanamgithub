'use client'

import dynamic from 'next/dynamic'
import { ComponentProps } from 'react'
import Image from 'next/image'

// Create SSR-safe motion components using dynamic imports
const MotionDiv = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.div })), {
  ssr: false,
  loading: () => <div />
})

const MotionSection = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.section })), {
  ssr: false,
  loading: () => <section />
})

const MotionArticle = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.article })), {
  ssr: false,
  loading: () => <article />
})

const MotionHeader = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.header })), {
  ssr: false,
  loading: () => <header />
})

const MotionFooter = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.footer })), {
  ssr: false,
  loading: () => <footer />
})

const MotionNav = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.nav })), {
  ssr: false,
  loading: () => <nav />
})

const MotionMain = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.main })), {
  ssr: false,
  loading: () => <main />
})

const MotionAside = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.aside })), {
  ssr: false,
  loading: () => <aside />
})

const MotionButton = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.button })), {
  ssr: false,
  loading: () => <button />
})

const MotionSpan = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.span })), {
  ssr: false,
  loading: () => <span />
})

const MotionP = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.p })), {
  ssr: false,
  loading: () => <p />
})

const MotionH1 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h1 })), {
  ssr: false,
  loading: () => <h1 />
})

const MotionH2 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h2 })), {
  ssr: false,
  loading: () => <h2 />
})

const MotionH3 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h3 })), {
  ssr: false,
  loading: () => <h3 />
})

const MotionH4 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h4 })), {
  ssr: false,
  loading: () => <h4 />
})

const MotionH5 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h5 })), {
  ssr: false,
  loading: () => <h5 />
})

const MotionH6 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h6 })), {
  ssr: false,
  loading: () => <h6 />
})

const MotionUl = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.ul })), {
  ssr: false,
  loading: () => <ul />
})

const MotionOl = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.ol })), {
  ssr: false,
  loading: () => <ol />
})

const MotionLi = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.li })), {
  ssr: false,
  loading: () => <li />
})

const MotionA = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.a })), {
  ssr: false,
  loading: () => <a />
})

const MotionImg = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.img })), {
  ssr: false,
  loading: () => <Image src="/placeholder.png" alt="" width={100} height={100} />
})

const MotionForm = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.form })), {
  ssr: false,
  loading: () => <form />
})

const MotionInput = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.input })), {
  ssr: false,
  loading: () => <input />
})

const MotionTextarea = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.textarea })), {
  ssr: false,
  loading: () => <textarea />
})

const MotionSelect = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.select })), {
  ssr: false,
  loading: () => <select />
})

const MotionOption = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.option })), {
  ssr: false,
  loading: () => <option />
})

const MotionLabel = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.label })), {
  ssr: false,
  loading: () => <label />
})

const MotionFieldset = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.fieldset })), {
  ssr: false,
  loading: () => <fieldset />
})

const MotionLegend = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.legend })), {
  ssr: false,
  loading: () => <legend />
})

const MotionTable = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.table })), {
  ssr: false,
  loading: () => <table />
})

const MotionThead = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.thead })), {
  ssr: false,
  loading: () => <thead />
})

const MotionTbody = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.tbody })), {
  ssr: false,
  loading: () => <tbody />
})

const MotionTr = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.tr })), {
  ssr: false,
  loading: () => <tr />
})

const MotionTh = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.th })), {
  ssr: false,
  loading: () => <th />
})

const MotionTd = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.td })), {
  ssr: false,
  loading: () => <td />
})

const MotionCanvas = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.canvas })), {
  ssr: false,
  loading: () => <canvas />
})

const MotionSvg = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.svg })), {
  ssr: false,
  loading: () => <svg />
})

const MotionPath = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.path })), {
  ssr: false,
  loading: () => <path />
})

const MotionCircle = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.circle })), {
  ssr: false,
  loading: () => <circle />
})

const MotionRect = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.rect })), {
  ssr: false,
  loading: () => <rect />
})

const MotionLine = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.line })), {
  ssr: false,
  loading: () => <line />
})

const MotionPolyline = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.polyline })), {
  ssr: false,
  loading: () => <polyline />
})

const MotionPolygon = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.polygon })), {
  ssr: false,
  loading: () => <polygon />
})

const MotionEllipse = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.ellipse })), {
  ssr: false,
  loading: () => <ellipse />
})

const MotionG = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.g })), {
  ssr: false,
  loading: () => <g />
})

const MotionDefs = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.defs })), {
  ssr: false,
  loading: () => <defs />
})

const MotionClipPath = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.clipPath })), {
  ssr: false,
  loading: () => <clipPath />
})

const MotionMask = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.mask })), {
  ssr: false,
  loading: () => <mask />
})

const MotionPattern = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.pattern })), {
  ssr: false,
  loading: () => <pattern />
})

const MotionImage = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.image })), {
  ssr: false,
  loading: () => <image />
})

const MotionText = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.text })), {
  ssr: false,
  loading: () => <text />
})

const MotionTspan = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.tspan })), {
  ssr: false,
  loading: () => <tspan />
})

const MotionForeignObject = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.foreignObject })), {
  ssr: false,
  loading: () => <foreignObject />
})

const MotionUse = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.use })), {
  ssr: false,
  loading: () => <use />
})

const MotionSymbol = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.symbol })), {
  ssr: false,
  loading: () => <symbol />
})

const MotionMarker = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.marker })), {
  ssr: false,
  loading: () => <marker />
})

const MotionLinearGradient = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.linearGradient })), {
  ssr: false,
  loading: () => <linearGradient />
})

const MotionRadialGradient = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.radialGradient })), {
  ssr: false,
  loading: () => <radialGradient />
})

const MotionStop = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.stop })), {
  ssr: false,
  loading: () => <stop />
})

const MotionFilter = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.filter })), {
  ssr: false,
  loading: () => <filter />
})

const MotionFeGaussianBlur = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feGaussianBlur })), {
  ssr: false,
  loading: () => <feGaussianBlur />
})

const MotionFeColorMatrix = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feColorMatrix })), {
  ssr: false,
  loading: () => <feColorMatrix />
})

const MotionFeComposite = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feComposite })), {
  ssr: false,
  loading: () => <feComposite />
})

const MotionFeMerge = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feMerge })), {
  ssr: false,
  loading: () => <feMerge />
})

const MotionFeMergeNode = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feMergeNode })), {
  ssr: false,
  loading: () => <feMergeNode />
})

const MotionFeOffset = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feOffset })), {
  ssr: false,
  loading: () => <feOffset />
})

const MotionFeFlood = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feFlood })), {
  ssr: false,
  loading: () => <feFlood />
})

const MotionFeBlend = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feBlend })), {
  ssr: false,
  loading: () => <feBlend />
})

const MotionFeImage = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feImage })), {
  ssr: false,
  loading: () => <feImage />
})

const MotionFeMorphology = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feMorphology })), {
  ssr: false,
  loading: () => <feMorphology />
})

const MotionFeTile = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feTile })), {
  ssr: false,
  loading: () => <feTile />
})

const MotionFeTurbulence = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feTurbulence })), {
  ssr: false,
  loading: () => <feTurbulence />
})

const MotionFeConvolveMatrix = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feConvolveMatrix })), {
  ssr: false,
  loading: () => <feConvolveMatrix />
})

const MotionFeDiffuseLighting = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feDiffuseLighting })), {
  ssr: false,
  loading: () => <feDiffuseLighting />
})

const MotionFeSpecularLighting = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feSpecularLighting })), {
  ssr: false,
  loading: () => <feSpecularLighting />
})

const MotionFeDistantLight = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feDistantLight })), {
  ssr: false,
  loading: () => <feDistantLight />
})

const MotionFePointLight = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.fePointLight })), {
  ssr: false,
  loading: () => <fePointLight />
})

const MotionFeSpotLight = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feSpotLight })), {
  ssr: false,
  loading: () => <feSpotLight />
})

const MotionFeFuncR = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feFuncR })), {
  ssr: false,
  loading: () => <feFuncR />
})

const MotionFeFuncG = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feFuncG })), {
  ssr: false,
  loading: () => <feFuncG />
})

const MotionFeFuncB = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feFuncB })), {
  ssr: false,
  loading: () => <feFuncB />
})

const MotionFeFuncA = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feFuncA })), {
  ssr: false,
  loading: () => <feFuncA />
})

const MotionFeComponentTransfer = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feComponentTransfer })), {
  ssr: false,
  loading: () => <feComponentTransfer />
})

const MotionFeDisplacementMap = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feDisplacementMap })), {
  ssr: false,
  loading: () => <feDisplacementMap />
})

const MotionFeDropShadow = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.feDropShadow })), {
  ssr: false,
  loading: () => <feDropShadow />
})

// Create a comprehensive motion object
export const motion = {
  div: MotionDiv,
  section: MotionSection,
  article: MotionArticle,
  header: MotionHeader,
  footer: MotionFooter,
  nav: MotionNav,
  main: MotionMain,
  aside: MotionAside,
  button: MotionButton,
  span: MotionSpan,
  p: MotionP,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
  h4: MotionH4,
  h5: MotionH5,
  h6: MotionH6,
  ul: MotionUl,
  ol: MotionOl,
  li: MotionLi,
  a: MotionA,
  img: MotionImg,
  form: MotionForm,
  input: MotionInput,
  textarea: MotionTextarea,
  select: MotionSelect,
  option: MotionOption,
  label: MotionLabel,
  fieldset: MotionFieldset,
  legend: MotionLegend,
  table: MotionTable,
  thead: MotionThead,
  tbody: MotionTbody,
  tr: MotionTr,
  th: MotionTh,
  td: MotionTd,
  canvas: MotionCanvas,
  svg: MotionSvg,
  path: MotionPath,
  circle: MotionCircle,
  rect: MotionRect,
  line: MotionLine,
  polyline: MotionPolyline,
  polygon: MotionPolygon,
  ellipse: MotionEllipse,
  g: MotionG,
  defs: MotionDefs,
  clipPath: MotionClipPath,
  mask: MotionMask,
  pattern: MotionPattern,
  image: MotionImage,
  text: MotionText,
  tspan: MotionTspan,
  foreignObject: MotionForeignObject,
  use: MotionUse,
  symbol: MotionSymbol,
  marker: MotionMarker,
  linearGradient: MotionLinearGradient,
  radialGradient: MotionRadialGradient,
  stop: MotionStop,
  filter: MotionFilter,
  feGaussianBlur: MotionFeGaussianBlur,
  feColorMatrix: MotionFeColorMatrix,
  feComposite: MotionFeComposite,
  feMerge: MotionFeMerge,
  feMergeNode: MotionFeMergeNode,
  feOffset: MotionFeOffset,
  feFlood: MotionFeFlood,
  feBlend: MotionFeBlend,
  feImage: MotionFeImage,
  feMorphology: MotionFeMorphology,
  feTile: MotionFeTile,
  feTurbulence: MotionFeTurbulence,
  feConvolveMatrix: MotionFeConvolveMatrix,
  feDiffuseLighting: MotionFeDiffuseLighting,
  feSpecularLighting: MotionFeSpecularLighting,
  feDistantLight: MotionFeDistantLight,
  fePointLight: MotionFePointLight,
  feSpotLight: MotionFeSpotLight,
  feFuncR: MotionFeFuncR,
  feFuncG: MotionFeFuncG,
  feFuncB: MotionFeFuncB,
  feFuncA: MotionFeFuncA,
  feComponentTransfer: MotionFeComponentTransfer,
  feDisplacementMap: MotionFeDisplacementMap,
  feDropShadow: MotionFeDropShadow,
}

// Re-export AnimatePresence with SSR safety
export const AnimatePresence = dynamic(() => import('framer-motion').then(mod => ({ default: mod.AnimatePresence })), {
  ssr: false,
  loading: () => null
})