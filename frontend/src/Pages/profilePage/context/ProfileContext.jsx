import { createContext, useReducer } from "react";

export const ProfileContext = createContext();

const profileReducer = (state, action) => {
  switch (action.type) {
    case "MY_POST":
      return {
        ...state,
        myPost: action.payload,
      };
    case "ADD_LIKE": {
      return {
        ...state,
        myPost: state.myPost.map((post) => {
          if (post._id === action.payload.postId) {
            const existingLikeIndex = post.likes.findIndex(
              (like) => like.likerId === action.payload.likerId
            );

            if (existingLikeIndex === -1) {
              return {
                ...post,
                likes: [
                  ...post.likes,
                  {
                    likerId: action.payload.likerId,
                    liker: action.payload.liker,
                  },
                ],
                dislikes: post.dislikes.filter(
                  (dislike) => dislike.dislikerId !== action.payload.likerId
                ),
              };
            } else {
              return {
                ...post,
                likes: post.likes.filter(
                  (like) => like.likerId !== action.payload.likerId
                ),
              };
            }
          } else {
            return post;
          }
        }),
      };
    }
    case "ADD_DISLIKE": {
      return {
        ...state,
        myPost: state.myPost.map((post) => {
          if (post._id === action.payload.postId) {
            const existingDislikeIndex = post.dislikes.findIndex(
              (dislike) => dislike.dislikerId === action.payload.dislikerId
            );

            if (existingDislikeIndex === -1) {
              return {
                ...post,
                dislikes: [
                  ...post.dislikes,
                  {
                    dislikerId: action.payload.dislikerId,
                    disliker: action.payload.disliker,
                  },
                ],
                likes: post.likes.filter(
                  (like) => like.likerId !== action.payload.dislikerId
                ),
              };
            } else {
              return {
                ...post,
                dislikes: post.dislikes.filter(
                  (dislike) => dislike.dislikerId !== action.payload.dislikerId
                ),
              };
            }
          } else {
            return post;
          }
        }),
      };
    }
    case "ADD_COMMENT": {
      return {
        ...state,
        myPost: state.myPost.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  posterId: action.payload.posterId,
                  poster: action.payload.poster,
                  comment: action.payload.comment,
                  profilePic: action.payload.profilePic,
                },
              ],
            };
          } else {
            return post;
          }
        }),
      };
    }
    case "RESET_PROFILE": {
      return {
        ...state,
        myPost: [],
      };
    }
    default:
      return state;
  }
};

export const ProfileContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, {
    myPost: [],
  });

  return (
    <ProfileContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};