
import { useNavigate, useParams } from 'react-router-dom';
import CreateExamForm from '../components/CreateExamForm';
import { useEffect, useState } from 'react';
import { getExamByID } from '../Api/exam/examService';

function EditExam() {

    const [exam, setExam] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        const fetchExam = async () => {
            if (id) {
                const exam = await getExamByID(id);

                if (exam) {
                    // console.log(exam);
                    setExam(exam)
                } else {
                    navigate("/")
                }
            }
        }

        fetchExam()

    }, [id, navigate])


    return exam ? (
        <div className="flex">
            <CreateExamForm exam={exam} />
        </div>
    ) : null
}

export default EditExam