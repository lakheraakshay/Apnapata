import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../store/reducers/auth-slice";

export default function Logout() {
  const { isAuthenticated: isAuthed } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!isAuthed) {
      history.push("/login");
      return;
    }
    dispatch(authActions.logout());
    history.push("/");
  }, [isAuthed, dispatch, history]);

  return null;
}
