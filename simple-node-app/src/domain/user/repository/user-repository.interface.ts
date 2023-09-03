import RepositoryInterface from "../../@shared/repository/repository.interface";
import User from "../entity/user/user.entity";

export default interface UserRepositoryInterface extends RepositoryInterface<User> {
}