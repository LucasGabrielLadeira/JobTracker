export default function useDragAndDrop() {

  const handleOnDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: string,
  ) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleOnDrop = (
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    return e.dataTransfer.getData("text/plain");
  };

  return {
    handleOnDragStart,
    handleOnDragOver,
    handleOnDrop,
  };
}
