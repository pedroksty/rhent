import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IusersTokensRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>
}
