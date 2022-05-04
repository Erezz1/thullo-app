import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Card } from '../../card/schema/card.schema';

export type ListDocument = List & Document;

@Schema()
export class List {
    @Prop({ required: true })
    name: string;

    @Prop({
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    })
    cards: Card[];
}

export const ListSchema = SchemaFactory.createForClass( List );
