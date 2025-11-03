import { EModalPosition, EModalWidth, ModalCore } from "@/components/ui";
import type { IWorklog } from "@/types/worklog";
import { useMemo } from "react";
import { WorkLogModalMainContent } from "./content";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectDetails?: IWorklog | undefined;
  isUpdate?: boolean;
};

export const WorkLogModal: React.FC<Props> = ((props) => {
  const { isOpen, onClose, projectDetails, isUpdate = false } = props;

  const handleClose = () => {
    onClose();
  };

  const worklogBody = useMemo(() => {
    return (
      <WorkLogModalMainContent
        worklog={projectDetails}
        handleClose={handleClose}
        isUpdate={isUpdate}
      />
    );
  }, [projectDetails, isUpdate, handleClose]);

  return (
    <ModalCore
      isOpen={isOpen}
      position={EModalPosition.TOP}
      width={EModalWidth.MD}
      handleClose={handleClose}
      className="!bg-transparent rounded-lg shadow-none transition-[width] ease-linear"
    >
      {worklogBody}
    </ModalCore>
  );
});
