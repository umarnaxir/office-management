export function Basic(props) {
  const fontSize = 27;
  const imgDimensions = 80;
  const styles = { 
    color: props.color,
     fontSize: props.size, 
     marginTop: props.marginTop
    };
  return (
    <div>
      <p style={styles}>Hello World</p>
    </div>
  );
}
