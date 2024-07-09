export type AnyComponentList = readonly string[]

export type ParsedColor<Type extends ColorType = ColorType> =
  {} & (Type extends any
    ? { type: Type; alpha: number } & ColorValues<Type>
    : never)

export type ColorType<
  ComponentList extends AnyComponentList = AnyComponentList,
> = {
  name: string
  components: ComponentList
}

export type ColorParser<
  Model extends ColorType,
  Input extends string | RegExpExecArray = string | RegExpExecArray,
> = Input extends string
  ? {
      model: Model
      parse: (color: Input) => ParsedColor<Model> | undefined
    }
  : {
      model: Model
      regex: RegExp
      parse: (match: Input) => ParsedColor<Model> | undefined
    }

export type ColorValues<Model extends ColorType> = {
  [K in Model['components'][number]]: number
}