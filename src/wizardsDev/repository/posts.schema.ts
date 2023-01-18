import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = BlogPost & Document;

@Schema({ timestamps: true, versionKey: false })
export class BlogPost {
  @Prop({ required: true, unique: true, index: true })
  ip: string;
  @Prop({ required: true })
  success: boolean;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  continent: string;
  @Prop({ required: true })
  continent_code: string;
  @Prop({ required: true })
  country: string;
  @Prop({ required: true })
  country_code: string;
  @Prop({ required: true })
    region: string;
  @Prop({ required: true })
  region_code: string;
  @Prop({ required: false })
  city: string;

  @Prop({ required: false })
  latitude: number;

  @Prop({ required: false })
  longitude: number;

  @Prop({ required: false })
  is_eu: boolean;

  @Prop({ required: false })
  postal: string;
  @Prop({ required: false })
  calling_code: string;
  @Prop({ required: false })
  capital:  string;
  @Prop({ required: false })
  borders: string;
  @Prop({ required: false, type: Object })
  flag: Flag
  @Prop({ required: false, type: Object })
  connection: Connection
  @Prop({ required: false, type: Object })
  timezone: TimeZone;
  @Prop({ required: false, type: Object })
  currency: Currency;
  @Prop({ required: false, type: Object })
  security: Security
}

interface Flag {
  img: string;
  emoji: string;
  emoji_unicode: string;
}

interface Connection {
  asn: number;
  org: string;
  isp: string;
  domain: string;
}

interface TimeZone {
  id: string;
  abbr: string;
  is_dst: string;
  "offset": string;
  utc: string;
  current_time: string;
};

interface Currency {
  name: string;
  code: string;
  symbol: string;
  plural: string;
  exchange_rate: number;
};

interface Security {
  anonymous: boolean;
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
  hosting: boolean;
};

export const PostSchema = SchemaFactory.createForClass(BlogPost);
