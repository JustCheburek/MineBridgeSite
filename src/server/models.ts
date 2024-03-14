import {models} from "mongoose"
import {getModelForClass} from '@typegoose/typegoose';
import {User} from "@src/types/user";
import {Role} from "@src/types/role";
import {Session} from "@src/types/session";
import {connect} from "./db";

connect()

export const userModel = models.User || getModelForClass(User)
export const roleModel = models.Role || getModelForClass(Role)
export const sessionModel = models.Session || getModelForClass(Session)
