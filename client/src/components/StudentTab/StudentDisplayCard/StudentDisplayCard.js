import duckSink from "../../images/duckSink.jpg"
const studentImageStyle = {
  backgroundImage: "url(" + duckSink + ")",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "243px"
}

const StudentDisplayCard = (props) => (
  <div {...props}>
    <div style={studentImageStyle}/>
    {props.name || 'No name'}
  </div>
)

export default StudentDisplayCard
