import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: 'mailexam_midway_example',
  koa: {
    port: Number(process.env.HTTP_PORT || 7001),
    hostname: process.env.HTTP_HOST || '127.0.0.1',
  },
} as MidwayConfig;
