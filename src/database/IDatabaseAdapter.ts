export interface IDatabaseAdapter {
    all(table: string): Array<any>,
    filter(table: string, properties: object): Array<any>,
    find(table: string, properties: object): object,
    save(table: string, primaryKey: string, data: object): void
};