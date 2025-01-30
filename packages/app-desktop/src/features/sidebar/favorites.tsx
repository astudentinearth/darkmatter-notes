import { Note } from "@darkwrite/common";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@renderer/components/ui/collapsible";
import {
  useNotesQuery,
  useUpdateMultipleNotesMutation,
} from "@renderer/hooks/query";
import { cn } from "@renderer/lib/utils";
import { produce } from "immer";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FavoriteItem } from "./favorite-item";
import { useLocalStore } from "@renderer/context/local-state";
import { useTranslation } from "react-i18next";

export function FavortiesWidget() {
  const notes = useNotesQuery().data?.value;
  const updateMany = useUpdateMultipleNotesMutation().mutate;
  const open = !useLocalStore((s) => s.favoritesCollapsed);
  const setCollapsed = useLocalStore((s) => s.setFavoritesCollapsed);
  const setOpen = (val: boolean) => setCollapsed(!val);
  const [target, setTarget] = useState<Note[]>([]);
  const { t } = useTranslation();

  const getFavorites = (arr: Note[]) => {
    const favorites = arr.filter((n) => n.isFavorite && !n.isTrashed);
    if (favorites == null) return [];
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].favoriteIndex == null) {
        favorites[i].favoriteIndex = favorites.length;
      }
    }
    favorites.sort((a, b) => (a.favoriteIndex ?? 0) - (b.favoriteIndex ?? 0));
    return favorites;
  };

  useEffect(() => {
    if (!notes) return;
    const favorites = getFavorites(notes);
    setTarget(favorites);
  }, [notes]);

  const render = useCallback(() => {
    const elements: JSX.Element[] = [];
    const arr = [...target];
    arr.sort((a, b) => (a.favoriteIndex ?? 0) - (b.favoriteIndex ?? 0));
    if (arr.length === 0) return elements;
    for (let i = 0; i < arr.length; i++) {
      elements.push(
        <FavoriteItem note={arr[i]} key={arr[i].id} index={i}></FavoriteItem>,
      );
    }
    return elements;
  }, [target]);

  const dragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const updated = produce(target, (draft) => {
      const [removed] = draft.splice(source.index, 1);
      draft.splice(destination.index, 0, removed);
      for (let i = 0; i < draft.length; i++) {
        draft[i].favoriteIndex = i;
      }
      draft.sort((a, b) => (a.favoriteIndex ?? 0) - (b.favoriteIndex ?? 0));
    });
    const newState = getFavorites(updated);
    setTarget(newState);
    await updateMany(updated);
  };

  return (
    <div className={cn("rounded-[12px]")}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center select-none text-foreground/50 hover:text-foreground transition-colors text-sm p-1">
            {open ? (
              <ChevronDown size={14}></ChevronDown>
            ) : (
              <ChevronRight size={14}></ChevronRight>
            )}
            <span>{t("sidebar.title.favorites")}</span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <DragDropContext onDragEnd={dragEnd}>
            <Droppable droppableId="#favorites_droppable">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {render()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
