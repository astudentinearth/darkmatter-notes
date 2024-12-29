/**
 * Removes the first parameter of given function type.
 */
export type OmitFirstParameter<Func extends (...args: any[]) => any> =
  Func extends (first: any, ...rest: infer Rest) => infer Return
    ? (...args: Rest) => Return
    : never;

/** Gets the last argument from a function signature. */
export type GetLastArg<Func extends (...args: any[]) => any> =
  Parameters<Func> extends [...unknown[], infer Last] ? Last : never;

/** Defines a predicate function that takes a value type and any number of additional arguments. */
export type Predicate<ValueType = unknown, ArgsType extends any[] = []> = (
  value: ValueType,
  ...args: ArgsType
) => boolean;
