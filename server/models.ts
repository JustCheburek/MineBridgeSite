import {getModelForClass, type ReturnModelType} from '@typegoose/typegoose';
import {User} from "@/types/user";
import {Session} from "@/types/session";
import {Case, Drop} from "@/types/case";
import {Season} from "@/types/season";
import {Connect} from "./connect";
import {models, modelNames} from "mongoose";

Connect()

export const userModel = (models.users as ReturnModelType<typeof User>) || getModelForClass(User);
export const sessionModel = (models.sessions as ReturnModelType<typeof Session>) || getModelForClass(Session);
export const caseModel = (models.cases as ReturnModelType<typeof Case>) || getModelForClass(Case);
export const dropModel = (models.drops as ReturnModelType<typeof Drop>) || getModelForClass(Drop);
export const seasonModel = (models.seasons as ReturnModelType<typeof Season>) || getModelForClass(Season);

console.log(modelNames());
