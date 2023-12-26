export interface ICRUDModelCreate<T> {
  create(data: T): Promise<T>;
}

export interface ICRUDModelRead<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}

export interface ICRUDModelReadWithQuery<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  findAllInProgress(): Promise<T[]>;
  findAllFinished(): Promise<T[]>;
  finishMatch(id: number): Promise<T | null>;
}

export interface ICRUDModelUpdate<T> {
  update(id: number, data: T): Promise<T | null>;
}

export interface ICRUDModelDelete {
  delete(id: number): Promise<number>;
}

export interface ICRUDModel<T>
  extends ICRUDModelCreate<T>, ICRUDModelRead<T>, ICRUDModelUpdate<T>, ICRUDModelDelete { }
