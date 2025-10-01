'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MotionWrapperProps {
  children?: React.ReactNode;
  as?: string;
  className?: string;
  style?: React.CSSProperties;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  viewport?: any;
  onAnimationStart?: any;
  onAnimationComplete?: any;
  onHoverStart?: any;
  onHoverEnd?: any;
  onClick?: any;
  variants?: any;
  [key: string]: any;
}

export default function MotionWrapper({ 
  children, 
  as = 'div',
  className,
  style,
  initial, 
  animate, 
  exit,
  transition,
  whileHover,
  whileTap,
  whileInView,
  viewport,
  onAnimationStart,
  onAnimationComplete,
  onHoverStart,
  onHoverEnd,
  onClick,
  ...props 
}: MotionWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR, render without motion
  if (!isClient) {
    const Component = as as any;
    return (
      <Component className={className} style={style} onClick={onClick} {...props}>
        {children}
      </Component>
    );
  }

  // After hydration, render with motion
  const MotionComponent = (motion as any)[as] || motion.div;
  
  return (
    <MotionComponent
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      whileHover={whileHover}
      whileTap={whileTap}
      whileInView={whileInView}
      viewport={viewport}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

// Specific motion components for common use cases
export const MotionDiv = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="div">
    {props.children}
  </MotionWrapper>
);

export const MotionSection = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="section">
    {props.children}
  </MotionWrapper>
);

export const MotionH1 = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="h1">
    {props.children}
  </MotionWrapper>
);

export const MotionH2 = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="h2">
    {props.children}
  </MotionWrapper>
);

export const MotionH3 = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="h3">
    {props.children}
  </MotionWrapper>
);

export const MotionP = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="p">
    {props.children}
  </MotionWrapper>
);

export const MotionSpan = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="span">
    {props.children}
  </MotionWrapper>
);

export const MotionButton = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="button">
    {props.children}
  </MotionWrapper>
);

export const MotionA = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="a">
    {props.children}
  </MotionWrapper>
);

export const MotionImg = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="img" />
);

export const MotionUl = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="ul">
    {props.children}
  </MotionWrapper>
);

export const MotionLi = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="li">
    {props.children}
  </MotionWrapper>
);

export const MotionNav = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="nav">
    {props.children}
  </MotionWrapper>
);

export const MotionHeader = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="header">
    {props.children}
  </MotionWrapper>
);

export const MotionFooter = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="footer">
    {props.children}
  </MotionWrapper>
);

export const MotionMain = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="main">
    {props.children}
  </MotionWrapper>
);

export const MotionArticle = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="article">
    {props.children}
  </MotionWrapper>
);

export const MotionAside = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="aside">
    {props.children}
  </MotionWrapper>
);

export const MotionForm = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="form">
    {props.children}
  </MotionWrapper>
);

export const MotionInput = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="input" />
);

export const MotionTextarea = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="textarea">
    {props.children}
  </MotionWrapper>
);

export const MotionSelect = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="select">
    {props.children}
  </MotionWrapper>
);

export const MotionOption = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="option">
    {props.children}
  </MotionWrapper>
);

export const MotionLabel = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="label">
    {props.children}
  </MotionWrapper>
);

export const MotionFieldset = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="fieldset">
    {props.children}
  </MotionWrapper>
);

export const MotionLegend = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="legend">
    {props.children}
  </MotionWrapper>
);

export const MotionTable = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="table">
    {props.children}
  </MotionWrapper>
);

export const MotionThead = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="thead">
    {props.children}
  </MotionWrapper>
);

export const MotionTbody = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="tbody">
    {props.children}
  </MotionWrapper>
);

export const MotionTr = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="tr">
    {props.children}
  </MotionWrapper>
);

export const MotionTh = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="th">
    {props.children}
  </MotionWrapper>
);

export const MotionTd = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="td">
    {props.children}
  </MotionWrapper>
);

export const MotionCaption = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="caption">
    {props.children}
  </MotionWrapper>
);

export const MotionCol = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="col" />
);

export const MotionColgroup = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="colgroup">
    {props.children}
  </MotionWrapper>
);

export const MotionTfoot = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="tfoot">
    {props.children}
  </MotionWrapper>
);

export const MotionDl = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="dl">
    {props.children}
  </MotionWrapper>
);

export const MotionDt = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="dt">
    {props.children}
  </MotionWrapper>
);

export const MotionDd = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="dd">
    {props.children}
  </MotionWrapper>
);

export const MotionOl = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="ol">
    {props.children}
  </MotionWrapper>
);

export const MotionBlockquote = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="blockquote">
    {props.children}
  </MotionWrapper>
);

