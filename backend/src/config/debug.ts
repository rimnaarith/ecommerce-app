import D from 'debug';
/**
 * Debug
 */
const debug = {
  APP: D('APP')
};

// Set global variable
if (!global.D) global.D = debug;
type DEBUG = typeof debug
export type { DEBUG };