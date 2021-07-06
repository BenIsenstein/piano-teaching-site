import duckSink from "../../images/duckSink.jpg"


const StudentDisplayCard = (props) => (
  <div {...props}>
    <img src="https://drive.google.com/uc?id=1_BjbPx7hqvLHI-CcyFcD249w-9yHwRaE" alt="my headshot" width="200px" height="200px"/>
    {props.name || 'No name'}
  </div>
)

export default StudentDisplayCard
