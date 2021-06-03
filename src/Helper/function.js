import * as _ from 'lodash';
export const commonRoom = (user1, user2) => {
  if (user1.roomChatList && user2.roomChatList)
    return _.difference(
      user2.roomChatList,
      _.difference(user2.roomChatList, user1.roomChatList),
    );
  return [];
};
