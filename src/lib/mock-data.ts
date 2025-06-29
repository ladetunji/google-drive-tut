export interface File {
    id: string;
    name: string;
    type: "file";
    size: string;
    url: string;
    parent: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Folder = {
    id: string;
    name: string;
    type: "folder";
    parent: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export const mockFolders: Folder[] = [
    {
        id: "root",
        name: "Root",
        type: "folder",
        parent: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "1",
        name: "Documents",
        type: "folder",
        parent: "root",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Photos",
        type: "folder",
        parent: "root",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        name: "Downloads",
        type: "folder",
        parent: "root",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        name: "Music",
        type: "folder",
        parent: "root",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        name: "Torrents",
        type: "folder",
        parent: "Downloads",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "6",
        name: "Invoices",
        type: "folder",
        parent: "Documents",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export const mockFiles: File[] = [
    {
        id: "7",
        name: "Resume.pdf",
        type: "file",
        size: "100KB",
        url: "/files/resume.pdf",
        parent: "1",
        createdAt: new Date(Math.random() * Date.now()),
        updatedAt: new Date(Math.random() * Date.now()),
    },
    {
        id: "8",
        name: "Project Presentation.pptx",
        type: "file",
        size: "15.2 MB",
        url: "/files/presentation.pptx",
        parent: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "9",
        name: "Microsoft Canteen Invoice.pdf",
        type: "file",
        size: "1.2 MB",
        url: "/files/microsoft-invoice.pdf",
        parent: "6",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "10",
        name: "Vacation Photos 1.jpg",
        type: "file",
        size: "1.2 MB",
        url: "/files/vacation-photos-1.jpg",
        parent: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "11",
        name: "Vacation Photos 2.jpg",
        type: "file",
        size: "1.2 MB",
        url: "/files/vacation-photos-2.jpg",
        parent: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "12",
        name: "Vacation Video 1.mp4",
        type: "file",
        size: "100 MB",
        url: "/files/vacation-video-1.mp4",
        parent: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "13",
        name: "Smash hit.mp3",
        type: "file",
        size: "5.2 MB",
        url: "/files/smash-hit.mp3",
        parent: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "14",
        name: "UK Top 100 Hits.mp3",
        type: "file",
        size: "100 MB",
        url: "/files/uk-top-100-hits.mp3",
        parent: "5",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "15",
        name: "My CV.pdf",
        type: "file",
        size: "1 MB",
        url: "/files/my-cv.pdf",
        parent: "root",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "16",
        name: "2024 Budget.xlsx",
        type: "file",
        size: "6.2 MB",
        url: "/files/2024-budget.xlsx",
        parent: "root",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];