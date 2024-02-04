import { NgModule} from "@angular/core";

// NQ Zorro Imports
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({

    exports: [
        NzButtonModule,
    NzGridModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    ]



})

export class NgZorroModule{}