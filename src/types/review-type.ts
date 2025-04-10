export interface ReviewContent {
    keywords: string[]
    text: string;
    placeName: string; 
    imageUrls: string[];
}
export interface Review {
    id: string
    placeId: string;
    content: ReviewContent;
    createdAt: Date;
    userId: string;
}

