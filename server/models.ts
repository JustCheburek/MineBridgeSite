import {getModelForClass, type ReturnModelType} from '@typegoose/typegoose';
import {User} from "@/types/user";
import {Session} from "@/types/session";
import {Drop, Case} from "@/types/case";
import {Season} from "@/types/season";
import {Connect} from "./connect";
import {models} from "mongoose";

Connect()

export const userModel = (models?.User || getModelForClass(User, {schemaOptions: {overwriteModels: true}})) as ReturnModelType<typeof User>
export const sessionModel = (models?.Session || getModelForClass(Session, {schemaOptions: {overwriteModels: true}})) as ReturnModelType<typeof Session>
export const caseModel = (models?.Case || getModelForClass(Case, {schemaOptions: {overwriteModels: true}})) as ReturnModelType<typeof Case>
export const dropModel = (models?.Drop || getModelForClass(Drop, {schemaOptions: {overwriteModels: true}})) as ReturnModelType<typeof Drop>
export const seasonModel = (models?.Season || getModelForClass(Season, {schemaOptions: {overwriteModels: true}})) as ReturnModelType<typeof Season>