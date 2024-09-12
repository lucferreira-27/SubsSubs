export interface Subtitle {
    _id: string;
    showName: string;
    season: number;
    episode: number;
    language: string;
    filler: boolean;
    filename: string;
    dialogCount: number; // Add this line
}

export interface FilterOptions {
    showName?: string;
    season?: number | null;
    language?: string | null;
    filler?: boolean | null;
}