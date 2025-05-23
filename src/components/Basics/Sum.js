export default function Sum(props) {
    const addition = props.a + props.b;
    return (
        <div style={{color: "black"}}>
            <p>Adding numbers {props.a} and {props.b} </p>
            <h1>The result is {addition} </h1>
        </div>
    )
}