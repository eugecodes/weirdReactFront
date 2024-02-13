import { Button, IconButton } from "@mui/material";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Actions } from "../../assets/icons";
import Styled from "./table.styled";
import type { IAction } from "./types";

interface ElementActionsProps<T> {
  selectedItem: T;
  actions: Array<IAction<T>>;
}

export function ElementActions<T>({ selectedItem, actions }: ElementActionsProps<T>) {
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef<HTMLTableCellElement>(null);
  const id = useId();

  const onClickOption = useCallback(
    (event: React.MouseEvent, onClick: (selectedItem: T) => void) => {
      setShowActions(false);
      /* TODO:FIX THIS IN ANOTHER WAY */
      Promise.resolve().then(() => {
        onClick(selectedItem);
      });
    },
    [selectedItem]
  );

  const onClickIcon = useCallback(() => {
    setShowActions((prevStatus) => !prevStatus);
  }, []);

  useEffect(() => {
    const onClick = (event: globalThis.MouseEvent) => {
      const target = (event.target as Node) || {};
      const isOutsideActions = actionsRef.current && !actionsRef.current.contains(target);
      if (isOutsideActions) {
        setShowActions(false);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [actionsRef, id]);

  return (
    <Styled.ActionsIconCell id={id} ref={actionsRef}>
      <IconButton onClick={onClickIcon}>
        <Actions />
      </IconButton>
      {showActions ? (
        <Styled.PopperS id={id} open={showActions} anchorEl={actionsRef.current}>
          <Styled.ActionsContainer>
            {actions.map(({ text, render, onClick, isDisabled, hideButton }, index) => {
              if (hideButton && hideButton(selectedItem)) {
                return null;
              }
              return (
                <Button
                  key={(text || "") + index}
                  variant="text"
                  onClick={(event) => onClickOption(event, onClick)}
                  disabled={isDisabled ? isDisabled(selectedItem) : false}
                >
                  {render ? render(selectedItem) : text}
                </Button>
              );
            })}
          </Styled.ActionsContainer>
        </Styled.PopperS>
      ) : null}
    </Styled.ActionsIconCell>
  );
}
