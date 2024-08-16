import {Types} from "mongoose";

export type idOrName = {
    _id?: string | Types.ObjectId,
    name?: string
}