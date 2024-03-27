import { useLocation } from 'react-router-dom';

type StateType = {
  email: string;
};

export const ConfirmEmail = () => {
  const location = useLocation();
  const state = location.state as StateType | null;

  if (!state) {
    return <div>No email provided</div>;
  }

  const { email } = state;

  return <div>Email: {email}</div>;
};