export const MotionCite = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="cite">
    {props.children}
  </MotionWrapper>
);

export const MotionCode = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="code">
    {props.children}
  </MotionWrapper>
);

export const MotionPre = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="pre">
    {props.children}
  </MotionWrapper>
);

export const MotionKbd = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="kbd">
    {props.children}
  </MotionWrapper>
);

export const MotionSamp = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="samp">
    {props.children}
  </MotionWrapper>
);

export const MotionVar = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="var">
    {props.children}
  </MotionWrapper>
);

export const MotionAbbr = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="abbr">
    {props.children}
  </MotionWrapper>
);

export const MotionAcronym = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="acronym">
    {props.children}
  </MotionWrapper>
);

export const MotionAddress = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="address">
    {props.children}
  </MotionWrapper>
);

export const MotionB = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="b">
    {props.children}
  </MotionWrapper>
);

export const MotionBdi = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="bdi">
    {props.children}
  </MotionWrapper>
);

export const MotionBdo = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="bdo">
    {props.children}
  </MotionWrapper>
);

export const MotionBig = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="big">
    {props.children}
  </MotionWrapper>
);

export const MotionBr = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="br" />
);

export const MotionCanvas = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="canvas">
    {props.children}
  </MotionWrapper>
);

export const MotionData = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="data">
    {props.children}
  </MotionWrapper>
);

export const MotionDatalist = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="datalist">
    {props.children}
  </MotionWrapper>
);

export const MotionDel = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="del">
    {props.children}
  </MotionWrapper>
);

export const MotionDetails = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="details">
    {props.children}
  </MotionWrapper>
);

export const MotionDfn = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="dfn">
    {props.children}
  </MotionWrapper>
);

export const MotionDialog = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="dialog">
    {props.children}
  </MotionWrapper>
);

export const MotionEm = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="em">
    {props.children}
  </MotionWrapper>
);

export const MotionEmbed = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="embed" />
);

export const MotionFigcaption = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="figcaption">
    {props.children}
  </MotionWrapper>
);

export const MotionFigure = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="figure">
    {props.children}
  </MotionWrapper>
);

export const MotionHr = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="hr" />
);

export const MotionI = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="i">
    {props.children}
  </MotionWrapper>
);

export const MotionIframe = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="iframe" />
);

export const MotionIns = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="ins">
    {props.children}
  </MotionWrapper>
);

export const MotionMark = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="mark">
    {props.children}
  </MotionWrapper>
);

export const MotionMeter = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="meter" />
);

export const MotionNoscript = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="noscript">
    {props.children}
  </MotionWrapper>
);

export const MotionObject = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="object">
    {props.children}
  </MotionWrapper>
);

export const MotionOutput = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="output">
    {props.children}
  </MotionWrapper>
);

export const MotionPicture = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="picture">
    {props.children}
  </MotionWrapper>
);

export const MotionProgress = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="progress" />
);

export const MotionQ = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="q">
    {props.children}
  </MotionWrapper>
);

export const MotionRp = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="rp">
    {props.children}
  </MotionWrapper>
);

export const MotionRt = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="rt">
    {props.children}
  </MotionWrapper>
);

export const MotionRuby = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="ruby">
    {props.children}
  </MotionWrapper>
);

export const MotionS = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="s">
    {props.children}
  </MotionWrapper>
);

export const MotionSvg = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="svg">
    {props.children}
  </MotionWrapper>
);

export const MotionSmall = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="small">
    {props.children}
  </MotionWrapper>
);

export const MotionSource = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="source" />
);

export const MotionStrong = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="strong">
    {props.children}
  </MotionWrapper>
);

export const MotionSub = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="sub">
    {props.children}
  </MotionWrapper>
);

export const MotionSummary = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="summary">
    {props.children}
  </MotionWrapper>
);

export const MotionSup = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="sup">
    {props.children}
  </MotionWrapper>
);

export const MotionTime = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="time">
    {props.children}
  </MotionWrapper>
);

export const MotionU = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="u">
    {props.children}
  </MotionWrapper>
);

export const MotionVideo = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="video">
    {props.children}
  </MotionWrapper>
);

export const MotionWbr = (props: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper {...props} as="wbr" />
);

// Stagger animation components
export const StaggerContainer = ({ children, ...props }: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper
    {...props}
    as="div"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
  >
    {children}
  </MotionWrapper>
);

export const StaggerItem = ({ children, ...props }: Omit<MotionWrapperProps, 'as'>) => (
  <MotionWrapper
    {...props}
    as="div"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    }}
  >
    {children}
  </MotionWrapper>
);