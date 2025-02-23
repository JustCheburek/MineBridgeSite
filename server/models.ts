import {getModelForClass, type ReturnModelType} from '@typegoose/typegoose';
import {User} from "@/types/user";
import {Session} from "@/types/session";
import {Drop, Case} from "@/types/case";
import {Season} from "@/types/season";
import {Connect} from "./connect";
import {models} from "mongoose";

Connect()

export const userModel = (models?.User || models?.Users || getModelForClass(User)) as ReturnModelType<typeof User>
export const sessionModel = (models?.Session || models?.Sessions || getModelForClass(Session)) as ReturnModelType<typeof Session>
export const caseModel = (models?.Case || models?.Cases || getModelForClass(Case)) as ReturnModelType<typeof Case>
export const dropModel = (models?.Drop || models?.Drops || getModelForClass(Drop)) as ReturnModelType<typeof Drop>
export const seasonModel = (models?.Season || models?.Seasons || getModelForClass(Season)) as ReturnModelType<typeof Season>