import {models} from "mongoose"
import {getModelForClass, ReturnModelType} from '@typegoose/typegoose';
import {User} from "@/types/user";
import {Session} from "@/types/session";
import {Drop, Case} from "@/types/case";
import {Connect} from "./db";

Connect()

export const userModel = (models?.User || getModelForClass(User)) as ReturnModelType<typeof User>
export const sessionModel = (models?.Session || getModelForClass(Session)) as ReturnModelType<typeof Session>
export const dropModel = (models?.Drop || getModelForClass(Drop)) as ReturnModelType<typeof Drop>
export const caseModel = (models?.Case || getModelForClass(Case)) as ReturnModelType<typeof Case>