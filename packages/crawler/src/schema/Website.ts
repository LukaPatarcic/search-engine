import { getModelForClass, prop, index } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@index({ url: 'text', titleNormalized: 'text', descriptionNormalized: 'text' })
export class WebsiteClass extends TimeStamps {
    @prop({ unique: true })
    public url!: string;

    @prop()
    public titleNormalized!: string;

    @prop()
    public title!: string;

    @prop()
    public descriptionNormalized!: string;

    @prop()
    public description!: string;
}

export const WebsiteModel = getModelForClass(WebsiteClass);
