import { Constructor } from ".";

export type Token<T = any> = Constructor<T> | string;
