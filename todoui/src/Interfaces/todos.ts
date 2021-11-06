export default interface ITodo {
    id: string;
    isSelected: boolean;
    title: string;
    isComplete: boolean;
    onClick: any;
    onComplete: any;
    onRemove: any;
    index: number;
}
