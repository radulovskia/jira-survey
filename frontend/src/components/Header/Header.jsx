import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  let description = reactDescriptions[genRandomInt(2)];

  return (
    <header>
      <h1>Lorem Ipsum Survey</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio. Quisque ultricies, mauris sed vehicula pellentesque, massa sem tincidunt magna, sed iaculis neque sem eu risus. Sed iaculis commodo tincidunt. Cras ante libero, volutpat id lacus in, volutpat fermentum lorem. Morbi consequat odio in fermentum pulvinar. Cras at metus sed tellus tempor convallis sit amet ut arcu. Sed rhoncus rhoncus orci sodales rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at condimentum nulla, a rhoncus urna.</p>
      {/* <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p> */}
    </header>
  )
}

export default Header;