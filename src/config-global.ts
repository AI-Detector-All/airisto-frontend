
import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isStaticExport: any;
  appName: string;
  appVersion: string;
  serverUrl: string;
  assetsDir: string;
  
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Web3Wanderers',
  appVersion: packageJson.version,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: undefined
};

export const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICEID;

export const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATEID;

export const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY;
