/*
registerAs() is a helper function from @nestjs/config that names a 
configuration object so you can retrieve it by name later using ConfigService
*/

import { registerAs } from '@nestjs/config';
//This registers a named config object under the key "GoogleOAuth".
// This is a factory function that returns an object containing configuration values.
export default registerAs('GoogleOAuthRegister', () => ({
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
}));

// registerAs('googleOAuth', ...)	Registers a named config group

// () => ({ ... })	Factory function returning config object

// Used with ConfigModule.forRoot({ load: [...] })	Loads config at startup

// access with ConfigService.get('googleOAuth') or @Inject('GoogleOAuth')
//	Injects the config into other parts of the app
