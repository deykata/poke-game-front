import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from './ui/ui-button/ui-button.component';
import { BattleCardComponent } from './pokemon/battle-card/battle-card.component';
import { UiModalComponent } from './ui/ui-modal/ui-modal.component';
import { BattleResultComponent } from './pokemon/battle-result/battle-result.component';
import { SettingsComponent } from './structure/settings/settings.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './structure/header/header.component';
import { UiTableComponent } from './ui/ui-table/ui-table.component';
import { RankingsComponent } from './structure/rankings/rankings.component';

@NgModule({
  declarations: [
    UiButtonComponent,
    UiModalComponent,
    UiTableComponent,
    BattleCardComponent,
    BattleResultComponent,
    SettingsComponent,
    HeaderComponent,
    RankingsComponent
  ],
  exports: [
    UiButtonComponent,
    UiModalComponent,
    UiTableComponent,
    BattleCardComponent,
    BattleResultComponent,
    SettingsComponent,
    HeaderComponent,
    RankingsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule
  ]
})
export class ComponentsModule { }
