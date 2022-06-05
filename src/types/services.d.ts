export interface IEventBusService {
  emit(event: string, data: any): void

  on(event: string, callback: (data: any) => any): void
}

