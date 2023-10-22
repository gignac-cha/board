import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Loading = () => {
  return (
    <h1>
      <FontAwesomeIcon icon={faSpinner} size="xl" spin={true} /> Loading...
    </h1>
  );
};
