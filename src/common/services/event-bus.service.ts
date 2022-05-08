import EventEmitter from 'events'
import { injectable } from 'inversify'
import { IEventBusService } from '@/types/services'

const events = new EventEmitter()

@injectable()
export class EventBusService implements IEventBusService {
  constructor() {
  }

  emit(event: string, data: any) {
    events.emit(event, data)
  }

  on(event: string, callback: (data: any) => any) {
    events.on(event, callback)
  }
}
