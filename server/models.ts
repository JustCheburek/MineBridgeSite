import {models} from "mongoose"
import {getModelForClass, ReturnModelType} from '@typegoose/typegoose';
import {User} from "@/types/user";
import {Session} from "@/types/session";
import {Drop, Case} from "@/types/case";
import {Season} from "@/types/season";
import {Connect} from "./connect";
import type {AnyParamConstructor} from "@typegoose/typegoose/lib/types";

Connect()

const modelCache: Record<string, any> = {};

function getOrCreateModel<T>(name: string, classRef: any): ReturnModelType<T> {
    if (modelCache[name]) {
        return modelCache[name] as ReturnModelType<T>;
    }

    const existingModel = models[name];
    if (existingModel) {
        modelCache[name] = existingModel as ReturnModelType<T>;
        return existingModel as ReturnModelType<T>;
    }

    const newModel = getModelForClass(classRef) as ReturnModelType<T>;
    modelCache[name] = newModel;
    return newModel;
}

// Define and export models using the cached approach
export const userModel = getOrCreateModel<User>("User", User);
export const sessionModel = getOrCreateModel<Session>("Session", Session);
export const caseModel = getOrCreateModel<Case>("Case", Case);
export const dropModel = getOrCreateModel<Drop>("Drop", Drop);
export const seasonModel = getOrCreateModel<Season>("Season", Season);