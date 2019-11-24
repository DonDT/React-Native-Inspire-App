const initialState = {
  wisdoms: [],
  goals: [],
  ideas: [],
  motivations: [],
  ambitions: []
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

    default:
      return state;
  }
};

export default wisdoms;
