import * as React from 'react';
import {RoleContext} from '.';

export const RoleProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SET_ROLE':
          return {
            ...prevState,
            role: action.role,
          };
          break;
      }
    },
    {
      role: null,
    },
  );

  const context = React.useMemo(
    () => ({
      selectRole: ms => {
        dispatch({
          type: 'SET_ROLE',
          role: ms,
        });
      },
      role: state.role,
    }),
    [state],
  );

  return (
    <RoleContext.Provider value={context}>{children}</RoleContext.Provider>
  );
};
