import { NgModule } from '@angular/core';
import { TenThousandPipe } from './ten-thousand/ten-thousand';
@NgModule({
	declarations: [TenThousandPipe],
	imports: [],
	exports: [TenThousandPipe]
})
export class PipesModule {}
