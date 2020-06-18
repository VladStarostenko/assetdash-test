import React, {useEffect, ReactNode} from 'react';
import {withRouter, useHistory} from 'react-router-dom';

interface ScrollToTopProps {
  children?: ReactNode;
}

function ScrollToTop({children}: ScrollToTopProps) {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return <>{children}</>;
}

export default withRouter(ScrollToTop);
