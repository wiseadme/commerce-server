export interface IBaseRepository {
  validateId(id: string): boolean | undefined
}
