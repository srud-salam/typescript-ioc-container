export type Factory<T, Tokens> = { [token in keyof Tokens]: T };
