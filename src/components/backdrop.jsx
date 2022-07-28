
const Backdrop = (props) =>{
    return <div className={props.className ? props.className: 'backdrop'} onClick={props.onClick} >{props.children} </div>;
}
export default Backdrop;
