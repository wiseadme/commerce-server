export interface IEmitterService {
  emit: (event: string, data: any) => void
  on: (event: string, callback: (data: any) => any) => void
}

export interface ICategoryEventListeners {
  onDelete: () => void
}
