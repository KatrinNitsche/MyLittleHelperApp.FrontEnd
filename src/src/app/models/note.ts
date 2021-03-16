export class Note {
    id: number;
    title: string;
    description: string;
    categoryId: number;
    parentId: number;
    created: Date;
    updated: Date;    

    isEditShow: boolean;
    expanded: boolean;
    categoryColour: string;
}