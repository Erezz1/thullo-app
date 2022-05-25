import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Board } from '../../board/schema/board.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        default: [],
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }],
    })
    boards: Board[];

    @Prop({
        default: 'https://i.pravatar.cc/300',
    })
    imageAvatar: string;
}

export const UserSchema = SchemaFactory.createForClass( User );
