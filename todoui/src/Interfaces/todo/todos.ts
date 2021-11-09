export default interface ITodo {
    id: string;
    isSelected: any;
    title: string;
    isComplete: boolean;
    onClick: any;
    onComplete: any;
    onRemove: any;
    index: number;
}
