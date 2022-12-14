import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const PlaceHolder = () => {

  return (
    <>
      <Card style={{ width: '80rem' }}>
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={12} /> <Placeholder xs={12} /> <Placeholder xs={12} />{' '}
            <Placeholder xs={12} /> <Placeholder xs={12} />
          </Placeholder>
        </Card.Body>
      </Card>
    </>
  )
}

export default PlaceHolder