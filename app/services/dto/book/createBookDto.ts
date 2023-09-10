export interface CreateBookDto {
    title: string;
    author?: string;
    publisher?: string;
    edition?: number | null;
}
