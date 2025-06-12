import { createDefaultPreset } from 'ts-jest';

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  transform: {
    ...createDefaultPreset().transform,
  },
};
