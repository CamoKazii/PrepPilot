import React,{useEffect,useRef}from'react';
import{useLocation}from'react-router-dom';

export function SkipLink(){return <a className="skip-link" href="#main-content">Skip to main content</a>}

export function RouteAccessibility(){
  const location=useLocation();
  const headingRef=useRef(null);
  useEffect(()=>{
    const timer=requestAnimationFrame(()=>{
      const heading=document.querySelector('#main-content h1');
      if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});headingRef.current=heading}
      document.title=`${heading?.textContent||'PrepPilot'} · PrepPilot`;
    });
    return()=>cancelAnimationFrame(timer);
  },[location.pathname]);
  return <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">Page changed</div>;
}

export function RouteLoading(){return <div className="route-loading" role="status" aria-live="polite"><span aria-hidden="true" className="loading-dot"/>Loading page…</div>}
