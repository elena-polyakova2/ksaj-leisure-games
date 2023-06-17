/*
- import any modules to recognise any path that has ".svg"
- extend the module to export ReactComponent
*/
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}