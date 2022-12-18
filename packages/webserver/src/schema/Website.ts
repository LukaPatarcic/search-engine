import { getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class WebsiteClass extends TimeStamps {
    @prop()
    public url?: string;

    @prop()
    public title?: string;

    @prop()
    public description?: string;
}

export default getModelForClass(WebsiteClass);
