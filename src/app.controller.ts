import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { EventInterface } from './interfaces/event.interface';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('new_exception')
  handleNewException(info: EventInterface) {
    return this.appService.saveEvent(info);
  }
}
