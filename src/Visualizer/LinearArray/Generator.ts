import { ObjectMap } from "../../utils/generict.type";

export type LinearGeneratorCreator<T extends number | string> = (
  sortedArray: number[],
  target: number
) => LinearGenerator<T>;

export type LinearGenerator<T extends number | string> = Generator<
  RenderConfig<T>,
  unknown,
  unknown
>;

export type RenderConfig<T> = {
  shadows?: {
    [key: string]: {
      start: number;
      span: number;
    };
  };

  array?: ArrayKeyDescriptor<T>[];
  pointers?: ObjectMap<string, number>;
  boundaries?: ObjectMap<string, number>;
};

/**
 * Given a render config types, it returns the type of its indexes
 */
export type IndexType<T> = T extends RenderConfig<infer TIndex> ? TIndex : null;
/**
 * Describes the content of a given array index;
 */
export type ArrayKeyDescriptor<T> = T | AdvancedArrayKeyDescriptor<T>;

type AdvancedArrayKeyDescriptor<T> = {
  content: T;
  style: Partial < CSSStyleDeclaration > ;
};
