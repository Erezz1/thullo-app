import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
    @Prop({ required: true })
    title: string;

    @Prop({ default: '' })
    description: string;

    @Prop({ default: '' })
    cover: string;
}

const CardSchema = SchemaFactory.createForClass( Card );

CardSchema.methods.toJSON = function () {
    const { __v, _id, ...card } = this.toObject();
    return {
        id: _id,
        ...card,
    };
}

export { CardSchema };
