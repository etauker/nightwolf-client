/**
 * An object consisting of simple key-value pairs.
 * 
 * ```
 * {
 *     "key": "value",
 *     "another key": 2
 * }
 * ```
 */
export interface IKeyValue {
    [key: string]: string | number;
}