import { Component, Injector, OnInit, Input } from '@angular/core';
import { ThemesLayoutBaseComponent } from '../themes/themes-layout-base.component';
import { AbpSessionService } from 'abp-ng2-module';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'chat-toggle-button',
    templateUrl: './chat-toggle-button.component.html',
})
export class ChatToggleButtonComponent extends ThemesLayoutBaseComponent implements OnInit {
    @Input() customStyle = 'btn btn-active-color-primary btn-active-light btn-custom btn-icon btn-icon-muted h-35px h-md-40px position-relative w-35px w-md-40px';
    @Input() iconStyle = 'flaticon-chat-2 fs-4';

    unreadChatMessageCount = 0;
    chatConnected = false;
    isHost = false;

    public constructor(
        injector: Injector,
        private _abpSessionService: AbpSessionService,
        _dateTimeService: DateTimeService
    ) {
        super(injector, _dateTimeService);
    }

    ngOnInit(): void {
        this.registerToEvents();
        this.isHost = !this._abpSessionService.tenantId;
    }

    registerToEvents() {
        this.subscribeToEvent('app.chat.unreadMessageCountChanged', (messageCount) => {
            this.unreadChatMessageCount = messageCount;
        });

        this.subscribeToEvent('app.chat.connected', () => {
            this.chatConnected = true;
        });
    }
}
