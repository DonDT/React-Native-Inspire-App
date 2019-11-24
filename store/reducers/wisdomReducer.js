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
    case "CHANGE_CATEGORY_TO_GOAlS":
      return {
        ...state,
        goals: state.goals.map(item => {
          if (item.title === action.payload.title) {
            return { ...item, category: "ideas" };
          }
          return item;
        })
      };

    default:
      return state;
  }
};

export default wisdoms;
