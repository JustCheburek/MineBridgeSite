import {getModelForClass, type ReturnModelType} from '@typegoose/typegoose';
import {User} from "@/types/user";
import {Session} from "@/types/session";
import {Case, Drop} from "@/types/case";
import {Season} from "@/types/season";
import {Code} from "@/types/code";
import {MGConnect, MySQLConnect} from "./connect";
import {models} from "mongoose";

MGConnect()

export const sqlPool = await MySQLConnect(process.env.MYSQL_DATABASE!)

export const userModel = (models.User as ReturnModelType<typeof User>) || getModelForClass(User);
const sessionModel = (models.Session as ReturnModelType<typeof Session>) || getModelForClass(Session);
export const caseModel = (models.Case as ReturnModelType<typeof Case>) || getModelForClass(Case);
export const dropModel = (models.Drop as ReturnModelType<typeof Drop>) || getModelForClass(Drop);
export const seasonModel = (models.Season as ReturnModelType<typeof Season>) || getModelForClass(Season);
export const codeModel = (models.Code as ReturnModelType<typeof Code>) || getModelForClass(Code);
