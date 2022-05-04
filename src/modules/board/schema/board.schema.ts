import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { List } from '../../list/schema/list.schema';
import { User } from '../../user/schema/user.schema';

export type BoardDocument = Board & Document;

@Schema()
export class Board {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    cover: string;

    @Prop({
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    })
    members: User[];

    @Prop({
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    })
    admins: User[];

    @Prop({
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    })
    lists: List[];
}

export const BoardSchema = SchemaFactory.createForClass( Board );
