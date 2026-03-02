declare module "class-variance-authority" {
  export type VariantProps<T> = T extends (...args: unknown[]) => unknown
    ? Record<string, unknown>
    : never;

  export function cva(
    base?: string,
    config?: {
      variants?: Record<string, Record<string, string>>;
      defaultVariants?: Record<string, string>;
    },
  ): (...args: unknown[]) => string;
}
