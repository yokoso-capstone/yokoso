import { SnapshotHandler, SnapshotErrorHandler } from "./types";
import { chatRooms, CollectionName } from "./collections";

export const onCreateMessage = (
  chatRoomId: string,
  handleSnapshot: SnapshotHandler,
  handleError: SnapshotErrorHandler
) => {
  const unsubscribe = chatRooms
    .doc(chatRoomId)
    .collection(CollectionName.Messages)
    .orderBy("createdAt")
    .limitToLast(10)
    .onSnapshot(handleSnapshot, handleError);

  return unsubscribe;
};
