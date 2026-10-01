import CountUpModule from 'react-countup';

// react-countup is CommonJS with `exports.default`. Vite 8 (Rolldown) follows Node
// interop, so the default import is the whole module object rather than the component.
const CountUp = ((CountUpModule as unknown as { default?: typeof CountUpModule }).default ??
  CountUpModule) as typeof CountUpModule;

export default CountUp;
