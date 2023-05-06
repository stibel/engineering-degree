export interface ApiError {
    status: number;
    key: string;
    message: string;
    error: string;
    scope: string;
    detail?: string;
}
