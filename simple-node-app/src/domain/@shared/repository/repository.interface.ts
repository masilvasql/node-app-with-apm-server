import ApmElastic from "../../../infrastructure/apm/apm";

export default interface RepositoryInterface<T> {
    create(entity : T): Promise<void>;
    findAll(): Promise<T[]>;
}