import {getModelForClass, getModelWithString, type ReturnModelType} from '@typegoose/typegoose';
import {User} from "@/types/user";
import {Session} from "@/types/session";
import {Drop, Case} from "@/types/case";
import {Season} from "@/types/season";
import {Connect} from "./connect";

Connect()

export const userModel = (getModelWithString("User") || getModelForClass(User)) as ReturnModelType<typeof User>
export const sessionModel = (getModelWithString("Session") || getModelForClass(Session)) as ReturnModelType<typeof Session>
export const caseModel = (getModelWithString("Case") || getModelForClass(Case)) as ReturnModelType<typeof Case>
export const dropModel = (getModelWithString("Drop") || getModelForClass(Drop)) as ReturnModelType<typeof Drop>
export const seasonModel = (getModelWithString("Season") || getModelForClass(Season)) as ReturnModelType<typeof Season>