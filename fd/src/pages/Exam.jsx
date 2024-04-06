import { useParams } from "react-router-dom"



function Exam() {

  const { id } = useParams();

  return (
    <div>Exam {id}</div>
  )
}

export default Exam