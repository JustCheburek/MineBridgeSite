import {prop} from "@typegoose/typegoose";

export class Notifications {
    @prop({default: true})
    public news!: boolean

    @prop({default: true})
    public mostiki!: boolean

    @prop({default: true})
    public rating!: boolean

    @prop({default: true})
    public hours!: boolean

    @prop({default: true})
    public vote!: boolean

    @prop({default: true})
    public invite!: boolean
}