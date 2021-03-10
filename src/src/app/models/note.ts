export class Note {
    id: number;
    title: string;
    description: string;
    parentId: number;
    created: Date;
    updated: Date;    

    isEditShow: boolean;
    expanded: boolean;
}