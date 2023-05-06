export interface IEvent {
    uuid: string;
    author: {
        uuid: string;
        email: string;
        phone: string;
        firstName: string;
        lastName: string;
        createdAt: string;
    };
    name: string;
    location: {
        coordinates: [number, number];
    };
    startDate: string;
    description: string;
}
