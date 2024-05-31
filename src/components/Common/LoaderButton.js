import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function LoaderButton() {
  return (
    <>
      
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Processing...
      </Button>
    </>
  );
}

export default LoaderButton;