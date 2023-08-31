import { IGlobalOptions } from "../../../../type";

export type IOptions = IGlobalOptions & {
    name?: string;
    describation?: string;
    type?: string;
    region?: string;
    role?: string;
    props?: string;
}