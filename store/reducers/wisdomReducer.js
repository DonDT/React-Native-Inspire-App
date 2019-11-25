const initialState = {
  wisdoms: [],
  goals: [],
  ideas: [],
  motivations: [],
  ambitions: [],
  isLoading: true,
  image: null
};

const wisdoms = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_ALL_ACTIONS_FROM_FIREBASE":
      return {
        ...state,
        wisdoms: action.payload,
        ideas: action.payload.filter(wisdom => wisdom.category === "ideas"),
        goals: action.payload.filter(wisdom => wisdom.category === "goals"),
        motivations: action.payload.filter(
          wisdom => wisdom.category === "motivations"
        ),
        ambitions: action.payload.filter(
          wisdom => wisdom.category === "ambitions"
        )
      };
    case "ADD_WISDOM":
      return {
        ...state,
        wisdoms: [action.payload, ...state.wisdoms]
      };
    case "CHANGE_TO_IDEAS":
      return {
        ...state,
        wisdoms: state.wisdoms.map(item => {
          if (item.title === action.payload.title) {
            return { ...item, category: "ideas" };
          }
          return item;
        }),

        ideas: state.wisdoms.filter(wisdom => wisdom.category === "ideas")
      };
    case "CHANGE_TO_GOALS":
      return {
        ...state,
        wisdoms: state.wisdoms.map(item => {
          if (item.title === action.payload.title) {
            return { ...item, category: "goals" };
          }
          return item;
        }),

        goals: state.wisdoms.filter(wisdom => wisdom.category === "goals")
      };
    case "CHANGE_TO_MOTIVATIONS":
      return {
        ...state,
        wisdoms: state.wisdoms.map(item => {
          if (item.title === action.payload.title) {
            return { ...item, category: "motivations" };
          }
          return item;
        }),

        motivations: state.wisdoms.filter(
          wisdom => wisdom.category === "motivations"
        )
      };
    case "CHANGE_TO_AMBITIONS":
      return {
        ...state,
        wisdoms: state.wisdoms.map(item => {
          if (item.title === action.payload.title) {
            return { ...item, category: "ambitions" };
          }
          return item;
        }),

        ambitions: state.wisdoms.filter(
          wisdom => wisdom.category === "ambitions"
        )
      };
    case "LOADING_DATA":
      return {
        ...state,
        isLoading: action.payload
      };

    case "DELETE_ITEM":
      return {
        wisdoms: state.wisdoms.filter(
          wisdom => wisdom.title !== action.payload.title
        ),
        ideas: state.ideas.filter(idea => idea.title !== action.payload.title),
        ambitions: state.ambitions.filter(
          ambition => ambition.title !== action.payload.title
        ),
        motivations: state.motivations.filter(
          motivation => motivation.title !== action.payload.title
        )
      };

    case "UPDATE_IMAGE":
      return {
        ...state,
        wisdoms: state.wisdoms.map(wisdom => {
          if (wisdom.title == action.payload.title) {
            return {
              ...wisdom,
              image: action.payload.uri
            };
          }
          return wisdom;
        }),
        goals: state.goals.map(goal => {
          if (goal.title == action.payload.title) {
            return {
              ...goal,
              image: action.payload.uri
            };
          }
          return goal;
        }),
        ideas: state.ideas.map(idea => {
          if (idea.title == action.payload.title) {
            return {
              ...idea,
              image: action.payload.uri
            };
          }
          return idea;
        }),
        motivations: state.motivations.map(motivation => {
          if (motivation.title == action.payload.title) {
            return {
              ...motivation,
              image: action.payload.uri
            };
          }
          return motivation;
        }),
        ambitions: state.ambitions.map(ambition => {
          if (ambition.title == action.payload.title) {
            return {
              ...ambition,
              image: action.payload.uri
            };
          }
          return ambition;
        })
      };

    default:
      return state;
  }
};

export default wisdoms;
