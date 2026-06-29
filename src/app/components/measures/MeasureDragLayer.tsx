import { useDragLayer } from "react-dnd";
import { useCommitmentFlow } from "../../context/CommitmentFlowContext";
import { MEASURE_DRAG_TYPE } from "./MeasureCard";
import { MeasureCardBody } from "./MeasureCardBody";

type DragItem = {
  id: string;
  width: number;
};

export function MeasureDragLayer() {
  const { measures, areas } = useCommitmentFlow();

  const { itemType, isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as DragItem | null,
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || itemType !== MEASURE_DRAG_TYPE || !currentOffset || !item) {
    return null;
  }

  const measure = measures.find((m) => m.id === item.id);
  if (!measure) return null;

  const areaName = areas.find((a) => a.id === measure.areaOfActionId)?.name ?? "Unknown area";

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{
        width: item.width,
        transform: `translate(${currentOffset.x}px, ${currentOffset.y}px) rotate(2.5deg)`,
        transformOrigin: "top left",
      }}
    >
      <div className="w-full rounded-[16px] bg-white p-4 shadow-lg ring-1 ring-black/5 flex flex-col gap-5">
        <MeasureCardBody measure={measure} areaName={areaName} />
      </div>
    </div>
  );
}
