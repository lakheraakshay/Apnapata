import { useHistory, useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const history = useHistory();
  useLocation(); // to cause rerender

  if (history.action === "PUSH") {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
};

export default useScrollToTop;
