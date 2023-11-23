import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { OptixModule } from './optix/optix.module';

platformBrowserDynamic().bootstrapModule(OptixModule)
  .catch(err => console.error(err));
