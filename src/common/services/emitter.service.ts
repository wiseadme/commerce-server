import EventEmitter from 'events'
import { injectable } from 'inversify'
import { IEmitterService } from '@/types/listeners'

export const emitter = new EventEmitter()

@injectable()
export class EmitterService implements IEmitterService {
  emitter: EventEmitter

  constructor(){
    this.emitter = emitter
  }

  emit(event: string, data: any){
    this.emitter.emit(event, data)
  }

  on(event: string, callback){
    this.emitter.on(event, callback)
  }
}
