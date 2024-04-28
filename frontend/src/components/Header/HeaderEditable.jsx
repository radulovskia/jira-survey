import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';
import TextField from '@mui/material/TextField';

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function HeaderEditable() {
  let description = reactDescriptions[genRandomInt(2)];

  return (
    <>
      <header>
        <TextField value={"Lorem Ipsum Survey"} className='TextField' id="filled-basic" label="Filled" variant="filled" sx={{ color: "black" }} >Lorem Ipsum Survey</TextField>

        <TextField multiline sx={{ width: "100%" }} value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi tellus, faucibus sed lectus ut, hendrerit feugiat elit. Morbi at venenatis odio. Quisque ultricies, mauris sed vehicula pellentesque, massa sem tincidunt magna, sed iaculis neque sem eu risus. Sed iaculis commodo tincidunt. Cras ante libero, volutpat id lacus in, volutpat fermentum lorem. Morbi consequat odio in fermentum pulvinar. Cras at metus sed tellus tempor convallis sit amet ut arcu. Sed rhoncus rhoncus orci sodales rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer at condimentum nulla, a rhoncus urna."}>

        </TextField>

      </header >
    </>
  )
}

export default HeaderEditable;